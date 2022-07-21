---
title: "GNOME 入坑指南"
abbrlink: posts/gnome/guide
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
请注意GNOME版本是否相符, 有少许地方或因版本差异而不同, 我将尽量保持同步, 使该文章是最新版本  
目前, 该篇文章的GNOME 版本为: **42**  
:::

# 成品展示
2022年了, GNOME 又靠谱又好用, 但有些人的界面仍然像是十年前...  
我个人认为简洁+美观比较重要, 当然你也可以自行修改进行DIY, 请自己动手, 丰衣足食吧!  

+++ **以下是成品展示, 请点击隐藏/展开图像**
![按下Super后的Overview](/images/gnome/overview.png)  
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
触摸板可是笔记本党的灵魂啊, 尤其对于我这种万年不用鼠标, 除非打CSGO ~~(但CS我也能用触摸板玩)~~

## 配置
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
- 轻击模拟鼠标点击, 默认为false
- 调整触摸板速度, 默认为0
- 打字时禁用触摸板, 默认为true

## 手势
- 单指: 移动鼠标
- 双指上下: 翻页
- 三指左右: 切换Workspace
- 三指上: 打开Overview (不常用, 按Super更快)
- 三指下: 显示任务栏 (当你隐藏任务栏时)
- - -

# 安装扩展
GNOME 的扩展(Extensions)是其重要的组成部分, 赋予了随意且自由组合的强大  
我将先介绍如何安装/使用它们, 因为后面需要用到扩展  

有两种安装方法, 一种从命令行安装, 一种从浏览器安装  
我更倾向于前者, 因为不需要下载对应的东西, 适合快速部署, 但两者我都会介绍  

## 从命令行
:::tips
**提示**  
请确保拥有以下命令: unzip, jq, 有些发行版默认连 unzip 都没有...  
下载成功后, 切记要 logout, 然后再登进来  
:::

每个GNOME扩展都拥有独一无二的, 名为 `uuid` 的标识符, 我们可以通过 `uuid`, 下载扩展  

