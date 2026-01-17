import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  // SITE INFORMATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  site: {
    // site title
    title: '码上观澜',
    // site subtitle
    subtitle: '椰冻的个人博客',
    // site description
    description: 'David Ye 的个人技术博客，也许也会有一些生活随笔。本站由 Astro 主题 Retypeset 和 GitHub Pages 强力驱动。',
    // use i18n title/subtitle/description from src/i18n/ui.ts instead of static ones above
    i18nTitle: true, // true | false
    // author name
    author: 'David Ye',
    // site url
    url: 'https://ydysd.top',
    // base path
    // root directory for all pages and assets
    base: '/', // e.g., '/blog', '/docs'
    // favicon url
    // recommended formats: svg, png or ico
    favicon: '/icons/favicon.ico', // or https://example.com/favicon.svg
  },
  // SITE INFORMATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // COLOR SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  color: {
    // default theme mode
    mode: 'auto', // light | dark | auto
    light: {
      // primary color
      // used for title, hover, etc
      // oklch color picker: https://oklch.com/
      primary: 'oklch(0.24 0.053 261.24)',
      // secondary color
      // used for post text
      secondary: 'oklch(0.39 0.053 261.24)',
      // background color
      background: 'oklch(1 0 0)',
      // highlight color
      // used for navbar, selected text, etc
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)',
    },
    dark: {
      // primary color
      primary: 'oklch(0.92 0 0)',
      // secondary color
      secondary: 'oklch(0.79 0 0)',
      // background color
      background: 'oklch(0.24 0.016 265.21)',
      // highlight color
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.2)',
    },
  },
  // COLOR SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // GLOBAL SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  global: {
    // default language
    locale: 'zh', // de | en | es | fr | ja | ko | pl | pt | ru | zh | zh-tw
    // more languages
    // not fill in the locale code above again, can be an empty array []
    moreLocales: ['en'], // ['de', 'en', 'es', 'fr', 'ja', 'ko', 'pl', 'pt', 'ru', 'zh', 'zh-tw']
    // post font style
    fontStyle: 'sans', // sans | serif
    // post date format
    dateFormat: 'YYYY-MM-DD', // YYYY-MM-DD | MM-DD-YYYY | DD-MM-YYYY | MMM D YYYY | D MMM YYYY
    // enable table of contents
    toc: true, // true | false
    // enable katex math rendering
    katex: true, // true | false
    // reduce motion
    reduceMotion: false, // true | false
  },
  // GLOBAL SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // COMMENT SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  comment: {
    // enable comment system
    enabled: true, // true | false
    // giscus
    // https://giscus.app/
    giscus: {
      repo: 'ysd1123/blog.ydysd.top',
      repoId: 'R_kgDOPgGyaA',
      category: 'giscus',
      categoryId: 'DIC_kwDOPgGyaM4CuW2h',
      mapping: 'pathname',
      strict: '1',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      envId: '',
      // version: frontend version can be changed in package.json
    },
    // waline
    // https://waline.js.org/en/
    waline: {
      // server url
      serverURL: '',
      // emoji url
      emoji: [
        '',
        // 'https://unpkg.com/@waline/emojis@1.2.0/bmoji',
        // more emojis: https://waline.js.org/en/guide/features/emoji.html
      ],
      // gif search
      search: false, // true | false
      // image uploader
      imageUploader: false, // true | false
    },
  },
  // COMMENT SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // SEO SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  seo: {
    // @twitter ID
    twitterID: '',
    // site verification
    verification: {
      // google search console
      // https://search.google.com/search-console
      google: 'zRf8nH4O-sNyV0bgu7R1e9uhXflLfxIKYdjhZr5Dv8w',
      // bing webmaster tools
      // https://www.bing.com/webmasters
      bing: '8CCEDBE3A26E0B9B03837625EF2DDE3A',
      // yandex webmaster
      // https://webmaster.yandex.com
      yandex: '',
      // baidu search
      // https://ziyuan.baidu.com
      baidu: 'codeva-BHuUfOmyBV',
    },
    // google analytics
    // https://analytics.google.com
    googleAnalyticsID: 'G-T53ZPGR0BG',
    // umami analytics
    // https://cloud.umami.is
    umamiAnalyticsID: '',
    // follow verification
    // https://follow.is/
    follow: {
      // feed ID
      feedID: '',
      // user ID
      userID: '',
    },
    // apiflash access key
    // generate website screenshots for open graph images
    // get your access key at: https://apiflash.com/
    apiflashKey: '',
  },
  // SEO SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // FOOTER SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  footer: {
    // social links
    links: [
      {
        name: 'RSS',
        url: '/atom.xml', // or /rss.xml
      },
      {
        name: 'GitHub',
        url: 'https://github.com/ysd1123',
      },
      {
        name: 'Email',
        url: 'davidye1123@outlook.com',
      },
      {
        name: 'WordPress',
        url: 'https://ydysd.top',
      }
      // {
      //   name: 'X',
      //   url: 'https://x.com/radishzz_',
      // },
    ],
    // year of website start
    startYear: 2025,
  },
  // FOOTER SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // PRELOAD SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  preload: {
    // image hosting url
    // optimize remote images and generate low-quality placeholders
    imageHostURL: 'https://ydysd.top/wp-content/uploads/PicList/',
    // custom google analytics js
    // for users who proxy tracking scripts to a custom domain
    // see https://gist.github.com/xiaopc/0602f06ca465d76bd9efd3dda9393738
    customGoogleAnalyticsJS: '',
    // custom umami analytics js
    // for users who self-deploy umami or proxy tracking scripts to a custom domain
    // see https://umami.is/docs/bypass-ad-blockers
    customUmamiAnalyticsJS: '',
  },
  // PRELOAD SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END
}

export const base = themeConfig.site.base === '/' ? '' : themeConfig.site.base.replace(/\/$/, '')
export const defaultLocale = themeConfig.global.locale
export const moreLocales = themeConfig.global.moreLocales
export const allLocales = [defaultLocale, ...moreLocales]
