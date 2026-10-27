# Day 9：账号中心与消息中心（UI- client）

## 目标与产出
- 新增 `AccountView` 及子页 `AccountProfile`、`AccountSecurity`，路由 `/account/:type`，替换原占位。
- 新增头像裁剪组件 `CropperComp` / `CropperDefault`（Canvas 裁剪 + Dialog）。
- 新增 `MessageView` 及 `MessageFeed`、`MessageWhisper`，路由 `/message/:type`，替换原 `ComingSoon`。
- 扩展 `client/src/mock/index.js`：账号资料/设置/头像、消息列表/私聊列表/详情/发送/已读。

## 具体任务
1. `AccountView`：左侧导航（个人资料 / 安全与绑定）+ 右侧内容区，按 `:type` 切换子页。
2. `AccountProfile`：昵称/性别/简介表单 + 头像裁剪入口，提交 `POST /user/account/info`。
3. `AccountSecurity`：绑定信息展示 + 修改密码弹窗，提交 `POST /user/account/password`。
4. `CropperComp`：`<input type=file>` + `<canvas>` 方形裁剪预览；`CropperDefault` 用 `el-dialog` 包裹。
5. `MessageView`：6 个消息类型 Tab（回复/@/赞/系统/私聊/动态），未读数来自 `store.msgUnread`。
6. `MessageFeed`：按 `:type` 拉取 `GET /message/list/:type` 渲染。
7. `MessageWhisper`：会话列表 + 消息气泡 + 发送（`POST /message/whisper/send`）。
8. `router/index.js`：新增 `/account/:type`，`/message/:type` 由 `ComingSoon` 改为 `MessageView`。

## 涉及目录 / 模块
- `client/src/views/account/{AccountView,AccountProfile,AccountSecurity}.vue`
- `client/src/components/cropper/{CropperComp,CropperDefault}.vue`
- `client/src/views/message/{MessageView,MessageFeed,MessageWhisper}.vue`
- `client/src/router/index.js`、`client/src/mock/index.js`

## 验收标准
- `/account/profile` 可见头像/昵称/性别/简介表单，点头像弹出裁剪框，保存后提示成功。
- `/account/security` 可见绑定信息与修改密码弹窗。
- `/message/reply`、`/message/love`、`/message/system` 显示对应消息列表；`/message/whisper` 可见会话与气泡，发送后新消息追加。
- 控制台无阻断性报错；所有请求命中 Mock 或（Mock 关闭时）`backend_` 对应接口。

## 前后端依赖与协作
- 前端账号表单 → `backend_` `account.js`（`GET/POST /user/account/info`、`POST /user/account/password`、`GET /user/account/setting`）。
- 前端消息 Tab/私聊 → `backend_` `message.js`（`GET /message/list/:type`、`GET /message/whisper/list|detail`、`POST /message/whisper/send`）。
- 头像裁剪在**前端本地**完成（Canvas → dataURL），仅把结果回传后端做存储占位；实时私聊由前端 `WebSocket`（day03 store）兜底，后端提供历史与会话。
