(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.PlotView = (function(superClass) {
    extend(PlotView, superClass);

    function PlotView() {
      return PlotView.__super__.constructor.apply(this, arguments);
    }

    PlotView.prototype.template = '<form id="add-form"><div class="form-group"> <label for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="">Select</option> <option value="1">Plot 1</option> <option value="2">Plot 2</option> <option value="3">Plot 3</option> <option value="4">Plot 4</option> <option value="5">Plot 5</option> </select> </div></form>';

    PlotView.prototype.ui = {
      units: '.units'
    };

    PlotView.prototype.events = {
      'change @ui.units': function(e) {
        return $('.plot').each(function(index, value) {
          if (value.id === $(e.target).val()) {
            $('.info').text('Already assigned');
            $('.alert').removeClass('hidden');
          }
        });
      }
    };

    return PlotView;

  })(Marionette.ItemView);

  AuthoringTool.PlotCtrl = (function(superClass) {
    extend(PlotCtrl, superClass);

    function PlotCtrl() {
      return PlotCtrl.__super__.constructor.apply(this, arguments);
    }

    PlotCtrl.prototype.initialize = function() {
      return this.show(new AuthoringTool.PlotView);
    };

    return PlotCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/plot.entity.js.map