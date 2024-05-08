---
title: LinuxでWindowsのインストールUSBを作る
date: 2024-05-08T18:16:59+09:00
slug: make-windows-installer
cover: label.jpg
draft: false
tags:
    - Linux
---
## Windows環境が消えるのはあるある。
みんなもあるよね、Linuxインストールしたら**巻き添えでWindows消えるやつ**。  
そんなことするの私だけですよろしくお願いします。  
私はメインPC以外全部Linuxかmacなので、Linuxでインストーラを作らないといけません。  
balenaでは作れませんし、ddコマンドでも作れません。  

どうするか、作るぞ〜〜!!(??)

## woeusb
今回使うのはwoeusbです。GUIじゃない方を使います。  
次のコマンドでインストールできるよ(ArchLinux)
```bash
yay -S woeusb
```

あとはWindowsのisoファイルをダウンロードして、USBを差して  
```bash
lsblk
```

でディスク一覧が出るので、サイズとかかターゲットデバイスを特定する。  
あとは次のコマンドを実行するだけ。  
```bash
sudo woeusb --device <isoのパス> <ターゲットデバイス>
```

あとは処理が完了するまでひたすら待つ!!

## 以上
以上です。うーーん、なんで消えるんだろう、Windows.
