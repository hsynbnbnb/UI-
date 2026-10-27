# Day 14：收尾 — 路由巡检、双端构建与视觉检查（UI-）

## 目标与产出
- 完成 `UI-` 全部 14 天开发的收尾：路由全量巡检、客户端与管理端生产构建验证、1366×768 与 1920×1080 两种分辨率视觉检查说明、README 最终化、问题清单、提交记录表、打 `day14` 标签。
- 确认双端（`client` 8787 / `admin` 8788）在关闭 Mock 后对接 `backend_`（`localhost:9090`）的接口契约一致。

## 具体任务
1. **路由巡检**：核对 `client/src/router/index.js` 与 `admin/src/router/index.js` 中 Day8~Day13 新增路由均可命中，无残留 `ComingSoon` 占位。
2. **双端构建**：分别运行 `npm run build`，确认 `client` 与 `admin` 编译成功、产物入 `dist/`。
3. **视觉检查说明**：在 1366×768 与 1920×1080 两种视口下，确认页面布局无明显错位（见下表，属人工浏览器巡检项）。
4. **README 最终化**：日志表补齐 Day14 链接。
5. **提交记录表**：汇总 Day01~Day14 标签与对应模块。

## 涉及目录 / 模块
- `client/src/router/index.js`、`admin/src/router/index.js`
- `client/`、`admin/`（构建产物 `dist/` 已被 `.gitignore` 忽略，不提交）
- `UI-/README.md`、`UI-/docs/day14.md`

## 路由巡检结果
### 客户端（client，端口 8787）
| 路由 | 组件 | 来源 |
|------|------|------|
| `/search`、`/search/video`、`/search/user` | SearchVideo / SearchUser | Day8 |
| `/space/:uid` 及其子路由（video/article/dynamic/favlist/setting/follow/fans） | Space* | Day8 个人空间 |
| `/video/:vid` | VideoDetail | Day6 |
| `/message/:type` | Message（6 类消息 Tab + 私聊） | Day9 |
| `/account/:type` | Account（资料 / 安全） | Day9 |
| `/platform/:type` | Platform（创作中心 / 上传 / 分区 / 标签） | Day10 |
| `/:catchAll` → `/` | 兜底 | — |

### 管理端（admin，端口 8788）
| 路由 | 组件 | meta.endpoint | 来源 |
|------|------|---------------|------|
| `/login` | LoginVue | — | Day11 |
| `dashboard` | DashboardView | — | Day11 |
| `review` | VideoReview | — | Day12 |
| `content` | AdminTableView | `/admin/content/list` | Day13 |
| `data` | AdminTableView | `/admin/data/overview` | Day13 |
| `report` | AdminTableView | `/admin/report/list` | Day13 |
| `appeal` | AdminTableView | `/admin/appeal/list` | Day13 |
| `user` | AdminTableView | `/admin/user/list` | Day13 |
| `role` | AdminTableView | `/admin/role/list` | Day13 |

## 双端构建结果
- `cd client && npm run build` → `DONE Build complete`（28249ms），`dist/` 生成成功。
- `cd admin && npm run build` → `DONE Build complete`（24640ms），`dist/` 生成成功。
- 两端均无编译 / 导入错误（已通过 `vue-cli-service build` 校验）。

## 视觉检查说明（人工浏览器巡检项）
| 视口 | 检查项 | 预期 |
|------|--------|------|
| 1366×768 | 顶部导航 / 搜索框不溢出；视频卡片两列以上整齐；侧边栏不挤压主区 | 无明显错位、无横向滚动条（主内容） |
| 1920×1080 | 内容居中最大宽度约束；栅格自适应铺满；弹幕层与播放器对齐 | 留白合理、无拉伸变形 |
| 管理端 | 登录页粒子背景铺满；侧边栏 6 菜单可展开；表格分页不溢出 | 控制台无阻断性报错 |

> 自动化无法替代人工像素级目检；上述为 Day14 验收时需人工在浏览器 `localhost:8787` / `localhost:8788` 复核的清单。

## 验收标准
- `npm run build` 两端均成功。
- 客户端 11 条核心路由 + 管理端 9 条路由可打开（Mock 或对接 `backend_` 均可）。
- README 日志表 Day01~Day14 齐全。
- `git tag --list "day*"` 含 `day01`~`day14`（共 14 个）。

## 前后端依赖与协作
- 客户端 Day8~Day13（搜索 / 个人空间 / 账号 / 消息 / 创作中心 / 上传）接口调用路径，与管理端 Day11~Day13（登录 / 审核 / 管理表）路径，均已与 `backend_/src/routes/*.js` 一一对应。
- 前端 `VUE_APP_USE_MOCK=true`（默认）→ 走 `mock/index.js`；设为 `false` + `VUE_APP_API_BASE=http://localhost:9090/api` → 直连 `backend_`，页面代码零改动。
- 真实后端替换：在 `backend_` 各路由接数据库 + RBAC 即可，前端契约不变。

## 提交记录表（UI- Day01~Day14）
| 标签 | 内容 |
|------|------|
| day01~day07 | 基础框架 / 首页 / 搜索骨架 / 视频详情 / 评论 / 弹幕 / 收藏（仓库既有） |
| day08 | 搜索结果页 + 个人空间页 |
| day09 | 账号中心（资料 / 安全）+ 消息中心（6 类 + 私聊） |
| day10 | 创作中心 + 视频分片上传 + 分区 / 标签 |
| day11 | 管理端登录 + 框架 + 仪表盘（独立 admin Mock） |
| day12 | 管理端视频审核列表 + 详情 |
| day13 | 管理端内容 / 数据 / 举报 / 申诉 / 用户 / 角色通用表 |
| day14 | 收尾：路由巡检、双端构建、视觉检查说明、README 与文档 |

> 并行仓库 `backend_` 独立承担 Day08~Day14（共 7 个标签），提供“契约先行”的零依赖 Mock 落点；前端 Day01~Day14 共 14 个标签，两仓合计覆盖完整 14 天计划。

## 问题清单
- `npm run build --mode development` 在 npm 下会把 `development` 误判为入口文件（webpack `Module not found`），应使用标准 `npm run build`（生产模式）或 `npm run build -- --mode development`。
- 生产构建不加载 `.env.development`，故 `dist/` 默认含生产环境变量；本地开发 / 联调请用 `npm run serve`（自动加载 `.env.development`）。
- 上传分片在 `backend_` 仅内存态记录、不落盘（符合“不写磁盘”约束），刷新即丢失。
- 视觉检查依赖人工浏览器目检，自动化仅保证编译通过与路由可达。
