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
      var basicCost;
      basicCost = 0.00;
      if (!(unitModel instanceof Backbone.Model) || unitModel === "") {
        return;
      }
      basicCost = unitModel.get('selling_amount');
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

    ApartmentVariantCollection.prototype.getPenthouseUnits = function() {
      var units;
      units = [];
      unitCollection.each(function(model) {
        var property, unitType;
        unitType = unitTypeMasterCollection.findWhere({
          'id': model.get('unit_type_id')
        });
        property = window.propertyTypes[unitType.get('property_type_id')];
        if (s.decapitalize(property) === 'penthouse') {
          return units.push(model);
        }
      });
      return units;
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

    ApartmentVariantCollection.prototype.getApartmentAttributes = function() {
      var attributes, types;
      attributes = [];
      types = [];
      apartmentVariantMasterCollection.each(function(item) {
        return $.each(item.get('variant_attributes'), function(index, value) {
          if ($.inArray(value, attributes) === -1) {
            return attributes.push(value);
          }
        });
      });
      return [attributes];
    };

    return ApartmentVariantCollection;

  })(Backbone.Collection);

  window.apartmentVariantCollection = new ApartmentVariantCollection;

  window.apartmentVariantMasterCollection = new ApartmentVariantCollection;

  window.apartmentVariant = new ApartmentVariant;

}).call(this);

//# sourceMappingURL=../../frontend/entities/apartment.variant.entity.js.map