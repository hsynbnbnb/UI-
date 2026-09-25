import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/HomePlaceholder.vue')

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/:catchAll(.*)', redirect: '/' }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
