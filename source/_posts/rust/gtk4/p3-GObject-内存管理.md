---
title: "rust-gtk4-p3: GObject-内存管理"
abbrlink: posts/rust-gtk4/p3
date: 2022-01-30 12:01:22
top: 9697
tags: [Rust, GUI]
keywords: [Rust, GUI, Gtk4]
---
> 来看看什么是 Widget, 由此出发, 创建一个经典的双按钮程序, 探讨内存管理, 防止内存泄漏  
<!-- more -->

同系列传送门: [rust-gtk4](/categories/rust-gtk4)
GNOME入坑指南: [gnome-guide](/posts/gnome/guide)

# Widget
任何一个Gtk应用, 都由许多部件组成, 而这些部件, 就叫 `Widget`, 比如我们上一节的 `ApplicationWindow` 就是一个 Widget  
再比如, `Button(按钮)`, `Container(容器)`, 都属于 `Widget`  

[Widget Gallery](https://docs.gtk.org/gtk4/visual_index.html) 是Gtk提供的网站, 你可以通过浏览它, 更好地选择 `Widget`  

我们甚至能自定义出新的Widget, 通过`继承/子类化`, 因为 Gtk 是面向对象的GUI框架, 之后几节会讲到  
例如 `Button`, 其继承树如下:  

```
GObject
└── Widget
    └── Button
```

GObject, 也就是 `gtk::glib::object::Object`, 是 Gtk 对象层级中的基类, 通过继承 GObject 来获取它的特性  
举个例子, GObject 具有 `引用计数` 的特性, GObject 的子类对象也具有该特性, 当指向自身的强引用归零时, 自动释放内存  
