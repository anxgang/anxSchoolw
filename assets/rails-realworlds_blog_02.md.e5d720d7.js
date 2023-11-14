import{_ as s,o as a,c as l,Q as o}from"./chunks/framework.1baa841b.js";const n="/assets/rails_routes.drawio.ff68f7f1.png",b=JSON.parse('{"title":"Blog 實戰 - 02. 程式執行路線","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"rails-realworlds/blog/02.md","filePath":"rails-realworlds/blog/02.md"}'),e={name:"rails-realworlds/blog/02.md"},p=o('<h1 id="blog-實戰-02-程式執行路線" tabindex="-1">Blog 實戰 - 02. 程式執行路線 <a class="header-anchor" href="#blog-實戰-02-程式執行路線" aria-label="Permalink to &quot;Blog 實戰 - 02. 程式執行路線&quot;">​</a></h1><p>我們從上一節的<a href="./01.html#功能清單">功能清單</a>中，</p><p>可以看出這個專案的目標是開發一個有前後台的 blog，</p><p>前台可以看文章，而後台要有帳號登入和編輯文章的功能。</p><h2 id="建立專案" tabindex="-1">建立專案 <a class="header-anchor" href="#建立專案" aria-label="Permalink to &quot;建立專案&quot;">​</a></h2><p>我們先建立一個 blog 專案</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rails new blog</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rails new blog</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">提示</p><p>需要先安裝 rails 環境，可以參考 <a href="./../../rails-guides/#1-安裝環境">RailsGuides-1. 安裝環境</a></p></div><h2 id="開始實作" tabindex="-1">開始實作 <a class="header-anchor" href="#開始實作" aria-label="Permalink to &quot;開始實作&quot;">​</a></h2><p>我們從功能清單第一項開始開發</p><blockquote><ul><li>前台 <ul><li>訪客可以瀏覽文章清單(index)</li></ul></li></ul></blockquote><p>這邊可以順著程式執行的路線去開發，也就是 <code>Route</code> -&gt; <code>Controller</code> -&gt; <code>Model</code> -&gt; <code>View</code></p><p><img src="'+n+`" alt="rails routes"></p><p>從上圖來看，從瀏覽器(browser)送出網址到接收到網頁，其實是逆時針走一圈回來</p><h3 id="route" tabindex="-1">Route <a class="header-anchor" href="#route" aria-label="Permalink to &quot;Route&quot;">​</a></h3><p>從 Route 開始，我們先建立瀏覽文章清單(index)的 route</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># config/routes.rb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 前台 </span></span>
<span class="line"><span style="color:#E1E4E8;">resources </span><span style="color:#79B8FF;">:post</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">only:</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">:index</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 指定首頁</span></span>
<span class="line"><span style="color:#E1E4E8;">root </span><span style="color:#9ECBFF;">&quot;posts#index&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># config/routes.rb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 前台 </span></span>
<span class="line"><span style="color:#24292E;">resources </span><span style="color:#005CC5;">:post</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">only:</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">:index</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 指定首頁</span></span>
<span class="line"><span style="color:#24292E;">root </span><span style="color:#032F62;">&quot;posts#index&quot;</span></span></code></pre></div><p>其實我們已經可以打開網頁，看看是不是正確地按照我們設定 route 去跑了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rails s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rails s</span></span></code></pre></div><p>前往 <code>http://localhost:3000</code> 會發現出現 Routing Error</p><div class="danger custom-block"><p class="custom-block-title">Routing Error</p><p>uninitialized constant PostsController</p></div><p>其實不是 route 設定錯誤，而是他沒有找到路由指定到達的 PostsController</p><p>所以我們按他的要求建立 PostsController</p><h3 id="controller" tabindex="-1">Controller <a class="header-anchor" href="#controller" aria-label="Permalink to &quot;Controller&quot;">​</a></h3><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># app/controller/posts_controller.rb</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PostsController</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ApplicationController</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># app/controller/posts_controller.rb</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PostsController</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ApplicationController</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>再次前往 <code>http://localhost:3000</code> 會發現錯誤訊息變成 Unknown action</p><div class="danger custom-block"><p class="custom-block-title">Unknown action</p><p>The action &#39;index&#39; could not be found for PostsController</p></div><p>於是按照他的說明，我們補上 action</p><h3 id="action" tabindex="-1">Action <a class="header-anchor" href="#action" aria-label="Permalink to &quot;Action&quot;">​</a></h3><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># app/controller/posts_controller.rb</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PostController</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">end</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># app/controller/posts_controller.rb</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PostController</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">end</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>再次前往 <code>http://localhost:3000</code> 會發現錯誤訊息變成 No view template for interactive request</p><div class="danger custom-block"><p class="custom-block-title">No view template for interactive request</p><p>PostsController#index is missing a template for request formats: text/html</p></div><p>因此我們知道，目前已經走到最後的 View 這邊了，我們再相應的位置補上頁面即可</p><h3 id="view" tabindex="-1">View <a class="header-anchor" href="#view" aria-label="Permalink to &quot;View&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- app/view/posts/index.html.erb --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;Posts&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- app/view/posts/index.html.erb --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;Posts&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>再次前往 <code>http://localhost:3000</code> 這時候網頁應該可以正確顯示了</p><p>到這邊我們已經把 Post 的整個從 route 到 view 的流路走過，確保網頁能顯示了</p><p>接下來下一節來實作功能吧</p>`,38),t=[p];function c(r,i,d,h,y,u){return a(),l("div",null,t)}const E=s(e,[["render",c]]);export{b as __pageData,E as default};