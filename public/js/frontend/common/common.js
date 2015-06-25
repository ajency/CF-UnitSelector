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

    NoUnitsView.prototype.template = '<div> <div id="trig" class="toggle-button"></div> <div id="view_toggle" class="toggle-view-button map"></div> <div class="list-view-container w-map animated fadeIn"> <div class="text-center" id="searchSorryPageWidget"> <div class="m-t-10 bldg-list"> <span class="icon-wondering"></span> <div class="m-t-10">Sorry! We havent found any properties matching your search.</div> <div>Please retry with different search options.</div> </div> </div> </div> </div>';

    NoUnitsView.prototype.ui = {
      viewtog: '#view_toggle',
      trig: '#trig'
    };

    NoUnitsView.prototype.events = {
      'click @ui.trig': function(e) {
        return $('.list-container').toggleClass('closed');
      },
      'click @ui.viewtog': function(e) {
        $('.us-left-content').toggleClass('not-visible visible');
        return $('.us-right-content').toggleClass('not-visible visible');
      }
    };

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
    var decimal, valBudget;
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2);
      decimal = val.split('.')[1];
      valBudget = decimal % 5;
      valBudget = valBudget / 100;
      val = val - valBudget;
      val = val.toFixed(2);
      val = val + ' Cr';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2);
      decimal = val.split('.')[1];
      valBudget = decimal % 5;
      valBudget = valBudget / 100;
      val = val - valBudget;
      val = val.toFixed(2);
      val = val + ' Lac';
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2);
      decimal = val.split('.')[1];
      valBudget = decimal % 5;
      valBudget = valBudget / 100;
      val = val - valBudget;
      val = val.toFixed(2);
      val = val + ' K';
    }
    return val;
  };

  window.calculatePerc = function(value, total) {
    var perc;
    value = parseInt(value);
    total = parseInt(total);
    perc = value / total;
    perc = perc * 100;
    perc = perc.toFixed(2);
    return perc;
  };

  window.bookingPortalUrl = 'http://dev.commonfloor.com/book-your-property';

  window.convertRupees = function(val) {
    $('#price').autoNumeric('init');
    return $('#price').autoNumeric('set', val);
  };

  CommonFloor.propertyTypes = function() {
    var Router, controller;
    Router = [];
    if (bunglowVariantCollection.getBunglowUnits().length !== 0) {
      Router.push({
        'type': s.capitalize('villa(s)'),
        'count': bunglowVariantCollection.getBunglowUnits(),
        'type_name': '(V)'
      });
    }
    if (apartmentVariantCollection.getApartmentUnits().length !== 0) {
      Router.push({
        'type': s.capitalize('apartment(s)/Penthouse(s)'),
        'count': apartmentVariantCollection.getApartmentUnits(),
        'type_name': '(A)/(PH)'
      });
    }
    if (plotVariantCollection.getPlotUnits().length !== 0) {
      Router.push({
        'type': s.capitalize('plot(s)'),
        'count': plotVariantCollection.getPlotUnits(),
        'type_name': '(P)'
      });
    }
    controller = _.max(Router, function(item) {
      return parseInt(item.count.length);
    });
    return Router;
  };

  CommonFloor.masterPropertyTypes = function() {
    var Router, controller;
    Router = [];
    if (bunglowVariantCollection.getBunglowMasterUnits().length !== 0) {
      Router.push({
        'type': s.capitalize('villas'),
        'count': bunglowVariantCollection.getBunglowMasterUnits(),
        'type_name': '(V)',
        'name': 'villa'
      });
    }
    if (apartmentVariantCollection.getApartmentMasterUnits().length !== 0) {
      Router.push({
        'type': s.capitalize('apartments'),
        'count': apartmentVariantCollection.getApartmentMasterUnits(),
        'type_name': '(A)',
        'name': 'apartment'
      });
    }
    if (plotVariantCollection.getPlotMasterUnits().length !== 0) {
      Router.push({
        'type': s.capitalize('plots'),
        'count': plotVariantCollection.getPlotMasterUnits(),
        'type_name': '(P)',
        'name': 'plot'
      });
    }
    controller = _.max(Router, function(item) {
      return parseInt(item.count.length);
    });
    return Router;
  };

  CommonFloor.applyAvailabilClasses = function(classname) {
    $('.layer').each(function(ind, item) {
      var availability, class_name, id, unit;
      id = parseInt(item.id);
      class_name = $('#' + id).attr('class');
      unit = unitCollection.findWhere({
        id: id
      });
      if (!_.isUndefined(unit)) {
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        return $('#' + id).attr('class', class_name + ' ' + availability);
      }
    });
    return $('.building').each(function(ind, item) {
      var class_name, id, unit;
      id = parseInt(item.id);
      class_name = $('#' + id).attr('class');
      unit = unitCollection.where({
        'building_id': id,
        'availability': 'available'
      });
      if (unit.length > 0) {
        return $('#' + id).attr('class', class_name + ' available');
      } else {
        return $('#' + id).attr('class', class_name + ' sold');
      }
    });
  };

  CommonFloor.randomClass = function() {
    return $('.layer').each(function(ind, item) {
      var id;
      id = parseInt(item.id);
      return $('#' + id).attr('style', 'transform: rotateY(0deg) scale(1); -webkit-transform: rotateY(0deg) scale(1);');
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
      params = 'type:' + CommonFloor.defaults['type'] + '&unit_variant_id:' + CommonFloor.defaults['unitVariants'] + '&unit_type_id:' + CommonFloor.defaults['unitTypes'] + '&price_min:' + CommonFloor.defaults['price_min'] + '&price_max:' + CommonFloor.defaults['price_max'] + '&availability:' + CommonFloor.defaults['availability'] + '&area_min:' + CommonFloor.defaults['area_min'] + '&area_max:' + CommonFloor.defaults['area_max'] + '&building_id:' + CommonFloor.defaults['building'] + '&floor_min:' + CommonFloor.defaults['floor_min'] + '&floor_max:' + CommonFloor.defaults['floor_max'] + '&flooring:' + CommonFloor.defaults['flooring'];
    } else {
      params = 'type:' + CommonFloor.defaults['type'] + '&unit_variant_id:' + CommonFloor.defaults['unitVariants'] + '&unit_type_id:' + CommonFloor.defaults['unitTypes'] + '&price_min:' + CommonFloor.defaults['price_min'] + '&price_max:' + CommonFloor.defaults['price_max'] + '&availability:' + CommonFloor.defaults['availability'] + '&area_min:' + CommonFloor.defaults['area_min'] + '&area_max:' + CommonFloor.defaults['area_max'] + '&building_id:' + CommonFloor.defaults['building'] + '&floor_min:' + CommonFloor.defaults['floor_min'] + '&floor_max:' + CommonFloor.defaults['floor_max'] + '&flooring:' + CommonFloor.defaults['flooring'];
    }
    param_arr = params.split('&');
    $.each(param_arr, function(index, value) {
      var collection, param_val, param_val_arr, value_arr;
      value_arr = value.split(':');
      param_key = value_arr[0];
      if (param_key === 'type' && value_arr[1] !== "") {
        CommonFloor.resetCollections();
        collection = CommonFloor.resetProperyType(value_arr[1]);
      }
      if (param_key !== 'price_min' && param_key !== 'price_max' && value_arr[1] !== "" && param_key !== 'area_min' && param_key !== 'area_max' && param_key !== 'type' && param_key !== 'floor_min' && param_key !== 'floor_max' && param_key !== 'flooring') {
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
    if (CommonFloor.defaults['price_max'] !== "") {
      CommonFloor.filterBudget();
    }
    if (CommonFloor.defaults['area_max'] !== "") {
      CommonFloor.filterArea();
    }
    if (CommonFloor.defaults['floor_max'] !== "") {
      CommonFloor.filterFloor();
    }
    if (CommonFloor.defaults['flooring'] !== "") {
      CommonFloor.filterFlooringAttributes();
    }
    CommonFloor.resetCollections();
    return CommonFloor.applyFliterClass();
  };

  CommonFloor.resetProperyType = function(param) {
    var collection;
    collection = [];
    if (param === 'villa') {
      $.merge(collection, bunglowVariantCollection.getBunglowUnits());
    }
    if (param === 'apartment') {
      $.merge(collection, apartmentVariantCollection.getApartmentUnits());
    }
    if (param === 'plot') {
      $.merge(collection, plotVariantCollection.getPlotUnits());
    }
    console.log(collection);
    return collection;
  };

  CommonFloor.applyFliterClass = function() {
    var actualbuildings, actualunits, filterbuildings, filterunits, flag, notSelecteUnits, notSelectebuildings;
    actualunits = _.pluck(unitMasterCollection.toArray(), 'id');
    filterunits = _.pluck(unitCollection.toArray(), 'id');
    notSelecteUnits = _.difference(actualunits, filterunits);
    actualbuildings = _.pluck(buildingMasterCollection.toArray(), 'id');
    filterbuildings = _.pluck(buildingCollection.toArray(), 'id');
    notSelectebuildings = _.difference(actualbuildings, filterbuildings);
    flag = CommonFloor.applyNonFilterClass();
    if (flag === 0) {
      return false;
    }
    $('.villa,.plot,.apartment').each(function(ind, item) {
      var id;
      id = parseInt(item.id);
      if ($.inArray(id, filterunits) > -1) {
        return setTimeout(function() {
          return $('#' + id).attr('style', ' stroke-width: 3px; stroke-dasharray: 320 0;stroke-dashoffset: 0;stroke:#F68121; transform: rotateY(0deg) scale(1); -webkit-transform: rotateY(0deg) scale(1);');
        }, Math.random() * 1000);
      } else {
        return setTimeout(function() {
          return $('#' + id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0;transform: rotateY(0deg) scale(1); -webkit-transform: rotateY(0deg) scale(1);');
        }, Math.random() * 1000);
      }
    });
    return $('.building').each(function(ind, item) {
      var id, types;
      types = [];
      if (CommonFloor.defaults['type'] !== "") {
        types = CommonFloor.defaults['type'].split(',');
      }
      id = parseInt(item.id);
      if ($.inArray('villa', types) === -1 && $.inArray('plot', types) === -1) {
        if ($.inArray(id, filterbuildings) > -1 && filterbuildings.length !== 0) {
          return setTimeout(function() {
            return $('#' + id).attr('style', ' stroke-width: 3px; stroke-dasharray: 320 0;stroke-dashoffset: 0; stroke:#F68121; transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
          }, Math.random() * 1000);
        } else {
          return setTimeout(function() {
            return $('#' + id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0; transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
          }, Math.random() * 1000);
        }
      }
    });
  };

  CommonFloor.applyNonFilterClass = function() {
    var flag;
    flag = 0;
    if (CommonFloor.defaults['type'] !== "") {
      flag = 1;
    }
    $.each(CommonFloor.defaults['apartment'], function(index, value) {
      if (value !== "") {
        return flag = 1;
      }
    });
    $.each(CommonFloor.defaults['plot'], function(index, value) {
      if (value !== "") {
        return flag = 1;
      }
    });
    $.each(CommonFloor.defaults['villa'], function(index, value) {
      if (value !== "") {
        return flag = 1;
      }
    });
    $.each(CommonFloor.defaults['common'], function(index, value) {
      if (value !== "") {
        return flag = 1;
      }
    });
    if (flag === 0) {
      $('.villa,.plot,.apartment').each(function(ind, item) {
        var id;
        id = parseInt(item.id);
        return $('#' + id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0;transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
      });
      $('.building').each(function(ind, item) {
        var id;
        id = parseInt(item.id);
        return $('#' + id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0;transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
      });
    }
    return flag;
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
    return unitCollection.reset(unitCollection.toArray());
  };

  CommonFloor.filterBudget = function() {
    var budget;
    CommonFloor.resetCollections();
    budget = [];
    unitCollection.each(function(item) {
      var unitPrice;
      unitPrice = parseFloat(window.unit.getFilterUnitDetails(item.get('id'))[3]);
      if (unitPrice >= parseFloat(CommonFloor.defaults['common']['price_min']) && unitPrice <= parseFloat(CommonFloor.defaults['common']['price_max'])) {
        return budget.push(item);
      }
    });
    return unitCollection.reset(budget);
  };

  CommonFloor.filterFloor = function() {
    var floorArr;
    CommonFloor.resetCollections();
    floorArr = [];
    unitCollection.each(function(item) {
      var floor;
      floor = item.get('floor');
      if (floor >= parseInt(CommonFloor.defaults['common']['floor_min']) && floor <= parseInt(CommonFloor.defaults['common']['floor_max'])) {
        return floorArr.push(item);
      }
    });
    return unitCollection.reset(floorArr);
  };

  CommonFloor.filterArea = function() {
    var areaArr;
    CommonFloor.resetCollections();
    areaArr = [];
    unitCollection.each(function(item) {
      var area;
      area = item.get('area');
      if (area >= parseFloat(CommonFloor.defaults['common']['area_min']) && area <= parseFloat(CommonFloor.defaults['common']['area_max'])) {
        return areaArr.push(item);
      }
    });
    return unitCollection.reset(areaArr);
  };

  CommonFloor.getFilters = function() {
    var area, area_max, area_min, facings, filters, floor, floor_max, floor_min, flooring, main, max_price, min_price, price, results, status, type, typeArr, unitTypes, unitVariants, views;
    unitTypes = [];
    unitVariants = [];
    results = [];
    flooring = [];
    type = [];
    filters = [];
    price = [];
    area = [];
    type = [];
    status = [];
    floor = [];
    main = [];
    views = [];
    facings = [];
    if (CommonFloor.defaults['common']['price_max'] !== "") {
      min_price = window.numDifferentiation(CommonFloor.defaults['common']['price_min']);
      max_price = window.numDifferentiation(CommonFloor.defaults['common']['price_max']);
      price.push({
        'name': min_price + '-' + max_price,
        'type': '',
        'id': 'budget',
        'id_name': 'filter_budget',
        'classname': 'budget'
      });
    }
    if (CommonFloor.defaults['common']['area_max'] !== "") {
      area_min = CommonFloor.defaults['common']['area_min'];
      area_max = CommonFloor.defaults['common']['area_max'];
      area.push({
        'name': area_min + '-' + area_max,
        'type': project.get('measurement_units'),
        'id': 'area',
        'id_name': 'filter_area',
        'classname': 'area'
      });
    }
    if (CommonFloor.defaults['common']['floor_max'] !== "") {
      floor_min = CommonFloor.defaults['common']['floor_min'];
      floor_max = CommonFloor.defaults['common']['floor_max'];
      floor.push({
        'name': 'Floor ' + floor_min + '-' + floor_max,
        'type': '',
        'id': 'floor',
        'id_name': 'filter_floor',
        'classname': 'floor'
      });
    }
    if (CommonFloor.defaults['common']['availability'] !== "") {
      status.push({
        'name': 'Available',
        'classname': 'types',
        'id': 'available',
        'id_name': 'filter_available'
      });
    }
    if (CommonFloor.defaults['common']['views'] !== "") {
      $.each(CommonFloor.defaults['common']['views'].split(','), function(index, value) {
        return views.push({
          'name': value,
          'classname': 'views',
          'id': value,
          'id_name': 'filter_' + value
        });
      });
    }
    if (CommonFloor.defaults['common']['facings'] !== "") {
      $.each(CommonFloor.defaults['common']['facings'].split(','), function(index, value) {
        return facings.push({
          'name': value,
          'classname': 'facings',
          'id': value,
          'id_name': 'filter_' + value
        });
      });
    }
    if (CommonFloor.defaults['type'] !== "") {
      typeArr = CommonFloor.defaults['type'].split(',');
      $.each(typeArr, function(index, value) {
        var name;
        name = s.capitalize(value);
        name = name + '(s)';
        if (value === 'apartment') {
          name = 'Apartment(s)/Penthouse(s)';
          filters = CommonFloor.getApartmentFilters();
        }
        if (value === 'villa') {
          filters = CommonFloor.getVillaFilters();
        }
        if (value === 'plot') {
          filters = CommonFloor.getPlotFilters();
        }
        $.each(filters, function(index, value) {
          if (value.length === 0) {
            return filters = _.omit(filters, index);
          }
        });
        if (Object.keys(filters).length === 0) {
          filters = [];
        }
        return type.push({
          'name': name,
          'classname': 'types',
          'id': value,
          'id_name': 'filter_' + value,
          'filters': filters
        });
      });
    }
    main.push({
      'filters': type,
      'area': area,
      'price': price,
      'floor': floor,
      'status': status,
      'views': views,
      'facings': facings
    });
    return main;
  };

  CommonFloor.getStepFilters = function() {
    var area, area_max, area_min, facings, filters, floor, floor_max, floor_min, flooring, main, max_price, min_price, price, results, status, type, unitTypes, unitVariants, views;
    unitTypes = [];
    unitVariants = [];
    results = [];
    flooring = [];
    type = [];
    filters = [];
    price = [];
    area = [];
    type = [];
    status = [];
    floor = [];
    main = [];
    views = [];
    facings = [];
    if (CommonFloor.defaults['common']['price_max'] !== "") {
      min_price = window.numDifferentiation(CommonFloor.defaults['common']['price_min']);
      max_price = window.numDifferentiation(CommonFloor.defaults['common']['price_max']);
      price.push({
        'name': min_price + '-' + max_price,
        'type': '',
        'id': 'budget',
        'id_name': 'filter_budget',
        'classname': 'budget'
      });
    }
    if (CommonFloor.defaults['common']['area_max'] !== "") {
      area_min = CommonFloor.defaults['common']['area_min'];
      area_max = CommonFloor.defaults['common']['area_max'];
      area.push({
        'name': area_min + '-' + area_max,
        'type': project.get('measurement_units'),
        'id': 'area',
        'id_name': 'filter_area',
        'classname': 'area'
      });
    }
    if (CommonFloor.defaults['common']['floor_max'] !== "") {
      floor_min = CommonFloor.defaults['common']['floor_min'];
      floor_max = CommonFloor.defaults['common']['floor_max'];
      floor.push({
        'name': 'Floor ' + floor_min + '-' + floor_max,
        'type': '',
        'id': 'floor',
        'id_name': 'filter_floor',
        'classname': 'floor'
      });
    }
    if (CommonFloor.defaults['common']['availability'] !== "") {
      status.push({
        'name': 'Available',
        'classname': 'types',
        'id': 'available',
        'id_name': 'filter_available'
      });
    }
    if (CommonFloor.defaults['common']['views'] !== "") {
      $.each(CommonFloor.defaults['common']['views'].split(','), function(index, value) {
        return views.push({
          'name': value,
          'classname': 'views',
          'id': value,
          'id_name': 'filter_' + value
        });
      });
    }
    if (CommonFloor.defaults['common']['facings'] !== "") {
      $.each(CommonFloor.defaults['common']['facings'].split(','), function(index, value) {
        return facings.push({
          'name': value,
          'classname': 'facings',
          'id': value,
          'id_name': 'filter_' + value
        });
      });
    }
    filters = CommonFloor.getApartmentFilters();
    if (Object.keys(filters).length === 0) {
      filters = [];
    }
    type.push({
      'filters': filters
    });
    main.push({
      'area': area,
      'price': price,
      'floor': floor,
      'status': status,
      'views': views,
      'facings': facings,
      'filters': type
    });
    return main;
  };

  CommonFloor.getFilters111 = function() {
    var area, filters, floor, flooring, price, results, status, type, typeArr, unitTypes, unitVariants, villaFilters;
    unitTypes = [];
    unitVariants = [];
    results = [];
    flooring = [];
    villaFilters = CommonFloor.getVillaFilters();
    $.merge(unitTypes, villaFilters.unitTypes);
    $.merge(unitVariants, villaFilters.unitVariants);
    $.merge(flooring, villaFilters.flooring);
    price = [];
    area = [];
    type = [];
    status = [];
    floor = [];
    if (CommonFloor.defaults['type'] !== "") {
      typeArr = CommonFloor.defaults['type'].split(',');
      $.each(typeArr, function(index, value) {
        var name;
        name = s.capitalize(value);
        name = name + '(s)';
        if (value === 'apartement') {
          name = 'Apartment(s)/Penthouse(s)';
        }
        return type.push({
          'name': name,
          'classname': 'types',
          'id': value,
          'id_name': 'filter_' + value
        });
      });
    }
    filters = {
      'type': type,
      'unitTypes': unitTypes,
      'unitVariants': unitVariants,
      'price': price,
      'area': area,
      'status': status,
      'floor': floor,
      'flooring': flooring
    };
    $.each(filters, function(index, value) {
      if (value.length === 0) {
        return filters = _.omit(filters, index);
      }
    });
    $.each(results, function(index, value) {
      if (value.count === 0) {
        return results = _.omit(results, index);
      }
    });
    return [filters, results];
  };

  CommonFloor.getVillaFilters = function() {
    var filters, flooring, status, unitTypes, unitVariants, unit_type, unit_variant;
    unitVariants = [];
    unit_variant = '';
    unitTypes = [];
    unit_type = '';
    status = [];
    flooring = [];
    $.each(CommonFloor.defaults['villa'], function(ind, val) {
      var param_val_arr;
      if (val !== "" && ind !== 'attributes') {
        param_val_arr = val.split(',');
        return $.each(param_val_arr, function(index, value) {
          if (value !== "" && ind === 'unit_variant_id') {
            if (!_.isUndefined(bunglowVariantMasterCollection.get(parseInt(value)))) {
              unit_variant = bunglowVariantMasterCollection.findWhere({
                'id': parseInt(value)
              });
              unitVariants.push({
                'typename': 'villa',
                'name': unit_variant.get('unit_variant_name'),
                'type': '(V)',
                'classname': 'variant_names',
                'id': unit_variant.get('id'),
                'id_name': 'filter_varinat_name' + unit_variant.get('id'),
                'index': ''
              });
            }
          }
          if (value !== "" && ind === 'unit_type_id' && $.inArray(parseInt(value), bunglowVariantMasterCollection.getVillaUnitTypes()) > -1) {
            unit_type = unitTypeMasterCollection.findWhere({
              'id': parseInt(value)
            });
            return unitTypes.push({
              'typename': 'villa',
              'name': unit_type.get('name'),
              'type': '(V)',
              'classname': 'unit_types',
              'id': unit_type.get('id'),
              'id_name': 'filter_unit_type' + unit_type.get('id'),
              'index': ''
            });
          }
        });
      } else if (val !== "" && ind === 'attributes') {
        return $.each(val, function(ind1, val1) {
          var temp_var;
          temp_var = val1.split(',');
          return $.each(temp_var, function(indexkey, valkey) {
            var temp;
            if ($.isNumeric(valkey)) {
              temp = parseInt(valkey);
            } else {
              temp = valkey;
            }
            if (valkey !== "" && $.inArray(temp, bunglowVariantMasterCollection.getVillaAttributes()) > -1) {
              return flooring.push({
                'typename': 'villa',
                'name': valkey,
                'type': '(V)',
                'classname': 'filter_flooring',
                'id': valkey,
                'id_name': 'filter_' + valkey,
                'index': ind1
              });
            }
          });
        });
      }
    });
    filters = {
      'unitVariants': unitVariants,
      'unitTypes': unitTypes,
      'flooring': flooring
    };
    return filters;
  };

  CommonFloor.getApartmentFilters = function() {
    var filters, flooring, status, unitTypes, unitVariants, unit_type, unit_variant;
    unitVariants = [];
    unit_variant = '';
    unitTypes = [];
    unit_type = '';
    status = [];
    flooring = [];
    $.each(CommonFloor.defaults['apartment'], function(ind, val) {
      var param_val_arr;
      if (val !== "" && ind !== 'attributes') {
        param_val_arr = val.split(',');
        return $.each(param_val_arr, function(index, value) {
          var type, unitTypeModel;
          if (value !== "" && ind === 'unit_variant_id') {
            if (!_.isUndefined(apartmentVariantMasterCollection.get(parseInt(value)))) {
              unit_variant = apartmentVariantMasterCollection.findWhere({
                'id': parseInt(value)
              });
              unitTypeModel = unitTypeMasterCollection.findWhere({
                'id': parseInt(unit_variant.get('unit_type_id'))
              });
              type = 'A';
              if (window.propertyTypes[unitTypeModel.get('property_type_id')] === 'Penthouse') {
                type = 'PH';
              }
              unitVariants.push({
                'typename': 'apartment',
                'name': unit_variant.get('unit_variant_name'),
                'type': '(' + type + ')',
                'classname': 'variant_names',
                'id': unit_variant.get('id'),
                'id_name': 'filter_varinat_name' + unit_variant.get('id'),
                'index': ''
              });
            }
          }
          if (value !== "" && ind === 'unit_type_id' && $.inArray(parseInt(value), apartmentVariantMasterCollection.getApartmentUnitTypes()) > -1) {
            unit_type = unitTypeMasterCollection.findWhere({
              'id': parseInt(value)
            });
            type = 'A';
            if (window.propertyTypes[unit_type.get('property_type_id')] === 'Penthouse') {
              type = 'PH';
            }
            return unitTypes.push({
              'typename': 'apartment',
              'name': unit_type.get('name'),
              'type': '(' + type + ')',
              'classname': 'unit_types',
              'id': unit_type.get('id'),
              'id_name': 'filter_unit_type' + unit_type.get('id'),
              'index': ''
            });
          }
        });
      } else if (val !== "" && ind === 'attributes') {
        return $.each(val, function(ind1, val1) {
          var temp_var;
          temp_var = val1.split(',');
          return $.each(temp_var, function(indexkey, valkey) {
            var attributes, temp;
            if ($.isNumeric(valkey)) {
              temp = parseInt(valkey);
            } else {
              temp = valkey;
            }
            attributes = apartmentVariantMasterCollection.getApartmentAttributes();
            if (value !== "" && $.inArray(value, attributes[0]) > -1) {
              return flooring.push({
                'typename': 'apartment',
                'name': valkey,
                'type': '(A)',
                'classname': 'filter_flooring',
                'id': valkey,
                'id_name': 'filter_' + valkey,
                'index': ind1
              });
            }
          });
        });
      }
    });
    filters = {
      'unitVariants': unitVariants,
      'unitTypes': unitTypes,
      'flooring': flooring
    };
    return filters;
  };

  CommonFloor.getPlotFilters = function() {
    var filters, flooring, status, unitTypes, unitVariants, unit_type, unit_variant;
    unitVariants = [];
    unit_variant = '';
    unitTypes = [];
    unit_type = '';
    status = [];
    flooring = [];
    $.each(CommonFloor.defaults['plot'], function(ind, val) {
      var param_val_arr;
      if (val !== "" && ind !== 'attributes') {
        param_val_arr = val.split(',');
        return $.each(param_val_arr, function(index, value) {
          if (value !== "" && ind === 'unit_variant_id') {
            if (!_.isUndefined(plotVariantMasterCollection.get(parseInt(value)))) {
              unit_variant = plotVariantMasterCollection.findWhere({
                'id': parseInt(value)
              });
              unitVariants.push({
                'typename': 'plot',
                'name': unit_variant.get('unit_variant_name'),
                'type': '(P)',
                'classname': 'variant_names',
                'id': unit_variant.get('id'),
                'id_name': 'filter_varinat_name' + unit_variant.get('id'),
                'index': ''
              });
            }
          }
          if (value !== "" && ind === 'unit_type_id' && $.inArray(parseInt(value), plotVariantMasterCollection.getPlotUnitTypes()) > -1) {
            unit_type = unitTypeMasterCollection.findWhere({
              'id': parseInt(value)
            });
            return unitTypes.push({
              'typename': 'plot',
              'name': unit_type.get('name'),
              'type': '(P)',
              'classname': 'unit_types',
              'id': unit_type.get('id'),
              'id_name': 'filter_unit_type' + unit_type.get('id'),
              'index': ''
            });
          }
        });
      } else if (val !== "" && ind === 'attributes') {
        return $.each(val, function(ind1, val1) {
          var temp_var;
          temp_var = val1.split(',');
          return $.each(temp_var, function(indexkey, valkey) {
            var temp;
            if ($.isNumeric(valkey)) {
              temp = parseInt(valkey);
            } else {
              temp = valkey;
            }
            if (value !== "" && $.inArray(value, plotVariantMasterCollection.getPlotAttributes()) > -1) {
              return flooring.push({
                'typename': 'plot',
                'name': valkey,
                'type': '(P)',
                'classname': 'filter_flooring',
                'id': valkey,
                'id_name': 'filter_' + valkey,
                'index': ind1
              });
            }
          });
        });
      }
    });
    filters = {
      'unitVariants': unitVariants,
      'unitTypes': unitTypes,
      'flooring': flooring
    };
    return filters;
  };

  CommonFloor.getStatus = function() {
    var status, status_arr;
    status = [];
    status_arr = [];
    unitMasterCollection.each(function(item) {
      if (($.inArray(item.get('availability'), status_arr)) === -1) {
        status_arr.push(item.get('availability'));
        return status.push({
          'id': item.get('availability'),
          'name': s.humanize(item.get('availability'))
        });
      }
    });
    return status;
  };

  CommonFloor.getStatusFilters = function() {
    var response, status, statusColl, statusIds;
    status = [];
    response = CommonFloor.getStatus();
    statusColl = new Backbone.Collection(response);
    statusIds = statusColl.pluck('id');
    $.each(CommonFloor.defaults, function(ind, val) {
      var param_val_arr;
      if (ind === 'availability' && val !== "") {
        param_val_arr = val.split(',');
        return $.each(param_val_arr, function(index, value) {
          if (value !== "" && ind === 'availability' && $.inArray(value, statusIds) > -1) {
            return status.push(s.humanize(value));
          }
        });
      }
    });
    return {
      'status': status
    };
  };

  CommonFloor.filterBuilding = function(id) {
    var collection;
    collection = unitCollection.where({
      'building_id': id
    });
    unitCollection.reset(collection);
    CommonFloor.resetCollections();
    unitTempCollection.reset(unitCollection.toArray());
    return window.building_id = id;
  };

  CommonFloor.getUnitsProperty = function(unitModel) {
    var property, text, type, unitType;
    unitType = unitTypeMasterCollection.findWhere({
      'id': unitModel.get('unit_type_id')
    });
    property = window.propertyTypes[unitType.get('property_type_id')];
    text = '';
    type = '';
    window.tempColl = unitCollection.clone();
    if (s.decapitalize(property) === 'apartments') {
      window.tempColl.reset(apartmentVariantCollection.getApartmentUnits());
      text = 'Similar ' + s.decapitalize(property) + ' based on your filters';
      type = 'apartment';
    }
    if (s.decapitalize(property) === 'penthouse') {
      window.tempColl.reset(apartmentVariantCollection.getPenthouseUnits());
      text = 'Similar ' + s.decapitalize(property) + ' based on your filters';
      type = s.decapitalize(property);
    }
    if (s.decapitalize(property) === 'villas/Bungalows') {
      window.tempColl.reset(bunglowVariantCollection.getBunglowUnits());
      text = 'Similar ' + s.decapitalize(property) + ' based on your filters';
      type = 'villa';
    }
    if (s.decapitalize(property) === 'plot') {
      window.tempColl.reset(plotVariantCollection.getPlotUnits());
      text = 'Similar ' + s.decapitalize(property) + ' based on your filters';
      type = s.decapitalize(property);
    }
    return [window.tempColl, text, type];
  };

  CommonFloor.getApartmentsInView = function() {
    var newUnits, units;
    units = [];
    newUnits = [];
    $('.apartment').each(function(index, value) {
      var id;
      id = parseInt(value.id);
      return units.push(value.id);
    });
    newUnits = $.map(units, function(item) {
      return parseInt(item);
    });
    return newUnits;
  };

  CommonFloor.applyOnViewClass = function() {
    var classview, units, viewUnits;
    viewUnits = CommonFloor.getApartmentsInView();
    classview = '';
    units = unitCollection.toArray();
    $.each(units, function(index, value) {
      var id;
      id = parseInt(value.id);
      if ($.inArray(id, viewUnits) === -1) {
        $('#apartment' + id).addClass('onview');
        return $('#apartment' + id).hide();
      } else {
        $('#apartment' + id).removeClass('onview');
        return $('#apartment' + id).show();
      }
    });
    return $('#inview').bootstrapToggle('on');
  };

  CommonFloor.filterFlooringAttributes = function() {
    var flooring;
    flooring = [];
    unitCollection.each(function(item) {
      var arr, attributes, unitDetails, unitVarinat;
      unitDetails = window.unit.getUnitDetails(item.get('id'));
      unitVarinat = unitDetails[0];
      attributes = unitVarinat.get('variant_attributes').flooring;
      arr = CommonFloor.defaults['flooring'].split(',');
      if ($.inArray(attributes, arr) > -1) {
        return flooring.push(item);
      }
    });
    return unitCollection.reset(flooring);
  };

  CommonFloor.filterNew = function() {
    var collection, paramkey, params, temp;
    collection = [];
    temp = [];
    params = CommonFloor.defaults['type'].split(',');
    if (CommonFloor.defaults['type'] === "") {
      $.merge(collection, unitCollection.toArray());
    }
    $.each(params, function(ind, val) {
      if (val === 'villa') {
        unitCollection.reset(unitMasterCollection.toArray());
        temp = CommonFloor.filterVillas();
      }
      if (val === 'apartment') {
        unitCollection.reset(unitMasterCollection.toArray());
        temp = CommonFloor.filterApartments();
      }
      if (val === 'plot') {
        unitCollection.reset(unitMasterCollection.toArray());
        temp = CommonFloor.filterPlots();
      }
      return $.merge(collection, temp);
    });
    unitCollection.reset(collection);
    if (CommonFloor.defaults['common']['price_max'] !== "") {
      CommonFloor.filterBudget();
    }
    if (CommonFloor.defaults['common']['area_max'] !== "") {
      CommonFloor.filterArea();
    }
    if (CommonFloor.defaults['common']['floor_max'] !== "") {
      CommonFloor.filterFloor();
    }
    if (CommonFloor.defaults['common']['views'] !== "") {
      CommonFloor.filterViews();
    }
    if (CommonFloor.defaults['common']['facings'] !== "") {
      CommonFloor.filterFacings();
    }
    if (CommonFloor.defaults['common']['availability'] !== "") {
      paramkey = {};
      paramkey['availability'] = 'available';
      temp = unitCollection.where(paramkey);
      unitCollection.reset(temp);
    }
    CommonFloor.applyFliterClass();
    return CommonFloor.resetCollections();
  };

  CommonFloor.filterStepNew = function() {
    var collection, paramkey, temp;
    collection = [];
    temp = [];
    temp = CommonFloor.filterApartments();
    $.merge(collection, temp);
    unitCollection.reset(collection);
    if (CommonFloor.defaults['common']['price_max'] !== "") {
      CommonFloor.filterBudget();
    }
    if (CommonFloor.defaults['common']['area_max'] !== "") {
      CommonFloor.filterArea();
    }
    if (CommonFloor.defaults['common']['floor_max'] !== "") {
      CommonFloor.filterFloor();
    }
    if (CommonFloor.defaults['common']['views'] !== "") {
      CommonFloor.filterViews();
    }
    if (CommonFloor.defaults['common']['facings'] !== "") {
      CommonFloor.filterFacings();
    }
    if (CommonFloor.defaults['common']['availability'] !== "") {
      paramkey = {};
      paramkey['availability'] = 'available';
      temp = unitCollection.where(paramkey);
      unitCollection.reset(temp);
    }
    CommonFloor.applyFliterClass();
    return CommonFloor.resetCollections();
  };

  CommonFloor.filterVillas = function() {
    var collection, newColl, tempColl;
    collection = [];
    collection = CommonFloor.resetProperyType('villa');
    newColl = new Backbone.Collection(collection);
    tempColl = [];
    $.each(CommonFloor.defaults['villa'], function(index, value) {
      var attributes, param_val, temp;
      temp = [];
      if (value !== "" && index === 'attributes') {
        attributes = [];
        unitCollection.reset(unitMasterCollection.toArray());
        if (temp.length === 0) {
          temp = bunglowVariantCollection.getBunglowUnits();
        }
        $.each(CommonFloor.defaults['villa']['attributes'], function(ind1, val1) {
          if (val1 !== "") {
            return $.merge(attributes, CommonFloor.filterVillaAttributes(ind1, val1));
          }
        });
        if (attributes.length > 0) {
          newColl.reset(attributes);
        }
      }
      if (value !== "" && index !== 'attributes') {
        param_val = value.split(',');
        $.each(param_val, function(key, key_val) {
          var paramkey;
          paramkey = {};
          paramkey[index] = parseInt(key_val);
          tempColl = unitCollection.where(paramkey);
          if (tempColl.length === 0) {
            return temp = [];
          } else {
            return $.merge(temp, unitCollection.where(paramkey));
          }
        });
        unitCollection.reset(temp);
        return newColl.reset(temp);
      }
    });
    return newColl.toArray();
  };

  CommonFloor.filterVillaAttributes = function(ind1, val1) {
    var flooring, tempColl;
    flooring = [];
    tempColl = bunglowVariantCollection.getBunglowUnits();
    $.each(tempColl, function(item, value) {
      var arr, temp, unitDetails, unitVarinat, val, valkey;
      unitDetails = window.unit.getUnitDetails(value.get('id'));
      unitVarinat = unitDetails[0];
      valkey = unitVarinat.get('variant_attributes');
      val = _.propertyOf(valkey)(ind1);
      arr = val1.split(',');
      if (_.isUndefined(val)) {
        return;
      }
      if (_.isArray(val)) {
        $.each(val, function(ind1, val1) {
          var temp;
          if (_.isString(val1)) {
            temp = val1;
          } else {
            temp = val1.toString();
          }
          if ($.inArray(temp, arr) > -1) {
            return flooring.push(value);
          }
        });
      } else {
        if (_.isString(val)) {
          temp = val;
        } else {
          temp = val.toString();
        }
        if ($.inArray(temp, arr) > -1) {
          flooring.push(value);
        }
      }
      return unitCollection.reset(flooring);
    });
    return flooring;
  };

  CommonFloor.filterApartments = function() {
    var collection, newColl, tempColl;
    collection = [];
    collection = CommonFloor.resetProperyType('apartment');
    newColl = new Backbone.Collection(collection);
    tempColl = [];
    $.each(CommonFloor.defaults['apartment'], function(index, value) {
      var attributes, param_val, temp;
      temp = [];
      if (value !== "" && index === 'attributes') {
        attributes = [];
        unitCollection.reset(unitMasterCollection.toArray());
        if (temp.length === 0) {
          temp = apartmentVariantCollection.getApartmentUnits();
        }
        $.each(CommonFloor.defaults['villa']['attributes'], function(ind1, val1) {
          if (val1 !== "") {
            return $.merge(attributes, CommonFloor.filterApartmentAttributes(ind1, val1));
          }
        });
        if (attributes.length > 0) {
          newColl.reset(attributes);
        }
      }
      if (value !== "" && index !== 'attributes') {
        param_val = value.split(',');
        $.each(param_val, function(key, key_val) {
          var paramkey;
          paramkey = {};
          paramkey[index] = parseInt(key_val);
          tempColl = unitCollection.where(paramkey);
          if (tempColl.length === 0) {
            return temp = [];
          } else {
            return $.merge(temp, unitCollection.where(paramkey));
          }
        });
        unitCollection.reset(temp);
        return newColl.reset(temp);
      }
    });
    return newColl.toArray();
  };

  CommonFloor.filterApartmentAttributes = function(ind1, val1) {
    var flooring, tempColl;
    flooring = [];
    tempColl = apartmentVariantCollection.getApartmentUnits();
    $.each(tempColl, function(item, value) {
      var arr, temp, unitDetails, unitVarinat, val, valkey;
      unitDetails = window.unit.getUnitDetails(value.get('id'));
      unitVarinat = unitDetails[0];
      valkey = unitVarinat.get('variant_attributes');
      val = _.propertyOf(valkey)(ind1);
      arr = val1.split(',');
      if (_.isUndefined(val)) {
        return;
      }
      if (_.isArray(val)) {
        return $.each(val, function(ind1, val1) {
          var temp;
          if (_.isString(val1)) {
            temp = val1;
          } else {
            temp = val1.toString();
          }
          if ($.inArray(temp, arr) > -1) {
            return flooring.push(value);
          }
        });
      } else {
        if (_.isString(val)) {
          temp = val;
        } else {
          temp = val.toString();
        }
        if ($.inArray(temp, arr) > -1) {
          return flooring.push(value);
        }
      }
    });
    unitCollection.reset(flooring);
    return flooring;
  };

  CommonFloor.filterPlots = function() {
    var collection, newColl, tempColl;
    collection = [];
    collection = CommonFloor.resetProperyType('plot');
    newColl = new Backbone.Collection(collection);
    tempColl = [];
    $.each(CommonFloor.defaults['plot'], function(index, value) {
      var attributes, param_val, temp;
      temp = [];
      if (value !== "" && index === 'attributes') {
        attributes = [];
        unitCollection.reset(unitMasterCollection.toArray());
        if (temp.length === 0) {
          temp = plotVariantCollection.getPlotUnits();
        }
        $.each(CommonFloor.defaults['plot']['attributes'], function(ind1, val1) {
          if (val1 !== "") {
            return $.merge(attributes, CommonFloor.filterPlotAttributes(ind1, val1));
          }
        });
        if (attributes.length > 0) {
          newColl.reset(attributes);
        }
      }
      if (value !== "" && index !== 'attributes') {
        param_val = value.split(',');
        $.each(param_val, function(key, key_val) {
          var paramkey;
          paramkey = {};
          paramkey[index] = parseInt(key_val);
          tempColl = unitCollection.where(paramkey);
          if (tempColl.length === 0) {
            return temp = [];
          } else {
            return $.merge(temp, unitCollection.where(paramkey));
          }
        });
        unitCollection.reset(temp);
        return newColl.reset(temp);
      }
    });
    return newColl.toArray();
  };

  CommonFloor.filterPlotAttributes = function(ind1, val1) {
    var flooring, tempColl;
    flooring = [];
    tempColl = plotVariantCollection.getPlotUnits();
    $.each(tempColl, function(item, value) {
      var arr, temp, unitDetails, unitVarinat, val, valkey;
      unitDetails = window.unit.getUnitDetails(value.get('id'));
      unitVarinat = unitDetails[0];
      valkey = unitVarinat.get('variant_attributes');
      val = _.propertyOf(valkey)(ind1);
      arr = val1.split(',');
      if (_.isUndefined(val)) {
        return;
      }
      if (_.isArray(val)) {
        return $.each(val, function(ind1, val1) {
          var temp;
          if (_.isString(val1)) {
            temp = val1;
          } else {
            temp = val1.toString();
          }
          if ($.inArray(temp, arr) > -1) {
            return flooring.push(value);
          }
        });
      } else {
        if (_.isString(val)) {
          temp = val;
        } else {
          temp = val.toString();
        }
        if ($.inArray(temp, arr) > -1) {
          return flooring.push(value);
        }
      }
    });
    unitCollection.reset(flooring);
    return flooring;
  };

  CommonFloor.removeStepFilters = function() {
    $.each(CommonFloor.defaults['apartment'], function(index, value) {
      var actualTypes, new_types, step_types, types, value_Arr;
      if (value !== "") {
        step_types = CommonFloor.defaults['step_three'][index].split(',');
        types = step_types.map(function(item) {
          return parseInt(item);
        });
        value_Arr = value.split(',');
        new_types = value_Arr.map(function(item) {
          return parseInt(item);
        });
        actualTypes = _.difference(new_types, types);
        CommonFloor.defaults['apartment'][index] = actualTypes.join(',');
        return CommonFloor.defaults['step_three'][index] = "";
      }
    });
    $.each(CommonFloor.defaults['common'], function(index, value) {
      return CommonFloor.defaults['common'][index] = "";
    });
    unitCollection.reset(unitMasterCollection.toArray());
    CommonFloor.resetCollections();
    return CommonFloor.filterNew();
  };

  $(window).bind('hashchange', function() {
    CommonFloor.defaults['type'] = "";
    $.each(CommonFloor.defaults['villa'], function(index, value) {
      return CommonFloor.defaults['villa'][index] = "";
    });
    $.each(CommonFloor.defaults['plot'], function(index, value) {
      return CommonFloor.defaults['plot'][index] = "";
    });
    $.each(CommonFloor.defaults['apartment'], function(index, value) {
      return CommonFloor.defaults['apartment'][index] = "";
    });
    $.each(CommonFloor.defaults['common'], function(index, value) {
      return CommonFloor.defaults['common'][index] = "";
    });
    unitCollection.reset(unitMasterCollection.toArray());
    CommonFloor.resetCollections();
    return CommonFloor.filterNew();
  });

  CommonFloor.filterViews = function() {
    var temp;
    CommonFloor.resetCollections();
    temp = [];
    unitCollection.each(function(item) {
      var views;
      views = item.get('views');
      return $.each(views, function(ind, val) {
        if ($.inArray(val, CommonFloor.defaults['common']['views'].split(',')) > -1 && val !== "") {
          return temp.push(item);
        }
      });
    });
    return unitCollection.reset(temp);
  };

  CommonFloor.filterFacings = function() {
    var temp;
    CommonFloor.resetCollections();
    temp = [];
    unitCollection.each(function(item) {
      var facings;
      facings = item.get('direction');
      if ($.inArray(facings, CommonFloor.defaults['common']['facings'].split(',')) > -1 && facings !== "") {
        return temp.push(item);
      }
    });
    return unitCollection.reset(temp);
  };

}).call(this);

//# sourceMappingURL=../../frontend/common/common.js.map