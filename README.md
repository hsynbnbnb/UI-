# Frontend Learning


## 启动客户端

```bash
cd client
npm install
npm run serve
```

访问：http://localhost:8787

## 启动管理端

```bash
cd admin
npm install
npm run serve
```

访问：http://localhost:8788

## 日志

- [Day 1](docs/day01.md)
- [Day 2](docs/day02.md)
- [Day 3](docs/day03.md)
- [Day 4](docs/day04.md)
- [Day 5](docs/day05.md)
- [Day 6](docs/day06.md)
- [Day 7](docs/day07.md)
- [Day 8](docs/day08.md)
- [Day 9](docs/day09.md)
- [Day 10](docs/day10.md)
- [Day 11](docs/day11.md)
- [Day 12](docs/day12.md)
- [Day 13](docs/day13.md)
- [Day 14](docs/day14.md)

## 关闭 Mock 对接真实后端（backend_）

默认 `client/.env.development` 中 `VUE_APP_USE_MOCK=true`，请求被前端 Mock 拦截。
需要联调真实接口时：

```bash
# 终端 1：启动零依赖后端
cd ../backend_
node server.js          # 监听 :9090

# 终端 2：修改 client/.env.development
VUE_APP_USE_MOCK=false
VUE_APP_API_BASE=http://localhost:9090/api
```

管理端 `admin` 同理。后端路径与前端 Mock 键一一对应，无需改任何页面代码。
