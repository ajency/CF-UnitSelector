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
        bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants);
        settings.setSettingsAttributes(response.settings);
        unitCollection.setUnitAttributes(response.units);
        unitTypeCollection.setUnitTypeAttributes(response.unit_types);
        buildingCollection.setBuildingAttributes(response.buildings);
        apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants);
        return floorLayoutCollection.setFloorLayoutAttributes(response.floor_layout);
      },
      error: function(response) {
        this.region = new Marionette.Region({
          el: '#noFound-template'
        });
        return new CommonFloor.ProjectCtrl({
          region: this.region
        });
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
    CommonFloor.loadJSONData();
    if (Object.keys(project.get('project_master')).length === 0) {
      CommonFloor.navigate('#/list-view', true);
      return CommonFloor.router.storeRoute();
    } else {
      CommonFloor.navigate('#/master-view', true);
      return CommonFloor.router.storeRoute();
    }
  };

  CommonFloor.checkListView = function() {
    var controller;
    return controller = CommonFloor.propertyMaxUnits();
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

  window.numDifferentiation = function(val) {
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' Cr';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + ' Lac';
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2) + ' K';
    }
    return val;
  };

  window.convertRupees = function(val) {
    $('#price').autoNumeric('init');
    return $('#price').autoNumeric('set', val);
  };

  CommonFloor.propertyTypes = function() {
    var Router, controller;
    Router = [];
    if (bunglowVariantCollection.getBunglowUnits().length !== 0) {
      Router.push({
        'type': s.capitalize('villas'),
        'count': bunglowVariantCollection.getBunglowUnits()
      });
    }
    if (buildingCollection.toArray().length !== 0) {
      Router.push({
        'type': s.capitalize('buildings'),
        'count': buildingCollection.toArray()
      });
    }
    controller = _.max(Router, function(item) {
      return parseInt(item.count.length);
    });
    return Router;
  };

}).call(this);

//# sourceMappingURL=../../frontend/common/common.js.map