import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    timeout: 30000
})

export function get(url, config = {}) {
    return instance.get(url, config)
}

export function post(url, data, config = {}) {
    return instance.post(url, data, config)
}
