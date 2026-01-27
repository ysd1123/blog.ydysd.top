---
title: KaTeX 在 WordPress 中的使用
published: 2020-01-27
updated: 2026-01-26
tags:
  - LaTeX
  - WordPress
draft: false
pin: 0
toc: true
lang: 'zh'
abbrlink: 'how-to-use-katex-on-wordpress'
---

## 0.前言

如何在 Web 上渲染数学公式？首先我们需要的就是一个数学公式渲染库，比如 LaTeX、KaTeX、MathJax 等等，再开始之前，先介绍一下它们的区别：

### TeX

[TeX](http://tug.org/) 是一个由美国计算机教授高德纳（Donald Ervin Knuth）编写的排版软件。由于它是开源的，所以就诞生了许多 TeX 的派生软件。

#### LaTeX

[LaTeX](https://www.latex-project.org/) 是一种基于 TeX 的排版系统，TeX 就是它的格式化引擎。它比 Tex 更加结构化，也更易于用户使用。

#### KaTeX

[KaTeX](https://katex.org/) 与 LaTeX 类似，布局基于 TeX，但它是一个 JavaScript 库，最初由可汗学院开发。

相对于 MathJax，它的一个优点就是能在服务端渲染，可以用 Node.js 预先渲染再以纯 HTML 返回给客户端。

#### MathJax

[MathJax](https://www.mathjax.org/) 是一个能使用 MathML、LaTeX 和 ASCIIMathML 标记在 Web 浏览器中显示数学符号的 JavaScript 库，公式使用 JavaScript 引擎解析成 HTML、SVG 再到浏览器上显示。 （说人话就是这东西是一个可以用 latex 的公式引擎）

### 与 Microsoft Office Word、Markdown 的区别

相比于 Markdown 和 Word，以上公式渲染库就更加专业化，学习成本也更高。

## 1.安装插件

目前 WordPress 插件商店中有 [WP-KaTeX](https://wordpress.org/plugins/wp-katex/) 和 [KaTeX](https://wordpress.org/plugins/katex/) 这两个支持 KaTeX 的插件，这里使用 WP-KaTeX 为例（其实大同小异）。直接在商店中搜索关键词并安装即可。

## 2.在文章中显示数学公式

### 使用短代码

根据插件页面的介绍，我们可以知道可以在文章中插入 `[latex]` 短代码，即可显示公式。

<img src="http://qiniu.pic.ydysd.top/img/2020/2020_how-to-use-katex-on-wordpress_1.jpg" alt="WP-KaTeX 插件在 WordPress 插件库的界面" style="zoom:50%;" />

### 短代码属性

| 属性名    | 默认值  | 可选值         | 备注                                                         |
| --------- | ------- | -------------- | ------------------------------------------------------------ |
| `display` | `false` | `true`/`false` | 值为 `true`，则公式将单行显示；值为`false`，则公式将在段落中内联显示。 |

### WP-KaTeX 插件更改短代码标识

这款插件的短代码用了 `[latex]`，如果要改成`[katex]`，可以参考插件评论中 WordPress 用户 [giannit](https://profiles.wordpress.org/giannit) 的评论：

<img src="http://qiniu.pic.ydysd.top/img/2020/2020_how-to-use-katex-on-wordpress_2.jpg" alt="WordPress 用户 giannit 的评论截图" style="zoom:50%;" />

>  在 `wp-content\plugins\wp-katex\scripts\frontend.php` 在第 41 行编辑文件，更改`add_shortcode( 'latex', 'katex_handler' );`为`add_shortcode( 'katex', 'katex_handler' );`即可。
>
> *翻译自 WordPress 用户 [giannit](https://profiles.wordpress.org/giannit) 的评论（节选）*

---

## 参考资料

### Wikipedia

https://zh.wikipedia.org/wiki/TeX

https://zh.wikipedia.org/wiki/KaTeX

https://zh.wikipedia.org/wiki/LaTeX

https://zh.wikipedia.org/wiki/MathJax
