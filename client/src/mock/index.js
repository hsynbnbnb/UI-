const mockUser = {
    uid: 1,
    username: 'pilipili',
    nickname: 'pilipili 用户',
    avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    gender: 2,
    description: 'Day 3 Mock 登录用户',
    exp: 10800,
    coin: 128,
    vip: 1,
    state: 0,
    role: 0,
    auth: 1,
    authMsg: 'pilipili 演示账号',
    followsCount: 128,
    fansCount: 256,
    loveCount: 1024
}

const mockChannels = [
    {
        mcId: 'anime',
        mcName: '番剧',
        scList: [
            { mcId: 'anime', scId: 'serial', scName: '连载动画' },
            { mcId: 'anime', scId: 'finish', scName: '完结动画' }
        ]
    },
    {
        mcId: 'guochuang',
        mcName: '国创',
        scList: [
            { mcId: 'guochuang', scId: 'chinese', scName: '国产动画' },
            { mcId: 'guochuang', scId: 'original', scName: '国产原创相关' }
        ]
    },
    {
        mcId: 'game',
        mcName: '游戏',
        scList: [
            { mcId: 'game', scId: 'stand_alone', scName: '单机游戏' },
            { mcId: 'game', scId: 'mobile', scName: '手机游戏' }
        ]
    },
    {
        mcId: 'knowledge',
        mcName: '知识',
        scList: [
            { mcId: 'knowledge', scId: 'science', scName: '科学科普' },
            { mcId: 'knowledge', scId: 'tech', scName: '计算机技术' }
        ]
    }
]

const mockTrendings = [
    { content: 'pilipili 首页', type: 2 },
    { content: '视频播放器', type: 1 },
    { content: '会员购', type: 2 },
    { content: 'Vue 3 项目', type: 1 }
]

const responses = {
    'GET /category/getall': { code: 200, message: 'OK', data: mockChannels },
    'GET /search/hot/get': { code: 200, message: 'OK', data: mockTrendings },
    'GET /user/personal/info': { code: 200, message: 'OK', data: mockUser },
    'GET /msg-unread/all': {
        code: 200,
        message: 'OK',
        data: { reply: 1, at: 0, love: 2, system: 1, whisper: 0, dynamic: 0 }
    },
    'GET /favorite/get-all/user': {
        code: 200,
        message: 'OK',
        data: [{ fid: 1, uid: 1, type: 1, visible: 1, title: '默认收藏夹', count: 0 }]
    },
    'GET /comment/get-like-and-dislike': {
        code: 200,
        message: 'OK',
        data: { userLike: [], userDislike: [] }
    },
    'GET /search/count': {
        code: 200,
        message: 'OK',
        data: { video: 0, user: 0 }
    },
    'POST /user/account/login': {
        code: 200,
        message: '登录成功',
        data: {
            token: 'mock-pilipili-token',
            user: mockUser
        }
    },
    'POST /user/account/register': {
        code: 200,
        message: '注册成功',
        data: null
    },
    'POST /user/account/send-code': {
        code: 200,
        message: '验证码已发送（Mock：123456）',
        data: null
    },
    'POST /user/account/phone-login': {
        code: 200,
        message: '登录成功',
        data: {
            token: 'mock-pilipili-phone-token',
            user: mockUser
        }
    }
}

export function mockRequest(method, url, data, config) {
    const path = url.split('?')[0]
    const key = `${method.toUpperCase()} ${path}`
    let response = responses[key]

    if (key === 'GET /search/word/get') {
        const keyword = config?.params?.keyword || ''
        response = {
            code: 200,
            message: 'OK',
            data: keyword ? [`${decodeURIComponent(keyword)} 视频`, `${decodeURIComponent(keyword)} 用户`] : []
        }
    }

    if (key === 'POST /user/account/phone-login' && data?.code !== '123456') {
        response = {
            code: 500,
            message: '验证码错误，请重新输入',
            data: null
        }
    }

    if (response) {
        return Promise.resolve({
            data: JSON.parse(JSON.stringify(response)),
            config
        })
    }

    return Promise.resolve({
        data: {
            code: 200,
            message: 'Mock OK',
            data: null
        },
        config
    })
}
