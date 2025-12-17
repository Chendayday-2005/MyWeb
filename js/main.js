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
                // 滚动时：增加一点阴影，背景保持磨砂白
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                // 顶部时：背景稍微透明一点，阴影减弱
                navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
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
    });
});
