module.exports=function(e,s){s.head.raw("sharejs",`<link rel="stylesheet" href="${e.cdn.css}">`),s.postBodyEnd.raw("sharejs",`<div class="post-widgets">\n    <div\n      class="social-share"\n      {% if config.sharejs.networks %}\n        data-sites="{{ config.sharejs.networks }}"\n      {% endif %}\n      {% if config.sharejs.wechat_qrcode.title %}\n        data-wechat-qrcode-title="{{ __(config.sharejs.wechat_qrcode.title) }}"\n      {% endif %}\n      {% if config.sharejs.wechat_qrcode.prompt %}\n        data-wechat-qrcode-helper="{{ __(config.sharejs.wechat_qrcode.prompt) }}"\n      {% endif %}\n    >\n    </div>\n  </div>\n  <script src="${e.cdn.js}"><\/script>`)};