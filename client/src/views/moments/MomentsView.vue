<template>
    <div class="moments">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>
        <div class="moments-layout">
            <!-- 标签（active 与 ?tab= 同步，见 setActive） -->
            <div class="moments-tabs">
                <span class="moments-tab" :class="{ active: active === 'all' }" @click="setActive('all')">全部</span>
                <span class="moments-tab" :class="{ active: active === 'video' }" @click="setActive('video')">视频</span>
                <span class="moments-tab" :class="{ active: active === 'image' }" @click="setActive('image')">图文</span>
            </div>

            <!-- 动态列表 -->
            <div class="moments-list">
                <div class="moments-empty" v-if="list.length === 0">
                    <img src="~assets/img/nothing.png" alt="">
                    <p>暂无相关动态</p>
                </div>
                <article class="moment-card" v-for="m in list" :key="m.id">
                    <div class="moment-head">
                        <div class="moment-avatar">{{ m.author.name[0] }}</div>
                        <div class="moment-author">
                            <div class="moment-name">{{ m.author.name }}</div>
                            <div class="moment-time">{{ m.time }} · {{ m.type === 'video' ? '视频' : '图文' }}</div>
                        </div>
                        <button class="moment-follow" :class="{ followed: m.followed }" @click="toggleFollow(m)">{{ m.followed ? '已关注' : '关注' }}</button>
                    </div>
                    <p class="moment-text">{{ m.text }}</p>
                    <div class="moment-images" v-if="m.type === 'image' && m.images && m.images.length">
                        <img v-for="(img, i) in m.images.slice(0, 4)" :key="i" :src="coverOf(i)" alt="">
                    </div>
                    <div class="moment-video" v-if="m.type === 'video' && m.videoCover" @click="openVideo(m)">
                        <img :src="coverOf(0)" alt="">
                        <span class="moment-video-duration">{{ m.videoDuration }}</span>
                        <span class="moment-video-play">▶</span>
                    </div>
                    <div class="moment-actions">
                        <span class="moment-action" @click="shareMoment(m)">
                            <i class="iconfont icon-zhuanfa"></i>{{ m.shares }}
                        </span>
                        <span class="moment-action" @click="toggleComments(m)">
                            <i class="iconfont icon-comment"></i>{{ m.comments }}
                        </span>
                        <span class="moment-action" :class="{ liked: m.liked }" @click="toggleLike(m)">
                            <i class="iconfont icon-dianzan"></i>{{ m.likes }}
                        </span>
                    </div>
                    <!-- 轻量评论区：可展开、可提交，计数与列表本地维护 -->
                    <div class="moment-comments" v-if="m.commentOpen">
                        <div class="moment-comment" v-for="(c, ci) in m.commentList" :key="ci">
                            <span class="moment-comment-user">{{ c.user }}：</span>{{ c.text }}
                        </div>
                        <div class="moment-comment-input">
                            <input v-model="m.commentDraft" type="text" placeholder="说点什么…" @keyup.enter="submitComment(m)">
                            <button @click="submitComment(m)">发送</button>
                        </div>
                    </div>
                </article>
            </div>

            <!-- 页内短视频播放面板：纯本地状态，给封面点击可见反馈，不引后端请求、不新建页面 -->
            <div class="moment-player" v-if="playingMoment" @click.self="closeVideo">
                <div class="moment-player__box">
                    <button class="moment-player__close" @click="closeVideo">×</button>
                    <img :src="coverOf(0)" alt="">
                    <div class="moment-player__info">
                        <span class="moment-player__badge">▶ 正在播放（演示）</span>
                        <p>{{ playingMoment.text }}</p>
                        <span class="moment-player__dur">时长 {{ playingMoment.videoDuration }} · 点击空白处关闭</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import { ElMessage } from 'element-plus';

const covers = [
    require('@/assets/img/cover/cover-1.svg'),
    require('@/assets/img/cover/cover-2.svg'),
    require('@/assets/img/cover/cover-3.svg'),
    require('@/assets/img/cover/cover-4.svg'),
];

const TABS = ['all', 'video', 'image'];

