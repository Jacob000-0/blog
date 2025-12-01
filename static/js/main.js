document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 自动更新 Footer 年份
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. 模拟博客文章数据
    const posts = [
        {
            title: "Analysis of Smart Grid Stability",
            date: "2025-05-12",
            category: "Research",
            summary: "Exploring the impact of renewable energy integration on grid frequency stability..."
        },
        {
            title: "My Workflow with Python & MATLAB",
            date: "2025-04-28",
            category: "Coding",
            summary: "How I set up my development environment for power system simulations."
        },
        {
            title: "Reflections on Year 2024",
            date: "2025-01-01",
            category: "Life",
            summary: "A summary of what I learned and achieved in the past year as a researcher."
        }
    ];

    // 3. 渲染文章列表
    const postListContainer = document.getElementById('post-list');

    if (postListContainer) {
        // 清空 Loading 文字
        postListContainer.innerHTML = '';

        posts.forEach(post => {
            // 创建 article 元素
            const article = document.createElement('article');
            article.className = 'post-card';

            // 填充内容
            article.innerHTML = `
                <h3 class="post-title">
                    <a href="#">${post.title}</a>
                </h3>
                <div class="post-meta">
                    <span>📅 ${post.date}</span> | 
                    <span>🏷️ ${post.category}</span>
                </div>
                <p class="post-summary">${post.summary}</p>
            `;

            // 添加到容器
            postListContainer.appendChild(article);
        });
    }
});

// 
// ... 之前的代码 (年份更新、文章列表) ...

    // 4. 处理 Contact 表单提交 (模拟)
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 阻止浏览器默认的刷新跳转
            
            // 获取按钮引用，以此改变它的文字
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            
            // 模拟发送状态
            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // 模拟网络延迟 1.5秒
            setTimeout(() => {
                alert('Thank you! Your message has been sent (Simulated).');
                
                // 重置表单和按钮
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 1500);
        });
    }


// 5. 实现返回顶部按钮功能
document.addEventListener('DOMContentLoaded', () => {
// 5. Back to Top 按钮逻辑
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // 监听滚动事件
        window.addEventListener('scroll', () => {
            // window.scrollY 获取当前垂直滚动的距离
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // 监听点击事件，平滑回到顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // 这是关键，让滚动变丝滑
            });
        });
    }

});