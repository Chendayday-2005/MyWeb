document.addEventListener('DOMContentLoaded', function() {
    console.log('智汇学阁 - 现代版已加载');

    // 滚动动画观察者
    const observerOptions = {
        threshold: 0, // 改为 0，只要元素出现就触发，避免大元素无法触发的问题
        rootMargin: "0px 0px -50px 0px"
    };

    // 选取所有需要动画的元素
    const animatedElements = document.querySelectorAll('.card, .page-header, .section-title');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });

    // 导航栏滚动效果 (适配浅色主题)
    function initNavbarEffect() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 隐藏链接 URL (防止状态栏显示)
    function hideLinkUrls() {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.hasAttribute('data-processed')) return;
            
            const url = link.getAttribute('href');
            // 排除锚点链接和 JS 链接
            if (url && !url.startsWith('#') && !url.startsWith('javascript:')) {
                link.setAttribute('data-href', url);
                link.removeAttribute('href'); // 移除 href 属性，防止浏览器状态栏显示 URL
                link.setAttribute('data-processed', 'true');
                link.style.cursor = 'pointer'; // 保持手型光标
                
                link.addEventListener('click', function(e) {
                    const targetUrl = this.getAttribute('data-href');
                    if (targetUrl) {
                        window.location.href = targetUrl;
                    }
                });
            }
        });
    }

    // 初始执行 (针对静态内容)
    hideLinkUrls();

    // 监听组件加载完成事件
    document.addEventListener('componentsLoaded', () => {
        initNavbarEffect();
        hideLinkUrls(); // 针对动态加载的 Header/Footer
        initTheme();    // 初始化主题
        initSearch();   // 初始化搜索
    });

    // --- 新增功能 ---

    // 1. 暗黑模式
    function initTheme() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        
        const iconSun = toggleBtn.querySelector('.icon-sun');
        const iconMoon = toggleBtn.querySelector('.icon-moon');
        
        // 检查本地存储或系统偏好
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            iconSun.style.display = 'none';
            iconMoon.style.display = 'inline';
        }

        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                iconSun.style.display = 'inline';
                iconMoon.style.display = 'none';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                iconSun.style.display = 'none';
                iconMoon.style.display = 'inline';
            }
        });
    }

    // 2. 站内搜索
    function initSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        if (!searchInput || !searchResults) return;

        const root = window.PAGE_CONFIG ? window.PAGE_CONFIG.rootPath : '../';

        // 搜索数据源 (手动维护)！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        const data = [
            { title: "如何开始学习编程", url: "posts/post1.html", desc: "编程入门指南，Python/JS推荐" },
            { title: "生活中的小确幸", url: "posts/post2.html", desc: "发现生活中的美好时刻" },
            { title: "前端开发最佳实践", url: "posts/post3.html", desc: "组件化、性能优化、代码规范" },
            { title: "2024年必读书单", url: "posts/post4.html", desc: "技术、思维与人文社科好书推荐" },
            { title: "设计思维在工作中的应用", url: "posts/post5.html", desc: "共情、定义、构思、原型、测试" },
            { title: "我的2023年度总结", url: "posts/post6.html", desc: "回顾成长，展望未来" },
            { title: "数据集中心", url: "datasets.html", desc: "爬虫练习专用数据集" },
            { title: "全运会游泳数据", url: "datasets/crawler/swimming.html", desc: "第十五届全运会游泳项目排名" },
            { title: "全运会乒乓球数据", url: "datasets/crawler/table_tennis.html", desc: "第十五届全运会乒乓球项目排名" },
            { title: "全运会艺术体操数据", url: "datasets/crawler/rhythmic_gymnastics.html", desc: "第十五届全运会艺术体操项目排名" }
            // ... 添加更多数据
        ];

        const handleSearch = (query) => {
            query = query.toLowerCase().trim();
            if (!query) {
                searchResults.classList.remove('active');
                return;
            }

            const filtered = data.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.desc.toLowerCase().includes(query)
            );

            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(item => `
                    <a href="${root}page/${item.url}" class="search-item">
                        <div class="search-item-title">${item.title}</div>
                    </a>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-item" style="color:var(--text-secondary)">无搜索结果</div>';
                searchResults.classList.add('active');
            }
        };

        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
        
        searchInput.addEventListener('focus', (e) => handleSearch(e.target.value));

        // 点击外部关闭搜索结果
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }
});
