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

// Day 4 首页推荐流 Mock：封面沿用 carousel.json 中的 OSS 封面（断网时仅保布局）
const mockCovers = [
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20240322/img/cover/1711110712131c01f29fff12245a78e31cb36033e04ab.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231112/img/cover/1699782969068e3233962e04a4d54ad29ac078b31add0.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231102/img/cover/16989300077191113ff089d75455a89a91ef0c1b89aab.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231102/img/cover/169893110490716d5c74c17514eaea15cffcc3b4944a6.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231117/img/cover/17001510817100b014757b37643f186af536d99f10e36.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231226/img/cover/17035809290911763e6df5b5045a79df241f241a9dd65.jpg'
]

const mockUploaders = [
    { uid: 5, username: 'pilipili05', nickname: '感动收集站', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: 'Day 4 Mock UP主', exp: 10800, coin: 128, vip: 0, state: 0, role: 0, auth: 0, authMsg: '' },
    { uid: 6, username: 'pilipili06', nickname: '治疗时间', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: 'Day 4 Mock UP主', exp: 4500, coin: 52, vip: 0, state: 0, role: 0, auth: 0, authMsg: '' },
    { uid: 16, username: 'pilipili16', nickname: '提瓦特观测站长', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 1, description: 'Day 4 Mock UP主', exp: 28800, coin: 666, vip: 3, state: 0, role: 0, auth: 2, authMsg: '游戏区认证UP主' },
    { uid: 20, username: 'pilipili20', nickname: '新歌速递员', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 0, description: 'Day 4 Mock UP主', exp: 1500, coin: 12, vip: 0, state: 0, role: 0, auth: 0, authMsg: '' },
    { uid: 25, username: 'pilipili25', nickname: '泛动数据库', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: 'Day 4 Mock UP主', exp: 200, coin: 3.5, vip: 0, state: 0, role: 0, auth: 1, authMsg: '学习项目账号' },
    { uid: 28, username: 'pilipili28', nickname: '恋爱选择题', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: 'Day 4 Mock UP主', exp: 50, coin: 0.5, vip: 0, state: 0, role: 0, auth: 0, authMsg: '' },
    { uid: 31, username: 'pilipili31', nickname: '前端练习生', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 1, description: 'Day 4 Mock UP主', exp: 10800, coin: 88, vip: 1, state: 0, role: 0, auth: 0, authMsg: '' },
    { uid: 36, username: 'pilipili36', nickname: 'Canvas 研究所', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', background: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: 'Day 4 Mock UP主', exp: 4500, coin: 36, vip: 0, state: 0, role: 0, auth: 0, authMsg: '' }
]

// 前 6 条与 carousel.json 的跳转目标保持一致，便于 Day 6 视频详情页衔接
const mockVideoSeeds = [
    { vid: 28, title: '哥哥的女朋友，只能由我来选', duration: 214, mcId: 'anime', scId: 'serial', mcName: '番剧', scName: '连载动画', uploadDate: '2026-10-12 18:30' },
    { vid: 16, title: '一起来庆祝原神生日吧！', duration: 356, mcId: 'game', scId: 'stand_alone', mcName: '游戏', scName: '单机游戏', uploadDate: '2026-10-05 12:00' },
    { vid: 5, title: '还记得那年感动的瞬间吗', duration: 189, mcId: 'anime', scId: 'finish', mcName: '番剧', scName: '完结动画', uploadDate: '2026-09-28 20:15' },
    { vid: 6, title: '治疗就交给我吧，不会让你失望的❥(^_-)', duration: 243, mcId: 'guochuang', scId: 'chinese', mcName: '国创', scName: '国产动画', uploadDate: '2026-09-20 09:40' },
    { vid: 20, title: '美依礼芽新歌MV发布，快前来围观>>>', duration: 268, mcId: 'music', scId: 'mv', mcName: '音乐', scName: 'MV', uploadDate: '2026-09-15 21:05' },
    { vid: 25, title: '拜托～圣诞节和我一起过吧', duration: 175, mcId: 'life', scId: 'daily', mcName: '生活', scName: '日常', uploadDate: '2026-08-30 16:20' },
    { vid: 31, title: '【Vue3】30分钟搭一个仿B站首页', duration: 1836, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-10-18 10:10' },
    { vid: 32, title: '前端开发者必备的CSS布局技巧', duration: 945, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-10-16 14:20' },
    { vid: 33, title: '从零手写一个视频播放器控件', duration: 1265, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-10-14 09:00' },
    { vid: 34, title: 'JavaScript事件循环到底怎么跑', duration: 723, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-10-11 19:45' },
    { vid: 35, title: '一天时间里程序员都在做什么', duration: 412, mcId: 'life', scId: 'daily', mcName: '生活', scName: '日常', uploadDate: '2026-10-09 08:30' },
    { vid: 37, title: '用Canvas画一个弹幕引擎', duration: 1024, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-10-07 15:15' },
    { vid: 38, title: 'Element Plus 组件库快速上手', duration: 658, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-10-03 11:25' },
    { vid: 39, title: '仿B站轮播图：过渡动画实现原理', duration: 486, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-09-30 17:40' },
    { vid: 40, title: '大文件分片上传原理解析', duration: 892, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-09-26 13:05' },
    { vid: 41, title: 'Vue Router 路由守卫完全指南', duration: 734, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-09-22 10:50' },
    { vid: 42, title: 'Vuex状态管理避坑手册', duration: 615, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-09-18 16:35' },
    { vid: 43, title: '首页骨架屏是怎么做出来的', duration: 398, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-09-12 09:20' },
    { vid: 44, title: '一行代码搞定图片懒加载', duration: 287, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-09-08 20:55' },
    { vid: 45, title: 'WebSocket实时弹幕通信实战', duration: 1146, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-09-04 14:10' },
    { vid: 46, title: '如何用Git Tag管理14天学习计划', duration: 356, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-08-29 18:00' },
    { vid: 47, title: 'Mock请求拦截的三种方式', duration: 522, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-08-25 12:45' },
    { vid: 48, title: '视频网站推荐算法是怎么来的', duration: 678, mcId: 'knowledge', scId: 'science', mcName: '知识', scName: '科学科普', uploadDate: '2026-08-21 15:30' },
    { vid: 49, title: '从设计稿到前端组件化开发', duration: 845, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-08-17 09:15' },
    { vid: 50, title: '浏览器渲染流程与重绘重排', duration: 713, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-08-13 19:25' },
    { vid: 51, title: '响应式布局：1366与1920的适配', duration: 564, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-08-09 11:40' },
    { vid: 52, title: '动画性能优化：transform的秘密', duration: 437, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-08-05 16:55' },
    { vid: 53, title: '一次真实的前端性能调优记录', duration: 968, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-08-02 10:05' },
    { vid: 54, title: '程序员的美食日记：深夜厨房', duration: 326, mcId: 'life', scId: 'funny', mcName: '生活', scName: '搞笑', uploadDate: '2026-07-29 21:20' },
    { vid: 55, title: '14天复刻一个网站，我学到了什么', duration: 486, mcId: 'knowledge', scId: 'tech', mcName: '知识', scName: '计算机技术', uploadDate: '2026-07-25 14:00' }
]

function buildMockVideoItem(seed, index) {
    const uploader = mockUploaders[index % mockUploaders.length]
    const play = 12000 + index * 3571
    const danmu = 200 + index * 37
    return {
        video: {
            vid: seed.vid,
            uid: uploader.uid,
            title: seed.title,
            type: 1,
            auth: 0,
            duration: seed.duration,
            mcId: seed.mcId,
            scId: seed.scId,
            tags: '学习,前端,UI复刻',
            descr: 'Day 4 Mock 视频简介',
            coverUrl: mockCovers[index % mockCovers.length],
            videoUrl: '',
            status: 1,
            uploadDate: seed.uploadDate,
            deleteDate: null
        },
        user: uploader,
        stats: {
            vid: seed.vid,
            play,
            danmu,
            good: Math.floor(play / 40),
            bad: 3,
            coin: Math.floor(play / 100),
            collect: Math.floor(play / 60),
            share: Math.floor(play / 200),
            comment: Math.floor(danmu / 5)
        },
        category: {
            mcId: seed.mcId,
            scId: seed.scId,
            mcName: seed.mcName,
            scName: seed.scName
        }
    }
}

const mockVideoPool = mockVideoSeeds.map(buildMockVideoItem)

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

    if (key === 'GET /video/random/visitor') {
        // 游客随机推荐：每次返回 11 条，顺序随机打乱，模拟“换一换”
        const shuffled = mockVideoPool.slice().sort(() => Math.random() - 0.5);
        response = {
            code: 200,
            message: 'OK',
            data: shuffled.slice(0, 11)
        };
    }

    if (key === 'GET /video/cumulative/visitor') {
        // 累加推荐：按 vids 去重，每次返回新的 10 条，并标注是否还有更多
        const seen = String(config?.params?.vids || '').split(',').filter(Boolean).map(Number);
        const rest = mockVideoPool.filter(item => !seen.includes(item.video.vid));
        const videos = rest.slice(0, 10);
        response = {
            code: 200,
            message: 'OK',
            data: {
                videos,
                vids: videos.map(item => item.video.vid),
                more: rest.length > 10
            }
        };
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
