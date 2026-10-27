<template>
    <div class="layout">
        <aside class="sidebar">
            <div class="logo">pilipili<span>Admin</span></div>
            <ul class="menu">
                <li v-for="m in menus" :key="m.id" :class="{ active: activePath === m.path }" @click="go(m.path)">
                    <el-icon><component :is="m.icon" /></el-icon>
                    <span>{{ m.name }}</span>
                </li>
            </ul>
        </aside>
        <div class="main">
            <header class="topbar">
                <div class="crumb">{{ currentName }}</div>
                <div class="user">
                    <img class="avatar" :src="admin.avatar" alt="" />
                    <span class="nickname">{{ admin.nickname }}</span>
                    <el-button text type="primary" @click="logout">退出</el-button>
                </div>
            </header>
            <main class="content">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IndexVue',
    computed: {
        menus() { return this.$store.state.menus; },
        admin() { return this.$store.state.admin; },
        activePath() { return this.$route.path; },
        currentName() {
            const m = this.menus.find(x => this.$route.path.startsWith(x.path));
            return m ? m.name : '仪表盘'
        }
    },
    created() {
        if (!this.menus.length) this.$store.dispatch('loadMenus');
    },
    methods: {
        go(path) { this.$router.push(path); },
        logout() {
            this.$store.dispatch('logout');
            this.$router.replace('/login');
        }
    }
}
</script>

<style scoped>
.layout { display: flex; height: 100vh; }
.sidebar { width: 220px; background: #1f1147; color: #cfcfe6; display: flex; flex-direction: column; }
.logo { padding: 22px 24px; font-size: 20px; font-weight: 700; color: #fff; }
.logo span { color: #FB7299; }
.menu { list-style: none; flex: 1; }
.menu li { display: flex; align-items: center; gap: 12px; padding: 14px 24px; cursor: pointer; color: #cfcfe6; }
.menu li:hover { background: rgba(255, 255, 255, .06); }
.menu li.active { background: #FB7299; color: #fff; }
.main { flex: 1; display: flex; flex-direction: column; background: #f5f6f8; }
.topbar { height: 60px; background: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
.crumb { font-size: 16px; font-weight: 600; color: #333; }
.user { display: flex; align-items: center; gap: 10px; }
.avatar { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; }
.nickname { color: #333; }
.content { flex: 1; padding: 24px; overflow-y: auto; }
</style>
