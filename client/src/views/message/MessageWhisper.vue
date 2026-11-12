<template>
    <div class="whisper">
        <div class="whisper-list">
            <div v-for="c in chats" :key="c.chat.id" :class="['chat-item', { active: c.chat.id === activeId }]"
                 @click="selectChat(c)">
                <img class="chat-avatar" :src="c.user.avatar" alt="" />
                <div class="chat-meta">
                    <div class="chat-name">{{ c.user.nickname }}</div>
                    <div class="chat-preview">点击查看会话</div>
                </div>
                <el-badge v-if="c.chat.unread" :value="c.chat.unread" class="chat-badge"></el-badge>
            </div>
        </div>
        <div class="whisper-box" v-if="activeChat">
            <div class="whisper-header">{{ activeChat.user.nickname }}</div>
            <div class="whisper-msgs" ref="msgs">
                <div v-for="m in messages" :key="m.id"
                     :class="['bubble-row', m.sendId === myUid ? 'mine' : 'other']">
                    <div class="bubble">{{ m.content }}</div>
                </div>
            </div>
            <div class="whisper-input">
                <el-input v-model="draft" placeholder="说点什么…" @keyup.enter="send"></el-input>
                <el-button type="primary" @click="send">发送</el-button>
            </div>
        </div>
        <el-empty v-else description="选择一个会话" class="whisper-empty"></el-empty>
    </div>
</template>

<script>
import { get, post } from '@/network/request';

export default {
    name: 'MessageWhisper',
    data() {
        return {
            chats: [],
            activeId: null,
            activeChat: null,
            messages: [],
            draft: ''
        };
    },
    computed: {
        myUid() { return (this.$store.state.user && this.$store.state.user.uid) || 1; }
    },
    created() { this.loadChats(); },
    methods: {
        async loadChats() {
            const res = await get('/message/whisper/list');
            if (res.data.code === 200) {
                this.chats = res.data.data || [];
                // 从空间 / 用户卡片 / 视频页点「发消息」会带 ?uid=，需定位到该 UP 主的会话
                const uid = Number(this.$route.query.uid);
                const target = uid
                    ? this.chats.find(c => Number(c.chat.userId) === uid || Number(c.user && c.user.uid) === uid)
                    : null;
                if (this.chats.length) this.selectChat(target || this.chats[0]);
            }
        },
        async selectChat(c) {
            this.activeId = c.chat.id;
            this.activeChat = c;
            c.chat.unread = 0;
            const res = await get('/message/whisper/detail', { params: { chatId: c.chat.id } });
            if (res.data.code === 200) this.messages = res.data.data || [];
            this.scrollBottom();
        },
        async send() {
            const content = this.draft.trim();
            if (!content || !this.activeChat) return;
            const fd = new FormData();
            fd.append('chatId', this.activeChat.chat.id);
            fd.append('content', content);
            const res = await post('/message/whisper/send', fd);
            if (res.data.code === 200) {
                this.messages.push(res.data.data);
                this.draft = '';
                this.scrollBottom();
            }
        },
        scrollBottom() {
            this.$nextTick(() => {
                const el = this.$refs.msgs;
                if (el) el.scrollTop = el.scrollHeight;
            });
        }
    }
}
</script>

<style scoped>
.whisper { display: flex; height: 520px; }
.whisper-list { width: 260px; border-right: 1px solid var(--line_light); overflow-y: auto; }
.chat-item { display: flex; align-items: center; gap: 10px; padding: 12px; cursor: pointer; position: relative; }
.chat-item:hover, .chat-item.active { background: #f2f3f5; }
.chat-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.chat-name { font-weight: 600; color: var(--text1); }
.chat-preview { color: var(--text3); font-size: 12px; }
.chat-badge { position: absolute; right: 12px; top: 12px; }
.whisper-box { flex: 1; display: flex; flex-direction: column; }
.whisper-header { padding: 14px 18px; border-bottom: 1px solid var(--line_light); font-weight: 600; }
.whisper-msgs { flex: 1; overflow-y: auto; padding: 16px; }
.bubble-row { display: flex; margin-bottom: 12px; }
.bubble-row.mine { justify-content: flex-end; }
.bubble { max-width: 60%; padding: 8px 12px; border-radius: 8px; background: #f1f2f3; color: var(--text1); }
.bubble-row.mine .bubble { background: var(--brand_pink); color: #fff; }
.whisper-input { display: flex; gap: 10px; padding: 12px 16px; border-top: 1px solid var(--line_light); }
.whisper-empty { flex: 1; }
</style>
