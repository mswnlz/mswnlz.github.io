#!/bin/bash

# 脚本：批量优化卡片页面内容
# 功能：
# 1. 去除多语言链接
# 2. 将GitHub链接替换为网站内部链接
# 作者：AI Assistant
# 日期：2025-08-12

set -e

# 配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$ROOT_DIR/docs"

# 定义需要处理的页面列表
PAGES=(
  "AIknowledge"
  "book"
  "chinese-traditional"
  "cross-border"
  "curriculum"
  "edu-knowlege"
  "healthy"
  "movies"
  "self-media"
  "tools"
)

# GitHub到网站链接的映射关系
declare -A LINK_MAPPING
LINK_MAPPING["https://github.com/mswnlz/chinese-traditional"]="/chinese-traditional/"
LINK_MAPPING["https://github.com/mswnlz/tools"]="/tools/"
LINK_MAPPING["https://github.com/mswnlz/cross-border"]="/cross-border/"
LINK_MAPPING["https://github.com/mswnlz/self-media"]="/self-media/"
LINK_MAPPING["https://github.com/mswnlz/edu-knowlege"]="/edu-knowlege/"
LINK_MAPPING["https://github.com/mswnlz/AIknowledge"]="/AIknowledge/"
LINK_MAPPING["https://github.com/mswnlz/curriculum"]="/curriculum/"
LINK_MAPPING["https://github.com/mswnlz/movies"]="/movies/"
LINK_MAPPING["https://github.com/mswnlz/book"]="/book/"
LINK_MAPPING["https://github.com/mswnlz/healthy"]="/healthy/"
LINK_MAPPING["https://github.com/mswnlz"]="/"

echo "🚀 开始批量优化卡片页面..."
echo ""

# 处理每个页面
for PAGE in "${PAGES[@]}"; do
    INDEX_FILE="$DOCS_DIR/$PAGE/index.md"
    
    if [ ! -f "$INDEX_FILE" ]; then
        echo "❌ 页面文件不存在: $INDEX_FILE"
        continue
    fi
    
    echo "📄 处理页面: $PAGE"
    
    # 创建备份
    cp "$INDEX_FILE" "$INDEX_FILE.backup"
    
    # 临时文件
    TEMP_FILE="$INDEX_FILE.tmp"
    
    # 第1步：去除多语言链接行
    echo "  🗑️  去除多语言链接..."
    grep -v "openaitx.github.io/view.html" "$INDEX_FILE" > "$TEMP_FILE"
    
    # 第2步：替换GitHub链接为网站内部链接
    echo "  🔗 更新资源链接..."
    for GITHUB_URL in "${!LINK_MAPPING[@]}"; do
        WEBSITE_URL="${LINK_MAPPING[$GITHUB_URL]}"
        # 使用更精确的替换，避免重复替换
        sed -i.bak "s|\]($GITHUB_URL)|](${WEBSITE_URL})|g" "$TEMP_FILE"
        rm -f "$TEMP_FILE.bak"
    done
    
    # 第3步：清理多余的空行和分隔线
    echo "  🧹 清理格式..."
    # 移除连续的空行，只保留一个
    sed '/^$/N;/^\n$/d' "$TEMP_FILE" > "$TEMP_FILE.clean"
    mv "$TEMP_FILE.clean" "$TEMP_FILE"
    
    # 检查是否有变化
    if ! cmp -s "$INDEX_FILE" "$TEMP_FILE"; then
        mv "$TEMP_FILE" "$INDEX_FILE"
        echo "  ✅ 页面已更新"
    else
        rm -f "$TEMP_FILE"
        echo "  ℹ️  页面无需更新"
    fi
    
    echo ""
done

echo "🎉 批量优化完成！"
echo ""
echo "📊 处理统计："
echo "  - 处理页面数: ${#PAGES[@]}"
echo "  - 主要优化:"
echo "    ✓ 去除多语言链接"
echo "    ✓ GitHub链接 → 网站内部链接"
echo "    ✓ 清理格式"
echo ""
echo "💾 提示: 原文件已备份为 *.backup"
