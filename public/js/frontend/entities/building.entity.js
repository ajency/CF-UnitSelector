(function() {
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
        'building_id': building_id
      });
      units = new Backbone.Collection(units);
      variants = units.pluck("unit_variant_id");
      $.each(variants, function(index, value) {
        var varinatModel;
        varinatModel = apartmentVariantCollection.findWhere({
          'id': value
        });
        return unitTypes.push(varinatModel.get('unit_type_id'));
      });
      unitTypes = _.uniq(unitTypes);
      return unitTypes;
    };

    Building.prototype.getUnitTypesCount = function(building_id, unitTypes) {
      var types;
      types = [];
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
            'building_id': building_id
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
      var temp, units;
      units = unitCollection.where({
        'building_id': building_id
      });
      temp = [];
      $.each(units, function(index, value) {
        var variants;
        variants = apartmentVariantCollection.findWhere({
          'id': value.get('unit_variant_id')
        });
        return temp.push(variants.get('super_built_up_area'));
      });
      return _.min(temp);
    };

    Building.prototype.getMinimumCost = function(building_id) {
      var temp, units;
      units = unitCollection.where({
        'building_id': building_id
      });
      temp = [];
      $.each(units, function(index, value) {
        units = unit.getUnitDetails(value.get('id'));
        return temp.push(units[3]);
      });
      return _.min(temp);
    };

    Building.prototype.checkRotationView = function(buildingId) {
      var buildingModel, rotationImages;
      buildingModel = buildingCollection.findWhere({
        'building_id': parseInt(buildingId)
      });
      if (buildingId === "") {
        return false;
      }
      rotationImages = buildingModel.get('threed_view').image.length;
      if (parseInt(rotationImages) >= 4) {
        buildingModel.set('rotation', 'yes');
      } else {
        buildingModel.set('rotation', 'no');
      }
      return buildingModel.get('rotation');
    };

    Building.prototype.getBuildingUnits = function(building_id) {
      var units;
      units = unitCollection.where({
        'building_id': building_id
      });
      return units;
    };

    Building.prototype.checkRotationView = function(building) {
      var transitionImages;
      transitionImages = [];
      $.merge(transitionImages, building.get('building_master')['right-front']);
      $.merge(transitionImages, building.get('building_master')['back-right']);
      $.merge(transitionImages, building.get('building_master')['left-back']);
      $.merge(transitionImages, building.get('building_master')['front-left']);
      if (parseInt(transitionImages.length) >= 4) {
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

    BuildingCollection.prototype.url = function() {
      return "http://commonfloor.local/methods/functions.php?action=load_buildings";
    };

    BuildingCollection.prototype.setBuildingAttributes = function(data) {
      console.log(data);
      return buildingCollection.reset(data);
    };

    return BuildingCollection;

  })(Backbone.Collection);

  window.buildingCollection = new BuildingCollection;

  window.building = new Building;

}).call(this);

//# sourceMappingURL=../../frontend/entities/building.entity.js.map