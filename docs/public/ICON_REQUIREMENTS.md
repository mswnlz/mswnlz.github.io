# 网站图标文件清单

为了让您的网站显示完整的图标，请将以下尺寸的图标文件放置在 `docs/public/` 目录下：

## 必需的图标文件

### 基础 Favicon
- `favicon.ico` (16x16, 32x32, 48x48 多尺寸ICO文件)
- `favicon-16x16.png` (16x16像素)
- `favicon-32x32.png` (32x32像素)

### Apple Touch Icons (iOS设备)
- `apple-touch-icon.png` (180x180像素，默认)
- `apple-touch-icon-152x152.png` (152x152像素)
- `apple-touch-icon-144x144.png` (144x144像素)
- `apple-touch-icon-120x120.png` (120x120像素)
- `apple-touch-icon-114x114.png` (114x114像素)
- `apple-touch-icon-76x76.png` (76x76像素)
- `apple-touch-icon-72x72.png` (72x72像素)
- `apple-touch-icon-60x60.png` (60x60像素)
- `apple-touch-icon-57x57.png` (57x57像素)

### Android Chrome Icons
- `android-chrome-192x192.png` (192x192像素)
- `android-chrome-512x512.png` (512x512像素)

### Windows 磁贴图标
- `mstile-150x150.png` (150x150像素)
- `mstile-144x144.png` (144x144像素)

### 社交媒体分享图片
- `og-image.png` (1200x630像素，用于社交媒体分享预览)

## 图标生成建议

1. **使用在线图标生成器**：
   - https://realfavicongenerator.net/
   - https://www.favicon-generator.org/
   - https://favicon.io/

2. **设计要求**：
   - 使用简洁、识别度高的设计
   - 确保在小尺寸下仍然清晰可见
   - 建议使用与网站主题相关的图标或Logo

3. **文件格式**：
   - PNG格式用于透明背景
   - ICO格式用于favicon.ico（支持多尺寸）
   - 建议优化文件大小以加快加载速度

## 完成后的效果

配置完成后，您的网站将会有：
- ✅ 浏览器标签页图标
- ✅ 收藏夹图标
- ✅ iOS设备主屏幕图标
- ✅ Android设备主屏幕图标
- ✅ Windows开始屏幕磁贴
- ✅ 社交媒体分享缩略图
- ✅ PWA应用图标

## 测试方法

1. 在不同浏览器中打开网站查看标签页图标
2. 将网站添加到手机主屏幕测试移动端图标
3. 在社交媒体平台分享网站链接查看预览图
4. 使用在线工具如 https://realfavicongenerator.net/favicon_checker 检查图标配置

## 当前状态

- ✅ 配置文件已更新
- ❌ 图标文件需要您手动添加
- ✅ 网站清单文件已创建
- ✅ 浏览器配置文件已创建
