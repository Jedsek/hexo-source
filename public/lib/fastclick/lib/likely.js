module.exports=function(l,e){var s="likely";"normal"!==l.look&&(s+="likely-"+l.look),e.head.raw("likely",`<link rel="stylesheet" href="${l.cdn.css}">`),e.postBodyEnd.raw("likely",`<div class="post-widgets">\n    <div class="${s}">\n      {%- for key, value in config.likely.networks %}\n        <div class="{{ key }}">{{ value }}</div>\n      {%- endfor %}\n    </div>\n  </div>\n  <script src="${l.cdn.js}"><\/script>`)};