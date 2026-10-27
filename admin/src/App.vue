<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'App',
    created() {
        if (localStorage.getItem('admin_token') && !this.$store.state.isLogin) {
            this.$store.dispatch('loadInfo')
            this.$store.dispatch('loadMenus')
        }
    }
}
</script>
