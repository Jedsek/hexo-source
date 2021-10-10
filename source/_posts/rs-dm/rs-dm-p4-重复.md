---
title: rs-dm-p4-重复
abbrlink: rs-dm-p4
top: 9896
date: 2021-10-09 22:36:00
tags: rust
categories: rust-decl-macro
---
> 宏中非常重要的语法: 重复 (Repetition)
<!-- more -->
# 介绍
`重复 (Repetition)` 是宏中无比重要的核心级语法, 想发挥宏的强大就必须用到它  

该语法, 可以重复一段模式(一些Token), 出现在以下两个地方:  
- Matcher: 将一段指定的模式, 重复地匹配与捕获
- Transcriber: 将一段指定的模式, 重复地展开

~~(废话, Rust的声明宏不就两个主要的部分嘛)~~


# 语法
假设你要设计一个宏, 模拟下面代码的传参时语法, 传入一些数字(不确定个数), 然后获取求和结果:  
```rust
// Examples:
assert_eq!( 0,  sum!() );
assert_eq!( 15, sum!(1,2,3,4,5) );
```

对于固定个数的传参参数, 我们可以这样:  
```rust
macro_rules! sum {
    () => {0};
	($a: expr) => {$a};
    ($a: expr, $b: expr) => {$a + $b};
}
```

但问题是参数不固定, 因此我们应该用到重复语法:
```rust
macro_rules! sum {
    () => {0};
	($($a:expr),*) => {
		0 $(+ $a)*
	}
}
fn main() {
	sum!();          // 0
	sum!(5);         // 5
	sum!(1,2,3,4,5); // 15
}
```



