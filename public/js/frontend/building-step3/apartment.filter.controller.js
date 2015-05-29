(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.unitTypes = [];

  window.unitVariants = [];

  window.variantNames = [];

  window.flooring = [];

  window.price = '';

  window.area = '';

  window.type = [];

  CommonFloor.FilterApartmentView = (function(superClass) {
    extend(FilterApartmentView, superClass);

    function FilterApartmentView() {
      return FilterApartmentView.__super__.constructor.apply(this, arguments);
    }

    FilterApartmentView.prototype.template = Handlebars.compile('<div class="fliters-container " id="collapsefilters"> <a href="javascript:void(0)" class="text-primary filters-clear clear">Clear Filters </a> <button class="btn btn-primary filter-button" type="button"> <span class="icon-place"></span> </button> <div class="filters-wrapper"> <div class="filters-content mCustomScrollbar _mCS_2"> <div id="mCSB_2" class="mCustomScrollBox mCS-cf-scroll mCSB_vertical mCSB_inside" tabindex="0"> <div id="mCSB_2_container" class="mCSB_container" style="position:relative; top:0; left:0;" dir="ltr"> <div class="property_type"> <h6 class="">PROPERTY TYPE</h6> <div class="filter-chkbox-block"> <div class="-lbl villa-check"> <input type="checkbox" class="custom-chckbx addCft types " id="Villas" value="Villas" > <label for="Villas" class="-lbl  ">Villas</label> </div> <div class="-lbl apartment-check"> <input type="checkbox" class="custom-chckbx addCft types" id="Apartments" value="Apartments/Penthouse" > <label for="Apartments" class="-lbl">Apartments/Penthouse</label> </div> <div class="-lbl plot-check"> <input type="checkbox" class="custom-chckbx addCft types" id="Plots" value="Plots"> <label for="Plots" class="-lbl">Plots</label> </div> </div> </div> <div class=""> <h6 class="">AREA (Sq.ft)</h6> <div class="range-container"> <span class="irs js-irs-0"><span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">663</span><span class="irs-max">4 138</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span></span><input type="text" id="area" name="area" value="" class="irs-hidden-input" readonly=""> </div> </div> <div class=""> <h6 class="">BUDGET </h6> <div class="range-container"> <span class="irs js-irs-1"><span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">19.23 Lac</span><span class="irs-max">2.22 Cr</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span></span> </div> </div> <div class=""> <h6 class="availability">AVAILABILITY</h6> <div class="filter-chkbox-block"> <input type="checkbox" name="available" class="custom-chckbx addCft status" id="available" value="available"> <label for="available" class="-lbl">Show Available Units Only</label> </div> </div> </div> <div id="mCSB_2_scrollbar_vertical" class="mCSB_scrollTools mCSB_2_scrollbar mCS-cf-scroll mCSB_scrollTools_vertical" style="display: block;"> <div class="mCSB_draggerContainer"> <div id="mCSB_2_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; display: block; height: 62px; max-height: 285px;" oncontextmenu="return false;"> <div class="mCSB_dragger_bar" style="line-height: 30px;"></div> </div> <div class="mCSB_draggerRail"></div> </div> </div> </div> </div> </div> <!--<div class="filters-bottom"> <a href="#">+ More Filters</a> </div>--> </div>');

    FilterApartmentView.prototype.ui = {
      unitTypes: '.unit_types',
      priceMin: '.price_min',
      priceMax: '.price_max',
      status: '.status',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#area',
      budget: '#budget',
      clear: '.clear',
      floor: '#floor',
      flooring: '.flooring'
    };

    FilterApartmentView.prototype.initialize = function() {
      var building_id, unitTypes, url, variantNames;
      this.price = '';
      this.area = '';
      this.floor = '';
      variantNames = [];
      unitTypes = [];
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      this.building_id = building_id;
      if (CommonFloor.defaults['unitTypes'] !== "") {
        unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      }
      if (CommonFloor.defaults['unitVariants'] !== "") {
        variantNames = CommonFloor.defaults['unitVariants'].split(',');
      }
      if (CommonFloor.defaults['type'] !== "") {
        window.type = CommonFloor.defaults['type'].split(',');
      }
      if (CommonFloor.defaults['flooring'] !== "") {
        window.flooring = CommonFloor.defaults['flooring'].split(',');
      }
      window.unitTypes = unitTypes.map(function(item) {
        return parseInt(item);
      });
      return window.variantNames = variantNames.map(function(item) {
        return parseInt(item);
      });
    };

    FilterApartmentView.prototype.events = {
      'click @ui.clear': function(e) {
        window.unitTypes = [];
        window.unitVariants = [];
        window.variantNames = [];
        window.price = '';
        window.area = '';
        window.type = [];
        $.each(CommonFloor.defaults, function(index, value) {
          return CommonFloor.defaults[index] = "";
        });
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        unitTempCollection.trigger("filter_available");
        this.loadSelectedFilters();
        this.price = $("#budget").data("ionRangeSlider");
        this.area = $("#area").data("ionRangeSlider");
        this.floor = $("#floor").data("ionRangeSlider");
        this.price.destroy();
        this.area.destroy();
        this.floor.destroy();
        return this.loadClearFilters();
      },
      'click @ui.unitTypes': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.unitTypes.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          window.unitTypes = _.without(window.unitTypes, parseInt($(e.currentTarget).attr('data-value')));
        }
        CommonFloor.defaults['unitTypes'] = window.unitTypes.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.variantNames': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.variantNames.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          window.variantNames = _.without(window.variantNames, parseInt($(e.currentTarget).attr('data-value')));
        }
        CommonFloor.defaults['unitVariants'] = window.variantNames.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.priceMin': function(e) {
        if ($(e.currentTarget).val() !== "") {
          CommonFloor.defaults['price_min'] = $(e.currentTarget).val();
        } else {
          CommonFloor.defaults['price_min'] = 0;
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.priceMax': function(e) {
        if ($(e.currentTarget).val() !== "") {
          CommonFloor.defaults['price_max'] = $(e.currentTarget).val();
        } else {
          CommonFloor.defaults['price_max'] = 999999900;
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.status': function(e) {
        CommonFloor.defaults['availability'] = e.currentTarget.id;
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.area': function(e) {
        CommonFloor.defaults['area_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['area_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.budget': function(e) {
        CommonFloor.defaults['price_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['price_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.floor': function(e) {
        CommonFloor.defaults['floor_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['floor_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.flooring': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.flooring.push($(e.currentTarget).attr('data-value'));
        } else {
          window.flooring = _.without(window.flooring, $(e.currentTarget).attr('data-value'));
        }
        window.flooring = _.uniq(window.flooring);
        CommonFloor.defaults['flooring'] = window.flooring.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filter();
        return unitTempCollection.trigger("filter_available");
      },
      'click .filter-button': function(e) {
        window.flag1 = 0;
        $('.fliters-container').toggleClass('closed');
        if ($('.fliters-container').hasClass("closed")) {
          return window.flag1 = 1;
        }
      }
    };

    FilterApartmentView.prototype.serializeData = function() {
      var data;
      data = FilterApartmentView.__super__.serializeData.call(this);
      data.unitTypes = Marionette.getOption(this, 'unitTypes');
      data.unitVariants = Marionette.getOption(this, 'unitVariants');
      data.unitVariantNames = Marionette.getOption(this, 'unitVariantNames');
      data.flooring = Marionette.getOption(this, 'flooring');
      return data;
    };

    FilterApartmentView.prototype.onShow = function() {
      var area, budget, building_id, floor, max, min, priceMax, priceMin, subArea, subBudget, url;
      this.loadSelectedFilters();
      $('.filters-content').mCustomScrollbar({
        theme: 'inset'
      });
      budget = [];
      area = [];
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      floor = buildingMasterCollection.findWhere({
        'id': building_id
      });
      $.each(unitMasterCollection.toArray(), function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        budget.push(parseFloat(unitDetails[3]));
        return area.push(parseFloat(unitDetails[0].get('super_built_up_area')));
      });
      min = _.min(area);
      max = _.max(area);
      subArea = (max - min) / 20;
      subArea = subArea.toFixed(0);
      priceMin = _.min(budget);
      priceMax = _.max(budget);
      subBudget = (priceMax - priceMin) / 20;
      subBudget = subBudget.toFixed(0);
      $("#area").ionRangeSlider({
        type: "double",
        min: min,
        max: max,
        step: subArea,
        grid: false
      });
      $("#budget").ionRangeSlider({
        type: "double",
        min: priceMin,
        max: priceMax,
        grid: false,
        step: subBudget,
        prettify: function(num) {
          return window.numDifferentiation(num);
        }
      });
      $("#floor").ionRangeSlider({
        type: "double",
        min: 1,
        max: floor.get('no_of_floors'),
        grid: false
      });
      if (Marionette.getOption(this, 'flooring').length === 0) {
        $('.flooring_filter').hide();
      }
      if (Marionette.getOption(this, 'unitTypes').length === 0) {
        $('.unit_type_filter').hide();
      }
      if (Marionette.getOption(this, 'unitVariantNames').length === 0) {
        return $('.variant_filter').hide();
      }
    };

    FilterApartmentView.prototype.loadClearFilters = function() {
      var area, budget, building_id, floor, max, min, priceMax, priceMin, subArea, subBudget, url;
      budget = [];
      area = [];
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      floor = buildingMasterCollection.findWhere({
        'id': building_id
      });
      $.each(unitMasterCollection.toArray(), function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        budget.push(parseFloat(unitDetails[3]));
        return area.push(parseFloat(unitDetails[0].get('super_built_up_area')));
      });
      min = _.min(area);
      max = _.max(area);
      subArea = (max - min) / 20;
      subArea = subArea.toFixed(0);
      priceMin = _.min(budget);
      priceMax = _.max(budget);
      subBudget = (priceMax - priceMin) / 20;
      subBudget = subBudget.toFixed(0);
      $('#area').val(min + ";" + max);
      $('#budget').val(priceMin + ";" + priceMax);
      $('#floor').val(1 + ";" + floor.get('no_of_floors'));
      $("#area").ionRangeSlider({
        type: "double",
        min: min,
        max: max,
        step: subArea,
        grid: false
      });
      $("#budget").ionRangeSlider({
        type: "double",
        min: priceMin,
        max: priceMax,
        grid: false,
        step: subBudget,
        prettify: function(num) {
          return window.numDifferentiation(num);
        }
      });
      return $("#floor").ionRangeSlider({
        type: "double",
        min: 1,
        max: floor.get('no_of_floors'),
        grid: false
      });
    };

    FilterApartmentView.prototype.loadSelectedFilters = function() {
      var id, res, types, typesArray, unitTypes, unitVariants, unitVariantsArray, unitsArr, unittypesArray, unittypesColl;
      unittypesArray = [];
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitVariantsArray = [];
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      typesArray = [];
      types = CommonFloor.defaults['type'].split(',');
      id = [];
      unitsArr = [];
      unittypesColl = [];
      $.merge(unitsArr, apartmentVariantMasterCollection.getApartmentMasterUnits());
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        id.push(parseInt(unitDetails[0].get('id')));
        return unittypesColl.push(parseInt(unitDetails[1].get('id')));
      });
      $(this.ui.unitTypes).each(function(ind, item) {
        $('#' + item.id).attr('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($(item).attr('data-value'), unitTypes) === -1) {
          $('#' + item.id).prop('checked', false);
          $('#' + item.id).attr('disabled', false);
        }
        if ($.inArray(parseInt($(item).attr('data-value')), unittypesColl) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
      $(this.ui.variantNames).each(function(ind, item) {
        $('#' + item.id).attr('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($(item).attr('data-value'), unitVariants) === -1) {
          $('#' + item.id).prop('checked', false);
          $('#' + item.id).attr('disabled', false);
        }
        if ($.inArray(parseInt($(item).attr('data-value')), id) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
      res = CommonFloor.getFilters()[0];
      if (Object.keys(res).length === 0) {
        window.flag1 = 1;
      }
      this.ui.status.prop('checked', false);
      if (CommonFloor.defaults['availability'] !== "") {
        this.ui.status.prop('checked', true);
      }
      if (window.flag1 === 0) {
        return $('.fliters-container').removeClass('closed');
      } else {
        return $('.fliters-container').addClass('closed');
      }
    };

    return FilterApartmentView;

  })(Marionette.ItemView);

  CommonFloor.FilterApartmentCtrl = (function(superClass) {
    extend(FilterApartmentCtrl, superClass);

    function FilterApartmentCtrl() {
      return FilterApartmentCtrl.__super__.constructor.apply(this, arguments);
    }

    FilterApartmentCtrl.prototype.initialize = function() {
      var apartmentFilters, area, budget, flooring, unitTypes, unitVariantNames, unitVariants, view;
      unitTypes = [];
      unitVariants = [];
      unitVariantNames = [];
      area = [];
      budget = [];
      flooring = [];
      apartmentFilters = this.getApartmentFilters();
      if (apartmentFilters.length !== 0) {
        $.merge(unitTypes, apartmentFilters[0].unitTypes);
        $.merge(unitVariants, apartmentFilters[0].unitVariants);
        $.merge(unitVariantNames, apartmentFilters[0].unitVariantNames);
        $.merge(budget, apartmentFilters[0].budget);
        $.merge(flooring, apartmentFilters[0].flooring);
      }
      this.view = view = new CommonFloor.FilterApartmentView({
        model: project,
        'unitTypes': unitTypes,
        'unitVariants': _.uniq(unitVariants),
        'unitVariantNames': unitVariantNames,
        'budget': budget,
        'flooring': flooring
      });
      this.listenTo(this.view, "load:apt:filters", this.loadAptFilter);
      return this.show(this.view);
    };

    FilterApartmentCtrl.prototype.loadAptFilter = function() {
      var aptFilters;
      aptFilters = this.getApartmentFilters();
      return this.view.triggerMethod("apt:filters", aptFilters);
    };

    FilterApartmentCtrl.prototype.getApartmentFilters = function() {
      var budget, building_id, filters, flooringAttributes, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr, url;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      flooringAttributes = [];
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      apartmentVariantMasterCollection.each(function(item) {
        var type, unitTypeModel, units;
        units = unitMasterCollection.where({
          'unit_variant_id': item.get('id')
        });
        if (units.length !== 0) {
          unitTypeModel = unitTypeMasterCollection.findWhere({
            'id': item.get('unit_type_id')
          });
          type = 'A';
          if (window.propertyTypes[unitTypeModel.get('property_type_id')] === 'Penthouse') {
            type = 'PH';
          }
          if ($.inArray(item.get('unit_type_id'), unit_types) === -1) {
            unit_types.push(parseInt(unitTypeModel.get('id')));
            unitTypes.push({
              'id': unitTypeModel.get('id'),
              'name': unitTypeModel.get('name'),
              'type': type
            });
          }
          unitVariants.push(item.get('super_built_up_area'));
          unitVariantNames.push({
            'id': item.get('id'),
            'name': item.get('unit_variant_name'),
            'type': type
          });
          if ($.inArray(item.get('variant_attributes').flooring, flooring) === -1 && !_.isUndefined(item.get('variant_attributes').flooring)) {
            flooring.push(item.get('variant_attributes').flooring);
            return flooringAttributes.push({
              'id': item.get('variant_attributes').flooring,
              'name': item.get('variant_attributes').flooring,
              type: type
            });
          }
        }
      });
      unitsArr = apartmentVariantMasterCollection.getApartmentUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        return budget.push(parseFloat(unitDetails[3]));
      });
      filters.push({
        'unitTypes': unitTypes,
        'unitVariants': unitVariants,
        'unitVariantNames': unitVariantNames,
        'budget': budget,
        'flooring': flooringAttributes
      });
      $.each(filters[0], function(index, value) {
        if ($.inArray(index, project.get('filters').Villa) === -1 && index !== 'budget' && index !== 'unitVariants') {
          return filters[0][index] = [];
        }
      });
      return filters;
    };

    return FilterApartmentCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartment.filter.controller.js.map