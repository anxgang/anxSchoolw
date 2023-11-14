import{_ as s,o as l,c as a,Q as n}from"./chunks/framework.1baa841b.js";const h=JSON.parse('{"title":"Blog 實戰 - 04. 控制器和視圖","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"rails-realworlds/blog/04.md","filePath":"rails-realworlds/blog/04.md"}'),o={name:"rails-realworlds/blog/04.md"},p=n(`<h1 id="blog-實戰-04-控制器和視圖" tabindex="-1">Blog 實戰 - 04. 控制器和視圖 <a class="header-anchor" href="#blog-實戰-04-控制器和視圖" aria-label="Permalink to &quot;Blog 實戰 - 04. 控制器和視圖&quot;">​</a></h1><p>繼上一節我們成功建立的 model Post 並且塞入資料之後，</p><p>我們還沒有把資料取出來顯示在網頁上</p><p>該怎麼辦呢？讓我們繼續看下去</p><h2 id="controller" tabindex="-1">controller <a class="header-anchor" href="#controller" aria-label="Permalink to &quot;controller&quot;">​</a></h2><p>終於又回到我們功能清單第一項</p><blockquote><ul><li>前台 <ul><li>訪客可以瀏覽文章清單(index)</li></ul></li></ul></blockquote><p>現在我們該把資料從資料庫抓出來了</p><p>我們回到之前寫好的 post_controller.rb 中的 index 這個 action</p><p>把 <code>@post = Post.all</code> 補上去，也就是把所有文章取出來的意思</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># app/controller/posts_controller.rb</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PostController</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @post </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.all</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">end</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># app/controller/posts_controller.rb</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PostController</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @post </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.all</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">end</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>在 rails 的 controller 中，只要宣告帶有 @ 的變數，就代表可以傳到 view 中使用</p><h2 id="view" tabindex="-1">view <a class="header-anchor" href="#view" aria-label="Permalink to &quot;view&quot;">​</a></h2><p>所以我們在 view 中直接在 <code>&lt;% %&gt;</code> 中寫上的 ruby 語法</p><p>並把剛剛從 controller 帶過來的變數顯示出來</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- app/view/posts/index.html.erb --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;Posts&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#FDAEB7;font-style:italic;">ui</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">% @posts.each do |post| %&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">li</span><span style="color:#E1E4E8;">&gt;</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">%= post.title %&gt; / </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">%= post.content %&gt;&lt;/</span><span style="color:#85E89D;">li</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">% end %&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#FDAEB7;font-style:italic;">ui</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- app/view/posts/index.html.erb --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;Posts&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#B31D28;font-style:italic;">ui</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">% @posts.each do |post| %&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">li</span><span style="color:#24292E;">&gt;</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">%= post.title %&gt; / </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">%= post.content %&gt;&lt;/</span><span style="color:#22863A;">li</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">% end %&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#B31D28;font-style:italic;">ui</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>這樣就完成顯示囉！</p><div class="warning custom-block"><p class="custom-block-title">未完待續</p><p>To be continued ...</p></div>`,18),t=[p];function e(c,r,i,y,E,d){return l(),a("div",null,t)}const u=s(o,[["render",e]]);export{h as __pageData,u as default};
