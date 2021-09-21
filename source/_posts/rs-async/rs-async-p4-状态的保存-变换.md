---
title: rs-async-p4-状态的保存/变换
abbrlink: rs-async-p4
date: 2021-09-12 14:50:14
top: 9996
tags: rust
categories: rust-async
---
> 浅显的原理第一篇: 状态的保存/变换
<!-- more -->
# 开篇
**注: 参考了 《Writing an OS in Rust》中的async篇, 可以自己搜索下看看**  
为了更好地理解 `Rust异步` 背后的原理, 我们先来了解下一些概念  
当然, 不用太深入, 只是小补充而已:   
- `抢占式/协作式多任务`  
- `状态机`  
- `自引用结构体`   


现在, 让我们开始吧!  
- - -
# 抢占式/协作式多任务的概念  
`抢占式多任务` 与 `协作式多任务`, 都属于 `多任务`         

- 抢占式多任务:  
操作系统决定CPU的运行权  
比如, 操作系统先让 网易云音乐 运行一会, 再让 VSCode 运行一会  
各个程序中的任务们, 运行时间很短, 但切换速度也很快, 造成一种 `任务们同时运行` 的感觉  
这是强迫/抢占的     

- 协作式多任务:  
任务们本身进行协调, 决定CPU的运行权  
比如Rust中, 运行时调用 某Task(top-level Future) 的 poll方法 阻塞时, 返回 Poll::Pending  
自己放弃继续执行, 并通知运行时执行 其他Task  
这是自愿/协作的, Task们 `自愿放弃CPU的执行权`
(上文中的 `任务` 与 `Task` 请区分一下, 前者比后者广泛, 后者在这, 用于Rust的举例)  

- - -

# 两种多任务的恢复/状态保存  
既然任务们能互相切换执行, 那么, 当再次轮到某任务执行时  
该任务, 应当从先前暂停的地方开始, 继续执行  
因此我们应当备份某任务的先前状态, 以便于之后的继续执行, 这就是 `状态保存`  

对于 `抢占式` 与 `协作式`, 处理 `状态保存` 的思路是不一样的:

## 抢占式:  
因为是强迫切换执行的, 任务会在任意某个时刻被中断  
任务此时运行到了哪里? 我们不知道啊!  
那么, 就只好将任务的所有状态全部保存, 包括调用栈(call stack)    

反正, 你只需明白, 操作系统强制切换任务, 为每个任务分配相对公平的执行时间  
但是, 代价也有, 比如不得不为每个任务保存它的所有状态, 内存开销大  

## 协作式:  
因为是自愿/协作地切换执行, 每个任务会在哪里放弃执行都是清楚的  
这种放弃执行权的操作, 我们称为 `yield`    

比如在Rust中, `xxx.await` 会执行一个Future  	
意味着当程序执行到这里时, 可能会 `yield` (poll 返回 Poll::Pending, 自愿放弃执行权)  

`xxx.await` 就是一个 `stop/yield point`, 代表执行到此处时, 可能会发生暂停并yield  
瞧, 所有可能yield的地方你都知道, 这就方便了保存状态(你可以舍弃已经不需要的中间变量)  
因此, 我们可以准确分配 Future 执行所需要的最大空间  

其实, 每个 `.await (也就是yield point)`, 就代表着 `一种状态` (之后会讲)

协作式 的好处在于便于掌握所有的 yield point  
在暂停之前, 准确保存 `下次继续所需要的状态`, 内存/性能优势很大    
但坏处也有, 因为这是自愿/协作的, 当某个任务出现Bug, 永不放弃执行权, 其他任务便无法执行  
- - -
# 状态机的概念  
在Rust中的异步, 我们之前也说过, 属于 `协作式多任务`  
而其 `状态保存` 的实现, 就是利用 `状态机(state machine)` 来实现  

`状态机 (state machine)` 一般指 `有限状态自动机`, 是一种 数学模型  

1. 状态 (state):  
比如有一扇门, 它的状态就处于以下两种之一: Open or Closed    

2. 事件 (event):  
某事件 发生后, 会触发相应 动作, 可能改变状态, 比如: 用钥匙锁门(event) => 关门(action) => 门被锁住(state)   
3. 动作 (action):  
事件 发生后, 会触发 动作  
4. 变换 (transition):  
`State_X => State_Y` 就叫 `变换`, 比如门的状态从 `Open => Closed`  

稍微了解下 `状态机` 的概念即可  

那么现在, 就要看具体代码了  

如果你想亲自运行一下, 先确保你的 `Cargo.toml` 中的依赖如下:  
```toml
[dependencies]
async-std = {version = "1", features = ["attributes", "unstable"]}
```

