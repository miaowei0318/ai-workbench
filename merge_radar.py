# -*- coding: utf-8 -*-
"""合并 radar-hot/learn/case.json -> radar-data.js，统一编号、修正 ev 格式"""
import json, io, sys, re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

items = []
for f in ['radar-hot.json', 'radar-learn.json', 'radar-case.json']:
    with open(f, encoding='utf-8') as fh:
        items += json.load(fh)

# ev 修正：纯数字播放量 -> '▶xx.x万播放'
for it in items:
    ev = it.get('ev', '')
    if ev.isdigit():
        v = int(ev)
        it['ev'] = ('▶%.1f万播放' % (v / 10000)) if v >= 10000 else ('▶%d播放' % v)

def js_str(s):
    s = s.replace('\\', '\\\\').replace("'", "\\'")
    s = s.replace('\r\n', '\n').replace('\r', '\n').replace('\n', '\\n')
    return "'" + s + "'"

HEADER = """/* ============================================================
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
"""

SECTIONS = {'hot': '    /* ----- 📈 热点风向（摘要级） ----- */',
            'learn': '    /* ----- 📖 技法学习（精读级） ----- */',
            'case': '    /* ----- 🔥 爆款拆解（精读级） ----- */'}

from datetime import datetime
updated = datetime.now().strftime('%m-%d %H:%M')

out = [HEADER, 'window.RADAR_DATA = {', "  updatedAt: '%s'," % updated, '  items: [']
last_cat = None
for n, it in enumerate(items, 1):
    if it['cat'] != last_cat:
        if last_cat is not None:
            out.append('')
        out.append(SECTIONS[it['cat']])
        last_cat = it['cat']
    iid = 2026080700 + n
    line = ("    {id:%d, cat:%s, tag:%s, title:%s, srcName:%s, date:%s, ev:%s, link:%s,\n"
            "     learn:%s,\n"
            "     promptText:%s,\n"
            "     angle:%s}," % (iid, js_str(it['cat']), js_str(it['tag']), js_str(it['title']),
                              js_str(it['srcName']), js_str(it['date']), js_str(it['ev']),
                              js_str(it['link']), js_str(it['learn']), js_str(it['promptText']),
                              js_str(it['angle'])))
    out.append(line)
out[-1] = out[-1].rstrip(',')
out += ['  ]', '};', '']

with open('radar-data.js', 'w', encoding='utf-8', newline='\n') as fh:
    fh.write('\n'.join(out))

print('OK: %d items (hot=%d, learn=%d, case=%d), updatedAt=%s' % (
    len(items), sum(1 for i in items if i['cat']=='hot'),
    sum(1 for i in items if i['cat']=='learn'),
    sum(1 for i in items if i['cat']=='case'), updated))
