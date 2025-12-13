# jacob.github.io
Jacob personal website （test）

## Index.html
极简博客首页
### notice
1. 图片/图标“盗链” (Hotlinking)
- 最好使用本地图片，不推荐使用外链链接（logo/icon--->SVG ）
**建议使用SVG代码（极简建议使用）嵌入到HTML中，或者使用轻量级图标库**
2. 

### 文件头部head-meta

## post blogs
### 怎么实现发博客？
保留手写代码现有架构，，**通过js动态获取MarkDown文件实现**
#### 核心逻辑
1....

代码实现
1.在index首页嵌入js文件库
```js
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

```

2.在static下创建posts文件夹
3.创建post.json文件(用于管理blogs的索引/目录,用于存储博客的元数据)

```json
[
    {
        "id": "post1", 
        "title": "Post 1", 
        "date": "2025-11-28",
        "summary": "Post 1 summary",
        "category": "Category 1", 
        "file":"post1.md"
    },
    {
        "id": "post2", 
        "title": "Post 2", 
        "date": "2025-11-28", 
        "summary": "Post 2 summary",
        "category": "Category 2", 
        "file":"post2.md"
    }
]
```

4.创建post*.md文件(用于存储博客内容)
5.在main.js实现该功能,修改js原有代码

```js
// 1. 获取文章列表
fetch('static/posts/post.json')
    .then(response => response.json())
    .then(posts => {
        const listContainer = document.getElementById('post-list');
        listContainer.innerHTML = '';
        
        posts.forEach(post => {
            // 生成列表 DOM (和你现在的代码一样)
            // ...
        });
    });

// 2. 点击文章时加载 Markdown 并渲染
function loadPost(filename) {
    fetch(`static/posts/${filename}`)
        .then(res => res.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown); // 转换 MD 为 HTML
            document.getElementById('article-content').innerHTML = htmlContent;
        });
}
```

6. 修改/添加md的js库到index.html中
引入 Markdown 解析库，并添加一个“文章详情页”的容器（默认隐藏）。
在` <head>` 或` <body> `结束前引入解析库：
<!-- 在 main.js 之前引入 marked.js -->
`<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>`
7. 在index.html,
在 `<main id="blog-posts-container"> `后面，添加一个文章详情容器：
```html
<div id="article-content" style="display: none;">
    <!-- 原有的列表容器 -->
<main id="blog-posts-container">
   <!-- ...这里保持原样... -->
</main>

<!-- 新增：文章详情容器 (默认隐藏) -->
<article id="article-container" style="display: none; margin-bottom: 80px;">
    <button id="back-to-list-btn" class="nav-link" style="border:none; background:none; cursor:pointer; padding:0; margin-bottom:20px; font-size:1rem;">
        ← Back to list
    </button>
    <!-- 文章内容将渲染在这里 -->
    <div id="article-content" class="markdown-body"></div>
</article>
</div>
```

8.重写main.js
删除原文件里 // 2. 模拟博客文章数据 和 // 3. 渲染文章列表 的那部分硬编码代码，替换为下面的逻辑。
新版 main.js（包含了年份、Contact、以及新的文章加载逻辑）：

## hja
```js
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Footer 年份更新 ---
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. 动态加载文章系统 (Markdown版) ---
    const postListContainer = document.getElementById('post-list'); // 列表容器
    const heroSection = document.getElementById('hero-section');     // 头部介绍
    const blogContainer = document.getElementById('blog-posts-container'); // 列表大容器
    const articleContainer = document.getElementById('article-container'); // 文章详情容器
    const articleContent = document.getElementById('article-content');     // 文章内容区域
    const backBtn = document.getElementById('back-to-list-btn');           // 返回按钮

    // A. 从 JSON 获取文章列表
    if (postListContainer) {
        fetch('./static/posts/index.json')
            .then(response => {
                if (!response.ok) throw new Error("无法加载文章列表");
                return response.json();
            })
            .then(posts => {
                renderPostList(posts);
            })
            .catch(error => {
                console.error(error);
                postListContainer.innerHTML = '<p>Error loading posts.</p>';
            });
    }

    // B. 渲染列表函数
    function renderPostList(posts) {
        postListContainer.innerHTML = ''; // 清空 Loading

        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post-card';
            // 注意：这里给标题加了点击事件，而不是 href跳转
            article.innerHTML = `
                <h3 class="post-title">
                    <a href="javascript:void(0)" class="post-link" data-file="${post.filename}">${post.title}</a>
                </h3>
                <div class="post-meta">
                    <span>${post.date}</span> • 
                    <span style="color: var(--primary-color)">${post.category}</span>
                </div>
                <p class="post-summary">${post.summary}</p>
            `;
            postListContainer.appendChild(article);
        });

        // 绑定点击事件
        document.querySelectorAll('.post-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const filename = e.target.getAttribute('data-file');
                loadMarkdownPost(filename);
            });
        });
    }

    // C. 加载 Markdown 并渲染
    function loadMarkdownPost(filename) {
        // 1. 显示 Loading (可选)
        articleContent.innerHTML = '<p>Loading article...</p>';

        // 2. 切换视图：隐藏 Hero 和 列表，显示文章详情
        heroSection.style.display = 'none';
        blogContainer.style.display = 'none';
        articleContainer.style.display = 'block';
        
        // 3. 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 4. 请求 Markdown 文件
        fetch(`./static/posts/${filename}`)
            .then(res => {
                if (!res.ok) throw new Error("文章文件不存在");
                return res.text();
            })
            .then(markdown => {
                // 使用 marked 库解析 markdown 为 html
                articleContent.innerHTML = marked.parse(markdown);
            })
            .catch(err => {
                articleContent.innerHTML = '<p>Sorry, content not found.</p>';
            });
    }

    // D. 返回列表按钮逻辑
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // 切换回列表视图
            articleContainer.style.display = 'none';
            heroSection.style.display = 'block'; // 或者 'flex' 取决于你的css，block通常没问题
            blogContainer.style.display = 'block';
        });
    }


    // --- 3. Contact 表单逻辑 (保持不变) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            setTimeout(() => {
                alert('Thank you! Your message has been sent (Simulated).');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // --- 4. Back to Top 按钮 (保持不变) ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
```
