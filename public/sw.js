/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","9b147e0f123a44bc1ba276865e5eb599"],["/about/index.html","88be095580df32e45223a3763bebe2d8"],["/archives/2021/09/index.html","99fb00165fb293dd474e6265244a2eec"],["/archives/2021/10/index.html","4443d45de692c9d3a30d98dca2f99187"],["/archives/2021/11/index.html","0e0d7424e44e399adea8d4b1e02a8319"],["/archives/2021/index.html","ee98f6e979a36a1c1a04e596321468eb"],["/archives/2021/page/2/index.html","f2a07a537d083a72fa3bce2885503576"],["/archives/2022/03/index.html","f5460df17a8bb80dce0ccd2e444075c3"],["/archives/2022/06/index.html","82e32a6eaf2e5539701f5a28a3be9c94"],["/archives/2022/07/index.html","272be5c516f9c89515a9c872e9ae95d2"],["/archives/2022/08/index.html","ea740ac9b4ad7c2ed7da41b5597534cf"],["/archives/2022/09/index.html","0a8a1044d39a2bc8347924eb5f3743d5"],["/archives/2022/10/index.html","3e8096ffe0235086207abf5188e811c5"],["/archives/2022/11/index.html","200b199af573872e369653581f8a62b9"],["/archives/2022/12/index.html","6498c8fe6f74e840abec033196f6f130"],["/archives/2022/index.html","16920ed7587a521872c3f37fe36524c4"],["/archives/2022/page/2/index.html","a90bd730a93efa8110e6a2a1530d3c43"],["/archives/2022/page/3/index.html","d5af49c1bc25a3dfe42de0beb2996fad"],["/archives/index.html","56dcd1a8000d8a3f6b9917a3e4a28910"],["/archives/page/2/index.html","d43e0abffda9350dec9fe53edfb0b930"],["/archives/page/3/index.html","bbb07820ffbfc89c98063b1cc67ceec2"],["/archives/page/4/index.html","72cb8430d0877e55133f427982542621"],["/atom.xml","aece4d039eef231b81972834287789d7"],["/baidusitemap.xml","4fbf4d192b68e232bb9d610258994377"],["/categories/desktop-beautify.html","08358884c871b543d28bad3ffe5fb34a"],["/categories/haskell-basic.html","deaf2671274ab7e7a823e69324689098"],["/categories/high-school-it.html","08ef1724c1898e397c79dda7fba0bde7"],["/categories/index.html","2ab1f345f460ae20e3a11c7811f0c432"],["/categories/rust-async.html","598eb669eb39cdf66b1b00349f8dd21f"],["/categories/rust-decl-macro.html","d746d70b982919a5d83020f5b84e2a21"],["/categories/rust-gstreamer.html","6cfaeef980099a683d3894a9655aa297"],["/categories/rust-gui.html","bb1a2f839193bc1ca9ba5cf8ac669a79"],["/categories/rust-tui.html","03947c2ee3130d8667f70d9f9e474f21"],["/css/FiraCode-Regular.ttf","a09618fdaaa2aef4b7b45e26b7267763"],["/css/custom.css","e2c7aa36b3674b517238784e96a86944"],["/css/demo.css","4a5823a4b31fd8cf9d5cc2e19ede269a"],["/css/demo_index.html","db930b755fa470d3056d640340a3c1d5"],["/css/iconfont.css","0976d3e5f0c2b654f9abc222a16745f2"],["/css/iconfont.js","cbd12b4a7cdad6026ab3a91990f986b6"],["/css/iconfont.json","8bba7f0ca1824a476901811e49709826"],["/css/iconfont.ttf","02125500be60f8e2e50e99da4083fc11"],["/css/iconfont.woff","cc251aafb10b4113c935fb8d1e0fb254"],["/css/iconfont.woff2","194abaad46cb5da400525e28d27fdd46"],["/css/main.css","ef38fe97556cf32a2b2b1b72c7c09c46"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.jpg","80a07dbbb50f13a3c9d8057894a417a8"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-16x16.png","6cea0d5a206cd917a2451fdc09f0581f"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/favicon-32x32.png","8629d79282dea2cf7b97fc203d06c4f2"],["/images/gnome/big-avatar.png","bac8cb9689aeae93aa0ba49be536850f"],["/images/gnome/eye-extended.png","678a2374b84044ae7b3f3561665f07bd"],["/images/gnome/frequency-boost-switch.png","afcd4372f4d621017ada1e447d231c2b"],["/images/gnome/gnome-fuzzy-app-search.png","341c89e1ca756d119f3d4ecba8dc578f"],["/images/gnome/gnome40-ui-improvements.png","eaaf16c078d55c2d895511d42eb13443"],["/images/gnome/gsconnect.png","6e2c89fc1ae7b28079df7ef2210fdcfc"],["/images/gnome/nothing-to-say.png","0af930675cee4720c7e3561d6e6257b5"],["/images/gnome/overview-navigation.png","b0380c44ca0ce15d4f41fb8d6287a90b"],["/images/gnome/overview.png","3443ca6fd76827b7a3610dd6108ab6ce"],["/images/gnome/refresh-wifi-connections.png","652c9f8db5183200ea16ce7b4f9574dc"],["/images/gnome/right-corner.png","6eec501949015c1fcad29f8eca9e1373"],["/images/gnome/space-bar.png","a1ea3465456612cd6651394dc2ea1e21"],["/images/gnome/transparent-window-moving.png","0f428802ab54ed815d4ff3a5ad054c1c"],["/images/gnome/workspace-switcher-manager.png","e09ddc1d29f7c43f677d80210966ba49"],["/images/logo-algolia-nebula-blue-full.svg","d593709631bf6acec3c76b6eb2b4b560"],["/images/logo.svg","f9c1770a959633fdee3a5c53a7e301ee"],["/index.html","18ee014f9e8d91ad5294a76f4aecbeeb"],["/js/comments.js","1eeea0d8fd6f86ac1096346276ddc17f"],["/js/config.js","d563011201cd79b99ab618258ee0aa4a"],["/js/cursor/fireworks.js","2267ff7a3ba36151dffbc19e18db410e"],["/js/motion.js","600e7d971444d835afe83b4af7165053"],["/js/next-boot.js","bc8d15670935f7c9a0a1948c48c7e8cb"],["/js/pjax.js","bcaf5c296d314e8683898395950be64c"],["/js/third-party/chat/tidio.js","2f8e3075bd9c701d086e2f33e25a0eb4"],["/js/third-party/fancybox.js","50e1aaf369bc4192e7386e8c23527d8a"],["/js/third-party/quicklink.js","b26c396f111998108bff0eb2445ac68d"],["/js/third-party/tags/mermaid.js","80b6e2b070b06be9e853ededfc0d5b16"],["/js/utils.js","331469b11729bb7def2880f72879ea8f"],["/lib/fastclick/default.json","122092ba8b3f52db9ba9fcdd731ff844"],["/lib/fastclick/index.js","ba1fbdc8745337832748b0a7dc243cd9"],["/lib/fastclick/lib/likely.js","c12da2a931f37766064159933c61853d"],["/lib/fastclick/lib/needmoreshare.js","0e9698b81521b1ba337374a15b9bd52e"],["/lib/fastclick/lib/sharejs.js","20573765518e2d07fbf86d7feeeca06a"],["/lib/fastclick/package.json","cc0c40ece623f47adc1b934c7919c435"],["/lib/jquery_lazyload/bower.json","5f8449c87f33671904615bb63d8283cf"],["/lib/jquery_lazyload/jquery.lazyload.js","a0d55ddd47bf87094fc3acd357613da9"],["/lib/jquery_lazyload/jquery.scrollstop.js","8620a941dbb5dbbf8a448c625c413c8c"],["/page/2/index.html","7307a5ef1c2cb06a0963dffaa3c6c0a6"],["/page/3/index.html","3b53c602309633cadfbeff1e6927bc50"],["/posts/desktop-beautify/gnome.html","e43956dea2040f18198f9e70e26a2cc4"],["/posts/desktop-beautify/hyprland.html","1219f518b153a390552577fbbffa0cbe"],["/posts/haskell-basic/p1.html","4fed4a9930ecd3cb7f7adedfb4bba253"],["/posts/haskell-basic/p2.html","6aff4ffed6590fefc3ae5dcf1deb60c5"],["/posts/haskell-basic/p3.html","20a52bdf9bc225f4454ca6b3f9b497ae"],["/posts/haskell-basic/p4.html","500866e696f735e0b94634dceaf53968"],["/posts/haskell-basic/p5.html","444eee6953e9538492f32ecd69cf2736"],["/posts/high-school-it/p1.html","d55cbb4ce79e53cd2e0968d14aa78c38"],["/posts/high-school-it/p2.html","03de4744569d91a8cc3127cf8befbe5f"],["/posts/high-school-it/p3.html","69e2c9a4d0e2a6582f756b441e0779f5"],["/posts/high-school-it/p4.html","a7ed0bc29e36a4709a9a34f9221d2c49"],["/posts/high-school-it/p5.html","77402c6c3ab4e763156c9c741d14b4ac"],["/posts/rust-async/p1.html","5e7ed37002d370e4f5d702e0ccb79815"],["/posts/rust-async/p2.html","2627d4cece9e0f6292619b09df3c7efe"],["/posts/rust-async/p3.html","ac477ecde455aa90f43f45336775778e"],["/posts/rust-async/p4.html","28a36e433cbf0945825c98165d54eb66"],["/posts/rust-clap/intro.html","9900646c3a9069a293476b730b3e4327"],["/posts/rust-decl-macro/p1.html","1ef5e813975b2e7f23567202ea7a444f"],["/posts/rust-decl-macro/p2.html","cbf6a18c2246d7ccc46a49de11ddee2f"],["/posts/rust-decl-macro/p3.html","53b1b500646e1c1859d403c7d68c28e9"],["/posts/rust-decl-macro/p4.html","82a5be0aeb2132d3e7cbb8091fdc5e39"],["/posts/rust-decl-macro/p5.html","18a7954acf0cbd11947d577131a84fff"],["/posts/rust-gstreamer/p1.html","7a5ea2b523ce7bb42d1c64baa35a4b15"],["/posts/rust-gstreamer/p2.html","50fbc8857de234f162648585bcd1dee5"],["/posts/rust-gstreamer/p3.html","f6e801f1e70048dc7c79e9d9f61a0b39"],["/posts/rust-gstreamer/p4.html","0c412f9bfa488b097b0840208fbbad92"],["/posts/rust-gstreamer/p5.html","32a1ec8414dac542b56c0a8c04e9cd90"],["/posts/rust-gtk4/p1.html","7177716d5d2e0da69b2ec333a2f906d7"],["/posts/rust-gtk4/p2.html","c0d6a8f2df985a629eacae737ad2c534"],["/posts/rust-gtk4/p3.html","31517c6b74869ec3a4448b958f98fc9c"],["/posts/rust-gtk4/p4.html","94e83e5f48ec18202bc86c984da210ea"],["/posts/rust-gtk4/p5.html","eed95c856c668fc28c3e3df85c781e1a"],["/posts/rust-gtk4/p6.html","c7350d558bfc2fc27e3d9d2fc0686c78"],["/posts/rust-gtk4/p7.html","3633201404de4a238a13f35ecdccb042"],["/posts/rust-tui/p1.html","9b5a9d066a5f789c33cd4605dabdf590"],["/search.xml","e8198fa36dba822bee3a24a3b6cf5b08"],["/sitemap.xml","79b3ee5b2f5554ac46009158b4166051"],["/sw-register.js","22021a926dd11bc1120d29a4a1af5a96"],["/tags/Async/index.html","3c2a1f531f4db9409aa95f7e0bd60fb5"],["/tags/Audio/index.html","be9ac944185dac6c219122c75f3fd828"],["/tags/CLI/index.html","45fb04a4093643fc1d47236dea5d6ef8"],["/tags/Clap/index.html","19f2f272bb56c5f5c7e2b65a17fd070f"],["/tags/Desktop/index.html","beaa3e3dbdbe5a54e33de650aa0cbec8"],["/tags/GNOME/index.html","a856a4b7349aa8738f0339677315f5d1"],["/tags/GStreamer/index.html","dfc72b5abc32576ddb7c351fa91bf8ea"],["/tags/GUI/index.html","716ac7b7ba4875b155f855b2c6bf4a24"],["/tags/Haskell/index.html","1a11b60a76366fa1b9c0636bb3628a4c"],["/tags/Hyprland/index.html","170a7f7a5bb6433e865afae5d534f97d"],["/tags/Linux/index.html","dc988eeff84b4794839030ffb8c9bb86"],["/tags/Macro/index.html","57417da96aef41ed044205ef2bed0eed"],["/tags/Rust/index.html","b1142c0081889aad446c78d5cb01ef3a"],["/tags/Rust/page/2/index.html","c095d0c1c7582c1f28ba4724335f564e"],["/tags/Rust/page/3/index.html","ff0472b57d1ed5f0df5e6f4a6ac64999"],["/tags/TUI/index.html","1a5558d92fa84cf058669154f2fcb141"],["/tags/Video/index.html","c214cfb534651e359c691bf7b145e3b9"],["/tags/Waylnad/index.html","a360d57989962f1f4c73bdfa910ef477"],["/tags/高中信息技术/index.html","bc60b5b92713cefcc7c96704d8800ea8"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });



// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache 配置转换后的 toolbox 代码.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdn.jsdelivr.net"});





/* eslint-enable */
