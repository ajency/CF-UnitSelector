(function() {
  var ApartmentVariant, ApartmentVariantCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ApartmentVariant = (function(superClass) {
    extend(ApartmentVariant, superClass);

    function ApartmentVariant() {
      return ApartmentVariant.__super__.constructor.apply(this, arguments);
    }

    ApartmentVariant.prototype.findUnitPrice = function(unitModel) {
      var basicCost, basic_cost, floorRise, floorRiseArray, unitVarinatModel;
      basicCost = 0.00;
      if (!(unitModel instanceof Backbone.Model) || unitModel === "") {
        return;
      }
      unitVarinatModel = apartmentVariantMasterCollection.findWhere({
        'id': parseInt(unitModel.get('unit_variant_id'))
      });
      if (!_.isUndefined(unitVarinatModel)) {
        floorRiseArray = settings.generateFloorRise(unitModel.get('building_id'));
        floorRise = floorRiseArray[unitModel.get('floor')];
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
      apartmentVariantCollection.reset(data);
      return apartmentVariantMasterCollection.reset(data);
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

    ApartmentVariantCollection.prototype.getApartmentMasterUnits = function() {
      var newUnits, units;
      units = [];
      newUnits = [];
      apartmentVariantMasterCollection.each(function(model) {
        var apartmentUnits;
        apartmentUnits = unitMasterCollection.where({
          unit_variant_id: model.get('id')
        });
        return units.push(apartmentUnits);
      });
      $.each(units, function(index, value) {
        return newUnits = $.merge(newUnits, value);
      });
      return newUnits;
    };

    ApartmentVariantCollection.prototype.getApartmentUnitTypes = function() {
      var unit_types;
      unit_types = [];
      apartmentVariantMasterCollection.each(function(item) {
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

    return ApartmentVariantCollection;

  })(Backbone.Collection);

  window.apartmentVariantCollection = new ApartmentVariantCollection;

  window.apartmentVariantMasterCollection = new ApartmentVariantCollection;

  window.apartmentVariant = new ApartmentVariant;

}).call(this);

//# sourceMappingURL=../../frontend/entities/apartment.variant.entity.js.map