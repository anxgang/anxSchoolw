import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.1baa841b.js";const m=JSON.parse('{"title":"寄信 (ActionMailer)","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"rails-features/02-mailer.md","filePath":"rails-features/02-mailer.md"}'),p={name:"rails-features/02-mailer.md"},o=l(`<h1 id="寄信-actionmailer" tabindex="-1">寄信 (ActionMailer) <a class="header-anchor" href="#寄信-actionmailer" aria-label="Permalink to &quot;寄信 (ActionMailer)&quot;">​</a></h1><p>使用 ActionMailer 來處理信件的寄送</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>寄 email 有兩種方式：</p><ol><li>透過類似 mailgun 等服務用 api 去寄送</li></ol><p>優點是不用自己準備 email server 或環境，比較不會遇到被擋信的問題；缺點是要付費，寄越多越貴。</p><ol start="2"><li>另一種透過 smtp 方式去寄送</li></ol><p>優點是沒有費用，要寄多少都可以；缺點寄送速度慢，需要用背景程式執行如 sidekiq，可能需要自行處理可能被擋信，跑到垃圾信件問題</p><p>以上兩種方式都需要紀錄 token 或是密碼，所以還會使用到 rails credentials 來保護機密的資訊做記錄</p><p>本教學會使用 smtp 搭配 gmail 來寄送 email</p><h2 id="實作" tabindex="-1">實作 <a class="header-anchor" href="#實作" aria-label="Permalink to &quot;實作&quot;">​</a></h2><h3 id="_0-前置作業" tabindex="-1">0. 前置作業 <a class="header-anchor" href="#_0-前置作業" aria-label="Permalink to &quot;0. 前置作業&quot;">​</a></h3><p>gmail 須先取得 <code>應用程式密碼</code></p><p>可以參考 <a href="https://www.webdesigntooler.com/google-smtp-send-mail" target="_blank" rel="noreferrer">如何使用Google SMTP寄信(兩段式驗證+應用程式密碼) - 主機架站寄信教學</a></p><h3 id="_1-設定相關-token" tabindex="-1">1. 設定相關 token <a class="header-anchor" href="#_1-設定相關-token" aria-label="Permalink to &quot;1. 設定相關 token&quot;">​</a></h3><p>這邊使用 rails credentials ( rails 5 up)</p><p>rails credentials 的使用方式， 是透過一組檔案 <code>master.key</code>(鑰匙) 和 <code>credentials.yml.enc</code>(加密過的檔案) 來實踐 每次要編輯的時候，會用鑰匙開啟這個加密檔案，編輯完後關閉 這樣以後只要保存好 <code>master.key</code> 並把其加入 <code>.gitignore</code> 即可 而<code>credentials.yml.enc</code> 就可以放心的丟 github</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">VISUAL</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;code --wait&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bin/rails</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">credentials:edit\`</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">VISUAL</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;code --wait&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bin/rails</span><span style="color:#24292E;"> </span><span style="color:#032F62;">credentials:edit\`</span></span></code></pre></div><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">development</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">MAIL_HOST</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://preerp.tranyi.com&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">MAIL_DOMAIN</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;smtp.gmail.com&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">MAIL_PORT</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;587&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#&quot;465&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">MAIL_USER_NAME</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xxx@gmail.com&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">MAIL_PASSWORD</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xxxxxxxxxxxx&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">development</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">MAIL_HOST</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://preerp.tranyi.com&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">MAIL_DOMAIN</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;smtp.gmail.com&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">MAIL_PORT</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;587&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#&quot;465&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">MAIL_USER_NAME</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxx@gmail.com&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">MAIL_PASSWORD</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xxxxxxxxxxxx&quot;</span></span></code></pre></div><p>接下來只要這樣寫，就可以取得隱藏的參數:</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.application.credentials[</span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.env][</span><span style="color:#79B8FF;">:MAIL_USER_NAME</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;"># =&gt; &quot;xxx@gmail.com&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.application.credentials[</span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.env][</span><span style="color:#005CC5;">:MAIL_USER_NAME</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6A737D;"># =&gt; &quot;xxx@gmail.com&quot;</span></span></code></pre></div><h3 id="_2-設定-email-config" tabindex="-1">2. 設定 email config <a class="header-anchor" href="#_2-設定-email-config" aria-label="Permalink to &quot;2. 設定 email config&quot;">​</a></h3><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># config/environments/development.rb</span></span>
<span class="line"><span style="color:#E1E4E8;">config.action_mailer.delivery_method </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">:smtp</span></span>
<span class="line"><span style="color:#E1E4E8;">config.action_mailer.raise_delivery_errors </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># development 時可以開啟</span></span>
<span class="line"><span style="color:#E1E4E8;">config.action_mailer.default_url_options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">host:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.application.credentials[</span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.env][</span><span style="color:#9ECBFF;">&quot;MAIL_HOST&quot;</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">config.action_mailer.smtp_settings </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">address:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.application.credentials[</span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.env][</span><span style="color:#9ECBFF;">&#39;MAIL_DOMAIN&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">port:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.application.credentials[</span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.env][</span><span style="color:#9ECBFF;">&#39;MAIL_PORT&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">domain:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.application.credentials[</span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.env][</span><span style="color:#9ECBFF;">&#39;MAIL_DOMAIN&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">user_name:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.application.credentials[</span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.env][</span><span style="color:#9ECBFF;">&#39;MAIL_USER_NAME&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">password:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.application.credentials[</span><span style="color:#79B8FF;">Rails</span><span style="color:#E1E4E8;">.env][</span><span style="color:#9ECBFF;">&#39;MAIL_PASSWORD&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">authentication:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;plain&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">enable_starttls_auto:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># config/environments/development.rb</span></span>
<span class="line"><span style="color:#24292E;">config.action_mailer.delivery_method </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">:smtp</span></span>
<span class="line"><span style="color:#24292E;">config.action_mailer.raise_delivery_errors </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># development 時可以開啟</span></span>
<span class="line"><span style="color:#24292E;">config.action_mailer.default_url_options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">host:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.application.credentials[</span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.env][</span><span style="color:#032F62;">&quot;MAIL_HOST&quot;</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">config.action_mailer.smtp_settings </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">address:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.application.credentials[</span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.env][</span><span style="color:#032F62;">&#39;MAIL_DOMAIN&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">port:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.application.credentials[</span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.env][</span><span style="color:#032F62;">&#39;MAIL_PORT&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">domain:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.application.credentials[</span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.env][</span><span style="color:#032F62;">&#39;MAIL_DOMAIN&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">user_name:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.application.credentials[</span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.env][</span><span style="color:#032F62;">&#39;MAIL_USER_NAME&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">password:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.application.credentials[</span><span style="color:#005CC5;">Rails</span><span style="color:#24292E;">.env][</span><span style="color:#032F62;">&#39;MAIL_PASSWORD&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">authentication:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;plain&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">enable_starttls_auto:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_3-產生一組-mail" tabindex="-1">3. 產生一組 mail <a class="header-anchor" href="#_3-產生一組-mail" aria-label="Permalink to &quot;3. 產生一組 mail&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rails</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">g</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mailer</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">User</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">notify</span></span>
<span class="line"><span style="color:#6A737D;"># rails g mailer [mailer的名稱] [mailser 的 action 1] [mailser 的 action 2] ...</span></span>
<span class="line"><span style="color:#6A737D;"># 會產生下列檔案:</span></span>
<span class="line"><span style="color:#6A737D;">#      create  app/mailers/user_mailer.rb</span></span>
<span class="line"><span style="color:#6A737D;">#      invoke  erb</span></span>
<span class="line"><span style="color:#6A737D;">#      create    app/views/user_mailer</span></span>
<span class="line"><span style="color:#6A737D;">#      create    app/views/user_mailer/notify.text.erb</span></span>
<span class="line"><span style="color:#6A737D;">#      create    app/views/user_mailer/notify.html.erb</span></span>
<span class="line"><span style="color:#6A737D;">#      invoke  test_unit</span></span>
<span class="line"><span style="color:#6A737D;">#      create    test/mailers/user_mailer_test.rb</span></span>
<span class="line"><span style="color:#6A737D;">#      create    test/mailers/previews/user_mailer_preview.rb</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rails</span><span style="color:#24292E;"> </span><span style="color:#032F62;">g</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mailer</span><span style="color:#24292E;"> </span><span style="color:#032F62;">User</span><span style="color:#24292E;"> </span><span style="color:#032F62;">notify</span></span>
<span class="line"><span style="color:#6A737D;"># rails g mailer [mailer的名稱] [mailser 的 action 1] [mailser 的 action 2] ...</span></span>
<span class="line"><span style="color:#6A737D;"># 會產生下列檔案:</span></span>
<span class="line"><span style="color:#6A737D;">#      create  app/mailers/user_mailer.rb</span></span>
<span class="line"><span style="color:#6A737D;">#      invoke  erb</span></span>
<span class="line"><span style="color:#6A737D;">#      create    app/views/user_mailer</span></span>
<span class="line"><span style="color:#6A737D;">#      create    app/views/user_mailer/notify.text.erb</span></span>
<span class="line"><span style="color:#6A737D;">#      create    app/views/user_mailer/notify.html.erb</span></span>
<span class="line"><span style="color:#6A737D;">#      invoke  test_unit</span></span>
<span class="line"><span style="color:#6A737D;">#      create    test/mailers/user_mailer_test.rb</span></span>
<span class="line"><span style="color:#6A737D;">#      create    test/mailers/previews/user_mailer_preview.rb</span></span></code></pre></div><p>接下來可以到產生出來的 <code>app/mailers/user_mailer.rb</code>檔案，去調整寄送的對象</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># app/mailers/user_mailer.rb</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserMailer</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ApplicationMailer</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Subject can be set in your I18n file at config/locales/en.yml</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># with the following lookup:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#   en.user_mailer.notify.subject</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">notify</span></span>
<span class="line"><span style="color:#E1E4E8;">    @greeting </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Hi&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    mail </span><span style="color:#79B8FF;">to:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;to@example.org&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	     </span><span style="color:#79B8FF;">from:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;from@gmail.com&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		 </span><span style="color:#79B8FF;">subject:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;This is Notify subject&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">end</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># app/mailers/user_mailer.rb</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserMailer</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ApplicationMailer</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Subject can be set in your I18n file at config/locales/en.yml</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># with the following lookup:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#   en.user_mailer.notify.subject</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">notify</span></span>
<span class="line"><span style="color:#24292E;">    @greeting </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Hi&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    mail </span><span style="color:#005CC5;">to:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;to@example.org&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	     </span><span style="color:#005CC5;">from:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;from@gmail.com&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		 </span><span style="color:#005CC5;">subject:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;This is Notify subject&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">end</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div><p>然後可以到產生出來的 <code>app/views/user_mailer/notify.html.erb</code>檔案，去調整寄送的內容</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- app/views/user_mailer/notify.html.erb --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;User#notify&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">%= @greeting %&gt;, find me in app/views/user_mailer/notify.html.erb</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- app/views/user_mailer/notify.html.erb --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;User#notify&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">%= @greeting %&gt;, find me in app/views/user_mailer/notify.html.erb</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>大致類似 controller 和 view 的對應關係</p><blockquote><p>額外寫法可以參考這裡 <a href="https://guides.rubyonrails.org/action_mailer_basics.html#complete-list-of-action-mailer-methods" target="_blank" rel="noreferrer">https://guides.rubyonrails.org/action_mailer_basics.html#complete-list-of-action-mailer-methods</a></p></blockquote><h3 id="_4-使用方式" tabindex="-1">4. 使用方式 <a class="header-anchor" href="#_4-使用方式" aria-label="Permalink to &quot;4. 使用方式&quot;">​</a></h3><p>接下來只要在想寄信的任何位置，寫上傳送指令即可，以下是範例:</p><div class="language-rb vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rb</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 立即發送</span></span>
<span class="line"><span style="color:#79B8FF;">UserMailer</span><span style="color:#E1E4E8;">.notify.deliver_now</span></span>
<span class="line"><span style="color:#6A737D;"># 透過 ActiveJob 背景發送 (可避免送出時間過久)</span></span>
<span class="line"><span style="color:#79B8FF;">UserMailer</span><span style="color:#E1E4E8;">.notify.deliver_later</span></span>
<span class="line"><span style="color:#6A737D;"># 傳入參數</span></span>
<span class="line"><span style="color:#79B8FF;">UserMailer</span><span style="color:#E1E4E8;">.with(</span><span style="color:#79B8FF;">xxx:</span><span style="color:#E1E4E8;"> xxx).notify.deliver_now</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 立即發送</span></span>
<span class="line"><span style="color:#005CC5;">UserMailer</span><span style="color:#24292E;">.notify.deliver_now</span></span>
<span class="line"><span style="color:#6A737D;"># 透過 ActiveJob 背景發送 (可避免送出時間過久)</span></span>
<span class="line"><span style="color:#005CC5;">UserMailer</span><span style="color:#24292E;">.notify.deliver_later</span></span>
<span class="line"><span style="color:#6A737D;"># 傳入參數</span></span>
<span class="line"><span style="color:#005CC5;">UserMailer</span><span style="color:#24292E;">.with(</span><span style="color:#005CC5;">xxx:</span><span style="color:#24292E;"> xxx).notify.deliver_now</span></span></code></pre></div><h3 id="_5-預覽內容" tabindex="-1">5. 預覽內容 <a class="header-anchor" href="#_5-預覽內容" aria-label="Permalink to &quot;5. 預覽內容&quot;">​</a></h3><ul><li>原生的方法 (rails 5 up) <ul><li>可以從這裡選到想要的mail <ul><li><a href="http://localhost:3000/rails/mailers" target="_blank" rel="noreferrer">http://localhost:3000/rails/mailers</a></li></ul></li><li>可以從對應的路徑開啟 <ul><li><a href="http://localhost:3000/rails/mailers/user_mailer/notify" target="_blank" rel="noreferrer">http://localhost:3000/rails/mailers/user_mailer/notify</a></li></ul></li></ul></li><li>gem <ul><li><a href="https://github.com/sj26/mailcatcher" target="_blank" rel="noreferrer">MailCatcher</a><ul><li>可以另開一個介面模擬收信 (起一個 smtp 服務來模擬)</li></ul></li><li><a href="https://github.com/ryanb/letter_opener" target="_blank" rel="noreferrer">letter_opener</a><ul><li>可以直接當成 view 打開</li></ul></li></ul></li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>未完待續...</p></div>`,37),e=[o];function t(r,c,i,y,E,d){return a(),n("div",null,e)}const h=s(p,[["render",t]]);export{m as __pageData,h as default};