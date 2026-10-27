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

const REVIEW_COVER = 'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231112/img/cover/1699782969068e3233962e04a4d54ad29ac078b31add0.jpg'
const REVIEW_VIDEOS = [
    { vid: 16, title: '一起来庆祝原神生日吧！', uid: 6, nickname: '治疗时间', duration: 356, uploadDate: '2026-10-05 12:00', play: 45000, danmu: 520, status: 1 },
    { vid: 28, title: '哥哥的女朋友，只能由我来选', uid: 5, nickname: '感动收集站', duration: 214, uploadDate: '2026-10-12 18:30', play: 12000, danmu: 200, status: 0 },
    { vid: 5, title: '还记得那年感动的瞬间吗', uid: 5, nickname: '感动收集站', duration: 189, uploadDate: '2026-09-28 20:15', play: 33000, danmu: 410, status: 0 },
    { vid: 6, title: '治疗就交给我吧', uid: 6, nickname: '治疗时间', duration: 243, uploadDate: '2026-09-20 09:40', play: 28000, danmu: 300, status: 1 },
    { vid: 20, title: '美依礼芽新歌MV发布', uid:20, nickname: '新歌速递员', duration: 268, uploadDate: '2026-09-15 21:05', play: 56000, danmu: 700, status: 2 },
    { vid: 31, title: '【Vue3】30分钟搭一个仿B站首页', uid: 31, nickname: '前端练习生', duration: 1836, uploadDate: '2026-10-18 10:10', play: 88000, danmu: 980, status: 0 },
    { vid: 32, title: '前端开发者必备的CSS布局技巧', uid: 31, nickname: '前端练习生', duration: 945, uploadDate: '2026-10-16 14:20', play: 67000, danmu: 720, status: 1 },
    { vid: 33, title: '从零手写一个视频播放器控件', uid: 31, nickname: '前端练习生', duration: 1265, uploadDate: '2026-10-14 09:00', play: 54000, danmu: 610, status: 1 },
    { vid: 37, title: '用Canvas画一个弹幕引擎', uid: 36, nickname: 'Canvas 研究所', duration: 1024, uploadDate: '2026-10-07 15:15', play: 49000, danmu: 560, status: 2 },
    { vid: 38, title: 'Element Plus 组件库快速上手', uid: 36, nickname: 'Canvas 研究所', duration: 658, uploadDate: '2026-10-03 11:25', play: 41000, danmu: 470, status: 0 },
    { vid: 40, title: '大文件分片上传原理解析', uid: 31, nickname: '前端练习生', duration: 892, uploadDate: '2026-09-26 13:05', play: 38000, danmu: 430, status: 1 },
    { vid: 45, title: 'WebSocket实时弹幕通信实战', uid: 36, nickname: 'Canvas 研究所', duration: 1146, uploadDate: '2026-09-04 14:10', play: 72000, danmu: 810, status: 0 }
]
REVIEW_VIDEOS.forEach(v => { v.coverUrl = REVIEW_COVER })
const REVIEW_COUNTS = (() => {
    let p = 0, a = 0, r = 0
    REVIEW_VIDEOS.forEach(v => { if (v.status === 0) p++; else if (v.status === 1) a++; else r++ })
    return { pending: p, approved: a, rejected: r }
})()

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

    // Day 12 视频审核
    if (key === 'GET /admin/video/review/count') {
        response = { code: 200, message: 'OK', data: REVIEW_COUNTS }
    }
    if (key === 'GET /admin/video/review/list') {
        const page = Number(config && config.params && config.params.page || 1)
        const size = Number(config && config.params && config.params.size || 10)
        const status = config && config.params && config.params.status !== undefined && config.params.status !== ''
            ? Number(config.params.status) : null
        const filtered = status === null ? REVIEW_VIDEOS : REVIEW_VIDEOS.filter(v => v.status === status)
        const start = (page - 1) * size
        response = {
            code: 200, message: 'OK',
            data: { list: filtered.slice(start, start + size), total: filtered.length, page, size, hasNext: start + size < filtered.length }
        }
    }
    if (key === 'GET /admin/video/detail') {
        const vid = Number(config && config.params && config.params.vid || 16)
        const base = REVIEW_VIDEOS.find(v => v.vid === vid) || REVIEW_VIDEOS[0]
        response = {
            code: 200, message: 'OK',
            data: { video: { ...base, videoUrl: '' }, user: { uid: base.uid, nickname: base.nickname }, reviewStatus: base.status }
        }
    }
    if (key === 'POST /admin/video/review') {
        response = {
            code: 200, message: '审核完成',
            data: { vid: data && (data.vid || data.videoId), status: data && (data.status || data.reviewStatus), reason: data && (data.reason || data.remark) || '' }
        }
    }
    if (key === 'POST /admin/video/preview') {
        response = { code: 200, message: '预览成功', data: null }
    }

    if (!response) response = { code: 200, message: 'OK', data: null }
    return Promise.resolve({
        data: JSON.parse(JSON.stringify(response)),
        config
    })
}
