---
title: rs-dm-p3-声明与使用
abbrlink: rs-dm-p3
top: 9897
date: 2021-09-20 20:06:15
tags: rust
categories: rust-decl-macro
---
> 正式系统的关于 macro 的 声明与使用
<!-- more -->  
# 框架建立
前一节, 我们大概清楚了 macro 的结构  
现在让我们再来简单复习一遍:  
1. `macro_rules! (这是特点语法)` 来创建一个 macro
2. `rule(s) (匹配分支, 以 "参数 => 展开代码" 的形式)` 放在最外层的花括号内  
3. 调用宏时, 宏名 + 感叹号 + 括号内传参, 比如 `println!()`  

现在稍微深入一点:  
一个 `rule` 可以被这样抽象地表示 : (matcher) => (transcriber)   
它由三个重要的部分组成:
- `matcher (匹配器)`: 用来匹配传入的参数  
- `metavariable/literal (元 变量/字面量)`: 绑定传入的参数到变量上, 出现在 `matcher` 中
- `transcriber (转录器)`: 用来在宏匹配成功后, 进行代码替换

以 `println!` 为例子, 我们向其传入了一些参数, 它给我们打印到标准输出上  
因为原本的 `println!` 涉及到 `卫生性`, `重复语法`, `路径作用域` 等, 不适合新鸟阅读, 所以我抽象了它: 
```rust
macro_rules! println {
    (/* 空参匹配 */) => (/* `换行` 的代码 */);
    (/* 有参匹配 */) => (/* `打印参数 + 换行` 的代码 */)
}
```
`println` 由两个 `rule` 组成, 每个的形式都是: `matcher => transcriber`  
从上往下, 每个 rule 的 `matcher` 会与传入参数尝试匹配, 匹配到, 就替换为 `transcriber` 里面的代码  
所有 `matcher` 都无法与 `传入参数` 进行匹配, 则报错  

同时, `matcher` 与 `transcriber` 的括号, 分别可以是 (), [], {} 三种之一  
即, 对于一个rule, 它可以是: `(pattern) => (expansion)`, 也可以是 `[pattern] => {expansion}`  
在调用时, 包裹参数的括号也可以在这三种之一切换, 比如 `vec![0, 1,2,3` 与 `pritnln!("xx")`

而 `metavariable/literal` 则出现在 `matcher` 中, 用于匹配并捕获 代码片段  
在对应的 `transcriber` 中, 则可以操控这些 `元值`, 即操控 捕获到的代码片段  

稍微有点蒙? 我也没让你背哟, 多看多用就会了  
- - -
# 两种宏参数
是时候引入一些新的东西了, 顺便加深下你的印象  

## 元变量(Metavariable)
让我们来看个例子:  

```rust
macro_rules! my_macro {
	($a: expr) => {
		$a
	};

	($a: expr, $b: expr) => {
		$a + $b
	}
}

fn main() {
	my_macro!(1);
	my_macro!(1, 2);
}

/* 宏全部展开后, 可以理解为下面: 
fn main() {
    1;
    1 + 2;
}
*/
```

你会注意到, 每个 rule 之间的参数, 其声明都有点奇怪:  
比如 `$a:expr` -> `$ + 参数标识符 + 类型`  

`$` 这个前缀干嘛的?  
这显式地说明了, 它是 `metavariable`, 可以匹配并捕获相应类型的代码片段, 这里会捕获表达式  
至于为何要特意加$前缀来说明, 本节下面就要讲到啦, 别着急~  

来看看 `expr` 这个后置的类型:  
`expr`, 全称为 `expression (表达式)`  
在第一次宏调用, 我们传入了 `1 (i32类型的字面量)`, 这当然是个表达式, 会与第一个 rule 成功匹配  
这时, `my_macro!(1)` 这个部分, 就会被替换为 `相应的展开代码`  
(matcher(匹配器), metavariable(元变量), transcriber(转录器) 都用到了)    

简单来讲, macro 的本质, 就是匹配捕获传入参数, 将调用部分 替换/展开 为相应代码  
macro 不就是个代码生成器, 一段用来生成代码的代码吗  

注意: macro实际上是将传入部分解析为一个AST节点, 然后替换/展开调用部分, 变成一个AST节点  
在本节下面的本质篇, 会更详细地讲讲

