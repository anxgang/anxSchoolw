import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1baa841b.js";const u=JSON.parse('{"title":"Blog 實戰 - 03. 模型和遷移","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"rails-realworlds/blog/03.md","filePath":"rails-realworlds/blog/03.md"}'),p={name:"rails-realworlds/blog/03.md"},o=l(`<h1 id="blog-實戰-03-模型和遷移" tabindex="-1">Blog 實戰 - 03. 模型和遷移 <a class="header-anchor" href="#blog-實戰-03-模型和遷移" aria-label="Permalink to &quot;Blog 實戰 - 03. 模型和遷移&quot;">​</a></h1><p>繼上一節我們走過一次 Rails 的程式執行路線，</p><p>雖然沒有錯誤訊息了，HTML也正確顯示，但好像還缺了什麼，</p><p>我們好像只走了 route -&gt; controller -&gt; (...) -&gt; view。</p><p>沒錯！在 controller 和 view 中間，我們還缺少了 model 這段</p><h2 id="model" tabindex="-1">Model <a class="header-anchor" href="#model" aria-label="Permalink to &quot;Model&quot;">​</a></h2><p>再看回我們功能清單第一項</p><blockquote><ul><li>前台 <ul><li>訪客可以瀏覽文章清單(index)</li></ul></li></ul></blockquote><p>我們需要實作可以瀏覽的文章</p><p>文章的資料會存在資料庫，並與接下來要建立叫做 post 的 model 做綁定</p><p>我們可以輸入如下指令來建立</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">rails</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">g</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">model</span><span style="color:#E1E4E8;"> [Model名稱] [欄位1:資料型態] [欄位2:資料型態] ...</span></span>
<span class="line"><span style="color:#6A737D;"># g: 表示 generate 產生</span></span>
<span class="line"><span style="color:#6A737D;"># 還可以輸入更多欄位</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">rails</span><span style="color:#24292E;"> </span><span style="color:#032F62;">g</span><span style="color:#24292E;"> </span><span style="color:#032F62;">model</span><span style="color:#24292E;"> [Model名稱] [欄位1:資料型態] [欄位2:資料型態] ...</span></span>
<span class="line"><span style="color:#6A737D;"># g: 表示 generate 產生</span></span>
<span class="line"><span style="color:#6A737D;"># 還可以輸入更多欄位</span></span></code></pre></div><p>如目前我們應該輸入：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">rails</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">g</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">model</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Post</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">title:string</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">content:text</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">rails</span><span style="color:#24292E;"> </span><span style="color:#032F62;">g</span><span style="color:#24292E;"> </span><span style="color:#032F62;">model</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Post</span><span style="color:#24292E;"> </span><span style="color:#032F62;">title:string</span><span style="color:#24292E;"> </span><span style="color:#032F62;">content:text</span></span></code></pre></div><p>執行完了之後主要會產生下列兩個檔案（這邊先忽略測試）</p><p>migration 檔</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># db/migrate/xxxxxxxxxxx_create_posts.rb</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CreatePosts</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ActiveRecord::Migration</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">7.1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">change</span></span>
<span class="line"><span style="color:#E1E4E8;">    create_table </span><span style="color:#79B8FF;">:posts</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> |t|</span></span>
<span class="line"><span style="color:#E1E4E8;">      t.string </span><span style="color:#79B8FF;">:title</span></span>
<span class="line"><span style="color:#E1E4E8;">      t.text </span><span style="color:#79B8FF;">:content</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      t.timestamps</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">end</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">end</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># db/migrate/xxxxxxxxxxx_create_posts.rb</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CreatePosts</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ActiveRecord::Migration</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">7.1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">change</span></span>
<span class="line"><span style="color:#24292E;">    create_table </span><span style="color:#005CC5;">:posts</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> |t|</span></span>
<span class="line"><span style="color:#24292E;">      t.string </span><span style="color:#005CC5;">:title</span></span>
<span class="line"><span style="color:#24292E;">      t.text </span><span style="color:#005CC5;">:content</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      t.timestamps</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">end</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">end</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>model 檔</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># app/models/post.rb</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Post</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ApplicationRecord</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># app/models/post.rb</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Post</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ApplicationRecord</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>我們在 Rails 裡面建立一個 model Post，而資料庫也要建立一個 posts 資料表彼此對應</p><p>名稱綁定好，這樣子 Rails 才能自動產生 SQL 去操作資料庫</p><p>因此這兩個檔案</p><p>一個是 migration 檔，用來操作資料庫的紀錄檔（建立/撤銷/修改..等等）</p><p>另一個是 model 檔，就是 rails 程式邏輯的部分</p><p>但 migration 要執行才會真的異動資料庫</p><p>所以我們這邊緊接著要繼續執行 migration，這樣才會真的建立 posts 這個資料表和他下面兩個欄位 title 和 content</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">rails</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">db:migrate</span></span>
<span class="line"><span style="color:#6A737D;"># 應該會看到成功建立的訊息：</span></span>
<span class="line"><span style="color:#6A737D;"># == 20231114144514 CreatePosts: migrating ======================================</span></span>
<span class="line"><span style="color:#6A737D;"># -- create_table(:posts)</span></span>
<span class="line"><span style="color:#6A737D;">#    -&gt; 0.0017s</span></span>
<span class="line"><span style="color:#6A737D;"># == 20231114144514 CreatePosts: migrated (0.0017s) =============================</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">rails</span><span style="color:#24292E;"> </span><span style="color:#032F62;">db:migrate</span></span>
<span class="line"><span style="color:#6A737D;"># 應該會看到成功建立的訊息：</span></span>
<span class="line"><span style="color:#6A737D;"># == 20231114144514 CreatePosts: migrating ======================================</span></span>
<span class="line"><span style="color:#6A737D;"># -- create_table(:posts)</span></span>
<span class="line"><span style="color:#6A737D;">#    -&gt; 0.0017s</span></span>
<span class="line"><span style="color:#6A737D;"># == 20231114144514 CreatePosts: migrated (0.0017s) =============================</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">提醒</p><p>如果錯誤訊息提示已經建立了，表示你可能剛剛建立過了， 這時候可以輸入 <code>rake db:rollback</code> 還原， 或者乾脆 <code>rake db:drop</code> 整個砍掉重建， 但僅限練習使用，請不要在正式環境這樣用</p></div><h2 id="rails-console" tabindex="-1">Rails Console <a class="header-anchor" href="#rails-console" aria-label="Permalink to &quot;Rails Console&quot;">​</a></h2><p>model 和 資料庫綁定後，</p><p>我們可以試著使用 Rails Console 建立資料，</p><p>輸入指令：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">rails</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">c</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">rails</span><span style="color:#24292E;"> </span><span style="color:#032F62;">c</span></span></code></pre></div><p>可以看到進入一個可輸入的界面:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Loading</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">development</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">environment</span><span style="color:#E1E4E8;"> (Rails </span><span style="color:#79B8FF;">7.1</span><span style="color:#9ECBFF;">.1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">3.2.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">:001</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Loading</span><span style="color:#24292E;"> </span><span style="color:#032F62;">development</span><span style="color:#24292E;"> </span><span style="color:#032F62;">environment</span><span style="color:#24292E;"> (Rails </span><span style="color:#005CC5;">7.1</span><span style="color:#032F62;">.1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">3.2.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">:001</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p>rails console 和 ruby irb 不同的是，他有載入此 rails 專案相關的 class</p><p>例如剛剛的文章 Post 就有被載入進來，</p><p>因此我們想建立一筆文章的資料，我們可以輸入：</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.create!(</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello1&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;"># 或是</span></span>
<span class="line"><span style="color:#E1E4E8;">post </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello2&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">post.save!</span></span>
<span class="line"><span style="color:#6A737D;"># TRANSACTION (0.0ms)  begin transaction</span></span>
<span class="line"><span style="color:#6A737D;"># Post Create (0.6ms)  INSERT INTO &quot;posts&quot; (&quot;title&quot;, &quot;content&quot;, &quot;created_at&quot;, # &quot;updated_at&quot;) VALUES (?, ?, ?, ?) RETURNING &quot;id&quot;  [[&quot;title&quot;, &quot;hello2&quot;], # [&quot;content&quot;, &quot;world&quot;], [&quot;created_at&quot;, &quot;2023-11-14 16:09:41.767379&quot;], # [&quot;updated_at&quot;, &quot;2023-11-14 16:09:41.767379&quot;]]</span></span>
<span class="line"><span style="color:#6A737D;"># TRANSACTION (0.1ms)  commit transaction</span></span>
<span class="line"><span style="color:#6A737D;"># =&gt;</span></span>
<span class="line"><span style="color:#6A737D;"># #&lt;Post:0x000000011055f350</span></span>
<span class="line"><span style="color:#6A737D;"># id: 2,</span></span>
<span class="line"><span style="color:#6A737D;"># title: &quot;hello2&quot;,</span></span>
<span class="line"><span style="color:#6A737D;"># content: &quot;world&quot;,</span></span>
<span class="line"><span style="color:#6A737D;"># created_at: Tue, 14 Nov 2023 16:09:57.528752000 UTC +00:00,</span></span>
<span class="line"><span style="color:#6A737D;"># updated_at: Tue, 14 Nov 2023 16:09:57.528752000 UTC +00:00&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.create!(</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello1&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;"># 或是</span></span>
<span class="line"><span style="color:#24292E;">post </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.</span><span style="color:#D73A49;">new</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello2&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">post.save!</span></span>
<span class="line"><span style="color:#6A737D;"># TRANSACTION (0.0ms)  begin transaction</span></span>
<span class="line"><span style="color:#6A737D;"># Post Create (0.6ms)  INSERT INTO &quot;posts&quot; (&quot;title&quot;, &quot;content&quot;, &quot;created_at&quot;, # &quot;updated_at&quot;) VALUES (?, ?, ?, ?) RETURNING &quot;id&quot;  [[&quot;title&quot;, &quot;hello2&quot;], # [&quot;content&quot;, &quot;world&quot;], [&quot;created_at&quot;, &quot;2023-11-14 16:09:41.767379&quot;], # [&quot;updated_at&quot;, &quot;2023-11-14 16:09:41.767379&quot;]]</span></span>
<span class="line"><span style="color:#6A737D;"># TRANSACTION (0.1ms)  commit transaction</span></span>
<span class="line"><span style="color:#6A737D;"># =&gt;</span></span>
<span class="line"><span style="color:#6A737D;"># #&lt;Post:0x000000011055f350</span></span>
<span class="line"><span style="color:#6A737D;"># id: 2,</span></span>
<span class="line"><span style="color:#6A737D;"># title: &quot;hello2&quot;,</span></span>
<span class="line"><span style="color:#6A737D;"># content: &quot;world&quot;,</span></span>
<span class="line"><span style="color:#6A737D;"># created_at: Tue, 14 Nov 2023 16:09:57.528752000 UTC +00:00,</span></span>
<span class="line"><span style="color:#6A737D;"># updated_at: Tue, 14 Nov 2023 16:09:57.528752000 UTC +00:00&gt;</span></span></code></pre></div><p>如果我們想看看剛剛建的資料，可以輸入：</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.all</span></span>
<span class="line"><span style="color:#6A737D;"># 顯示結果如下：</span></span>
<span class="line"><span style="color:#6A737D;">#   Post Load (0.1ms)  SELECT &quot;posts&quot;.* FROM &quot;posts&quot; /* loading for pp */ LIMIT ?  [[&quot;LIMIT&quot;, 11]]</span></span>
<span class="line"><span style="color:#6A737D;"># =&gt;</span></span>
<span class="line"><span style="color:#6A737D;">#[#&lt;Post:0x00000001107d9ec8</span></span>
<span class="line"><span style="color:#6A737D;">#  id: 1,</span></span>
<span class="line"><span style="color:#6A737D;">#  title: &quot;hello1&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">#  content: &quot;world&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">#  created_at: Tue, 14 Nov 2023 16:09:41.767379000 UTC +00:00,</span></span>
<span class="line"><span style="color:#6A737D;">#  updated_at: Tue, 14 Nov 2023 16:09:41.767379000 UTC +00:00&gt;,</span></span>
<span class="line"><span style="color:#6A737D;"># #&lt;Post:0x00000001107d9d88</span></span>
<span class="line"><span style="color:#6A737D;">#  id: 2,</span></span>
<span class="line"><span style="color:#6A737D;">#  title: &quot;hello2&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">#  content: &quot;world&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">#  created_at: Tue, 14 Nov 2023 16:09:57.528752000 UTC +00:00,</span></span>
<span class="line"><span style="color:#6A737D;">#  updated_at: Tue, 14 Nov 2023 16:09:57.528752000 UTC +00:00&gt;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.all</span></span>
<span class="line"><span style="color:#6A737D;"># 顯示結果如下：</span></span>
<span class="line"><span style="color:#6A737D;">#   Post Load (0.1ms)  SELECT &quot;posts&quot;.* FROM &quot;posts&quot; /* loading for pp */ LIMIT ?  [[&quot;LIMIT&quot;, 11]]</span></span>
<span class="line"><span style="color:#6A737D;"># =&gt;</span></span>
<span class="line"><span style="color:#6A737D;">#[#&lt;Post:0x00000001107d9ec8</span></span>
<span class="line"><span style="color:#6A737D;">#  id: 1,</span></span>
<span class="line"><span style="color:#6A737D;">#  title: &quot;hello1&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">#  content: &quot;world&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">#  created_at: Tue, 14 Nov 2023 16:09:41.767379000 UTC +00:00,</span></span>
<span class="line"><span style="color:#6A737D;">#  updated_at: Tue, 14 Nov 2023 16:09:41.767379000 UTC +00:00&gt;,</span></span>
<span class="line"><span style="color:#6A737D;"># #&lt;Post:0x00000001107d9d88</span></span>
<span class="line"><span style="color:#6A737D;">#  id: 2,</span></span>
<span class="line"><span style="color:#6A737D;">#  title: &quot;hello2&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">#  content: &quot;world&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">#  created_at: Tue, 14 Nov 2023 16:09:57.528752000 UTC +00:00,</span></span>
<span class="line"><span style="color:#6A737D;">#  updated_at: Tue, 14 Nov 2023 16:09:57.528752000 UTC +00:00&gt;]</span></span></code></pre></div><p>下面還有列出一些常用取得資料/刪除資料的方式，可以參考一下</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 單筆資料 (Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">posts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.first </span><span style="color:#6A737D;">#取得第一筆資料</span></span>
<span class="line"><span style="color:#E1E4E8;">post </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.find(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">#取得 id＝2 的單筆資料 (Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">post </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.find_by(</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello1&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">#取得 title=&#39;hello1&#39; 的單筆資料 (Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">post.destroy </span><span style="color:#6A737D;">#刪除單筆資料 (Object)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 資料集合 (Array)</span></span>
<span class="line"><span style="color:#E1E4E8;">posts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.first(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">#取得前兩筆資料</span></span>
<span class="line"><span style="color:#E1E4E8;">posts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.where(</span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">#取得 content=&#39;world&#39;的</span></span>
<span class="line"><span style="color:#E1E4E8;">posts.destroy_all </span><span style="color:#6A737D;">#刪除資料集合 (Array)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 單筆資料 (Object)</span></span>
<span class="line"><span style="color:#24292E;">posts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.first </span><span style="color:#6A737D;">#取得第一筆資料</span></span>
<span class="line"><span style="color:#24292E;">post </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.find(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">#取得 id＝2 的單筆資料 (Object)</span></span>
<span class="line"><span style="color:#24292E;">post </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.find_by(</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello1&#39;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">#取得 title=&#39;hello1&#39; 的單筆資料 (Object)</span></span>
<span class="line"><span style="color:#24292E;">post.destroy </span><span style="color:#6A737D;">#刪除單筆資料 (Object)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 資料集合 (Array)</span></span>
<span class="line"><span style="color:#24292E;">posts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.first(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">#取得前兩筆資料</span></span>
<span class="line"><span style="color:#24292E;">posts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.where(</span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">#取得 content=&#39;world&#39;的</span></span>
<span class="line"><span style="color:#24292E;">posts.destroy_all </span><span style="color:#6A737D;">#刪除資料集合 (Array)</span></span></code></pre></div><h2 id="seed" tabindex="-1">seed <a class="header-anchor" href="#seed" aria-label="Permalink to &quot;seed&quot;">​</a></h2><p>如果嫌 rails console 打指令一行一行打很麻煩</p><p>我們也可以使用 <code>db/seeds.rb</code> 這個檔案，把所有指令都打完，一次建立所有初始資料</p><p>例如：</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># db/seeds.rb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.create!([</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello1&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello2&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello3&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello4&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello5&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello6&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello7&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello8&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 也可以寫迴圈大量建立資料</span></span>
<span class="line"><span style="color:#E1E4E8;">items </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">.times.map </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> |i|</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span><span style="color:#79B8FF;">title:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;hello</span><span style="color:#9ECBFF;">#{i}</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;world&#39;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">end</span></span>
<span class="line"><span style="color:#79B8FF;">Post</span><span style="color:#E1E4E8;">.insert_all(items)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># db/seeds.rb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.create!([</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello1&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello2&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello3&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello4&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello5&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello6&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello7&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello8&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 也可以寫迴圈大量建立資料</span></span>
<span class="line"><span style="color:#24292E;">items </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">.times.map </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> |i|</span></span>
<span class="line"><span style="color:#24292E;">  {</span><span style="color:#005CC5;">title:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hello</span><span style="color:#032F62;">#{i}</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;world&#39;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span>
<span class="line"><span style="color:#005CC5;">Post</span><span style="color:#24292E;">.insert_all(items)</span></span></code></pre></div><p>填寫好後，只要執行下列指令</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rails </span><span style="color:#79B8FF;">db:</span><span style="color:#E1E4E8;">seed</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rails </span><span style="color:#005CC5;">db:</span><span style="color:#24292E;">seed</span></span></code></pre></div><p>就建立好囉</p><div class="tip custom-block"><p class="custom-block-title">提示</p><p>如果想要清空所有資料重建，可以輸入 <code>rails db:seed:replant</code>，注意千萬不要在 production 這麼做</p></div>`,52),e=[o];function t(c,r,y,E,i,d){return n(),a("div",null,e)}const C=s(p,[["render",t]]);export{u as __pageData,C as default};