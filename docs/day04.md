# Day 4：Client 首页推荐流与轮播图

## 目标与产出

- 首页路由 `/` 切换到真实的 `IndexVue.vue`，移除 Day 1~3 的占位页。
- 新增 `CarouselIndex.vue` 轮播组件与 `carousel.json` 数据，复刻首页头图轮播、标题、圆点与左右切换。
- 复用 Day 2 已就位的 `videoCard.css`（与原仓库逐字节一致），完成视频卡片、骨架屏与统计数据浮层。
- 新增 Mock 接口 `/video/random/visitor` 与 `/video/cumulative/visitor`，实现随机推荐、换一换与滚动累加加载。
- 复刻头图动画（冬季头图随鼠标移动切换早/中/傍晚）、固钉导航栏与固钉频道栏。

## 源文件路径（teriteri-client-main）

```text
teriteri-client-main/src/views/IndexVue.vue
teriteri-client-main/src/components/carousel/CarouselIndex.vue
teriteri-client-main/src/assets/json/carousel.json
teriteri-client-main/src/assets/css/videoCard.css          （Day 2 已复制，本日验证一致）
teriteri-client-main/src/assets/img/teriteri-white.png     （按 Day 1 约定复制并更名为 pilipili-white.png）
teriteri-client-main/src/assets/img/bilibili/bilibili-winter-view-*.jpg / *.webm / *-snow.png
teriteri-client-main/src/assets/img/bilibili/bilibili-winter-tree-*.png
```

## 复制命令（PowerShell）

```powershell
$src = "D:\软件工程\teriteri-client-main\teriteri-client-main\src"
$dst = "D:\软件工程\UI-\client\src"

# 轮播数据与组件
Copy-Item "$src\assets\json\carousel.json" "$dst\assets\json\carousel.json"
Copy-Item "$src\components\carousel\CarouselIndex.vue" "$dst\components\carousel\CarouselIndex.vue"

# 首页与品牌素材（teriteri-white.png 更名为 pilipili-white.png）
Copy-Item "$src\views\IndexVue.vue" "$dst\views\IndexVue.vue"
Copy-Item "$src\assets\img\teriteri-white.png" "$dst\assets\img\pilipili-white.png"

# 冬季头图素材（版权归 bilibili 官方所有，仅学习使用）
New-Item -ItemType Directory -Force "$dst\assets\img\bilibili" | Out-Null
Copy-Item "$src\assets\img\bilibili\bilibili-winter-view-1.jpg" "$dst\assets\img\bilibili\"
Copy-Item "$src\assets\img\bilibili\bilibili-winter-view-2.jpg" "$dst\assets\img\bilibili\"
Copy-Item "$src\assets\img\bilibili\bilibili-winter-view-3.webm" "$dst\assets\img\bilibili\"
Copy-Item "$src\assets\img\bilibili\bilibili-winter-view-3-snow.png" "$dst\assets\img\bilibili\"
Copy-Item "$src\assets\img\bilibili\bilibili-winter-tree-1.png" "$dst\assets\img\bilibili\"
Copy-Item "$src\assets\img\bilibili\bilibili-winter-tree-2.png" "$dst\assets\img\bilibili\"
Copy-Item "$src\assets\img\bilibili\bilibili-winter-tree-3.png" "$dst\assets\img\bilibili\"
Copy-Item "$src\assets\img\bilibili\bilibili版权所有，禁止商业用途.txt" "$dst\assets\img\bilibili\"
```

`IndexVue.vue` 与源文件的唯一差别：头图 logo 由 `~assets/img/teriteri-white.png` 改为 `~assets/img/pilipili-white.png`（与 Day 1 `pilipili-pink.png` 的更名约定一致）。

## 新增与修改文件

```text
client/src/views/IndexVue.vue                                  （新增，复制自适应）
client/src/components/carousel/CarouselIndex.vue               （新增，原样复制）
client/src/assets/json/carousel.json                           （新增，原样复制）
client/src/assets/img/pilipili-white.png                       （新增，品牌素材更名）
client/src/assets/img/bilibili/*                               （新增，头图素材 8 个文件）
client/src/router/index.js                                     （修改，/ 指向 IndexVue）
client/src/mock/index.js                                       （修改，新增两个推荐接口）
client/src/views/DesignPreview.vue                             （删除，被 IndexVue 取代）
client/src/views/HomePlaceholder.vue                           （删除，被 IndexVue 取代）
docs/day04.md
README.md
```

