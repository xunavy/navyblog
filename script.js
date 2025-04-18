// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏激活状态管理
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 滚动事件监听，用于导航高亮
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 为导航链接添加平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // 只处理页内链接（以#开头的链接）
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 添加元素进入视图时的动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-item, .expertise-item, .tech-item, .about-text');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // 元素在视图中的可见高度
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    // 添加动画CSS类
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        .skill-item, .expertise-item, .tech-item, .about-text {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `, styleSheet.cssRules.length);
    
    styleSheet.insertRule(`
        .skill-item.animate, .expertise-item.animate, .tech-item.animate, .about-text.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `, styleSheet.cssRules.length);
    
    // 初始调用一次动画检测
    animateOnScroll();
    
    // 滚动时检测元素并添加动画
    window.addEventListener('scroll', animateOnScroll);
    
    // 为联系方式中的社交媒体图标添加悬停效果
    const socialLinks = document.querySelectorAll('.social-links a, .contact-social a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 添加技术前沿卡片的交互效果
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--card-bg)';
        });
    });
}); 