## 元字面量(Metaliteral)
为了加深印象与引出 `metaliteral` , 我们来玩个对应游戏:  
```rust
($a: expr) => {$a};                     // the first rule
  |             |  
  |         	|
( 1      )      1                       // pass && expand 



($a: expr, $b: expr) => { $a + $b};    // the second rule
  |      |  |              |    |
  |      |  |              |    |
( 1      ,  2      ) =>    1 +  2      // pass && expand
```

我使用 `|` 来联系 `形参 -- 实参`  
你会惊讶的发现, 传参时的对应关系们, 除了 `$a -- 1` 与 `$b -- 2`, 还有个 `, -- ,`  

其实, 你往括号里传入的东西, 都是参数 (除了空格)  
对于第二个rule, 它的定义中, 分割两个expr的逗号本身, 也是形参  
这种固定的参数, 如同token中的字面量一样  
我姑且称它为 `Literal Token(字面量标记)`, 或者 `Metaliteral (元字面量)`
(因为我也不知道有什么对应术语, 所以用了 "姑且", 知道的麻烦告诉我)  

因此, 假若 rule 中的参数没有 $前缀 进行区分:  

```rust
macro_rules! fuck {
	(a:expr) => {
		
	};
}
fn main() {
	fuck!(1);       // No
	fuck!(a:expr);  // Yes ~~(Oh~)~~
}
```

`a:expr` 的类型为 `tt`, 而非 `expr`, 只能传入固定形式的 `a:expr` 才发生匹配 (即它是 `MetaLiteral`)
是不是感觉一切都特别狗日?  

切记:  
`当你想在传参时, 绑定一段代码片段, 参数名前必须加上 $前缀 进行修饰`  

`Meta variable/literal` 到底有啥用? 你用着用着就明白了......  
但我可以提一嘴: ~~(为了自由)~~ 可以方便DSL/生成代码
接下来, 我们用一个例子, 来说明两者的缺一不可:  

## 例子
假设有这么个宏 `map!` (有没有想到 `vec!`)  
它能根据 `=>` 判断出 `Key/Value`, 然后生成一个 `HashMap`  
如下:  

```rust
fn main() {
	let m = map![
		"吉良吉影" => 33,
		"空条承太郎" => 41,
	]
	// `m` 的类型为: std::collections::HashMap<&str, i32>
}
```

我们来写一个这样的宏吧!  
不过我们还未学习 `重复语法`, 无法写出接收可变参数的 `map!`, 所以现在只讨论简陋版:  

```rust
macro_rules! map {
	($key:expr => $val:expr) => {{
		let mut m = std::collections::HashMap::<_,_>::new();
		m.insert($key, $val);
		m
	}};
}
fn main() {
	let m = map!("普通上班族" => 33);
	println!("{:?}",m);
}


/* 展开后, 可以看作是:
fn main() {
    let m = {
        let mut m = std::collections::HashMap::<_,_>::new();
        m.insert("普通上班族", 33);
        m
    };
    println!("{:?}",m);
}
*/
```
这就是一个简陋的DSL, 你定义了创建HashMap的新语法: `Key => Value`  
来看看两种宏参数在宏中, 发挥着怎样的作用:  
- `Metavariable`: 将捕获的传入的代码片段绑定到自身  
并在 `Transcriber` 中被使用, 最后展开为新代码  

- `Metaliteral `: 限定了匹配, 传入的代码片段, 必须以 => 分割, 才能成功匹配
若改成 `map!("普通上班族", 33)`, 则每个rule的 `Matcher` 都无法匹配上  
(这里只有一个rule, 空匹配的懒得放里面了)  

其实说了这么多, 简单讲就是一个对应游戏, 对应上的话, 就会替换为一些代码  
考虑的事: 匹配的语法美不美观, 简不简单, 然后将复杂的代码隐藏, 就这样而已  
(之后会讲几个实战: 比如B站视频中已经讲过的递推序列生成器, 博客的话, 我周六放学回来慢慢更吧......)
- - -

# 本质 (AST 与 Token)
(如果还是不理解, 可以随便找个编译原理教程, 自己看看前几节即可)  
(或者看看我B站的视频, 视频讲得比较浅, 比较通俗)  

