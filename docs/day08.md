# Day 8：搜索与个人空间页

## 目标与产出

- 新增搜索页 `SearchView.vue` 与子页 `SearchVideo.vue`、`SearchUser.vue`，路由改为 `/search`（含 `/search/video`、`/search/user` 子路由，关键词走 query）。
- 新增个人空间 `SpaceView.vue` 与已实现子页 `SpaceHome`、`SpaceVideo`、`SpaceFavlist`；`SpaceArticle`、`SpaceDynamic`、`SpaceSetting`、`SpaceFollow`、`SpaceFans` 保持原占位状态。
- 新增 Mock：用户信息、投稿数与投稿列表、最近点赞、收藏夹视频、视频/用户搜索、搜索词条与分类计数。
- 原 `ComingSoon` 占位路由（`/search/:type`、`/space/:uid`）替换为真实页面。

## 源文件路径（teriteri-client-main）

```text
teriteri-client-main/src/views/search/SearchView.vue
teriteri-client-main/src/views/search/children/SearchVideo.vue
teriteri-client-main/src/views/search/children/SearchUser.vue
teriteri-client-main/src/views/space/SpaceView.vue
teriteri-client-main/src/views/space/children/SpaceHome.vue
teriteri-client-main/src/views/space/children/SpaceVideo.vue
teriteri-client-main/src/views/space/children/SpaceFavlist.vue
teriteri-client-main/src/views/space/children/SpaceArticle.vue      （占位）
teriteri-client-main/src/views/space/children/SpaceDynamic.vue      （占位）
teriteri-client-main/src/views/space/children/SpaceFans.vue         （占位）
teriteri-client-main/src/views/space/children/SpaceFollow.vue       （占位）
teriteri-client-main/src/views/space/children/SpaceSetting.vue      （占位）
teriteri-client-main/src/assets/img/bg_shadow.png
teriteri-client-main/src/assets/img/nothing.png
teriteri-client-main/src/assets/img/icons1.png                    （空间页图标雪碧图，复制到中性路径 img/icons1.png）
teriteri-client-main/src/assets/img/video-placeholder.png          （视频占位背景，复制到 img/video-placeholder.png）
teriteri-client-main/src/assets/img/video-delete.svg               （失效视频图标）
teriteri-client-main/src/assets/img/theme-trigger-new.png          （空间主题触发器）
```

## 复制命令（PowerShell）

```powershell
$src = "D:\软件工程\teriteri-client-main\teriteri-client-main\src"
$dst = "D:\软件工程\UI-\client\src"

New-Item -ItemType Directory -Force "$dst\views\search\children", "$dst\views\space\children" | Out-Null
Copy-Item "$src\views\search\*.vue" "$dst\views\search\"
Copy-Item "$src\views\search\children\*.vue" "$dst\views\search\children\"
Copy-Item "$src\views\space\*.vue" "$dst\views\space\"
Copy-Item "$src\views\space\children\*.vue" "$dst\views\space\children\"
Copy-Item "$src\assets\img\bg_shadow.png", "$src\assets\img\nothing.png", "$src\assets\img\icons1.png",
          "$src\assets\img\video-placeholder.png", "$src\assets\img\video-delete.svg",
          "$src\assets\img\theme-trigger-new.png" "$dst\assets\img\"

# 与 Day 1~7 的约定对齐：token、品牌素材路径
Get-ChildItem "$dst\views\search", "$dst\views\space" -Recurse -Filter *.vue | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace 'teri_token', 'pilipili_token' `
        -replace '~assets/img/teriteri-pink.png', '~assets/img/pilipili-pink.png' `
        -replace '~assets/img/bilibili/', '~assets/img/' | Set-Item $_.FullName
}
```

## 新增与修改文件

```text
client/src/views/search/SearchView.vue                    （新增）
client/src/views/search/children/SearchVideo.vue          （新增）
client/src/views/search/children/SearchUser.vue           （新增）
client/src/views/space/SpaceView.vue                      （新增）
client/src/views/space/children/SpaceHome.vue             （新增）
client/src/views/space/children/SpaceVideo.vue            （新增）
client/src/views/space/children/SpaceFavlist.vue          （新增）
client/src/views/space/children/SpaceArticle.vue 等 5 个  （新增，占位页）
client/src/assets/img/{bg_shadow,nothing,icons1,video-placeholder,video-delete,theme-trigger-new}.* （新增）
client/src/router/index.js                                （修改，/search 与 /space 嵌套路由）
client/src/mock/index.js                                  （修改，新增 Day 8 接口）
docs/day08.md
README.md
```

## 新增代码全文（Mock 数据与接口）

`client/src/mock/index.js` 中新增（节选）：

