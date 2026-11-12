import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const Index = () => import('@/views/IndexVue.vue')
const ComingSoon = () => import('@/views/ComingSoon.vue')
const VideoDetail = () => import('@/views/detail/VideoDetail.vue')
const Search = () => import('@/views/search/SearchView.vue')
const SearchVideo = () => import('@/views/search/children/SearchVideo.vue')
const SearchUser = () => import('@/views/search/children/SearchUser.vue')
const Space = () => import('@/views/space/SpaceView.vue')
const SpaceHome = () => import('@/views/space/children/SpaceHome.vue')
const SpaceVideo = () => import('@/views/space/children/SpaceVideo.vue')
const SpaceArticle = () => import('@/views/space/children/SpaceArticle.vue')
const SpaceDynamic = () => import('@/views/space/children/SpaceDynamic.vue')
const SpaceFavlist = () => import('@/views/space/children/SpaceFavlist.vue')
const SpaceSetting = () => import('@/views/space/children/SpaceSetting.vue')
const SpaceFollow = () => import('@/views/space/children/SpaceFollow.vue')
const SpaceFans = () => import('@/views/space/children/SpaceFans.vue')
const Account = () => import('@/views/account/AccountView.vue')
const Message = () => import('@/views/message/MessageView.vue')
const Platform = () => import('@/views/platform/PlatformView.vue')
const Mall = () => import('@/views/mall/MallView.vue')
const MallProductDetail = () => import('@/views/mall/MallProductDetail.vue')
const MallCart = () => import('@/views/mall/MallCart.vue')
const MallOrders = () => import('@/views/mall/MallOrders.vue')
const Moments = () => import('@/views/moments/MomentsView.vue')

const routes = [
    { path: '/', name: 'home', component: Index },
    {
        path: '/search',
        component: Search,
        // 无默认子路由时 <router-view> 无匹配；默认落到视频搜索并保留 query
        // （空关键词时 query 为空，由 SearchView 显示搜索入口页，不报错/不空白）
        redirect: to => ({ path: '/search/video', query: to.query }),
        props: route => ({ keyword: route.query.keyword }),
        children: [
            { path: '/search/video', component: SearchVideo, props: route => ({ keyword: route.query.keyword }) },
            { path: '/search/user', component: SearchUser, props: route => ({ keyword: route.query.keyword }) }
        ]
    },
    {
        path: '/space',
        component: Space,
        // 裸 /space 默认进入当前登录用户空间；未登录回退到演示空间，避免落到 catchAll 回首页
        redirect: () => {
            const uid = store.state.user && store.state.user.uid;
            return `/space/${uid || 16}`;
        },
        children: [
            { path: '/space/:uid', component: SpaceHome },
            { path: '/space/:uid/video', component: SpaceVideo },
            { path: '/space/:uid/article', component: SpaceArticle },
            { path: '/space/:uid/dynamic', component: SpaceDynamic },
            { path: '/space/:uid/favlist', component: SpaceFavlist, props: route => ({ fid: route.query.fid }) },
            { path: '/space/:uid/setting', component: SpaceSetting },
            { path: '/space/:uid/fans/follow', component: SpaceFollow },
            { path: '/space/:uid/fans/fans', component: SpaceFans }
        ]
    },
    { path: '/video/:vid', component: VideoDetail },
    { path: '/message/:type', component: Message, props: route => ({ type: route.params.type }) },
    { path: '/account/:type', component: Account, props: route => ({ type: route.params.type }) },
    { path: '/platform', component: Platform },
    { path: '/platform/:type', component: Platform, props: route => ({ type: route.params.type }) },
    // 会员购（商城）路由，路径与 Mobileapp 保持一致：/mall /product/:id /cart /orders
    { path: '/mall', component: Mall },
    { path: '/product/:id', component: MallProductDetail },
    { path: '/cart', component: MallCart },
    { path: '/orders', component: MallOrders },
    { path: '/moments', component: Moments },
    // 复用已有提示页组件：非法 uid / 失效 vid 的 /notfound 与顶栏「历史」入口都落到这里，
    // 用户能看到当前路由与返回首页按钮，不再被静默送回首页
    { path: '/notfound', name: 'notfound', component: ComingSoon },
    { path: '/history', name: 'history', component: ComingSoon },
    // 所有未注册路径统一跳到明确提示页，并带上原始路径，不再静默 redirect 回首页
    { path: '/:catchAll(.*)', redirect: to => ({ path: '/notfound', query: { from: to.fullPath } }) }
]

// ===== PC 端返回滚动位置保留 =====
// 滚动容器是 window（见 App.vue / 全局样式：#app 无固定高度与 overflow），
// vue-router 在浏览器 POP（前进/后退）时会自动给出 savedPosition，直接使用即可。
// PUSH/REPLACE 必须一律置顶：若按 pathname 读 sessionStorage 兜底，
// 「重新点进曾访问过的页面」会被错误地带回上次的滚动位置。
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return { left: 0, top: 0 };
    }
})

export default router
