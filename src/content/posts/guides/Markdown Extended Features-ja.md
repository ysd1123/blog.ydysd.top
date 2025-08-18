---
title: Markdown 拡張機能
published: 2025-04-25
tags:
  - ガイド
toc: false
lang: ja
abbrlink: markdown-extended-features
---

この記事では、Retypeset テーマがサポートする Markdown 拡張機能について、構文例とその効果を紹介します。

## 図のキャプション

標準の Markdown 画像構文 `![alt](src)` を使用すると、自動的に図のキャプションが生成されます。`alt` テキストの前にアンダースコア `_` を追加するか、`alt` テキストを空にすると、キャプションが非表示になります。

### 構文

```
![画像の説明](https://image.radishzz.cc/image/gallery/06.webp)

![_画像の説明](https://image.radishzz.cc/image/gallery/06.webp)
```

### 効果

![画像の説明](https://image.radishzz.cc/image/gallery/06.webp)

![_画像の説明](https://image.radishzz.cc/image/gallery/06.webp)

## アドモニションブロック

GitHub 構文 `> [!TYPE]` または三重コロン構文 `:::type` を使用して、アドモニションブロックを作成できます。`note`、`tip`、`important`、`warning`、`caution` の 5 種類がサポートされています。

### 構文

```
> [!NOTE]
> 内容を流し読みする場合でも、ユーザーに知ってほしい有益な情報。

> [!TIP]
> タスクをより簡単に完了するために役立つオプション情報。

> [!IMPORTANT]
> ユーザーが成功するために必要な重要な情報。

:::warning
潜在的なリスクがあり、ユーザーの即時の注意を必要とする重要な内容。
:::

:::caution
特定の操作によって生じる可能性のある悪影響について。
:::

:::note[カスタムタイトル]
これはカスタムタイトルの付いた注釈ブロックです。
:::
```

### 効果

> [!NOTE]
> 内容を流し読みする場合でも、ユーザーに知ってほしい有益な情報。

> [!TIP]
> タスクをより簡単に完了するために役立つオプション情報。

> [!IMPORTANT]
> ユーザーが成功するために必要な重要な情報。

:::warning
潜在的なリスクがあり、ユーザーの即時の注意を必要とする重要な内容。
:::

:::caution
特定の操作によって生じる可能性のある悪影響について。
:::

:::note[カスタムタイトル]
これはカスタムタイトルの付いた注釈ブロックです。
:::

## 折りたたみ部分

三重コロン構文 `:::fold[title]` を使用すると、折りたたみ部分を作成できます。タイトルをクリックすると展開または折りたたむことができます。

### 構文

```
:::fold[使用のヒント]
すべての読者が興味を持たない可能性のあるコンテンツは、折りたたみ部分に配置できます。
:::
```

### 効果

:::fold[使用のヒント]
すべての読者が興味を持たない可能性のあるコンテンツは、折りたたみ部分に配置できます。
:::

## ギャラリー

三重コロン構文 `:::gallery` を使用すると、画像ギャラリーを作成できます。水平スクロールでより多くの画像を閲覧できます。

### 構文

```
:::gallery
![アルパカ](https://image.radishzz.cc/image/gallery/sheep-1.jpg)
![振り向く](https://image.radishzz.cc/image/gallery/sheep-2.jpg)
![見つめ合う](https://image.radishzz.cc/image/gallery/sheep-3.jpg)
![子アルパカ](https://image.radishzz.cc/image/gallery/sheep-4.jpg)
![可愛すぎる！](https://image.radishzz.cc/image/gallery/sheep-5.jpg)
:::
```

### 効果

:::gallery
![アルパカ](https://image.radishzz.cc/image/gallery/sheep-1.jpg)
![振り向く](https://image.radishzz.cc/image/gallery/sheep-2.jpg)
![見つめ合う](https://image.radishzz.cc/image/gallery/sheep-3.jpg)
![子アルパカ](https://image.radishzz.cc/image/gallery/sheep-4.jpg)
![可愛すぎる！](https://image.radishzz.cc/image/gallery/sheep-5.jpg)
:::

## GitHub リポジトリ

二重コロン構文 `::github{repo="owner/repo"}` を使用すると、GitHub リポジトリカードを作成できます。ページの読み込み後、GitHub API からリアルタイムでリポジトリの情報が取得されます。

### 構文

```
::github{repo="radishzzz/astro-theme-retypeset"}
```

### 効果

::github{repo="radishzzz/astro-theme-retypeset"}

## 動画

二重コロン構文 `::youtube{id="videoId"}` を使用すると、動画を埋め込みできます。

### 構文

```
::youtube{id="9pP0pIgP2kE"}

::bilibili{id="BV1sK4y1Z7KG"}
```

### 効果

::youtube{id="9pP0pIgP2kE"}

::bilibili{id="BV1sK4y1Z7KG"}

## X ツイート

二重コロン構文 `::tweet{url="tweetUrl"}` を使用すると、X ツイートカードを埋め込みできます。

### 構文

```
::tweet{url="https://x.com/hachi_08/status/1906456524337123549"}
```

### 効果

::tweet{url="https://x.com/hachi_08/status/1906456524337123549"}
