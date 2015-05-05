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

  CommonFloor.NoUnitsView = (function(superClass) {
    extend(NoUnitsView, superClass);

    function NoUnitsView() {
      return NoUnitsView.__super__.constructor.apply(this, arguments);
    }

    NoUnitsView.prototype.template = '<div><div class="col-xs-12 col-sm-12 col-md-3 us-left-content"> <div class="list-view-container w-map animated fadeIn"></div> No units matching the selection </div></div>';

    return NoUnitsView;

  })(Marionette.ItemView);

  CommonFloor.NoUnitsCtrl = (function(superClass) {
    extend(NoUnitsCtrl, superClass);

    function NoUnitsCtrl() {
      return NoUnitsCtrl.__super__.constructor.apply(this, arguments);
    }

    NoUnitsCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.NoUnitsView);
    };

    return NoUnitsCtrl;

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
        plotVariantCollection.setPlotVariantAttributes(response.plot_variants);
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
    Router.push({
      'type': 'plot',
      'count': plotVariantCollection.getPlotUnits()
    });
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
    if (plotVariantCollection.getPlotUnits().length !== 0) {
      Router.push({
        'type': s.capitalize('plots'),
        'count': plotVariantCollection.getPlotUnits()
      });
    }
    controller = _.max(Router, function(item) {
      return parseInt(item.count.length);
    });
    return Router;
  };

  CommonFloor.applyVillaClasses = function() {
    return $('.villa').each(function(ind, item) {
      var availability, id, unit;
      id = parseInt(item.id);
      unit = unitCollection.findWhere({
        id: id
      });
      if (!_.isUndefined(unit)) {
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        return $('#' + id).attr('class', 'layer villa ' + availability);
      }
    });
  };

  CommonFloor.applyPlotClasses = function() {
    return $('.plot').each(function(ind, item) {
      var availability, id, unit;
      id = parseInt(item.id);
      unit = unitCollection.findWhere({
        id: id
      });
      if (!_.isUndefined(unit)) {
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        return $('#' + id).attr('class', 'layer plot ' + availability);
      }
    });
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
      if (param_key !== 'price_min' && param_key !== 'price_max' && value_arr[1] !== "") {
        param_val = value_arr[1];
        param_val_arr = param_val.split(',');
        collection = [];
        $.each(param_val_arr, function(index, value) {
          var paramkey;
          paramkey = {};
          paramkey[param_key] = parseInt(value);
          if (param_key === 'availability') {
            paramkey[param_key] = value;
          }
          return $.merge(collection, unitCollection.where(paramkey));
        });
        return unitCollection.reset(collection);
      }
    });
    CommonFloor.filterBudget();
    return CommonFloor.resetCollections();
  };

  CommonFloor.resetCollections = function() {
    var apartments, buildings, bunglows, plots, unitTypes;
    apartments = [];
    bunglows = [];
    unitTypes = [];
    plots = [];
    buildings = [];
    unitCollection.each(function(item) {
      var building, property, unitType;
      unitType = unitTypeMasterCollection.findWhere({
        'id': item.get('unit_type_id')
      });
      if (item.get('building_id') !== 0) {
        building = buildingMasterCollection.findWhere({
          'id': item.get('building_id')
        });
        buildings.push(building);
      }
      property = window.propertyTypes[unitType.get('property_type_id')];
      if (s.decapitalize(property) === 'apartments' || s.decapitalize(property) === 'penthouse') {
        apartments.push(apartmentVariantMasterCollection.get(item.get('unit_variant_id')));
      }
      if (s.decapitalize(property) === 'villas/Bungalows') {
        bunglows.push(bunglowVariantMasterCollection.get(item.get('unit_variant_id')));
      }
      if (s.decapitalize(property) === 'plot') {
        plots.push(plotVariantMasterCollection.get(item.get('unit_variant_id')));
      }
      return unitTypes.push(unitType);
    });
    apartmentVariantCollection.reset(apartments);
    bunglowVariantCollection.reset(bunglows);
    plotVariantCollection.reset(plots);
    unitTypeCollection.reset(unitTypes);
    buildingCollection.reset(buildings);
    return unitTempCollection.reset(unitCollection.toArray());
  };

  CommonFloor.filterBudget = function() {
    var budget;
    CommonFloor.resetCollections();
    budget = [];
    unitCollection.each(function(item) {
      var unitPrice;
      unitPrice = window.unit.getUnitDetails(item.get('id'))[3];
      if (unitPrice >= parseInt(CommonFloor.defaults['price_min']) && unitPrice <= parseInt(CommonFloor.defaults['price_max'])) {
        return budget.push(item);
      }
    });
    return unitCollection.reset(budget);
  };

  CommonFloor.getFilters = function() {
    var aptfilters, filters, plotfilters, villafilters;
    filters = [];
    villafilters = CommonFloor.getVillaFilters();
    aptfilters = CommonFloor.getApartmentFilters();
    plotfilters = CommonFloor.getPlotFilters();
    filters.push({
      'Villa': villafilters,
      'Apartment/Penthouse': aptfilters,
      'Plot': plotfilters
    });
    return filters;
  };

  CommonFloor.getVillaFilters = function() {
    var filters, unitTypes, unitVariants, unit_type, unit_variant;
    unitVariants = [];
    unit_variant = '';
    unitTypes = [];
    unit_type = '';
    $.each(CommonFloor.defaults, function(index, value) {
      if (value !== "" && index === 'unitVariants') {
        if (!_.isUndefined(bunglowVariantMasterCollection.get(parseInt(value)))) {
          unit_variant = bunglowVariantMasterCollection.findWhere({
            'id': parseInt(value)
          });
          unitVariants.push(unit_variant.get('unit_variant_name'));
        }
      }
      if (value !== "" && index === 'unitTypes' && $.inArray(parseInt(value), bunglowVariantMasterCollection.getVillaUnitTypes()) > -1) {
        unit_type = unitTypeMasterCollection.findWhere({
          'id': parseInt(value)
        });
        return unitTypes.push(unit_type.get('name'));
      }
    });
    filters = {
      'unitVariants': unitVariants,
      'unitTypes': unitTypes,
      'count': bunglowVariantMasterCollection.getBunglowUnits().length
    };
    $.each(filters, function(index, value) {
      if (value.length === 0) {
        return filters = _.omit(filters, index);
      }
    });
    return filters;
  };

  CommonFloor.getApartmentFilters = function() {
    var filters, unitTypes, unitVariants, unit_type, unit_variant;
    unitVariants = [];
    unit_variant = '';
    unitTypes = [];
    unit_type = '';
    $.each(CommonFloor.defaults, function(index, value) {
      if (value !== "" && index === 'unitVariants') {
        if (!_.isUndefined(apartmentVariantMasterCollection.get(parseInt(value)))) {
          unit_variant = apartmentVariantMasterCollection.findWhere({
            'id': parseInt(value)
          });
          unitVariants.push(unit_variant.get('unit_variant_name'));
        }
      }
      if (value !== "" && index === 'unitTypes' && $.inArray(parseInt(value), apartmentVariantMasterCollection.getApartmentUnitTypes()) > -1) {
        unit_type = unitTypeMasterCollection.findWhere({
          'id': parseInt(value)
        });
        return unitTypes.push(unit_type.get('name'));
      }
    });
    filters = {
      'unitVariants': unitVariants,
      'unitTypes': unitTypes,
      'count': apartmentVariantMasterCollection.getApartmentUnits().length
    };
    $.each(filters, function(index, value) {
      if (value.length === 0) {
        return filters = _.omit(filters, index);
      }
    });
    return filters;
  };

  CommonFloor.getPlotFilters = function() {
    var filters, unitTypes, unitVariants, unit_type, unit_variant;
    unitVariants = [];
    unit_variant = '';
    unitTypes = [];
    unit_type = '';
    filters = [];
    $.each(CommonFloor.defaults, function(index, value) {
      if (value !== "" && index === 'unitVariants') {
        if (!_.isUndefined(plotVariantMasterCollection.get(parseInt(value)))) {
          unit_variant = plotVariantMasterCollection.findWhere({
            'id': parseInt(value)
          });
          unitVariants.push(unit_variant.get('unit_variant_name'));
        }
      }
      if (value !== "" && index === 'unitTypes' && $.inArray(parseInt(value), plotVariantMasterCollection.getPlotUnitTypes()) > -1) {
        unit_type = unitTypeMasterCollection.findWhere({
          'id': parseInt(value)
        });
        return unitTypes.push(unit_type.get('name'));
      }
    });
    filters = {
      'unitVariants': unitVariants,
      'unitTypes': unitTypes,
      'count': plotVariantMasterCollection.getPlotUnits().length
    };
    $.each(filters, function(index, value) {
      if (value.length === 0) {
        return filters = _.omit(filters, index);
      }
    });
    return filters;
  };

}).call(this);

//# sourceMappingURL=../../frontend/common/common.js.map