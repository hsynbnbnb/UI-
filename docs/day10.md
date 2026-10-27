# Day 10：创作中心与视频上传（UI- client）

## 目标与产出
- 新增 `PlatformView`（创作中心壳：首页数据概览 + 导航）。
- 新增上传链路 `PlatformUpload` → `VideoUpload`（分片上传进度）、`CategorySelect`（分区级联）、`TagInput`（标签联想）、`TextUpload`（专栏占位）。
- 扩展 `client/src/mock/index.js`：`/creator/overview|videos|tags/hot`、`/category/list`、`/video/submit`、`/upload/init|chunk|merge`。

## 具体任务
1. `PlatformView`：左侧导航（创作首页 / 视频投稿 / 专栏投稿）+ 右侧内容；首页展示概览卡片与稿件网格。
2. `PlatformUpload`：聚合标题、分区、标签、简介与视频文件，提交 `POST /video/submit`。
3. `VideoUpload`：选文件后模拟分片——`init` 拿 `uploadId`，循环 `chunk` 上报进度，`merge` 拿地址，回传父组件。
4. `CategorySelect`：`el-cascader` 二级分区（来自 `/category/list`）。
5. `TagInput`：`el-select` 多选 + `allow-create`，热词来自 `/creator/tags/hot`。
6. `TextUpload`：专栏投稿占位页。
7. `router/index.js`：`/platform/:type` 由 `ComingSoon` 改为 `PlatformView`。

## 涉及目录 / 模块
- `client/src/views/platform/{PlatformView,PlatformUpload,VideoUpload,CategorySelect,TagInput,TextUpload}.vue`
- `client/src/router/index.js`、`client/src/mock/index.js`

## 验收标准
- `/platform/home` 显示概览卡片与稿件网格。
- `/platform/upload` 可选视频并显示上传进度，标题/分区/标签/简介可填，投稿后提示成功。
- `/platform/text` 显示专栏占位。
- 控制台无阻断性报错；分片接口命中 Mock 或 `backend_`。

## 前后端依赖与协作
- 前端上传链路 → `backend_` `upload.js`（`init/chunk/merge`）：前端负责切片与进度，后端负责接收与合并（本项目不落盘、不接 OSS，仅返回地址占位）。
- 分区 / 标签 / 投稿 → `backend_` `creator.js`：`CategorySelect` 用 `GET /category/list`，`TagInput` 用 `GET /creator/tags/hot`，提交走 `POST /video/submit`。
- 真实接入时：把 `merge` 换成 OSS 直传 / 服务端合并，前端零改动（仍走 `VUE_APP_API_BASE`）。
