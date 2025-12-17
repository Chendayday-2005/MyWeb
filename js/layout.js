/**
 * 布局加载脚本
 * 使用 fetch 动态加载 HTML 组件 (header.html, footer.html)
 * 解决了页脚定位问题，并保持代码维护性
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取配置
    const config = window.PAGE_CONFIG || { rootPath: '', activePage: '' };
    const root = config.rootPath;

    // 加载组件函数
    async function loadComponent(url, placeholderId) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            let html = await response.text();
            
            // 替换路径占位符
            html = html.replace(/{root}/g, root);
            
            // 插入 HTML 到指定占位符
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = html;
                // 移除占位符的 id，避免样式冲突或重复操作，或者保留作为容器
                // 这里我们保留它，因为它可能用于定位
            } else {
                console.warn(`Placeholder #${placeholderId} not found.`);
            }
            
            return true;
        } catch (error) {
            console.error('Component load error:', error);
            return false;
        }
    }

    // 并行加载 Header 和 Footer
    Promise.all([
        loadComponent(root + 'components/header.html', 'header-placeholder'),
        loadComponent(root + 'components/footer.html', 'footer-placeholder')
    ]).then(() => {
        // 组件加载完成后，设置激活状态
        if (config.activePage) {
            const activeLink = document.querySelector(`.nav-links a[data-page="${config.activePage}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
        
        // 触发自定义事件，通知 main.js 组件已加载
        document.dispatchEvent(new Event('componentsLoaded'));

        // 重新初始化可能依赖 DOM 的脚本 (如 main.js 中的导航栏滚动效果)
        // 如果 main.js 已经运行，可能需要手动触发一次 scroll 事件来更新导航栏状态
        window.dispatchEvent(new Event('scroll'));
    });
});
