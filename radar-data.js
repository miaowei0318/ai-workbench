/* ============================================================
 * 导演雷达 · 数据文件
 * 由每日采集任务自动重写（开机登录/每天 08:03 触发，见 radar-task.md），页面只读不联网。
 *
 * 结构：
 *   window.RADAR_DATA = {
 *     updatedAt: 'MM-DD HH:mm',
 *     items: [ { id, cat, tag, title, srcName, date, ev, link, learn, promptText, angle } ]
 *   }
 *   id:        数字，格式 YYYYMMDDNN（如 2026072601），每批内唯一；处理状态按 id 记忆
 *   cat:       'hot'(热点风向) | 'learn'(技法学习) | 'case'(爆款拆解)
 *   tag:       hot 用 🎬 漫剧/📺 短剧/🛠 工具/📰 行业；learn 用 🎥 运镜/🖼 构图/🎨 配色/💡 布光/📝 提示词；case 留空 ''
 *   date:      'MM-DD'，一律 ≤30 天（以采集日为准）
 *   ev:        流量证据短标签（如 '▶2100万播放' '👍80万赞' '涨粉16.5万'），有硬数据才填，否则 ''
 *              case 板块必填；B站条目填接口返回的播放量
 *   link:      直达具体内容页（文章页/视频页），禁止平台首页；B站格式 https://www.bilibili.com/video/BV号
 *   learn:     「学什么」干货 2~4 句，具体到可直接用的写法/公式/数据
 *   promptText:从原文抄出的提示词/指令原文（保留英文原词），没有就 ''，页面显示"⧉ 复制"按钮
 *   angle:     「选题角度」一句话
 *
 * 采集标准（2026-07-25 与用户确认）：混合深度（learn/case 读全文精读，hot 摘要级）；
 * ≤30 天硬过滤；流量门槛 B站≥20万播放（教程≥5万）、抖音报道≥500万、小红书≥5000赞；
 * 无硬数据不进 case；公众号只进 learn 不进 case；同一内容跨板块去重。
 * ============================================================ */
