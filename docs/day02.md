# Day 2：全局样式与基础组件

## 目标与产出

- 引入两端的全局 CSS、Element Plus 覆盖样式和 Harmony Font 字体。
- 客户端加入 `VPopover`、`VAvatar`、`VLevel`、`UserCard` 和 `NavBar`。
- 管理端加入 `VPopover`。
- 使用组件预览页验证主题变量和组件效果。

## 从原项目复制的文件

```text
client/src/assets/css/base.css
client/src/assets/css/element.css
client/src/assets/css/global.css
client/src/assets/css/normalize.css
client/src/assets/css/videoCard.css
client/src/assets/font/font.css
client/src/assets/font/HarmonyOS_Sans_SC_Medium.ttf
client/src/components/popover/VPopover.vue
client/src/components/avatar/VAvatar.vue
client/src/components/UserCard/VLevel.vue
client/src/components/UserCard/UserCard.vue
client/src/components/navbar/NavBar.vue
client/src/utils/utils.js

admin/src/assets/css/base.css
admin/src/assets/css/element.css
admin/src/assets/css/global.css
admin/src/assets/css/normalize.css
admin/src/assets/font/font.css
admin/src/assets/font/HarmonyOS_Sans_SC_Medium.ttf
admin/src/components/popover/VPopover.vue
```

## 新增文件

- `client/src/views/DesignPreview.vue`
- `admin/src/views/DesignPreview.vue`

## 验收

- 启动 Client，页面显示粉红色主题、导航栏、头像、等级、用户卡片和悬浮弹层。
- 启动 Admin，点击按钮可以显示 VPopover 菜单。
- 浏览器控制台没有阻断性错误。

## 学习资源

- Vue 组件 Props 与 Slots：https://cn.vuejs.org/guide/components/props.html
- Vue Scoped CSS：https://cn.vuejs.org/api/sfc-css-features.html
- CSS 变量：https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties
- Flexbox：https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flexible_box_layout

## Day 2 提交

```powershell
git add client admin docs/day02.md README.md
git commit -m "day02: add shared design tokens and UI primitives"
git tag day02
```
