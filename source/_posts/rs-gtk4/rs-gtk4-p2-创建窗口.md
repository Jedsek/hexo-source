---
title: rs-gtk4-p2-创建窗口
abbrlink: posts/rust-gtk4/p2
date: 2021-11-07 10:16:57
top: 9798
tags: [Rust, GUI]
keywords: [Rust, GUI, Gtk4]
---
> 让我们创建一个GTK窗口, 开始旅途吧
<!-- more -->

同系列传送门: [rust-gtk4系列](/categories/rust-gtk4)

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
同时, 我们还需 `use gtk::prelude::*`  
原因与 [std::prelude](https://doc.rust-lang.org/std/prelude/index.html) 或 std::io::prelude 一样  

先创建一个应用, 它目前连窗口也没有:  

```rust
use gtk::prelude::*;
use gtk::Application;
fn main() {
    let app = Application::builder()
        .application_id("io.gitee.jedsek.myapp")
        .build();
    app.run();
}
```

很简单吧? 但别急着运行, 先看看下面两处:  

- [Builder Pattern (一种Rust中常见的设计模式)](http://chuxiuhong.com/chuxiuhong-rust-patterns-zh/patterns/builder.html):  
这个无需多言, 我们可以利用它, 进行链式构造, 让构造的过程更加清晰  
在这里, 我们只调用了一次链式函数: application_id(id: &str)  
比如 [std::fs::OpenOptions](https://doc.rust-lang.org/std/fs/struct.OpenOptions.html) 就使用了构造者模式  
在学习gtk4时, 它将被较高频次地使用, 最后调用的 build 会生成对应的struct

- [application_id](https://developer.gnome.org/documentation/tutorials/application-id.html):  
每个GTK应用, 都带有一个id, 即 `application_id`, 它必须是全世界唯一的  
一般使用反域名, 作为id, 比如 “org.gnome.gedit”  
app_id作为App的唯一标识符, 用于App之间的通信与识别  
更改一个大型App的app_id会导致很多麻烦, 因此要慎重考虑!  


当你跃跃欲试, cargo run之后, 会看到:  

```
GLib-GIO-WARNING : Your application does not implement g_application_activate()
and has no handlers connected to the 'activate' signal.  
It should do one of these.
```

我们实际上还要添加一个名为 activate 的信号量(Signal)  
你得像下面这样写:  

```rust
use gtk::prelude::*;
use gtk::Application;
fn main() {
    let app = Application::builder()
        .application_id("io.gitee.jedsek.demo")
        .build();
    app.connect_activate(build_ui);
    app.run();
}

fn build_ui(app: &Application) {
	todo!()
}
```

当然, 还无法执行, 因为我想逐步地讲解一下  
请容许我对上面的东西来点小小的解释  

Gtk应用的理念是: App只关心在特定的时候需要做什么事  
什么时候做 ? Gtk已经帮我们安排好了  
至于 `事情的内容`, 则交由开发者自己决定  

接口方面, Gtk已经帮我们分类好一些虚函数, 它们也被称为 `信号(Signal)`  
我们只需要实现这些虚函数即可  
(顾名思义, 虚函数是还不真正的函数, 你可以理解为它们的函数体是空的)  
(不过库的作者已经帮我们安排好了它们的调用顺序, 等待我们实现函数体而已)  

下面是四个待响应的信号, 也就是待实现的虚函数:  

- startup: 
在App第一次启动时被调用, 用于与UI显示无关的初始化任务  
- shutdown: 
在App结束时调用, 清理资源, 进行善后, 不过这好像对Rust没啥用? Drop能自动清理, 但毕竟源码是C
- activate:
GtkApp总得有至少一个窗口, 该函数决定第一个窗口如何显示  
- open
当App需要打开某个文件时被执行, 文件会在新窗口显示, 比如浏览器打开了pdf文件  

注:  
正如上面第三个信号所说, 一个GtkApp至少得有一个窗口  
当单实例App试图打开第二个窗口, Gtk全局系统会发送Signal(activate/open)给第一个窗口  

注:  
所有的初始化工作都应在startup中完成  
哪怕是第二个窗口相关的初始化  


这些只是Gtk给我们的虚函数中最为常见的几个, 实际上还有很多信号, 帮你自定义设计App  

回到之前的代码, 如下:
(我粘贴了一份上面的代码, 方便你看)

```rust
use gtk::prelude::*;
use gtk::Application;
fn main() {
    let app = Application::builder()
        .application_id("io.gitee.jedsek.demo")
        .build();
    app.connect_activate(build_ui);
    app.run();
}

fn build_ui(app: &Application) {
	todo!()
}
```

```
Your application does not implement g_application_activate()
and has no handlers connected to the 'activate' signal. 
```

我们得创建一个函数, 并将其作为参数, 传给 `connect_activate`  
现在你应该明白, 为什么之前会报出一个警告, 要求连接activate这个信号了吧?  
(`connect_xxxx` 相关的方法, 代表着连接信号/实现虚函数)  


我们创建的这个函数, 名为 `build_ui`, 正是为了消除这个警告, 真正显示窗口  
毕竟如果一个GUI应用没有任何显示, 这. . .啧, 不太聪明的感觉?  

直接上 `build_ui` 的代码(注意use一下):  

```rust
use gtk::prelude::*;
use gtk::{Application, ApplicationWindow};
fn main() {
    let app = Application::builder()
        .application_id("io.gitee.jedsek.demo")
        .build();
    app.connect_activate(build_ui);
    app.run();
}

fn build_ui(app: &Application) {
    let window = ApplicationWindow::builder()
        .application(app)
        .title("Hello World!")
        .build();
    window.present();
}
```

咋们用builder模式指定了窗口对应的App是谁, 窗口标题是啥, 并显示它  
gtk4之后都是默认的暗色主题了, 因此你会看见一个暗调窗口  

在App启动之后的某一时刻, `activate` 信号对应的虚函数被调用  
不过我们已经将它覆盖成自己的 `build_ui` 了  

你会发现, 写代码的事情其实并不多, 重点在于理解背后的原理  

至此, 本小节结束~  
又要愉快地鸽鸽鸽了呢 :)  