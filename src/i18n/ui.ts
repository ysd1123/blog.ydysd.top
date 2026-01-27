import type { Language } from '@/i18n/config'

interface Translation {
  title: string
  subtitle: string
  description: string
  posts: string
  tags: string
  about: string
  toc: string
}

export const ui: Record<Language, Translation> = {
  en: {
    title: 'CodeRiff',
    subtitle: '@Coconut Jelly\'s Personal Blog',
    description: 'David Ye\'s personal tech blog, which may also include some life essays. Powered by Astro theme Retypeset and GitHub Pages.',
    posts: 'Posts',
    tags: 'Tags',
    about: 'About',
    toc: 'Table of Contents',
  },
  zh: {
    title: '码上观澜',
    subtitle: '椰冻的个人技术笔记',
    description: 'David Ye 的个人技术博客，也许也会有一些生活随笔。本站由 Astro 主题 Retypeset 和 GitHub Pages 强力驱动。',
    posts: '文章',
    tags: '标签',
    about: '关于',
    toc: '目录',
  },
}
