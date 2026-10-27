<template>
    <div class="review">
        <h2 class="page-title">视频审核</h2>
        <div class="tabs">
            <span v-for="t in tabs" :key="t.status"
                  :class="['tab', { active: filter === t.status }]" @click="changeFilter(t.status)">
                {{ t.name }} <em v-if="t.status !== ''">({{ countOf(t.status) }})</em>
            </span>
        </div>
        <el-table :data="list" style="width: 100%" @row-click="openDetail" class="review-table">
            <el-table-column label="封面" width="130">
                <template #default="scope"><img class="cv" :src="scope.row.coverUrl" alt="" /></template>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="220" show-overflow-tooltip></el-table-column>
            <el-table-column label="UP主" width="130">
                <template #default="scope">{{ scope.row.nickname }}</template>
            </el-table-column>
            <el-table-column label="时长" width="90">
                <template #default="scope">{{ fmt(scope.row.duration) }}</template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template #default="scope">
                    <el-tag :type="statusType(scope.row.status)" size="small">{{ statusText(scope.row.status) }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template #default="scope">
                    <el-button size="small" type="primary" @click.stop="openDetail(scope.row)">审核</el-button>
                    <el-button size="small" @click.stop="preview(scope.row)">预览</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pager" layout="prev, pager, next" :total="total" :page-size="size"
                       @current-change="changePage"></el-pagination>

        <el-dialog v-model="detailVisible" title="审核详情" width="680px">
            <VideoDetail v-if="detailVisible" :vid="currentVid" @decided="onDecided"></VideoDetail>
        </el-dialog>
    </div>
</template>

<script>
import { get, post } from '@/network/request';
import VideoDetail from './VideoDetail.vue';

export default {
    name: 'VideoReview',
    components: { VideoDetail },
    data() {
        return {
            filter: '',
            list: [],
            total: 0,
            page: 1,
            size: 10,
            counts: {},
            detailVisible: false,
            currentVid: null
        };
    },
    computed: {
        tabs() {
            return [
                { status: '', name: '全部' },
                { status: 0, name: '待审核' },
                { status: 1, name: '已通过' },
                { status: 2, name: '已驳回' }
            ];
        }
    },
    created() { this.loadCounts(); this.loadList(); },
    methods: {
        countOf(s) {
            if (s === '') return (this.counts.pending || 0) + (this.counts.approved || 0) + (this.counts.rejected || 0);
            return this.counts[s === 0 ? 'pending' : s === 1 ? 'approved' : 'rejected'] || 0;
        },
        statusText(s) { return ['待审核', '已通过', '已驳回'][s]; },
        statusType(s) { return ['warning', 'success', 'danger'][s]; },
        fmt(d) { const m = Math.floor(d / 60); const s = d % 60; return m + ':' + String(s).padStart(2, '0'); },
        async loadCounts() {
            const r = await get('/admin/video/review/count');
            if (r.data.code === 200) this.counts = r.data.data;
        },
        async loadList() {
            const r = await get('/admin/video/review/list', { params: { page: this.page, size: this.size, status: this.filter } });
            if (r.data.code === 200) { this.list = r.data.data.list; this.total = r.data.data.total; }
        },
        changeFilter(s) { this.filter = s; this.page = 1; this.loadList(); },
        changePage(p) { this.page = p; this.loadList(); },
        openDetail(row) { this.currentVid = row.vid; this.detailVisible = true; },
        preview(row) { post('/admin/video/preview', { vid: row.vid }).then(() => this.$message.success('已预览')); },
        onDecided() { this.detailVisible = false; this.loadCounts(); this.loadList(); }
    }
}
</script>

<style scoped>
.page-title { font-size: 20px; margin-bottom: 16px; color: #333; }
.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab { padding: 6px 16px; border-radius: 16px; background: #fff; cursor: pointer; font-size: 14px; color: #555; border: 1px solid #eee; }
.tab.active { background: #FB7299; color: #fff; border-color: #FB7299; }
.tab em { font-style: normal; opacity: .8; }
.cv { width: 100px; height: 60px; object-fit: cover; border-radius: 4px; }
.review-table { background: #fff; border-radius: 8px; }
.pager { margin-top: 16px; justify-content: flex-end; }
</style>
