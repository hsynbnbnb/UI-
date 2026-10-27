<template>
    <div class="feed">
        <h2 class="feed-title">{{ title }}</h2>
        <el-empty v-if="!list.length" description="暂时没有消息"></el-empty>
        <ul class="feed-list" v-else>
            <li class="feed-item" v-for="m in list" :key="m.id">
                <img class="feed-avatar" :src="m.fromUser ? m.fromUser.avatar : defaultAvatar" alt="" />
                <div class="feed-body">
                    <div class="feed-line">
                        <span class="feed-name">{{ m.fromUser ? m.fromUser.nickname : '系统' }}</span>
                        <span class="feed-time">{{ m.createTime }}</span>
                    </div>
                    <div class="feed-content">{{ m.content }}</div>
                    <div class="feed-source" v-if="m.sourceTitle">来自：{{ m.sourceTitle }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { get } from '@/network/request';

const TITLES = { reply: '回复我的', at: '@ 我的', love: '收到的赞', system: '系统通知', dynamic: '动态' };

export default {
    name: 'MessageFeed',
    props: { type: { type: String, required: true } },
    data() {
        return {
            defaultAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            list: []
        };
    },
    computed: { title() { return TITLES[this.type] || '消息'; } },
    watch: { type: { immediate: true, handler() { this.load(); } } },
    methods: {
        async load() {
            const res = await get(`/message/list/${this.type}`);
            if (res.data.code === 200) this.list = res.data.data || [];
        }
    }
}
</script>

<style scoped>
.feed-title { font-size: 18px; margin-bottom: 16px; color: var(--text1); }
.feed-list { list-style: none; }
.feed-item { display: flex; gap: 12px; padding: 16px 0; border-bottom: 1px solid var(--line_light); }
.feed-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
.feed-body { flex: 1; }
.feed-line { display: flex; justify-content: space-between; }
.feed-name { font-weight: 600; color: var(--text1); }
.feed-time { color: var(--text3); font-size: 12px; }
.feed-content { margin: 6px 0; color: var(--text2); }
.feed-source { color: var(--text3); font-size: 12px; }
</style>
