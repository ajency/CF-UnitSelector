(function() {
  var BunglowVariant, BunglowVariantCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BunglowVariant = (function(superClass) {
    extend(BunglowVariant, superClass);

    function BunglowVariant() {
      return BunglowVariant.__super__.constructor.apply(this, arguments);
    }

    BunglowVariant.prototype.findUnitPrice = function(unit_model) {
      var basicCost, basic_cost, unitVarinatModel;
      basicCost = "";
      if (!(unit_model instanceof Backbone.Model) || unit_model === "") {
        return;
      }
      unitVarinatModel = bunglowVariantMasterCollection.findWhere({
        'id': parseInt(unit_model.get('unit_variant_id'))
      });
      if (unitVarinatModel !== void 0) {
        basic_cost = (parseFloat(unitVarinatModel.get('per_sq_ft_price'))) * parseFloat(unitVarinatModel.get('super_built_up_area'));
        basicCost = basic_cost.toFixed(2);
      }
      return basicCost;
    };

    return BunglowVariant;

  })(Backbone.Model);

  BunglowVariantCollection = (function(superClass) {
    extend(BunglowVariantCollection, superClass);

    function BunglowVariantCollection() {
      return BunglowVariantCollection.__super__.constructor.apply(this, arguments);
    }

    BunglowVariantCollection.prototype.model = BunglowVariant;

    BunglowVariantCollection.prototype.setBunglowVariantAttributes = function(data) {
      bunglowVariantCollection.reset(data);
      return bunglowVariantMasterCollection.reset(data);
    };

    BunglowVariantCollection.prototype.getBunglowUnits = function() {
      var newUnits, units;
      units = [];
      newUnits = [];
      bunglowVariantCollection.each(function(model) {
        var bunglowUnits;
        bunglowUnits = unitCollection.where({
          unit_variant_id: model.get('id')
        });
        return units.push(bunglowUnits);
      });
      $.each(units, function(index, value) {
        return newUnits = $.merge(newUnits, value);
      });
      return newUnits;
    };

    BunglowVariantCollection.prototype.getBunglowMasterUnits = function() {
      var newUnits, units;
      units = [];
      newUnits = [];
      bunglowVariantMasterCollection.each(function(model) {
        var bunglowUnits;
        bunglowUnits = unitMasterCollection.where({
          unit_variant_id: model.get('id')
        });
        return units.push(bunglowUnits);
      });
      $.each(units, function(index, value) {
        return newUnits = $.merge(newUnits, value);
      });
      return newUnits;
    };

    BunglowVariantCollection.prototype.getVillaUnitTypes = function() {
      var unit_types;
      unit_types = [];
      bunglowVariantMasterCollection.each(function(item) {
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

    return BunglowVariantCollection;

  })(Backbone.Collection);

  window.bunglowVariantCollection = new BunglowVariantCollection;

  window.bunglowVariantMasterCollection = new BunglowVariantCollection;

  window.bunglowVariant = new BunglowVariant;

}).call(this);

//# sourceMappingURL=../../frontend/entities/bunglow.variant.js.map