你可以在 [Extensions-GNOME](https://extensions.gnome.org/) 这个网站上, 浏览并下载扩展  
请将以 .zip 结尾的扩展放在同一目录下, 假设该目录叫 `exts_list`  

下面是 Bash/Fish 脚本, 传入该目录的路径, 自动进行安装:  

{% tabs install-extensions%}
<!-- tab Bash-->

```bash install-extensions.sh
#!/usr/bin/env bash
declare -a UUID_LIST
EXTS_DIR=$HOME/.local/share/gnome-shell/extensions
EXTS_LIST=${1}
str_join() {
  echo "$*" | sed 's/""/","/g'
}
mkdir -p $EXTS_DIR
chmod -R 755 $HOME/.local/
for EXT in $EXTS_LIST/*.zip
do
  UUID=$(unzip -p $EXT metadata.json | jq -r ".uuid")
  mkdir -p $EXTS_DIR/$UUID
  unzip -q -o $EXT -d $EXTS_DIR/$UUID
  UUID_LIST+="\"$UUID\""
done
UUID_LIST=[$(str_join ${UUID_LIST[@]})]
gsettings set org.gnome.shell enabled-extensions ${UUID_LIST[@]}
```

<!-- endtab -->

<!-- tab Fish -->

```bash install-extensions.fish
set exts_list $argv[1]
set exts_dir $HOME/.local/share/gnome-shell/extensions/
set uuid_list
mkdir -p $exts_dir
for ext in exts_list/*.zip
  set uuid ( unzip -p $ext metadata.json | jq -r ".uuid" )
  mkdir -p $ext_dir/$uuid
  unzip -q -o $ext -d $ext_dir/$uuid
  set -a uuid_list \'$uuid\'
end
set uuid_list [( string join "," $uuid_list )]
gsettings set org.gnome.shell enabled-extensions $uuid_list
```

<!-- endtab -->

{% endtabs %}

假设使用Bash: 执行 `sh install-extensions.sh exts_list` 下载该目录下的所有插件  
**注意 logout, 再登进来**  

也可以通过dbus安装, 但获取uuid还得解压zip, 何不直接像上面那样手动安装? 所以不推荐:  

```bash
sudo dbus-send --type=method_call --dest=org.gnome.Shell /org/gnome/Shell \
  org.gnome.Shell.Extensions.InstallRemoteExtension string:'xxxxx_uuid'
```

## 从浏览器
该方法其实也蛮方便的, 但不适合快速部署  
你需要安装两个玩意, 才能直接从 [Extension-GNOME](https://extensions.gnome.org/) 上直接下载  

- `chrome-gnome-shell`:  
本地软件, 你可以通过包管理器, 直接搜这个名字  

- `GNOME Shell integration`:  
浏览器插件, Chrome/Firefox 的浏览器商店都有它  
Edge 的插件商店里无, 但可以下载 iGuge (谷歌访问助手), 然后下Chrome的插件  

一个在本地, 一个在浏览器,  因此可以支持你从 [网站](https://extensions.gnome.org/) 上 直接安装到本地  

- - -

# 查看/配置扩展
通过 `gnome-extensions` 这个命令, 我们可以查看/配置当前扩展  

```bash
# 获取帮助, `Command` 为可选项
gnome-extensions help [Command]

# 查看扩展列表
gnome-extensions list --user    # 查看用户级扩展
gnome-extensions list --system  # 查看系统级扩展

# 查看扩展的信息
gnome-extensions info launch-new-instance@gnome-shell-extensions.gcampax.github.com

# 启用/禁用某个扩展
gnome-extensions enable nothing-to-say@extensions.gnome.wouter.bolsterl.ee
gnome-extensions disable nothing-to-say@extensions.gnome.wouter.bolsterl.ee

# 配置某个扩展 (打开 GUI 界面)
gnome-extensions prefs nothing-to-say@extensions.gnome.wouter.bolsterl.ee
```

或者通过 `gsettings` 来配置某个扩展, 但不推荐, 因为麻烦:  

```bash
# 查看某个扩展的所有选项
gsettings --schemadir ~/.local/share/gnome-shell/extensions/nothing-to-say@extensions.gnome.wouter.bolsterl.ee/schemas/  \
  list-recursively org.gnome.shell.extensions.nothing-to-say
  
# 得到/重置/设置 某个扩展的某选项当前的值 (根据上面这条命令查看所有选项)
gsettings --schemadir ~/.local/share/gnome-shell/extensions/nothing-to-say@extensions.gnome.wouter.bolsterl.ee/schemas/  \
  get    org.gnome.shell.extensions.nothing-to-say show-osd
# reset  org.gnome.shell.extensions.nothing-to-say show-osd
# set    org.gnome.shell.extensions.nothing-to-say show-osd
```

你也可以参考或[**直接加载**](#jia-zai-pei-zhi)我博客下的 [**dconf.settings**](/downloads/gnome/dconf.settings)  
**注意**: 如何你选择直接加载我的配置, 请注意 `picture-uri` 符合自己实际  

- - -

# 推荐的扩展
以下是我目前正在使用, 推荐的扩展  

- [auto-move-windows](https://extensions.gnome.org/extension/16/auto-move-windows/):  
通过指定窗口规则, 使得打开某个app时, 将其自动分配到特定工作区 (需要指定的.desktop文件)  
**无图片**

<br>

- [refresh-wifi-connections](https://extensions.gnome.org/extension/905/refresh-wifi-connections/)
当你通过右上角的菜单选择 WIFI 时, 会多出来一个刷新键  

>>> **点击展开/隐藏图片**
![refresh-wifi-connections](/images/gnome/refresh-wifi-connections.png)
>>>

<br>

- [transparent-window-moving](https://extensions.gnome.org/extension/1446/transparent-window-moving/)
在对窗口进行移动/调整大小时, 使窗口变得透明  
>>> **点击展开/隐藏图片**
![transparent-window-moving](/images/gnome/transparent-window-moving.png)
>>>

<br>

- [just-perfection](https://extensions.gnome.org/extension/3843/just-perfection/)
我最喜欢的一个扩展, 用于对界面进行大量自定义与精简  
比如, 可以隐藏 Dash (按Super后底部的一行), 改变顶栏元素等  
>>> **点击展开/隐藏图片**
![just-perfection](/images/gnome/overview.png)
>>>

<br>

- [eye-extended](https://extensions.gnome.org/extension/3139/eye-extended/)
很有趣的扩展, 平时当作小挂件, 但危机时或许可以派上用场  
在顶栏显示一个眼睛, 眼珠子会一直注视着你的鼠标, 点一下会出现以你鼠标为中心的黄色圆圈  
>>> **点击展开/隐藏图片**
![eye-extended](/images/gnome/eye-extended.png)
>>>

<br>

- [nothing-to-say](https://extensions.gnome.org/extension/1113/nothing-to-say/)
用于切断/恢复声音的输入, 对我来说蛮有用的:  
当与同学打游戏, 撞上爸妈查房, 立刻按下 `Super+\`, 防止爸妈训我的声音流入同学耳中, 维护尊严 :)  
>>> **点击展开/隐藏图片**
![nothing-to-say](/images/gnome/nothing-to-say.png)
>>>

<br>

- [space-bar](https://extensions.gnome.org/extension/5090/space-bar/)
模仿 I3/Sway/Bspwm 等窗口管理器, 将左上角烦人的 `Activities` 替换为 `Workspaces`, 有些类似的扩展, 但这个最好  
>>> **点击展开/隐藏图片**
![space-bar](/images/gnome/space-bar.png)
>>>

<br>

- [static-background-in-overview](https://extensions.gnome.org/extension/4696/static-background-in-overview/)
在按下 `Super` 进入 `Overview` 时, 背景图片能够填补四边的空缺, 比起默认的四周黑框框更加好看  
>>> **点击展开/隐藏图片**
![static-background-in-overview](/images/gnome/overview.png)
>>>

<br>

- [workspace-switcher-manager](https://extensions.gnome.org/extension/4788/workspace-switcher-manager/)
美化通过键盘(我配成了 `Super + 1..9`), 切换工作区时的动画效果, 很赞很好看, 可以高度 DIY  
>>> **点击展开/隐藏图片**
![workspace-switcher-manager](/images/gnome/workspace-switcher-manager.png)
>>>

<br>

- [disable-workspace-switch-animation-for-GNOME40+](https://extensions.gnome.org/extension/4290/disable-workspace-switch-animation-for-gnome-40/)
消除通过键盘切换工作区时的过渡动画, 获得急速切换的体验感  
**无图片**

<br>

- [gsconnect](https://extensions.gnome.org/extension/1319/gsconnect/)
GNOME版的 `kdeconnect`, 用于电脑与手机互连 (一个网下), 在右上角菜单添加对应菜单, 以便快速打开  
手机需安装 `kdeconnect`, 你可以从本博客下载 apk 进行安装: [kdeconnect](/downloads/gnome/kdeconnect.apk)  
>>> **点击展开/隐藏图片**
![gsconnect](/images/gnome/gsconnect.png)
>>>

<br>

- [blur-my-shell](https://extensions.gnome.org/extension/3193/blur-my-shell/)
用于让面板, 顶栏, Overview, 锁屏, gnome自带的截屏, 甚至特定的app, 都能被毛玻璃化, 很强大的扩展  
>>> **点击展开/隐藏图片**
![blur-my-shell](/images/gnome/overview.png)
>>>

<br>

- [big-avatar](https://extensions.gnome.org/extension/3488/big-avatar/)
让右上角菜单出现你的头像, 点击之后触发自定义的命令, 但这功能不常用, 提升逼格而已  
>>> **点击展开/隐藏图片**
![big-avatar](/images/gnome/big-avatar.png)
>>>

<br>

- [cpudots](https://extensions.gnome.org/extension/4530/cpudots/)
监视你当前的CPU频率, 以百分数的形式呈现在顶栏  
>>> **点击展开/隐藏图片**
![cpudots](/images/gnome/right-corner.png)
>>>

<br>

- [colorful-battery-indicator](https://extensions.gnome.org/extension/4817/colorful-battery-indicator/)
让右上角的电池变成彩色, 根据电量, 分别呈现绿色, 黄色, 黄色, 美观且提示作用强  
>>> **点击展开/隐藏图片**
![colorful-battery-indicator](/images/gnome/right-corner.png)
>>>

<br>

- [gnome40-ui-improvements](https://extensions.gnome.org/extension/4158/gnome-40-ui-improvements/)
按下 `Super`, 进入 `Overview` 后, 在中上方显示工作区的内容  
>>> **点击展开/隐藏图片**
![gnome40-ui-improvements](/images/gnome/gnome40-ui-improvements.png)
>>>

<br>

- [gnome-fuzzy-app-search](https://extensions.gnome.org/extension/3956/gnome-fuzzy-app-search/)
出于某些目的, 默认的 `GNOME` 在 `Overview` 中不支持模糊查找, 可以通过该扩展修改  
>>> **点击展开/隐藏图片**
![gnome-fuzzy-app-search](/images/gnome/gnome-fuzzy-app-search.png)
>>>

<br>

- [pip-on-top](https://extensions.gnome.org/extension/4691/pip-on-top/)
当你通过浏览器中的画中画模式, 观看视频时, 让窗口一直保持在最顶部, 即使焦点在别的窗口  
**无图片**

<br>

- [frequency-boost-switch](https://extensions.gnome.org/extension/4792/frequency-boost-switch/)
在右上角菜单中的 `电池策略` 中添加一个 `Checkox`, 用于切换 `是否允许超频`  
>>> **点击展开/隐藏图片**
![frequency-boost-switch](/images/gnome/frequency-boost-switch.png)
>>>

<br>

- [overview-navigation](https://extensions.gnome.org/extension/1702/overview-navigation/)
当按下 `Super` 进入 `Overview` 后, 可以按下 `空格键`, 窗口上会出现字母  
输入小写字母就切换到对应窗口, 按下 `Shift` 会使字母颜色变红, 此时输入字母会关闭对应窗口  
>>> **点击展开/隐藏图片**
![overview-navigation](/images/gnome/overview-navigation.png)
>>>

<br>

- [cleaner-overview](https://extensions.gnome.org/extension/3759/cleaner-overview/)
进入 `Overview` 时, 将窗口排列整齐, 简单实用  
>>> **点击展开/隐藏图片**
![cleaner-overview](/images/gnome/overview-navigation.png)
>>>

<br>

- [user-theme](https://extensions.gnome.org/extension/19/user-themes/)
从用户目录加载对应的主题 (之后的换主题教程中会讲到)  
注意: 还需要使用 `gnome-extensions prefs user-theme@gnome-shell-extensions.gcampax.github.com` 指定主题  
**无图片**

<br>

- [user-syle-sheet](https://extensions.gnome.org/extension/3414/user-stylesheet-font/)
读取 `~/.local/share/gnome-shell/gnome-shell.css` 直接修改 GNOME 的默认CSS, 十分逆天, 适合重度 DIY 患者  
**无图片**
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

你也可以参考或直接加载我博客下的 [**dconf.settings**](/downloads/gnome/dconf.settings)  
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