# Day 6：视频详情页、弹幕与收藏

## 目标与产出

- 新增 `VideoDetail.vue` 视频详情页，路由 `/video/:vid` 由 Day 5 的临时宿主页切换到真实详情页（`PlayerPreview.vue` 随之删除）。
- 新增 `DanmuBox.vue`（弹幕输入/列表）、`AddToFavorite.vue` 与 `FavoriteInfo.vue`（收藏弹窗）。
- 新增 Mock：视频详情、弹幕列表、点赞点踩、收藏夹列表/新建/收藏，字段与后端 `Video/VideoStats/User/Category` 实体一致。
- 详情页包含播放器、简介与标签、UP 主信息、视频工具栏（点赞/投币/收藏/分享）、弹幕框、推荐列表；收藏弹窗达到原 UI。
- 评论区在 Day 6 以占位组件承接（Day 7 替换为真实评论组件）。
- Mock 模式下不连接弹幕 WebSocket（保留连接结构，与 App.vue 的 IM 处理一致）。

## 源文件路径（teriteri-client-main）

```text
teriteri-client-main/src/views/detail/VideoDetail.vue
teriteri-client-main/src/components/danmu/DanmuBox.vue
teriteri-client-main/src/components/favorite/AddToFavorite.vue
teriteri-client-main/src/components/favorite/FavoriteInfo.vue
teriteri-client-main/src/assets/img/dianzan.gif
```

## 复制命令（PowerShell）

```powershell
$src = "D:\软件工程\teriteri-client-main\teriteri-client-main\src"
$dst = "D:\软件工程\UI-\client\src"

New-Item -ItemType Directory -Force "$dst\views\detail", "$dst\components\danmu", "$dst\components\favorite" | Out-Null
Copy-Item "$src\views\detail\VideoDetail.vue" "$dst\views\detail\"
Copy-Item "$src\components\danmu\DanmuBox.vue" "$dst\components\danmu\"
Copy-Item "$src\components\favorite\*.vue" "$dst\components\favorite\"
Copy-Item "$src\assets\img\dianzan.gif" "$dst\assets\img\"

# 与 Day 1~3 的 token 约定对齐（teriteri 仓库原文为 teri_token）
(Get-Content "$dst\views\detail\VideoDetail.vue") -replace 'teri_token', 'pilipili_token' | Set-Item "$dst\views\detail\VideoDetail.vue"
(Get-Content "$dst\components\danmu\DanmuBox.vue") -replace 'teri_token', 'pilipili_token' | Set-Item "$dst\components\danmu\DanmuBox.vue"
(Get-Content "$dst\components\favorite\AddToFavorite.vue") -replace 'teri_token', 'pilipili_token' | Set-Item "$dst\components\favorite\AddToFavorite.vue"
```

复制后唯一的功能性改动：`initWebsocket()` 增加 Mock 模式守卫。

```js
async initWebsocket() {
    // Mock 模式不连接真实弹幕服务，仅保留连接结构（与 App.vue 的 IM 处理一致）
    if (process.env.VUE_APP_USE_MOCK === 'true') return;
    // ...原逻辑
}
```

## 新增与修改文件

```text
client/src/views/detail/VideoDetail.vue                （新增，1508 行）
client/src/components/danmu/DanmuBox.vue               （新增）
client/src/components/favorite/AddToFavorite.vue       （新增）
client/src/components/favorite/FavoriteInfo.vue        （新增）
client/src/components/comment/CommentVue.vue           （新增，Day 6 占位，Day 7 替换）
client/src/assets/img/dianzan.gif                      （新增，点赞动画）
client/src/views/PlayerPreview.vue                     （删除，被 VideoDetail 取代）
client/src/router/index.js                             （修改，/video/:vid 指向 VideoDetail）
client/src/mock/index.js                               （修改，新增 Day 6 接口）
docs/day06.md
README.md
```

## 新增代码全文（Mock 数据与接口）

