---
title: rust-gui
abbrlink: categories/rust-gui
hidden: true
date: 2021-12-04 22:34:41
layout: page
quicklink: true
top:
tags:
categories:
keywords:
---

这里是关于用 rust 写 GUI 程序的索引  

# GTK4
GTK4 是 Linux 平台上推荐的选项, 说简单肯定不至于, 但说稳是肯定稳的  
而且 GTK4 近年开始发力, 已经达成现代化的目标了, 不要因为是 C 语言写的, 就抱有太大偏见, 有些人只是讨厌 C 语言的繁琐而已  
可以看看 vala 语言 (可以看作是专门为 gtk 设计的语言了) 来写 GTK 程序, 很简洁很美, 表达力并不差  

[x]  [p1~> 系列说明](/posts/rust-gtk4/p1)
[x]  [p2~> 创建窗口](/posts/rust-gtk4/p2)
[x]  [p3~> GObject: 内存管理](/posts/rust-gtk4/p3)
[x]  [p4~> GObject: 子类化](/posts/rust-gtk4/p4)
[x]  [p5~> GObject: 通用类型](/posts/rust-gtk4/p5)
[x]  [p6~> GObject: 属性](/posts/rust-gtk4/p6)
[x]  [p7~> GObject: 信号](/posts/rust-gtk4/p7)
[ ]  [p8~> 主事件循环](/posts/rust-gtk4/p8)
[ ]  [p9~> 设置持久化](/posts/rust-gtk4/p9)

- - -

# Iced
Iced 使用 Elm 语言的模型, 很有趣也非常简单易学, 加上跨平台与能轻松编译到 web 端的特性, 很是推荐  
[ ]  [p1~> 系列说明](/posts/rust-iced/p1)
[ ]  [p2~> Elm式架构](/posts/rust-iced/p2)
[ ]  [p3~> 布局](/posts/rust-iced/p3)
[ ]  [p4~> 样式](/posts/rust-iced/p4)


- - -

# Relm4
基于 GTK4, 加上了 Elm 语言的模型, 可以看作是 gtk-rs 的语法糖版本 ~~(应该?)~~, 一般推荐  