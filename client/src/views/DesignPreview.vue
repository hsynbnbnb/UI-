<template>
    <main class="design-preview">
        <header class="preview-header">
            <h1>pilipili UI Foundation</h1>
            <p>Day 2：全局样式与基础组件</p>
        </header>

        <NavBar :navBarItem="navItems" @clickBarItem="handleNavClick"></NavBar>

        <section class="preview-grid">
            <article class="preview-panel">
                <h2>头像与等级</h2>
                <div class="inline-row">
                    <VAvatar :img="demoUser.avatar_url" :size="48" :auth="1"></VAvatar>
                    <VLevel :level="5" :size="16"></VLevel>
                </div>
            </article>

            <article class="preview-panel">
                <h2>悬浮弹层</h2>
                <VPopover trigger="hover" placement="bottom">
                    <template #reference>
                        <button class="preview-button">悬停查看</button>
                    </template>
                    <template #content>
                        <div class="popover-demo">VPopover 组件运行正常</div>
                    </template>
                </VPopover>
            </article>

            <article class="preview-panel user-card-panel">
                <h2>用户卡片</h2>
                <UserCard :user="demoUser"></UserCard>
            </article>
        </section>
    </main>
</template>

<script>
import NavBar from '@/components/navbar/NavBar.vue'
import VAvatar from '@/components/avatar/VAvatar.vue'
import VLevel from '@/components/UserCard/VLevel.vue'
import VPopover from '@/components/popover/VPopover.vue'
import UserCard from '@/components/UserCard/UserCard.vue'

export default {
    name: 'DesignPreview',
    components: {
        NavBar,
        VAvatar,
        VLevel,
        VPopover,
        UserCard
    },
    data() {
        return {
            navItems: [
                { name: '首页', path: '/' },
                { name: '视频', path: '/video' },
                { name: '会员购', path: '/mall' }
            ],
            demoUser: {
                uid: 1,
                nickname: 'pilipili 用户',
                avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
                bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
                gender: 2,
                exp: 10800,
                vip: 1,
                auth: 1,
                authMsg: '项目演示账号',
                description: 'Day 2 基础组件预览',
                followsCount: 128,
                fansCount: 256,
                loveCount: 1024
            }
        }
    },
    methods: {
        handleNavClick(path) {
            this.$message.info(`当前选择：${path}`)
        }
    }
}
</script>

<style scoped>
.design-preview {
    min-height: 100vh;
    padding-bottom: 64px;
    background: var(--bg1);
    color: var(--text1);
}

.preview-header {
    padding: 42px 40px 20px;
}

.preview-header h1 {
    margin: 0 0 8px;
    color: var(--brand_pink);
    font-size: 28px;
}

.preview-header p {
    margin: 0;
    color: var(--text3);
}

.preview-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(280px, 1fr));
    gap: 24px;
    padding: 32px 40px;
}

.preview-panel {
    min-height: 150px;
    padding: 24px;
    border: 1px solid var(--line_regular);
    border-radius: 8px;
    background: var(--bg1_float);
}

.preview-panel h2 {
    margin: 0 0 20px;
    font-size: 16px;
    font-weight: 600;
}

.inline-row {
    display: flex;
    align-items: center;
    gap: 16px;
}

.preview-button {
    height: 34px;
    padding: 0 18px;
    border: none;
    border-radius: 6px;
    background: var(--brand_pink);
    color: #fff;
    cursor: pointer;
}

.popover-demo {
    padding: 12px 16px;
    color: var(--text2);
    white-space: nowrap;
}

.user-card-panel {
    grid-column: 1 / -1;
}
</style>
