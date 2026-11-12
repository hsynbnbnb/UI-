<template>
    <div class="user-manage">
        <h2 class="page-title">用户管理</h2>
        <p class="page-sub">管理手机端与电脑端用户的账号信息与密码</p>

        <div class="toolbar">
            <el-input v-model="keyword" placeholder="搜索昵称 / 用户名" clearable class="kw" @keyup.enter="load" @clear="load">
                <template #prefix><el-icon><Search /></el-icon></template>
            </el-input>
        </div>

        <el-table :data="filtered" style="width: 100%" v-loading="loading" class="tbl">
            <el-table-column prop="uid" label="UID" width="80" />
            <el-table-column prop="nickname" label="昵称" min-width="140" show-overflow-tooltip />
            <el-table-column prop="username" label="用户名（账号）" min-width="140" show-overflow-tooltip />
            <el-table-column prop="phone" label="手机号" width="140" />
            <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip />
            <el-table-column label="角色" width="110">
                <template #default="scope">
                    <el-tag size="small" :type="scope.row.role === 0 ? 'info' : 'warning'">
                        {{ scope.row.role === 0 ? '普通用户' : 'UP主' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="90">
                <template #default="scope">
                    <el-tag :type="scope.row.state === 0 ? 'success' : 'danger'" size="small">
                        {{ scope.row.state === 0 ? '正常' : '已封禁' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="regTime" label="注册时间" width="120" />
            <el-table-column label="操作" width="300" fixed="right">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="openEdit(scope.row)">编辑</el-button>
                    <el-button size="small" @click="resetPwd(scope.row)">重置密码</el-button>
                    <el-button size="small" :type="scope.row.state === 0 ? 'warning' : 'success'" @click="toggleState(scope.row)">
                        {{ scope.row.state === 0 ? '封禁' : '解封' }}
                    </el-button>
                    <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑用户弹窗 -->
        <el-dialog v-model="editVisible" title="编辑用户" width="480px" destroy-on-close>
            <el-form :model="form" label-width="90px">
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname" placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名（账号）" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="form.role" style="width: 100%">
                        <el-option label="普通用户" :value="0" />
                        <el-option label="UP主" :value="1" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="editVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEdit">保存</el-button>
            </template>
        </el-dialog>

        <!-- 重置密码弹窗 -->
        <el-dialog v-model="pwdVisible" title="重置密码" width="420px" destroy-on-close>
            <p class="pwd-tip">为用户 <b>{{ pwdUser.nickname }}</b>（{{ pwdUser.username }}）重置密码</p>
            <el-input v-model="newPwd" type="password" show-password placeholder="请输入新密码" maxlength="20" />
            <template #footer>
                <el-button @click="pwdVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmReset">确认重置</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { get, post } from '@/network/request';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: 'UserManage',
    data() {
        return {
            list: [],
            keyword: '',
            loading: false,
            editVisible: false,
            pwdVisible: false,
            newPwd: '',
            pwdUser: {},
            form: { uid: '', nickname: '', username: '', phone: '', email: '', role: 0 }
        };
    },
    computed: {
        filtered() {
            if (!this.keyword) return this.list;
            const kw = this.keyword.trim();
            return this.list.filter(u => u.nickname.includes(kw) || u.username.includes(kw));
        }
    },
    created() { this.load(); },
    methods: {
        async load() {
            this.loading = true;
            const r = await get('/admin/user/list');
            this.loading = false;
            if (r.data.code === 200) this.list = r.data.data;
        },
        openEdit(row) {
            this.form = {
                uid: row.uid,
                nickname: row.nickname,
                username: row.username,
                phone: row.phone,
                email: row.email,
                role: row.role
            };
            this.editVisible = true;
        },
        async saveEdit() {
            if (!this.form.username) {
                ElMessage.warning('请输入用户名');
                return;
            }
            const r = await post('/admin/user/update', this.form);
            if (r.data.code === 200) {
                ElMessage.success('更新成功');
                this.editVisible = false;
                this.load();
            }
        },
        resetPwd(row) {
            this.pwdUser = row;
            this.newPwd = '';
            this.pwdVisible = true;
        },
        async confirmReset() {
            if (!this.newPwd || this.newPwd.length < 6) {
                ElMessage.warning('密码至少 6 位');
                return;
            }
            const r = await post('/admin/user/reset-password', { uid: this.pwdUser.uid, password: this.newPwd });
            if (r.data.code === 200) {
                ElMessage.success('密码已重置');
                this.pwdVisible = false;
            }
        },
        async toggleState(row) {
            const next = row.state === 0 ? 1 : 0;
            const r = await post('/admin/user/change-state', { uid: row.uid, state: next });
            if (r.data.code === 200) {
                ElMessage.success(next === 1 ? '已封禁该用户' : '已解封该用户');
                this.load();
            }
        },
        remove(row) {
            ElMessageBox.confirm(`确认删除用户「${row.nickname}」吗？删除后不可恢复`, '删除确认', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async () => {
                const r = await post('/admin/user/delete', { uid: row.uid });
                if (r.data.code === 200) {
                    ElMessage.success('删除成功');
                    this.load();
                }
            })
            .catch(() => {});
        }
    }
};
</script>

<style scoped>
.user-manage { padding: 4px; }
.page-title { font-size: 20px; margin-bottom: 4px; color: #333; }
.page-sub { font-size: 13px; color: #999; margin-bottom: 18px; }
.toolbar { display: flex; gap: 12px; margin-bottom: 16px; }
.kw { width: 280px; }
.tbl { background: #fff; border-radius: 8px; }
.pwd-tip { margin: 0 0 16px; color: #555; font-size: 14px; }
.pwd-tip b { color: #FB7299; }
</style>
