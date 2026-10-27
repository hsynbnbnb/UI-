# Day 13：管理端全路由与 Mock 兜底（UI- admin）

## 目标与产出
- 新增通用管理页 `admin/src/views/AdminTableView.vue`：按 `meta.endpoint` 拉取列表/统计并以表格或卡片渲染。
- `router/index.js`：内容 / 数据 / 举报 / 申诉 / 用户 / 角色 六个菜单由 `AdminPlaceholder` 改为 `AdminTableView`（各带 `meta.endpoint`）。
- 扩展 `admin/src/mock/index.js`：六类管理接口；确认未实现接口有兜底（返回 `code:200`）。
- 客户端 Mock 兜底已存在（`mock/index.js` 末尾默认返回 `Mock OK`），管理端兜底为 `mock/index.js` 默认返回 `code:200`。

## 具体任务
1. `AdminTableView`：自动根据返回结构渲染——数组 → `el-table`（动态列 + 封面/状态特殊处理）；对象（如数据概览）→ 统计卡片；分页列表 → `el-pagination`。
2. 路由：6 个菜单指向 `AdminTableView`，各传 `endpoint`。
3. Mock 扩展：内容/数据/举报/申诉/用户/角色 六类数据。

## 涉及目录 / 模块
- `admin/src/views/AdminTableView.vue`、`admin/src/router/index.js`、`admin/src/mock/index.js`

## 验收标准
- 点击左侧 6 个菜单均可进入对应页面并展示数据（内容/用户/角色为表格，数据为卡片，举报/申诉为表格）。
- 内容管理页可分页。
- 任意未实现接口返回 `code:200`，控制台无阻断性报错。
- `npm run build` 成功。

## 前后端依赖与协作
- 前端六类管理页 → `backend_` `admin-manage.js` 同名接口（`/admin/content/list`、`/admin/data/overview`、`/admin/report/list`、`/admin/appeal/list`、`/admin/user/list`、`/admin/role/list`）。
- 同一套 `meta.endpoint` 约定使新增管理模块只需在路由加一条 + 后端补一个接口，前端零样板代码。
- 真实接入：在 `backend_` 对应路由接 RBAC + 操作日志即可，前端无需改动。
