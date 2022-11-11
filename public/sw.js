/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/about/index.html","72126af1c78775108b1ee88de9742e9e"],["/archives/2021/09/index.html","cc444e555d4415ed21cff57490edc4d4"],["/archives/2021/10/index.html","aeb03120b183191a2a400a29ec172dcc"],["/archives/2021/11/index.html","23a3e5eab1c99f8b19d968ad0fdae6d8"],["/archives/2021/index.html","d416d1ac6299afc7f54d3f451acf0b6b"],["/archives/2021/page/2/index.html","cc511031d4b2eb0a436f8746cbc57ec7"],["/archives/2022/03/index.html","fbe0e9e573df292c5190ab1dd7b21fb1"],["/archives/2022/06/index.html","191edb41f36b31d3b9250339f0783319"],["/archives/2022/07/index.html","4a5626550ae451273d30ad6b6f83694a"],["/archives/2022/08/index.html","e10ccb83635db4657074303e4e4e99b0"],["/archives/2022/09/index.html","63d47d8b0df259f37266aaa90fd35329"],["/archives/2022/10/index.html","2f57f1985ddfbc0b31fb1a789f330e48"],["/archives/2022/index.html","d851b38ff5d2c23b02601db2f481e60c"],["/archives/2022/page/2/index.html","cf326674d38951e7b012dbecd4e9c08b"],["/archives/index.html","58cf23fa11f42cb592511f0badc312f4"],["/archives/page/2/index.html","662d21e7f4ccb731bf6956c449a96083"],["/archives/page/3/index.html","c2360ff6dd3308c37ff01de8a201fb0a"],["/archives/page/4/index.html","8ed5fbfc588513d1c29ad635cbe6ec12"],["/categories/gnome.html","bf0deed570769c560b13a36d36efa3a9"],["/categories/haskell-basic.html","0bed1d3e94230a8af519f969ac2de0b2"],["/categories/high-school-it.html","0c578d1232f5db7cb9677ad2cffe88b6"],["/categories/index.html","fca1a085f4a834b2cb7222d10aa09e4e"],["/categories/rust-async.html","aa7dc25c5c6087c8c436e118125fcf66"],["/categories/rust-decl-macro.html","3836ced82768908f2b27d6ae45d3f5a3"],["/categories/rust-gstreamer.html","9bdcb50a654d0e9bacedf16075e65c72"],["/categories/rust-gtk4.html","15ef66270df1d7f5a8fae5c40b5f440c"],["/categories/rust-tui.html","ba46999688d6b055277531bd7f0c1431"],["/css/custom.css","570a432ed04c20a70de55ff76e6eaf49"],["/css/demo.css","4a5823a4b31fd8cf9d5cc2e19ede269a"],["/css/demo_index.html","5e8fbbc26ff777c6a1495ecf11fac862"],["/css/iconfont.css","0976d3e5f0c2b654f9abc222a16745f2"],["/css/iconfont.js","cbd12b4a7cdad6026ab3a91990f986b6"],["/css/iconfont.ttf","02125500be60f8e2e50e99da4083fc11"],["/css/iconfont.woff","cc251aafb10b4113c935fb8d1e0fb254"],["/css/main.css","eef2423740878c5355608522a037e835"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.jpg","80a07dbbb50f13a3c9d8057894a417a8"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-16x16.png","6cea0d5a206cd917a2451fdc09f0581f"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/favicon-32x32.png","8629d79282dea2cf7b97fc203d06c4f2"],["/images/gnome/big-avatar.png","bac8cb9689aeae93aa0ba49be536850f"],["/images/gnome/eye-extended.png","678a2374b84044ae7b3f3561665f07bd"],["/images/gnome/frequency-boost-switch.png","afcd4372f4d621017ada1e447d231c2b"],["/images/gnome/gnome-fuzzy-app-search.png","341c89e1ca756d119f3d4ecba8dc578f"],["/images/gnome/gnome40-ui-improvements.png","eaaf16c078d55c2d895511d42eb13443"],["/images/gnome/gsconnect.png","6e2c89fc1ae7b28079df7ef2210fdcfc"],["/images/gnome/nothing-to-say.png","0af930675cee4720c7e3561d6e6257b5"],["/images/gnome/overview-navigation.png","b0380c44ca0ce15d4f41fb8d6287a90b"],["/images/gnome/overview.png","3443ca6fd76827b7a3610dd6108ab6ce"],["/images/gnome/refresh-wifi-connections.png","652c9f8db5183200ea16ce7b4f9574dc"],["/images/gnome/right-corner.png","6eec501949015c1fcad29f8eca9e1373"],["/images/gnome/space-bar.png","a1ea3465456612cd6651394dc2ea1e21"],["/images/gnome/transparent-window-moving.png","0f428802ab54ed815d4ff3a5ad054c1c"],["/images/gnome/workspace-switcher-manager.png","e09ddc1d29f7c43f677d80210966ba49"],["/images/logo-algolia-nebula-blue-full.svg","d593709631bf6acec3c76b6eb2b4b560"],["/images/logo.svg","f9c1770a959633fdee3a5c53a7e301ee"],["/index.html","3e4e9626a214f3eb5f46bdeb90d5ca57"],["/js/comments.js","1eeea0d8fd6f86ac1096346276ddc17f"],["/js/config.js","d563011201cd79b99ab618258ee0aa4a"],["/js/cursor/fireworks.js","2267ff7a3ba36151dffbc19e18db410e"],["/js/motion.js","600e7d971444d835afe83b4af7165053"],["/js/next-boot.js","bc8d15670935f7c9a0a1948c48c7e8cb"],["/js/pjax.js","bcaf5c296d314e8683898395950be64c"],["/js/third-party/chat/tidio.js","2f8e3075bd9c701d086e2f33e25a0eb4"],["/js/third-party/fancybox.js","50e1aaf369bc4192e7386e8c23527d8a"],["/js/third-party/quicklink.js","13d8628107d04a56c3e1f52656badb53"],["/js/third-party/tags/mermaid.js","80b6e2b070b06be9e853ededfc0d5b16"],["/js/utils.js","331469b11729bb7def2880f72879ea8f"],["/lib/fastclick/index.js","ba1fbdc8745337832748b0a7dc243cd9"],["/lib/fastclick/lib/likely.js","c12da2a931f37766064159933c61853d"],["/lib/fastclick/lib/needmoreshare.js","0e9698b81521b1ba337374a15b9bd52e"],["/lib/fastclick/lib/sharejs.js","20573765518e2d07fbf86d7feeeca06a"],["/lib/jquery_lazyload/jquery.lazyload.js","a0d55ddd47bf87094fc3acd357613da9"],["/lib/jquery_lazyload/jquery.scrollstop.js","8620a941dbb5dbbf8a448c625c413c8c"],["/page/2/index.html","e569514d7c420e766daa2654ce8d6eab"],["/page/3/index.html","b42f15919b67fe1af76b5359b55a35bd"],["/posts/gnome/guide.html","56b3d822233de9f79f74e5ce188e4e0f"],["/posts/haskell-basic/p1.html","23e5745cf1a1f900c4b85d259d615e30"],["/posts/haskell-basic/p2.html","3a9a88bf38ac9726d2215deb5b849354"],["/posts/haskell-basic/p3.html","f03626f519f4846d4552c1ec2152ba4e"],["/posts/haskell-basic/p4.html","7ffcefa923891f1b73c39fce4c3c32a6"],["/posts/haskell-basic/p5.html","ae8d279e5cb9f6ca897fbad835792da7"],["/posts/high-school-it/p1.html","09a306c81ab300ff718b880f1fa60193"],["/posts/high-school-it/p2.html","b199a7a98e979a0b18672037218d3849"],["/posts/high-school-it/p3.html","9ec9ee8f158719a62a9af139df5ed3a6"],["/posts/high-school-it/p4.html","38109d746d3cbf86ae6bc96238f7e548"],["/posts/rust-async/p1.html","f6caeaea1d5d2a0cbb1420df82dd72e7"],["/posts/rust-async/p2.html","434a0f1e7ffc1e3794657410a68a7c00"],["/posts/rust-async/p3.html","99ab892cff7c8aa8db6e9b2781c8a774"],["/posts/rust-async/p4.html","31303c79cdfb651242c928fe1d06f17c"],["/posts/rust-clap/intro.html","b8c57a1c7aefbae0c1666b259bd7485f"],["/posts/rust-decl-macro/p1.html","7a56413e1acd0b38a9c7140f398b62a2"],["/posts/rust-decl-macro/p2.html","981dabdbd6e49a588c03d2379c2c783e"],["/posts/rust-decl-macro/p3.html","3ad267ded8e188703f996ee80a2f3f05"],["/posts/rust-decl-macro/p4.html","11eaefba4a65177867bc255c2ab38473"],["/posts/rust-decl-macro/p5.html","59013c17dbb0a2a77bb2f3031cbf6d1e"],["/posts/rust-gstreamer/p1.html","5d9ffde1d681c7866be310d347c86632"],["/posts/rust-gstreamer/p2.html","a546fc6752fa4b28fed98da9401efe05"],["/posts/rust-gstreamer/p3.html","269f7ab751f2c6205db096c071d3ca4f"],["/posts/rust-gstreamer/p4.html","053b88749007e60205ba5abd0f979872"],["/posts/rust-gstreamer/p5.html","a27e2e985bb0bcc6e7cbb50377bfa520"],["/posts/rust-gstreamer/p6.html","b63562c04af9a5dfd01d96e2cfb2a5a1"],["/posts/rust-gtk4/p1.html","b2ab07561ed00d7739b9a618e5c10e8e"],["/posts/rust-gtk4/p2.html","fb6c6c4c263c008d3b501850eec61970"],["/posts/rust-gtk4/p3.html","352b0c47b91b1b1ec2321d5a1f70784f"],["/posts/rust-gtk4/p4.html","c003a898a2b383b48e5bc1afc788c239"],["/posts/rust-tui/p1.html","538c752f94f7972f342c6b8f0e6ee7ed"],["/sw-register.js","384185429ac395912c09d41d46739382"],["/tags/Async/index.html","1acce5003b442bcdacf6675e5f585272"],["/tags/Audio/index.html","b07d27f510dbe413fe009b32df586e4f"],["/tags/CLI/index.html","aff9edcf1d70d249af25be7ee0670d86"],["/tags/Clap/index.html","e40c24ca44af7b253697fec5ce657d9c"],["/tags/GNOME/index.html","25d5b6ea0f0755f50d02c2a70a3f5c90"],["/tags/GStreamer/index.html","14cd684d5b0e2f22a0cef4ec96d19ef9"],["/tags/GUI/index.html","2cb004c00af907e80fc0e7fa9b93df1b"],["/tags/Haskell/index.html","0413f56ef7aeae3c596d4e2da148ffcb"],["/tags/Macro/index.html","2a3c67bdc55ec9e7582c93dde134bd57"],["/tags/Rust/index.html","7a12390509ba538d9a6a18801b81f49f"],["/tags/Rust/page/2/index.html","b8f0f2c2d065c5b87c263bd3c5d2e603"],["/tags/TUI/index.html","d2bfd234d763c85d7303fd38b8b08ee8"],["/tags/Video/index.html","c04258e932b716bc50c390556657f6b9"],["/tags/高中信息技术/index.html","23db7eeaff88b336563c34c6394dac07"]];
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









/* eslint-enable */
