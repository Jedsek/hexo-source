---
title: rs-async-p3-Future
comments: false
abbrlink: rs-async-p3
date: 2021-09-12 13:56:48
top: 9997
tags: rust
categories: rust-async
keywords: [async, 异步, Rust]
---
> Rust 中的 Future/async/.await 说明  
<!-- more -->  
# 开篇
大家好! 我们上一节已经知晓异步的基础概念   
现在, 来看看Rust中的异步语法吧    

在本节, 我们会知晓以下三个概念的大致含义:  
(暂时不涉及背后原理, 原理之后专门出好几节来讲)   

- Future (trait)  
- async (keyword)
- .await (keyword)

开始旅途吧  
- - -
# Future
## 概念
`Future`, 一个标准/核心库中的trait  
其完整路径为 `std/core::future::Future`   

此节我只会讲它的大致含义, 原理则放到后面几节专门来讲 ~~(原理太难, 一节根本不够)~~  


在Rust中, 一个实现了 Future(trait) 的类型  
该类型的实例 (有时候直接被简称为 一个Future实例) 便代表 一次异步计算  
可以将其交给 `Runtime(运行时)`, 从而异步执行   

`异步执行`, 也就是指:    
当其他 异步任务 阻塞时, 当前 异步任务 有机会执行  
或当前 异步任务 阻塞时, 其他 异步任务 有机会执行  
总而言之, 阻塞时期执行其他任务, 不给cpu空闲的机会


**注意两个名词的区别:**  
- `异步 计算`  
- `异步 任务`

两者有着区别, 举个例子你就明白了:  

  
假设有这么个 父计算, 由两个 子计算 组成:   
1. Open: 先异步打开一个文件(async open)  
2. Read: 再异步读取该文件(async read)   
 
我们可以看出, 一次 计算, 是可以由多个 子计算 组成的  
同时, 若 Open 陷入阻塞, Runtime 不能调度 Read 填充这段阻塞时期  
因为 `子计算们可能存在依赖关系` (在这里的例子中确实存在) 


因此, 当某个 子计算 阻塞时, 它所属的最顶层的 父计算 也会阻塞, 避免了 Runtime 调度非法计算  
(我们将 `最顶层的父计算 (top-level Future, 即最顶层的Future实例)` 称为 `Task(任务)`)  

`当前Task` 阻塞时, 接管执行权的, 不能是 当前Task 中的 `其他子计算`  
只能是 `其他Task中的子计算`  

来点总结吧:  
- Task 是一个顶层Future实例 (即一次顶层异步计算) 

- 一个Future可以由多个Future组成, 即一个Future里可以执行多个Future
- Task_A阻塞时, 接管执行的是其他Task中的子计算, 不能是Task_A中的子计算
- Task可以只是一次单独计算

`一个Future (一次异步计算)`  
可理解为, 是组成 `一个Task (一个异步任务)` 的最小单位 

了解到了那么一点点后, 现在来正式看看呗 ?  
## 定义  

让我们来看看它的定义:
```rust   
pub trait Future {
    type Output;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```
下面简单了解一下:  

- Future:  
代表一次异步计算  

- Output:  
代表 该Future, 异步执行完毕后, 产出的值的类型   
- poll:  
所有执行操作都会放在该函数中  
Runtime 会不断调用 poll函数 来推进 该异步计算 的完成  
每次 poll 的返回值是一个 枚举变体, 代表 是否完成
- Poll<T>:  
枚举类型, 作为 poll函数 的返回值类型, 其 变体 有:  
`Poll::Pending`:  
指明该计算处于阻塞, 调度程序在该计算阻塞完毕后, 继续调用 poll(因为之后可能还会阻塞)     
`Poll::Ready(T)`: 
指明该计算执行完毕, 并产出一个类型为T的值   

若只是普通使用者, 并不需了解 `Future的定义` 背后之原理  
但若不了解它, 又如何为某类型实现 Future 呢?  

别急, Rust 为我们提供了关键字 `async`, 接着往下看吧   
- - -
# Async  
`async`, 一个关键字  
用来创建 `一个匿名结构体的实例, 该结构体实现了Future`  
即, 它创建一个 `Future实例`  

来个例子, 看看 async 的好处:   

```rust
// 1 
async fn hello_str_1() -> String { 
	String::from("Hello! World!")
}


// 2 
struct HelloStr;

impl Future for HelloStr {
	type Output = String;
	fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
		let str = String::from("Hello! World!");
		Poll::Ready(str)
	}
}

fn hello_str_2() -> impl Future<Output = String> {
	HelloStr
}
```

你可以观察到, 使用 async 进行了符合直觉的简化  
这两种函数, 实际上是等价的  

看看它们两的返回值, 如下:  

```rust
// 1
async fn hello_str_1() -> String { 
	String::from("Hello! World!")
}
hello_str_1() // 返回值为 `impl Future<Output = String>`


// 2
fn hello_str_2() -> impl Future<Output = String> {
	HelloStr // Future<Output = String> 的实例
}
hello_str_2() // 返回值为 `impl Future<Output = String>`  
```


注意, 异步函数的调用, 只是返回一个 Future实例  
**但并没有开始执行, 它是惰性的**  
**只有调用Future的poll方法, 才能推动它的执行**  
**而调用poll方法的工作, 则交给了运行时(执行器)**  

这样的好处就在于:  
将一个异步计算看作一个变量, 方便了传参等工作  

比如, 你想舍弃某次 异步任务, 你只需要将 对应的Future实例 给 drop 掉, 使其所有权丢失即可

async 的作用就是创建一个 Future实例:  
- `async fn` 异步函数, 要求返回一个 Future实例   
- `async block` 异步代码块, 创建一个 Future实例  
- `async closure` 异步闭包, (目前是不稳定特性) 创建一个 Future实例  

