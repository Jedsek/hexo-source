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
`重复 (Repetition)` 是宏中无比重要的语法  

该语法, 可以重复一段模式(一些Token), 出现在以下两个地方:  
- Matcher: 将一段指定的模式, 重复地匹配与捕获
- Transcriber: 将一段指定的模式, 重复地展开

~~(废话, Rust的声明宏不就两个主要的部分嘛)~~

