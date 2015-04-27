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
        unitTypeCollection.setUnitTypeAttributes(response.unit_types);
        buildingCollection.setBuildingAttributes(response.buildings);
        apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants);
        floorLayoutCollection.setFloorLayoutAttributes(response.floor_layout);
        window.propertyTypes = response.property_types;
        return unitCollection.setUnitAttributes(response.units);
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
    if (project.get('project_master').front === "") {
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

  CommonFloor.filter = function() {
    var element, i, index, len, param_arr, param_key, params, paramsArray;
    if (window.location.href.indexOf('=') > -1) {
      params = params;
      paramsArray = params.split('&');
      for (index = i = 0, len = paramsArray.length; i < len; index = ++i) {
        element = paramsArray[index];
        param_key = element.split('=');
        CommonFloor.defaults[param_key[0]] = param_key[1];
      }
      params = 'unit_variant_id:' + CommonFloor.defaults['unitVariants'] + '&unit_type_id:' + CommonFloor.defaults['unitTypes'] + '&price_min:' + CommonFloor.defaults['price_min'] + 'price_max:' + CommonFloor.defaults['price_max'] + '&availability:' + CommonFloor.defaults['availability'];
    } else {
      params = 'unit_variant_id:' + CommonFloor.defaults['unitVariants'] + '&unit_type_id:' + CommonFloor.defaults['unitTypes'] + '&price_min:' + CommonFloor.defaults['price_min'] + 'price_max:' + CommonFloor.defaults['price_max'] + '&availability:' + CommonFloor.defaults['availability'];
    }
    param_arr = params.split('&');
    $.each(param_arr, function(index, value) {
      var collection, param_val, param_val_arr, value_arr;
      value_arr = value.split(':');
      param_key = value_arr[0];
      if (param_key !== 'price_min' && param_key !== 'price_max') {
        param_val = value_arr[1];
        param_val_arr = param_val.split(',');
        collection = [];
        $.each(param_val_arr, function(index, value) {
          var paramkey;
          paramkey = {};
          paramkey[param_key] = parseInt(value);
          if (_.isString(value)) {
            paramkey[param_key] = value;
          }
          return $.merge(collection, unitTempCollection.where(paramkey));
        });
        return unitTempCollection.reset(collection);
      }
    });
    CommonFloor.filterBudget();
    return CommonFloor.resetCollections();
  };

  CommonFloor.resetCollections = function() {
    var apartments, bunglows, unitTypes;
    apartments = [];
    bunglows = [];
    unitTypes = [];
    unitTempCollection.each(function(item) {
      var property, unitType;
      unitType = unitTypeCollection.findWhere({
        'id': item.get('unit_type_id')
      });
      property = window.propertyTypes[unitType.get('property_type_id')];
      if (s.decapitalize(property) === 'apartments') {
        apartments.push(apartmentVariantCollection.get(item.get('unit_variant_id')));
      }
      if (s.decapitalize(property) === 'bunglows') {
        bunglows.push(bunglowVariantCollection.get(item.get('unit_variant_id')));
      }
      return unitTypes.push(unitType);
    });
    apartmentVariantTempCollection.reset(apartments);
    bunglowVariantTempCollection.reset(bunglows);
    return unitTypeTempCollection.reset(unitTypes);
  };

  CommonFloor.filterBudget = function() {
    var budget;
    budget = [];
    unitTempCollection.each(function(item) {
      var unitPrice;
      console.log(unitPrice = window.unit.getUnitDetails(item.get('id'))[3]);
      if (unitPrice > parseInt(CommonFloor.defaults['price_min']) && unitPrice < parseInt(CommonFloor.defaults['price_max'])) {
        return budget.push(item);
      }
    });
    return unitTempCollection.reset(budget);
  };

}).call(this);

//# sourceMappingURL=../../frontend/common/common.js.map