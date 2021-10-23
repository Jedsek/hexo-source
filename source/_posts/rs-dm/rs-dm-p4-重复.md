---
title: rs-dm-p4-重复
abbrlink: rs-dm-p4
top: 9896
date: 2021-10-09 22:36:00
tags: rust
categories: rust-decl-macro
---
> 宏中非常重要的语法: 重复(repetition)
<!-- more -->
# 介绍
`重复 (Repetition)` 是宏中无比重要的核心级语法, 想发挥宏的强大就必须用到它  

该语法, 可以重复一段模式(一些Token), 出现在以下两个地方:  
- Matcher: 将一段指定的模式, 重复地匹配与捕获
- Transcriber: 将一段指定的模式, 重复地展开

~~(废话, Rust的声明宏不就这两个主要部分嘛)~~  

假设你要设计一个宏, 模拟下面代码的传参时语法, 传入一些数字(不确定个数), 然后获取求和结果:  
```rust
// Examples:
assert_eq!( 0,  sum!() );
assert_eq!( 15, sum!(1,2,3,4,5) );
```
  
让我们来看看, 如何使用重复吧

# 语法  
关键在于参数的个数不确定, 因此我们应使用重复语法:  
```rust
macro_rules! sum {
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

伪代码表示:  
```rust
$( Pattern )   Sep    RepOp
$(   模式   )  分隔符  重复符号
```

它可以被分为三个部分:  
1. 模式: 被包裹在 `$( )` 里面, 表面它被重复匹配捕获(在Matcher), 或重复展开(在Transcriber)  
2. 分隔符(Separator): 用来分割重复模式  
3. 重复符号(Repetition Operator): 对可以匹配多少次模式, 进行说明与限制, 不符合就编译报错  


以 `sum!` 为例子, 它在第二个rule中用到了重复:  
- In matcher: 
模式-> `$a:expr` 是重复的模式, 表示重复地匹配与捕获expr  
分割-> 每个模式之间用逗号分割, 表示传参时要传入逗号进行匹配  
次数-> *号, 说明了重复模式的个数, 它被限制为>=0  

- In transcriber: 
模式-> `+ $a` 是重复模式, 比如传入 `1,2,3,4,5` 时, 会被展开为 `0+1+2+3+4+5`  
分割-> 没添加分割符号, 表示展开时, 每个模式之间不会添加sep
次数-> 同 Matcher  

`$()` 与 `RepOp` 是必填的, `Sep` 是可选的  

RepOp 有三种可选项, 有点像正则:
- `*` 表示 模式匹配的次数 >= 0  
记忆法-> 该符号看上去像是一个点, 联想为0
- `+` 表示 模式匹配的次数 >= 1
记忆法-> 联想为正数, 那就>=1
- `?` 表示 模式匹配的次数 = 0 or 1  
记忆法-> 问号表示疑问, 代表 有 or 没有  

有一些注意点:  
1. 当 RepOp 为 ? 时, 不可以添加 Sep (因为最多也就匹配到一次, 你怎么分割?)  
2. Sep 是有限制的, [p3](https://jedsek.github.io/posts/rs-dm-p3#%E6%AD%A7%E4%B9%89%E9%99%90%E5%88%B6) 提到过, 详情可见 [rust-reference](https://doc.rust-lang.org/stable/reference/macros-by-example.html#follow-set-ambiguity-restrictions)