```rust
// 1
// 返回值为 `impl Future<Output = String>`
async fn hello() -> String {
	String::from("Hello")
}

// 2
// 该代码块创建了类型为 `impl Future<Output = i32>` 的实例
async {
	let a = 1_i32;
	a
}

// `async block` 也可以使用move  
// 获得其中使用的变量的所有权  
let s = String::new();
async move {
	&s 
}
s; // Error: use of moved value

// 3
// 闭包因为不稳定, 我也懒得讲了......
```

创建一个Future实例, 想必大家已经了解一二  
但是如何执行一个Future实例?  

请接着往下看
- - -
# 执行
## 背景介绍  
Rust语言本身并不提供 `异步运行时 (async runtime)`, 以便于语言内核保持精小, 便于进化/迭代/维护  
异步运行时 由社区提供, 围绕语言本身提供的定义 (比如 Future) 进行支持/扩充, 来运行异步程序  

可以仔细看看 Future 的完整路径: std::future/core::Future  
注意到没有, 它也存在于核心库中 (核心库中对异步的支持, 并不只有 Future) 

这意味着只要你能使用Rust, 语言本身就会提供 Future 等定义  
再加上异步运行时是可选的, 凭借 `cartes.io` 上提供的异步运行时相关的carte  
在嵌入式环境下, 也能够轻松运行异步程序   

在正式开始之前
请确保你已经在 `Cargo.toml` 中添加了如下代码:   

```toml
[dependencies]
async-std = { version = "1.9", features = ["attributes"] }
```

以 `async-std` 这个比较主流, 对新人友好的 `异步运行时crate` 为例子   
我们指定了版本, 并且启用了 `attributes` 这个特性  

## Runtime执行

我们先来创建一个 `打印 "hello world" 的Future` 吧  
并且使用 `async-std` 这个异步运行时环境来执行它:   

```rust
use async_std::task;

async fn hello_world() { 
	println!("Hello wrold!");
}

fn main() { 
	let fut = hello_world();
	task::block_on(fut);
}
```
还记得我们在本节开始不久, 就提到过的 `异步任务 (Top-level Future, 即顶层的异步计算)` 吗?  
async_std::task, 该模块, 为我们提供了大量api, 来执行/操控 这些 `Task`  

比如这里出现的 `task::block_on`:  
传入一个 Future实例, Runtime 会执行它(调用poll方法), 并阻塞调用线程  
该任务执行完毕后产出的值, 会作为 `block_on` 的返回值  

我们执行了一个 Task, 并且这个 Task 是单个的 Future  
但若我们想执行由多个 子Future 所组成的 Task, 又该怎么办?  

`.await` 关键字出场了! 

- - -
# Await  
`.await` 只能出现在 `async fn/block` 内部  
在某个 Future实例 的后面, 增加 `.await`, 那么 `该Future实例` 则会执行  
但是, 它只是表述这么个逻辑而已, 因为Rust语言本身没有异步运行时(无执行能力)  
真正执行的话, 得将 Future实例 交给运行时, 带动着执行里面的 子Future   

来看看它的使用:  
```rust
use async_std::task;

async fn hello() {  
	print!("Hello ");
}
async fn world() {
	println!("world!");
}
async fn hello_world() { 
	hello().await;
	world().await;
}

fn main() { 
	let fut = hello_world();
	task::block_on(fut);
}
```

`.await` 是一个标记点, 可以理解为是一个 `yield point`  
Runtime 执行到 `xxx.await` 时, 先会执行一次 `xxx`  


一开始, 会调用一次poll函数, 推动执行进度  
通过它的返回值, `Poll<T>枚举的变体`, 即 `Pending` 或 `Ready(T)`  
来决定: 
1. 让 其他Task 接管执行权 (yield)  
2. 该Future执行完毕, 继续执行当前 Task  

若为 `Ready`, 则选 `2`, 继续往下执行 (一个 Task 可能是由多个 Future 所组成)  
若为 `Pending`, 则选 `1`, 让其他任务接管执行权 (比如IO操作的阻塞期间, 让其他任务执行)  

稍微有点涉及原理部分, 可能有点难理解, 来个简单粗暴理解版:  

`.await` 会指明 `执行某个Future` 这一逻辑  
当 `xxx.await` 所在的 Task 交给 Runtime 执行, 并执行到 `xxx.await` 时    
`xxx` 这个Future实例会执行  

若它阻塞 (这意味着 该Future所在的Task 也阻塞)  
所以调度程序安排 其他Task, 在该空档期执行  
若不阻塞, 就继续往下执行 (可能还有碰见 `.await` 哟), 直到 该Task 结束   

- - -  

# 补充
- `#[async_std::main]`  
这玩意无比常见, 是个属性宏, 要加在 main函数 头上  
使得 main 前面能被 async 所修饰  
程序运行时, main函数返回的 Future, 会自动交给 Runtime 开始运行, 如下:  

```rust
#[async_std::main]
async fn main() {
    hello_world().await
}

// 等价于:
fn main() {
    async_std::task::block_on( async {
        hello_world().await
    })
}
```


- `async_std::task::spawn`  
因为这玩意也很常见, 所以就讲一讲:  
向其传入 Future, 运行时会开始运行 该Task, 并返回 async_std::task::JoinHandle 的实例
它实现了 Future, 与标准库中的 `JoinHandle` 无比相似  
不过那个运行 Thread, 而这个运行 Task, `join` 相应地变成 `.await`  
想让 该handle代表的Task 运行完毕, 应该在 该handle 前放上 `.await`:  

```rust  
use async_std::task;
#[async_std::main]
async fn main() { 
    let handle = task::spawn(async {
        1 + 1
    });
    let two:i32 = handle.await;
}
```

