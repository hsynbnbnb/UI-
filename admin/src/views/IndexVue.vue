<template>
    <div class="layout">
        <!-- 侧边栏（仿 teriteri-admin 白底风格） -->
        <aside class="sidebar" :class="{ collapsed: isCollapse }">
            <div class="logo">
                <span v-if="!isCollapse">pilipili<span class="logo-accent">Admin</span></span>
                <span v-else class="logo-mini">P</span>
            </div>
            <el-menu :default-active="activePath" class="menu" :collapse="isCollapse" router>
                <el-menu-item v-for="m in menus" :key="m.id" :index="m.path">
                    <el-icon><component :is="m.icon" /></el-icon>
                    <template #title>{{ m.name }}</template>
                </el-menu-item>
            </el-menu>
        </aside>

        <div class="main">
            <header class="topbar">
                <div class="crumb">
                    <el-icon class="fold-btn" @click="isCollapse = !isCollapse">
                        <Expand v-if="isCollapse" />
                        <Fold v-else />
                    </el-icon>
                    <span class="crumb-name">{{ currentName }}</span>
                </div>
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
    data() {
        return { isCollapse: false };
    },
    computed: {
        menus() { return this.$store.state.menus; },
        admin() { return this.$store.state.admin; },
        activePath() { return this.$route.path; },
        currentName() {
            const m = this.menus.find(x => this.$route.path.startsWith(x.path));
            return m ? m.name : '首页';
        }
    },
    created() {
        if (!this.menus.length) this.$store.dispatch('loadMenus');
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.replace('/login');
        }
    }
};
</script>

<style scoped>
.layout { display: flex; height: 100vh; background: #fafafa; }
.sidebar {
    width: 220px;
    background: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 10px -1px rgba(85, 85, 85, .08), 0 1px 10px rgba(85, 85, 85, .06);
    transition: width .25s;
    z-index: 10;
}
.sidebar.collapsed { width: 64px; }
.logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: #18191c;
    border-bottom: 1px solid #f0f0f0;
    white-space: nowrap;
    overflow: hidden;
}
.logo-accent { color: #FB7299; }
.logo-mini { color: #FB7299; font-size: 24px; }
.menu { border-right: none; flex: 1; padding: 8px; }
.menu :deep(.el-menu-item) {
    height: 48px;
    border-radius: 8px;
    margin-bottom: 4px;
    color: #61666d;
}
.menu :deep(.el-menu-item:hover) { background: #f6f7f8; }
.menu :deep(.el-menu-item.is-active) {
    background: #fff0f5;
    color: #FB7299;
    font-weight: 600;
}
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.topbar {
    height: 64px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .06);
}
.crumb { display: flex; align-items: center; gap: 12px; }
.fold-btn { font-size: 20px; cursor: pointer; color: #61666d; }
.fold-btn:hover { color: #FB7299; }
.crumb-name { font-size: 16px; font-weight: 600; color: #18191c; }
.user { display: flex; align-items: center; gap: 10px; }
.avatar { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; }
.nickname { color: #18191c; }
.content { flex: 1; padding: 24px; overflow-y: auto; }
</style>
