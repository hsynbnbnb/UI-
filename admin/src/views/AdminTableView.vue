<template>
    <div class="admin-table">
        <h2 class="page-title">{{ title }}</h2>
        <template v-if="isArray">
            <el-table :data="rows" style="width: 100%" v-loading="loading" class="tbl">
                <el-table-column v-for="c in columns" :key="c" :prop="c" :label="labelOf(c)" show-overflow-tooltip min-width="120">
                    <template #default="scope">
                        <img v-if="c === 'coverUrl'" :src="scope.row[c]" style="width: 80px; height: 48px; object-fit: cover; border-radius: 4px" />
                        <el-tag v-else-if="c === 'status'" :type="scope.row[c] === 0 ? 'warning' : (scope.row[c] === 1 ? 'success' : 'info')" size="small">
                            {{ statusText(scope.row[c]) }}
                        </el-tag>
                        <span v-else>{{ scope.row[c] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="paged" class="pager" layout="prev, pager, next" :total="total" :page-size="size"
                           @current-change="load"></el-pagination>
        </template>
        <template v-else>
            <div class="cards">
                <div class="card" v-for="(v, k) in rows" :key="k">
                    <div class="num">{{ Array.isArray(v) ? v.length + ' 项' : v }}</div>
                    <div class="cap">{{ labelOf(k) }}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { get } from '@/network/request';

const LABELS = {
    vid: 'ID', title: '标题', nickname: '昵称', username: '用户名', uid: 'UID', status: '状态',
    uploadDate: '上传时间', play: '播放', type: '类型', targetId: '目标ID', reason: '原因',
    reporter: '举报人', createTime: '时间', role: '角色', state: '状态', regTime: '注册时间',
    id: 'ID', desc: '描述', permissions: '权限', dau: '日活用户', newVideos: '新增视频',
    newUsers: '新增用户', playTrend: '播放趋势'
}

export default {
    name: 'AdminTableView',
    data() {
        return { rows: [], total: 0, size: 10, loading: false, paged: false };
    },
    computed: {
        title() { return (this.$route.meta && this.$route.meta.title) || '管理'; },
        endpoint() { return (this.$route.meta && this.$route.meta.endpoint) || '/admin/content/list'; },
        isArray() { return Array.isArray(this.rows); },
        columns() { return this.isArray && this.rows.length ? Object.keys(this.rows[0]) : []; }
    },
    created() { this.load(1); },
    methods: {
        labelOf(k) { return LABELS[k] || k; },
        statusText(s) { return ['待处理', '已处理', '默认'][s] !== undefined ? ['待处理', '已处理', '默认'][s] : s; },
        async load(page) {
            this.loading = true;
            const r = await get(this.endpoint, { params: { page, size: this.size } });
            this.loading = false;
            const d = r.data.data;
            if (Array.isArray(d)) { this.rows = d; this.paged = false; }
            else if (d && d.list) { this.rows = d.list; this.total = d.total; this.paged = true; }
            else { this.rows = d || {}; this.paged = false; }
        }
    }
}
</script>

<style scoped>
.page-title { font-size: 20px; margin-bottom: 16px; color: #333; }
.tbl { background: #fff; border-radius: 8px; }
.pager { margin-top: 16px; justify-content: flex-end; }
.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.card { background: #fff; border-radius: 10px; padding: 22px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
.card .num { font-size: 26px; font-weight: 700; color: #FB7299; }
.card .cap { color: #888; margin-top: 8px; }
</style>
