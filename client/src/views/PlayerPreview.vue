<template>
    <div class="player-preview">
        <HeaderBar :isFixHeaderBar="false"></HeaderBar>
        <main class="preview-body">
            <div class="preview-tip">
                <h1>Day 5：视频播放器</h1>
                <p>
                    复刻 PlayerWrapper 播放器：进度条、音量、倍速、清晰度、弹幕设置与播放速度弹层均可操作；
                    弹幕数据来自 Mock。Day 6 将把本页替换为完整的视频详情页。
                </p>
                <router-link class="back-home" to="/">返回首页</router-link>
            </div>
            <PlayerWrap :videoUrl="videoUrl" :title="title" :duration="duration" :user="user"
                :population="population" @sendDm="onSendDm"></PlayerWrap>
        </main>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import PlayerWrap from '@/components/player/PlayerWrapper.vue';

// Day 5 Mock 弹幕：字段与播放器渲染所需一致（timePoint 秒 / mode 1滚动 2顶部 3底部）
const mockDanmu = [
    { id: 1, uid: 16, content: '第一条弹幕前来报到', timePoint: 1, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 2, uid: 20, content: 'Day 5 播放器复刻完成', timePoint: 2, mode: 1, fontsize: 22, color: '#FF6699' },
    { id: 3, uid: 25, content: '这个进度条可以拖动', timePoint: 3, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 4, uid: 31, content: '倍速和清晰度在设置里', timePoint: 4, mode: 2, fontsize: 22, color: '#FFFFFF' },
    { id: 5, uid: 16, content: '弹幕可以开关和调节', timePoint: 5, mode: 1, fontsize: 22, color: '#FFD700' },
    { id: 6, uid: 36, content: '键盘快捷键也可以试试', timePoint: 6, mode: 3, fontsize: 22, color: '#FFFFFF' },
    { id: 7, uid: 16, content: '播放、暂停、全屏都正常', timePoint: 8, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 8, uid: 25, content: 'Bad Apple 示例影片', timePoint: 10, mode: 1, fontsize: 22, color: '#FF6699' }
];

export default {
    name: 'PlayerPreview',
    components: {
        HeaderBar,
        PlayerWrap
    },
    data() {
        return {
            videoUrl: require('@/assets/video/BadApple.mp4'),
            title: 'Bad Apple!! 示例影片（Day 5 Mock）',
            duration: 219,
            user: { uid: 16, nickname: '提瓦特观测站长' },
            population: 108
        }
    },
    mounted() {
        // 子组件播放器挂载后才写入 store，确保其 danmuList 监听生效
        this.$store.commit('updateDanmuList', mockDanmu.slice());
    },
    methods: {
        // 播放器内发送弹幕：与 VideoDetail 的处理一致，写入 store
        onSendDm(dm) {
            this.$store.state.danmuList.push(dm);
        }
    }
}
</script>

<style scoped>
.player-preview {
    min-height: 100vh;
    background: var(--bg1);
    color: var(--text1);
}

.preview-body {
    margin: 0 auto;
    max-width: 1400px;
    padding: 20px 24px 60px;
}

.preview-tip h1 {
    margin: 0 0 8px;
    font-size: 20px;
}

.preview-tip p {
    margin: 0 0 12px;
    color: var(--text2);
    font-size: 13px;
}

.back-home {
    display: inline-block;
    margin-bottom: 16px;
    padding: 6px 14px;
    border-radius: 6px;
    background: var(--brand_pink);
    color: #fff;
    font-size: 13px;
    text-decoration: none;
}
</style>
