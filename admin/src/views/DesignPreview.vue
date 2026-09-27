<template>
    <main class="design-preview">
        <header class="preview-header">
            <h1>pilipili Admin UI Foundation</h1>
            <p>Day 2：全局样式与基础弹层组件</p>
        </header>

        <section class="preview-panel">
            <h2>VPopover 弹层预览</h2>
            <VPopover trigger="click" placement="bottom">
                <template #reference>
                    <button class="preview-button">点击打开菜单</button>
                </template>
                <template #content>
                    <div class="popover-menu">
                        <div>个人账户</div>
                        <div>日程安排</div>
                        <div>退出登录</div>
                    </div>
                </template>
            </VPopover>
        </section>
    </main>
</template>

<script>
import VPopover from '@/components/popover/VPopover.vue'

export default {
    name: 'DesignPreview',
    components: {
        VPopover
    }
}
</script>

<style scoped>
.design-preview {
    min-height: 100vh;
    padding: 42px 40px;
    background: var(--bg1);
    color: var(--text1);
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

.preview-panel {
    width: 360px;
    margin-top: 32px;
    padding: 24px;
    border: 1px solid var(--line_regular);
    border-radius: 8px;
    background: var(--bg1_float);
}

.preview-panel h2 {
    margin: 0 0 20px;
    font-size: 16px;
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

.popover-menu {
    width: 160px;
    padding: 8px 0;
}

.popover-menu div {
    padding: 10px 18px;
    cursor: pointer;
}

.popover-menu div:hover {
    background: var(--graph_bg_regular);
    color: var(--brand_pink);
}
</style>
