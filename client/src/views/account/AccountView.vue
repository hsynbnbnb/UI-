<template>
    <div class="account">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>
        <div class="account-layout">
            <aside class="account-side">
                <div class="side-title">账号设置</div>
                <ul class="side-nav">
                    <li :class="{ active: !type || type === 'profile' }" @click="go('profile')">个人资料</li>
                    <li :class="{ active: type === 'security' }" @click="go('security')">安全与绑定</li>
                </ul>
            </aside>
            <main class="account-main">
                <AccountProfile v-if="!type || type === 'profile'" :user="user"></AccountProfile>
                <AccountSecurity v-else-if="type === 'security'"></AccountSecurity>
            </main>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import AccountProfile from './AccountProfile.vue';
import AccountSecurity from './AccountSecurity.vue';

export default {
    name: 'AccountView',
    components: { HeaderBar, AccountProfile, AccountSecurity },
    props: { type: { type: String, default: 'profile' } },
    computed: {
        user() { return this.$store.state.user || {}; }
    },
    methods: {
        go(t) { this.$router.push(`/account/${t}`); }
    }
}
</script>

<style scoped>
.account-layout {
    display: flex;
    max-width: 1100px;
    margin: 84px auto 40px;
    background: var(--bg1);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .06);
}
.account-side {
    width: 200px;
    background: #f6f7f8;
    padding: 16px 0;
    border-right: 1px solid var(--line_light);
}
.side-title {
    font-size: 14px;
    color: var(--text3);
    padding: 8px 20px;
}
.side-nav li {
    padding: 12px 20px;
    cursor: pointer;
    font-size: 15px;
    color: var(--text1);
}
.side-nav li:hover { background: #eef0f1; }
.side-nav li.active {
    color: var(--brand_pink);
    background: #fff;
    border-left: 3px solid var(--brand_pink);
}
.account-main {
    flex: 1;
    padding: 24px 32px;
}
</style>
