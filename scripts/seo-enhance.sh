#!/bin/bash

# 脚本：为月份页面自动添加SEO frontmatter
# 功能：在 copy_content.sh 同步内容后运行，为每个月份页面添加
#       标准化的 title / description / keywords frontmatter，
#       提升 Google 收录质量，从而增加 Google Ads 曝光和收益。
# 注意：只修改 docs/{category}/ 下的文件（VitePress 源文件），
#       不修改 docs/public/{category}/ 下的文件（ResourceTabs静态资源）
#
# 用法：
#   bash scripts/seo-enhance.sh            # 普通模式，打印每步操作
#   bash scripts/seo-enhance.sh --auto     # 自动模式（CI/CD中使用）

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$ROOT_DIR/docs"

AUTO_MODE=false
if [ "$1" = "--auto" ]; then
    AUTO_MODE=true
fi

# ============================================================
# 分类 SEO 配置
# ============================================================

declare -A CAT_TITLE_ZH
declare -A CAT_DESC
declare -A CAT_KEYWORDS
declare -A CAT_SECTIONS

CAT_TITLE_ZH[AIknowledge]="AI知识资源"
CAT_DESC[AIknowledge]="人工智能学习教程，包含ChatGPT提示词、AI绘画Midjourney、Stable Diffusion、机器学习、深度学习、AI办公工具等优质资源，免费下载"
CAT_KEYWORDS[AIknowledge]="AI知识,人工智能教程,ChatGPT,提示词工程,Midjourney,Stable Diffusion,机器学习,深度学习,AI工具,AI视频课程,免费AI资源"
CAT_SECTIONS[AIknowledge]="- 🤖 **大语言模型** - ChatGPT、DeepSeek、Claude使用技巧与提示词
- 🎨 **AI绘画创作** - Midjourney、Stable Diffusion、ComfyUI教程
- 📊 **机器学习** - Python、TensorFlow、PyTorch实战课程
- 💼 **AI商业应用** - AI变现、AI办公、AI副业项目
- 🔧 **AI工作流** - Coze工作流、n8n自动化、AI智能体"

CAT_TITLE_ZH[book]="书籍资料"
CAT_DESC[book]="海量电子书免费下载，包含技术编程、文学名著、历史哲学、专业教材、商业管理等各类书籍，夸克网盘、阿里云盘直链"
CAT_KEYWORDS[book]="电子书下载,书籍资料,技术书籍,小说下载,教材下载,PDF书籍,免费电子书,编程书籍,文学名著,历史书籍"
CAT_SECTIONS[book]="- 📘 **技术编程** - 计算机科学、编程语言、算法数据结构
- 📗 **文学名著** - 中外经典小说、诺贝尔文学奖作品
- 📙 **历史哲学** - 中外历史、哲学思想、社会科学
- 📕 **商业管理** - 经济学、管理学、创业实战
- 🎓 **专业教材** - 大学教材、职业资格考试用书"

CAT_TITLE_ZH[chinese-traditional]="传统文化中医资源"
CAT_DESC[chinese-traditional]="绝版中医课程资料大全（1.18TB），包含中医基础理论、针灸、推拿、中药、外治法、传统文化国学经典等珍贵资源，免费下载"
CAT_KEYWORDS[chinese-traditional]="中医课程,传统文化,国学资料,针灸教程,中医养生,中医基础,推拿按摩,中药材,传统医学,绝版中医,国学经典"
CAT_SECTIONS[chinese-traditional]="- 🏥 **中医基础** - 中医理论、经络穴位、辨证论治体系
- 🎯 **针灸推拿** - 针灸技法、推拿手法、穴位图解视频
- 💊 **中药养生** - 中药材知识、方剂学、药膳食谱
- 📜 **国学经典** - 四书五经、诸子百家、传统文化
- 🎭 **传统技艺** - 书法、绘画、茶道、民俗文化"

CAT_TITLE_ZH[cross-border]="跨境电商资源"
CAT_DESC[cross-border]="跨境电商全套教程免费下载，包含亚马逊开店运营、TikTok Shop营销、独立站建设、外贸实操、选品数据分析、跨境支付等完整资料"
CAT_KEYWORDS[cross-border]="跨境电商,亚马逊教程,TikTok营销,外贸资料,选品工具,独立站,Shopify,亚马逊开店,跨境支付,外贸实操,TikTok Shop"
CAT_SECTIONS[cross-border]="- 🛍️ **亚马逊运营** - 选品、Listing优化、广告投放、FBA物流
- 📱 **TikTok电商** - TikTok Shop开店、短视频带货、直播
- 🌐 **独立站建设** - Shopify、WooCommerce搭建与引流
- 💳 **跨境支付** - 收款工具、外汇结算、虚拟卡申请
- 📊 **选品数据** - 市场分析、竞品研究、趋势预测工具"

