(function() {
  var ApartmentVariant, ApartmentVariantCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ApartmentVariant = (function(superClass) {
    extend(ApartmentVariant, superClass);

    function ApartmentVariant() {
      return ApartmentVariant.__super__.constructor.apply(this, arguments);
    }

    ApartmentVariant.prototype.findUnitPrice = function(unit_model) {
      var basicCost, basic_cost, floorRise, floorRiseArray, unitVarinatModel;
      basicCost = "";
      if (!(unit_model instanceof Backbone.Model) || unit_model === "") {
        return;
      }
      unitVarinatModel = apartmentVariantCollection.findWhere({
        'id': parseInt(unit_model.get('unit_variant_id'))
      });
      if (!_.isUndefined(unitVarinatModel)) {
        floorRiseArray = settings.generateFloorRise(unit_model.get('building_id'));
        floorRise = floorRiseArray[unit_model.get('floor')];
        basic_cost = (parseFloat(unitVarinatModel.get('per_sq_ft_price')) + parseFloat(floorRise)) * parseFloat(unitVarinatModel.get('super_built_up_area'));
        basicCost = basic_cost.toFixed(2);
      }
      return basicCost;
    };

    return ApartmentVariant;

  })(Backbone.Model);

  ApartmentVariantCollection = (function(superClass) {
    extend(ApartmentVariantCollection, superClass);

    function ApartmentVariantCollection() {
      return ApartmentVariantCollection.__super__.constructor.apply(this, arguments);
    }

    ApartmentVariantCollection.prototype.model = ApartmentVariant;

    ApartmentVariantCollection.prototype.setApartmentVariantAttributes = function(data) {
      return apartmentVariantCollection.reset(data);
    };

    ApartmentVariantCollection.prototype.getApartmentUnits = function() {
      var newUnits, units;
      units = [];
      newUnits = [];
      apartmentVariantCollection.each(function(model) {
        var apartmentUnits;
        apartmentUnits = unitCollection.where({
          unit_variant_id: model.get('id')
        });
        return units.push(apartmentUnits);
      });
      $.each(units, function(index, value) {
        return newUnits = $.merge(newUnits, value);
      });
      return newUnits;
    };

    return ApartmentVariantCollection;

  })(Backbone.Collection);

  window.apartmentVariantCollection = new ApartmentVariantCollection;

  window.apartmentVariant = new ApartmentVariant;

}).call(this);

//# sourceMappingURL=../../frontend/entities/apartment.variant.entity.js.map