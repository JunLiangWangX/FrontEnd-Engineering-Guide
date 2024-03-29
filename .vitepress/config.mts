import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { SearchPlugin } from "vitepress-plugin-search"
import fs from 'fs';
import spawn from 'cross-spawn';
// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },   
    plugins: [SearchPlugin({
      preset:'score',
      tokenize:'full',
      buttonLabel: "搜索",
      placeholder: "输入搜索内容",
    })]
  },
  buildEnd: ( siteConfig) => {
    
   const baseURL = 'https://wangjunliang.com/FrontEnd-Engineering-Guide';

   try {
     let siteMapStr = '';
     for (const page of siteConfig.pages) {
       if (page === 'index.md') continue;
       // 获取最后修改日期，基于git
       const filePath = siteConfig.srcDir + '/' + page;
       const date = new Date(
         parseInt(
           spawn.sync('git', ['log', '-1', '--format=%at', filePath]).stdout.toString('utf-8')
         ) * 1000
       );
       siteMapStr += `
       <url>
         <loc>${baseURL}/${page.replace(/\.md$/, '.html')}</loc>
         <lastmod>${date.toISOString()}</lastmod>
         <changefreq>weekly</changefreq>
         <priority>1.0</priority> 
       </url>
     `;
     }

     const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
       ${siteMapStr}
       </urlset>
     `;
     fs.writeFileSync(`${siteConfig.outDir}/sitemap.xml`, xmlStr);
   } catch (err) {
     console.log('create sitemap.txt failed!', err);
   }
  },
  title: "前端工程化指南",
  description: "A comprehensive, centralized, and accurate guide to front-end engineering",
  lang: "zh-CN",
  base: '/FrontEnd-Engineering-Guide/',
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: './public',
  srcDir: 'src',
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', href: './logo.svg' }
    ],
    [
      'script',
      {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-62G6TPBXSW'
      }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-62G6TPBXSW');`

    ],
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?92e568bf422499874640dbee88096c2d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ]


  ],
  themeConfig: {
    siteTitle: '前端工程化指南',
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '切换模式',
    sidebarMenuLabel: "菜单",
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: 'deep',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '切换语言',
    outlineTitle: '目录',
    footer: {
      message: '请勿将本站文章用作商业用途 | 转载请标明来源',
      copyright: 'Copyright © 2023-present JunLiangWang'
    },
    editLink: {
      text: "在Github编辑此页",
      pattern: 'https://github.com/JunLiangWangX/FrontEnd-Engineering-Guide/edit/main/src/:path'
    },
    nav: [
      { text: '关注作者', link: 'https://wangjunliang.com/wechat' },
      { text: '支持作者', link: 'https://wangjunliang.com/#/supportBloggers' },
      { text: '了解作者', link: 'https://wangjunliang.com/' },
    ],
    sidebar: [
      {
        text: '版本控制系统',
        items: [{
          text:'什么是版本控制系统？',
          link:'/docs/version-control/what-is-version-control-sys'
        },{
          text:'Git介绍与安装',
          link:'/docs/version-control/git-intro-and-install'
        },{
          text:'Git常见操作',
          link:'/docs/version-control/git-common-operations'
        },{
          text:'Git高级操作',
          link:'/docs/version-control/git-advanced-operations'
        },{
          text:'Git命令大全',
          link:'/docs/version-control/git-commands'
        }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JunLiangWangX/FrontEnd-Engineering-Guide/' }
    ]
  },
  /* Vite PWA Options */
  pwa: {
    outDir: '../public',
    base: '/FrontEnd-Engineering-Guide/',
    scope: '/FrontEnd-Engineering-Guide/',
    includeAssets: ['logo.svg'],
    manifest: {
      name: '前端工程化指南',
      short_name: '前端工程化指南',
      description: "一份全面、集中、准确的前端工程化指南",  //描述
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.svg',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: 'logo-64.svg',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'logo-128.svg',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'logo-256.svg',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'logo-512.svg',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
    },
  }
}))
