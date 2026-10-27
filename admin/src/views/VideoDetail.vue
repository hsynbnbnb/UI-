<template>
    <div class="detail" v-if="detail">
        <div class="player">
            <img :src="detail.video.coverUrl" alt="" />
            <div class="play-mask"><el-icon :size="40"><VideoPlay /></el-icon></div>
        </div>
        <h3 class="title">{{ detail.video.title }}</h3>
        <p class="meta">
            UP主：{{ detail.user.nickname }} · 时长：{{ fmt(detail.video.duration) }} ·
            状态：<el-tag :type="statusType(detail.reviewStatus)" size="small">{{ statusText(detail.reviewStatus) }}</el-tag>
        </p>
        <p class="descr">{{ detail.video.descr || '（暂无简介）' }}</p>
        <el-input v-model="reason" size="small" placeholder="驳回理由（可选）" style="margin: 12px 0;"></el-input>
        <div class="actions">
            <el-button type="success" @click="decide(1)">通过</el-button>
            <el-button type="danger" @click="decide(2)">驳回</el-button>
        </div>
    </div>
</template>

<script>
import { get, post } from '@/network/request';
import { VideoPlay } from '@element-plus/icons-vue';

export default {
    name: 'VideoDetail',
    components: { VideoPlay },
    props: { vid: { type: Number, required: true } },
    data() { return { detail: null, reason: '' }; },
    created() { this.load(); },
    methods: {
        async load() {
            const r = await get('/admin/video/detail', { params: { vid: this.vid } });
            if (r.data.code === 200) this.detail = r.data.data;
        },
        statusText(s) { return ['待审核', '已通过', '已驳回'][s]; },
        statusType(s) { return ['warning', 'success', 'danger'][s]; },
        fmt(d) { const m = Math.floor(d / 60); const s = d % 60; return m + ':' + String(s).padStart(2, '0'); },
        async decide(status) {
            const r = await post('/admin/video/review', { vid: this.vid, status, reason: this.reason });
            if (r.data.code === 200) {
                this.$message.success(status === 1 ? '已通过' : '已驳回');
                this.$emit('decided');
            }
        }
    }
}
</script>

<style scoped>
.player { position: relative; width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 8px; overflow: hidden; }
.player img { width: 100%; height: 100%; object-fit: cover; opacity: .8; }
.play-mask { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #fff; }
.title { font-size: 18px; margin: 14px 0 8px; color: #333; }
.meta { color: #777; font-size: 13px; margin-bottom: 8px; }
.descr { color: #555; font-size: 14px; line-height: 1.6; }
.actions { display: flex; gap: 12px; }
</style>
