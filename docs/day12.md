# Day 12：管理端视频审核（UI- admin）

## 目标与产出
- 新增 `admin/src/views/VideoReview.vue`（审核列表：状态筛选 Tab + 计数徽标 + 分页 + 操作）。
- 新增 `admin/src/views/VideoDetail.vue`（审核详情弹窗：预览 + 通过/驳回 + 理由）。
- 扩展 `admin/src/mock/index.js`：`/admin/video/review/count|list`、`/admin/video/detail`、`/admin/video/review`、`/admin/video/preview`。
- `router/index.js`：`/review` 由 `AdminPlaceholder` 改为 `VideoReview`。

## 具体任务
1. `VideoReview`：顶部 4 个状态 Tab（全部/待审核/已通过/已驳回）带计数；`el-table` 列出封面/标题/UP主/时长/状态/操作；`el-pagination` 分页；点击行或“审核”打开详情弹窗；“预览”调 `/admin/video/preview`。
2. `VideoDetail`：封面预览区 + 标题/UP主/状态 + 简介 + 驳回理由输入框 + 通过/驳回按钮，提交 `POST /admin/video/review`，关闭后刷新列表与计数。
3. Mock 扩展：审核数据集（12 条，预置状态）+ 分页/计数/详情/改状态。

## 涉及目录 / 模块
- `admin/src/views/{VideoReview,VideoDetail}.vue`
- `admin/src/mock/index.js`、`admin/src/router/index.js`

## 验收标准
- `/review` 显示审核列表与状态筛选；切换 Tab 列表与计数联动。
- 点击条目弹出审核详情，点“通过/驳回”后弹窗关闭、列表与计数刷新。
- `npm run build` 成功；控制台无阻断性报错。

## 前后端依赖与协作
- 前端审核链路 → `backend_` `review.js`：计数（`GET /admin/video/review/count`）、列表（`GET .../list`）、详情（`GET .../detail`）、改状态（`POST .../review`）。
- 数据结构与 `backend_` 完全一致，关闭 Mock 即可联调；真实后端应补充 RBAC、操作日志与参数脱敏（API 设计文档 1.2 第 6 条）。