假若由你来设计一个Rust编译器  
首先, 不同的人写代码的风格不同, 那么你如何分析不同源码, 并生成目标码?  

若我们将每遍扫描并做点事情的过程, 称为 `pass`  
pass 一次就生成了, 对于很大的源码来说, 这不现实吧  

那我们就pass多次, 将 `从源码编译为目标码` 这个大问题, 分解为一大堆小问题  
每一次pass都解决一个小问题, 那不就Ok了吗

这种 `中间表示`, 就称为 `IR (Intermediate Representation )`  

我们可以先把源码抽象为AST (源码被抽象后的树状表示, 抽象语法树, Abstract Syntax Tree)  
比如我们用Rust的enum表示一下:  

```rust
// 该枚举: 一个AST节点可以是整数, 或者一个二元运算  
enum ASTNode {
	Int(i32), 
	BinaryExpr {
		op: Op,
		lhs: Box<ASTNode>,
		rhs: Box<ASTNode>,
	}
}

// 二元运算的符号: 这里只抽象了加法
enum Op {
	Plus, 
}
```
你只需明白AST是对源码的一层抽象产物就可以了  

对于很少的源码, 已经可以直接转换为目标码了, 毕竟这时候AST也小  
但是, 如果源码很大呢? AST已经很复杂了
那就再抽象一层吧, 向目标语言逐渐靠拢, 比如向汇编靠拢, 提高性能  

基于AST, 我们可以再来一些 `IR`, 层层递进, 以达目的  
注意, 是一些, 而不是一个, 这很好理解, 因为一层可能还是不够嘛  

`AST` 很重要, 是生成目标码的关键, 是代码的骨架  
而另外的IR, 也是有必要的, 这也增强了可维护性  
编译器在AST的基础上, 最终生成了目标码  
(像Lisp之类的比较特殊, 源码就已经形如AST, 可能很多人写的第一个编译器就是Lisp了......)  

生成AST需要点啥? 或者说, 它由什么组成?  
由 expr(表达式), stmt(语句), ;(标点符号) 等组成  
这些都叫做 `token`  

在这些小玩意的基础上, 组成一个更加庞大复杂的整体结构  
它将token们联系起来, 表达了代码的骨架  
这个庞然大物便是 AST 了  
- - - 
# 回到Macro  
## Token类型表
生成AST需要Token协助  

macro 中, 其参数的类型, 便是token类型  

既然macro是要操控这些传入的token (或AST节点, 等会讲), 我们总得知道token类型吧?  
只有规定宏参数的类型, 才能保证macro达到我们想要的目的 (这里指 `Metavariable`)  

所以, 辛苦你将下面的记一下  
稍微记下, 有印象即可, 多用几下保证你熟悉得不行:  

- `ident` -> 标识符, 如函数名字, 变量名字, 关键字  
- `stmt` -> statemen, 语句
- `expr` -> expression, 表达式, 如 `x` 与 `1_i32`
- `literal` -> literal expression, 字面量表达式, expr的子集
- `block` -> 代码块  
- `pat` -> pattern, 比如在match表达式下的 (pattern) => todo!(),
- `path` -> 路径, 注意这里不指文件路径, 而是类似 std::io::stdin 的路径
- `ty` -> type, 如i32, u32, String, Option<T>等  
- `tt` -> token tree, 之后我会单独再讲解下它的  
- `item` -> 条目/项, 例如函数定义  
- `meta` -> 元条目/项, 比如#[allow(unsued)], meta就对应allow(unused)
- `lifetime` -> 生命周期  
- `vis` -> visibility, 可见性, 比如pub等, 也可能为空  

## TT
这里有个比较特殊的类型 `tt`:  

`tt (Token Tree)`, 可以捕获 `Single Token`, 或者由 (), [], {} 及括号包裹起来的东西  
让我们来点例子吧:  
```rust
macro_rules! aa {
    ($a:tt) => {
        println!("{}", stringify!($a));
    };
}
fn main() {
	// Single Token
    aa!(123);          // Yes: 123
    aa!(FuckYou);      // Yes: FuckYou
    // aa!(Fuck You);     // No
    // aa!(123 + 11);     // No

	// (), [], {}
	aa!([123]);        // Yes: [123]
	aa!({123 + 123});  // Yes: { 123 + 123 }
}
```

## AST节点