```js
// Day 8 个人空间 Mock 用户：字段与空间页视图模型一致（bg_url/avatar_url/各计数）
const mockSpaceUsers = {
    16: { uid: 16, nickname: '提瓦特观测站长', avatar_url: '...', bg_url: '...', gender: 1,
          description: '游戏区认证UP主，一起庆祝每个生日', exp: 28800, coin: 666, vip: 3,
          state: 0, auth: 2, authMsg: '游戏区认证UP主', followsCount: 88, fansCount: 12800,
          loveCount: 4600, playCount: 98000 },
    // ...共 8 个用户（与 Day 4 的 mockUploaders 对应）
};

function mockSpaceUser(uid) {
    return mockSpaceUsers[Number(uid)] || mockSpaceUsers[16];
}
```

`mockRequest` 中新增的动态分支：

```js
// Day 8 个人空间：用户信息 / 投稿数 / 投稿列表 / 最近点赞 / 收藏夹视频
if (key === 'GET /user/info/get-one') { response = { code: 200, message: 'OK', data: mockSpaceUser(config?.params?.uid) } }
if (key === 'GET /video/user-works-count') { /* 返回该 uid 在 mockVideoPool 中的条数 */ }
if (key === 'GET /video/user-works') { /* 返回 { count, list } */ }
if (key === 'GET /video/user-love') { /* 返回 mockVideoPool.slice(0, 6) */ }
if (key === 'GET /video/user-collect') {
    // 收藏夹视频项带 info（收藏时间与收藏夹 id），供“收藏于”展示与取消收藏
    const fid = Number(config?.params?.fid) || 1;
    response = { code: 200, message: 'OK', data: mockVideoPool.slice(2, 8).map(item => ({ ...item, info: { vid: item.video.vid, fid, time: '2026-10-20 20:30' } })) }
}

// Day 8 搜索：视频 / 用户（按关键词粗过滤，保持 Mock 确定性）
if (key === 'GET /search/video/only-pass') { /* 标题或昵称含关键词，无命中回退前十 */ }
if (key === 'GET /search/user') { /* 昵称或用户名含关键词，无命中回退前五 */ }
if (key === 'POST /search/word/add') { response = { code: 200, message: 'OK', data: null } }
```

静态响应 `GET /search/count` 的数据由 `{ video: 0, user: 0 }` 调整为 `{ video: 12, user: 3 }`。

`client/src/router/index.js` 嵌套路由：

```js
{
    path: '/search',
    component: Search,
    props: route => ({ keyword: route.query.keyword }),
    children: [
        { path: '/search/video', component: SearchVideo, props: route => ({ keyword: route.query.keyword }) },
        { path: '/search/user', component: SearchUser, props: route => ({ keyword: route.query.keyword }) }
    ]
},
{
    path: '/space',
    component: Space,
    children: [
        { path: '/space/:uid', component: SpaceHome },
        { path: '/space/:uid/video', component: SpaceVideo },
        { path: '/space/:uid/article', component: SpaceArticle },
        { path: '/space/:uid/dynamic', component: SpaceDynamic },
        { path: '/space/:uid/favlist', component: SpaceFavlist, props: route => ({ fid: route.query.fid }) },
        { path: '/space/:uid/setting', component: SpaceSetting },
        { path: '/space/:uid/fans/follow', component: SpaceFollow },
        { path: '/space/:uid/fans/fans', component: SpaceFans }
    ]
}
```

## 运行方式

```bash
cd client
npm run serve
```

- 搜索：首页搜索框输入关键词回车，或直接访问 `http://localhost:8787/search/video?keyword=Vue`、`/search/user?keyword=前端`
- 空间：`http://localhost:8787/space/16`（主页/投稿/收藏夹），或点击首页视频卡片的 UP 主昵称

## 验收

- `/search` 无关键词时显示居中搜索入口页（品牌 logo + 搜索框）。
- 带关键词进入搜索结果页：顶部搜索框回显、“视频/用户”选项卡与各自数量徽标；视频结果卡片含封面、时长、播放/弹幕数、标题、UP 主与日期；用户结果卡片含头像、昵称、等级、粉丝数与投稿数、关注按钮。
- 个人空间：头图、头像、昵称、等级、大会员标识、简介、关注/发消息按钮；统计（关注/粉丝/获赞/播放数）正确。
- “TA的视频”按投稿列表渲染；“TA的收藏夹”列出收藏夹及数量；“最近点赞的视频”渲染点赞列表。
- `/space/:uid/video` 投稿页可访问；`/space/:uid/favlist` 无 fid 时自动跳转默认收藏夹（`?fid=1`），视频项含“收藏于”时间，可取消收藏。
- 图文/动态/编辑信息/关注/粉丝页保持占位；浏览器控制台无阻断性报错。

## 学习资源

- Vue Router 嵌套路由与 props：https://router.vuejs.org/zh/guide/essentials/nested-routes.html
- 查询参数与 URL 编码：https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
- CSS 雪碧图（icons1.png 定位）：https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position
- Element Plus Pagination 分页：https://element-plus.org/zh-CN/component/pagination.html

## Day 8 提交

```bash
git add client docs/day08.md README.md
git commit -m "day08: build search and user space pages"
git tag day08
```
