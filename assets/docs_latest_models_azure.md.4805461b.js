import{_ as e,o as a,c as o,Q as n}from"./chunks/framework.c2adf1ba.js";const _=JSON.parse('{"title":"Azure","description":"","frontmatter":{"order":4},"headers":[],"relativePath":"docs/latest/models/azure.md","filePath":"docs/latest/models/azure.md"}'),s={name:"docs/latest/models/azure.md"},t=n(`<h1 id="azure" tabindex="-1">Azure <a class="header-anchor" href="#azure" aria-label="Permalink to &quot;Azure&quot;">​</a></h1><p>LMQL also supports OpenAI models hosted on Azure. To use these models, you need to configure your Azure API credentials. For this, there are two options: Configuration via environment variables and configuration via <code>lmql.model</code>.</p><h2 id="configuration-via-environment-variables" tabindex="-1">Configuration via Environment Variables <a class="header-anchor" href="#configuration-via-environment-variables" aria-label="Permalink to &quot;Configuration via Environment Variables&quot;">​</a></h2><p>To configure an LMQL runtime as a whole to use a specific Azure deployed model for OpenAI calls, you can provide the following environment variables:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="hljs"><code><span class="line"><span class="hljs-comment"># set the API type based on whether you want to use a completion or chat endpoint</span>
OPENAI_API_TYPE=azure|azure-chat 

<span class="hljs-comment"># your Azure API base URL, e.g. &#39;https://&lt;YOUR_BASE&gt;.openai.azure.com/&#39;</span>
OPENAI_API_BASE=&lt;API_BASE&gt; 

<span class="hljs-comment"># set your API key, can also be provided per deployment </span>
<span class="hljs-comment"># via OPENAI_API_KEY_{&lt;your-deployment-name&gt;.upper()}</span>
OPENAI_API_KEY=&lt;key&gt;
</span></code></pre></div><p>When using your Azure models, make sure to invoke them as <code>openai/&lt;DEPLOYMENT NAME&gt;</code> in your query code. If you need more control, or want to use different deployments, base URLs or api versions across your application, please refer to the next section.</p><h2 id="configuration-via-lmql-model" tabindex="-1">Configuration via <code>lmql.model</code> <a class="header-anchor" href="#configuration-via-lmql-model" aria-label="Permalink to &quot;Configuration via \`lmql.model\`&quot;">​</a></h2><p>If you need to configure Azure credentials on a per-query basis, you can also specify the Azure access credentials as part of an <code>lmql.model(...)</code> object:</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="hljs"><code><span class="line">my_azure_model = lmql.model(
    <span class="hljs-comment"># the name of your deployed model/engine, e.g. &#39;my-model&#39;</span>
    <span class="hljs-string">&quot;openai/&lt;DEPLOYMENT&gt;&quot;</span>, 
    <span class="hljs-comment"># set to &#39;azure-chat&#39; for chat endpoints and &#39;azure&#39; for completion endpoints</span>
    api_type=<span class="hljs-string">&quot;azure|azure-chat&quot;</span>,  
    <span class="hljs-comment"># your Azure API base URL, e.g. &#39;https://&lt;YOUR_BASE&gt;.openai.azure.com/&#39;</span>
    api_base=<span class="hljs-string">&quot;&lt;API_BASE&gt;&quot;</span>, 
    <span class="hljs-comment"># your API key, can also be provided via env variable OPENAI_API_KEY </span>
    <span class="hljs-comment"># or OPENAI_API_KEY_{&lt;your-deployment-name&gt;.upper()}</span>
    [api_key=<span class="hljs-string">&quot;&lt;API_KEY&gt;&quot;</span>] , 
    <span class="hljs-comment"># API version, defaults to &#39;2023-05-15&#39;</span>
    [api_version=<span class="hljs-string">&quot;API_VERSION&quot;</span>,]
    <span class="hljs-comment"># prints the full endpoint URL to stdout on each query (alternatively OPENAI_VERBOSE=1)</span>
    [verbose=<span class="hljs-literal">False</span>] 
)
</span></code></pre></div><p>The resulting <code>my_azure_model</code> object can now be used in the <code>from</code> clause of a query, as <code>model=...</code> argument for LMQL query functions, or for direct <a href="./../lib/generations.html">generation</a>.</p><p>Azure configuration parameters specified as part of an <code>lmql.model(...)</code> object generally take precedence over environment variables. The latter just act as a fallback, e.g. when <code>api_key=</code> is not specified as a keyword argument.</p>`,11),r=[t];function l(i,c,p,d,u,m){return a(),o("div",null,r)}const f=e(s,[["render",l]]);export{_ as __pageData,f as default};
