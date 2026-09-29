import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/DesignPreview.vue')
const ComingSoon = () => import('@/views/ComingSoon.vue')

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/search/:type', component: ComingSoon },
    { path: '/space/:uid', component: ComingSoon },
    { path: '/video/:vid', component: ComingSoon },
    { path: '/message/:type', component: ComingSoon },
    { path: '/platform/:type', component: ComingSoon },
    { path: '/:catchAll(.*)', redirect: '/' }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
