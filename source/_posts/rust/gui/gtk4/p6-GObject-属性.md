---
title: "rust-gtk4-p6~> GObject: 属性"
abbrlink: posts/rust-gtk4/p6
hidden: false
date: 2022-12-10 23:39:26
top: 9694
tags: [Rust, GUI]
keywords: [Rust, GUI, GTK4]
is_series: true
series_link: rust-gui
prev_post: [posts/rust-gtk4/p5, "GObject: 通用类型"]
next_post: [posts/rust-gtk4/p7, "GObject: 信号"]
---
> 本节将学习 GObject 的 property(属性), 探索其强大且灵活的动态运行时
<!-- more -->

同系列传送门: [rust-gui](/categories/rust-gui)
GNOME入坑指南: [gnome](/posts/desktop-beautify/gnome)

# 说明  
属性(Property), 让我们能够访问 GObject 的状态(state)  

glib 虽然以面向过程的 C 为核心, 但却具有面向对象的思想, 属性自然是其中重要的一环  
通过库为我们提供的运行时, 我们得到了一个灵活的, 动态的运行时, 直接使用就好  

得益于此, 我们可以在程序的运行过程中, 动态地修改其属性, 比如:  
- 动态注册某个新的属性  
- 进行属性间的自动绑定  
- 属性变更时将执行操作 