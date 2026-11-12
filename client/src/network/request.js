import axios from 'axios'
import { mockRequest } from '@/mock'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE || '/api',
    timeout: 30000
})

function useMock() {
    return process.env.VUE_APP_USE_MOCK === 'true'
}

// 联调期统一留痕：后端未登记(code:501)、业务校验失败(4xx/5xx)在此输出，
// 但不改变响应结构，页面仍按 res.data.code 判定，既有逻辑零影响。
// 后端契约定稿后，可在此把错误映射为统一的 ElMessage 友好提示。
instance.interceptors.response.use(
    (response) => {
        const body = response && response.data
        if (body && typeof body.code !== 'undefined' && body.code !== 200 && process.env.NODE_ENV !== 'production') {
            const method = (response.config && response.config.method || '').toUpperCase()
            const url = response.config && response.config.url
            console.warn(`[API ${body.code}] ${method} ${url}：${body.message || ''}`)
        }
        return response
    },
    (error) => Promise.reject(error)
)

export function get(url, config = {}) {
    if (useMock()) {
        return mockRequest('GET', url, null, config)
    }

    return instance.get(url, config)
}

export function post(url, data, config = {}) {
    if (useMock()) {
        return mockRequest('POST', url, data, config)
    }

    return instance.post(url, data, config)
}

// 预留接口方法：后端已实现 PUT /cart/{id}、DELETE /cart/{id}
// （见 pilipili-backend/docs/接口契约v1对照表.md 2.1），
// 前端购物车接入后端时直接复用，无需再改网络层。
export function put(url, data, config = {}) {
    if (useMock()) {
        return mockRequest('PUT', url, data, config)
    }

    return instance.put(url, data, config)
}

export function del(url, config = {}) {
    if (useMock()) {
        return mockRequest('DELETE', url, null, config)
    }

    return instance.delete(url, config)
}
