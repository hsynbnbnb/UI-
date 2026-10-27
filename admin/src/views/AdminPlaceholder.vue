<template>
    <div class="placeholder">
        <el-empty :description="title + '（建设中，将在后续迭代落地）'"></el-empty>
    </div>
</template>

<script>
export default {
    name: 'AdminPlaceholder',
    computed: {
        title() { return this.$route.meta && this.$route.meta.title ? this.$route.meta.title : '该模块'; }
    }
}
</script>

<style scoped>
.placeholder { padding: 60px 0; }
</style>
