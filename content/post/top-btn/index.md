---
title: トップに戻るボタンを実装する
date: 2024-05-09T10:56:13+09:00
slug: Top Btn
cover: cover.jpg
draft: false
tags:
    - HTML
    - CSS
---
## ブログでよく見る「アレ」
スクロールするとフワッと現れる上に戻るボタン。  
日本産のWordPressのテーマにはほとんどデフォルトで搭載されている筈です。  
ですがhugoのテーマにはほとんど無いんですよね。多分英語圏、中国語圏のものがほとんどだからでしょうか。(このブログのテーマも中国語圏)

今回はhtml,css,jsで実装していきます。はい。
## 実装
### html
htmlファイルへは、bodyタグ閉じる直前に。  
```html
<footer>
    <p>©️2024 - samenoko</p>
</footer>
<a class="back-to-top">↑</a>
```
### css
cssファイル
```css
.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #000;
    border: 1px solid #ddd;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: all 0.3s ease;
    pointer-events: none;
    opacity: 0;
    cursor: pointer;
}

.back-to-top.show {
    opacity: 1;
    pointer-events: all;
}
```
見た目に関してはご自身のサイトに合わせて調整してください。  
### js
これはhtmlファイルのbodyタグを閉じる前に記載してください。さっき追加したボタンの下にね。  
```html
<script>
    window.addEventListener('scroll', function () {
        var backToTopButton = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    document.querySelector('.back-to-top').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
</script>
```
このコードでは300px以上スクロールされたらボタンにshowというクラスをつけて表示、  
クリックした時に先頭に戻る処理を追加しています。  

ただそれだけ。  
## 以上
以上でございます。  
このブログはテーマのファイルをゴリゴリに弄っているので、その一部も紹介しつつやっていきたいですね。  
ちなみに使っているテーマは [Paper](https://github.com/nanxiaobei/hugo-paper) です。