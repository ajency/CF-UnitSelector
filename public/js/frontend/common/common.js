(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.NothingFoundView = (function(superClass) {
    extend(NothingFoundView, superClass);

    function NothingFoundView() {
      return NothingFoundView.__super__.constructor.apply(this, arguments);
    }

    NothingFoundView.prototype.template = '#noFound-template';

    return NothingFoundView;

  })(Marionette.ItemView);

  CommonFloor.NothingFoundCtrl = (function(superClass) {
    extend(NothingFoundCtrl, superClass);

    function NothingFoundCtrl() {
      return NothingFoundCtrl.__super__.constructor.apply(this, arguments);
    }

    NothingFoundCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.NothingFoundView);
    };

    return NothingFoundCtrl;

  })(Marionette.RegionController);

  CommonFloor.loadJSONData = function() {
    return $.ajax({
      type: 'GET',
      url: BASERESTURL + '/project/' + PROJECTID + '/step-two',
      async: false,
      success: function(response) {
        response = window.convertToInt(response);
        response = response.data;
        if (response.apartment_variants.length !== 0) {
          response.units = [
            {
              "id": 1,
              "unit_name": "Cullen Rowland",
              "building_id": 1,
              "unit_variant_id": 4,
              "facing": 1,
              "views": 5,
              "position": 7,
              "status": 3,
              "floor": 6
            }, {
              "unit_id": 2,
              "unit_name": "Colby Walters",
              "building_id": 1,
              "unit_variant_id": 5,
              "facing": 2,
              "views": 4,
              "position": 2,
              "status": 2,
              "floor": 7
            }, {
              "unit_id": 3,
              "unit_name": "Merritt Garner",
              "building_id": 3,
              "unit_variant_id": 4,
              "facing": 1,
              "views": 9,
              "position": 3,
              "status": 1,
              "floor": 7
            }, {
              "unit_id": 4,
              "unit_name": "Quentin Whitney",
              "building_id": 3,
              "unit_variant_id": 4,
              "facing": 8,
              "views": 3,
              "position": 3,
              "status": 2,
              "floor": 2
            }
          ];
        }
        bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants);
        settings.setSettingsAttributes(response.settings);
        unitCollection.setUnitAttributes(response.units);
        unitTypeCollection.setUnitTypeAttributes(response.unit_types);
        buildingCollection.setBuildingAttributes(response.buildings);
        return apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants);
      },
      error: function(response) {
        return console.log("aaaaaaaaaaassdff");
      }
    });
  };

  CommonFloor.propertyMaxUnits = function() {
    var Router, controller;
    Router = [];
    Router.push({
      'type': 'bunglows',
      'count': bunglowVariantCollection.getBunglowUnits()
    });
    Router.push({
      'type': 'building',
      'count': apartmentVariantCollection.getApartmentUnits()
    });
    console.log(Router);
    controller = _.max(Router, function(item) {
      return parseInt(item.count.length);
    });
    return controller;
  };

  CommonFloor.checkPropertyType = function() {
    var controller;
    CommonFloor.loadJSONData();
    controller = CommonFloor.propertyMaxUnits();
    if (project.get('project_master').front === "") {
      return CommonFloor.navigate('#/list-view/' + controller.type, true);
    } else {
      return CommonFloor.navigate('#/master-view/' + controller.type, true);
    }
  };

  CommonFloor.checkListView = function() {
    var controller;
    controller = CommonFloor.propertyMaxUnits();
    return CommonFloor.navigate('#/list-view/' + controller.type, true);
  };

  window.convertToInt = function(response) {
    return $.each(response, function(index, value) {
      return $.map(value, function(item) {
        return $.each(item, function(ind, val) {
          return parseInt(val);
        });
      });
    });
  };

}).call(this);

//# sourceMappingURL=../../frontend/common/common.js.map