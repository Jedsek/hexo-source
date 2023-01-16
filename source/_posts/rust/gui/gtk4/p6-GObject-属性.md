---
title: "rust-gtk4-p6~> GObject: 属性"
abbrlink: posts/rust-gtk4/p6
hidden: false
date: 2022-12-10 23:39:26
top: 98994
tags: [Rust, GUI]
keywords: [Rust, GUI, GTK4]
is_series: true
series_link: rust-gui
prev_post: [posts/rust-gtk4/p5, "GObject: 通用类型"]
next_post: [posts/rust-gtk4/p7, "GObject: 信号"]
---
> 本节将学习 GObject 的 property(属性), 探索其强大且灵活的运行时
<!-- more -->

同系列传送门: [rust-gui](/categories/rust-gui)
GNOME入坑指南: [gnome](/posts/desktop-beautify/gnome)

# 说明  
属性(Property), 让我们能够访问 GObject 的状态(state)  

glib 虽然以面向过程的 C 为核心, 但却具有面向对象的思想, 属性自然是其中重要的一环  
通过库为我们提供的运行时, 我们得到了一个灵活的, 动态的运行时  

得益于此, 我们可以在程序的运行过程中, 动态地修改其属性, 比如:  
- 动态注册某个新的属性  
- 进行属性间的自动绑定  
- 属性变更时将执行操作 


如下的代码是一个修改 `Switch` 部件的 `state` 属性, 并在下一行获取其值的例子:  
(记得use一下相关的路径, 这里为了简略就没有写出来, 本节之后的代码也是同理)  

```rust
fn build_ui(app: &Application) {
    // Create the switch
    let switch = Switch::new();

    // Set and then immediately obtain state
    switch.set_state(true);
    let current_state = switch.state();

    // This prints: "The current state is true"
    println!("The current state is {}", current_state);
}
```

我们还可以用 `general-property` 来设置与获取属性, 与上一节的[通用类型](/posts/rust-gtk4/p5)相对应  
例子如下, 在获取属性时用 `turbofish` 语法来推导其类型:  

```rust
fn build_ui(app_&Application) {
    // Create the switch
    let switch = Switch::new();

    // Set and then immediately obtain state
    switch.set_property("state", &true);
    let current_state = switch.property::<bool>("state");

    // This prints: "The current state is true"
    println!("The current state is {}", current_state);
}
```

如果属性不存在/类型不正确/属性不可写(无write权限)等, 都会导致 `property`/`set_property` 恐慌(panic), 在大部分如上的硬编码情况下是可行的  
同样的, 如果你想设置多个属性, 可以用 `properties`/`set_properties`  

值得注意的是, 现在已经不存在 `try_property`/`try_set_property`, 因为导致错误的情况, 仅为上一段所述的几种  
不过截止目前, 官方教程还没有更新, 我已经提交了一个pr  

属性不仅可以通过 `getter`/`setter` 进行访问与修改, 还可以彼此进行绑定:  

```rust
fn build_ui(app: &Application) {
    // Create the switches
    let switch_1 = Switch::new();
    let switch_2 = Switch::new();

    switch_1
        .bind_property("state", &switch_2, "state")
        .flags(BindingFlags::BIDIRECTIONAL)
        .build();
}
```

`bi-directional` 的意思是 `双向`, 我们在这里进行了双向绑定, `switch_1` 的 `state` 已经与 `switch_2` 的 `state` 绑在了一起  
于是, 两个 `switch` 的 `state` 属性会一直保持一样, 修改其中一个, 另外一个也会被自动修改  


可以来自官方教程的动图, 当我们切换其中一个按钮的状态时, 另外一个会自动保持相同:  

<video id="video" preload="auto" loop=true autoplay=true>
      <source id="webm" src="/images/rust/gtk4/bidirectional_switches.webm" type="video/webm" height=80%>
</videos>

