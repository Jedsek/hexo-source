---
title: rs-gtk4-p2-创建HelloWorld窗口
comments: false
abbrlink: rs-gtk4-p2
date: 2021-11-07 10:16:57
top: 9798
tags: [rust, gui]
categories: rust-gtk4
keywords: [rust, gui, gtk4]
---
> 让我们从创建一个 显示HelloWorld的GTK窗口 开始旅途吧
<!-- more -->
# 背景  
## GTK是什么
GTK, 简单来说是个有名的GUI库, 开源免费, 用C编写  

其特点之一, 是能轻松地创建绑定:  
在gtk3后, 由于GI([GObject Introspection](https://gi.readthedocs.io/en/latest/)) 的应用, 可以轻松地, 创建其他语言的绑定  

这使你能利用不同语言编写GUI  
比如, 你能用vala/js/python/rust/nim, 甚至自创的编程语言  
而不是用C去编写(用C会很繁杂, 不清晰)  

基本上名气稍微大点的语言, 都有对应的GTK绑定    
## gtk-rs
目前有个项目, 叫做 [gtk-rs](https://gtk-rs.org/), 负责GTK的Rust语言绑定  
你在 crates.io 上搜索 gtk, 所看到的 [gtk](https://crates.io/crates/gtk) 与 [gtk4](https://crates.io/crates/gtk4), 就属于gtk-rs项目

前者对应gtk3, 六年前就在维护, 所以下载量比gtk4多好几倍  
gtk4这个crate, 则是在不久前开始维护的 (毕竟gtk4也才出现)  

对了, gtk4这个crate是Rust语言绑定, 而非gtk4本身(那个纯C写的)  
所以进行接下来的步骤前, 请确保环境内, 已有gtk4本身的正确版本  
不然crate会装不上  
- - -
# 配置
首先, 你需要创建一个新项目  
随后修改 Cargo.toml, 如下:  
```toml
[dependencies]
gtk = {version = "0.3.1", package = "gtk4"}
```

我们将 gtk4(crate), 重命名为 gtk, 方便之后编写 (这是个惯例)  
随后, 请run一下, 安装依赖 (请确保安装了gtk4)  

下面就是正式的编码环节了
- - -
# 编写
一个GTK4应用的创建, 需要用到 `gtk::Application`  
同时, 我们还需 `use gtk::prelude::*`, 原因与 [std::prelude](https://doc.rust-lang.org/std/prelude/index.html) 或 std::io::prelude 一样  

先创建一个应用, 它目前连窗口也没有:  

```rust
use gtk::prelude::*;
use gtk::Application;
fn main() {
    let app = Application::builder()
        .application_id("io.github.jedsek.myapp")
        .build();
    app.run();
}
```

很简单吧? 但别急着运行, 先看看下面两处:  

- [Builder Pattern (一种Rust中常见的设计模式)](http://chuxiuhong.com/chuxiuhong-rust-patterns-zh/patterns/builder.html):  
这个无需多言, 我们可以利用它, 进行链式构造, 让构造的过程更加清晰  
在这里, 我们只调用了一次链式函数: application_id(id: &str)  
比如 [std::fs::OpenOptions](https://doc.rust-lang.org/std/fs/struct.OpenOptions.html) 就使用了构造者模式  
在学习gtk4时, 它将被较高频次地使用, 最后使用 build 生成

- [application_id](https://developer.gnome.org/documentation/tutorials/application-id.html):  
每个GTK应用, 都带有一个id, 即 `application_id`, 它必须是全世界唯一的  
一般使用反域名, 作为id, 示例有: “org.gnome.gedit” , "io.github.jedsek.myapp"  

但当你跃跃欲试, cargo run之后, 会看到:  

```
GLib-GIO-WARNING : Your application does not implement g_application_activate()
and has no handlers connected to the 'activate' signal.  
It should do one of these.
```

我们实际上还要添加一个名为 activate 的信号量(Signal), 信号量的概念之后会再讲  
现在只需明白, 你得像下面这样写:  

```rust
use gtk::prelude::*;
use gtk::Application;
fn main() {
    let app = Application::builder()
        .application_id("io.github.jedsek.demo")
        .build();
    app.connect_activate(on_activate);
    app.run();
}

fn on_activate(app: &Application) {
	todo!()
}
```

请容许我对上面的东西来点小小的解释:  
当一个gtk应用开始运行之

