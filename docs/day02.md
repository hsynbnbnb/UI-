# Day 2：全局样式与基础组件

## 目标与产出

- 引入两端的全局 CSS、Element Plus 覆盖样式和 Harmony Font 字体。
- 客户端加入 `VPopover`、`VAvatar`、`VLevel`、`UserCard` 和 `NavBar`。
- 管理端加入 `VPopover`。
- 使用组件预览页验证主题变量和组件效果。

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
