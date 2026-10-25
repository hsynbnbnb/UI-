# Day 5：Client 视频播放器与播放控制

## 目标与产出

- 新增播放器组件族 `PlayerWrapper`、`PlayerLoading`、`LoadingBuff`、`PlayerProgress`、`SliderColumn`、`SliderRow`、`ColorPicker`。
- 新增临时宿主页 `PlayerPreview.vue`（Day 6 将被真正的 `VideoDetail.vue` 取代），路由 `/video/:vid` 指向它。
- 播放器、进度条、音量、倍速、清晰度、弹幕设置与弹幕发送均可操作；弹幕数据来自 Mock（写入 Vuex，播放器深度监听渲染）。
- 本地测试视频使用 Day 3 已就位的 `assets/video/BadApple.mp4`，不依赖任何远程视频地址。

## 源文件路径（teriteri-client-main）

```text
teriteri-client-main/src/components/player/PlayerWrapper.vue
teriteri-client-main/src/components/player/PlayerLoading.vue
teriteri-client-main/src/components/player/LoadingBuff.vue
teriteri-client-main/src/components/player/PlayerProgress.vue
teriteri-client-main/src/components/slider/SliderColumn.vue
teriteri-client-main/src/components/slider/SliderRow.vue
teriteri-client-main/src/components/color/ColorPicker.vue
teriteri-client-main/src/assets/img/play.svg
teriteri-client-main/src/assets/img/shadow.png
```

以上文件均为原样复制（播放器为原生 HTML5 `<video>` 实现，非 video.js；内部图标为内联 SVG，无 teriteri 字样残留）。

## 复制命令（PowerShell）

```powershell
$src = "D:\软件工程\teriteri-client-main\teriteri-client-main\src"
$dst = "D:\软件工程\UI-\client\src"

New-Item -ItemType Directory -Force "$dst\components\player", "$dst\components\slider", "$dst\components\color" | Out-Null
Copy-Item "$src\components\player\*.vue" "$dst\components\player\"
Copy-Item "$src\components\slider\*.vue" "$dst\components\slider\"
Copy-Item "$src\components\color\*.vue" "$dst\components\color\"
Copy-Item "$src\assets\img\play.svg", "$src\assets\img\shadow.png" "$dst\assets\img\"
```

## 新增与修改文件

```text
client/src/components/player/PlayerWrapper.vue        （新增，2758 行，原样复制）
client/src/components/player/PlayerLoading.vue        （新增）
client/src/components/player/LoadingBuff.vue          （新增）
client/src/components/player/PlayerProgress.vue       （新增）
client/src/components/slider/SliderColumn.vue         （新增）
client/src/components/slider/SliderRow.vue            （新增）
client/src/components/color/ColorPicker.vue           （新增）
client/src/assets/img/play.svg                        （新增）
client/src/assets/img/shadow.png                      （新增）
client/src/views/PlayerPreview.vue                    （新增，Day 5 临时宿主页）
client/src/router/index.js                            （修改，/video/:vid 指向 PlayerPreview）
client/src/mock/index.js                              （修改，新增播放上报接口）
docs/day05.md
README.md
```

## 新增代码全文（宿主页与 Mock）

`client/src/views/PlayerPreview.vue` 关键部分：

