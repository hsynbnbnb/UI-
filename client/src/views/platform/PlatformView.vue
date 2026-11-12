<template>
    <div class="platform">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>
        <div class="plat-layout">
            <aside class="plat-side">
                <div class="plat-title">创作中心</div>
                <ul class="plat-nav">
                    <li :class="{ active: !resolvedType || resolvedType === 'home' }" @click="go('home')">创作首页</li>
                    <li :class="{ active: resolvedType === 'upload' }" @click="go('upload')">视频投稿</li>
                    <li :class="{ active: resolvedType === 'text' }" @click="go('text')">专栏投稿</li>
                </ul>
            </aside>
            <main class="plat-main">
                <template v-if="!resolvedType || resolvedType === 'home'">
                    <!-- UP主信息 -->
                    <div class="creator-user">
                        <img class="creator-avatar" :src="avatar" alt="">
                        <div class="creator-user-info">
                            <div class="creator-name">
                                {{ nickname }}
                                <span class="creator-lv">Lv.5 知名UP主</span>
                            </div>
                            <div class="creator-sub">{{ fansCount }}粉丝</div>
                        </div>
                    </div>

                    <!-- 今日数据 -->
                    <h2 class="plat-h2">今日数据</h2>
                    <div class="stat-cards">
                        <div class="stat-card"><div class="num">{{ overview.totalPlay }}</div><div class="cap">播放</div></div>
                        <div class="stat-card"><div class="num">{{ overview.totalVideos }}</div><div class="cap">点赞</div></div>
                        <div class="stat-card"><div class="num">{{ overview.pendingReview }}</div><div class="cap">评论</div></div>
                        <div class="stat-card"><div class="num">{{ overview.totalFans }}</div><div class="cap">分享</div></div>
                    </div>

                    <!-- 快捷创作 -->
                    <h3 class="plat-h3">快捷创作</h3>
                    <div class="quick-grid">
                        <div class="quick-item" @click="go('upload')">
                            <span class="quick-icon" style="background:#ffe3ee;"><i class="iconfont icon-shangchuan"></i></span>
                            发布视频
                        </div>
                        <div class="quick-item" @click="noPage">
                            <span class="quick-icon" style="background:#e3f2ff;"><i class="iconfont icon-zhibo"></i></span>
                            开直播
                        </div>
                        <div class="quick-item" @click="go('text')">
                            <span class="quick-icon" style="background:#efe6ff;"><i class="iconfont icon-zhuanlan"></i></span>
                            写专栏
                        </div>
                        <div class="quick-item" @click="noPage">
                            <span class="quick-icon" style="background:#fff3d6;"><i class="iconfont icon-toubi"></i></span>
                            发图文
                        </div>
                    </div>

                    <!-- 入口 -->
                    <h3 class="plat-h3">管理</h3>
                    <div class="plat-entries">
                        <div class="plat-entry" @click="go('upload')">
                            <span class="plat-entry-label">内容管理</span>
                            <span class="plat-entry-value">{{ overview.totalVideos }}条稿件</span>
                            <i class="iconfont icon-youjiantou"></i>
                        </div>
                        <div class="plat-entry" @click="noPage">
                            <span class="plat-entry-label">我的收益</span>
                            <span class="plat-entry-value" style="color: var(--brand_pink);">¥3,286.50 可提现</span>
                            <i class="iconfont icon-youjiantou"></i>
                        </div>
                    </div>
                </template>
                <PlatformUpload v-else-if="resolvedType === 'upload'"></PlatformUpload>
                <TextUpload v-else-if="resolvedType === 'text'"></TextUpload>
            </main>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import PlatformUpload from './PlatformUpload.vue';
import TextUpload from './TextUpload.vue';
import { get } from '@/network/request';
import { ElMessage } from 'element-plus';

export default {
    name: 'PlatformView',
    components: { HeaderBar, PlatformUpload, TextUpload },
    props: { type: { type: String, default: 'home' } },
    data() {
        return {
            overview: {},
            videos: [],
            avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            nickname: 'pilipili 用户',
            fansCount: 256,
        };
    },
    computed: {
        // 兼容旧的 /platform/upload-manager 入口：等价映射到视频投稿分支，
        // 避免主内容空白、侧栏无高亮；其它 type 行为不变
        resolvedType() {
            return this.type === 'upload-manager' ? 'upload' : this.type;
        }
    },
    created() { this.load(); },
    methods: {
        async load() {
            const o = await get('/creator/overview');
            if (o.data.code === 200) this.overview = o.data.data;
            const v = await get('/creator/videos');
            if (v.data.code === 200) this.videos = v.data.data || [];
            // 读取当前用户信息
            const u = this.$store.state.user;
            if (u && u.nickname) {
                this.nickname = u.nickname;
                this.avatar = u.avatar_url || this.avatar;
                this.fansCount = u.fansCount || this.fansCount;
            }
        },
        go(t) { this.$router.push(`/platform/${t}`); },
        noPage() { ElMessage.warning("该功能暂未开放"); }
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

/* UP主信息 */
.creator-user {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    margin-bottom: 16px;
    background: #f6f7f8;
    border-radius: 8px;
}
.creator-avatar {
    flex: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}
.creator-user-info { flex: 1; min-width: 0; }
.creator-name { font-size: 16px; font-weight: 600; }
.creator-lv {
    margin-left: 8px;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--brand_pink_thin);
    color: var(--brand_pink);
    font-size: 12px;
}
.creator-sub { font-size: 13px; color: var(--text3); margin-top: 4px; }

/* 快捷创作 */
.quick-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}
.quick-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: #f6f7f8;
    border-radius: 8px;
    font-size: 13px;
    color: var(--text1);
    cursor: pointer;
}
.quick-item:hover { background: #eef0f1; }
.quick-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}
.quick-icon .iconfont { font-size: 20px; }

/* 管理入口 */
.plat-entries {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
}
.plat-entry {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    cursor: pointer;
    border-bottom: 1px solid var(--line_light);
}
.plat-entry:last-child { border-bottom: none; }
.plat-entry:hover { background: #f6f7f8; }
.plat-entry-label { font-size: 14px; color: var(--text1); }
.plat-entry-value { flex: 1; text-align: right; font-size: 13px; color: var(--text3); }
.plat-entry .iconfont { font-size: 13px; color: var(--text3); }
</style>
