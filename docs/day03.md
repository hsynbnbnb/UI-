# Day 3：Client 应用壳与登录注册

## 目标与产出

- 引入 `HeaderBar`、`HeaderChannel`、`SearchInput` 和 `LoginRegister`。
- App 启动时从 Mock 获取频道和热搜数据。
- 登录和注册使用 Mock 接口，不依赖 Spring Boot。
- 账号密码登录中增加“忘记密码？”入口。
- 忘记密码后进入手机号验证码登录模式，界面包含 `+86`、手机号、获取验证码、验证码和登录/注册按钮。
- 品牌名称与登录 Token 统一使用 `pilipili`。
- 未实现的页面统一跳转到 `ComingSoon.vue`。

## 新增与修改文件

```text
client/src/App.vue
client/src/router/index.js
client/src/store/index.js
client/src/mock/index.js
client/src/views/DesignPreview.vue
client/src/views/ComingSoon.vue
client/src/components/headerBar/HeaderBar.vue
client/src/components/headerChannel/HeaderChannel.vue
client/src/components/search/SearchInput.vue
client/src/components/loginRegister/LoginRegister.vue
client/src/assets/img/pilipili-pink.png
client/src/assets/img/icon_hot.png
client/src/assets/img/icon_new.png
client/src/assets/img/loading.gif
client/src/assets/video/BadApple.mp4
```

## Mock 登录信息

```text
账号：pilipili
密码：任意非空内容
```

登录成功后浏览器保存：

```text
pilipili_token=mock-pilipili-token
```

手机号验证码登录的 Mock 验证码为：

```text
123456
```

## 验收

- 顶部显示 pilipili 导航、频道栏和热搜搜索面板。
- 点击“登录”能够打开登录注册弹窗。
- 点击“忘记密码？”能够切换到手机号验证码登录界面。
- 输入合法手机号后可获取 Mock 验证码，并显示 60 秒倒计时。
- 手机号及验证码校验通过后能够完成 Mock 登录。
- Mock 登录后右上角显示头像和用户信息。
- 搜索无结果时仍能跳转到建设中页面，不出现路由错误。
- 浏览器控制台没有阻断性错误。

## 学习资源

- Vue Router 路由参数：https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
- Vue 事件处理：https://cn.vuejs.org/guide/essentials/event-handling.html
- Vuex 状态管理：https://vuex.vuejs.org/zh/guide/state.html
- Axios 请求配置：https://axios-http.com/zh/docs/req_config

## Day 3 提交（本轮暂不执行）

```powershell
git add client docs/day03.md README.md
git commit -m "day03: build client app shell and authentication"
git tag day03
```
