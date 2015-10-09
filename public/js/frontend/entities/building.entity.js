var Building, BuildingCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Building = (function(superClass) {
  extend(Building, superClass);

  function Building() {
    return Building.__super__.constructor.apply(this, arguments);
  }

  Building.prototype.getUnitTypes = function(building_id) {
    var unitTypes, units, variants;
    unitTypes = [];
    if (building_id === "") {
      return unitTypes;
    }
    units = unitCollection.where({
      'building_id': parseInt(building_id)
    });
    units = new Backbone.Collection(units);
    variants = units.pluck("unit_variant_id");
    $.each(variants, function(index, value) {
      var varinatModel;
      varinatModel = apartmentVariantCollection.findWhere({
        'id': parseInt(value)
      });
      return unitTypes.push(varinatModel.get('unit_type_id'));
    });
    unitTypes = _.uniq(unitTypes);
    return unitTypes;
  };

  Building.prototype.getUnitTypesCount = function(building_id, unitTypes) {
    var types;
    types = [];
    if (building_id === "") {
      return types;
    }
    $.each(unitTypes, function(ind, val) {
      var unitTypeModel, units, variants;
      unitTypeModel = unitTypeCollection.findWhere({
        'id': val
      });
      variants = apartmentVariantCollection.where({
        'unit_type_id': val
      });
      units = [];
      $.each(variants, function(index, value) {
        var unitsColl;
        unitsColl = unitCollection.where({
          'unit_variant_id': value.get('id'),
          'building_id': building_id,
          'availability': 'available'
        });
        return $.merge(units, unitsColl);
      });
      return types.push({
        'name': unitTypeModel.get('name'),
        'units': units.length
      });
    });
    return types;
  };

  Building.prototype.getMinimumArea = function(building_id) {
    var min, temp, units;
    if (building_id === "") {
      return;
    }
    units = unitCollection.where({
      'building_id': building_id
    });
    temp = [];
    $.each(units, function(index, value) {
      var variants;
      variants = apartmentVariantCollection.findWhere({
        'id': value.get('unit_variant_id')
      });
      return temp.push(parseFloat(variants.get('super_built_up_area')));
    });
    min = 0;
    if (temp.length !== 0) {
      min = _.min(temp);
    }
    return min;
  };

  Building.prototype.getMinimumCost = function(building_id) {
    var min, temp, units;
    if (building_id === "") {
      return;
    }
    units = unitCollection.where({
      'building_id': building_id
    });
    temp = [];
    $.each(units, function(index, value) {
      units = unit.getUnitDetails(value.get('id'));
      return temp.push(parseFloat(units[3]));
    });
    min = 0;
    if (temp.length !== 0) {
      min = _.min(temp);
    }
    return min;
  };

  Building.prototype.getBuildingUnits = function(building_id) {
    var units, unitsFloor, unitsPosition;
    if (building_id === "") {
      return;
    }
    units = unitCollection.where({
      'building_id': building_id
    });
    unitsFloor = _.sortBy(units, function(num) {
      return num.get('floor');
    });
    unitsPosition = _.sortBy(unitsFloor, function(num) {
      return num.get('position');
    });
    return units;
  };

  Building.prototype.checkRotationView = function(building) {
    var breakpoints, buildingModel, transitionImages;
    if (building === "") {
      return;
    }
    transitionImages = [];
    buildingModel = buildingCollection.findWhere({
      'id': parseInt(building)
    });
    breakpoints = buildingModel.get('breakpoints');
    if (parseInt(breakpoints.length) > 1) {
      this.set('rotation', 1);
    } else {
      this.set('rotation', 0);
    }
    return this.get('rotation');
  };

  return Building;

})(Backbone.Model);

BuildingCollection = (function(superClass) {
  extend(BuildingCollection, superClass);

  function BuildingCollection() {
    return BuildingCollection.__super__.constructor.apply(this, arguments);
  }

  BuildingCollection.prototype.model = Building;

  BuildingCollection.prototype.getRecord = function() {
    return this.currentModel;
  };

  BuildingCollection.prototype.setRecord = function(model) {
    return this.currentModel = model;
  };

  BuildingCollection.prototype.next = function() {
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

  BuildingCollection.prototype.prev = function() {
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

  BuildingCollection.prototype.setBuildingAttributes = function(data) {
    buildingCollection.reset(data);
    return buildingMasterCollection.reset(data);
  };

  return BuildingCollection;

})(Backbone.Collection);

window.buildingCollection = new BuildingCollection;

window.buildingMasterCollection = new BuildingCollection;

window.building = new Building;
