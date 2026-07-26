# AI导演工作台 · 项目约定

自媒体「AI导演」方向的个人工作台（教别人用AI做电影感视频：运镜/构图/配色/布光/提示词技巧/AI工具）。

## 视觉风格

抹茶奶油自然系（已确认，勿改）：
- 背景 `#F1F0E6` / 侧栏 `#E9E8DA` / 面板 `#FBFAF3`
- 主色 `#6C7D47`（橄榄绿），深色 `#55643A`，文字 `#34362A`，边框 `#DFDECE`
- 大圆角 + 胶囊(pill)元素 + 柔和轻投影，参考姜Dora工作台

## 技术架构

- 纯前端单文件 `index.html`（HTML+CSS+JS 内联），无后端，无构建
- 数据存 localStorage，「导出/导入」JSON 做备份与 AI 数据回流
- AI 联动走"指令弹窗"模式：页面生成指令 → 用户发给 AI agent（Kimi CLI）→ agent 返回 JSON → 用户「导入」入库
- **云端同步阶段统一改造**：所有"指令弹窗"类手动 AI 功能（热点采集、AI选题、各模块派AI）届时全部改为全自动（agent 直接写云端库）。在此之前不做定时/半自动化（用户已确认）
- 通用件：`openPrompt(标题,指令)` 指令弹窗；`openJsonImport(标题,提示,handler)` 通用 JSON 导入弹窗（复盘/提示词/参考/爆款共用）；`copyText(文本,按钮)` 复制带降级

## 运行环境（已落地，勿随意改）

- **云同步 = 坚果云**（国内可用；OneDrive 个人版国内半封锁已弃用）。同步文件夹：`C:\Users\Admin\Nutstore\1\我的坚果云`（外层 `Nutstore\` 是缓存目录，勿放文件）
- **Obsidian 库**：`C:\Users\Admin\Nutstore\1\我的坚果云\Obsidian Vault`（库即普通文件夹，随坚果云自动上云）；用户安卓手机，手机端同步方案（remotely save 插件 / WebDAV）待配
- **灵感速记 → Obsidian 直写**：File System Access API（`showDirectoryPicker`，仅 Chrome/Edge，file:// 协议可用）；目录句柄存 IndexedDB（`ai-director-workbench-idb`），刷新后点一次"授权"即可；每条灵感写一个 `.md`（文件名 `日期-id-前14字.md`，frontmatter 含 tags/created/converted），转选题时回写 `converted: true`；写入目标 = 库里的 `灵感速记\` 子文件夹；写不进去时静默降级为仅存 localStorage；「📥 从 Obsidian 读取」反向回读（手机端录入闭环，按文件名去重，解析 frontmatter）
- **全量云备份**：侧栏底部「🔗 连接备份」→ 选坚果云同步根目录（`我的坚果云`）→ 自动建子文件夹 `AI导演工作台备份\AI导演工作台-全量备份.json`（所有 `ai-director-workbench.` 前缀的 localStorage key 打包）；每 5 分钟检测变更自动备份 + 手动「☁️ 立即备份」；「📥 恢复」为覆盖式恢复（恢复前 confirm）；坚果云文件历史可当版本快照
- **手机端链路**：安卓 Obsidian + remotely save 插件（WebDAV，`https://dav.jianguoyun.com/dav/`，坚果云应用密码授权），手机库名必须叫 `Obsidian Vault` 与云端文件夹对齐；手机记的灵感 → 坚果云 → 电脑库 → 工作台「📥 从 Obsidian 读取」进列表
- Obsidian 安装在 `D:\Users\Admin\AppData\Local\Programs\Obsidian\`（用户目录被 360 移到了 D 盘）

## 线上部署（2026-07-26 已上线）

- **GitHub Pages**：`https://miaowei0318.github.io/ai-workbench/`（仓库 `miaowei0318/ai-workbench`，public，main 分支根目录，legacy build）；本地 `ai-workbench` 是 git 仓库，远程 origin 已配
- **自动发布**：`radar-daily.ps1` 采集完成后 `git add -A && commit && push`（失败重试 3 次、间隔 5 分钟）；`.gitignore` 排除 *.png / *.log / __pycache__
- **访问注意**：github.com 主站在用户网络下间歇性被干扰（注册/授权/推送走它，用户已装 Watt Toolkit 加速应对）；github.io 托管域名实测国内正常，访客无需加速；若将来观众反馈打不开，再上 Gitee Pages 国内镜像（双 push）
- **gh CLI**：`D:\kimi\bin\gh.exe`，已登录 miaowei0318（keyring），`gh auth setup-git` 已配好凭据助手，推送免交互