`client/src/mock/index.js` 中新增（节选）：

```js
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
    // ...共 20 条，timePoint 1~65
];
```

`mockRequest` 中新增的动态分支：

```js
// Day 6 视频详情
if (key === 'GET /video/getone') {
    response = { code: 200, message: 'OK', data: buildMockVideoDetail(config?.params?.vid) }
}

// Day 6 弹幕列表（路径带 vid 参数）
if (key.startsWith('GET /danmu-list/')) {
    response = { code: 200, message: 'OK', data: mockDanmuList.slice() }
}

// Day 6 点赞/点踩：按 isLove/isSet 返回最新态度
if (key === 'POST /video/love-or-not') {
    const isLove = data && typeof data.get === 'function' ? Number(data.get('isLove')) : 1;
    const isSet = data && typeof data.get === 'function' ? Number(data.get('isSet')) : 1;
    response = {
        code: 200, message: 'OK',
        data: { love: isLove && isSet ? 1 : 0, unlove: !isLove && isSet ? 1 : 0, coin: 12, collect: 0 }
    }
}

// Day 6 收藏了该视频的收藏夹ID集合 / 游客态收藏夹列表 / 新建收藏夹 / 收藏·取消收藏
if (key === 'GET /video/collected-fids') { response = { code: 200, message: 'OK', data: [2] } }
if (key === 'GET /favorite/get-all/visitor') { /* 返回 3 个收藏夹 */ }
if (key === 'POST /favorite/create') { /* 返回 { fid: 99, ... } */ }
if (key === 'POST /video/collect' || key === 'POST /video/cancel-collect') { response = { code: 200, message: 'OK', data: null } }
```

同时把静态响应 `GET /favorite/get-all/user` 的数据扩充为 3 个收藏夹（默认/前端学习/私密），供收藏弹窗读取。

`client/src/router/index.js`：

```js
const VideoDetail = () => import('@/views/detail/VideoDetail.vue')
// ...
{ path: '/video/:vid', component: VideoDetail },
```

## 运行方式

```bash
cd client
npm run serve
```

- 游客访问：http://localhost:8787/video/16
- 登录后访问（收藏弹窗需要登录态）：先点击右上角“登录”用 Mock 账号 `pilipili` 登录，或在控制台执行
  `localStorage.setItem('pilipili_token', 'mock-pilipili-token')` 后刷新。

## 验收

- `/video/16` 展示视频详情：标题、播放量、弹幕量、投稿时间、封面、播放器。
- 简介与标签（游戏/单机游戏/UI复刻/Vue3/前端学习）显示，过长时支持展开收起。
- UP 主信息卡（头像、昵称、等级、粉丝数）与“发消息/关注”入口正常。
- 工具栏：点赞（含 GIF 动画）、不喜欢、投币、收藏、分享数量与交互正常。
- 收藏弹窗列出收藏夹及数量，“前端学习”为已选状态（与 Mock collected-fids 一致），可勾选/取消、新建收藏夹、确定提交。
- 弹幕框可开关弹幕列表、发送弹幕；播放器随进度渲染 20 条 Mock 弹幕。
- 右侧“接下来播放”推荐列表展示卡片（封面、时长、标题、UP 主、播放/弹幕数），点击可切换视频。
- 评论区显示 Day 7 占位提示；控制台无阻断性报错。

## 学习资源

- Vue 3 组件通信（props/emit/v-model）：https://cn.vuejs.org/guide/components/events.html
- Element Plus Dialog 对话框：https://element-plus.org/zh-CN/component/dialog.html
- FormData 与文件上传（为 Day 10 准备）：https://developer.mozilla.org/zh-CN/docs/Web/API/FormData
- WebSocket API（Mock 阶段仅保留结构）：https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket

## Day 6 提交

```bash
git add client docs/day06.md README.md
git commit -m "day06: build video detail danmaku and favorites"
git tag day06
```