export default {
    name: 'MomentsView',
    components: { HeaderBar },
    data() {
        return {
            active: 'all',
            moments: [],
            playingMoment: null,
        };
    },
    computed: {
        list() {
            return this.active === 'all' ? this.moments : this.moments.filter(m => m.type === this.active);
        }
    },
    watch: {
        // 浏览器前进/后退改变 ?tab= 时同步选中态
        '$route.query.tab'(tab) {
            this.active = TABS.includes(tab) ? tab : 'all';
        }
    },
    methods: {
        toast(msg) { ElMessage.info(msg); },
        coverOf(i) { return covers[i % covers.length]; },
        // 动态 tab 同步到 ?tab=，刷新/返回后不回落「全部」
        setActive(tab) {
            this.active = tab;
            const query = { ...this.$route.query };
            if (tab === 'all') delete query.tab;
            else query.tab = tab;
            const cur = this.$route.query;
            const same = Object.keys(query).length === Object.keys(cur).length
                && Object.keys(query).every(k => String(query[k]) === String(cur[k]));
            if (!same) this.$router.replace({ query });
        },
        async getMoments() {
            const res = await this.$get('/moment/list');
            if (res.data && res.data.code === 200) {
                // mockMoments 无 followed / commentList / commentOpen / commentDraft，
                // 交互所需字段在本地补齐，全部保持纯前端状态、不发后端请求
                this.moments = res.data.data.map(m => ({
                    ...m,
                    followed: false,
                    liked: !!m.liked,
                    commentList: [],
                    commentOpen: false,
                    commentDraft: '',
                }));
            }
        },
        // 关注：切换本地状态与文案（关注 ↔ 已关注）
        toggleFollow(m) {
            m.followed = !m.followed;
            this.toast(m.followed ? `已关注 ${m.author.name}` : `已取消关注 ${m.author.name}`);
        },
        // 点赞：计数 ±1 + 图标高亮，取消还原
        toggleLike(m) {
            m.liked = !m.liked;
            m.likes += m.liked ? 1 : -1;
        },
        // 评论：展开输入区，提交后计数 +1 并插入一条本地评论
        toggleComments(m) { m.commentOpen = !m.commentOpen; },
        submitComment(m) {
            const text = (m.commentDraft || '').trim();
            if (!text) { this.toast('请输入评论内容'); return; }
            m.commentList.push({ user: '我', text });
            m.comments += 1;
            m.commentDraft = '';
            this.toast('评论已发布');
        },
        // 转发：转发数 +1
        shareMoment(m) {
            m.shares += 1;
            this.toast('已转发（本地演示）');
        },
        // 短视频封面：打开页内播放面板给可见反馈
        openVideo(m) { this.playingMoment = m; },
        closeVideo() { this.playingMoment = null; },
    },
    created() {
        const tab = this.$route.query.tab;
        if (TABS.includes(tab)) this.active = tab;
        this.getMoments();
    }
};
</script>

<style scoped>
.moments {
    min-height: 100vh;
    background: #f4f5f7;
    color: var(--text1);
}

.moments-layout {
    max-width: 680px;
    margin: 84px auto 40px;
    padding: 0 24px;
}

.moments-tabs {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
}

.moments-tab {
    font-size: 15px;
    color: var(--text2);
    cursor: pointer;
    padding-bottom: 4px;
}

.moments-tab.active {
    color: var(--brand_pink);
    font-weight: 600;
    border-bottom: 2px solid var(--brand_pink);
}

.moments-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.moments-empty {
    text-align: center;
    padding: 60px 0;
    color: var(--text3);
}

.moments-empty img {
    width: 180px;
    margin-bottom: 12px;
}

.moment-card {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
}

.moment-head {
    display: flex;
    align-items: center;
    gap: 10px;
}

.moment-avatar {
    flex: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffd666, #ff9a3d);
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.moment-author {
    flex: 1;
    min-width: 0;
}

.moment-name {
    font-size: 14px;
    font-weight: 600;
}

.moment-time {
    font-size: 12px;
    color: var(--text3);
    margin-top: 2px;
}

.moment-follow {
    flex: none;
    padding: 4px 14px;
    border-radius: 14px;
    font-size: 12px;
    background: var(--brand_pink);
    color: #fff;
    cursor: pointer;
}

.moment-follow.followed {
    background: #fff;
    color: var(--text3);
    border: 1px solid var(--line_regular);
}

.moment-text {
    margin: 12px 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text1);
}

.moment-images {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
}

.moment-images img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 6px;
}

.moment-video {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
}

.moment-video img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
}

.moment-video-duration {
    position: absolute;
    right: 8px;
    bottom: 8px;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(0, 0, 0, .6);
    color: #fff;
    font-size: 12px;
}

.moment-actions {
    display: flex;
    gap: 24px;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--line_light);
}

.moment-action {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: var(--text3);
    cursor: pointer;
}

.moment-action .iconfont {
    font-size: 15px;
}

.moment-action:hover {
    color: var(--brand_pink);
}

.moment-action.liked {
    color: var(--brand_pink);
    font-weight: 600;
}

.moment-video-play {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(0, 0, 0, .45);
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 3px;
}

.moment-comments {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed var(--line_light);
}
.moment-comment {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text2);
    padding: 4px 0;
    word-break: break-word;
}
.moment-comment-user {
    color: var(--brand_pink);
    font-weight: 600;
}
.moment-comment-input {
    display: flex;
    gap: 8px;
    margin-top: 8px;
}
.moment-comment-input input {
    flex: 1;
    min-width: 0;
    height: 32px;
    padding: 0 10px;
    font-size: 13px;
    border: 1px solid var(--line_regular);
    border-radius: 16px;
    outline: none;
}
.moment-comment-input input:focus {
    border-color: var(--brand_pink);
}
.moment-comment-input button {
    flex: none;
    padding: 0 18px;
    border: none;
    border-radius: 16px;
    background: var(--brand_pink);
    color: #fff;
    font-size: 13px;
    cursor: pointer;
}

/* 页内播放面板按弹层分层（与搜索面板/VPopover 一致 1200） */
.moment-player {
    position: fixed;
    inset: 0;
    z-index: 1200;
    background: rgba(0, 0, 0, .6);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}
.moment-player__box {
    position: relative;
    width: min(560px, 100%);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}
.moment-player__box img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
}
.moment-player__close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
}
.moment-player__info {
    padding: 14px 16px 18px;
}
.moment-player__badge {
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    color: var(--brand_pink);
}
.moment-player__info p {
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text1);
}
.moment-player__dur {
    font-size: 12px;
    color: var(--text3);
}
</style>
