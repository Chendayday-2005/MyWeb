# 智汇学阁 (MyWeb)

一个使用纯 HTML、CSS 和 JavaScript 构建的现代个人博客与数据集分享网站。

## 项目结构

```
MyWeb/
├── components/        # 公共组件 (Header, Footer)
├── css/               # 样式文件
│   └── style.css      # 全局样式与 CSS 变量
├── images/            # 图片资源
├── js/                # 脚本文件
│   ├── layout.js      # 布局加载与组件化逻辑
│   └── main.js        # 页面交互与动画逻辑
├── page/              # 页面文件
│   ├── datasets/      # 数据集详情页
│   │   └── crawler/   # 爬虫练习数据集
│   ├── error/         # 错误页面
│   │   ├── 404.html   # 404 Not Found
│   │   └── 50x.html   # 500/502/503 Server Error
│   ├── posts/         # 博客文章
│   │   ├── post1.html # 如何开始学习编程
│   │   ├── ...        # 其他文章
│   │   └── post6.html # 我的2023年度总结
│   ├── about.html     # 关于页面
│   ├── datasets.html  # 数据集中心
│   ├── index.html     # 首页（博客列表）
│   └── resources.html # 资源分享页
└── README.md          # 项目说明文件
```

## 功能特点

- **组件化开发**：使用原生 JavaScript 实现 Header 和 Footer 的动态加载，易于维护。
- **响应式设计**：适配桌面端和移动端，提供流畅的阅读体验。
- **现代 UI**：采用磨砂玻璃效果、卡片式布局和优雅的过渡动画。
- **数据集中心**：提供结构化的体育赛事数据（如全运会游泳、乒乓球等），供爬虫练习使用。
- **无依赖**：无需构建工具，无需后端服务器，即开即用。

## 使用方法

1. **启动**：直接在浏览器中打开 `page/index.html` 即可访问网站首页。
   > 注意：由于使用了 `fetch` API 加载组件，建议通过本地服务器（如 VS Code 的 Live Server 插件）运行，以避免浏览器的跨域限制 (CORS)。
2. **部署**：将整个项目文件夹上传至任何静态网页托管服务（如 GitHub Pages, Vercel, Netlify）即可。

## 自定义指南

### 修改内容
- **首页文章**：编辑 `page/index.html` 中的 `.grid-layout` 部分。
- **文章内容**：在 `page/posts/` 目录下修改或添加 HTML 文件。
- **导航栏/页脚**：修改 `components/header.html` 或 `components/footer.html`，所有页面会自动更新。

### 修改样式
- 编辑 `css/style.css`。
- 可以在 `:root` 选择器中快速修改全局主题色（`--primary-color` 等）。

### 添加新页面
1. 在 `page/` 目录下创建新的 HTML 文件。
2. 引入 `layout.js` 和 `style.css`。
3. 配置 `window.PAGE_CONFIG` 以确保路径正确：
   ```html
   <script>
       window.PAGE_CONFIG = {
           rootPath: '../', // 根据文件层级调整
           activePage: 'your-page-id'
       };
   </script>
   ```

## 技术栈

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- JavaScript (ES6+, Fetch API, IntersectionObserver)

## 许可证

本项目采用 MIT 许可证。

