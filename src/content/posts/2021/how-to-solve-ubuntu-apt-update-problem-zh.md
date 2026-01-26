---
title: 解决 Ubuntu 中 apt 的更新文件配置多次导致无法更新的问题
published: 2021-03-22
updated: 2026-01-27
tags:
  - Linux
  - 杂七杂八的问题记录
draft: false
pin: 0
toc: false
lang: 'zh'
abbrlink: 'how-to-solve-ubuntu-apt-update-problem'
---

## 问题细节

在终端中输入 `apt update`，错误提示类似 `W: 目标 DEP-11 (partner/dep11/Components-amd64.yml) 在 /etc/apt/sources.list:44 和 /etc/apt/sources.list:87中被配置了多次` 且无法更新。

## 解决方法

一种方案就是手动在 `sources.list` 里注释掉提示错误的那几行。

但如果错误有很多条，可以使用脚本来解决，这里有一个在 GitHub 上开源的脚本：

::github{repo="davidfoerster/aptsources-cleanup"}

按照 readme 教程操作即可。
