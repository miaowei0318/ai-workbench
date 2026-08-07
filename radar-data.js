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
  updatedAt: '08-07 09:56',
  items: [
    /* ----- 📈 热点风向（摘要级） ----- */
    {id:2026080701, cat:'hot', tag:'🎬 漫剧', title:'《墟舍：起源》第一季：末世木屋升级流 AI 漫剧，B站单集破 35 万播放', srcName:'B站·玥依文漫', date:'07-20', ev:'▶35.7万播放', link:'https://www.bilibili.com/video/BV1shKy6HEkJ',
     learn:'101 分钟超长合集，讲人类被传送异界、靠专属木屋升级求生的\'庇护所升级流\'设定。该题材在 DataEye 报告中属漫剧高增量赛道，强设定+养成线是留存关键。合集式一口气看完的编排明显利于B站长尾播放。',
     promptText:'',
     angle:'拆\'庇护所/基地升级流\'为什么成为 AI 漫剧新爆款设定'},
    {id:2026080702, cat:'hot', tag:'🛠 工具', title:'「seedance2.0已死？」漫剧同质化争议视频 46.8 万播放（附全流程制作演示）', srcName:'B站·mj保姆级教程-', date:'07-17', ev:'▶46.8万播放', link:'https://www.bilibili.com/video/BV11pNR6CEGA',
     learn:'标题党切入真实痛点：抖音等平台 AI 漫剧画风、节奏严重趋同，用户审美疲劳。UP主同时附全流程制作演示，评论区争论本身就是选题富矿。同质化焦虑正是\'差异化教学\'类账号的机会点。',
     promptText:'',
     angle:'蹭\'AI漫剧同质化\'争议，讲创作者如何用风格化破局'},
    {id:2026080703, cat:'hot', tag:'🛠 工具', title:'影视飓风：太卷了！改变视频行业的 AI 又迭代了什么？（Seedance 全家桶）', srcName:'B站·影视飓风', date:'08-04', ev:'▶134.9万播放', link:'https://www.bilibili.com/video/BV1teuc63E6D',
     learn:'五个月前聊过 Seedance 2.0 后，本期拆解 Seedance 全家桶更新：30 秒原生直出、多参考素材、编辑能力对视频行业的冲击。影视飓风下场测评代表 AI 视频已进入主流影视视野。创作者可直接引用其测试案例做二创解读。',
     promptText:'',
     angle:'头部影视账号都在讲 Seedance，跟一条\'普通人怎么用全家桶\''},
    {id:2026080704, cat:'hot', tag:'📰 行业', title:'刚去了 2026 世界人工智能大会 WAIC，人山人海', srcName:'B站·老麦的工具库', date:'07-18', ev:'▶26.2万播放', link:'https://www.bilibili.com/video/BV1KuKF6fED9',
     learn:'3 分钟速览 WAIC 2026 现场：AI 视频生成、数字人、机器人展台热度最高。工具类 UP 主视角适合快速判断哪些新工具值得跟进。可对比多家媒体探展视频交叉验证热点方向。',
     promptText:'',
     angle:'WAIC 之后盘点：哪些 AI 视频工具是真趋势、哪些是噱头'},
    {id:2026080705, cat:'hot', tag:'🛠 工具', title:'字节 Seedance 2.5 正式发布：30 秒原生直出，即梦第一时间接入', srcName:'量子位', date:'07-31', ev:'', link:'https://www.qbitai.com/2026/07/464329.html',
     learn:'核心能力：单次 30 秒原生直出（超长模式最长 3 分钟）、最多 50 个多模态参考素材、局部增删改的视频编辑、时间戳指令精度 1 秒内。支持绿幕/白模参考生成，可接 Maya/Blender 插件。实测韦斯安德森式对称构图、低饱和配色等风格控制稳定，电影感提示词玩法空间大幅扩展。',
     promptText:'',
     angle:'Seedance 2.5 时代，\'30 秒一镜到底\'电影感短片教程选题'},
    {id:2026080706, cat:'hot', tag:'📰 行业', title:'即梦 AI 携手上影集团、电影频道、艾菲奖：AI 视频从\'创意辅助\'迈向\'专业交付\'', srcName:'雷锋网', date:'08-05', ev:'', link:'https://m.leiphone.com/category/industrynews/ME02O5J26zzAWXeo.html',
     learn:'电影频道用 Seedance 2.5 做 AIGC 历史纪录片《山河纪》，靠多参考能力做文物/服饰考据；上影成为影视行业首批战略内测伙伴；华策、柠萌、完美世界均在测试超长镜头与绿幕/白模流程。信号：AI 视频已进入正规影视生产链，教\'专业级\'工作流的内容会更有溢价。',
     promptText:'',
     angle:'影视公司都在用的即梦专业功能，拆给个人创作者看'},
    {id:2026080707, cat:'hot', tag:'📺 短剧', title:'番茄海外上线\'AI短剧爆款激励\'：全版权最高激励 5 万，每月仅 TOP15 可拿', srcName:'新腕儿（网易转载）', date:'07-30', ev:'', link:'https://www.163.com/dy/article/L33P5POS0511A6N9.html',
     learn:'活动 8月1日至9月30日，面向 AI 精品剧、AI 解说剧，不限画风。激励系数：非全版权 0.2/0.6（上限 1万/3万），全版权系数 1（上限 5 万元）。仅每月前 15 名可参与——平台在用钱筛选头部 AI 剧，出海短剧创作者值得卡位。',
     promptText:'',
     angle:'平台真金白银激励 AI 短剧出海，个人创作者怎么吃到这波'},
    {id:2026080708, cat:'hot', tag:'📰 行业', title:'封易《2026年1-7月中国短剧与漫剧市场研究报告》：漫剧 243 亿、AI 成本降至 400 元/分钟', srcName:'封易（发现报告转载）', date:'07-23', ev:'', link:'https://www.fxbaogao.com/detail/5552289',
     learn:'关键数据：2026 微短剧市场逼近 800 亿，漫剧预计 243.6 亿（+45%）；AI 生成短剧占上线量 95%+；AI 使单分钟制作成本从 2000 元降至约 400 元，产能提升 45 倍。题材上逆袭类 222.94 亿播放领跑，玄幻仙侠 140 亿+，异能 193 部产 30 亿播放属蓝海。风险：付费漫剧 ROI 已降至 1.1，同质化加剧。',
     promptText:'',
     angle:'用报告数据做一期\'2026 漫剧还能不能入场\'的硬核解读'},
    {id:2026080709, cat:'hot', tag:'📰 行业', title:'DataEye 上半年报告合集解读：海外短剧上调至 60 亿美元，但 99% 的 AI 短剧播放不足 100 万', srcName:'拓端（SegmentFault）', date:'07-31', ev:'', link:'https://segmentfault.com/a/1190000048100987',
     learn:'交叉验证 DataEye、腾讯泡漫、国元证券、Adjust 五份报告：海外微短剧 2026 预估 60 亿美元，中国厂商占九成；AI 短剧成本降至传统 1/500，月产能 5000 部→3.8 万部，但爆款率不足千分之二。TikTok 5 月单月分账破 2100 万美元，正从渠道变成\'裁判\'。差异化题材（黑帮、神豪）低供给高热值。',
     promptText:'',
     angle:'\'产能狂欢与爆款荒漠\'：劝退or机会？数据向行业盘点'},

    /* ----- 📖 技法学习（精读级） ----- */
    {id:2026080710, cat:'learn', tag:'🎥 运镜', title:'【全100集】AI真人短剧制作保姆级教程：打光/调度/分镜/运镜系统课', srcName:'B站·AI电影制作课程', date:'07-22', ev:'▶23.4万播放', link:'https://www.bilibili.com/video/BV1BLgr6zExp',
     learn:'59分钟8章合集，章节编排本身就是可照抄的学习路径：01 AI电影制作全流程 → 02 打光篇 → 03 调度篇 → 04 分镜思维篇 → 05 高级感电影运镜 → 06 电影镜头角度 → 07 AI人物真实感增强 → 08 AI视频真实感增强。核心逻辑：先解决画面质感（打光+调度），再解决叙事（分镜思维+运镜+镜头角度），最后两章专门去AI味（人物/视频真实感增强）。做AI真人短剧可按此顺序逐章跟练，课程资料在评论区置顶获取。',
     promptText:'',
     angle:'把打光→调度→分镜→运镜→真实感串成一条学习路径的真人短剧系统课'},
    {id:2026080711, cat:'learn', tag:'📝 提示词', title:'Seedance 2.5发布详解：30秒长叙事时代的提示词六步结构', srcName:'UIED', date:'08-01', ev:'', link:'https://www.uied.cn/posts/921490',
     learn:'30秒视频提示词按六步写：①先写整体目标（例：生成一段30秒的电影感产品广告，包含原生音效与背景音乐）②标注每份参考素材用途（人物参考@图片1，服装参考@图片2，运镜参考@视频1，音乐节奏参考@音频1）③用时间戳排故事节拍（0—6秒建立场景→7—15秒发现产品→16—24秒演示功能→25—30秒品牌收尾）④明确镜头方式：写\'一镜到底、手持稳定器跟拍、无剪辑\'，或指定近景/中景/特写/全景四个逻辑镜头⑤写明不可变内容：保持五官、服装、商品结构、品牌颜色和声音一致，不得生成额外字幕，不要改变Logo⑥质感约束：自然肤质、低饱和电影色彩、真实光影，避免过度磨皮和塑料质感。关键新能力：单次30秒、最多30图+10视频+10音频参考、支持时间戳级编辑；区域编辑可只改运镜不重生成人物（写法：保持人物、动作和视觉风格不变，只调整摄影机运动）。注意：一镜到底对多人互动/快速动作仍会人物漂移，多轮延长会累积五官/音色/色彩偏移。',
     promptText:'0—5秒：人物从门外进入房间，镜头缓慢后退。\n6—10秒：人物拿起桌上的产品，镜头切换至手部特写。\n11—20秒：展示产品使用过程，镜头环绕主体。\n21—30秒：人物面向镜头说出品牌口号，画面拉远结束。\n\n保持人物、动作和视觉风格不变，只调整摄影机运动。',
     angle:'30秒时代，提示词从写一句话升级为写分镜时间表'},
    {id:2026080712, cat:'learn', tag:'📝 提示词', title:'44条Seedance 2.5官方预览提示词库：逐条配样片可抄', srcName:'Renoise', date:'07-09', ev:'', link:'https://renoise.ai/zh-CN/showcase/awesome-seedance-2-5-prompts',
     learn:'精选自ByteDance/Volcano Ark官方样片库的44条提示词，每条配结果片段。官方提示词通用骨架：①开场写整体规格（Ultra-premium cinematic production, photoreal, IMAX composition, volumetric lighting）②Camera声明（One continuous shot, no cut）③Audio声明（No music, only sound effects and voice）④主体按机位运动线写：cranes up and orbits slowly in → arriving at a medium shot → continues its orbit into a close-up → pulls back and tilts down，每个机位配具体光影（Practical rim light from the setting sun catches one side of her face, the other side in shadow）⑤结尾Hold住细节+声音渐强收尾。社区30秒长片写法：时间轴分拍（0-5s/5-9s/9-13s/13-15s）+ quality兜底约束（single continuous take, zero duplicated or deformed faces, anatomically correct hands, no artifacts）。动作片写法：先立规则（Every enemy must enter visibly before being defeated. Sword strikes must connect logically. No teleporting characters），再按 00:00–00:02 分拍写横向tracking/甩镜/前景遮挡转场。',
     promptText:'A seamless cinematic sequence on a vast frozen mountain peak during blue hour beneath a violent arctic blizzard. Endless snow-covered cliffs, towering glaciers, ancient stone ruins, and a colossal weathered throne carved into the mountain overlook an endless frozen kingdom. Thick snow falls through the air while powerful winds carry swirling ice particles across the landscape. The atmosphere feels ancient, sacred, and forgotten. Kael, a fearless legendary warrior with shoulder-length wavy black hair, sharp amber eyes, a rugged face with a subtle scar above his left eyebrow, walks slowly and confidently through the deep snow toward the ancient throne. He wears weathered black dragon-scale armor with intricate silver engravings, heavy armored boots, leather belts across his chest, and a long tattered black cloak flowing naturally in the wind. A massive glowing blue runic greatsword rests on his back, casting a soft blue light onto the snow. The camera begins with an ultra-wide aerial shot before descending into one smooth forward tracking shot behind Kael. Every footstep leaves deep impressions in the snow. His cloak and hair react naturally to the storm while distant thunder echoes through the mountains. Kael reaches the ancient throne and slowly unsheathes his glowing blue runic greatsword. Without hesitation, he drives the sword into the frozen ground before the throne. The instant the blade touches the ice, brilliant blue energy surges outward in glowing cracks racing across the mountain. The storm suddenly becomes silent. Thousands of ancient spectral warriors begin rising from beneath the snow across the mountain. Their translucent blue armor glows softly as they emerge in complete silence. One after another, they kneel toward Kael, forming an endless ghostly army stretching across the frozen landscape. The camera slowly pulls back and rises high above the mountain, revealing Kael standing alone before the throne with his glowing sword planted in the ice while an enormous spectral army kneels beneath him. Snow continues falling peacefully as blue light illuminates the entire mountain. The sequence ends with a breathtaking ultra-wide aerial view before fading to black. Ultra-photorealistic fantasy filmmaking, Hollywood blockbuster, IMAX scale, cinematic blue-hour lighting, volumetric snowfall, realistic cloth and hair simulation, physically accurate animation, ray-traced reflections on ice, atmospheric fog, subtle anamorphic lens flares, smooth continuous camera movement, one uninterrupted shot, no cuts, no glitches, no morphing, consistent character identity, emotional cinematic ending, masterpiece, 8K.',
     angle:'官方提示词=机位运动脚本+光影逐镜注解，不是形容词堆砌'},
    {id:2026080713, cat:'learn', tag:'📝 提示词', title:'Seedance 2.5使用指南：先建参考素材包，再写提示词', srcName:'Flick Blog', date:'07-23', ev:'', link:'https://flick.art/zh/blog/seedance-2-5-guide',
     learn:'核心方法论：写提示词之前先建参考素材包（Reference Pack），分三个模块——①身份模块：正面肖像、3/4角度、侧面轮廓、全身服装照、有转身动作需背面视图、头发/配饰/疤痕特写、已批准的静帧；②服装道具模块：服装正反面、鞋、首饰、武器/工具/乐器等必须跨镜一致的细节全部单独给参考，别指望模型记住；③视觉块：2-3个项目关键帧+光照参考+色彩参考+镜头/景深参考，锁定整条片子的调色和镜头语言。提示词只负责指导动作，身份信息交给参考图承载。最佳实践：每个参考素材明确标记角色用途；提示词聚焦单个镜头；干净的8秒镜头好过漂移的30秒；审核通过的静帧存为后续参考；镜头基本对就用区域编辑救，不为小问题整镜重生成。常见错误：堆50张无角色标记的参考图、在提示词里过度描述角色、为用满30秒而用30秒、忽略音频指导。',
     promptText:'Use [reference/block] for [role].\n[Shot type / camera movement] of [subject] in [setting].\n[Subject action over time].\n[Environmental motion over time].\nAudio: [dialogue, ambience, foley, music/pacing direction].\nStyle: [lighting, lens, grade, texture].\nConstraints: [preserve identity, preserve wardrobe, no text, no logos, no extra characters].\n\n示例：\nUse the identity references for the main character\'s face and wardrobe.\nUse the look references for the cool blue night grade.\nUse the motion reference for the slow handheld camera rhythm.\nMedium tracking shot of the character walking through a narrow train platform at midnight.\nThey move cautiously, pause when a train passes behind them, then turn toward camera at the end.\nSteam drifts across the platform, fluorescent lights flicker, rain runs down the metal roof.\nAudio: train rumble, wet footsteps, distant station announcement, no music.\nCinematic realism, shallow depth of field, 35mm film texture.\nPreserve the character\'s face, coat, hair, and bag. No readable text, no extra people.',
     angle:'角色一致性不靠提示词硬写，靠参考素材包模块化锁死'},

    /* ----- 🔥 爆款拆解（精读级） ----- */
    {id:2026080714, cat:'case', tag:'', title:'当我试图驯服AI做短剧（6）', srcName:'B站·打工喵i', date:'08-02', ev:'▶309.9万播放 👍14.5万', link:'https://www.bilibili.com/video/BV1zT3R6jEct',
     learn:'拆解路径：这是系列第6期，仅1分14秒，内容不是成片短剧，而是把“和AI反复拉扯改稿”的翻车过程本身剪成剧情。全站最高赞评论2456赞：“AI是这样的，有时候不骂他都听不懂人话”——观众共鸣点是“驯服AI”的真实痛感而非成品质量。抄作业：①把提示词失败→重试→妥协做成固定栏目并编号（（6）），培养追更；②简介写“实在是没token了_(:з」∠)_”式真实吐槽拉好感；③74秒极短时长+高信息密度，完播率碾压长教程。',
     promptText:'',
     angle:'不藏翻车：把“被AI折磨”的过程做成系列短剧，过程即内容'},
    {id:2026080715, cat:'case', tag:'', title:'第1集|《师尊别逃》', srcName:'B站·一念漫剧', date:'07-09', ev:'▶53.9万播放 👍1.7万 收藏1.56万', link:'https://www.bilibili.com/video/BV1RHM768Efd',
     learn:'拆解路径：第1集单集独立投稿（非合集），时长2分59秒。收藏/点赞比≈0.92，说明大量观众码住等更。评论区两个数据点：628赞“好喜欢师尊的发型，精准踩在我的审美点上”、411赞讨论“站错攻受”。抄作业：①角色发型/造型记忆点是双男主漫剧的第一传播钩子，定妆要下死功夫；②“师尊是受”的反差设定自带评论区站队吵架流量；③第1集必须在3分钟内完成人设亮相+钩子，单集投递比长合集更易冷启动。',
     promptText:'',
     angle:'双男主“师尊受”反差设定+造型记忆点，单集3分钟冷启动范本'},
    {id:2026080716, cat:'case', tag:'', title:'【五灵根修仙，我有一个吞噬空间】第1~3季，全集无拼接，一口气看完', srcName:'B站·太白雪动漫', date:'07-19', ev:'▶27.8万播放 👍7414 弹幕9361', link:'https://www.bilibili.com/video/BV1RWKz6DEtc',
     learn:'拆解路径：6小时10分的1~3季无拼接合集，收藏10827。最高赞评论537赞：“后续观看在评论区的都拉黑了，这种免费全集直接三连”——点名批评同行把后续藏进充电/评论区的做法。抄作业：①B站分发策略与抖音切片收费错开：B站放免费全集换三连和完播权重；②“无拼接”三个字写进标题是差异化卖点（观众苦“拼接骗时长”久矣）；③修仙+吞噬流男频爽文结构：被夺机缘→觉醒金手指→反杀，每季留大钩子。',
     promptText:'',
     angle:'免费无拼接全集对冲“充电专属”同行，用诚意换三连和权重'},
    {id:2026080717, cat:'case', tag:'', title:'宝子们你们要的合集版！2小时纯享！', srcName:'B站·人民的漫剧', date:'07-27', ev:'▶49.5万播放 👍1.5万 收藏1.64万', link:'https://www.bilibili.com/video/BV1nHgf6bEfB',
     learn:'拆解路径：标题“宝子们你们要的”=被催更催出来的合集，是老单集内容二次收割的标准动作；2小时时长收获7414条弹幕、1.64万收藏。反面数据点：评论17赞“后面烂尾了，明明可以完美收官的剧情，非得安排虐恋，看得让人恶心”。抄作业：①单集发完→攒量→出“纯享合集”再吃一波流量，一个内容吃两次；②大结局慎用虐恋反转，老粉情感投入深，烂尾会直接反噬口碑；③合集标题要带“你们要的”，把催更势能转化点明。',
     promptText:'',
     angle:'被催更出的2小时纯享合集：老内容二次收割的标准动作与烂尾警示'},
    {id:2026080718, cat:'case', tag:'', title:'囚爱（颜值高，肉与剧情齐飞）', srcName:'B站·奶茶不甜甜甜', date:'07-13', ev:'▶36.3万播放 👍8790 收藏10058', link:'https://www.bilibili.com/video/BV1heN26PEo9',
     learn:'拆解路径：77分钟女性向AI漫剧，标题“颜值高，肉与剧情齐飞”一句话完成受众筛选+内容分级预告。评论区29赞“都1V2了结局竟然不放个三明治的肉”——受众对尺度有明确预期且会公开讨论。抄作业：①女性向/耽美强冲突题材（父子共妻、1V2）在B站仍是供给缺口；②标题直给尺度，让误入者绕路、目标受众秒进，减少差评；③结局要兑现题材承诺，期待管理失败会被精准吐槽。',
     promptText:'',
     angle:'女性向强尺度题材的标题筛选法：一句话完成分级预告与受众过滤'},
    {id:2026080719, cat:'case', tag:'', title:'【免费外卖】AI漫剧', srcName:'B站·请叫我搞笑菌', date:'08-03', ev:'▶315.7万播放 👍1.3万 收藏1.29万', link:'https://www.bilibili.com/video/BV1WKM967EUU',
     learn:'拆解路径：10分28秒AI漫剧（标签：二次元/ai漫剧），最值钱的是异常数据点：315.7万播放但弹幕仅18条、评论区几乎为零——典型电视端（云视听小电视）分发流量，OTT用户不互动但贡献巨量播放和收藏（1.29万收藏 vs 18弹幕）。抄作业：①B站电视端是AI漫剧的隐形放大器，封面/标题要按大屏缩略图可读性优化；②别用弹幕率、评论率判断这类内容的成败，看播放+收藏；③10分钟左右单集时长适配电视端观看场景。',
     promptText:'',
     angle:'315万播放仅18条弹幕：电视端OTT是AI漫剧的隐形流量放大器'},
    {id:2026080720, cat:'case', tag:'', title:'《发配边关，罪妻开荒养出战神》：首部播放增量破20亿的AI漫剧', srcName:'抖音/红果·36氪×DataEye报道', date:'07-14', ev:'▶6月单月播放增量21.27亿 系列6部总播放近40亿', link:'https://m.36kr.com/p/3895496974026632',
     learn:'拆解路径：36氪援引DataEye数据——该剧6月单月播放增量21.27亿断层登顶，系列6部总播放近40亿，第七季以6006万热度登红果热播总榜第7。可复制的结构：①题材=种田穿越+女强逆袭（罪妻开荒养成战神），精准命中漫剧62%男性用户与女强爽点的交叉带；②以“季”为单位连载（已做到第七季），每季独立上榜维持热度而非一次性放出；③3D漫剧形态承载“战神”奇观场面，是真人剧成本打不下来的画面。同文数据：6月抖音端原生AI短剧播放增量TOP10中漫剧占7部、全部破5亿。',
     promptText:'',
     angle:'种田穿越+女强逆袭的多季连载模型，AI漫剧首部20亿级爆款'}
  ]
};
