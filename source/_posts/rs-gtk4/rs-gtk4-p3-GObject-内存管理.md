---
title: rs-gtk4-p3-GObject-内存管理
abbrlink: posts/rust-gtk4/p3
date: 2022-01-30 12:01:22
top: 9697
tags: [Rust, GUI]
keywords: [Rust, GUI, Gtk4]
---
> 来看看什么是Widget(部件), 由此出发, 去探讨内存管理(Memory Management)
<!-- more -->
同系列传送门: [rust-gtk4系列](/categories/rust-gtk4)
# Widget
## 概念
一个Gtk应用, 由许多组件组成, 这些组件, 就叫Widget(部件)  
Gtk提供了许多Widget, 比如我们上一节的 `ApplicationWindow` 就是一个Widget  
比如, Button(按钮), Container(容器)都属于Widget  
[Widget Gallery](https://docs.gtk.org/gtk4/visual_index.html) 是Gtk提供的网站, 帮助我们选择Widget  

你甚至可以定义自己的Widget, 通过继承 (因为Gtk是面向对象的框架)  
比如 `Button`, 它的继承树如下:  

```
GObject
└── Widget
    └── Button
```