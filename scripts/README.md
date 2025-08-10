# 网站更新脚本说明

本目录包含用于自动化网站更新和维护的脚本。

## 📋 脚本列表

### 1. `sync-tabs.sh` - 自动同步ResourceTabs配置

**功能：**
- 扫描所有资源仓库，检测年月文件（如 `202508.md`, `202507.md` 等）
- 自动更新网站页面中的ResourceTabs组件配置
- 确保Tab配置与实际存在的年月文件保持同步

**用法：**
```bash
# 交互模式（会询问是否提交）
bash scripts/sync-tabs.sh

# 自动模式（直接提交，用于自动化流程）
bash scripts/sync-tabs.sh --auto
```

**支持的仓库：**
- AIknowledge
- book
- chinese-traditional
- cross-border
- curriculum
- edu-knowlege
- healthy
- movies
- self-media
- tools

### 2. `update-time.sh` - 更新时间戳

**功能：**
- 更新网站的最后更新时间戳

**用法：**
```bash
bash scripts/update-time.sh
```

## 🚀 主更新脚本

### `../trigger-update.sh` - 完整网站更新流程

**功能：**
1. 自动检查并同步ResourceTabs配置
2. 触发GitHub Pages重新构建

**用法：**
```bash
bash trigger-update.sh
```

**工作流程：**
1. 运行 `sync-tabs.sh --auto` 检查Tab配置
2. 如有更新，自动提交到Git
3. 触发GitHub Pages重新部署
4. 3-5分钟后网站生效

## 📁 文件结构

```
scripts/
├── README.md           # 本说明文件
├── sync-tabs.sh       # Tab同步脚本
└── update-time.sh     # 时间更新脚本

../
├── trigger-update.sh  # 主更新脚本
└── copy_content.sh    # 内容复制脚本
```

## 🔄 自动化工作流程

当资源仓库添加新的年月文件时，推荐的操作流程：

1. **添加资源到仓库：**
   ```bash
   # 在对应仓库中添加新的月份文件，如 202509.md
   echo "新资源内容" > 202509.md
   git add 202509.md
   git commit -m "添加202509资源"
   git push origin main
   ```

2. **更新网站：**
   ```bash
   # 运行更新脚本，会自动检测新文件并更新Tab配置
   bash trigger-update.sh
   ```

3. **脚本会自动：**
   - 检测到新的202509.md文件
   - 更新对应页面的ResourceTabs配置
   - 提交更改到mswnlz.github.io仓库
   - 触发网站重新构建
   - 新的Tab会在3-5分钟后出现在网站上

## 🎯 关键特性

### 自动检测
- 脚本会自动扫描所有仓库目录
- 只识别符合年月格式的文件（YYYYMM.md）
- 按时间倒序排列Tab（最新月份在前）

### 智能更新
- 只更新实际需要更新的页面
- 跳过不使用ResourceTabs的页面
- 保持现有配置不变（如果已经是最新的）

### 安全操作
- 更新前会备份原文件
- 使用临时文件避免数据丢失
- 详细的日志输出便于调试

## ⚙️ 配置说明

如需添加新的仓库到同步列表，编辑 `sync-tabs.sh` 中的 `REPOSITORIES` 数组：

```bash
REPOSITORIES=(
  "AIknowledge"
  "book"
  "your-new-repo"  # 添加新仓库
  # ... 其他仓库
)
```

## 📊 输出示例

```bash
$ bash scripts/sync-tabs.sh --auto

=== 开始同步ResourceTabs配置 ===

📁 处理仓库: movies
  📅 发现年月文件: 202509,202508,202507,202506,202505
  🔄 已更新Tab配置: ['202509', '202508', '202507', '202506', '202505']

📁 处理仓库: book
  📅 发现年月文件: 202508,202507,202506,202505
  ✅ Tab配置已是最新: ['202508', '202507', '202506', '202505']

=== 同步完成 ===
📊 统计信息：
  - 总处理仓库数: 10
  - 更新页面数: 1

🤖 自动模式：直接提交更改
正在提交更改...
✅ 提交成功
✅ 推送成功
```

## 🛠️ 故障排除

### 常见问题

1. **脚本提示"页面文件不存在"**
   - 确保对应的 `docs/{repo}/index.md` 文件存在
   - 检查仓库名称是否正确

2. **Tab配置未生效**
   - 确保页面使用了ResourceTabs组件
   - 检查网站是否完成重新构建（等待3-5分钟）

3. **权限错误**
   - 确保脚本有执行权限：`chmod +x scripts/*.sh`
   - 确保有Git推送权限

### 调试模式

如需查看详细调试信息，可以在脚本开头添加：
```bash
set -x  # 启用调试输出
```

## 📞 支持

如有问题或建议，请：
1. 检查日志输出
2. 确认文件路径和权限
3. 查看Git状态和提交历史
4. 联系维护人员
