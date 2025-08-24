# Warp AI 优化配置

## 项目简介
这是一个GitHub Pages静态网站项目，使用VitePress构建，展示各个资源仓库的内容。

## 常用命令
```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建网站
npm run build

# 预览构建结果
npm run preview

# 部署到GitHub Pages
git add docs/.vitepress/dist && git commit -m "Update build" && git push
```

## Git 工作流
```bash
# 更新内容后重新构建
npm run build
git add .
git commit -m "Update website content and build"
git push origin main
```

## 项目结构
```
mswnlz.github.io/
├── docs/                  # VitePress文档目录
│   ├── .vitepress/       # VitePress配置
│   │   ├── config.ts     # 网站配置
│   │   └── dist/         # 构建输出
│   ├── public/           # 静态资源
│   └── *.md              # 文档页面
├── package.json          # 项目配置
└── WARP.md              # 本配置文件
```

## 网站维护
- 定期更新各资源仓库的内容链接
- 保持构建产物与源码同步
- 确保网站在GitHub Pages上正常显示
