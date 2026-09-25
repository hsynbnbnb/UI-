<template>
    <main class="home-placeholder">
        <h1>Teriteri Client</h1>
        <p>Day 1 客户端工程已经启动。</p>
    </main>
</template>

<script>
export default {
    name: 'HomePlaceholder'
}
</script>

<style scoped>
.home-placeholder {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    color: #18191c;
}

.home-placeholder h1 {
    margin: 0 0 12px;
    color: #fb7299;
}

.home-placeholder p {
    margin: 0;
    color: #61666d;
}
</style>
