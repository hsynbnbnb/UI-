<template>
    <div class="security">
        <h2 class="block-title">安全与绑定</h2>
        <div class="sec-row" v-if="setting">
            <span class="label">手机号</span>
            <span>{{ setting.bindPhone }}</span>
            <el-button text type="primary">更换</el-button>
        </div>
        <div class="sec-row" v-if="setting">
            <span class="label">邮箱</span>
            <span>{{ setting.bindEmail }}</span>
            <el-button text type="primary">绑定</el-button>
        </div>
        <div class="sec-row">
            <span class="label">登录密码</span>
            <span class="hint">建议定期修改密码</span>
            <el-button text type="primary" @click="showPwd = true">修改</el-button>
        </div>

        <el-dialog v-model="showPwd" title="修改密码" width="420px">
            <el-form label-width="80px">
                <el-form-item label="旧密码"><el-input v-model="pwd.old" show-password></el-input></el-form-item>
                <el-form-item label="新密码"><el-input v-model="pwd.next" show-password></el-input></el-form-item>
                <el-form-item label="确认密码"><el-input v-model="pwd.confirm" show-password></el-input></el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showPwd = false">取消</el-button>
                <el-button type="primary" @click="changePwd">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { get, post } from '@/network/request';

export default {
    name: 'AccountSecurity',
    data() {
        return {
            setting: null,
            showPwd: false,
            pwd: { old: '', next: '', confirm: '' }
        };
    },
    created() { this.load(); },
    methods: {
        async load() {
            const res = await get('/user/account/setting');
            if (res.data.code === 200) this.setting = res.data.data;
        },
        async changePwd() {
            if (this.pwd.next !== this.pwd.confirm) {
                this.$message.error('两次输入的新密码不一致');
                return;
            }
            const res = await post('/user/account/password', { old: this.pwd.old, next: this.pwd.next });
            if (res.data.code === 200) {
                this.$message.success('密码修改成功');
                this.showPwd = false;
                this.pwd = { old: '', next: '', confirm: '' };
            }
        }
    }
}
</script>

<style scoped>
.block-title { font-size: 18px; margin-bottom: 20px; color: var(--text1); }
.sec-row {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--line_light);
}
.sec-row .label { width: 90px; color: var(--text3); font-size: 14px; }
.sec-row .hint { color: var(--text3); margin-right: auto; }
.sec-row .el-button { margin-left: auto; }
</style>