macro 会将传入的token, 一个个解析为对应类型的AST节点 (除了少量token类型, 等会细讲)
比如 `map!` 中, `$key:value` 与 `$val:expr`, 都会被解析为expr类型的AST节点:  
```rust
macro_rules! map {
	($key:expr => $val:expr) => {{
		let mut m = std::collections::HashMap::<_,_>::new();
		m.insert($key, $val);
		m
	}};
}
fn main() {
	let m = map!("普通上班族" => 33);
	println!("{:?}",m);
}


/* 展开后, 可以看作是:
fn main() {
    let m = {
        let mut m = std::collections::HashMap::<_,_>::new();
        m.insert("普通上班族", 33);
        m
    };
    println!("{:?}",m);
}
*/
```

我们通过使用 macro , 站在了更抽象的视角上  
操控传入的token(或解析token后形成的AST节点), 组成新AST节点(生成新代码), 最后再一起形成目标码  

这有时会大大简化手写代码量, 如std中, 向宏传入些类型, 能自动生成为这些类型实现trait的代码

值得注意的是, 宏将传入参数给AST节点化时, 有时意味着会产生不期望的结果  
我直接用 [宏小册](https://www.bookstack.cn/read/DaseinPhaos-tlborm-chinese/mbe-min-captures-and-expansion-redux.md) 上面的代码了:  
```rust
macro_rules! capture_then_match_tokens {
    ($e:expr) => {match_tokens!($e)};
}
macro_rules! match_tokens {
    ($a:tt + $b:tt) => {"got an addition"};
    (($i:ident)) => {"got an identifier"};
    ($($other:tt)*) => {"got something else"};
}
fn main() {
    println!("{}\n{}\n{}\n",
        match_tokens!((caravan)),
        match_tokens!(3 + 6),
        match_tokens!(5)
    );
    println!("{}\n{}\n{}",
        capture_then_match_tokens!((caravan)),
        capture_then_match_tokens!(3 + 6),
        capture_then_match_tokens!(5)
    );
}
```

输出结果会是:  
```rust
got an identifier
got an addition
got something else

got something else
got something else
got something else
```

比如这里, `match_tokens` 捕获token, 然后将参数解析为一个expr类型的AST节点  
它不再是token, 而是个AST节点了!  

比如 `5 + 7`, 原本是可以与 `$a:tt + $b:tt` 相匹配, 也可以与 `$a: expr` 匹配
但是经过二次传入(向 `capture_then_match_tokens` 传入的参数又传给 `match_tokens`) 后  
`5 + 7` 变成AST表达式节点, 只能与 `$a: expr` 匹配, 而不能与 `$a:tt + $b:tt` 匹配  

只有 `tt`, `ident`, `lifetime` 能免遭 AST节点化  
好好理解下这块  
## 匹配误区/歧义限制
在我们传参时, 有个很常见的误解, 与为了以后宏的发展而有的限制  
可以去看看 [宏小册](https://www.bookstack.cn/read/DaseinPhaos-tlborm-chinese/mbe-min-captures-and-expansion-redux.md)
### 匹配误区
来看看下面一段代码:
```rust
macro_rules! aa {
	($a: expr) => {};
	($a: ident +) => {}
}
fn main() {
	aa!(a);   // Yes
	aa!(a+);  // No
}
```

按照你的直觉, `aa!(a+)` 应该会与第二个 rule 相匹配  
但是实际上会报这么一个错误:
```rust
expected expression, found end of macro arguments
// 期望表达式, 却发现宏参数结束了
```

你会发现实际上都是在与第一个rule尝试着进行匹配:  

`a (lhs, left hand side)` 能被第一个rule匹配  
而 `+ (二元加)` 因为可以尾随表达式, 也可以被第一个rule匹配
但由于缺少 `rhs`, 此时会直接报错, 而不是去尝试匹配下一个rule  

这避免了某些情况下, 发生不期望的匹配, 但你却不知道, 因此rule的顺序很重要  
### 歧义限制  
由于一些歧义, 为了向后兼容性与不破坏代码  
当前对 `Metavariable` 后面可以跟的内容有所限制  
详情可以去看 [Rust-Reference](https://doc.rust-lang.org/stable/reference/macros-by-example.html#follow-set-ambiguity-restrictions)  








