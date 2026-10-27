import { createStore } from 'vuex'
import { get, post } from '@/network/request'

export default createStore({
    state: {
        isLogin: false,
        admin: {},
        menus: []
    },
    mutations: {
        setAdmin(state, admin) {
            state.admin = admin
            state.isLogin = true
        },
        setMenus(state, menus) { state.menus = menus },
        clearAdmin(state) {
            state.isLogin = false
            state.admin = {}
            state.menus = []
        }
    },
    actions: {
        async login({ commit }, payload) {
            const res = await post('/admin/account/login', payload)
            if (res.data.code === 200) {
                localStorage.setItem('admin_token', res.data.data.token)
                commit('setAdmin', res.data.data.admin)
            }
            return res
        },
        async loadInfo({ commit }) {
            const res = await get('/admin/personal/info')
            if (res.data.code === 200) commit('setAdmin', res.data.data)
        },
        async loadMenus({ commit }) {
            const res = await get('/admin/menu/list')
            if (res.data.code === 200) commit('setMenus', res.data.data)
        },
        logout({ commit }) {
            post('/admin/account/logout').catch(() => {})
            localStorage.removeItem('admin_token')
            commit('clearAdmin')
        }
    }
})