CAT_TITLE_ZH[curriculum]="课程资料"
CAT_DESC[curriculum]="热门知识付费课程免费下载，包含得到APP、混沌大学、网络热门课程、商业思维、个人成长、职业技能培训等综合学习资料"
CAT_KEYWORDS[curriculum]="得到课程,知识付费,网络课程,职业培训,技能学习,商业思维,个人成长,混沌大学,付费课程合集,综合课程"
CAT_SECTIONS[curriculum]="- 📈 **商业管理** - 战略、营销、财务、领导力精品课
- 🔬 **科技前沿** - AI、区块链、大数据前沿知识
- 🎨 **人文艺术** - 历史、哲学、文学、艺术鉴赏
- 💡 **个人成长** - 时间管理、沟通技巧、心理认知
- 🏥 **健康医学** - 医学科普、心理健康、生活方式"

CAT_TITLE_ZH[edu-knowlege]="教育学习资源"
CAT_DESC[edu-knowlege]="全阶段教育学习资料免费下载，从幼儿园到大学，包含学而思、猿辅导、作业帮、万维等机构课程，高考备考、考研资料，持续更新中"
CAT_KEYWORDS[edu-knowlege]="教育资源,学习资料,小学教材,初中教材,高中教材,大学课程,考研资料,学而思,猿辅导,作业帮,教育视频,免费课程,高考备考"
CAT_SECTIONS[edu-knowlege]="- 🎒 **幼儿启蒙** - 早教视频、儿童英语、思维训练
- 📖 **中小学课程** - 语数英理化各科同步辅导资料
- 🎯 **高考备考** - 各科真题、模拟卷、名师讲解
- 🏛️ **大学资料** - 专业课程、考研备考资料
- 💼 **职业技能** - 职业资格证书、技能培训课程"

CAT_TITLE_ZH[healthy]="健康养生资源"
CAT_DESC[healthy]="健康养生资料免费下载，包含健身减脂视频教程、瑜伽普拉提、营养饮食指南、中医养生、心理健康、睡眠改善等全方位健康内容"
CAT_KEYWORDS[healthy]="健身教程,健康养生,营养指南,减肥教程,瑜伽视频,普拉提,运动健身,中医养生,心理健康,睡眠改善,健康食谱,增肌训练"
CAT_SECTIONS[healthy]="- 🏋️ **运动健身** - 减脂塑形、力量训练、HIIT视频课程
- 🧘 **瑜伽普拉提** - 初级到高级全套练习视频
- 🥗 **营养饮食** - 健康食谱、营养搭配、减脂饮食
- 🌿 **中医养生** - 传统养生方法、穴位按摩、中药
- 🧠 **心理健康** - 情绪管理、压力缓解、睡眠优化"

CAT_TITLE_ZH[movies]="影视媒体资源"
CAT_DESC[movies]="影视媒体资源免费下载，包含高清电影、热门电视剧、精品纪录片、音乐专辑、演唱会视频、综艺节目等海量资源，夸克网盘直链"
CAT_KEYWORDS[movies]="影视资源,电影下载,纪录片,音乐下载,演唱会,综艺节目,高清电影,电视剧,4K电影,免费电影,BBC纪录片"
CAT_SECTIONS[movies]="- 🎦 **热门电影** - 国内外院线大片、经典高清电影
- 📺 **电视剧集** - 国产剧、美剧、韩剧、日剧全集
- 🎙️ **纪录片** - BBC、NatGeo等精品纪录片合集
- 🎵 **音乐资源** - 专辑、MV、演唱会现场视频
- 🎭 **综艺节目** - 国内外热门综艺、脱口秀"

CAT_TITLE_ZH[self-media]="自媒体运营资源"
CAT_DESC[self-media]="自媒体运营全套资料免费下载，包含短视频制作、直播运营、流量获取、内容创作变现、公众号运营、抖音小红书运营策略等"
CAT_KEYWORDS[self-media]="自媒体运营,短视频制作,直播运营,流量变现,内容创作,公众号运营,抖音运营,小红书运营,视频号,自媒体变现,涨粉技巧"
CAT_SECTIONS[self-media]="- 🎥 **短视频运营** - 抖音、视频号、快手拍摄剪辑技巧
- 📡 **直播运营** - 直播间搭建、话术技巧、带货策略
- ✍️ **内容创作** - 爆款选题、脚本写作、AI辅助创作
- 💰 **流量变现** - 广告收益、带货佣金、知识付费
- 📢 **平台运营** - 公众号、小红书、B站运营攻略"

