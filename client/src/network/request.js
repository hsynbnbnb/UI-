import axios from 'axios'
import { mockRequest } from '@/mock'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE || '/api',
    timeout: 30000
})

function useMock() {
    return process.env.VUE_APP_USE_MOCK === 'true'
}

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
