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

  CommonFloor.FilterMsterView = (function(superClass) {
    extend(FilterMsterView, superClass);

    function FilterMsterView() {
      return FilterMsterView.__super__.constructor.apply(this, arguments);
    }

    FilterMsterView.prototype.template = Handlebars.compile('<div class="fliters-container closed" id="collapsefilters"> <a href="javascript:void(0)"  class="text-primary filters-clear clear">Clear Filters </a> <button class="btn btn-primary filter-button" type="button"> <span class="icon-place"></span> </button> <div class="filters-wrapper"> <div class="filters-content"> <div class="property_type"> <h6 class="">PROPERTY TYPE</h6> <div class="filter-chkbox-block"> {{#types}} <input type="checkbox" class="custom-chckbx addCft types" id="{{id}}" value="{{type}}"> <label for="{{id}}" class="-lbl">{{type}}{{type_name}}</label> {{/types}} </div> </div> <div class=""> <h6 class="">UNIT TYPE</h6> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitTypes}} </div> </div> <div class=""> <h6 class="">VARIANT</h6> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitVariantNames}} <!--<a href="#" class="hide-div">+ Show More</a>--> </div> </div> <div class=""> <h6 class="">Flooring</h6> <div class="filter-chkbox-block"> {{#flooring}} <input type="checkbox" class="custom-chckbx addCft flooring" id="flooring{{id}}" value="flooring{{id}}" value="1" data-value="{{id}}" > <label for="flooring{{id}}" class="-lbl">{{name}}({{type}})</label> {{/flooring}} <!--<a href="#" class="hide-div">+ Show More</a>--> </div> </div> <div class=""> <h6 class="">AREA (Sqft)</h6> <div class="range-container"> <input type="text" id="area" name="area" value="" /> </div> </div> <div class=""> <h6 class="">BUDGET </h6> <div class="range-container"> <input type="text" id="budget" name="budget" value="" /> </div> </div> <div class=""> <h6 class="availability">AVAILABILITY</h6> <div class="filter-chkbox-block"> <input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> <label for="available" class="-lbl">Show Available Units Only</label> </div> </div> </div> </div> <!--<div class="filters-bottom"> <a href="#">+ More Filters</a> </div>--> </div>');

    FilterMsterView.prototype.ui = {
      unitTypes: '.unit_types',
      priceMin: '.price_min',
      priceMax: '.price_max',
      status: '.status',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#area',
      budget: '#budget',
      types: '.types',
      clear: '.clear',
      flooring: '.flooring'
    };

    FilterMsterView.prototype.initialize = function() {
      var unitTypes, variantNames;
      this.price = '';
      this.area = '';
      unitTypes = [];
      variantNames = [];
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

    FilterMsterView.prototype.events = {
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
        CommonFloor.filter();
        unitCollection.trigger('available');
        this.loadSelectedFilters();
        this.price = $("#budget").data("ionRangeSlider");
        this.area = $("#area").data("ionRangeSlider");
        this.price.destroy();
        this.area.destroy();
        return this.loadClearFilter();
      },
      'click @ui.types': function(e) {
        window.unitTypes = [];
        window.unitVariants = [];
        window.variantNames = [];
        $.each(CommonFloor.defaults, function(index, value) {
          if (index !== 'type') {
            return CommonFloor.defaults[index] = "";
          }
        });
        if ($(e.currentTarget).is(':checked')) {
          window.type.push($(e.target).val());
        } else {
          window.type = _.without(window.type, $(e.target).val());
        }
        CommonFloor.defaults['type'] = window.type.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filter();
        unitCollection.trigger('available');
        if (e.target.id === 'Villas') {
          this.villaFilters();
        }
        if (e.target.id === 'Apartments') {
          this.apartmentFilters();
        }
        if (e.target.id === 'Plots') {
          return this.plotFilters();
        }
      },
      'click @ui.unitTypes': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.unitTypes.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          window.unitTypes = _.without(window.unitTypes, parseInt($(e.currentTarget).attr('data-value')));
        }
        window.unitTypes = _.uniq(window.unitTypes);
        CommonFloor.defaults['unitTypes'] = window.unitTypes.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filter();
        return unitCollection.trigger('available');
      },
      'click @ui.variantNames': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.variantNames.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          window.variantNames = _.without(window.variantNames, parseInt($(e.currentTarget).attr('data-value')));
        }
        window.variantNames = _.uniq(window.variantNames);
        CommonFloor.defaults['unitVariants'] = window.variantNames.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filter();
        return unitCollection.trigger('available');
      },
      'click @ui.status': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          CommonFloor.defaults['availability'] = e.currentTarget.id;
        } else {
          CommonFloor.defaults['availability'] = "";
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filter();
        return unitCollection.trigger('available');
      },
      'change @ui.area': function(e) {
        CommonFloor.defaults['area_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['area_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filter();
        return unitCollection.trigger('available');
      },
      'change @ui.budget': function(e) {
        CommonFloor.defaults['price_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['price_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filter();
        return unitCollection.trigger('available');
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
        CommonFloor.filter();
        return unitCollection.trigger('available');
      },
      'click .filter-button': function(e) {
        window.flag = 0;
        $('.fliters-container').toggleClass('closed');
        if ($('.fliters-container').hasClass("closed")) {
          return window.flag = 1;
        }
      }
    };

    FilterMsterView.prototype.villaFilters = function() {
      var area, budget, id, unitsArr, unittypesArray, unittypesColl;
      budget = [];
      area = [];
      id = [];
      unitsArr = [];
      unittypesColl = _.pluck(unitTypeCollection.toArray(), 'id');
      unittypesArray = unittypesColl.map(function(item) {
        return parseInt(item);
      });
      $.merge(unitsArr, plotVariantCollection.getPlotUnits());
      $.merge(unitsArr, apartmentVariantCollection.getApartmentUnits());
      $.merge(unitsArr, bunglowVariantCollection.getBunglowUnits());
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        budget.push(parseFloat(unitDetails[3]));
        area.push(parseFloat(unitDetails[0].get('super_built_up_area')));
        return id.push(parseInt(unitDetails[0].get('id')));
      });
      $(this.ui.unitTypes).each(function(ind, item) {
        $('#' + item.id).attr('disabled', false);
        $('#' + item.id).attr('checked', false);
        if ($.inArray(parseInt($(item).attr('data-value')), unittypesArray) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
      return $(this.ui.variantNames).each(function(ind, item) {
        $('#' + item.id).attr('checked', false);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray(parseInt($(item).attr('data-value')), id) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
    };

    FilterMsterView.prototype.apartmentFilters = function() {
      var area, budget, id, unitsArr, unittypesArray, unittypesColl;
      budget = [];
      area = [];
      id = [];
      unitsArr = [];
      unittypesColl = _.pluck(unitTypeCollection.toArray(), 'id');
      unittypesArray = unittypesColl.map(function(item) {
        return parseInt(item);
      });
      $.merge(unitsArr, plotVariantCollection.getPlotUnits());
      $.merge(unitsArr, apartmentVariantCollection.getApartmentUnits());
      $.merge(unitsArr, bunglowVariantCollection.getBunglowUnits());
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        budget.push(parseFloat(unitDetails[3]));
        area.push(parseFloat(unitDetails[0].get('super_built_up_area')));
        id.push(parseInt(unitDetails[0].get('id')));
        $(this.ui.unitTypes).each(function(ind, item) {});
        $('#' + item.id).attr('checked', false);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray(parseInt($(item).attr('data-value')), unittypesArray) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
      return $(this.ui.variantNames).each(function(ind, item) {
        $('#' + item.id).attr('checked', false);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray(parseInt($(item).attr('data-value')), id) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
    };

    FilterMsterView.prototype.plotFilters = function() {
      var area, budget, id, unitsArr, unittypesArray, unittypesColl;
      budget = [];
      area = [];
      id = [];
      unitsArr = [];
      unittypesColl = _.pluck(unitTypeCollection.toArray(), 'id');
      unittypesArray = unittypesColl.map(function(item) {
        return parseInt(item);
      });
      $.merge(unitsArr, plotVariantCollection.getPlotUnits());
      $.merge(unitsArr, apartmentVariantCollection.getApartmentUnits());
      $.merge(unitsArr, bunglowVariantCollection.getBunglowUnits());
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        budget.push(parseFloat(unitDetails[3]));
        area.push(parseFloat(unitDetails[0].get('super_built_up_area')));
        return id.push(parseInt(unitDetails[0].get('id')));
      });
      $(this.ui.unitTypes).each(function(ind, item) {
        $('#' + item.id).attr('checked', false);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray(parseInt($(item).attr('data-value')), unittypesArray) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
      return $(this.ui.variantNames).each(function(ind, item) {
        $('#' + item.id).attr('checked', false);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray(parseInt($(item).attr('data-value')), id) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
    };

    FilterMsterView.prototype.serializeData = function() {
      var data;
      data = FilterMsterView.__super__.serializeData.call(this);
      data.unitTypes = Marionette.getOption(this, 'unitTypes');
      data.unitVariants = Marionette.getOption(this, 'unitVariants');
      data.unitVariantNames = Marionette.getOption(this, 'unitVariantNames');
      data.flooring = Marionette.getOption(this, 'flooring');
      data.types = Marionette.getOption(this, 'types');
      return data;
    };

    FilterMsterView.prototype.onShow = function() {
      var area, budget, max, min, priceMax, priceMin, subArea, subBudget, types;
      $('.filters-content').mCustomScrollbar({
        theme: 'cf-scroll'
      });
      budget = [];
      area = [];
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
      if (CommonFloor.defaults['area_min'] !== "") {
        $("#area").ionRangeSlider({
          type: "double",
          min: min,
          max: max,
          from: CommonFloor.defaults['area_min']
        }, {
          to: CommonFloor.defaults['area_max']
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
      priceMin = _.min(budget);
      priceMax = _.max(budget);
      subBudget = (priceMax - priceMin) / 20;
      subBudget = subBudget.toFixed(0);
      if (CommonFloor.defaults['price_min'] !== "") {
        $("#budget").ionRangeSlider({
          type: "double",
          min: priceMin,
          max: priceMax,
          from: CommonFloor.defaults['price_min'],
          to: CommonFloor.defaults['price_max'],
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
      types = Marionette.getOption(this, 'types');
      if (types.length === 1) {
        $('.property_type').hide();
      }
      if (Marionette.getOption(this, 'flooring').length === 0) {
        $('.property_type').hide();
      }
      return this.loadSelectedFilters();
    };

    FilterMsterView.prototype.loadClearFilter = function() {
      var area, budget, max, min, priceMax, priceMin, subArea, subBudget;
      budget = [];
      area = [];
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
      $("#area").ionRangeSlider({
        type: "double",
        min: min,
        max: max,
        step: subArea,
        grid: false
      });
      return $("#budget").ionRangeSlider({
        type: "double",
        min: priceMin,
        max: priceMax,
        grid: false,
        step: subBudget,
        prettify: function(num) {
          return window.numDifferentiation(num);
        }
      });
    };

    FilterMsterView.prototype.loadSelectedFilters = function() {
      var id, pt_types, res, types, typesArray, unitTypes, unitVariants, unitVariantsArray, unitsArr, unittypesArray, unittypesColl;
      types = [];
      pt_types = Marionette.getOption(this, 'types');
      types = CommonFloor.defaults['type'].split(',');
      if (pt_types.length === 1) {
        types.push(pt_types[0].type);
      }
      unittypesArray = [];
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitVariantsArray = [];
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      typesArray = [];
      id = [];
      unitsArr = [];
      unittypesColl = [];
      $.each(types, function(index, value) {
        if (value === 'Villas') {
          $.merge(unitsArr, bunglowVariantMasterCollection.getBunglowMasterUnits());
        }
        if (value === 'Apartments/Penthouse') {
          $.merge(unitsArr, apartmentVariantMasterCollection.getApartmentMasterUnits());
        }
        if (value === 'Plots') {
          $.merge(unitsArr, plotVariantMasterCollection.getPlotMasterUnits());
        }
        if (value === "") {
          $.merge(unitsArr, bunglowVariantMasterCollection.getBunglowUnits());
          $.merge(unitsArr, apartmentVariantMasterCollection.getApartmentUnits());
          return $.merge(unitsArr, plotVariantMasterCollection.getPlotUnits());
        }
      });
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        id.push(parseInt(unitDetails[0].get('id')));
        return unittypesColl.push(parseFloat(unitDetails[1].get('id')));
      });
      unittypesColl = _.uniq(unittypesColl);
      $(this.ui.unitTypes).each(function(ind, item) {
        $('#' + item.id).attr('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($(item).attr('data-value'), unitTypes) === -1) {
          $('#' + item.id).prop('checked', false);
          $('#' + item.id).attr('disabled', false);
        }
        if ($.inArray(parseInt($(item).attr('data-value')), unittypesColl) === -1 && CommonFloor.defaults['type'] !== '') {
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
        if ($.inArray(parseInt($(item).attr('data-value')), id) === -1 && CommonFloor.defaults['type'] !== '') {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
      $(this.ui.types).each(function(ind, item) {
        $('#' + item.id).attr('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($('#' + item.id).val(), types) === -1) {
          return $('#' + item.id).prop('checked', false);
        }
      });
      this.ui.status.prop('checked', false);
      if (CommonFloor.defaults['availability'] !== "") {
        this.ui.status.prop('checked', true);
      }
      res = CommonFloor.getFilters()[0];
      if (Object.keys(res).length === 0) {
        window.flag = 1;
      }
      if (window.flag === 0) {
        return $('.fliters-container').removeClass('closed');
      } else {
        return $('.fliters-container').addClass('closed');
      }
    };

    return FilterMsterView;

  })(Marionette.ItemView);

  CommonFloor.FilterMasterCtrl = (function(superClass) {
    extend(FilterMasterCtrl, superClass);

    function FilterMasterCtrl() {
      return FilterMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    FilterMasterCtrl.prototype.initialize = function() {
      var apartmentFilters, area, budget, flooring, plotFilters, types, unitTypes, unitVariantNames, unitVariants, view, villaFilters;
      unitTypes = [];
      unitVariants = [];
      unitVariantNames = [];
      area = [];
      budget = [];
      flooring = [];
      villaFilters = this.getVillaFilters();
      if (villaFilters.length !== 0) {
        $.merge(unitTypes, villaFilters[0].unitTypes);
        $.merge(unitVariants, villaFilters[0].unitVariants);
        $.merge(unitVariantNames, villaFilters[0].unitVariantNames);
        $.merge(budget, villaFilters[0].budget);
        $.merge(flooring, villaFilters[0].flooring);
      }
      apartmentFilters = this.getApartmentFilters();
      if (apartmentFilters.length !== 0) {
        $.merge(unitTypes, apartmentFilters[0].unitTypes);
        $.merge(unitVariants, apartmentFilters[0].unitVariants);
        $.merge(unitVariantNames, apartmentFilters[0].unitVariantNames);
        $.merge(budget, apartmentFilters[0].budget);
        $.merge(flooring, apartmentFilters[0].flooring);
      }
      plotFilters = this.getPlotFilters();
      if (plotFilters.length !== 0) {
        $.merge(unitTypes, plotFilters[0].unitTypes);
        $.merge(unitVariants, plotFilters[0].unitVariants);
        $.merge(unitVariantNames, plotFilters[0].unitVariantNames);
        $.merge(budget, plotFilters[0].budget);
        $.merge(flooring, plotFilters[0].flooring);
      }
      types = CommonFloor.masterPropertyTypes();
      $.each(types, function(index, value) {
        if (value.count === 0) {
          types = _.omit(types, index);
        }
        value['id'] = value.type;
        if (value.type === 'Apartments') {
          value.type = 'Apartments/Penthouse';
          value.type_name = '(A)/(PH)';
          return value['id'] = 'Apartments';
        }
      });
      this.view = view = new CommonFloor.FilterMsterView({
        'unitTypes': unitTypes,
        'unitVariants': _.uniq(unitVariants),
        'unitVariantNames': unitVariantNames,
        'budget': budget,
        'types': types,
        'flooring': flooring
      });
      return this.show(this.view);
    };

    FilterMasterCtrl.prototype.getVillaFilters = function() {
      var budget, filters, flooring, flooringAttributes, unitTypes, unitVariantNames, unitVariants, unit_types;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      flooringAttributes = [];
      budget = [];
      flooring = [];
      bunglowVariantMasterCollection.each(function(item) {
        var unitTypeModel, units, unitsArr;
        units = unitMasterCollection.where({
          'unit_variant_id': item.get('id')
        });
        if (units.length !== 0) {
          unitTypeModel = unitTypeMasterCollection.findWhere({
            'id': item.get('unit_type_id')
          });
          if ($.inArray(item.get('unit_type_id'), unit_types) === -1) {
            unit_types.push(parseInt(unitTypeModel.get('id')));
            unitTypes.push({
              'id': unitTypeModel.get('id'),
              'name': unitTypeModel.get('name'),
              'type': 'V'
            });
          }
          unitVariants.push(item.get('super_built_up_area'));
          unitVariantNames.push({
            'id': item.get('id'),
            'name': item.get('unit_variant_name'),
            'type': 'V'
          });
          if ($.inArray(item.get('variant_attributes').flooring, flooring) === -1 && !_.isUndefined(item.get('variant_attributes').flooring)) {
            flooring.push(item.get('variant_attributes').flooring);
            flooringAttributes.push({
              'id': item.get('variant_attributes').flooring,
              'name': item.get('variant_attributes').flooring,
              type: 'V'
            });
          }
        }
        unitsArr = bunglowVariantMasterCollection.getBunglowUnits();
        return $.each(unitsArr, function(index, value) {
          var unitDetails;
          unitDetails = window.unit.getUnitDetails(value.id);
          return budget.push(parseFloat(unitDetails[3]));
        });
      });
      filters.push({
        'unitTypes': unitTypes,
        'unitVariants': unitVariants,
        'unitVariantNames': unitVariantNames,
        'flooring': flooringAttributes,
        'budget': budget
      });
      return filters;
    };

    FilterMasterCtrl.prototype.getApartmentFilters = function() {
      var budget, filters, flooring, flooringAttributes, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      flooringAttributes = [];
      flooring = [];
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
        'flooring': flooringAttributes,
        'budget': budget
      });
      return filters;
    };

    FilterMasterCtrl.prototype.getPlotFilters = function() {
      var budget, filters, flooring, flooringAttributes, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      flooringAttributes = [];
      budget = [];
      flooring = [];
      plotVariantMasterCollection.each(function(item) {
        var unitTypeModel, units;
        units = unitMasterCollection.where({
          'unit_variant_id': item.get('id')
        });
        if (units.length !== 0) {
          unitTypeModel = unitTypeMasterCollection.findWhere({
            'id': item.get('unit_type_id')
          });
          if ($.inArray(item.get('unit_type_id'), unit_types) === -1) {
            unit_types.push(parseInt(unitTypeModel.get('id')));
            unitTypes.push({
              'id': unitTypeModel.get('id'),
              'name': unitTypeModel.get('name'),
              'type': 'P'
            });
          }
          unitVariants.push(item.get('size'));
          unitVariantNames.push({
            'id': item.get('id'),
            'name': item.get('unit_variant_name'),
            'type': 'P'
          });
          if ($.inArray(item.get('variant_attributes').flooring, flooring) === -1 && !_.isUndefined(item.get('variant_attributes').flooring)) {
            flooring.push(item.get('variant_attributes').flooring);
            return flooringAttributes.push({
              'id': item.get('variant_attributes').flooring,
              'name': item.get('variant_attributes').flooring,
              type: 'P'
            });
          }
        }
      });
      unitsArr = plotVariantMasterCollection.getPlotUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        return budget.push(parseFloat(unitDetails[3]));
      });
      filters.push({
        'unitTypes': unitTypes,
        'unitVariants': unitVariants,
        'unitVariantNames': unitVariantNames,
        'flooring': flooringAttributes,
        'budget': budget
      });
      return filters;
    };

    return FilterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-master-view/project.master.filter.controller.js.map