#!/bin/bash

# 脚本：自动同步ResourceTabs配置
# 功能：扫描所有仓库的年月文件，自动更新对应页面的Tab配置
# 作者：AI Assistant
# 日期：2025-08-10

set -e

# 检查是否为自动模式
AUTO_MODE=false
if [ "$1" = "--auto" ]; then
    AUTO_MODE=true
fi

# 配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$ROOT_DIR/docs"

# 内容源目录：优先用环境变量（CI/CD 中传入），否则用 public/ 目录下已有文件推断
# CI: deploy.yml 设置 CONTENT_SOURCE_DIR=./content-source
# 本地: 默认从 docs/public/ 已存在的文件推断（不依赖源仓库路径）
CONTENT_SOURCE_DIR="${CONTENT_SOURCE_DIR:-}"

# 定义仓库列表
REPOSITORIES=(
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

echo "=== 开始同步ResourceTabs配置 ==="
echo ""

# 函数：获取仓库中的年月文件列表
get_month_files() {
    local repo_name=$1

    # 优先级1: CI/CD 中通过 CONTENT_SOURCE_DIR 环境变量指定的源目录
    if [ -n "$CONTENT_SOURCE_DIR" ] && [ -d "$CONTENT_SOURCE_DIR/$repo_name" ]; then
        find "$CONTENT_SOURCE_DIR/$repo_name" -name "20[0-9][0-9][0-1][0-9].md" -exec basename {} .md \; 2>/dev/null | sort -r | tr '\n' ',' | sed 's/,$//'
        return
    fi

    # 优先级2: 本地开发环境 — 源仓库与本脚本所在仓库同级
    local repo_path="$(dirname "$SCRIPT_DIR")/../$repo_name"
    if [ -d "$repo_path" ]; then
        find "$repo_path" -name "20[0-9][0-9][0-1][0-9].md" -exec basename {} .md \; 2>/dev/null | sort -r | tr '\n' ',' | sed 's/,$//'
        return
    fi

    # 优先级3: 回退 — 从 docs/public/{repo}/ 中推断已有的年月文件
    local public_path="$DOCS_DIR/public/$repo_name"
    if [ -d "$public_path" ]; then
        find "$public_path" -name "20[0-9][0-9][0-1][0-9].md" -exec basename {} .md \; 2>/dev/null | sort -r | tr '\n' ',' | sed 's/,$//'
        return
    fi

    echo ""
}

# 函数：更新页面的ResourceTabs配置
update_page_tabs() {
    local repo_name=$1
    local months_list=$2
    local index_file="$DOCS_DIR/$repo_name/index.md"
    
    if [ ! -f "$index_file" ]; then
        echo "  ❌ 页面文件不存在: $index_file"
        return 1
    fi
    
    # 检查是否包含ResourceTabs组件
    if ! grep -q "ResourceTabs" "$index_file"; then
        echo "  ℹ️  页面不使用ResourceTabs组件，跳过"
        return 0
    fi
    
    if [ -z "$months_list" ]; then
        echo "  ⚠️  没有找到年月文件"
        return 0
    fi
    
    # 构建新的months数组
    local months_array="["
    IFS=',' read -ra MONTHS <<< "$months_list"
    for i in "${!MONTHS[@]}"; do
        if [ $i -gt 0 ]; then
            months_array+=", "
        fi
        months_array+="'${MONTHS[i]}'"
    done
    months_array+="]"
    
    # 获取当前配置
    local current_config=$(grep -o "ResourceTabs category=\"[^\"]*\" :months=\"\[[^]]*\]\"" "$index_file" 2>/dev/null || echo "")
    local new_config="ResourceTabs category=\"$repo_name\" :months=\"$months_array\""
    
    if [ "$current_config" = "$new_config" ]; then
        echo "  ✅ Tab配置已是最新: $months_array"
        return 0
    fi
    
    # 更新配置
    local temp_file="$index_file.tmp"
    sed "s|<ResourceTabs category=\"$repo_name\" :months=\"\[[^]]*\]\"|<$new_config|g" "$index_file" > "$temp_file"
    
    if [ $? -eq 0 ]; then
        mv "$temp_file" "$index_file"
        echo "  🔄 已更新Tab配置: $months_array"
        return 2  # 表示有更新
    else
        rm -f "$temp_file"
        echo "  ❌ 更新失败"
        return 1
    fi
}

# 主逻辑
updated_count=0
total_count=0

for repo in "${REPOSITORIES[@]}"; do
    echo "📁 处理仓库: $repo"
    total_count=$((total_count + 1))
    
    # 获取年月文件列表
    months=$(get_month_files "$repo")
    
    if [ -z "$months" ]; then
        echo "  ℹ️  没有找到年月文件"
    else
        echo "  📅 发现年月文件: $months"
    fi
    
    # 更新页面Tab配置
    update_page_tabs "$repo" "$months"
    result=$?
    
    if [ $result -eq 2 ]; then
        updated_count=$((updated_count + 1))
    fi
    
    echo ""
done

echo "=== 同步完成 ==="
echo "📊 统计信息："
echo "  - 总处理仓库数: $total_count"
echo "  - 更新页面数: $updated_count"
echo ""

# 如果有更新，处理提交
if [ $updated_count -gt 0 ]; then
    echo "🎯 发现 $updated_count 个页面需要更新Tab配置"
    echo ""
    
    # 自动模式直接提交，手动模式询问用户
    if [ "$AUTO_MODE" = true ]; then
        echo "🤖 自动模式：直接提交更改"
        should_commit=true
        should_push=true
    else
        read -p "是否提交这些更改到Git? (y/N): " -r
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            should_commit=true
            read -p "是否推送到远程仓库? (y/N): " -r
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                should_push=true
            else
                should_push=false
            fi
        else
            should_commit=false
            should_push=false
        fi
    fi
    
    if [ "$should_commit" = true ]; then
        cd "$ROOT_DIR"
        
        echo "正在提交更改..."
        git add docs/*/index.md
        
        # 生成详细的提交消息
        commit_message="自动同步ResourceTabs配置

更新了 $updated_count 个页面的Tab配置，确保与实际年月文件同步：
"
        
        for repo in "${REPOSITORIES[@]}"; do
            months=$(get_month_files "$repo")
            if [ -n "$months" ]; then
                commit_message="$commit_message
- $repo: [$months]"
            fi
        done
        
        git commit -m "$commit_message"
        
        if [ $? -eq 0 ]; then
            echo "✅ 提交成功"
            
            if [ "$should_push" = true ]; then
                git push origin main
                echo "✅ 推送成功"
            fi
        else
            echo "❌ 提交失败"
        fi
    fi
else
    echo "✅ 所有页面的Tab配置都是最新的，无需更新"
fi

if [ "$AUTO_MODE" != true ]; then
    echo ""
    echo "💡 提示: 您可以将此脚本添加到定期任务中，实现自动同步"
fi
