---
title: Clap|命令行
abbrlink: posts/rust-clap/guide
hidden: false
date: 2022-08-16 20:03:34
top: 12999
tags: [Rust, Clap, CLI]
keywords: [Rust, Clap, CLI]
---
> 用 Rust 中的 Clap, 写个类似 GNU/wc 命令的 rwc 吧, 增加了进度条, 表格输出等功能  
<!-- more -->

前置知识: Rust基础  
完整代码: [github-jedsek/rustwc](https://github.com/Jedsek/rust-wc)

# 成品展示

![彩色的表格输出, 根据参数进行统计](/images/clap-rwc.png)

- - -

# CLI
CLI, 是 `command-line interface` 的简称, 意思是命令行界面, 和 GUI/TUI 是一个道理  
比如我们在Linux下常见的 `ls/cp/mv` 等命令, 你传进去参数, 它做一些事情 (可能会有相应的输出)  

GNU 项目为我们提供了非常多的开源软件, 比如一个叫做 `wc` 的命令, 可以统计指定文件的字节/字符/行的数量  
等一会, 我们就要使用 Rust 语言, 搭配今天的主角: clap, 实现美化版的 `wc` 命令  

::: tips
**注意:**  
cli 可以代表抽象的界面, 也可以指代具体的某个程序  
而后文中的cli, 一般情况下都指代某个具体的命令行程序, 比如 ls/cp 等
:::

- - -

# Clap
## 开篇
clap 是个Rust中地位举足轻重的crate, 它十分强大, 能让cli的制作变得很容易  
让我们新建一个叫做 `rwc` 的项目, 然后在 `Cargo.toml` 中添加clap吧:

```toml
[package]
name = "rwc"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
[dependencies]
clap = {version = "*", features = ["derive"]}
```

在 Clap-rs 的第三个大版本, clap 融合了另外一个很强大的库: structopt, 成为实至名归的第一  
因此以后请直接用 clap, 它包含 structopt, structopt 也发过通知, 让别人直接用 clap  
而clap最大的变化, 就是这来源于 structopt 的过程宏了, 它允许你用声明的方式定义参数, 然后自动帮你解析, 这就是 `derive` feature  

举个例子, 如果我们想定义 rwc, 那就这样写:

```rust src/main.rs
use std::path::PathBuf;
use clap::{AppSettings, ArgGroup, Parser};

#[derive(Parser)]
#[clap(
    author = "Author: Jedsek <jedsek@qq.com>",
    version,
    global_setting = AppSettings::DeriveDisplayOrder,
    group(ArgGroup::new("options")
      .multiple(true).required(true).args(&["bytes", "chars", "words", "lines", "longest-line"])),
    about = 
r#"
This is just a simple GNU/wc command implementation, written in Rust
It could print <FILE>'s count of bytes, chars, words, lines, and the longest line/word's length
"#,
)]
pub struct Cli {
    /// The path(s) you should provide
    #[clap(value_parser, value_name = "FILE", required = true)]
    pub paths: Vec<PathBuf>,

    /// Print the count of bytes
    #[clap(value_parser, short, long, action)]
    pub bytes: bool,

    /// Print the count of chars
    #[clap(value_parser, short, long, action)]
    pub chars: bool,

    /// Print the count of words
    #[clap(value_parser, short, long, action)]
    pub words: bool,

    /// Print the count of lines
    #[clap(value_parser, short, long, action)]
    pub lines: bool,

    /// Print the length of the longest line
    #[clap(value_parser, short = 'L', long, action)]
    pub longest_line: bool,
}

fn main() {
  Cli::parse();
}
```

等下再解释, 现在先让我们看看效果吧, 查看下help:  

```rust
cargo run -- -h
```

上面的 `--`, 起隔断的作用, 表示在这之后传入的参数, 是 `--` 前面的整体所形成的程序  
如果你去掉 `--`, `-h` 打印的就是 `cargo run` 的帮助信息, 而不是 `cargo run` 之后产生的程序, `rwc` 的帮助信息了  
之后的代码, 会保持这处 "传统"  

像 `-h/--help`, `-V/--version`, 这两个是 clap 自动为我们生成的, 之外的选项将什么也不会发生, 因为我们暂时都未实现  
输出的help应该如下:  

```rust
rwc 0.1.0
Author: Jedsek <jedsek@qq.com>

This is just a simple GNU/wc command implementation, written in Rust
It could print <FILE>'s count of bytes, chars, words, lines, and the longest line/word's length

USAGE:
    rwc <--bytes|--chars|--words|--lines|--longest-line> <FILE>...

ARGS:
    <FILE>...    The path(s) you should provide

OPTIONS:
    -b, --bytes           Print the count of bytes
    -c, --chars           Print the count of chars
    -w, --words           Print the count of words
    -l, --lines           Print the count of lines
    -L, --longest-line    Print the length of the longest line
    -h, --help            Print help information
    -V, --version         Print version information
```

如果仔细观察一下, 应该就搞懂之前的代码了, 毕竟是声明式的定义, 可以对照着看嘛, 而且 clap 的文档也很好, 可以自己去翻下  
如果你认为自己已经搞懂上面的代码, 不需要看下面的解释了, 请直接跳转到 [逻辑实现](#luo-ji-shi-xian) 部分  

- - -
# 逻辑实现
