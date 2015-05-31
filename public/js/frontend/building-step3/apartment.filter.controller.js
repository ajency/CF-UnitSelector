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

    FilterApartmentView.prototype.template = Handlebars.compile('<div class="fliters-container closed" id="collapsefilters"> <a href="javascript:void(0)"  class="text-primary filters-clear clear">Clear Filters </a> <button class="btn btn-primary filter-button" type="button"> <span class="icon-place"></span> </button> <div class="filters-wrapper"> <div class="filters-content"> <div class="unit_type_filter"> <h6>UNIT TYPE</h6> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitTypes}} </div> </div> <div class="variant_filter"> <h6>VARIANT</h6> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitVariantNames}} <!--<a href="#" class="hide-div">+ Show More</a>--> </div> </div> <div class="flooring_filter"> <h6 class="">Flooring</h6> <div class="filter-chkbox-block"> {{#flooring}} <input type="checkbox" class="custom-chckbx addCft flooring" id="flooring{{id}}" value="flooring{{id}}" value="1" data-value="{{id}}" > <label for="flooring{{id}}" class="-lbl">{{name}}({{type}})</label> {{/flooring}} <!--<a href="#" class="hide-div">+ Show More</a>--> </div> </div> <div class=""> <h6>AREA ({{measurement_units}})</h6> <div class="range-container"> <input type="text" id="area" name="area" value="" /> </div> </div> <div class=""> <h6>BUDGET </h6> <div class="range-container"> <input type="text" id="budget" name="budget" value="" /> </div> </div> <div class=""> <h6>FLOOR </h6> <div class="range-container"> <input type="text" id="floor" name="floor" value="" /> </div> </div> <div class=""> <h6 class="availability">AVAILABILITY</h6> <div class="filter-chkbox-block"> <input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> <label for="available" class="-lbl">Show Available Units Only</label> </div> </div> </div> </div> </div>');

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
      if (CommonFloor.defaults['apartment']['unit_type_id'] !== "") {
        unitTypes = CommonFloor.defaults['apartment']['unit_type_id'].split(',');
      }
      if (CommonFloor.defaults['apartment']['unit_variant_id'] !== "") {
        variantNames = CommonFloor.defaults['apartment']['unit_variant_id'].split(',');
      }
      if (CommonFloor.defaults['type'] !== "") {
        window.type = CommonFloor.defaults['type'].split(',');
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
        $.each(CommonFloor.defaults['apartment'], function(index, value) {
          return CommonFloor.defaults['apartment'][index] = "";
        });
        $.each(CommonFloor.defaults['common'], function(index, value) {
          return CommonFloor.defaults['common'][index] = "";
        });
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
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
        CommonFloor.defaults['type'] = 'apartment';
        CommonFloor.defaults['apartment']['unit_type_id'] = window.unitTypes.join(',');
        CommonFloor.defaults['step_three']['unit_type_id'] = window.unitTypes.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.variantNames': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.variantNames.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          window.variantNames = _.without(window.variantNames, parseInt($(e.currentTarget).attr('data-value')));
        }
        CommonFloor.defaults['type'] = 'apartment';
        CommonFloor.defaults['apartment']['unit_variant_id'] = window.variantNames.join(',');
        CommonFloor.defaults['step_three']['unit_variant_id'] = window.variantNames.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.priceMin': function(e) {
        if ($(e.currentTarget).val() !== "") {
          CommonFloor.defaults['common']['price_min'] = $(e.currentTarget).val();
        } else {
          CommonFloor.defaults['common']['price_min'] = 0;
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.priceMax': function(e) {
        if ($(e.currentTarget).val() !== "") {
          CommonFloor.defaults['common']['price_max'] = $(e.currentTarget).val();
        } else {
          CommonFloor.defaults['common']['price_max'] = 999999900;
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.status': function(e) {
        CommonFloor.defaults['common']['availability'] = e.currentTarget.id;
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.area': function(e) {
        CommonFloor.defaults['common']['area_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['common']['area_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.budget': function(e) {
        CommonFloor.defaults['common']['price_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['common']['price_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.floor': function(e) {
        CommonFloor.defaults['common']['floor_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['common']['floor_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.flooring': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.flooring.push($(e.currentTarget).attr('data-value'));
        } else {
          window.flooring = _.without(window.flooring, $(e.currentTarget).attr('data-value'));
        }
        window.flooring = _.uniq(window.flooring);
        CommonFloor.defaults['type'] = 'apartment';
        CommonFloor.defaults['apartment']['attributes'] = window.flooring.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterNew();
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
      var area, budget, building_id, floor, max, min, priceMax, priceMin, subArea, subBudget, units, url;
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
      units = unitMasterCollection.where({
        'building_id': this.building_id
      });
      $.each(units, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.get('id'));
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
      var id, types, typesArray, unitTypes, unitVariants, unitVariantsArray, unitsArr, unittypesArray, unittypesColl;
      unittypesArray = [];
      unitTypes = CommonFloor.defaults['apartment']['unit_type_id'].split(',');
      unitVariantsArray = [];
      unitVariants = CommonFloor.defaults['apartment']['unit_variant_id'].split(',');
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
      this.ui.status.prop('checked', false);
      if (CommonFloor.defaults['common']['availability'] !== "") {
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
      var budget, building_id, filters, newtemp, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr, url;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      newtemp = [];
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
          return $.each(project.get('filters').Apartment, function(index, value) {
            var temp;
            temp = [];
            return $.each(item.get('variant_attributes'), function(ind, val) {
              if (ind === value && $.inArray(value, flooring) === -1 && val !== "") {
                flooring.push(value);
                temp.push({
                  'id': val,
                  'name': val,
                  'classname': 'attributes',
                  'label': ind,
                  type: 'P'
                });
                return newtemp.push({
                  'label': ind.toUpperCase(),
                  'value': temp
                });
              }
            });
          });
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
        'flooring': newtemp
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