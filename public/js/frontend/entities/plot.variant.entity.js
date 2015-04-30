(function() {
  var PlotVariant, PlotVariantCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  PlotVariant = (function(superClass) {
    extend(PlotVariant, superClass);

    function PlotVariant() {
      return PlotVariant.__super__.constructor.apply(this, arguments);
    }

    PlotVariant.prototype.findUnitPrice = function(unit_model) {
      var basicCost, basic_cost, unitVarinatModel;
      basicCost = "";
      if (!(unit_model instanceof Backbone.Model) || unit_model === "") {
        return;
      }
      unitVarinatModel = plotVariantCollection.findWhere({
        'id': parseInt(unit_model.get('unit_variant_id'))
      });
      if (unitVarinatModel !== void 0) {
        basic_cost = (parseFloat(unitVarinatModel.get('per_sq_ft_price'))) * parseFloat(unitVarinatModel.get('size'));
        basicCost = basic_cost.toFixed(2);
      }
      return basicCost;
    };

    return PlotVariant;

  })(Backbone.Model);

  PlotVariantCollection = (function(superClass) {
    extend(PlotVariantCollection, superClass);

    function PlotVariantCollection() {
      return PlotVariantCollection.__super__.constructor.apply(this, arguments);
    }

    PlotVariantCollection.prototype.model = PlotVariant;

    PlotVariantCollection.prototype.setPlotVariantAttributes = function(data) {
      return plotVariantCollection.reset(data);
    };

    PlotVariantCollection.prototype.getPlotUnits = function() {
      var newUnits, units;
      units = [];
      newUnits = [];
      plotVariantCollection.each(function(model) {
        var plotUnits;
        plotUnits = unitCollection.where({
          unit_variant_id: model.get('id')
        });
        return units.push(plotUnits);
      });
      $.each(units, function(index, value) {
        return newUnits = $.merge(newUnits, value);
      });
      return newUnits;
    };

    return PlotVariantCollection;

  })(Backbone.Collection);

  window.plotVariantCollection = new PlotVariantCollection;

  window.plotVariant = new PlotVariant;

}).call(this);

//# sourceMappingURL=../../frontend/entities/plot.variant.entity.js.map