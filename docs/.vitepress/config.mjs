import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LMQL",
  description: "Language Model Query Language",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'API', link: '/api/index.html' },
    ],
    logo: '/lmql.svg',
    sidebar: {
      '/api': [
        { 
          text: 'API',
          collapsable: true,
          collapsed: false,
          base: '/api',
          items: sidebarApi()
        },
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/eth-sri/lmql' }
    ]
  },
  markdown: {
    defaultHighlightLang: 'python',
    languages: [{
      id: "lmql",
      scopeName: "source.lmql",
      displayName: "LMQL",
      samplePath: "query.lmql",
      path: "../../docs/.vitepress/lmql.tmLanguage.json",
      embeddedLangs: [
        "python"
      ]
    }]
  }
})


function sidebarApi() {
  const files = fs.readdirSync(path.resolve(__dirname, '../api'))
  const sidebar = []

  files.forEach(file => {
    // find first # title
    const content = fs.readFileSync(path.resolve(__dirname, `../api/${file}`), 'utf-8')
    const name = content.match(/# (.*)/)[1]

    sidebar.push({
      text: name,
      link: `/${file}`
    })
  }
  )
  return sidebar
}