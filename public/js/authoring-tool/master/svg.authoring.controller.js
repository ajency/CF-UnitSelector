(function() {
  jQuery(document).ready(function($) {
    var context, img, j, k;
    window.canvas = new fabric.Canvas('c');
    $('.area').canvasAreaDraw();
    context = canvas.getContext("2d");
    j = $("#c");
    k = j[0].getContext("2d");
    img = new Image();
    img.onload = function() {
      j.css({
        background: "url(" + svgImg + ")"
      });
      return m();
    };
    img.src = svgImg;
    return window.canvas.on({
      'touch:drag': function() {
        return console.log("aaaaaaaaaa");
      }
    });
  });

}).call(this);

//# sourceMappingURL=../../authoring-tool/master/svg.authoring.controller.js.map