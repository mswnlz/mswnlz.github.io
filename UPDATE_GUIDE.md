# 资源网站更新指南

## 🔄 当前的更新流程

### 问题现状
当你的资源仓库（如 AIknowledge、book、tools 等）更新后，网站不会自动同步更新。

### 解决方案

#### 方法一：手动触发（推荐）
1. 访问：https://github.com/mswnlz/mswnlz.github.io/actions
2. 点击左侧的 "Deploy VitePress site to GitHub Pages"
3. 点击右侧的 "Run workflow" → "Run workflow"
4. 等待 3-5 分钟，网站会自动获取最新 commit 信息并重新部署

#### 方法二：使用脚本触发
```bash
# 在本地运行（需要安装 GitHub CLI）
./trigger-update.sh
```

#### 方法三：简单推送触发
在网站仓库做任意修改并推送到 main 分支

## 🤖 自动化机制

现在系统包含以下自动化功能：

### 1. 定时更新
- **每天早上 8:00**（北京时间）自动检查并更新网站
- 会获取所有资源仓库的最新 commit 信息
- 无需手动干预

### 2. 手动触发
- GitHub Actions 页面的 "Run workflow" 按钮
- `trigger-update.sh` 脚本

### 3. API 触发
- 支持 `repository_dispatch` 事件
- 可以从其他仓库或外部系统触发更新

## 🎯 更新组件说明

网站首页的"最新动态"组件会显示：
- 各资源仓库的最新提交信息
- 中文仓库名称显示
- 滚动展示最新更新内容
- 点击可跳转到对应资源页面

## 📋 完整工作流程

1. **你更新资源仓库**（如在 book 仓库添加新书籍）
2. **触发网站更新**（使用上述任一方法）
3. **系统自动执行**：
   - 获取所有仓库最新 commit 信息
   - 更新 commits.json 文件
   - 重新构建网站
   - 部署到 GitHub Pages
4. **结果**：
   - 网站首页显示最新动态
   - 更新组件显示新的提交信息
   - 访问者可以看到最新更新

## 🛠️ 技术细节

- **fetch-commits.js**：通过 GitHub API 获取各仓库最新 commit
- **CommitHistory.vue**：首页更新组件，显示最新动态
- **GitHub Actions**：自动化构建和部署流程
- **VitePress**：静态站点生成器

## 💡 建议

为了最佳体验：
1. 资源仓库更新后，立即手动触发一次网站更新
2. 依赖每日自动更新作为备选机制
3. 重要更新后检查网站是否正确显示

## 🆘 故障排除

如果更新组件不显示：
1. 检查 GitHub Actions 是否成功运行
2. 确认 commits.json 文件已正确生成
3. 清除浏览器缓存重新访问网站
4. 查看控制台是否有 JavaScript 错误