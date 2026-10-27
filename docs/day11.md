# Day 11：管理端框架与登录（UI- admin）

## 目标与产出
- 管理端接入 Mock 体系：`network/request.js` 支持 `VUE_APP_USE_MOCK`，新增 `src/mock/index.js`。
- 新增 `store/index.js`：管理员信息、菜单、登录态与 action。
- 新增 `LoginVue`（粒子背景登录页）、`IndexVue`（侧边栏 + 顶栏框架）、`DashboardView`（仪表盘）。
- 重写 `router/index.js`：登录页 + 受保护的管理框架，`/dashboard` 落地，其余菜单先用 `AdminPlaceholder`。
- 新增 `admin/.env.development`（`VUE_APP_USE_MOCK=true`）；`vue.config.js` 代理指向 `:9090`。

## 具体任务
1. 登录：`LoginVue` 用 Canvas 画粒子背景，提交 `POST /admin/account/login`，token 存 `localStorage`，跳转 `/`。
2. 框架：`IndexVue` 左侧菜单来自 `GET /admin/menu/list`，顶栏来自 `GET /admin/personal/info`，含退出。
3. 仪表盘：`DashboardView` 展示 `GET /admin/dashboard/stats` 六个指标。
4. 路由守卫：未登录跳 `/login`，已登录访问 `/login` 跳回 `/`；刷新后凭 token 恢复会话。
5. 其余 7 个菜单（审核/内容/数据/举报/申诉/用户/角色）暂用 `AdminPlaceholder`，Day12/13 落地。

## 涉及目录 / 模块
- `admin/src/{network/request.js,mock/index.js,store/index.js,router/index.js,App.vue}`
- `admin/src/views/{LoginVue,IndexVue,DashboardView,AdminPlaceholder}.vue`
- `admin/.env.development`、`admin/vue.config.js`

## 验收标准
- `npm run serve`（admin 端口 8788）访问 `/` 自动跳 `/login`；用 `admin` 登录后进入框架。
- 侧边栏展示 8 个菜单，点击可在仪表盘与各占位页间切换；顶栏显示管理员头像与昵称，退出回到登录页。
- 仪表盘显示 6 个统计卡片。
- 控制台无阻断性报错；`npm run build` 成功。

## 前后端依赖与协作
- 管理端所有请求与 `backend_` `admin.js` 路径一致（`/admin/account/login`、`/admin/personal/info`、`/admin/menu/list`、`/admin/dashboard/stats`）。
- 默认走 Mock；关闭 `VUE_APP_USE_MOCK` 时经 `vue.config.js` 代理到 `backend_`（`:9090`）即可联调，页面零改动。
- token 仅作演示，真实后端应接入 JWT 校验 + RBAC（见 API 设计文档 1.2 设计原则第 6 条）。
