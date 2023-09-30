import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
// import shiki highlighter
import hljs from 'highlight.js/lib/core'
// import python
import lmql from './lmql.hl'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'

import { pd, StringDOMElement } from 'promptdown/promptdown'

hljs.registerLanguage('lmql', lmql)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LMQL",
  description: "Language Model Query Language",
  ignoreDeadLinks: true,
  head: [
    [
      "script",
      {
        async: true,
        src: "/promptdown.js"
      }
    ],

  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Research', link: '/research/index.html' },
      { text: 'Docs', link: '/guide/index.html' },
      { text: 'Playground', link: 'https://lmql.ai/playground'},
    ],
    logo: '/lmql.svg',
    sidebar: {
      '/reference': [
        { 
          text: 'Reference',
          collapsable: true,
          collapsed: false,
          base: '/reference',
          items: sidebar("reference")
        },
      ],
      '/guide': [
        {
          text: 'Docs',
          collapsable: true,
          collapsed: false,
          base: '/guide',
          items: sidebar("guide")
        },
        {
          text: 'Language',
          collapsable: true,
          collapsed: false,
          base: '/guide/language',
          items: sidebar("guide/language")
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/eth-sri/lmql' },
      { icon: 'discord', link: 'https://discord.gg/5djae9gJVB' },
    ]
  },
  markdown: {
    defaultHighlightLang: 'lmql',
    highlight: function (str, lang) {
      if (lang == 'lmql') {
        let result = hljs.highlight(str, { language: "lmql", ignoreIllegals: true }).value;
        return pre_with_lines(lang, result);
      }

      if (lang == "promptdown") {
        let lines = str.split("\n")
        // check and remove lines with min-height::
        let min_height = null
        if (lines[0].trim() == "") {
          lines.shift()
        }
        if (lines[0].startsWith("min-height::")) {
          min_height = lines[0].replace("min-height::", "").trim()
          lines.shift()
        }
        str = lines.join("\n")

        let animated = str.endsWith("[:replay]\n")
        str = str.replace("[:replay]\n", "")

        let d = new StringDOMElement("pre")
        d.classList.add("promptdown")
        d.classList.add("promptdown-compiled")
        if (animated) {
          d.setAttribute("animate", "true")
        }
        pd(d, str, true);
        if (animated) {
          let b = new StringDOMElement("button")
          b.innerText = "↺ Replay"
          b.classList.add("promptdown-button-replay")
          b.setAttribute("onclick", "pd(this.parentElement)")
          d.appendChild(b)
          d.setAttribute("pd-text", d.getAttribute("pd-text") + "[:replay]")
        } else {
          d.setAttribute("pd-text", d.getAttribute("pd-text"))
        }
        if (min_height) {
          d.style["min-height"] = min_height
        }
        return d.toHTML()
      }
  
      return pre_with_lines("", hljs.highlightAuto(str).value);
    }
  },
  mpa: true
})

function pre_with_lines(lang, result) {
  let lines = result.split("\n");
  // remove empty lines at start or end
  while (lines.length > 0 && lines[0].trim() == "") {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() == "") {
    lines.pop();
  }

  return '<pre class="hljs"><code><span class="line">' + result + '</span></code></pre>';
}


function sidebar(folder) {
  const files = fs.readdirSync(path.resolve(__dirname, '../' + folder))
  const sidebar = []

  files.forEach(file => {
    // check if file is markdown
    if (!file.endsWith('.md')) return

    // find first # title
    const content = fs.readFileSync(path.resolve(__dirname, `../${folder}/${file}`), 'utf-8')
    const name = content.match(/# (.*)/)[1]

    sidebar.push({
      text: name,
      link: `/${file}`
    })
  }
  )
  return sidebar
}