<template>
    <main class="home-placeholder">
        <h1>Teriteri Admin</h1>
        <p>Day 1 管理端工程已经启动。</p>
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
