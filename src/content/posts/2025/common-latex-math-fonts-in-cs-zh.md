---
title: 计算机科学与数学中的常用 LaTeX 数学字体整理
published: 2025-03-21
updated: 2026-01-27
tags:
  - LaTeX
draft: false
pin: 0
toc: false
lang: 'zh'
abbrlink: 'common-latex-math-fonts-in-cs'
---

## 一些特殊字体在权威出版物中的使用情况整理

- **蒋启芬. 线性代数[M]. 机械工业出版社, 2020.**
	- 向量 α：$\boldsymbol{\alpha}$
	- 矩阵 A：$\boldsymbol{A}$
	- 线性空间 V：$V$
	- 线性变换 A：$\mathscr A$，即 `MATHEMATICAL ROUNDHAND CAPITAL A`
- **周志华. 机器学习[M]. 清华大学出版社, 2016.**
	- 向量 x：$\boldsymbol{x}$
	- 变量集 x：$\mathbf{x}$
	- 矩阵 A：$\mathbf{A}$
	- 样本空间或状态空间 X：
	- 概率分布 D：$\mathcal D$
	- 数据样本（数据集）D：$D$
	- 假设空间 H：$\mathcal H$
	- 假设集 H：$H$
	- 学习算法 L：$\mathfrak L$，哥特体，`\mathfrak L`
	- 指示函数：$\mathbb{I}(\cdot)$，`\mathbb{I}(\cdot)`
- **张. 动手学深度学习 PyTorch版 = Dive into deep learning[M]. 人民邮电出版社, 2023.**
	- 向量 x：$\mathbf{x}$
	- 矩阵 X：$\mathbf{X}$
	- 张量 X：$\mathsf{X}$，无衬线体，`\mathsf x`
	- 集合 X：$\mathcal X$
	- 指示函数：$\mathbf{1}_\mathcal{X}$，`\mathbf{1}_\mathcal{X}`
- **GB/T 3102.11-1993：物理科学和技术中使用的数学符号**
	- 变量、变动附标、函数：斜体字母，如 $f_i(x,y)$
	- 点、线段、弧：斜体字母
	- 在特定场合中视为常数的参数：斜体字母
	- 有定义的已知函数：正体字母，如 $\exp{(x)}$、$\sin{x}$
	- 其值不变的数学常数：正体字母，如 $\mathrm{e}=2.718\cdots$
	- 已定义的算子：正体字母，如 $\frac{\mathrm{d}f}{\mathrm{d}x}$
	- 向量 a：$\boldsymbol{a}$ 或者 $\vec{a}$
	- 矩阵 A：$\boldsymbol{A}$
	- 二阶张量 T： $\boldsymbol{T}$ 或者 $\vec{\vec{T}}$

## 特殊符号字体格式速查表

| **LaTeX 符号**        | **字体名称**                   | **常用含义**                       | **LaTeX 源码**       | **备注**                              |
| --------------------- | ------------------------------ | ---------------------------------- | -------------------- | ------------------------------------- |
| $\mathcal L$          | 花体字（Calligraphic letter）  | 损失函数                           | `\mathcal L`         |                                       |
| $\mathcal O$          | 花体字（Calligraphic letter）  | 时间复杂度                         | `\mathcal O`         |                                       |
| $\mathcal D$          | 花体字（Calligraphic letter）  | 样本集                             | `\mathcal D`         |                                       |
| $\mathcal N$          | 花体字（Calligraphic letter）  | 高斯分布                           | `\mathcal N`         |                                       |
| $\mathbb R$           | 板粗体（Blackboard bold font） | 实数集                             | `\mathbb R`          | 亦可作正体（罗马体）粗体 $\mathbf{R}$ |
| $\ell$                |                                | 将小写 L/l、大写 I/i 和数字 1 区分 | `\ell`               |                                       |
| $\nabla$              |                                | nabla 算子                         | `\nabla`             |                                       |
| $\mathrm{d}$          | 罗马体/正体                    | 微分                               | `\mathrm{d}`         |                                       |
| $\sin$                |                                | 正弦函数                           | `\sin`               | 最好不写`\mathrm{sin}`                |
| $\mathbf{A}$          | 罗马体/正体 加粗               | 矩阵                               | `\mathbf{x}`         | 国标是斜体加粗                        |
| $\boldsymbol{\theta}$ | 斜体加粗                       | 矢量或向量                         | `\boldsymbol{theta}` |                                       |

使用某些数学字体样式需要在文档序言中添加 `\usepackage{amssymb}` ：有关更多信息，请参阅 [`amsfonts` 包](https://ctan.org/pkg/amsfonts)。

另外，`\mathcal{}` 和 `\mathscr{}` 有时有区别，有时没区别，这取决于你的 $\LaTeX$ 文档配置。

参见：[https://zhuanlan.zhihu.com/p/569922028](https://zhuanlan.zhihu.com/p/569922028)、[https://devblogs.microsoft.com/math-in-office/unicode-math-calligraphic-alphabets/](https://devblogs.microsoft.com/math-in-office/unicode-math-calligraphic-alphabets/) 和 [https://www.unicode.org/L2/L2020/20275r-math-calligraphic.pdf](https://www.unicode.org/L2/L2020/20275r-math-calligraphic.pdf)。

- a **chancery** L: $\mathcal L$, $\mathcal{ABCDEFGabcdefg }$, aka Caligraphic style.

- a **roundhand** L: $\mathscr L$, $\mathscr{ABCDEFGabcdefg }$, aka Script style.

## 其他示例

行内公式: $E = mc^2$

自定义宏: $\R$ 表示实数集，$\N$ 表示自然数集

块级公式: $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

带编号的公式:

$$
\begin{equation} F = ma \end{equation}
$$

物理公式: $\vec{F} = m\vec{a}$

## 参考资料

### 主要参考

1. [国家标准|GB/T 3102.11-1993](https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=3DE79450D562E62D41CB6E79FF411054)
2. [Mathematical fonts - Overleaf, Online LaTeX Editor](https://www.overleaf.com/learn/latex/Mathematical_fonts)
3. [数学符号表 - OI Wiki](https://oi-wiki.org/intro/symbol/)
4. [Ian Goodfellow and Yoshua Bengio and Aaron Courville, Deep Learning, MIT Press](https://www.deeplearningbook.org/contents/notation.html)

### 其他

1. https://blog.csdn.net/qq_18846849/article/details/130631476
2. https://quicy.notion.site/0910aaa654f14cab9443cc5a8366d712
3. https://toddzhoufeng.github.io/document/2019/07/20/latex-tutorial/
4. https://www.latexstudio.net/archives/51494.html
