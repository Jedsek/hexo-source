module.exports=function(n,e){e.head.raw("needmoreshare",`<link rel="stylesheet" href="${n.cdn.css}">`),n.postbottom.enable&&(e.head.raw("needmoreshare-postbottom","<style>\n#needsharebutton-postbottom {\n  cursor: pointer;\n  height: 26px;\n  margin-top: 10px;\n  position: relative;\n}\n#needsharebutton-postbottom .btn {\n  border: 1px solid $btn-default-border-color;\n  border-radius: 3px;\n  display: initial;\n  padding: 1px 4px;\n}\n</style>"),e.postBodyEnd.raw("needmoreshare-postbottom",'<div class="post-widgets">\n      <div id="needsharebutton-postbottom">\n        <span class="btn">\n          <i class="fa fa-share-alt" aria-hidden="true"></i>\n        </span>\n      </div>\n    </div>')),n.float.enable&&(e.head.raw("needmoreshare-float","<style>\n#needsharebutton-float {\n  bottom: 88px;\n  cursor: pointer;\n  left: -8px;\n  position: fixed;\n  z-index: 9999;\n}\n#needsharebutton-float .btn {\n  border: 1px solid $btn-default-border-color;\n  border-radius: 4px;\n  padding: 0 10px 0 14px;\n}\n</style>"),e.bodyEnd.raw("needmoreshare-float",'<div id="needsharebutton-float">\n      <span class="btn">\n        <i class="fa fa-share-alt" aria-hidden="true"></i>\n      </span>\n    </div>')),e.bodyEnd.raw("needmoreshare",`\n  <script src="${n.cdn.js}"><\/script>\n  <script>\n    {%- if config.needmoreshare.postbottom.enable %}\n      pbOptions = {};\n      {%- for k,v in config.needmoreshare.postbottom.options %}\n        pbOptions.{{ k }} = "{{ v }}";\n      {%- endfor %}\n      new needShareButton('#needsharebutton-postbottom', pbOptions);\n    {%- endif %}\n    {%- if config.needmoreshare.float.enable %}\n      flOptions = {};\n      {%- for k,v in config.needmoreshare.float.options %}\n        flOptions.{{ k }} = "{{ v }}";\n      {%- endfor %}\n      new needShareButton('#needsharebutton-float', flOptions);\n    {%- endif %}\n  <\/script>`)};