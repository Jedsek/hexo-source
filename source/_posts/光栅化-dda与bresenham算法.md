---
title: 光栅化-对直线的dda与bresenham算法
abbrlink: posts/rasterization-dda-bresenham
hidden: false
date: 2022-12-26 17:35:10
top:
tags:
keywords:
katex: true
mathjax: true
---
关于 光栅化(rasterrization) 中的 DDA 与 Bresenham 两种算法
<!-- more -->

# 光栅化

首先我们要明白一些常识:  计算机是如何显示图像的?  
答案很简单, 用电子枪发射电子, 通过电磁场偏转来控制其方向, 打在屏幕上, 进行高速扫描(scan), 即电子束从左往右, 从上往下发射  
只要在短时间内多次进行扫描, 利用人眼的视觉暂留效果, 让图像, 即上色的像素集合 "显示" 出来  

RGB 三原色, 位深分别为 8bit, 即 1byte, 就能构成 (2^8^ * 2^8^ * 2^8^) 种组合, 是爆表多的颜色种类啊  
只要将一束电子, 变为三束电子, 分别掌管 RGB, 瞄准显示屏上的特定一小块, 就有绚丽多彩的颜色了, 我们称其为, 像素(pixel)  

同时, 这里有两个概念要区分一下:  
- 片元(fragment): 物理层次上的显示屏上的一小块/一小单元, 概念上更加客观些
- 像素(pxiel): 已经被染色的图片单元, 概念上更高级更抽象些, 以片元为载体

光栅(Raster), 德语中 "屏幕" 的意思, 光栅化自然就是指把什么东西渲染到屏幕上的过程咯  
可以简单理解为, 光栅化就是在研究, 在屏幕上绘制像素的过程

下面将介绍两种将直线给光栅化的算法, 不要担心, 难度不大, 只需要初中级别的数学水平即可  
并且假设你已经知道for循环, function, 赋值等编程中的基本概念

- - -

# DDA算法
DDA(Digital Differential Analyzer), 数字微分分析法, 可别被这名字给吓到了, 实际上这是很容易理解的  
假设有

$$
\left\{
\begin{array}{ll}
K_{1}=z_{k},&L_{1}=f(x_{k},y_{k},z_{k}),\\
K_{2}=z_{k}+\frac{h}{2}L_{1},&L_{2}=f\left(x_{k}+\frac{h}{2},y_{k}+\frac{h}{2}K_{1},z_{k}+\frac{h}{2}h_{1}\right),\\
K_{3}=z_{k}+\frac{h}{2}L_{2},&L_{3}=f\left(x_{k}+\frac{h}{2},y_{k}+\frac{h}{2}K_{2},z_{k}+\frac{h}{2}L_{2}\right),\\
K_{4}=z_{k}+hL_{3},&L_{4}=f\left(x_{k}+h,y_{k}+hK_{3},z_{k}+hL_{3}
\right).\\
\end{array}
\right.
\tag{4}
$$



- - -

# Bresenham算法