## 模块清单（10个，全部 v1 已完成）

- 生产流水线：灵感速记 → 选题库 → 脚本写作室 → 制作与发布 → 数据复盘
- 弹药库：提示词库（含工具档案速查表，AI工具库已降级并入）｜导演参考库｜爆款拆解库
- 中枢与经营：任务看板｜商务合作
- 路由 hash 直达：`#ideas` `#topics` `#scripts` `#prod` `#review` `#prompts` `#ref` `#hot` `#tasks` `#deals`

## 各模块数据结构与要点

所有 localStorage key 前缀 `ai-director-workbench.`，种子数据均标"示例"方便替换。

- **选题库** key `topics.v1`：id/title/angle/source/tags[]/status/note/seriesId/ep/createdAt（pain 等四维评分字段已废弃，仅旧数据残留）；status 四态流转：待定→已排产→已发布→搁置（「▶ 推进」循环，旧"待评估"加载时自动迁移为待定）；**合集（系列）机制**：key `series.v1`：{id,name,desc,status(更新中/已完结),createdAt}——一个合集=抖音上的一个合集，选题=合集里的一集（seriesId 归属 + ep 集数自动递增，换合集自动排末尾，移出合集清 ep）；页面按合集分区渲染（更新中在前、已完结折叠沉底），合集头显示 共N集·各状态数，操作：＋加一集（新建选题并归入，弹窗标题带合集名）/✏️改名/✔️完结↩︎重开/🗑删除（选题归单篇不删）；seriesId=null 的进「📦 单篇选题」区；卡片带 EP01 集数徽章；筛选/搜索时无命中的合集不占位；弹窗「所属合集」下拉（含＋新建合集…即时创建）；界面只留状态带筛选+搜索+新建，弹窗仅标题/角度/状态/合集/备注；无导入导出、无打分、无 AI 指令按钮（用户要求极简，2026-07-25 精简；合集机制 2026-07-25 确认加入）
- **导演雷达**（选题库页面上部，2026-07-25 集成）：数据来自 `radar-data.js`（`window.RADAR_DATA = {updatedAt, items[]}`，页面用 `<script src>` 引入规避 file:// fetch 限制，页面本身不联网）；items={id(数字YYYYMMDDNN), cat(hot热点风向/learn技法学习/case爆款拆解), tag, title, srcName, date, ev(流量证据徽章如'▶2100万播放'，显示在列表行), link, learn(学什么), promptText(提示词原文，展开区带⧉复制按钮), angle(选题角度)}；交互三级钻取：分类卡（🔵N条徽标+最新一条预览）→ 模态列表（手风琴，同刻只开一条）→ 行内展开；处理状态按条目 id 存 key `radarState.v1`（topic/ref/skip，换批新 id 自动失效），skip 从列表移除，清零显示"✓ 已扫完"；🎯转选题：行内弹合集选择（含＋新建合集…），写入 topics（source=📡 导演雷达、status 待定、note 带原文链接、归入合集自动排 EP）；📥收进参考库：写入 refs（type 其他，tag 映射 REF_DIMS，point=learn，note=选题角度）；🔗查看原文=普通外链新标签页。**每日采集任务**（2026-07-25 起改为 Windows 任务计划程序「AI导演工作台-雷达每日采集」：用户登录后 2 分钟 + 每天 08:03 双触发，执行 `radar-daily.ps1`（全 ASCII，PS5.1 ANSI 读取限制）→ 防重复守卫（radar-data.js 今天已重写则跳过）→ `kimi.exe -p` 无头运行 `radar-task.md`（完整采集指令说明书，改标准只改这个文件）；日志 `radar-daily.log`。混合深度：learn/case 读全文精读、hot 摘要级；标准：≤30 天硬过滤，B站≥20万播放（教程≥5万）、抖音报道≥500万/点赞≥10万/涨粉≥5万、小红书≥5000赞，无硬数据不进 case、公众号只进 learn，同一内容跨板块去重，链接必须直达内容页，每条 learn 必含可抄干货）；**B站直采工具 bili-cli**（`pipx install bilibili-cli` 已装，`/c/Users/Admin/.local/bin/bili.exe`，调用前 `export PYTHONIOENCODING=utf-8` 否则 GBK 报错；search/video/hot/rank 只读免登录；发布日期用 `curl api.bilibili.com/x/web-interface/view?bvid=` 的 pubdate 校验）；小红书/抖音无公开通道（抖音走数据媒体报道链接，小红书待装 opencli+扫码）
- **灵感速记** key `ideas.v1`：id/text/tags[]/createdAt/converted/file(已写入的md文件名)；界面极简：大输入框（⤢全屏专注模式弹层 ideaExpandMask）+关键字搜索，无标签无筛选；一键转选题（进"待定"并标记 converted）；「🔗 连接 Obsidian 库」按钮直写 .md 到 Obsidian 库（详见"运行环境"）；手机端语音输入=手机输入法语音转文字
- **脚本写作室** key `scripts.v2`：{id, topicId, title, gongming(共鸣点), rows[], status(草稿/已完成), updatedAt}；行={id, line(台词), visual(画面描述), src(出镜/拍摄/AI生成素材库), st(待制作/制作中/已完成), sfx(音效)}；Excel 式表格，行增删/上下移/插入，单元格编辑自动保存；导入三通道：Excel 粘贴(TSV)/CSV(自动 UTF-8/GBK)/AI-JSON；种子=用户真实脚本《AI画面三层框架法》60 行；左侧列"已排产无脚本"选题（按合集分组显示，带 EP 集数）；脚本卡片显示所属合集名；台词字数+口播时长估算（约4.5字/秒）
- **制作与发布** key `productions.v1`：{id, scriptId, title, stage, platforms{抖音/小红书/B站/视频号:{date,link}}, note, createdAt}；stage 五段看板：待拍摄→AI素材生成中→剪辑中→待发布→已发布；卡片显示关联脚本素材完成度进度条；"已完成脚本"自动出现在待立项区；⧉发布策略指令
- **数据复盘** keys `posts.v1` / `lessons.v1`：posts={id,title,platform,date,plays,likes,comments,favs,follows}，自动算赞播比/评播比，顶部 metric 汇总；lessons={id,type(加分行为/减分行为/中性观察),content,source,tags[],createdAt}；⧉复盘分析指令→JSON→「导入经验JSON」；badge=经验条数
- **提示词库** keys `prompts.v1` / `promptTools.v1`：prompts={id,title,text,tool(可灵/即梦/Runway/Veo/Sora/Pika/剪映AI/通用),cat(运镜/构图/配色/布光/质感/其他),effect,rate1-5,createdAt}；工具/分类双筛选+搜索+一键复制；工具档案速查表 tools={name,goodat,price,feel} 表格直接编辑自动保存；⧉提示词生成指令→JSON 导入
- **导演参考库** key `refs.v1`：{id,title,type(电影/短片/广告/MV/其他),dims[](构图/运镜/配色/布光/情绪),point(拆什么),link,note,rate,createdAt}；维度筛选；⧉拉片拆解指令→JSON 导入
- **爆款拆解库** key `hots.v1`：{id,title,platform,author,link,plays,hook,structure,why,reuse,st(待拆解/已拆解),tags[],createdAt}；状态/平台双筛选；🎯转选题→unshift 进选题库（source=🔥爆款拆解，评分默认3，status=待定，note 带链接）；⧉爆款拆解指令→JSON 导入
- **任务看板** key `tasks.v1`：{id,title,src,st(待办/进行中/已完成),createdAt}；三列看板 ◀▶ 移动；「⚡同步建议任务」扫描：已排产无脚本选题→"写脚本：X"、已完成脚本无制作单→"制作：X"、待发布制作单→"发布：X"（按标题去重）；badge=未完成数
- **商务合作** key `deals.v1`：{id,brand,type(商单/课程/咨询/其他),amount,stage,contact,note,createdAt}；stage 五段管道：接洽中→报价中→执行中→已交付→已结款；metric：在谈金额/已结款金额；badge=未结款单数

## 云端同步阶段待做

- 所有"指令弹窗"类手动 AI 功能改全自动（agent 直接写库）：分镜脚本、发布策略、复盘分析、提示词生成、拉片拆解、爆款拆解
- 导演雷达每日采集（已通）：Windows 任务计划程序「AI导演工作台-雷达每日采集」开机登录 + 每天 08:03 双触发，脚本防重复，按 `radar-task.md` 标准重写 `radar-data.js`（格式见"各模块数据结构与要点"导演雷达条）
- 手机端适配（灵感速记移动录入）
- 数据上云（当前 localStorage，换浏览器/清缓存会丢；侧栏已有全量云备份→坚果云）

## 验证方式

改完 JS 必须截图验证（某模块语法错会搞垮整页）：
`chrome-headless-shell.exe --screenshot=out.png --window-size=1440,900 --virtual-time-budget=3000 "file:///D:/kimi/ai-workbench/index.html#<hash>"`
