import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/LoginVue.vue'
import IndexVue from '@/views/IndexVue.vue'
import DashboardView from '@/views/DashboardView.vue'
import AdminTableView from '@/views/AdminTableView.vue'
import VideoReview from '@/views/VideoReview.vue'

const routes = [
    { path: '/login', name: 'login', component: LoginVue },
    {
        path: '/',
        component: IndexVue,
        meta: { requiresAuth: true },
        children: [
            { path: '', redirect: '/dashboard' },
            { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true, title: '仪表盘' } },
            { path: 'review', name: 'review', component: VideoReview, meta: { requiresAuth: true, title: '视频审核' } },
            { path: 'content', name: 'content', component: AdminTableView, meta: { requiresAuth: true, title: '内容管理', endpoint: '/admin/content/list' } },
            { path: 'data', name: 'data', component: AdminTableView, meta: { requiresAuth: true, title: '数据统计', endpoint: '/admin/data/overview' } },
            { path: 'report', name: 'report', component: AdminTableView, meta: { requiresAuth: true, title: '举报处理', endpoint: '/admin/report/list' } },
            { path: 'appeal', name: 'appeal', component: AdminTableView, meta: { requiresAuth: true, title: '申诉处理', endpoint: '/admin/appeal/list' } },
            { path: 'user', name: 'user', component: AdminTableView, meta: { requiresAuth: true, title: '用户管理', endpoint: '/admin/user/list' } },
            { path: 'role', name: 'role', component: AdminTableView, meta: { requiresAuth: true, title: '角色权限', endpoint: '/admin/role/list' } }
        ]
    },
    { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLogin = router.app.$store ? router.app.$store.state.isLogin : false
    const hasToken = !!localStorage.getItem('admin_token')
    if (to.meta.requiresAuth && !isLogin && !hasToken) {
        next('/login')
    } else if (to.path === '/login' && (isLogin || hasToken)) {
        next('/')
    } else {
        next()
    }
})

export default router
