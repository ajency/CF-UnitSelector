(function() {
  var Building, BuildingCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Building = (function(superClass) {
    extend(Building, superClass);

    function Building() {
      return Building.__super__.constructor.apply(this, arguments);
    }

    Building.prototype.getUnitTypecount = function(building_id) {
      var response, status, statusColl, statusObject;
      response = [];
      if (building_id === "") {
        return response;
      }
      statusObject = settings.get('status');
      statusColl = new Backbone.Collection(statusObject);
      status = statusColl.findWhere({
        'name': 'Available'
      });
      apartmentVariantCollection.each(function(item) {
        var units;
        units = unitCollection.where({
          'unit_variant': parseInt(item.get('id')),
          'building_id': parseInt(building_id),
          'status': parseInt(status.get('id'))
        });
        return response.push({
          id: item.get('id'),
          name: item.get('name'),
          count: units.length
        });
      });
      return response;
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

    BuildingCollection.prototype.setBuildingAttributes = function(project_id) {
      if (this.length === 0) {
        return buildingCollection.fetch({
          async: false,
          data: {
            project_id: project_id
          },
          success: (function(_this) {
            return function(collection, response) {
              var model;
              model = collection.models;
              if (response === 0) {
                return _this.reset();
              }
            };
          })(this)
        });
      }
    };

    return BuildingCollection;

  })(Backbone.Collection);

  window.buildingCollection = new BuildingCollection;

}).call(this);

//# sourceMappingURL=../../frontend/entities/building.entity.js.map