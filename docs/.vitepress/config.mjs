import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { highlight } from "./highlighter"

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
    [
      "script",
      {
        async: true,
        src: "https://buttons.github.io/buttons.js"
      }
    ]

  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/', activeMatch: '^/blog/' },
      { text: 'Research', link: '/research/index.html' },
      { text: 'Docs', link: '/guide/', activeMatch: '^/guide/' },
      { text: '▶ Playground', link: 'https://lmql.ai/playground'},
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
          text: '',
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
        },
        {
          text: 'Model Support',
          collapsable: true,
          collapsed: false,
          base: '/guide/models',
          items: sidebar("guide/models")
        },
        {
          text: 'Library',
          collapsable: true,
          collapsed: false,
          base: '/guide/lib',
          items: sidebar("guide/lib")
        },
        {
          text: 'Development',
          collapsable: true,
          collapsed: false,
          base: '/guide/development',
          items: sidebar("guide/development")
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
    highlight: highlight,
    mpa: true
  },
})

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