"use strict";const Util=require("next-util"),utils=new Util(hexo,__dirname);hexo.extend.filter.register("theme_inject",(e=>{["likely","needmoreshare","sharejs"].forEach((t=>{let i=utils.defaultConfigFile(t,"default.yaml");i.enable&&require(`./lib/${t}`)(i,e)}))}));