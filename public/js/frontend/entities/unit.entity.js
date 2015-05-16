(function() {
  var Unit, UnitCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Unit = (function(superClass) {
    extend(Unit, superClass);

    function Unit() {
      return Unit.__super__.constructor.apply(this, arguments);
    }

    Unit.prototype.getUnitDetails = function(unit_id) {
      var attributes, id, price, type, unit, unitType, unitVariant;
      id = parseInt(unit_id);
      unit = unitMasterCollection.findWhere({
        id: id
      });
      unitVariant = 0;
      type = '';
      price = 0;
      attributes = [];
      if (bunglowVariantMasterCollection.get(unit.get('unit_variant_id')) !== void 0) {
        unitVariant = bunglowVariantMasterCollection.findWhere({
          'id': unit.get('unit_variant_id')
        });
        type = 'villa';
        price = window.bunglowVariant.findUnitPrice(unit);
        attributes = unitVariant.get('variant_attributes');
      } else if (apartmentVariantMasterCollection.get(unit.get('unit_variant_id')) !== void 0) {
        unitVariant = apartmentVariantMasterCollection.findWhere({
          'id': unit.get('unit_variant_id')
        });
        type = 'apartment';
        price = window.apartmentVariant.findUnitPrice(unit);
        attributes = unitVariant.get('variant_attributes');
      } else if (plotVariantMasterCollection.get(unit.get('unit_variant_id')) !== void 0) {
        unitVariant = plotVariantMasterCollection.findWhere({
          'id': unit.get('unit_variant_id')
        });
        unitVariant.set('super_built_up_area', unitVariant.get('size'));
        type = 'plot';
        price = window.plotVariant.findUnitPrice(unit);
        attributes = unitVariant.get('variant_attributes');
      }
      unitType = unitTypeMasterCollection.findWhere({
        'id': unit.get('unit_type_id')
      });
      return [unitVariant, unitType, type, price, attributes];
    };

    Unit.prototype.getFilterUnitDetails = function(unit_id) {
      var attributes, id, price, type, unit, unitType, unitVariant;
      id = parseInt(unit_id);
      unit = unitCollection.findWhere({
        id: id
      });
      unitVariant = 0;
      type = '';
      price = 0;
      attributes = [];
      if (bunglowVariantCollection.get(unit.get('unit_variant_id')) !== void 0) {
        unitVariant = bunglowVariantCollection.findWhere({
          'id': unit.get('unit_variant_id')
        });
        type = 'villa';
        price = window.bunglowVariant.findUnitPrice(unit);
        attributes = unitVariant.get('variant_attributes');
      } else if (apartmentVariantCollection.get(unit.get('unit_variant_id')) !== void 0) {
        unitVariant = apartmentVariantCollection.findWhere({
          'id': unit.get('unit_variant_id')
        });
        type = 'apartment';
        price = window.apartmentVariant.findUnitPrice(unit);
        attributes = unitVariant.get('variant_attributes');
      } else if (plotVariantCollection.get(unit.get('unit_variant_id')) !== void 0) {
        unitVariant = plotVariantCollection.findWhere({
          'id': unit.get('unit_variant_id')
        });
        unitVariant.set('super_built_up_area', unitVariant.get('size'));
        type = 'plot';
        price = window.plotVariant.findUnitPrice(unit);
        attributes = unitVariant.get('variant_attributes');
      }
      unitType = unitTypeMasterCollection.findWhere({
        'id': unit.get('unit_type_id')
      });
      return [unitVariant, unitType, type, price, attributes];
    };

    return Unit;

  })(Backbone.Model);

  UnitCollection = (function(superClass) {
    extend(UnitCollection, superClass);

    function UnitCollection() {
      return UnitCollection.__super__.constructor.apply(this, arguments);
    }

    UnitCollection.prototype.model = Unit;

    UnitCollection.prototype.getRecord = function() {
      return this.currentModel;
    };

    UnitCollection.prototype.setRecord = function(model) {
      return this.currentModel = model;
    };

    UnitCollection.prototype.next = function() {
      var first, next, record, units;
      units = _.pluck(this.toArray(), 'id');
      next = this.at(this.indexOf(this.getRecord()) + 1);
      if (_.isUndefined(next)) {
        first = _.first(units);
        if (this.currentModel.get('id') === first) {
          return next;
        } else {
          record = this.findWhere({
            'id': first
          });
          return record;
        }
      } else {
        return next;
      }
    };

    UnitCollection.prototype.prev = function() {
      var last, prev, record, units;
      units = _.pluck(this.toArray(), 'id');
      prev = this.at(this.indexOf(this.getRecord()) - 1);
      if (_.isUndefined(prev)) {
        last = _.last(units);
        if (this.currentModel.get('id') === last) {
          return prev;
        } else {
          record = this.findWhere({
            'id': last
          });
          return record;
        }
      } else {
        return prev;
      }
    };

    UnitCollection.prototype.setUnitAttributes = function(data) {
      var response;
      response = this.setUnitType(data);
      unitCollection.reset(response);
      unitMasterCollection.reset(response);
      return window.unitTempCollection = unitCollection.clone();
    };

    UnitCollection.prototype.setUnitType = function(data) {
      $.each(data, function(index, value) {
        var unitType, unitVariant;
        unitVariant = '';
        if (bunglowVariantCollection.get(value.unit_variant_id) !== void 0) {
          unitVariant = bunglowVariantCollection.findWhere({
            'id': value.unit_variant_id
          });
        }
        if (apartmentVariantCollection.get(value.unit_variant_id) !== void 0) {
          unitVariant = apartmentVariantCollection.findWhere({
            'id': value.unit_variant_id
          });
        }
        if (plotVariantCollection.get(value.unit_variant_id) !== void 0) {
          unitVariant = plotVariantCollection.findWhere({
            'id': value.unit_variant_id
          });
          unitVariant.set('super_built_up_area', unitVariant.get('size'));
        }
        unitType = unitTypeCollection.findWhere({
          'id': unitVariant.get('unit_type_id')
        });
        value['unit_type_id'] = unitType.get('id');
        return value['area'] = unitVariant.get('super_built_up_area');
      });
      return data;
    };

    return UnitCollection;

  })(Backbone.Collection);

  window.unitCollection = new UnitCollection;

  window.unitMasterCollection = new UnitCollection;

  window.unit = new Unit;

}).call(this);

//# sourceMappingURL=../../frontend/entities/unit.entity.js.map