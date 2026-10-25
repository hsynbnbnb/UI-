import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('@/views/IndexVue.vue')
const ComingSoon = () => import('@/views/ComingSoon.vue')
const VideoDetail = () => import('@/views/detail/VideoDetail.vue')

const routes = [
    { path: '/', name: 'home', component: Index },
    { path: '/search/:type', component: ComingSoon },
    { path: '/space/:uid', component: ComingSoon },
    { path: '/video/:vid', component: VideoDetail },
    { path: '/message/:type', component: ComingSoon },
    { path: '/platform/:type', component: ComingSoon },
    { path: '/:catchAll(.*)', redirect: '/' }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
