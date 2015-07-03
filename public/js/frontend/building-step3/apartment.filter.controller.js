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

    FilterApartmentView.prototype.template = Handlebars.compile('<a href="javascript:void(0)"  class="text-primary filters-clear clear">Clear Filters </a> <button class="btn btn-primary filter-button" type="button"> <span class="icon"></span> </button> <div class="filters-wrapper"> <div class="filters-content"> <div class="unit_type_filter"> <h6>UNIT TYPE</h6> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitTypes}} </div> </div> <div class="variant_filter"> <h6>VARIANT</h6> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitVariantNames}} <!--<a href="#" class="hide-div">+ Show More</a>--> </div> </div> <div class="flooring_filter"> <div class="filter-chkbox-block"> {{#flooring}} <div class=""> <h6 class="unit_type_filter">{{label}}</h6> <div class="filter-chkbox-block"> {{#value}} <input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}" data-index="{{index}}" data-type="apartment" > <label for="{{id}}" class="-lbl">{{name}}</label> {{/value}} </div> </div> {{/flooring}} <!--<a href="#" class="hide-div">+ Show More</a>--> </div> </div> <div class="areaLabel"> <h6>AREA ({{measurement_units}})</h6> <div class="range-container"> <input type="text" id="area" name="area" value="" /> </div> </div> <div class="budgetLabel"> <h6>BUDGET ( <span class="icon-rupee-icn"></span> )</h6> <div class="range-container"> <input type="text" id="budget" name="budget" value="" /> </div> </div> <div class="viewLabel"> <h6 class="">VIEWS</h6> <div class="filter-chkbox-block"> {{#views}} <input type="checkbox" class="custom-chckbx addCft views " id="{{id}}" value="{{id}}"  > <label for="{{id}}" class="-lbl  ">{{name}}</label> {{/views}} </div> </div> <div class="facingLabel"> <h6 class="">FACINGS</h6> <div class="filter-chkbox-block"> {{#facings}} <input type="checkbox" class="custom-chckbx addCft facings " id="{{id}}" value="{{id}}"  > <label for="{{id}}" class="-lbl  ">{{name}}</label> {{/facings}} </div> </div> <div class=""> <h6>FLOOR </h6> <div class="range-container"> <input type="text" id="floor" name="floor" value="" /> </div> </div> <div class=""> <h6 class="availability">AVAILABILITY</h6> <div class="filter-chkbox-block"> <input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> <label for="available" class="-lbl">Show Available Units Only</label> </div> </div> </div> </div>');

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
      flooring: '.attributes',
      facings: '.facings',
      views: '.views'
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
          CommonFloor.defaults['apartment'][index] = "";
          if (index === 'attributes') {
            return CommonFloor.defaults['apartment'][index] = {};
          }
        });
        $.each(CommonFloor.defaults['common'], function(index, value) {
          return CommonFloor.defaults['common'][index] = "";
        });
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
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
        CommonFloor.defaults['apartment']['unit_type_id'] = window.unitTypes.join(',');
        CommonFloor.defaults['step_three']['unit_type_id'] = window.unitTypes.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.variantNames': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.variantNames.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          window.variantNames = _.without(window.variantNames, parseInt($(e.currentTarget).attr('data-value')));
        }
        CommonFloor.defaults['apartment']['unit_variant_id'] = window.variantNames.join(',');
        CommonFloor.defaults['step_three']['unit_variant_id'] = window.variantNames.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.priceMin': function(e) {
        if ($(e.currentTarget).val() !== "") {
          CommonFloor.defaults['common']['price_min'] = $(e.currentTarget).val();
        } else {
          CommonFloor.defaults['common']['price_min'] = 0;
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.priceMax': function(e) {
        if ($(e.currentTarget).val() !== "") {
          CommonFloor.defaults['common']['price_max'] = $(e.currentTarget).val();
        } else {
          CommonFloor.defaults['common']['price_max'] = 999999900;
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.status': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          CommonFloor.defaults['common']['availability'] = e.currentTarget.id;
        } else {
          CommonFloor.defaults['common']['availability'] = "";
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.area': function(e) {
        CommonFloor.defaults['common']['area_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['common']['area_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.budget': function(e) {
        CommonFloor.defaults['common']['price_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['common']['price_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'change @ui.floor': function(e) {
        CommonFloor.defaults['common']['floor_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['common']['floor_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.flooring': function(e) {
        var index, types;
        types = [];
        index = $(e.currentTarget).attr('data-index');
        if (!_.has(CommonFloor.defaults['apartment']['attributes'], index)) {
          CommonFloor.defaults['apartment']['attributes'][index] = '';
        }
        if (CommonFloor.defaults['apartment']['attributes'][index] !== "") {
          types = CommonFloor.defaults['apartment']['attributes'][index].split(',');
        }
        if ($(e.currentTarget).is(':checked')) {
          types.push($(e.currentTarget).attr('data-value'));
        } else {
          types = _.without(types, $(e.currentTarget).attr('data-value'));
        }
        window.flooring = _.uniq(types);
        CommonFloor.defaults['apartment']['attributes'][index] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.views': function(e) {
        var types;
        types = [];
        if (CommonFloor.defaults['common']['views'] !== "") {
          types = CommonFloor.defaults['common']['views'].split(',');
        }
        if ($(e.currentTarget).is(':checked')) {
          types.push($(e.currentTarget).val());
        } else {
          types = _.without(types, $(e.currentTarget).val());
        }
        types = _.uniq(types);
        CommonFloor.defaults['common']['views'] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
        return unitTempCollection.trigger("filter_available");
      },
      'click @ui.facings': function(e) {
        var types;
        types = [];
        if (CommonFloor.defaults['common']['facings'] !== "") {
          types = CommonFloor.defaults['common']['facings'].split(',');
        }
        if ($(e.currentTarget).is(':checked')) {
          types.push($(e.currentTarget).val());
        } else {
          types = _.without(types, $(e.currentTarget).val());
        }
        types = _.uniq(types);
        CommonFloor.defaults['common']['facings'] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterBuilding(this.building_id);
        CommonFloor.filterStepNew();
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
      data.views = Marionette.getOption(this, 'views');
      data.facings = Marionette.getOption(this, 'facings');
      return data;
    };

    FilterApartmentView.prototype.onShow = function() {
      var area, budget, building_id, floor, max, min, priceMax, priceMin, sub, subArea, subBudget, units, url;
      this.loadSelectedFilters();
      $('.filters-content').mCustomScrollbar({
        theme: 'cf-scroll'
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
      sub = subArea % 5;
      subArea = subArea - sub;
      priceMin = _.min(budget);
      priceMax = _.max(budget);
      subBudget = (priceMax - priceMin) / 20;
      subBudget = subBudget.toFixed(0);
      if (CommonFloor.defaults['common']['area_min'] !== "") {
        $("#area").ionRangeSlider({
          type: "double",
          min: min,
          max: max,
          from: CommonFloor.defaults['common']['area_min']
        }, {
          to: CommonFloor.defaults['common']['area_max']
        }, {
          step: subArea,
          grid: false
        });
      } else {
        $("#area").ionRangeSlider({
          type: "double",
          min: min,
          max: max,
          step: subArea,
          grid: false
        });
      }
      if (CommonFloor.defaults['common']['price_min'] !== "") {
        $("#budget").ionRangeSlider({
          type: "double",
          min: priceMin,
          max: priceMax,
          from: CommonFloor.defaults['common']['price_min'],
          to: CommonFloor.defaults['common']['price_max'],
          grid: false,
          step: subBudget,
          prettify: function(num) {
            return window.numDifferentiation(num);
          }
        });
      } else {
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
      }
      $("#floor").ionRangeSlider({
        type: "double",
        min: 1,
        max: floor.get('no_of_floors'),
        grid: false
      });
      if (CommonFloor.defaults['common']['floor_min'] !== "") {
        $("#budget").ionRangeSlider({
          type: "double",
          min: 1,
          max: floor.get('no_of_floors'),
          from: CommonFloor.defaults['common']['floor_min'],
          to: CommonFloor.defaults['common']['floor_max'],
          grid: false
        });
      } else {
        $("#budget").ionRangeSlider({
          type: "double",
          min: 1,
          max: floor.get('no_of_floors'),
          grid: false
        });
      }
      return this.hideLabels();
    };

    FilterApartmentView.prototype.hideLabels = function() {
      var budget, facings, unitVariants, views;
      if (Marionette.getOption(this, 'flooring').length === 0) {
        $('.flooring_filter').hide();
      }
      if (Marionette.getOption(this, 'unitTypes').length === 0) {
        $('.unit_type_filter').hide();
      }
      if (Marionette.getOption(this, 'unitVariantNames').length === 0) {
        $('.variant_filter').hide();
      }
      views = Marionette.getOption(this, 'views');
      facings = Marionette.getOption(this, 'facings');
      budget = Marionette.getOption(this, 'budget');
      unitVariants = Marionette.getOption(this, 'unitVariants');
      if (views.length === 0) {
        $('.viewLabel').hide();
      }
      if (facings.length === 0) {
        $('.facingLabel').hide();
      }
      if (budget.length === 0) {
        $('.budgetLabel').hide();
      }
      if (unitVariants.length === 0) {
        return $('.areaLabel').hide();
      }
    };

    FilterApartmentView.prototype.loadClearFilters = function() {
      var area, budget, building_id, floor, max, min, priceMax, priceMin, sub, subArea, subBudget, submax, submin, url;
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
      submin = min % 5;
      min = min - submin;
      max = _.max(area);
      submax = max % 5;
      max = max - submax;
      subArea = (max - min) / 20;
      subArea = subArea.toFixed(0);
      sub = subArea % 5;
      subArea = subArea - sub;
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
      var aptValues, attributes, facings, id, types, typesArray, unitTypes, unitVariants, unitVariantsArray, unitsArr, unittypesArray, unittypesColl, views;
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
      attributes = [];
      aptValues = _.values(CommonFloor.defaults['apartment']['attributes']);
      $.merge(attributes, aptValues);
      views = [];
      $.merge(views, CommonFloor.defaults['common']['views'].split(','));
      facings = [];
      $.merge(facings, CommonFloor.defaults['common']['facings'].split(','));
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
      $(this.ui.flooring).each(function(ind, item) {
        $('#' + item.id).prop('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($(item).attr('data-value'), attributes) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', false);
        }
      });
      $(this.ui.views).each(function(ind, item) {
        $('#' + item.id).prop('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($(item).val(), views) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', false);
        }
      });
      $(this.ui.facings).each(function(ind, item) {
        $('#' + item.id).prop('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($(item).val(), facings) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', false);
        }
      });
      this.ui.status.prop('checked', false);
      if (CommonFloor.defaults['common']['availability'] !== "") {
        return this.ui.status.prop('checked', true);
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
      var apartmentFilters, area, budget, facings, flooring, unitTypes, unitVariantNames, unitVariants, view, views, viewsFacingsArr;
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
      viewsFacingsArr = this.getViewsFacings();
      views = viewsFacingsArr[0];
      facings = viewsFacingsArr[1];
      if ($.inArray('budget', project.get('filters').defaults) === -1 && _.isUndefined(project.get('filters').defaults)) {
        budget = [];
      }
      if ($.inArray('area', project.get('filters').defaults) === -1 && _.isUndefined(project.get('filters').defaults)) {
        unitVariants = [];
      }
      this.view = view = new CommonFloor.FilterApartmentView({
        model: project,
        'unitTypes': unitTypes,
        'unitVariants': _.uniq(unitVariants),
        'unitVariantNames': unitVariantNames,
        'budget': budget,
        'flooring': flooring,
        'views': views,
        'facings': facings
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
      var budget, building_id, filters, newtemp, temp, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr, url;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      temp = [];
      newtemp = [];
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      apartmentVariantMasterCollection.each(function(item) {
        var type, unitTypeModel, units;
        units = unitMasterCollection.where({
          'unit_variant_id': item.get('id'),
          'building_id': building_id
        });
        if (units.length !== 0) {
          unitTypeModel = unitTypeMasterCollection.findWhere({
            'id': item.get('unit_type_id')
          });
          type = 'A';
          if (window.propertyTypes[unitTypeModel.get('property_type_id')] === 'Penthouses') {
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
          return unitVariantNames.push({
            'id': item.get('id'),
            'name': item.get('unit_variant_name'),
            'type': type
          });
        }
      });
      if (!_.isUndefined(project.get('filters').Apartment)) {
        $.each(project.get('filters').Apartment, function(index, value) {
          var flooring;
          if (value !== 'unitTypes' && value !== 'unitVariantNames') {
            temp = [];
            flooring = [];
            apartmentVariantMasterCollection.each(function(item) {
              var units;
              units = unitMasterCollection.where({
                'unit_variant_id': item.get('id')
              });
              if (units.length !== 0) {
                return $.each(item.get('variant_attributes'), function(ind, val) {
                  if (ind === value && val !== "") {
                    if (_.isArray(val)) {
                      return $.each(val, function(ind1, val1) {
                        if ($.inArray(val, flooring) === -1) {
                          flooring.push(val1);
                          return temp.push({
                            'name': val1,
                            'index': value,
                            'id': 'apt' + s.replaceAll(val1, " ", "_"),
                            'dataId': s.replaceAll(val1, " ", "_"),
                            'classname': 'attributes',
                            'label': ind,
                            type: 'A'
                          });
                        }
                      });
                    } else {
                      if ($.inArray(val, flooring) === -1) {
                        flooring.push(val);
                        return temp.push({
                          'name': val,
                          'index': value,
                          'id': 'apt' + s.replaceAll(val, " ", "_"),
                          'dataId': s.replaceAll(val, " ", "_"),
                          'classname': 'attributes',
                          'label': ind,
                          type: 'A'
                        });
                      }
                    }
                  }
                });
              }
            });
            if (temp.length !== 0) {
              return newtemp.push({
                'label': value.toUpperCase(),
                'value': temp,
                'index': value
              });
            }
          }
        });
      }
      unitsArr = apartmentVariantMasterCollection.getApartmentMasterUnits();
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
        if ($.inArray(index, project.get('filters').Apartment) === -1 && index !== 'budget' && index !== 'unitVariants' && index !== 'flooring') {
          filters[0][index] = [];
        }
        if (index === 'flooring') {
          return $.each(value, function(ind, val) {
            if ($.inArray(val.index, project.get('filters').Apartment) === -1) {
              return filters[0][index] = [];
            }
          });
        }
      });
      return filters;
    };

    FilterApartmentCtrl.prototype.getViewsFacings = function() {
      var building_id, facings, facingsArr, units, url, viewArr, views;
      views = [];
      viewArr = [];
      facingsArr = [];
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      units = unitCollection.where({
        'building_id': building_id
      });
      _.each(units, function(item) {
        return $.merge(views, item.get('views'));
      });
      views = _.uniq(views);
      views = views.sort();
      $.each(views, function(ind, val) {
        return viewArr.push({
          'id': val,
          'name': val
        });
      });
      facings = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];
      $.each(facings, function(ind, val) {
        return facingsArr.push({
          'id': val,
          'name': val
        });
      });
      if ($.inArray('views', project.get('filters').defaults) === -1 && _.isUndefined(project.get('filters').defaults)) {
        viewArr = [];
      }
      if ($.inArray('direction', project.get('filters').defaults) === -1 && _.isUndefined(project.get('filters').defaults)) {
        facingsArr = [];
      }
      return [viewArr, facingsArr];
    };

    return FilterApartmentCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartment.filter.controller.js.map