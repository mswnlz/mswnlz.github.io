#!/bin/bash

# 脚本：触发网站更新
# 用法：当资源仓库更新后，运行此脚本来触发网站重新构建

echo "正在触发网站更新..."

# 方法1：使用GitHub CLI触发workflow（需要先安装gh cli并登录）
if command -v gh &> /dev/null; then
    echo "使用GitHub CLI触发workflow..."
    gh workflow run deploy.yml
    if [ $? -eq 0 ]; then
        echo "✅ 成功触发网站更新！"
        echo "📍 查看构建状态：https://github.com/mswnlz/mswnlz.github.io/actions"
        echo "⏱️  大约3-5分钟后网站将更新完成"
    else
        echo "❌ 触发失败，请检查GitHub CLI配置"
    fi
else
    echo "⚠️  GitHub CLI未安装"
    echo "请手动触发："
    echo "1. 访问：https://github.com/mswnlz/mswnlz.github.io/actions"
    echo "2. 点击 'Deploy VitePress site to GitHub Pages'"
    echo "3. 点击 'Run workflow' 按钮"
fi

echo ""
echo "💡 提示："
echo "- 网站现在每天早上8点会自动检查更新"
echo "- 你也可以随时手动触发更新"
echo "- 如需帮助，请查看README.md"