## 新增代码全文（Mock 推荐流）

`client/src/mock/index.js` 中新增的数据与接口（其余部分与 Day 3 相同）：

```js
// Day 4 首页推荐流 Mock：封面沿用 carousel.json 中的 OSS 封面（断网时仅保布局）
const mockCovers = [
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20240322/img/cover/1711110712131c01f29fff12245a78e31cb36033e04ab.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231112/img/cover/1699782969068e3233962e04a4d54ad29ac078b31add0.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231102/img/cover/16989300077191113ff089d75455a89a91ef0c1b89aab.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231102/img/cover/169893110490716d5c74c17514eaea15cffcc3b4944a6.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231117/img/cover/17001510817100b014757b37643f186af536d99f10e36.jpg',
    'https://teriteri.oss-cn-heyuan.aliyuncs.com/20231226/img/cover/17035809290911763e6df5b5045a79df241f241a9dd65.jpg'
]

// mockUploaders：8 个 Mock UP主，字段与后端 User 实体一致（uid/username/nickname/avatar/...）
// mockVideoSeeds：30 条视频种子数据，前 6 条的 vid 与 carousel.json 跳转目标保持一致
//   （28/16/5/6/20/25），便于 Day 6 视频详情页衔接；字段含
//   vid/title/duration/mcId/scId/mcName/scName/uploadDate

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
        category: { mcId: seed.mcId, scId: seed.scId, mcName: seed.mcName, scName: seed.scName }
    }
}

const mockVideoPool = mockVideoSeeds.map(buildMockVideoItem)
```

`mockRequest` 中新增的两个动态分支：

```js
if (key === 'GET /video/random/visitor') {
    // 游客随机推荐：每次返回 11 条，顺序随机打乱，模拟“换一换”
    const shuffled = mockVideoPool.slice().sort(() => Math.random() - 0.5);
    response = { code: 200, message: 'OK', data: shuffled.slice(0, 11) };
}

if (key === 'GET /video/cumulative/visitor') {
    // 累加推荐：按 vids 去重，每次返回新的 10 条，并标注是否还有更多
    const seen = String(config?.params?.vids || '').split(',').filter(Boolean).map(Number);
    const rest = mockVideoPool.filter(item => !seen.includes(item.video.vid));
    const videos = rest.slice(0, 10);
    response = {
        code: 200,
        message: 'OK',
        data: { videos, vids: videos.map(item => item.video.vid), more: rest.length > 10 }
    };
}
```

`client/src/router/index.js` 首页路由：

```js
const Index = () => import('@/views/IndexVue.vue')
// ...
{ path: '/', name: 'home', component: Index },
```

## 运行方式

```bash
cd client
npm run serve
```

访问 http://localhost:8787/ ，Mock 开关沿用 Day 1 的 `VUE_APP_USE_MOCK=true`，无需启动 Spring Boot / MySQL / Redis。

## 验收

- 首页显示冬季头图、品牌 logo、频道栏与固钉频道栏结构。
- 鼠标在头图区域移动时，早/中/傍晚三层头图与雪花遮罩随 `--percentage` 过渡。
- 轮播图自动播放（约 3.5 秒一张），支持圆点跳转、左右箭头切换，标题与底色随当前图变化。
- 随机推荐渲染 11 张视频卡片：封面、播放量、弹幕量、时长、标题、UP主与投稿时间齐全。
- 点击“换一换”重新随机 11 条，刷新图标旋转。
- 页面滚动接近底部时自动累加加载 10 条，直至 30 条 Mock 视频全部加载完毕（`more=false`）。
- 滚动超过 64px 出现固钉导航栏，滚过头图高度出现固钉频道栏。
- 浏览器控制台无阻断性报错（远程 OSS 封面断网时只影响图片，不影响布局）。

## 学习资源

- Vue 3 过渡与动画：https://cn.vuejs.org/guide/built-ins/transition.html
- CSS Grid 布局：https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout
- CSS 自定义属性（变量）：https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties
- video.js 播放器（为 Day 5 准备）：https://videojs.com/guides/
- Chrome DevTools 查看元素与网络：https://developer.chrome.com/docs/devtools?hl=zh-cn

## Day 4 提交

```bash
git add client docs/day04.md README.md
git commit -m "day04: build client home feed and carousel"
git tag day04
```
