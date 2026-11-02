import { createRouter, createWebHistory } from 'vue-router'

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

const routes = [
    { path: '/', name: 'home', component: Index },
    {
        path: '/search',
        component: Search,
        props: route => ({ keyword: route.query.keyword }),
        children: [
            { path: '/search/video', component: SearchVideo, props: route => ({ keyword: route.query.keyword }) },
            { path: '/search/user', component: SearchUser, props: route => ({ keyword: route.query.keyword }) }
        ]
    },
    {
        path: '/space',
        component: Space,
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
    { path: '/platform/:type', component: Platform, props: route => ({ type: route.params.type }) },
    // 会员购（商城）路由，路径与 Mobileapp 保持一致：/mall /product/:id /cart /orders
    { path: '/mall', component: Mall },
    { path: '/product/:id', component: MallProductDetail },
    { path: '/cart', component: MallCart },
    { path: '/orders', component: MallOrders },
    { path: '/:catchAll(.*)', redirect: '/' }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
