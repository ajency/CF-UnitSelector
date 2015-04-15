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
        'building_id': this.model.get('id')
      });
      variants = units.pluck("unit_variant_id");
      $.each(variants, function(index, value) {
        var varinatModel;
        varinatModel = apartmentVariants.findWhere({
          'id': value
        });
        return unitTypes.push(varinatModel.get('unit_type_id'));
      });
      unitTypes = _.uniq(unitTypes);
      return unitTypes;
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

}).call(this);

//# sourceMappingURL=../../frontend/entities/building.entity.js.map