import{_ as l,o as s,c as e,Q as a}from"./chunks/framework.1baa841b.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"rails-realworlds/blog/temp.md","filePath":"rails-realworlds/blog/temp.md"}'),n={name:"rails-realworlds/blog/temp.md"},o=a(`<h2 id="系統分析" tabindex="-1">系統分析 <a class="header-anchor" href="#系統分析" aria-label="Permalink to &quot;系統分析&quot;">​</a></h2><ul><li>Route <ul><li>有分前後台 <ul><li>後台 多一個 namespace: admin</li><li>前台 不需要 namespace</li></ul></li></ul></li><li>Model <ul><li>雖然有分前後台，但是都是共用 model，不掛 namespace <ul><li>User</li><li>Post</li></ul></li></ul></li><li>Controller <ul><li>前後分離，後台多 admin 的 namespace <ul><li>Admin::PostsController &lt; ApplicationController</li><li>PostsController &lt; ApplicationController</li></ul></li></ul></li><li>View <ul><li>有分前後台 <ul><li>layout 需要分開處理 <ul><li>layout/admin.html.erb</li><li>layout/application.html.erb</li></ul></li></ul></li></ul></li><li>Schema <ul><li>資料表和 Model 是對應關係，欄位先簡單開 <ul><li>uesrs <ul><li>用 devise 預設就好</li></ul></li><li>posts <ul><li>title</li><li>content</li></ul></li></ul></li></ul></li></ul><p>大概釐清了 Route / Model / Controller / View / Schema 之後我們就可以開始著手開發程式</p><div class="tip custom-block"><p class="custom-block-title">提示</p><p>目前建立的 route 和 MVC 都有其固定的放置位置，</p><p>單複數也是有其規定，除了 model 是單數外，其餘都用複數來命名</p><div class="language-tree vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tree</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├── app</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── controllers</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   └── posts_controller.rb</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── models</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   └── post.rb</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── views</span></span>
<span class="line"><span style="color:#e1e4e8;">│       └── posts</span></span>
<span class="line"><span style="color:#e1e4e8;">│           └── index.html.erb</span></span>
<span class="line"><span style="color:#e1e4e8;">└── config</span></span>
<span class="line"><span style="color:#e1e4e8;">    └── routes.rb</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├── app</span></span>
<span class="line"><span style="color:#24292e;">│   ├── controllers</span></span>
<span class="line"><span style="color:#24292e;">│   │   └── posts_controller.rb</span></span>
<span class="line"><span style="color:#24292e;">│   ├── models</span></span>
<span class="line"><span style="color:#24292e;">│   │   └── post.rb</span></span>
<span class="line"><span style="color:#24292e;">│   └── views</span></span>
<span class="line"><span style="color:#24292e;">│       └── posts</span></span>
<span class="line"><span style="color:#24292e;">│           └── index.html.erb</span></span>
<span class="line"><span style="color:#24292e;">└── config</span></span>
<span class="line"><span style="color:#24292e;">    └── routes.rb</span></span></code></pre></div></div>`,4),p=[o];function i(t,r,c,u,d,m){return s(),e("div",null,p)}const h=l(n,[["render",i]]);export{y as __pageData,h as default};
