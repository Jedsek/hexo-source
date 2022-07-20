---
title: "GNOME 入坑指南"
abbrlink: posts/GNOME
hidden: false
date: 2022-07-20 11:22:42
top: 10999
tags: [GNOME]
keywords: [GNOME, 桌面环境, DE]
---
> 关于 GNOME 的入坑指南, 让你了解, 配置, 美化桌面环境
<!-- more -->

::: tips
**提示**
本篇文章的配置皆在注重简洁, 高效, 美观, 想要平铺式/炫酷效果/更多功能的, 请自行配置  
请注意GNOME版本是否相符, 有少许地方或因版本差异而不同  
该篇文章的GNOME 版本为: **42**  
:::

# 成品展示
2022年了, 有些人的 GNOME, 还像是十年前的感觉...  
以下是成品展示, 我个人认为简洁+美观比较重要, 当然, 炫酷的效果也完全可以达到, 但我不喜欢, 自己动手吧!  


+++ **点击隐藏/展开图像**
![按下Super后的概览](/images/GNOME/overview.png)  
![用键盘跳转工作区后的指示](/images/GNOME/workspaces-indicator.png)  
+++

- - -

# dconf && gsettings
- `dconf`:
是一套基于键的配置系统, 十分高效, 相当于 Windows 下的注册表  

- `gsettings`:
是 GNOME-DE 下的高级API, 是命令行工具/前端, 用来简化对 dconf 的操作  
 

你可能在年份久远的文章中听说过 `gconf`, 这是什么? 与 `dconf` 有啥区别?  
答: 其作用也类似注册表, 但现在已经停止使用, 被效率更高的 `dconf` 所取代  

接下来的大部分配置, 都会使用 `gsettings`  

- - - 

# 触摸板
有一些 Linux 发行版的 GNOME比较贴近上游, `轻击模拟鼠标点击` 默认未开启  
这导致触摸板很难用, 得按下去才能模拟鼠标的点击  

你想一想, 你想选中一段文字, 得重重按下触摸板, 在巨大的摩擦力下移动手指...  
而且, 默认的触摸板, 速度可能比较慢, 反正我不适应, 因此需要修改...  
还有就是, 触摸板在打字的时候默认是禁用的, 这对有时会用触摸板打CSGO的我来说很愤怒...  

你可以在终端输入如下命令进行调整:  

```bash
gsettings set org.gnome.desktop.peripherals.touchpad tap-to-click true
gsettings set org.gnome.desktop.peripherals.touchpad speed 0.57
gsettings set org.gnome.desktop.peripherals.touchpad disable-while-typing false
```

分别对应:  
- `轻击模拟鼠标点击`, 默认为false
- `调整触摸板速度`, 默认为0
- `打字时禁用触摸板`, 默认为true

- - -

# 插件/扩展

- - -

# 美化

- - -

# 自定义快捷键

- - -

# 文件管理器

- - -


# 加载配置
我们可以通过 dconf 这个工具, 导入或导出记载着 GNOME 数据的配置文件  
你可以导出记载当前DE的配置文件, 然后导出到另一台机器上  
这意味着, 当你重装系统时, 按下面的方法能快速恢复到先前的DE  

## 对于非Nixos
对于普通的Linux发行版, 直接按下面的方式  

- 导出当前的dconf数据到某个文件:  

```bash
dconf dump / > dconf.settings
```

- 加载/导入某个dconf文件到当前系统:

```bash
cat dconf.settings | dconf load -f /
```

对于背景与头像, 你可以写一段脚本, 将其复制到相应位置, 然后再添加上面的代码加载配置  
同时确认 `dconf.settings` 中的 `picture-uri` / `picture-uri-dark` 指向对应文件  

## 对于Nixos

如果你使用 Nixos, 请先确保已经安装了 [HomeManager](https://github.com/nix-community/home-manager)  
HomeManager 是 Nixos 中用来管理用户配置, 支持回滚的工具  

虽然也能按上面的方法配置 Nixos 的 GNOME, 但还是推荐使用 HomeManager, 原因略过, 自看文档  
请先下载 `dconf2nix`, 这是一个将 dconf文件, 转换为 nix 表达式的工具  
随后, 在终端输入以下内容, 得到 `dconf.nix` :  

```bash
dconf dump / > dconf.settings
dconf2nix -i dconf.settings -o dconf.nix
```

在你的 ~/.config/nixpkgs 中, 保持这样的目录结构 (当然了, 可以随你想法):  

```bash
nixpkgs/
├── gnome
│   ├── .background
│   ├── .face
│   └── dconf.nix
└── home.nix
```

这里的 `dconf.nix` 就是刚刚转换得到的nix表达式, 在 `home.nix` 中导入它:  

```bash
imports = [
  ./gnome/dconf.nix
];
```


介于 HomeManager 的权限问题, 必须将背景图片/人物头像, 保持在 `$HOME` 下  
这里将两个图片放在了 `~/.config/nixpkgs/gnome/` 下, 因此要修改下相应文件  


- 对于背景图像, 修改 `dconf.nix` 中的 `picture-uri`:  

```nix
"org/gnome/desktop/background" =
let picture = ../.background.png; in
{
  picture-uri = "file://${picture}";
  picture-uri-dark = "file://${picture}";
};
```

- 对于人物头像, 在 `home.nix` 添加以下内容:  

```nix
home.file.".face".source = ./.face;
```

大功告成!  
