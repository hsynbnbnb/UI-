import { createStore } from 'vuex'

export default createStore({
    state: {
        isLoading: false,
        isLogin: false,
        user: {}
    },
    mutations: {
        setLoading(state, value) {
            state.isLoading = value
        }
    }
})
