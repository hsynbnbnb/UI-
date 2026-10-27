<template>
    <div class="platform">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>
        <div class="plat-layout">
            <aside class="plat-side">
                <div class="plat-title">创作中心</div>
                <ul class="plat-nav">
                    <li :class="{ active: !type || type === 'home' }" @click="go('home')">创作首页</li>
                    <li :class="{ active: type === 'upload' }" @click="go('upload')">视频投稿</li>
                    <li :class="{ active: type === 'text' }" @click="go('text')">专栏投稿</li>
                </ul>
            </aside>
            <main class="plat-main">
                <template v-if="!type || type === 'home'">
                    <h2 class="plat-h2">数据概览</h2>
                    <div class="stat-cards">
                        <div class="stat-card"><div class="num">{{ overview.totalVideos }}</div><div class="cap">稿件数</div></div>
                        <div class="stat-card"><div class="num">{{ overview.totalPlay }}</div><div class="cap">总播放</div></div>
                        <div class="stat-card"><div class="num">{{ overview.totalFans }}</div><div class="cap">粉丝数</div></div>
                        <div class="stat-card"><div class="num">{{ overview.pendingReview }}</div><div class="cap">待审核</div></div>
                    </div>
                    <h3 class="plat-h3">我的稿件</h3>
                    <div class="video-grid">
                        <div class="v-card" v-for="v in videos" :key="v.vid">
                            <img :src="v.coverUrl" alt="" />
                            <div class="v-title">{{ v.title }}</div>
                            <div class="v-meta">播放 {{ v.play }} · {{ v.uploadDate }}</div>
                        </div>
                    </div>
                </template>
                <PlatformUpload v-else-if="type === 'upload'"></PlatformUpload>
                <TextUpload v-else-if="type === 'text'"></TextUpload>
            </main>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import PlatformUpload from './PlatformUpload.vue';
import TextUpload from './TextUpload.vue';
import { get } from '@/network/request';

export default {
    name: 'PlatformView',
    components: { HeaderBar, PlatformUpload, TextUpload },
    props: { type: { type: String, default: 'home' } },
    data() {
        return { overview: {}, videos: [] };
    },
    created() { this.load(); },
    methods: {
        async load() {
            const o = await get('/creator/overview');
            if (o.data.code === 200) this.overview = o.data.data;
            const v = await get('/creator/videos');
            if (v.data.code === 200) this.videos = v.data.data || [];
        },
        go(t) { this.$router.push(`/platform/${t}`); }
    }
}
</script>

<style scoped>
.plat-layout {
    display: flex;
    max-width: 1100px;
    margin: 84px auto 40px;
    background: var(--bg1);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .06);
}
.plat-side {
    width: 200px;
    background: #f6f7f8;
    padding: 16px 0;
    border-right: 1px solid var(--line_light);
}
.plat-title { padding: 8px 20px; font-size: 14px; color: var(--text3); }
.plat-nav li { padding: 12px 20px; cursor: pointer; color: var(--text1); }
.plat-nav li:hover { background: #eef0f1; }
.plat-nav li.active { color: var(--brand_pink); background: #fff; border-left: 3px solid var(--brand_pink); }
.plat-main { flex: 1; padding: 24px 32px; }
.plat-h2 { font-size: 18px; margin-bottom: 16px; }
.plat-h3 { font-size: 16px; margin: 24px 0 12px; }
.stat-cards { display: flex; gap: 16px; }
.stat-card { flex: 1; background: #f6f7f8; border-radius: 8px; padding: 18px; text-align: center; }
.stat-card .num { font-size: 26px; font-weight: 700; color: var(--brand_pink); }
.stat-card .cap { color: var(--text3); margin-top: 6px; }
.video-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.v-card { background: #f6f7f8; border-radius: 8px; overflow: hidden; }
.v-card img { width: 100%; height: 110px; object-fit: cover; }
.v-title { padding: 8px 10px 0; font-size: 13px; color: var(--text1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.v-meta { padding: 4px 10px 10px; font-size: 12px; color: var(--text3); }
</style>
