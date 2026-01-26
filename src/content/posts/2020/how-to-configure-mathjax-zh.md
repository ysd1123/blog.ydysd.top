---
title: 数学公式前端库 MathJax 的配置
published: 2020-04-11
updated: 2026-01-27
tags:
  - LaTeX
  - 前端开发
draft: false
pin: 0
toc: true
lang: 'zh'
abbrlink: 'how-to-configure-mathjax'
---

## 引入

你可以根据服务端和客户端的网络状况选择合适的 CDN 服务器来引入。

### 官方CDN

```html
<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

### BootCDN

```html
<script type="text/javascript" async src="https://cdn.bootcss.com/mathjax/2.7.7/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

*感谢国内免费CDN服务：**[BootCDN](https://www.bootcdn.cn/)***

### 有问题？

#### “?config=”是什么

详情在文后有提到。

#### “async”是什么

这是个 `<script>` 标签的属性，表示异步执行该脚本。仅对有 `src` 属性的脚本有作用，也就是说对内联脚本（无 `src` 属性的）无作用。

## 配置

引入 MathJax 之后，就可以配置它了。

官方文档中提到，主要可以通过使用外联配置文件和在 `<script>` 中内联配置两种方法来配置。

### 外联配置

你可能已经注意到，在其他的 MathJax 配置教程引入库的代码中，链接后都带有一个 `?config=` 参数，而参数值在许多教程里各不相同。比如这样：`https://cdn.bootcss.com/mathjax/2.7.7/MathJax.js?config=TeX-AMS-MML_HTMLorMML`。
这个参数其实就是指定预编译的配置文件的，那么这个参数值有有何不同呢？

大概有这么几种参数值（配置文件）：

- `TeX-MML-AM_CHTML`
- `TeX-MML-AM_HTMLorMML`
- `TeX-MML-AM_SVG`
- `TeX-AMS-MML_HTMLorMML`
- `TeX-AMS_CHTML`
- `TeX-AMS_SVG`
- `TeX-AMS_HTML`
- `TeX-AMS-MML_SVG`
- `MML_CHTML`
- `MML_SVG`
- `MML_HTMLorMML`
- `AM_CHTML`
- `AM_SVG`
- `AM_HTMLorMML`
- `default`

每个预编译的配置文件都会加载特定的预处理器、输入处理器、输出处理器和扩展。另外，如果你把它指定为 `default` 的话，它就会加载几乎所有的配置以及解释器，然后就可以自己定制。你还可以通过在配置末尾加上“`-full`”来加载完整版（对应的标准版不加载实现代码），不过对于偶尔使用一下就没有必要了。

这里使用的 `TeX-AMS-MML_HTMLorMML` 等同于内联配置中的：

```javascript
MathJax.Hub.Config({
    config: ["MMLorHTML.js"],
    jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML", "output/PreviewHTML"],
    extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js", "fast-preview.js", "AssistiveMML.js", "a11y/accessibility-menu.js"],
    TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
    }
});
```

因此，你也可以直接在内联配置中配置。

### 内联配置

你需要在 `MathJax.Hub.Config()` 函数中加载配置。

你还需要在包含 `MathJax.Hub.Config()` 的 `<script>` 标签上带上 `type="text/x-mathjax-config"`。

需要注意的是，这个配置的 `<script>` 必须放在引入的 `<script>` 之前。
也就是这样：

```html
<script type="text/x-mathjax-config">
    MathJax.Hub.Config();
</script>
<script type="text/javascript" async src="https://cdn.bootcss.com/mathjax/2.7.7/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

#### 详细配置说明

```javascript
MathJax.Hub.Config({
    showProcessingMessages: false, //关闭js加载过程信息
    messageStyle: "none", //不显示信息
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [["$", "$"]], //行内公式选择$
        displayMath: [["$$", "$$"]], //独立段落公式选择$$
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'], //避开某些标签
        processEscapes: true
    },
    "HTML-CSS": {
        availableFonts: ["STIX", "TeX"], //可选字体
        showMathMenu: false //关闭右击菜单显示
    },
    TeX: {
        extensions: ["AMSmath.js", "AMSsymbols.js", "extpfeil.js", "mhchem.js"] //一些写化学式的包
    },
    CommonHTML: {
        matchFontHeight: false
    }
});
```

大概如图所示了，你可以自行修改。

### 更多的优化配置

#### 约束识别范围

目的是只让脚本识别 WordPress 文章内容里的公式识别符。

首先获取当前文章 id，赋值给变量 `mathId`：

```javascript
var mathId = document.getElementById("post-content");
```

然后在配置 `MathJax.Hub.Config()` 之后加上：

```javascript
MathJax.Hub.Queue(["Typeset",MathJax.Hub,mathId]);
```

意思就是只在 id 为 `post-content` 的标签内去识别。

你也可以在 `MathJax.Hub.Config()` 里加上：

```javascript
skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a']
```

意思就是不识别这些标签里的文本。

#### 去除公式周围的蓝框

css 里加上：

```css
.MathJax{outline:0;}
```

## 注意事项

以上配置仅作参考，请根据自己的实际情况选择。

### 兼容性问题

`getElementById()` 的传入参数需要根据自己的实际情况选择，大概是把需要渲染的标签id输入即可。

比如这个示例， WordPress 的正文部分的标签id大概是“post-57”，“57”即为文章id。所以需要先 `document.getElementById("post-content")` 获取一下。

```javascript
var mathId = document.getElementById("post-content"); //获取当前文章id
window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById(mathId)]); //如果不传入第三个参数，则渲染整个document
```

## 最后

```html
<link rel="dns-prefetch" href="https://cdn.bootcss.com" />
<link rel="dns-prefetch" href="https://cdn.mathjax.org" />
<script type="text/x-mathjax-config">
    var mathId = document.getElementById("post-content"); //选择公式识别范围
    MathJax.Hub.Config({
        showProcessingMessages: false, //关闭js加载过程信息
        messageStyle: "none", //不显示信息
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
            inlineMath:  [ ["$", "$"] ], //行内公式选择$
            displayMath: [ ["$$","$$"] ], //段内公式选择$$
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a'], //避开某些标签
            processEscapes: true
        },
        "HTML-CSS": {
            availableFonts: ["STIX","TeX"], //可选字体
            showMathMenu: false //关闭右击菜单显示
        },
        TeX: {
            extensions: ["AMSmath.js","AMSsymbols.js","extpfeil.js","mhchem.js"] //化学式
        },
        CommonHTML: {
            matchFontHeight: false
        }
    });
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,mathId]);
</script>
<script data-no-instant>
    InstantClick.on('change', function (isInitialLoad) {
        if (isInitialLoad === false) {
            if (typeof MathJax !== 'undefined') {
                var mathId = document.getElementById("post-content");
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathId]);
            }
        }
    });
    InstantClick.init();
</script>
<script type="text/javascript" async
    src="https://cdn.bootcss.com/mathjax/2.7.7/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

------

## 参见

### MathJax官网

[MathJax | Beautiful math in all browsers.](https://www.mathjax.org/)

### CDN来源

[BootCDN - Bootstrap 中文网开源项目免费 CDN 加速服务](https://www.bootcdn.cn/)

### 部分代码参考

[MathJax Documentation — MathJax 2.7 documentation](https://docs.mathjax.org/en/v2.7-latest/index.html)

[前端整合MathjaxJS的配置笔记](https://segmentfault.com/a/1190000008317350) *2017-02-20*

[MathJax: 让前端支持数学公式](https://juejin.im/post/5bb60837e51d450e805b7d97) *2018-10-04*

### 其他

[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#%E5%B1%9E%E6%80%A7](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#属性)
