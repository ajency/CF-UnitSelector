(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.PlotView = (function(superClass) {
    extend(PlotView, superClass);

    function PlotView() {
      return PlotView.__super__.constructor.apply(this, arguments);
    }

    PlotView.prototype.template = Handlebars.compile('<form id="add-form"><div class="form-group"> <label class="unit-label" for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="">Select</option> {{#options}} <option value="{{id}}">{{name}}</option> {{/options}} </select> </div></form>');

    PlotView.prototype.ui = {
      units: '.units'
    };

    PlotView.prototype.serializeData = function() {
      var data, options, units;
      data = PlotView.__super__.serializeData.call(this);
      options = [];
      units = Marionette.getOption(this, 'units');
      $.each(units, function(ind, val) {
        return options.push({
          'id': val.get('id'),
          'name': val.get('unit_name')
        });
      });
      data.options = options;
      return data;
    };

    PlotView.prototype.events = {
      'change @ui.units': function(e) {
        window.coord = 0;
        return $('.plot').each(function(index, value) {
          if (value.id === $(e.target).val()) {
            $('.alert').text('Already assigned');
            window.hideAlert();
            window.coord = 1;
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
      var units;
      units = plotVariantCollection.getPlotUnits();
      console.log(units);
      return this.show(new AuthoringTool.PlotView({
        units: units
      }));
    };

    return PlotCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/plot.entity.js.map