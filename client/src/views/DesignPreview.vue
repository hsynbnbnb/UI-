<template>
    <div class="client-shell">
        <HeaderBar :isFixHeaderBar="false"></HeaderBar>

        <div class="channel-shell">
            <HeaderChannel></HeaderChannel>
        </div>

        <main class="preview-content">
            <section class="preview-intro">
                <h1>pilipili Client</h1>
                <p>Day 3：顶部导航、频道栏、搜索框和登录注册。</p>
            </section>

            <section class="search-preview">
                <h2>搜索组件预览</h2>
                <SearchInput></SearchInput>
            </section>

            <section class="preview-grid">
                <article class="preview-panel">
                    <h2>当前登录状态</h2>
                    <p>{{ $store.state.isLogin ? `已登录：${$store.state.user.nickname}` : '未登录，可点击右上角登录' }}</p>
                </article>

                <article class="preview-panel">
                    <h2>Mock 数据</h2>
                    <p>频道数量：{{ $store.state.channels.length }}</p>
                    <p>热搜数量：{{ $store.state.trendings.length }}</p>
                </article>
            </section>
        </main>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue'
import HeaderChannel from '@/components/headerChannel/HeaderChannel.vue'
import SearchInput from '@/components/search/SearchInput.vue'

export default {
    name: 'DesignPreview',
    components: {
        HeaderBar,
        HeaderChannel,
        SearchInput
    }
}
</script>

<style scoped>
.client-shell {
    min-height: 100vh;
    background: var(--bg1);
    color: var(--text1);
}

.channel-shell {
    padding-top: 64px;
}

.preview-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px 80px;
}

.preview-intro h1 {
    margin: 0 0 8px;
    color: var(--brand_pink);
    font-size: 28px;
}

.preview-intro p {
    margin: 0;
    color: var(--text3);
}

.search-preview {
    margin-top: 40px;
    padding: 24px;
    border: 1px solid var(--line_regular);
    border-radius: 8px;
    background: var(--bg1_float);
}

.search-preview h2,
.preview-panel h2 {
    margin: 0 0 16px;
    font-size: 16px;
}

.preview-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    gap: 24px;
    margin-top: 24px;
}

.preview-panel {
    padding: 24px;
    border: 1px solid var(--line_regular);
    border-radius: 8px;
    background: var(--bg1_float);
}

.preview-panel p {
    margin: 8px 0 0;
    color: var(--text2);
}
</style>
