<template>
    <div class="coming-soon">
        <h1>功能建设中</h1>
        <p>当前路由：{{ $route.fullPath }}</p>
        <button @click="$router.push('/')">返回首页</button>
    </div>
</template>

<script>
export default {
    name: 'ComingSoon'
}
</script>

<style scoped>
.coming-soon {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg1);
    color: var(--text1);
}

.coming-soon p {
    color: var(--text3);
}

.coming-soon button {
    height: 36px;
    padding: 0 20px;
    border: 0;
    border-radius: 6px;
    background: var(--brand_pink);
    color: #fff;
    cursor: pointer;
}
</style>
