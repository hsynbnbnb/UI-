// 管理端 Mock 层：与 backend_ 的 admin.js 契约一致（{ code, message, data }）。
const ADMIN = {
    uid: 999, username: 'admin', nickname: '平台管理员',
    avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', role: 'SUPER'
}

const MENU = [
    { id: 'dashboard', name: '仪表盘', path: '/dashboard', icon: 'Odometer' },
    { id: 'review', name: '视频审核', path: '/review', icon: 'VideoCamera' },
    { id: 'content', name: '内容管理', path: '/content', icon: 'Document' },
    { id: 'data', name: '数据统计', path: '/data', icon: 'DataLine' },
    { id: 'report', name: '举报处理', path: '/report', icon: 'Warning' },
    { id: 'appeal', name: '申诉处理', path: '/appeal', icon: 'Bell' },
    { id: 'user', name: '用户管理', path: '/user', icon: 'User' },
    { id: 'role', name: '角色权限', path: '/role', icon: 'Lock' }
]

const responses = {
    'GET /admin/personal/info': { code: 200, message: 'OK', data: ADMIN },
    'GET /admin/menu/list': { code: 200, message: 'OK', data: MENU },
    'GET /admin/dashboard/stats': {
        code: 200, message: 'OK',
        data: { users: 12800, videos: 5400, pendingReview: 36, reports: 12, todayUpload: 320, todayPlay: 1240000 }
    },
    'POST /admin/account/logout': { code: 200, message: '已退出', data: null }
}

export function mockRequest(method, url, data, config) {
    const path = url.split('?')[0]
    const key = `${method.toUpperCase()} ${path}`

    // 登录：演示账号 admin / 任意密码
    if (key === 'POST /admin/account/login') {
        return Promise.resolve({
            data: { code: 200, message: '登录成功', data: { token: 'admin-token', admin: ADMIN } },
            config
        })
    }

    let response = responses[key]
    if (!response) response = { code: 200, message: 'OK', data: null }
    return Promise.resolve({
        data: JSON.parse(JSON.stringify(response)),
        config
    })
}