CAT_TITLE_ZH[tools]="工具软件资源"
CAT_DESC[tools]="工具软件资源免费下载，包含系统镜像激活、浏览器插件、绿色破解软件、开发工具IDE、设计素材、效率办公工具等，持续更新中"
CAT_KEYWORDS[tools]="工具软件下载,浏览器插件,系统优化,开发工具,设计素材,绿色软件,破解工具,效率工具,Windows工具,Mac工具,系统激活"
CAT_SECTIONS[tools]="- 💻 **操作系统** - Windows、macOS镜像及激活工具
- 🔌 **浏览器插件** - Chrome、Edge等实用插件合集
- 🎨 **设计素材** - PS插件、字体、图标、UI模板
- ⚡ **效率工具** - 办公提效、文档处理、自动化工具
- 👨‍💻 **开发工具** - IDE、数据库、API测试工具"

CAT_TITLE_ZH[auto]="自动化工具资源"
CAT_DESC[auto]="自动化脚本和工具资源免费下载，包含Python自动化、RPA工具、任务调度、批量处理等效率提升工具，帮助提升工作效率"
CAT_KEYWORDS[auto]="自动化工具,自动化脚本,效率工具,Python脚本,RPA,工作自动化,批量处理,任务调度"
CAT_SECTIONS[auto]="- 🐍 **Python自动化** - 爬虫、数据处理、办公自动化脚本
- 🤖 **RPA工具** - 机器人流程自动化软件和教程
- ⏰ **任务调度** - 定时任务、批量处理、工作流工具
- 📊 **数据处理** - Excel自动化、数据清洗、报表生成"

# 月份中文映射
declare -A MONTH_ZH
MONTH_ZH[01]="1月" MONTH_ZH[02]="2月" MONTH_ZH[03]="3月"
MONTH_ZH[04]="4月" MONTH_ZH[05]="5月" MONTH_ZH[06]="6月"
MONTH_ZH[07]="7月" MONTH_ZH[08]="8月" MONTH_ZH[09]="9月"
MONTH_ZH[10]="10月" MONTH_ZH[11]="11月" MONTH_ZH[12]="12月"

# ============================================================
# 主逻辑：为每个月份页面添加 SEO frontmatter
# ============================================================

CATEGORIES=(AIknowledge book chinese-traditional cross-border curriculum edu-knowlege healthy movies self-media tools auto)

updated_count=0
skipped_count=0

echo "=== 开始SEO frontmatter增强 ==="
echo ""

for category in "${CATEGORIES[@]}"; do
    cat_dir="$DOCS_DIR/$category"

    if [ ! -d "$cat_dir" ]; then
        continue
    fi

    # 检查是否有该分类的SEO配置
    if [ -z "${CAT_TITLE_ZH[$category]+_}" ]; then
        echo "⚠️  跳过未配置分类: $category"
        continue
    fi

    echo "📁 处理分类: $category"

    for md_file in "$cat_dir"/20[0-9][0-9][0-1][0-9].md; do
        [ -f "$md_file" ] || continue

        filename=$(basename "$md_file" .md)

        # 解析年月
        year="${filename:0:4}"
        mon="${filename:4:2}"
        mon_num="${mon#0}"  # 去掉前导零
        month_zh="${MONTH_ZH[$mon]:-${mon_num}月}"

        # 检查是否已有 frontmatter
        first_line=$(head -1 "$md_file")
        if [ "$first_line" = "---" ]; then
            echo "  ✅ 已有frontmatter，跳过: $(basename $md_file)"
            skipped_count=$((skipped_count + 1))
            continue
        fi

        title_zh="${CAT_TITLE_ZH[$category]}"
        desc="${CAT_DESC[$category]}"
        keywords="${CAT_KEYWORDS[$category]}"
        sections="${CAT_SECTIONS[$category]}"

        page_title="${title_zh} ${year}年${month_zh}更新合集 - 大坝的资源收集站"
        page_desc="${year}年${month_zh}最新${desc}，每月持续更新"
        page_keywords="${keywords},${year}年,${month_zh}"

        # 生成 frontmatter 和页面头部内容
        frontmatter="---
title: ${page_title}
description: ${page_desc}
keywords: ${page_keywords}
---

# ${title_zh} ${year}年${month_zh}更新

本月最新${title_zh}整理合集，所有资源免费获取，支持夸克网盘、阿里云盘直链下载。

## 📂 本月资源分类

${sections}

---
"

        # 原文件内容
        original_content=$(cat "$md_file")

        # 如果原文件为空或内容极少（≤3行），添加说明文字
        line_count=$(wc -l < "$md_file")
        if [ "$line_count" -le 3 ] && [ -z "$(echo "$original_content" | tr -d '[:space:]')" ]; then
            original_content="本月资源持续整理中，请关注后续更新。"
        fi

        # 写入新文件
        {
            echo "$frontmatter"
            echo "$original_content"
        } > "$md_file"

        echo "  ✨ 已添加SEO frontmatter: $(basename $md_file) (原${line_count}行)"
        updated_count=$((updated_count + 1))
    done

    echo ""
done

echo "=== SEO增强完成 ==="
echo "  ✅ 更新: ${updated_count} 个文件"
echo "  ⏭️  跳过: ${skipped_count} 个文件（已有frontmatter）"
echo ""
