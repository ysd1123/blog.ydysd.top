---
title: MathJax 3 全新版本配置指南
published: 2021-01-23
updated: 2026-01-27
tags:
  - LaTeX
  - 前端开发
draft: false
pin: 0
toc: true
lang: 'zh'
abbrlink: 'how-to-configure-mathjax3'
---

## 写在前面

忽然发现 *MathJax* 版本号更新到 *3.X* 了，而中文互联网是竟然还没多少配置最新版本 *MathJax* 的相关教程，于是乎我就去官方文档扒了扒。

## 更新了什么

根据其官方文档的说法，相比于 *MathJax 2.X* 版本，*3.X* 版本可谓是变化极大。从在你的网页头部引入配置它的时候，就不再需要引入一个完整的 `MathJax.js` 文件，还需要加个 `?config=` 以使用组合配置了。当你打开某个提供开源前端CDN加速服务的网站，会发现 *MathJax* 有几十个供选择的配置文件，而你只需加载你需要的一个，以避免多个文件传输，还能同步使用。也就是更加**模块化**了。

## 引入并配置 MathJax 3

### 引入

刚起步，我们直接在页头脚本处引入最通用但也是最大的一个文件 `tex-mml-chtml.js`（也可以选择文件名带 `.min.js` 的压缩后文件）。

```html
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.bootcdn.net/ajax/libs/mathjax/3.1.2/es5/tex-mml-chtml.min.js">
</script>
```

### 配置

现在不能用老版本里 `MathJax.Hub.Config({})` 像 *JSON* 一样配置了，而是直接用 `MathJax = {}`。之后就和老版本一样配置了，我还是按老习惯用美元符号作为分隔符。这里还是用内联脚本的形式配置。

```html
<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$']], //行内公式
    displayMath: [['$$','$$']] //段内公式
  }
  svg: {
    fontCache: 'global'
  }
};
</script>
```

要多来几个分隔符？写成诸如 `[['$','$'], ['//','//']]` 这样就可以。注意逗号别忘记加。

### 从旧版本的配置迁移

你不需要重新写一份，官方提供了一个转换工具，只需将原来的配置粘贴，就能得到新版本的配置了。链接在此：

https://mathjax.github.io/MathJax-demos-web/convert-configuration/convert-configuration.html

最终成果：

```html
<link rel="dns-prefetch" href="https://cdn.bootcdn.net" />
<link rel="dns-prefetch" href="https://cdn.mathjax.org" />
<script>
    MathJax = {
        tex: {
            inlineMath: [
                ["$", "$"]
            ], //行内公式选择$
            displayMath: [
                ["$$", "$$"]
            ], //段内公式选择$$
            processEscapes: true,
            autoload: {
                color: [],
                colorv2: ['color']
            },
            packages: {
                '[+]': ['noerrors', 'extpfeil', 'mhchem']
            }
        },
        svg: {
            fontCache: 'global'
        }
        options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'], //避开某些标签
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
        },
        chtml: {
            matchFontHeight: false
        },
        loader: {
            load: ['[tex]/noerrors', '[tex]/extpfeil', '[tex]/mhchem']
        }
    };
</script>
<script type="text/javascript" id="MathJax-script" async
    src="https://cdn.bootcdn.net/ajax/libs/mathjax/3.1.2/es5/tex-mml-chtml.min.js">
</script>
```