window.RADAR_DATA = {
  updatedAt: '08-04 14:25',
  items: [
    /* ----- 📈 热点风向（摘要级） ----- */
    {id:2026080401, cat:'hot', tag:'📰 行业', title:'广电总局公布《微短剧发展管理办法》：首部专门规章，9月1日起施行', srcName:'IT之家', date:'07-31', ev:'', link:'https://www.ithome.com/0/984/306.htm',
     learn:'微短剧按投资额和题材分三类，一类/二类播出前须申请内容审核和发行许可，一类发《微短剧发行许可证》，无证不得播出、不得评奖。AI生成微短剧须在每集明显位置加提示标识；平台禁用诱导沉迷算法，须落实总编辑负责制，违规转移送审最高罚10万元。做AI短剧必须先搞清自己属哪一类。',
     promptText:'',
     angle:'「9月1日后AI短剧无证不能播」——新规三类划分自测+合规清单科普'},
    {id:2026080402, cat:'hot', tag:'📰 行业', title:'第一财经：1000部AI漫剧仅1部爆款，AI短剧内卷真相', srcName:'新浪财经/第一财经', date:'08-02', ev:'爆款率仅0.47%', link:'https://news.sina.com.cn/o/2026-08-02/doc-inikxrzc5116567.shtml',
     learn:'DataEye《2026上半年AI剧漫剧数据报告》：Q1全行业上线短剧约12.8万部、AI占95%；3月单月抖音新增AI剧/漫剧近5万部，日均超1300部。但行业爆款率仅0.47%，AI漫剧每1000部只有1部跑出来，3月新剧破亿率0.124%。1-5月AI短剧市场规模已破220亿、全年冲400亿。结论：量已过剩，剧本和人物才是稀缺品。',
     promptText:'',
     angle:'「99.9%的AI漫剧是炮灰」——用数据反向论证精品化选题方法'},
    {id:2026080403, cat:'hot', tag:'📰 行业', title:'DataEye《2026上半年国内AI剧漫剧数据报告》全文发布', srcName:'DataEye研究院', date:'07-31', ev:'红果漫剧上半年热度超800亿', link:'https://pdf.dfcfw.com/pdf/H3_AP202607301827488941_1.pdf?1785428590000.pdf',
     learn:'报告干货：红果上半年上榜AI剧漫剧超1800部，峰值热度累计超800亿；单部平均热度从1月4029万涨到6月5204万（+29.3%）。题材上"逆袭"类以971部、457.7亿峰值热度稳居第一，"奇幻脑洞"第二；AI仿真人剧热度占比已超3D漫成为第一大类型。DataEye预测下半年进一步向高视效奇幻/玄幻仙侠集中，避开与真人演员硬碰硬的都市日常。',
     promptText:'',
     angle:'报告划重点：下半年漫剧选题该往哪个题材押注'},
    {id:2026080404, cat:'hot', tag:'📺 短剧', title:'央广网行业观察：AI剧席卷赛道，真人短剧从业者的突围与坚守', srcName:'央广网', date:'08-03', ev:'', link:'https://www.cnr.cn/newscenter/dj/20260803/t20260803_527743828.shtml',
     learn:'真人短剧拍摄量锐减，大量平台定制公司被迫转做AI。从业者突围路径：坚持原创剧本沉淀自有真人IP（爆款演员涨粉直播带货，衍生收入超平台分成）；吃透政策补贴（河南真人主旋律/文旅短剧算力补贴30%，单企业年上限100万）；实景基地"白天拍剧晚上直播"对冲空置。平台对真人精品剧设更高分成和独立曝光资源。',
     promptText:'',
     angle:'真人短剧没死：AI冲击下的三条活路，反向印证AI剧的机会位'},
    {id:2026080405, cat:'hot', tag:'🎬 漫剧', title:'AI短剧《和最讨厌的人灵魂互换了》完整版B站753万播放，登全站排行26名', srcName:'B站/Spongecake-', date:'07-09', ev:'▶753.4万播放 👍25.9万赞', link:'https://www.bilibili.com/video/BV1cNML6eEsg',
     learn:'38分钟"灵魂互换"题材AI短剧完整版，B站753.4万播放、25.9万赞、14.4万收藏、7.4万投币，历史最高全站排行26名。说明"完整版合集+强题材钩子（身份互换）"的AI短剧在B站有头部流量位置，收藏/投币比极高说明观众当正剧追。AI短剧不再只是切片引流，长合集形态已被验证。',
     promptText:'',
     angle:'拉片选题：753万播放AI短剧的题材钩子与合集发行策略'},
    {id:2026080406, cat:'hot', tag:'🎬 漫剧', title:'AI漫剧《原来我是假千金》B站单条149.9万播放，甜宠题材持续出圈', srcName:'B站/小美追漫记', date:'07-21', ev:'▶149.9万播放', link:'https://www.bilibili.com/video/BV12JKb6yEfg',
     learn:'"假千金"反套路甜宠题材AI漫剧，51分钟合集在B站拿下149.9万播放、4.8万赞，评论互动活跃。说明"身份反转+装穷打脸"的女频爽文结构在AI漫剧里依然是最强流量密码之一，合集长视频形态在B站的推荐权重值得重视。',
     promptText:'',
     angle:'拉片这条149万播放AI漫剧：开头3秒钩子和反转节奏怎么排'},
    {id:2026080407, cat:'hot', tag:'🛠 工具', title:'亚食人实测Seedance 2.5：理解力和打斗场面全进化，21.9万播放', srcName:'B站/亚食人', date:'08-01', ev:'▶21.9万播放', link:'https://www.bilibili.com/video/BV1AyGg6TEZH',
     learn:'知名影视区UP主亚食人下场实测Seedance 2.5，重点验证复杂指令理解（多主体、连续动作）和打斗场面生成，结论相比前代"质变"，动作连贯性和指令服从度大幅进化。头部UP主开始用影视专业视角评测AI视频模型，说明该模型的动作戏能力已可进入严肃创作讨论。',
     promptText:'',
     angle:'跟风实测：用同组打斗提示词复测Seedance 2.5，做对比内容蹭热度'},
    {id:2026080408, cat:'hot', tag:'🛠 工具', title:'即梦Seedance 2.5+LibTV制作AI真人短剧36集教程（08-03新发布）', srcName:'B站/AI短剧漫剧制作教程', date:'08-03', ev:'', link:'https://www.bilibili.com/video/BV1hGMX6WEDk',
     learn:'昨天刚发布的36集合集教程：即梦Seedance 2.5配合LibTV制作AI真人短剧全流程，覆盖提示词、AI绘画、图生视频到剪辑成片，195分钟体量。是目前最贴近"Seedance 2.5实战落地"的系统教程，刚发布流量未起，属于早鸟信息差——LibTV工具链的用法值得先学一步。',
     promptText:'',
     angle:'信息差选题：抢在大众之前出「Seedance 2.5真人短剧实操」首测'},

    /* ----- 📖 技法学习（精读级） ----- */
    {id:2026080409, cat:'learn', tag:'🖼 构图', title:'爆肝2个月！90分钟拆解AI漫剧全流程（选题+剧本+分镜+视频+配音+剪辑+变现）', srcName:'B站@GenJi是真想教会你', date:'07-09', ev:'▶86.8万播放', link:'https://www.bilibili.com/video/BV1BoM76iEih',
     learn:'一条90分钟公益课把AI漫剧流水线完整跑通：先定选题找对标，再用AI出剧本并拆成分镜（分镜阶段决定景别与机位，是从"出图"到"出片"的关键跃迁），随后图生视频、配音配乐、剪映合成，最后讲发布变现。适合当"AI漫剧标准作业流程"骨架课：每个环节只死磕1-2个工具，先把1分钟单集流程跑通再迭代质量，避免一上来做长篇弃坑。',
     promptText:'',
     angle:'86万播放的免费系统课，可做"AI漫剧全流程一图流"选题的权威参照'},
    {id:2026080410, cat:'learn', tag:'📝 提示词', title:'纯手搓一部AI漫剧一个月收获3.1w！附教程！全流程操作演示（42P合集）', srcName:'B站@小柚子讲AI漫剧', date:'07-06', ev:'▶16.1万播放', link:'https://www.bilibili.com/video/BV1j8TQ6FEf8',
     learn:'42集连载式实操课，围绕Seedance 2.0/即梦做AI漫剧：从零演示剧本拆分、角色一致性控制（参考图+提示词组合锁定主角形象）、分镜图生成、图生视频、配音剪辑到变现路径。配套提供工具清单与提示词模板，打法是"模板填空"式——新手按集跟练即可复刻一条完整漫剧，适合零基础起步的学员型受众。',
     promptText:'',
     angle:'"手搓漫剧月入3.1w"的强结果导向教程，可拆"角色一致性"单集做技法卡'},
    {id:2026080411, cat:'learn', tag:'📝 提示词', title:'我用AI复刻了全网爆火的"人生副本"', srcName:'B站@大老湿gg', date:'08-03', ev:'▶6.4万播放', link:'https://www.bilibili.com/video/BV1ij3f6dEHG',
     learn:'复刻爆款"贷款100万梭哈西班牙的一生"的完整拆解流程：第一步用GPT对爆款做结构拆解（拆"人生节点+反转钩子"的叙事骨架）再生成原创剧本《顶帅男孩的一生》；第二步把剧本交给Seko的Agent，自动完成角色设定、场景、分镜和视频生成。可复用点：爆款复刻不是抄画面，而是先用LLM抽出结构公式，再让Agent按结构自动填肉，4分钟演示全链路。',
     promptText:'',
     angle:'"GPT拆爆款结构+Agent自动产片"两段式复刻法，是爆款跟拍选题的标准范式'},
    {id:2026080412, cat:'learn', tag:'💡 布光', title:'如何用AI做出有"电影质感"的漫剧画面？光影与构图的高级调教', srcName:'SegmentFault@AI分享小李', date:'07-24', ev:'', link:'https://segmentfault.com/a/1190000048069121',
     learn:'可直接套用的光影参数配置单：丁达尔光用 tyndall effect, volumetric light, sunbeams + 16:9 + CFG 6.5-7.5 + 30-35步；轮廓逆光用 rim lighting, backlit, dramatic silhouette + 2.39:1宽银幕 + CFG 8.0-9.0；胶片感用 35mm film photography + film grain, kodak portra 400:1.3。避坑：开backlit脸会黑成炭，需补 fill light 或把CFG降到6.0减小光比；白天转夜景用图生图、重绘强度锁0.35-0.45保轮廓；别用 masterpiece/best quality 空泛词，改用 35mm anamorphic lens, shot on Arri Alexa 工业硬件词。',
     promptText:'A detective standing in an empty warehouse, volumetric lighting, sunbeams cutting through dusty air, dramatic shadows, cinematic atmosphere, 8k resolution / A knight looking at the horizon, backlit, golden rim light outlining his armor, warm sunset glow, soft lens flare, epic composition',
     angle:'把摄影布光原理翻译成"提示词+CFG+宽高比"三连参数表，布光技法卡直接可用'},
    {id:2026080413, cat:'learn', tag:'🎥 运镜', title:'可灵3.0提示词指南：像导演一样写作的五段式公式（2026）', srcName:'GlobalGPT博客', date:'07-15', ev:'', link:'https://www.glbgpt.com/hub/zh/kling-3-0-prompt-guide-for-better-ai-videos/',
     learn:'核心公式严格按时间顺序写五段：镜头运动→场景设置→主体动作→动感/灯光→时间/音频。运镜必须放句首（如"slow dolly forward"先建立3D空间），且全程只用一个主运动；提示词控制在20-50个精准单词，写300字长段AI会忽略一半并幻觉。情绪不写抽象词，"悲伤"要改写成"泪水顺着脸颊滚落"这类身体动作；对口型用对话标签"他直视镜头说：\"……\""触发唇形同步；图生视频（Ref2V）锁死外观后文字只写动作指令即可防角色变形。',
     promptText:'Static close-up shot, an exhausted soldier in a muddy trench looks up at the sky, heavy rain pouring, he whispers: "We are finally going home." Cinematic low-key lighting, somber atmosphere. / Slow-motion tracking shot, a sports car drifting through a mountain hairpin, tires smoking and throwing gravel toward the camera, bright afternoon sun, photorealistic 8k.',
     angle:'可灵3.0"五段式导演公式"，与之前收的Seedance系指南形成模型对照组'},
    {id:2026080414, cat:'learn', tag:'🖼 构图', title:'3步打造爆款儿童早教动画：AI生成分镜、图片、视频全流程拆解（附工具）', srcName:'网创项目网@离谱思维', date:'07-18', ev:'', link:'https://www.lipsw.com/wcxmdq/15897.html',
     learn:'角色与风格一致性的落地解法很巧：先在即梦搜"3D儿童 卡通"挑一张风格参考截图，发给豆包让它"用提示词方式描述这个角色"，得到风格描述词后固定拼在每条分镜文案前面再生图，四张分镜图风格主角全统一。运镜也不用自己编：在豆包拆分镜的对话里追加"帮我写出每个镜头的运镜以及人物动作"，直接复制进即梦视频生成。成本控制：简单动作用即梦3.0 Fast（10积分/次），复杂表情或大运镜才上Pro；去水印用文心一言图片编辑，别用豆包自带去水印会叠加新水印。',
     promptText:'皮克斯动画风格，3D卡通，一个小女孩棕色头发大眼睛，穿着粉色鞋子，几个卡通小朋友排排坐在餐桌旁，开心地吃水果',
     angle:'"风格词前置拼接法"解决分镜一致性，低成本早教动画SOP半天出片'},

    /* ----- 🔥 爆款拆解（精读级） ----- */
    {id:2026080415, cat:'case', tag:'', title:'【垃圾站】EP01 今天这车垃圾，有点不对劲（原创AI剧集）', srcName:'B站-DiDi_OK', date:'07-10', ev:'▶1047.6万播放 👍34.1万赞', link:'https://www.bilibili.com/video/BV1RANn6bEAW',
     learn:'拉片路径：11:54正片。开场用"焚烧厂夜班机械爪操作员的日常工作流"（抓斗投料的重复动作）建立纪实感，再用"垃圾堆里出现不该存在的东西"打断SOP——典型的"日常程序被打破"悬疑钩子写法。拉片时逐段标注：第1车垃圾→异常物出现→主角反应三个节拍各落在第几分钟，学单元剧"一集一个异世界故事"的收束结构；机械爪POV视角可抄来做"非人视点"开场。',
     promptText:'',
     angle:'原创AI单元剧：用"夜班工种日常+异常入侵"的悬疑公式做系列化世界观'},
    {id:2026080416, cat:'case', tag:'', title:'丧尸下乡（AI丧尸喜剧短片）', srcName:'B站-次级英雄娄不凡', date:'07-26', ev:'▶658.9万播放 👍24.1万赞', link:'https://www.bilibili.com/video/BV1yD376HEKM',
     learn:'拉片路径：7:23正片。把好莱坞丧尸片"日常→异样→爆发"三段式开场公式整体平移到东北农村场景，恐怖感全程被乡村人物反应和台词消解成笑点（评论区高频反馈"丧尸片把我笑吐了"）。拉片方法：对照经典丧尸片节拍表逐段标注本片对应段落，记录每次"恐怖节拍被喜剧反转替换"的具体点位，学"类型混搭=陌生化题材+最熟悉的语境"的选题打法。',
     promptText:'',
     angle:'AI丧尸题材下沉：用乡土语境解构好莱坞类型片，恐怖转喜剧'},
    {id:2026080417, cat:'case', tag:'', title:'AI短片丨把生意包装成短暂的善良', srcName:'B站-黄埔剧场', date:'07-05', ev:'▶503.7万播放', link:'https://www.bilibili.com/video/BV1EeTy6VEKp',
     learn:'拉片路径：仅1:26的超短片。学"社会议题一句话反转"结构：先铺陈一段看似温情的"善良"场景，结尾一句台词/一个镜头揭开生意本质。拉片时按10秒为单位切分，统计铺垫:反转的镜头配比（约5:1），学极短片"前80%积蓄、后20%引爆"的配比；转发率极低但收藏率高，说明"讽刺金句型"内容靠收藏长尾传播。',
     promptText:'',
     angle:'86秒AI讽刺短片：一句话反转揭露商业伪善，金句驱动收藏'},
    {id:2026080418, cat:'case', tag:'', title:'充气城堡里的三头羊【AI全民制作人】', srcName:'B站-蜗牛AI动画', date:'07-13', ev:'▶502.4万播放', link:'https://www.bilibili.com/video/BV139N16aEPC',
     learn:'拉片路径：3:07正片。简介"越玩越不对劲"点明手法：儿童游乐场景+渐进式诡异（analog horror/怪核路线）。拉片重点：记录"不对劲感"第一次出现的时间点和触发物（色彩、比例、动物数量的异常累积），学AI生成最易翻车的"多主体一致性"如何被反向利用——把AI的三头羊式生成缺陷变成恐怖谷卖点，缺陷即风格。',
     promptText:'',
     angle:'怪核AI动画：把AI生成缺陷（多余肢体/诡异比例）转化为恐怖美学'},
    {id:2026080419, cat:'case', tag:'', title:'原创AIGC剧集《有异人》【AI全民制作人】', srcName:'B站-失败的漫2026', date:'07-15', ev:'▶422.9万播放 👍29.0万赞', link:'https://www.bilibili.com/video/BV1psN86KEt5',
     learn:'拉片路径：7:18正片。设定是"外星文明挤压人类生存空间→沉寂异人反抗"，属中式都市异能科幻。拉片重点：开场如何在30秒内交代大世界观（画外音旁白+宏大悲情空镜的组合拳），以及异人登场段的"人物亮相运镜"（慢推+逆光剪影是AI视频最稳的亮相公式）；点赞/播放比近7%远超同类，重点拆解其情绪燃点落位（觉醒/反击名场面的剪辑卡点）。',
     promptText:'',
     angle:'中式异能科幻AIGC剧集：大世界观旁白开场+人物剪影亮相公式'},
    {id:2026080420, cat:'case', tag:'', title:'沉浸式体验清代御厨做古法海鲜水饺【AI全民制作人】', srcName:'B站-老辈人讲古今', date:'07-24', ev:'▶384.9万播放', link:'https://www.bilibili.com/video/BV16Zge6oEHT',
     learn:'拉片路径：该UP同系列已连爆（07-26椰香雪团367.7万、08-01布袋鸡142.5万），是稳定复制的栏目化模板。拆解其单集结构：第一人称"沉浸式体验"视角全程无解说或少解说，按"备料→古法工序→成菜"流程线性推进，用ASMR级环境音+特写填充。拉片时数其特写镜头占比（估超60%）和单镜头平均时长，学"AI历史场景+美食流程"的可批量复制栏目框架。',
     promptText:'',
     angle:'栏目化AI历史美食：第一人称沉浸式+古法工序流程，系列连爆可复制'},
    {id:2026080421, cat:'case', tag:'', title:'《怒海逆袭：我的秘制诱饵爆网了》第一集（AI短剧）', srcName:'B站-阿林动漫_', date:'07-17', ev:'▶353.5万播放 收藏4.7万', link:'https://www.bilibili.com/video/BV1EAKH6GEt6',
     learn:'拉片路径：12:01第一集，属当前AI短剧最热的赶海/养殖逆袭赛道（同UP《茶香漫过青石桥》第一集225.6万，连载续航强）。拆解第一集钩子链：开场冲突（被轻视/负债类困境）→金手指亮相（秘制诱饵）→第一次小胜利（爆网）→结尾留新冲突，逐段标注时间轴；学"每2-3分钟一个爽点、集尾必留扣"的短剧工业化节拍，收藏>点赞说明观众当连续剧追更。',
     promptText:'',
     angle:'赶海逆袭AI短剧：金手指+小胜利+集尾悬念的连载化爽点节拍'},
    {id:2026080422, cat:'case', tag:'', title:'「お疲れ。」（34秒AI日漫风短片）', srcName:'B站-禾视动画', date:'07-12', ev:'▶247.0万播放 👍22.3万赞', link:'https://www.bilibili.com/video/BV16yNK6NExf',
     learn:'拉片路径：仅34秒却拿下22.3万赞，赞播比约9%（远超大盘2-3%），是"高完播短动画"的极端样本。拆解：标题用日语社畜问候语「お疲れ」（辛苦了）锁定情绪，简介"正在召唤不死族大军"暗示反转；拉片时按秒切分，找情绪反转点落在第几秒、BGM与画面卡点的对应关系，学"一句共情文案+一个视觉奇观反转"的34秒公式。',
     promptText:'',
     angle:'34秒情绪短片：社畜共情标题+视觉奇观反转，靠超高赞播比撬动推荐'},
    {id:2026080423, cat:'case', tag:'', title:'把老公送进监狱，转头让人把他捞出来养家（AI剧情短片）', srcName:'B站-672AIGC', date:'07-09', ev:'▶206.0万播放 👍9.3万赞', link:'https://www.bilibili.com/video/BV1UXMj6EEiu',
     learn:'拉片路径：1:11正片，简介注明"技术支持——纳米大片流水线"，是流水线化AI剧情号的样本。标题即完整剧透（三段式：动作A→动作B→"离大谱"评价词），学其"标题讲完全故事、正片负责演情绪"的信息分配。拉片重点：71秒内伦理反转段落的台词密度（数每10秒台词句数），以及"逆天家庭伦理"选题如何卡评论欲（热评即在科普原型事件），学"争议性伦理题=评论区自动盖楼"的互动设计。',
     promptText:'',
     angle:'流水线AI伦理短剧：标题全剧透+争议伦理选题，靠评论盖楼起量'},
  ]
};
