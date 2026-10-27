<template>
    <div class="message">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>
        <div class="message-layout">
            <aside class="message-side">
                <div v-for="item in tabs" :key="item.type"
                     :class="['msg-tab', { active: item.type === resolvedType }]"
                     @click="go(item.type)">
                    <span>{{ item.name }}</span>
                    <el-badge v-if="unreadOf(item.type)" :value="unreadOf(item.type)" class="badge"></el-badge>
                </div>
            </aside>
            <main class="message-main">
                <MessageFeed v-if="isFeed" :type="resolvedType"></MessageFeed>
                <MessageWhisper v-else></MessageWhisper>
            </main>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import MessageFeed from './MessageFeed.vue';
import MessageWhisper from './MessageWhisper.vue';

const UNREAD_INDEX = { reply: 0, at: 1, love: 2, system: 3, whisper: 4, dynamic: 5 };

export default {
    name: 'MessageView',
    components: { HeaderBar, MessageFeed, MessageWhisper },
    props: { type: { type: String, default: 'reply' } },
    data() {
        return {
            tabs: [
                { type: 'reply', name: '回复我的' },
                { type: 'at', name: '@ 我的' },
                { type: 'love', name: '收到的赞' },
                { type: 'system', name: '系统通知' },
                { type: 'whisper', name: '我的消息' },
                { type: 'dynamic', name: '动态' }
            ]
        };
    },
    computed: {
        resolvedType() { return this.tabs.some(t => t.type === this.type) ? this.type : 'reply'; },
        isFeed() { return this.resolvedType !== 'whisper'; }
    },
    methods: {
        unreadOf(type) { return this.$store.state.msgUnread[UNREAD_INDEX[type]] || 0; },
        go(t) { this.$router.push(`/message/${t}`); }
    }
}
</script>

<style scoped>
.message-layout {
    display: flex;
    max-width: 1000px;
    margin: 84px auto 40px;
    background: var(--bg1);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .06);
    min-height: 520px;
}
.message-side {
    width: 180px;
    background: #f6f7f8;
    padding: 12px 0;
    border-right: 1px solid var(--line_light);
}
.msg-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    cursor: pointer;
    font-size: 15px;
    color: var(--text1);
}
.msg-tab:hover { background: #eef0f1; }
.msg-tab.active { color: var(--brand_pink); background: #fff; border-left: 3px solid var(--brand_pink); }
.message-main { flex: 1; padding: 20px 28px; }
</style>