如下, 读取一个文件的行数  
你可以使用 `cargo run -- ./src/main.rs` 运行  
(也可以编译后, 通过 `target/debug` 下的二进制文件运行)
```rust
use {
	std::env::args,
	async_std::prelude::*,
	async_std::fs::File,
	async_std::io::{self,BufReader},
};

#[async_std::main]
async fn main() -> io::Result<()> {              // Start
	let path = args().nth(1).expect("Fuck you! No path for working"); 
	let file = File::open(path).await?;          // Yield point
	let lines = BufReader::new(file).lines();
	let count = lines.count().await;             // Yield point

	println!("This file contains {} lines",count);
	Ok(())
}                                                // Done
```
mian() 产生一个新实例, 异步运行 `open(path)` 与 `count()`  	    
对于编译器, 每一个 `.await` 其实都代表一种状态  

Future实例, 实际上是个 状态机  
在这里共有四种状态/阶段 (其中包括两个 `.await point(yield point)`):  

1. Start: 此Future刚开始执行  
2. Yield1: 第一个 yield point
3. Yield2: 第二个 yield point
4. Done: 此Future执行完毕

这些状态的含义是: `表示当前Future执行到了哪一个阶段`  
执行器调用 当前Future 的 poll 推动进度时, 若在 `某一阶段` 返回了 `Poll::Pending`, 则放弃执行权  
当再次调用 当前Future 的 poll 推动进度时, 则从上次暂停的状态 `恢复 (resume)`, 继续执行  

官方目前似乎采用 `Generator (生成器)` 为异步语法生成状态机  
每一个状态都会存储一些数据, 便于进入下一个状态  

**Note 1**:  
Start状态, 会存储传入函数的参数 (如果有参数)

**Note 2**:  
Done状态下, 若进行 resume, 则可能得到 panic!  
恢复已结束的计算是不应该的  

**Note 3**:  
怎么判断每个状态需要保存哪些变量? 很简单的一句话:  
`某个yield point之前定义, 且point之后还需要使用的变量`  
如上段代码中的 `file`, `count` 就需要被保存, 因为从暂停中恢复后还需要使用  
其他的变量, 是一次性执行完的, 不会出现什么暂停一下, 等会继续的现象  
所以不需要特殊的持久化操作


- - - 
# 自引用结构体  
## 状态保存引用时
当每一个状态存储数据时, 可能会导致发生 `自引用`, 比如:  
```rust
async fn example() -> i32 {                            // Start
    let arr = [1, 2, 3];
    let element = &arr[2];
    write_file("foo.txt", element.to_string()).await;  // Yield1
    *element                                           // Done
}
```
这里有三个状态: `Start`, `Yield1`, `Done`  
而在 `Yield1` 这个状态, 存储的数据如下:
```rust
// 状态的定义
struct Yield1State {
    arr: [i32; 3],
    element: *const i32, // 数组最后一个元素的地址
}

// 状态的实例
Yield1State {
    arr: [1,2,3],
    element: &arr[2] as *const i32,
}
```   

等等, 你可能会对上面的代码有疑惑:  
不是说, 状态 只需要保存 `在yield point之前定义, 并且该point之后还需要使用的变量` 吗  
上面的代码, 只有 element 这个 引用 需要被保存吧?  

这是因为, 它是 `引用` 嘛!  
没了 `引用` 背后的实际数据, 那它还有啥用, 不就是 `悬垂引用` 了吗?  

因此我们还得保存, `该引用` 指向的背后数据: `arr`  
并 `一起` 存储在同个 `struct (代表同一状态)`中  


像这种 `结构体内部的指针, 指向结构体本身`  
就叫 `自引用结构`  

比如上面代码: 同一结构体下, 成员 element 指向了成员 arr  

## 内存移动问题(导致悬垂引用产生)
这就可能有问题发生, 如果 该struct实例 的 `内存地址发生改变`  
比如使用 `std::mem`, 让 struct实例 的内存地址, 发生移动  

以上面的那段代码为例, 如下:  
- arr:  
内存地址会跟着结构体实例而改变  
但是, `值仍然是 [1,2,3]`

- element:  
内存地址会跟着结构体实例而改变  
但是, 值仍然是 `先前arr的地址`  
`注意, 是先前的 ! 而不是后来arr的新地址`

这就产生了一个问题: 引用可能是失效/错误的 (悬垂引用)  

官方提出了 `std::pin::Pin (trait)`  
来解决 自引用结构体 方面的 悬垂指针/引用问题 

其实你听名字也很好理解:  
`Pin(中文意思是钉子)` 的作用是, 防止内存地址发生改变 (给爷钉死吧!)  

但是它又是怎么pin住的呢?  
下一节再慢慢讲吧  

那又是一个值得探讨的话题了  
欲知后事如何, 且听下回分解  

~~(疯狂省略, 因为我累死了, 多么希望赶紧结束这一P啊 ! !)~~
- - -
感谢大家观看! 有建议/发现错误/想聊天  
请在评论区留言, 或者加本人qq也阔以