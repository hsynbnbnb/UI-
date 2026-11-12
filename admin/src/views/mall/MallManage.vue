<template>
    <div class="mall-manage">
        <h2 class="page-title">会员购管理</h2>
        <p class="page-sub">管理手机端与电脑端会员购的商品信息</p>

        <!-- 筛选栏 -->
        <div class="toolbar">
            <el-input v-model="keyword" placeholder="搜索商品标题 / 店铺" clearable class="kw" @keyup.enter="load" @clear="load">
                <template #prefix><el-icon><Search /></el-icon></template>
            </el-input>
            <el-select v-model="category" placeholder="全部分类" clearable class="sel" @change="load">
                <el-option v-for="c in categories" :key="c" :label="c" :value="c" />
            </el-select>
            <el-select v-model="status" placeholder="全部状态" clearable class="sel" @change="load">
                <el-option label="上架中" :value="1" />
                <el-option label="已下架" :value="0" />
            </el-select>
            <el-button type="primary" @click="openAdd">
                <el-icon style="margin-right:4px"><Plus /></el-icon>新增商品
            </el-button>
        </div>

        <!-- 商品表格 -->
        <el-table :data="list" style="width: 100%" v-loading="loading" class="tbl">
            <el-table-column label="封面" width="90">
                <template #default="scope">
                    <img :src="scope.row.coverUrl" class="cover" alt="" />
                </template>
            </el-table-column>
            <el-table-column prop="title" label="商品标题" min-width="240" show-overflow-tooltip />
            <el-table-column label="价格" width="120">
                <template #default="scope">
                    <span class="price">¥{{ scope.row.price }}</span>
                    <span v-if="scope.row.originalPrice" class="origin">¥{{ scope.row.originalPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sold" label="销量" width="90" />
            <el-table-column prop="shop" label="店铺" width="140" show-overflow-tooltip />
            <el-table-column prop="category" label="分类" width="90">
                <template #default="scope">
                    <el-tag size="small" effect="plain">{{ scope.row.category }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="90">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                        {{ scope.row.status === 1 ? '上架中' : '已下架' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220" fixed="right">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="openEdit(scope.row)">编辑</el-button>
                    <el-button size="small" :type="scope.row.status === 1 ? 'warning' : 'success'" @click="toggleStatus(scope.row)">
                        {{ scope.row.status === 1 ? '下架' : '上架' }}
                    </el-button>
                    <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增/编辑弹窗 -->
        <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑商品' : '新增商品'" width="560px" destroy-on-close>
            <el-form :model="form" label-width="90px">
                <el-form-item label="商品标题">
                    <el-input v-model="form.title" placeholder="请输入商品标题" maxlength="50" />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input-number v-model="form.price" :min="0" :precision="2" :step="10" />
                </el-form-item>
                <el-form-item label="原价">
                    <el-input-number v-model="form.originalPrice" :min="0" :precision="2" :step="10" placeholder="选填" />
                </el-form-item>
                <el-form-item label="销量">
                    <el-input-number v-model="form.sold" :min="0" :step="1" />
                </el-form-item>
                <el-form-item label="店铺">
                    <el-input v-model="form.shop" placeholder="请输入店铺名" />
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="form.category" placeholder="请选择分类" style="width: 100%">
                        <el-option v-for="c in categories" :key="c" :label="c" :value="c" />
                    </el-select>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="tagInput" placeholder="多个标签用逗号分隔" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="上架" inactive-text="下架" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { get, post } from '@/network/request';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: 'MallManage',
    data() {
        return {
            list: [],
            categories: [],
            keyword: '',
            category: '',
            status: '',
            loading: false,
            dialogVisible: false,
            isEdit: false,
            tagInput: '',
            form: { id: '', title: '', price: 0, originalPrice: null, sold: 0, shop: '', category: '手办', tags: [], status: 1 }
        };
    },
    created() {
        this.loadCategories();
        this.load();
    },
    methods: {
        async loadCategories() {
            const r = await get('/admin/mall/categories');
            if (r.data.code === 200) this.categories = r.data.data;
        },
        async load() {
            this.loading = true;
            const r = await get('/admin/mall/products', {
                params: { keyword: this.keyword, category: this.category, status: this.status }
            });
            this.loading = false;
            if (r.data.code === 200) this.list = r.data.data;
        },
        openAdd() {
            this.isEdit = false;
            this.tagInput = '';
            this.form = { id: '', title: '', price: 0, originalPrice: null, sold: 0, shop: 'pilipili官方店', category: '手办', tags: [], status: 1 };
            this.dialogVisible = true;
        },
        openEdit(row) {
            this.isEdit = true;
            this.tagInput = (row.tags || []).join(',');
            this.form = {
                id: row.id,
                title: row.title,
                price: row.price,
                originalPrice: row.originalPrice || null,
                sold: row.sold,
                shop: row.shop,
                category: row.category,
                tags: row.tags || [],
                status: row.status
            };
            this.dialogVisible = true;
        },
        async save() {
            if (!this.form.title) {
                ElMessage.warning('请输入商品标题');
                return;
            }
            const tags = this.tagInput.split(',').map(t => t.trim()).filter(Boolean);
            const payload = { ...this.form, tags };
            const url = this.isEdit ? '/admin/mall/product/update' : '/admin/mall/product/add';
            const r = await post(url, payload);
            if (r.data.code === 200) {
                ElMessage.success(r.data.message || '保存成功');
                this.dialogVisible = false;
                this.load();
            }
        },
        async toggleStatus(row) {
            await post('/admin/mall/product/update', { id: row.id, status: row.status === 1 ? 0 : 1 });
            ElMessage.success(row.status === 1 ? '已下架' : '已上架');
            this.load();
        },
        remove(row) {
            ElMessageBox.confirm(`确认删除商品「${row.title}」吗？删除后不可恢复`, '删除确认', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async () => {
                const r = await post('/admin/mall/product/delete', { id: row.id });
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
.mall-manage { padding: 4px; }
.page-title { font-size: 20px; margin-bottom: 4px; color: #333; }
.page-sub { font-size: 13px; color: #999; margin-bottom: 18px; }
.toolbar { display: flex; gap: 12px; margin-bottom: 16px; }
.kw { width: 260px; }
.sel { width: 140px; }
.tbl { background: #fff; border-radius: 8px; }
.cover { width: 60px; height: 38px; object-fit: cover; border-radius: 4px; }
.price { color: #FB7299; font-weight: 700; }
.origin { color: #bbb; text-decoration: line-through; font-size: 12px; margin-left: 6px; }
</style>