```vue
<template>
    <div class="player-preview">
        <HeaderBar :isFixHeaderBar="false"></HeaderBar>
        <main class="preview-body">
            <div class="preview-tip">
                <h1>Day 5：视频播放器</h1>
                <p>复刻 PlayerWrapper 播放器：进度条、音量、倍速、清晰度、弹幕设置与播放速度弹层均可操作；
                    弹幕数据来自 Mock。Day 6 将把本页替换为完整的视频详情页。</p>
                <router-link class="back-home" to="/">返回首页</router-link>
            </div>
            <PlayerWrap :videoUrl="videoUrl" :title="title" :duration="duration" :user="user"
                :population="population" @sendDm="onSendDm"></PlayerWrap>
        </main>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import PlayerWrap from '@/components/player/PlayerWrapper.vue';

// Day 5 Mock 弹幕：字段与播放器渲染所需一致（timePoint 秒 / mode 1滚动 2顶部 3底部）
const mockDanmu = [
    { id: 1, uid: 16, content: '第一条弹幕前来报到', timePoint: 1, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 2, uid: 20, content: 'Day 5 播放器复刻完成', timePoint: 2, mode: 1, fontsize: 22, color: '#FF6699' },
    { id: 3, uid: 25, content: '这个进度条可以拖动', timePoint: 3, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 4, uid: 31, content: '倍速和清晰度在设置里', timePoint: 4, mode: 2, fontsize: 22, color: '#FFFFFF' },
    { id: 5, uid: 16, content: '弹幕可以开关和调节', timePoint: 5, mode: 1, fontsize: 22, color: '#FFD700' },
    { id: 6, uid: 36, content: '键盘快捷键也可以试试', timePoint: 6, mode: 3, fontsize: 22, color: '#FFFFFF' },
    { id: 7, uid: 16, content: '播放、暂停、全屏都正常', timePoint: 8, mode: 1, fontsize: 22, color: '#FFFFFF' },
    { id: 8, uid: 25, content: 'Bad Apple 示例影片', timePoint: 10, mode: 1, fontsize: 22, color: '#FF6699' }
];

export default {
    name: 'PlayerPreview',
    components: { HeaderBar, PlayerWrap },
    data() {
        return {
            videoUrl: require('@/assets/video/BadApple.mp4'),
            title: 'Bad Apple!! 示例影片（Day 5 Mock）',
            duration: 219,
            user: { uid: 16, nickname: '提瓦特观测站长' },
            population: 108
        }
    },
    mounted() {
        // 子组件播放器挂载后才写入 store，确保其 danmuList 深度监听生效
        this.$store.commit('updateDanmuList', mockDanmu.slice());
    },
    methods: {
        // 播放器内发送弹幕：与 VideoDetail 的处理一致，写入 store
        onSendDm(dm) {
            this.$store.state.danmuList.push(dm);
        }
    }
}
</script>
```

`client/src/mock/index.js` 中新增的播放上报分支：

```js
// Day 5 播放上报：游客/登录用户播放计数，Mock 直接成功
if (key === 'POST /video/play/visitor' || key === 'POST /video/play/user') {
    response = { code: 200, message: 'OK', data: null }
}
```

`client/src/router/index.js`：

```js
const PlayerPreview = () => import('@/views/PlayerPreview.vue')
// ...
{ path: '/video/:vid', component: PlayerPreview },
```

## 播放器数据流说明

- 弹幕：宿主页/详情页调用 `store.commit('updateDanmuList', list)` → `PlayerWrapper` 以 `deep` 监听 `$store.state.danmuList` → 按 `timePoint` 排序后随播放进度挂载 `.dm` 元素（滚动/顶部/底部三种模式）。
- 发送弹幕：播放器输入框 `@sendDm` 抛出弹幕对象 → 宿主页写回 store（Day 6 起还会经 WebSocket 广播，Mock 模式仅本地）。
- 播放上报：`/video/play/visitor`（游客）、`/video/play/user`（登录），Mock 直接返回成功。

## 运行方式

```bash
cd client
npm run serve
```

访问 http://localhost:8787/video/1 （本次验证因 8787 被占用实际使用 8789，效果相同）。

## 验收

- `/video/1` 打开播放器，视频（本地 BadApple.mp4）可播放、暂停、拖动进度。
- 悬停播放器唤出控制条：播放/暂停、进度条（时间显示）、弹幕开关、音量、倍速与画质设置、全屏。
- 设置弹层可打开，倍速选项（3 项）与弹幕设置（透明度/字号/速度/区域）可操作。
- 播放到对应时间点后 Mock 弹幕按模式滚动显示，播放器内可发送弹幕并即时上屏。
- 底部显示“108 人正在观看，已装填 8 条弹幕”与弹幕输入框、发送按钮。
- 浏览器控制台无阻断性报错。

## 学习资源

- HTML5 video 元素与 API：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
- Vue 3 侦听器（watch/deep）：https://cn.vuejs.org/guide/essentials/watchers.html
- CSS 自定义属性驱动动画：https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties
- Chrome DevTools 调试媒体播放：https://developer.chrome.com/docs/devtools?hl=zh-cn

## Day 5 提交

```bash
git add client docs/day05.md README.md
git commit -m "day05: build client video player controls"
git tag day05
```
