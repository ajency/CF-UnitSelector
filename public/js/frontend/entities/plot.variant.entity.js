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
      var basicCost;
      basicCost = "";
      if (!(unit_model instanceof Backbone.Model) || unit_model === "") {
        return;
      }
      basicCost = unit_model.get('selling_amount');
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
      plotVariantCollection.reset(data);
      return plotVariantMasterCollection.reset(data);
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

    PlotVariantCollection.prototype.getPlotMasterUnits = function() {
      var newUnits, units;
      units = [];
      newUnits = [];
      plotVariantMasterCollection.each(function(model) {
        var plotUnits;
        plotUnits = unitMasterCollection.where({
          unit_variant_id: model.get('id')
        });
        return units.push(plotUnits);
      });
      $.each(units, function(index, value) {
        return newUnits = $.merge(newUnits, value);
      });
      return newUnits;
    };

    PlotVariantCollection.prototype.getPlotUnitTypes = function() {
      var unit_types;
      unit_types = [];
      plotVariantMasterCollection.each(function(item) {
        var unitTypeModel;
        unitTypeModel = unitTypeMasterCollection.findWhere({
          'id': item.get('unit_type_id')
        });
        if ($.inArray(item.get('unit_type_id'), unit_types) === -1) {
          return unit_types.push(parseInt(unitTypeModel.get('id')));
        }
      });
      return unit_types;
    };

    PlotVariantCollection.prototype.getPlotAttributes = function() {
      var attributes;
      attributes = [];
      plotVariantMasterCollection.each(function(item) {
        return $.each(item.get('variant_attributes'), function(index, value) {
          if (_.isArray(value)) {
            return $.each(value, function(ind, val) {
              if ($.inArray(val, attributes) === -1) {
                return attributes.push(value);
              }
            });
          } else {
            if ($.inArray(value, attributes) === -1) {
              return attributes.push(value);
            }
          }
        });
      });
      return attributes;
    };

    return PlotVariantCollection;

  })(Backbone.Collection);

  window.plotVariantCollection = new PlotVariantCollection;

  window.plotVariantMasterCollection = new PlotVariantCollection;

  window.plotVariant = new PlotVariant;

}).call(this);

//# sourceMappingURL=../../frontend/entities/plot.variant.entity.js.map