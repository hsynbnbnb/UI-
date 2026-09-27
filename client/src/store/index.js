import { createStore } from 'vuex'

export default createStore({
    state: {
        isLoading: false,
        isLogin: false,
        openLogin: false,
        user: {}
    },
    mutations: {
        setLoading(state, value) {
            state.isLoading = value
        }
    }
})
