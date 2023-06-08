---
title: Rust那些常见的错误
abbrlink: posts/rust-common-errors
hidden: false
date: 2023-06-08 12:08:42
top:
tags: [Rust]
keywords: [Rust]
---
> 一起来见识下那些 Rust 编程语言中常见的错误吧!
<!-- more -->

**本文说明:**
本文会记录一下我本人遇见过的一些错误, 供大家参考, 喜欢或多或少能帮到大家  
错误来源于群聊或者个人开发  
开始吧! 时间...要加速了!! (jojo立, 神父换碟)  

**注意:**  
本文正在长期更新中, 你所看见的并非成品  


# 对模式匹配不敏感

```rust
use std::fmt::Display;

fn info<T: Display>(t: &T) {
    println!("{t}")
}

fn main() {
    // 报错
    let a: &str = "str_a";
    info(a);
    
    // 不报错
    let b: &&str = &"str_b";
    info(b);
}
```

如果你在 [rust-playground](https://play.rust-lang.org) 上运行这段代码, 会报如下错误:  

```
 --> src/main.rs:11:10
   |
   |     info(a);
   |     ---- ^ doesn't have a size known at compile-time
   |     |
   |     required by a bound introduced by this call
   |
help: the trait `Sized` is not implemented for `str`
note: required by a bound in `info`

  --> src/main.rs:3:9
   |
   | fn info<T: Display>(t: &T) {
   |         ^ required by this bound in `info`
help: consider relaxing the implicit `Sized` restriction
   |
   | fn info<T: Display + ?Sized>(t: &T) {
   |                    ++++++++
```

报错信息非常友善, 第一段说, 我们在调用 `info` 函数时, 参数的大小无法在编译器知晓  
随后提示帮助: `str` 没有实现 `Sized`, 即 `str` 的大小在编译期时无法求解  
道理很简单嘛, 我们在模式匹配的时候, `&str` 对应 `&T`, 所以说 `T` 的类型是 `str`  
又因为 Rust 中默认泛型 `T` 是 `T: Sized`, 所以自然报错了  

编译器还非常贴心地在第二段贴出解决方案, 那就是为 `T` 指明, `T` 可以是大小在编译期时不知晓的 `?Sized`  
毕竟 `T` 虽然是 `?Sized`, 但我们使用的参数 `t` 是 `&T` 嘛, 完全没有问题! 所以改成如下即可  

```rust
use std::fmt::Display;

fn info<T: Display + ?Sized>(t: &T) {
    println!("{t}")
}

fn main() {
    let a: &str = "str_a";
    info(a);
    
    let b: &&str = &"str_b";
    info(b);
}
```

Perfect!
