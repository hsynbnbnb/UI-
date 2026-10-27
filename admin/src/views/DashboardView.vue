<template>
    <div class="dashboard">
        <h2 class="page-title">仪表盘</h2>
        <div class="cards">
            <div class="card"><div class="num">{{ stats.users }}</div><div class="cap">注册用户</div></div>
            <div class="card"><div class="num">{{ stats.videos }}</div><div class="cap">视频总数</div></div>
            <div class="card"><div class="num">{{ stats.pendingReview }}</div><div class="cap">待审核</div></div>
            <div class="card"><div class="num">{{ stats.reports }}</div><div class="cap">待处理举报</div></div>
            <div class="card"><div class="num">{{ stats.todayUpload }}</div><div class="cap">今日新增</div></div>
            <div class="card"><div class="num">{{ formatPlay }}</div><div class="cap">今日播放</div></div>
        </div>
    </div>
</template>

<script>
import { get } from '@/network/request';

export default {
    name: 'DashboardView',
    data() { return { stats: {} }; },
    computed: {
        formatPlay() {
            return this.stats.todayPlay ? (this.stats.todayPlay / 10000).toFixed(1) + ' 万' : '-';
        }
    },
    created() {
        get('/admin/dashboard/stats').then(res => {
            if (res.data.code === 200) this.stats = res.data.data;
        });
    }
}
</script>

<style scoped>
.page-title { font-size: 20px; margin-bottom: 18px; color: #333; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.card { background: #fff; border-radius: 10px; padding: 24px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
.card .num { font-size: 30px; font-weight: 700; color: #FB7299; }
.card .cap { color: #888; margin-top: 8px; }
</style>
