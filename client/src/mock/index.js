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

// Day 4 首页推荐流 Mock：封面使用本地 SVG 占位图
// 原远程 OSS 链接已 403 失效，picsum 国内也超时，改为本地 assets 下的 SVG：
//   - require 由 webpack 处理，打包后自动加 hash，断网也能显示
//   - 6 张渐变色占位图，对应视频卡片 16:9 比例
const mockCovers = [
    require('@/assets/img/cover/cover-1.svg'),
    require('@/assets/img/cover/cover-2.svg'),
    require('@/assets/img/cover/cover-3.svg'),
    require('@/assets/img/cover/cover-4.svg'),
    require('@/assets/img/cover/cover-5.svg'),
    require('@/assets/img/cover/cover-6.svg')
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

// Day 6 视频详情 Mock：播放地址复用本地测试视频（webpack 解析）
const mockVideoUrl = require('@/assets/video/BadApple.mp4');

function buildMockVideoDetail(vid) {
    const item = mockVideoPool.find(v => v.video.vid === Number(vid)) || mockVideoPool[0];
    return {
        video: {
            ...item.video,
            tags: 'UI复刻\r\nVue3\r\n前端学习',
            descr: 'Day 6 Mock 视频简介：本页面为 pilipili 客户端 UI 复刻学习项目，'
                + '所有数据均来自 Mock 层，不依赖 Spring Boot / MySQL / Redis。\r\n'
                + '复刻范围：播放器、弹幕、收藏、评论与推荐列表。',
            videoUrl: mockVideoUrl
        },
        user: item.user,
        category: item.category,
        stats: item.stats
    };
}

// Day 6 弹幕 Mock：字段与播放器渲染一致（timePoint 秒 / mode 1滚动 2顶部 3底部）
const mockDanmuList = [
    { id: 101, uid: 16, content: '第一集终于来了', timePoint: 1, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 102, uid: 20, content: '前来三连支持', timePoint: 2, mode: 1, fontsize: 22, color: '#FF6699' },
    { id: 103, uid: 25, content: '这个转场太帅了', timePoint: 4, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 104, uid: 31, content: 'UP主辛苦了', timePoint: 6, mode: 1, fontsize: 22, color: '#FFD700' },
    { id: 105, uid: 36, content: '弹幕护体', timePoint: 8, mode: 2, fontsize: 22, color: '#FFFFFF' },
    { id: 106, uid: 16, content: 'DateTime 处理得真细', timePoint: 10, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 107, uid: 20, content: '看到就是赚到', timePoint: 13, mode: 1, fontsize: 22, color: '#FF6699' },
    { id: 108, uid: 25, content: '一键三连了', timePoint: 16, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 109, uid: 31, content: '这就是复刻的细节吗', timePoint: 19, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 110, uid: 36, content: '进度条也能拖', timePoint: 22, mode: 3, fontsize: 22, color: '#FFFFFF' },
    { id: 111, uid: 16, content: '倍速播放无压力', timePoint: 26, mode: 1, fontsize: 22, color: '#FFD700' },
    { id: 112, uid: 20, content: '清晰度切换很流畅', timePoint: 30, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 113, uid: 25, content: '收藏夹弹窗也好用', timePoint: 34, mode: 1, fontsize: 22, color: '#FF6699' },
    { id: 114, uid: 31, content: '推荐列表会更新', timePoint: 38, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 115, uid: 36, content: 'Day 7 评论区见', timePoint: 42, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 116, uid: 16, content: '这个简介会展开', timePoint: 46, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 117, uid: 20, content: '标签也可以点', timePoint: 50, mode: 2, fontsize: 22, color: '#FFD700' },
    { id: 118, uid: 25, content: 'UP主主页即将开放', timePoint: 55, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 119, uid: 31, content: ' mock 数据真香', timePoint: 60, mode: 1, fontsize: 22, color: '#FF6699' },
    { id: 120, uid: 36, content: '学习项目完结撒花', timePoint: 65, mode: 3, fontsize: 22, color: '#FFFFFF' }
];

// Day 7 评论 Mock：字段与后端 Comment 实体一致（rootId=0 为一级评论，其余为楼中楼回复）
function mockCommentUser(uid) {
    return mockUploaders.find(u => u.uid === uid) || mockUser;
}

function mockReply(id, rootId, parentId, uid, toUserId, content, love, createTime) {
    return {
        id, vid: 16, uid, rootId, parentId, toUserId,
        content, love, bad: 0, createTime, isTop: 0, isDeleted: 0,
        user: mockCommentUser(uid),
        toUser: toUserId ? mockCommentUser(toUserId) : null
    };
}

function mockRootComment(id, uid, content, love, createTime, replies) {
    return {
        id, vid: 16, uid, rootId: 0, parentId: 0, toUserId: 0,
        content, love, bad: 0, createTime, isTop: 0, isDeleted: 0,
        user: mockCommentUser(uid),
        replies
    };
}

const mockRootComments = [
    mockRootComment(201, 20, '第一次这么早，UP主的更新频率太感人了', 128, '2026-10-18 09:20', [
        mockReply(301, 201, 201, 25, 20, '毕竟是大厂练习生，效率拉满', 12, '2026-10-18 09:41'),
        mockReply(302, 201, 301, 16, 25, '楼上说笑了，就是肝得比较狠', 5, '2026-10-18 10:02')
    ]),
    mockRootComment(202, 31, '这个播放器的进度条交互做得真细，拖动和预缓冲都有', 96, '2026-10-17 21:15', [
        mockReply(303, 202, 202, 36, 31, 'video.js 那一套也复刻了，Day 5 的内容', 8, '2026-10-17 21:33'),
        mockReply(304, 202, 303, 20, 36, '坐等 Day 10 的上传分片', 3, '2026-10-17 22:01')
    ]),
    mockRootComment(203, 25, '弹幕字体和透明度都能调，爷青回', 77, '2026-10-16 14:48', []),
    mockRootComment(204, 16, '建议加一个倍速记忆功能，每次都要重新点', 54, '2026-10-15 19:03', [
        mockReply(305, 204, 204, 31, 16, 'localStorage 里已经存了播放设置，刷新还在', 9, '2026-10-15 19:25'),
        mockReply(306, 204, 305, 16, 31, '原来如此，我去试试', 2, '2026-10-15 19:44')
    ]),
    mockRootComment(205, 36, '从设计稿到组件化的那期也出了，一起看', 41, '2026-10-14 11:12', []),
    mockRootComment(206, 20, '这UI复刻程度，说是原版我都信', 33, '2026-10-13 16:37', [
        mockReply(307, 206, 206, 25, 20, '其实就是逐字节抄的 CSS', 6, '2026-10-13 16:55')
    ]),
    mockRootComment(207, 31, '评论区占位了这么久，Day 7 终于来了', 28, '2026-10-12 08:30', []),
    mockRootComment(208, 16, '已三连，期待管理端部分', 19, '2026-10-11 22:18', []),
    mockRootComment(209, 36, 'Canvas 那期讲得清楚，弹幕引擎原理懂了', 15, '2026-10-10 15:46', []),
    mockRootComment(210, 25, '学习资源给得很全，Vue Router 那篇看了三遍', 11, '2026-10-09 10:05', []),
    mockRootComment(211, 20, 'Mock 层设计得挺巧妙，后面接真实后端也方便', 9, '2026-10-08 13:22', []),
    mockRootComment(212, 31, '打卡第 12 天，坚持就是胜利', 7, '2026-10-07 09:00', [])
];

// UP 主觉得很赞的评论 id 集合
const mockUpLikes = [201, 202, 204];

let mockCommentIdSeq = 400;

// Day 8 个人空间 Mock 用户：字段与空间页视图模型一致（bg_url/avatar_url/各计数）
const mockSpaceUsers = {
    5: { uid: 5, username: 'pilipili05', nickname: '感动收集站', avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: 'Day 8 Mock 用户：收集每一个感动的瞬间', exp: 10800, coin: 128, vip: 0, state: 0, auth: 0, authMsg: '', followsCount: 42, fansCount: 1080, loveCount: 326, playCount: 15600 },
    6: { uid: 6, username: 'pilipili06', nickname: '治疗时间', avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: '治疗就交给我吧', exp: 4500, coin: 52, vip: 0, state: 0, auth: 0, authMsg: '', followsCount: 18, fansCount: 466, loveCount: 98, playCount: 6200 },
    16: { uid: 16, username: 'pilipili16', nickname: '提瓦特观测站长', avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 1, description: '游戏区认证UP主，一起庆祝每个生日', exp: 28800, coin: 666, vip: 3, state: 0, auth: 2, authMsg: '游戏区认证UP主', followsCount: 88, fansCount: 12800, loveCount: 4600, playCount: 98000 },
    20: { uid: 20, username: 'pilipili20', nickname: '新歌速递员', avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 0, description: '新歌速递，快前来围观', exp: 1500, coin: 12, vip: 0, state: 0, auth: 0, authMsg: '', followsCount: 6, fansCount: 230, loveCount: 45, playCount: 3100 },
    25: { uid: 25, username: 'pilipili25', nickname: '泛动数据库', avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: '学习项目账号', exp: 200, coin: 3.5, vip: 0, state: 0, auth: 1, authMsg: '学习项目账号', followsCount: 12, fansCount: 66, loveCount: 12, playCount: 880 },
    28: { uid: 28, username: 'pilipili28', nickname: '恋爱选择题', avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: '哥哥的女朋友，只能由我来选', exp: 50, coin: 0.5, vip: 0, state: 0, auth: 0, authMsg: '', followsCount: 3, fansCount: 21, loveCount: 5, playCount: 460 },
    31: { uid: 31, username: 'pilipili31', nickname: '前端练习生', avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 1, description: '30分钟搭一个仿B站首页', exp: 10800, coin: 88, vip: 1, state: 0, auth: 0, authMsg: '', followsCount: 56, fansCount: 2400, loveCount: 890, playCount: 21000 },
    36: { uid: 36, username: 'pilipili36', nickname: 'Canvas 研究所', avatar_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', bg_url: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', gender: 2, description: '用Canvas画一个弹幕引擎', exp: 4500, coin: 36, vip: 0, state: 0, auth: 0, authMsg: '', followsCount: 24, fansCount: 720, loveCount: 210, playCount: 8600 }
};

function mockSpaceUser(uid) {
    return mockSpaceUsers[Number(uid)] || mockSpaceUsers[16];
}

// Day 9 消息中心 Mock 数据：回复/@/赞/系统/动态（feed）+ 私聊（whisper）
let mockMsgSeq = 1000
const mockFeedMessages = {
    reply: [
        { id: 1, type: 'reply', fromUser: mockUploaders[1], content: '第一次这么早，UP主的更新频率太感人了', sourceTitle: '【Vue3】30分钟搭一个仿B站首页', createTime: '2026-10-18 09:20', isRead: 0 },
        { id: 2, type: 'reply', fromUser: mockUploaders[2], content: '这个播放器的进度条交互做得真细', sourceTitle: '从零手写一个视频播放器控件', createTime: '2026-10-17 21:15', isRead: 0 }
    ],
    at: [],
    love: [
        { id: 3, type: 'love', fromUser: mockUploaders[0], content: '赞了你的评论', sourceTitle: '弹幕字体和透明度都能调', createTime: '2026-10-16 14:48', isRead: 0 },
        { id: 4, type: 'love', fromUser: mockUploaders[3], content: '赞了你的动态', sourceTitle: '今天也在学前端', createTime: '2026-10-15 19:03', isRead: 1 }
    ],
    system: [
        { id: 5, type: 'system', content: '欢迎使用 pilipili，遵守社区规范哦～', createTime: '2026-10-01 00:00', isRead: 0 }
    ],
    dynamic: []
}
const mockChatList = [
    { chat: { id: 101, userId: 16, unread: 2, latestTime: '2026-10-18 10:00' }, user: mockUploaders[2], detail: { more: true, list: [] } },
    { chat: { id: 102, userId: 31, unread: 0, latestTime: '2026-10-17 22:00' }, user: mockUploaders[6], detail: { more: true, list: [] } }
]
const mockChatDetails = {
    101: [
        { id: 1, sendId: 16, acceptId: 1, content: '在吗？看了你的首页复刻', time: '2026-10-18 09:55', withdraw: 0 },
        { id: 2, sendId: 1, acceptId: 16, content: '在的，欢迎交流～', time: '2026-10-18 09:58', withdraw: 0 },
        { id: 3, sendId: 16, acceptId: 1, content: '弹幕引擎那期什么时候出', time: '2026-10-18 10:00', withdraw: 0 }
    ],
    102: [
        { id: 4, sendId: 31, acceptId: 1, content: 'CSS 布局那篇写得太好了', time: '2026-10-17 21:50', withdraw: 0 }
    ]
}

function nowTimeStr() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

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
        data: [
            { fid: 1, uid: 1, type: 1, visible: 1, title: '默认收藏夹', count: 12 },
            { fid: 2, uid: 1, type: 0, visible: 1, title: '前端学习', count: 8 },
            { fid: 3, uid: 1, type: 0, visible: 0, title: '私密收藏夹', count: 3 }
        ]
    },
    'GET /comment/get-like-and-dislike': {
        code: 200,
        message: 'OK',
        data: { userLike: [], userDislike: [] }
    },
    'GET /search/count': {
        code: 200,
        message: 'OK',
        data: { video: 12, user: 3 }
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

    // Day 5 播放上报：游客/登录用户播放计数，Mock 直接成功
    if (key === 'POST /video/play/visitor' || key === 'POST /video/play/user') {
        response = {
            code: 200,
            message: 'OK',
            data: null
        }
    }

    // Day 6 视频详情
    if (key === 'GET /video/getone') {
        response = {
            code: 200,
            message: 'OK',
            data: buildMockVideoDetail(config?.params?.vid)
        }
    }

    // Day 6 弹幕列表（路径带 vid 参数）
    if (key.startsWith('GET /danmu-list/')) {
        response = {
            code: 200,
            message: 'OK',
            data: mockDanmuList.slice()
        }
    }

    // Day 6 点赞/点踩：按 isLove/isSet 返回最新态度
    if (key === 'POST /video/love-or-not') {
        const isLove = data && typeof data.get === 'function' ? Number(data.get('isLove')) : 1;
        const isSet = data && typeof data.get === 'function' ? Number(data.get('isSet')) : 1;
        response = {
            code: 200,
            message: 'OK',
            data: {
                love: isLove && isSet ? 1 : 0,
                unlove: !isLove && isSet ? 1 : 0,
                coin: 12,
                collect: 0
            }
        }
    }

    // Day 6 收藏了该视频的收藏夹ID集合
    if (key === 'GET /video/collected-fids') {
        response = {
            code: 200,
            message: 'OK',
            data: [2]
        }
    }

    // Day 6 游客态获取他人收藏夹列表
    if (key === 'GET /favorite/get-all/visitor') {
        response = {
            code: 200,
            message: 'OK',
            data: [
                { fid: 1, uid: 1, type: 1, visible: 1, title: '默认收藏夹', count: 12 },
                { fid: 2, uid: 1, type: 0, visible: 1, title: '前端学习', count: 8 },
                { fid: 3, uid: 1, type: 0, visible: 0, title: '私密收藏夹', count: 3 }
            ]
        }
    }

    // Day 6 新建收藏夹
    if (key === 'POST /favorite/create') {
        response = {
            code: 200,
            message: '创建成功',
            data: { fid: 99, uid: 1, type: 0, visible: 1, title: 'Mock 新收藏夹', count: 0 }
        }
    }

    // Day 6 收藏/取消收藏视频
    if (key === 'POST /video/collect' || key === 'POST /video/cancel-collect') {
        response = {
            code: 200,
            message: 'OK',
            data: null
        }
    }

    // Day 7 评论楼列表（offset 分页，每页 5 条）
    if (key === 'GET /comment/get') {
        const offset = Number(config?.params?.offset || 0);
        const comments = mockRootComments.slice(offset, offset + 5);
        response = {
            code: 200,
            message: 'OK',
            data: {
                comments,
                more: offset + 5 < mockRootComments.length
            }
        }
    }

    // Day 7 UP 主觉得很赞的评论 id
    if (key === 'GET /comment/get-up-like') {
        response = {
            code: 200,
            message: 'OK',
            data: mockUpLikes.slice()
        }
    }

    // Day 7 发表评论：按表单构造新评论返回（rootId=0 为一级评论，否则为楼中楼回复）
    if (key === 'POST /comment/add') {
        const val = k => (data && typeof data.get === 'function' ? data.get(k) : '');
        const rootId = Number(val('root_id')) || 0;
        const parentId = Number(val('parent_id')) || 0;
        const toUserId = Number(val('to_user_id')) || 0;
        const newComment = {
            id: mockCommentIdSeq++,
            vid: Number(val('vid')) || 16,
            uid: mockUser.uid,
            rootId,
            parentId,
            toUserId,
            content: val('content') || '（空评论）',
            love: 0,
            bad: 0,
            createTime: nowTimeStr(),
            isTop: 0,
            isDeleted: 0,
            user: mockUser,
            toUser: toUserId ? mockCommentUser(toUserId) : null
        };
        // 同步进 Mock 池，保证刷新后仍在（一级评论插入最前）
        if (rootId === 0) {
            mockRootComments.unshift({ ...newComment, replies: [] });
        } else {
            const root = mockRootComments.find(c => c.id === rootId);
            if (root) root.replies.push(newComment);
        }
        response = {
            code: 200,
            message: '评论成功',
            data: newComment
        }
    }

    // Day 7 删除评论 / 点赞点踩评论
    if (key === 'POST /comment/delete' || key === 'POST /comment/love-or-not') {
        response = {
            code: 200,
            message: 'OK',
            data: null
        }
    }

    // Day 7 展开更多楼中楼回复（后端该接口直接返回 CommentTree，不包 CustomResponse）
    if (key === 'GET /comment/reply/get-more') {
        const root = mockRootComments.find(c => c.id === Number(config?.params?.id));
        const payload = root ? { ...root, replies: root.replies.slice() } : null;
        return Promise.resolve({
            data: JSON.parse(JSON.stringify(payload)),
            config
        });
    }

    // Day 8 个人空间：用户信息
    if (key === 'GET /user/info/get-one') {
        response = {
            code: 200,
            message: 'OK',
            data: mockSpaceUser(config?.params?.uid)
        }
    }

    // Day 8 用户投稿数
    if (key === 'GET /video/user-works-count') {
        const uid = Number(config?.params?.uid) || 16;
        const count = mockVideoPool.filter(v => v.video.uid === uid).length;
        response = {
            code: 200,
            message: 'OK',
            data: count
        }
    }

    // Day 8 用户投稿视频列表 / 最近点赞 / 收藏夹视频
    if (key === 'GET /video/user-works') {
        const uid = Number(config?.params?.uid) || 16;
        const list = mockVideoPool.filter(v => v.video.uid === uid);
        response = {
            code: 200,
            message: 'OK',
            data: { count: list.length, list: list.slice() }
        }
    }

    if (key === 'GET /video/user-love') {
        response = {
            code: 200,
            message: 'OK',
            data: mockVideoPool.slice(0, 6)
        }
    }

    if (key === 'GET /video/user-collect') {
        // 收藏夹视频项带 info（收藏时间与收藏夹 id），供“收藏于”展示与取消收藏
        const fid = Number(config?.params?.fid) || 1;
        response = {
            code: 200,
            message: 'OK',
            data: mockVideoPool.slice(2, 8).map(item => ({
                ...item,
                info: { vid: item.video.vid, fid, time: '2026-10-20 20:30' }
            }))
        }
    }

    // Day 8 搜索：视频 / 用户（按关键词粗过滤，保持 Mock 确定性）
    if (key === 'GET /search/video/only-pass') {
        const keyword = decodeURIComponent(String(config?.params?.keyword || ''));
        const list = keyword
            ? mockVideoPool.filter(v => v.video.title.includes(keyword) || v.user.nickname.includes(keyword))
            : mockVideoPool.slice();
        response = {
            code: 200,
            message: 'OK',
            data: list.length ? list : mockVideoPool.slice(0, 10)
        }
    }

    if (key === 'GET /search/user') {
        const keyword = decodeURIComponent(String(config?.params?.keyword || ''));
        const list = Object.values(mockSpaceUsers).filter(u =>
            !keyword || u.nickname.includes(keyword) || u.username.includes(keyword));
        response = {
            code: 200,
            message: 'OK',
            data: list.length ? list : Object.values(mockSpaceUsers).slice(0, 5)
        }
    }

    // Day 8 搜索词条记录 / 分类计数
    if (key === 'POST /search/word/add') {
        response = {
            code: 200,
            message: 'OK',
            data: null
        }
    }

    // Day 9 账号中心：资料 / 设置 / 头像
    if (key === 'GET /user/account/info') {
        response = { code: 200, message: 'OK', data: mockUser }
    }
    if (key === 'POST /user/account/info') {
        const nickname = data && typeof data.get === 'function' ? data.get('nickname') : (data && data.nickname);
        if (nickname) mockUser.nickname = nickname;
        response = { code: 200, message: '资料已更新', data: { ...mockUser } }
    }
    if (key === 'POST /user/account/password') {
        response = { code: 200, message: '密码修改成功', data: null }
    }
    if (key === 'GET /user/account/setting') {
        response = { code: 200, message: 'OK', data: { bindPhone: '138****8888', bindEmail: 'pil****@example.com', twoFactor: false, privacy: 'public' } }
    }
    if (key === 'POST /user/account/avatar') {
        response = { code: 200, message: '头像已更新', data: { avatar_url: mockUser.avatar_url } }
    }

    // Day 9 消息中心：回复/@/赞/系统/动态 + 私聊
    if (key.startsWith('GET /message/list/')) {
        const type = key.split('/').pop();
        response = { code: 200, message: 'OK', data: mockFeedMessages[type] || [] }
    }
    if (key === 'GET /message/whisper/list') {
        response = { code: 200, message: 'OK', data: mockChatList.slice() }
    }
    if (key === 'GET /message/whisper/detail') {
        response = { code: 200, message: 'OK', data: mockChatDetails[config?.params?.chatId] || [] }
    }
    if (key === 'POST /message/whisper/send') {
        const chatId = data && typeof data.get === 'function' ? data.get('chatId') : (data && data.chatId);
        const content = data && typeof data.get === 'function' ? data.get('content') : (data && data.content) || '';
        const msg = { id: mockMsgSeq++, sendId: mockUser.uid, acceptId: Number(chatId) || 101, content, time: nowTimeStr(), withdraw: 0 };
        if (!mockChatDetails[chatId]) mockChatDetails[chatId] = [];
        mockChatDetails[chatId].push(msg);
        response = { code: 200, message: '发送成功', data: msg }
    }
    if (key === 'POST /message/read') {
        response = { code: 200, message: '已读', data: null }
    }

    // Day 10 创作中心 + 上传
    if (key === 'GET /creator/overview') {
        response = { code: 200, message: 'OK', data: { totalVideos: mockVideoPool.length, totalPlay: 123456, totalFans: mockUser.fansCount, pendingReview: 2 } }
    }
    if (key === 'GET /creator/videos') {
        response = { code: 200, message: 'OK', data: mockVideoPool.slice(0, 10).map(v => ({ vid: v.video.vid, title: v.video.title, coverUrl: v.video.coverUrl, status: 1, uploadDate: v.video.uploadDate, play: v.stats.play })) }
    }
    if (key === 'GET /creator/tags/hot') {
        response = { code: 200, message: 'OK', data: ['前端', 'Vue3', 'CSS', 'Canvas', '弹幕', '播放器', '教程', 'Vlog', 'UI复刻'] }
    }
    if (key === 'GET /category/list') {
        response = { code: 200, message: 'OK', data: mockChannels }
    }
    if (key === 'POST /video/submit') {
        response = { code: 200, message: '投稿成功', data: { vid: 999, status: 1 } }
    }
    if (key === 'POST /upload/init') {
        response = { code: 200, message: 'OK', data: { uploadId: 'up_mock_' + Date.now() } }
    }
    if (key === 'POST /upload/chunk') {
        response = { code: 200, message: 'chunk received', data: null }
    }
    if (key === 'POST /upload/merge') {
        response = { code: 200, message: '合并完成', data: { url: 'https://teriteri.oss-cn-heyuan.aliyuncs.com/mock/video.mp4', chunks: 1 } }
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
