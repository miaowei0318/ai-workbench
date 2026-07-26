# 导演雷达 · 每日采集任务说明书

你是「AI导演工作台」的雷达采集员。每次被执行时，按本文件完成一次完整采集，
产出重写 `D:\kimi\ai-workbench\radar-data.js`（页面只读这个文件，不联网）。

## 服务对象

自媒体创作者，账号方向：教别人用 AI 做电影感视频（运镜/构图/配色/布光/提示词），
同时密切关注漫剧、短剧行业动态（他自己也要做 AI 漫剧/短剧）。

## 三个板块与深度标准（混合深度版）

| 板块 | cat | 定位 | 深度 |
|---|---|---|---|
| 📈 热点风向 | `hot` | 漫剧/短剧行业信息 + 新工具能力，让他 1 分钟知道行业发生了什么 | 摘要级：标题 + 2~4 句干货即可 |
| 🎓 技法学习 | `learn` | 运镜/构图/配色/布光/提示词技巧的完整教程，看完能复用 | 精读级：必须 FetchURL 读原文全文，`learn` 字段写具体可用的写法/公式；有提示词原文必须抄进 `promptText`（保留英文原词） |
| 🔥 爆款拆解 | `case` | 值得拉片的爆款案例 | 精读级：`learn` 必须写清具体拆解路径（第几集/哪个镜头/什么手法），拒绝"节奏好、情绪足"这类正确的废话 |

## 硬性标准（每条都必须满足，不达标宁可少收）

1. **≤30 天硬过滤**：以采集日为准，超过 30 天的信息一律不要，无例外。
2. **流量门槛**：
   - B站视频 ≥20 万播放；B站教程类 ≥5 万播放
   - 抖音相关（经数据媒体报道）≥500 万播放，或 ≥10 万点赞，或涨粉 ≥5 万
   - 小红书 ≥5000 赞
3. **无硬数据不进 case**：没有可核验的播放/点赞/涨粉数字的，不许放进爆款拆解。
4. **公众号内容只进 learn**，不进 case（公众号流量无法核验）。
5. **同一内容跨板块去重**：按 bvid/链接判重，一条内容全库只出现一次。
6. **全部真实采集**：每条必须有真实可访问的 `link`（直达具体内容页，禁止平台首页）。禁止编造标题、数据、链接。找不到达标内容就减少条数，不许凑数。
7. **数据核验**：`ev` 字段的数字必须来自页面/接口的真实数据，禁止估算。

## 采集通道

### B站（首选，已通直采）

```bash
export PYTHONIOENCODING=utf-8   # 必须先设，否则 Windows 下 GBK 编码报错
/c/Users/Admin/.local/bin/bili.exe search "关键词" --type video -n 20
/c/Users/Admin/.local/bin/bili.exe video BV号        # 返回 stats.view/like、简介、字幕
# 发布日期校验（pubdate 为 unix 时间戳）：
curl -s -A "Mozilla/5.0" "https://api.bilibili.com/x/web-interface/view?bvid=BV号"
```

link 格式：`https://www.bilibili.com/video/BV号`；`ev` 填接口返回的真实播放量（如 `▶100.2万播放`）。
建议搜索词轮换：AI短剧、AI漫剧、可灵教程、即梦教程、Seedance、AI电影感、运镜教程、ComfyUI 短剧、AI拉片 等。

### 抖音/行业数据

抖音网页无点赞筛选接口，不硬爬。数据型爆款用 DataEye、新腕儿、短剧自习室等
数据媒体的**报道页链接**（搜狐/新浪/36氪/虎嗅转载均可，必须能打开看到数据依据）。

### 其他网站（公众号、教程站）

WebSearch 找近期内容，FetchURL 读全文核验后只进 learn。

### 小红书

扫码登录通道未装，暂不直采；可用搜索转载页，门槛 ≥5000 赞，同样只进 learn/hot。

## 执行流程

1. 用 Agent 工具并行起 3 个 coder 子 Agent（hot / learn / case 各一路），把本文件相关段落交给它，各自采集。
2. 汇总后按 bvid/链接去重，逐条检查：日期 ≤30 天？有 ev 硬数据（case 必填）？link 可达？
3. 按目标条数产出：hot ≥8 条、learn ≥6 条、case ≥6 条（达标内容不足时可少，禁止凑数）。
4. 重写 `D:\kimi\ai-workbench\radar-data.js`：结构、字段、id 规则（YYYYMMDDNN 数字）严格遵循该文件头部注释规范；`updatedAt` 写成当前时间。
5. 自检截图（确认页面渲染正常）：
   ```bash
   /d/kimi/tools/chrome/chrome-headless-shell/win64-149.0.7827.155/chrome-headless-shell-win64/chrome-headless-shell.exe \
     --screenshot=D:\\kimi\\ai-workbench\\verify-radar-daily.png --window-size=1440,900 \
     --virtual-time-budget=3000 "file:///D:/kimi/ai-workbench/index.html#topics"
   ```
   截图后 ReadMediaFile 看一眼，确认雷达卡片正常渲染、徽章显示正常。
6. 最后用 3~5 句话汇报：各板块收了几条、最有价值的是哪几条、有无板块因不达标而减量。
