(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.SvgLayoutView = (function(superClass) {
    extend(SvgLayoutView, superClass);

    function SvgLayoutView() {
      return SvgLayoutView.__super__.constructor.apply(this, arguments);
    }

    SvgLayoutView.prototype.template = '#main-template';

    return SvgLayoutView;

  })(Marionette.LayoutView);

  AuthoringTool.SvgAuthoringCtrl = (function(superClass) {
    extend(SvgAuthoringCtrl, superClass);

    function SvgAuthoringCtrl() {
      return SvgAuthoringCtrl.__super__.constructor.apply(this, arguments);
    }

    SvgAuthoringCtrl.prototype.initialize = function() {
      return this.show(new AuthoringTool.SvgLayoutView);
    };

    return SvgAuthoringCtrl;

  })(Marionette.RegionController);

  AuthoringTool.TopView = (function(superClass) {
    extend(TopView, superClass);

    function TopView() {
      return TopView.__super__.constructor.apply(this, arguments);
    }

    TopView.prototype.template = '#topregion';

    TopView.prototype.onShow = function() {
      var types;
      types = Marionette.getOption(this, 'types');
      return window.showPendingObjects(types);
    };

    return TopView;

  })(Marionette.ItemView);

  AuthoringTool.TopCtrl = (function(superClass) {
    extend(TopCtrl, superClass);

    function TopCtrl() {
      return TopCtrl.__super__.constructor.apply(this, arguments);
    }

    TopCtrl.prototype.initialize = function() {
      var types;
      types = window.getPendingObjects(window.svgData);
      return this.show(new AuthoringTool.TopView({
        'types': types
      }));
    };

    return TopCtrl;

  })(Marionette.RegionController);

  AuthoringTool.CenterView = (function(superClass) {
    extend(CenterView, superClass);

    function CenterView() {
      return CenterView.__super__.constructor.apply(this, arguments);
    }

    CenterView.prototype.template = '#centerregion';

    CenterView.prototype.ui = {
      marked: '.marked'
    };

    CenterView.prototype.events = {
      'dblclick @ui.marked': function(e) {
        var currentElem, svgDataObjects;
        $('#aj-imp-builder-drag-drop canvas').show();
        $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
        $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
        currentElem = e.currentTarget;
        svgDataObjects = svgData.data;
        return _.each(svgDataObjects, (function(_this) {
          return function(svgDataObject, key) {
            var elemTypeId, points;
            elemTypeId = $(currentElem).attr("type-id");
            if (parseInt(elemTypeId) === svgDataObject.id) {
              points = svgDataObject.points;
              drawPoly(points);
              return $("input[name=svg-element-id]").val(svgDataObject.id);
            }
          };
        })(this));
      }
    };

    CenterView.prototype.onShow = function() {
      var svgData;
      $('.area').canvasAreaDraw();
      window.draw = SVG('aj-imp-builder-drag-drop');
      svgData = Marionette.getOption(this, 'svgData');
      draw.svg(svgData);
      $('#aj-imp-builder-drag-drop canvas').ready(function() {
        $('#aj-imp-builder-drag-drop canvas').hide();
        return $('#aj-imp-builder-drag-drop .svg-draw-clear').hide();
      });
      return this.loadZoom();
    };

    CenterView.prototype.loadZoom = function() {
      var panzoom;
      return panzoom = $('#aj-imp-builder-drag-drop').panzoom({
        contain: 'invert',
        minScale: 1,
        maxScale: 2.4,
        increment: 0.4,
        $zoomIn: $('.zoom-in'),
        $zoomOut: $('.zoom-out')
      });
    };

    return CenterView;

  })(Marionette.ItemView);

  AuthoringTool.CenterCtrl = (function(superClass) {
    extend(CenterCtrl, superClass);

    function CenterCtrl() {
      return CenterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterCtrl.prototype.initialize = function() {
      var s, str;
      window.createSvg(window.svgData.data);
      s = new XMLSerializer();
      str = s.serializeToString(rawSvg);
      return this.show(new AuthoringTool.CenterView({
        'svgData': str
      }));
    };

    return CenterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map