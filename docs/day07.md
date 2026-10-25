# Day 7：评论楼与回复编辑器

## 目标与产出

- `CommentVue.vue` 占位组件替换为真实评论组件族：`CommentVue`、`CommentTree`、`SubComment`、`ReplyTextarea`、`EmojiBox`。
- 一级评论、楼中楼回复、表情面板、点赞/点踩、删除（含二次确认）、排序切换（最热/最新）与“登录后查看更多”游客限制全部复刻。
- 新增 Mock：评论楼分页、UP 主觉得很赞、发表评论、删除评论、点赞点踩、展开更多回复。
- 发表评论成功后写入 Mock 池，刷新后仍在（一级评论头插）。

## 源文件路径（teriteri-client-main）

```text
teriteri-client-main/src/components/comment/CommentVue.vue
teriteri-client-main/src/components/comment/CommentTree.vue
teriteri-client-main/src/components/comment/SubComment.vue
teriteri-client-main/src/components/comment/ReplyTextarea.vue
teriteri-client-main/src/components/emoji/EmojiBox.vue
```

表情数据复用 Day 2 已就位的 `client/src/assets/json/emoji.json`（与原仓库一致）。

## 复制命令（PowerShell）

```powershell
$src = "D:\软件工程\teriteri-client-main\teriteri-client-main\src"
$dst = "D:\软件工程\UI-\client\src"

New-Item -ItemType Directory -Force "$dst\components\emoji" | Out-Null
Copy-Item "$src\components\comment\*.vue" "$dst\components\comment\"
Copy-Item "$src\components\emoji\EmojiBox.vue" "$dst\components\emoji\"

# token 约定对齐（覆盖 Day 6 的 CommentVue 占位组件）
Get-ChildItem "$dst\components\comment\*.vue" | ForEach-Object {
    (Get-Content $_.FullName) -replace 'teri_token', 'pilipili_token' | Set-Item $_.FullName
}
```

## 新增与修改文件

```text
client/src/components/comment/CommentVue.vue      （替换 Day 6 占位组件）
client/src/components/comment/CommentTree.vue     （新增）
client/src/components/comment/SubComment.vue      （新增）
client/src/components/comment/ReplyTextarea.vue   （新增）
client/src/components/emoji/EmojiBox.vue          （新增）
client/src/mock/index.js                          （修改，新增 Day 7 评论接口）
docs/day07.md
README.md
```

## 新增代码全文（Mock 评论数据与接口）

`client/src/mock/index.js` 中新增（节选）：

```js
// Day 7 评论 Mock：字段与后端 Comment 实体一致（rootId=0 为一级评论，其余为楼中楼回复）
function mockCommentUser(uid) {
    return mockUploaders.find(u => u.uid === uid) || mockUser;
}

function mockReply(id, rootId, parentId, uid, toUserId, content, love, createTime) {
    return {
        id, vid: 16, uid, rootId, parentId, toUserId,
        content, love, bad: 0, createTime, isTop: 0, isDeleted: 0,
        user: mockCommentUser(uid),
        toUser: toUserId ? mockCommentUser(toUserId) : null
    };
}

function mockRootComment(id, uid, content, love, createTime, replies) {
    return {
        id, vid: 16, uid, rootId: 0, parentId: 0, toUserId: 0,
        content, love, bad: 0, createTime, isTop: 0, isDeleted: 0,
        user: mockCommentUser(uid),
        replies
    };
}

// 12 条一级评论（id 201~212），其中 4 条带楼中楼回复（id 301~307）
const mockRootComments = [ /* ... */ ];

// UP 主觉得很赞的评论 id 集合
const mockUpLikes = [201, 202, 204];

let mockCommentIdSeq = 400;

function nowTimeStr() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
```

`mockRequest` 中新增的动态分支：

```js
// Day 7 评论楼列表（offset 分页，每页 5 条）
if (key === 'GET /comment/get') {
    const offset = Number(config?.params?.offset || 0);
    const comments = mockRootComments.slice(offset, offset + 5);
    response = {
        code: 200, message: 'OK',
        data: { comments, more: offset + 5 < mockRootComments.length }
    }
}

// Day 7 UP 主觉得很赞的评论 id
if (key === 'GET /comment/get-up-like') {
    response = { code: 200, message: 'OK', data: mockUpLikes.slice() }
}

// Day 7 发表评论：按表单构造新评论返回，并同步进 Mock 池
if (key === 'POST /comment/add') {
    const val = k => (data && typeof data.get === 'function' ? data.get(k) : '');
    const rootId = Number(val('root_id')) || 0;
    // ...构造 newComment（uid 取 mockUser，含 user/toUser）
    response = { code: 200, message: '评论成功', data: newComment }
}

// Day 7 删除评论 / 点赞点踩评论
if (key === 'POST /comment/delete' || key === 'POST /comment/love-or-not') {
    response = { code: 200, message: 'OK', data: null }
}

// Day 7 展开更多楼中楼回复（后端该接口直接返回 CommentTree，不包 CustomResponse，故提前 return）
if (key === 'GET /comment/reply/get-more') {
    const root = mockRootComments.find(c => c.id === Number(config?.params?.id));
    const payload = root ? { ...root, replies: root.replies.slice() } : null;
    return Promise.resolve({ data: JSON.parse(JSON.stringify(payload)), config });
}
```

> 注意 `/comment/reply/get-more` 与后端行为对齐：控制器直接返回 `CommentTree` 对象（非 `CustomResponse` 包装），因此 Mock 层对该接口提前返回原始对象，页面 `res.data` 取到的即评论楼本体。

## 运行方式

```bash
cd client
npm run serve
```

访问 http://localhost:8787/video/16 下拉到评论区；发表评论需登录（Mock 账号 `pilipili`，或控制台执行 `localStorage.setItem('pilipili_token', 'mock-pilipili-token')` 后刷新）。

## 验收

- 评论区显示“评论 47 / 最热 / 最新”与“请礼貌发言”提示条。
- 一级评论带头像、昵称、等级、UP 标识、内容、时间、点赞数与“回复”入口；“UP主觉得很赞”徽章按 Mock 数据展示。
- 楼中楼回复缩进展示，可继续回复、点赞、删除（删除有二次确认弹窗）。
- 回复编辑器聚焦后展开：表情按钮（弹出 EmojiBox 表情面板）、@ 按钮、发布按钮；表情可插入到输入框。
- 登录后发表评论：输入内容点击“发布”，评论头插/回复尾插出现，输入框清空。
- 未登录时输入区显示“请先登录后发表评论”，点击“登录”唤起登录弹窗。
- 游客仅加载第一页评论，底部显示“登录后查看更多评论”。
- 切换“最新”排序重新拉取列表；浏览器控制台无阻断性报错。

## 学习资源

- Vue 3 列表渲染与 key：https://cn.vuejs.org/guide/essentials/list.html
- Element Plus MessageBox 确认框：https://element-plus.org/zh-CN/component/message-box.html
- 递归组件（评论树）：https://cn.vuejs.org/guide/components/recursive.html
- 正则与文本处理（表情替换/高亮）：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions

## Day 7 提交

```bash
git add client docs/day07.md README.md
git commit -m "day07: build comment threads and reply editor"
git tag day07
```
