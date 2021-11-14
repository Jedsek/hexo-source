---
title: rs-gtk4-p1-系列说明
comments: false
abbrlink: rs-gtk4-p1
date: 2021-10-23 20:18:17
top: 9799
tags: [rust, gui]
categories: rust-gtk4
keywords: [rust, gui, gtk4]
---
> 欢迎大家来到 Rust 的 gkt-rs 系列
<!-- more -->
# 系列说明
[Gtk](https://www.gtk.org/), 是一个著名的GUI库, 是 GNOME 项目的关键组成  
由于其语言绑定的特色, 可以让各类语言使用它, 来进行开发  

Rust语言自是其中之一, 具有相关的绑定库: [gtk-rs](https://gtk-rs.org/) (gtk官方网页所指定)  
同时, 非常建议你使用Linux作为开发环境, 因为GTK专注于Linux版本  

我也是 gtk-rs 的新手, 依靠发表博客来巩固所学  
顺便也能帮助和我一样的新鸟们 (老鸟别笑我啊喂!)  


不定期更新, 毕竟我只有周末才能碰到电脑  
~~(碰到了我也不一定来写博客, 空洞骑士, CSGO, 老滚5, 巫师3, 人类一败涂地它们不香吗?)~~
- - -
# 参考资料
资料正在持续更新ing. . .
1. 书籍
- [GUI development with Rust and GTK 4](https://gtk-rs.org/gtk4-rs/stable/latest/book/)
2. 博客/文档
- [Rust Vs GUI](https://turbomack.github.io/posts/2019-07-28-rust-vs-gui.html)
- [GObject Introspection](https://gi.readthedocs.io/en/latest/#gobject-introspection)
- [GNOME Developer Doc/Tutorials](https://developer.gnome.org/documentation/tutorials.html)
- - -
# 环境配置
首先, 你得参照 [GTK官方页面](https://www.gtk.org/docs/installations/) 上的信息, 根据你的操作系统, 进行相应操作, 下载 GTK (版本是GTK4)  

本人的环境为 ArchLinux(WSL), 选择它是因为不需要过多的操心配置方面  
比如gtk的安装, ArchLinux可以直接一行命令解决:  

```bash
sudo pacman -S gtk4
```

其他系统, 请自己找下资料, 善用搜索引擎与官方文档  
~~(gtk的安装其实还是有点让人头大的)~~  

本文发布在2021的下半年, 希望当你看见本文时, gtk在这方面能有所长进  

- - -
# 欢迎骚扰
1. 发现错误的话, 请及时跟我联系  
2. 可以通过博客侧边栏上的联系方式找到我  
3. 欢迎在留言版中留言, 本人会定期查看  

最后, 谢谢你的观看 :)


