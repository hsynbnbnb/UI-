<template>
    <div class="space-follow">
        <div class="follow-empty" v-if="followList.length === 0">
            <img src="~assets/img/nothing.png" alt="">
            <p>{{ emptyText }}</p>
        </div>
        <ul class="follow-list" v-else>
            <li class="follow-item" v-for="up in followList" :key="up.uid">
                <a :href="`/space/${up.uid}`" target="_blank" class="follow-avatar">
                    <img :src="up.avatar_url" :alt="up.nickname">
                </a>
                <div class="follow-body">
                    <a :href="`/space/${up.uid}`" target="_blank" class="follow-name">{{ up.nickname }}</a>
                    <div class="follow-desc">{{ up.description }}</div>
                    <div class="follow-fans">{{ handleNum(up.fansCount) }}粉丝</div>
                </div>
                <div class="follow-btn" :class="isFollowing(up) ? 'following' : 'not-follow'" @click="toggleFollow(up)">
                    {{ isFollowing(up) ? '已关注' : '+ 关注' }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { handleNum } from '@/utils/utils.js';
import { ElMessage } from 'element-plus';

// Mock 演示：空间主人的关注列表按 $route.params.uid 派生，保证不同空间看到不同数据，
// 不再永远显示当前登录用户自己的 followList，也不新增任何后端接口。
const DEMO_USERS = [
    { uid: 5, nickname: '感动收集站', description: 'Day 8 Mock 用户：收集每一个感动的瞬间', fansCount: 1080 },
    { uid: 6, nickname: '治疗时间', description: '治疗就交给我吧', fansCount: 466 },
    { uid: 16, nickname: '提瓦特观测站长', description: '游戏区认证UP主，一起庆祝每个生日', fansCount: 12800 },
    { uid: 20, nickname: '新歌速递员', description: '新歌速递，快前来围观', fansCount: 230 },
    { uid: 25, nickname: '泛动数据库', description: '学习项目账号', fansCount: 66 },
    { uid: 28, nickname: '恋爱选择题', description: '哥哥的女朋友，只能由我来选', fansCount: 21 },
    { uid: 31, nickname: '前端练习生', description: '30分钟搭一个仿B站首页', fansCount: 2400 },
    { uid: 36, nickname: 'Canvas 研究所', description: '用Canvas画一个弹幕引擎', fansCount: 720 }
];

export default {
    name: "SpaceFollow",
    data() {
        return {
            defaultAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        };
    },
    computed: {
        // 空间主人 uid（切 tab 时 URL 变化会带着 uid，内容随之切换）
        spaceUid() {
            return Number(this.$route.params.uid) || 0;
        },
        followList() {
            const uid = this.spaceUid;
            if (!uid) return [];
            const others = DEMO_USERS.filter(u => u.uid !== uid);
            if (others.length === 0) return [];
            const count = Math.min(others.length, 3 + (uid % 3));
            const start = uid % others.length;
            const list = [];
            for (let i = 0; i < count; i++) {
                list.push({ ...others[(start + i) % others.length], avatar_url: this.defaultAvatar });
            }
            return list;
        },
        emptyText() {
            return this.spaceUid ? `uid ${this.spaceUid} 还没有关注任何 UP 主` : '空间不存在或 uid 无效';
        }
    },
    methods: {
        handleNum(num) {
            return handleNum(num);
        },
        isFollowing(up) {
            return this.$store.state.followList.some(u => u.uid === up.uid);
        },
        toggleFollow(up) {
            if (!this.$store.state.user.uid) {
                this.$store.state.openLogin = true;
                this.$nextTick(() => { this.$store.state.openLogin = false; });
                return;
            }
            const nowFollowed = !this.isFollowing(up);
            this.$store.dispatch("toggleFollow", up);
            ElMessage.success(nowFollowed ? `已关注 ${up.nickname}` : `已取消关注 ${up.nickname}`);
        }
    }
}
</script>

<style scoped>
.space-follow {
    padding: 20px;
}

.follow-empty {
    text-align: center;
    padding: 60px 0;
    color: var(--text3);
}

.follow-empty img {
    width: 200px;
    margin-bottom: 16px;
}

.follow-list {
    list-style: none;
}

.follow-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--line_light);
}

.follow-avatar {
    flex: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
}

.follow-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.follow-body {
    flex: 1;
    min-width: 0;
}

.follow-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--text1);
}

.follow-name:hover {
    color: var(--brand_pink);
}

.follow-desc {
    font-size: 12px;
    color: var(--text3);
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.follow-fans {
    font-size: 12px;
    color: var(--text3);
    margin-top: 4px;
}

.follow-btn {
    flex: none;
    padding: 6px 16px;
    border-radius: 16px;
    font-size: 13px;
    cursor: pointer;
}

.follow-btn.following {
    color: var(--text3);
    border: 1px solid var(--line_regular);
    background: #fff;
}

.follow-btn.following:hover {
    color: var(--brand_pink);
    border-color: var(--brand_pink);
}

.follow-btn.not-follow {
    color: #fff;
    border: 1px solid var(--brand_pink);
    background: var(--brand_pink);
}

.follow-btn.not-follow:hover {
    background: var(--Pi4);
}
</style>
