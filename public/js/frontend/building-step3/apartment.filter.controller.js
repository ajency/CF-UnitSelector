(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.unitTypes = [];

  window.unitVariants = [];

  window.variantNames = [];

  window.price = '';

  window.area = '';

  window.type = [];

  CommonFloor.FilterApartmentView = (function(superClass) {
    extend(FilterApartmentView, superClass);

    function FilterApartmentView() {
      return FilterApartmentView.__super__.constructor.apply(this, arguments);
    }

    FilterApartmentView.prototype.template = Handlebars.compile('<div class="collapse" id="collapsefilters"> <div class="container-fluid""> <div class="filters-wrapper"> <div class="row"> <div class="col-sm-4 col-md-4 "> <h5># UNIT TYPE</h5> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitTypes}} </div> </div> <div class="col-sm-4 col-md-4 "> <h5># VARIANT</h5> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitVariantNames}} <a href="#" class="hide-div">+ Show More</a> </div> </div> </div> </div> <div class="filters-wrapper"> <div class="row"> <div class="col-sm-4 col-md-4 "> <h5># AREA (Sqft)</h5> <input type="text" id="area" name="area" value="" /> </div> <div class="col-sm-4 col-md-4 "> <h5># BUDGET </h5> <input type="text" id="budget" name="budget" value="" /> </div> <div class="col-sm-4 col-md-4 "> <h5># AVAILABILITY</h5> <div class="alert "> <input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> <label for="available" class="-lbl">Show Available Units Only</label> </div> </div> </div> </div> <div class="filters-bottom clearfix"> <a href="javascript:void(0)" data-toggle="collapse" data-target="#collapsefilters" class="text-primary pull-right m-b-10"><span class="icon-cross"></span> Close </a> </div> </div> </div>');

    FilterApartmentView.prototype.ui = {
      unitTypes: '.unit_types',
      priceMin: '.price_min',
      priceMax: '.price_max',
      status: '.status',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#area',
      budget: '#budget'
    };

    FilterApartmentView.prototype.events = {
      'click @ui.unitTypes': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.unitTypes.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          window.unitTypes = _.without(window.unitTypes, parseInt($(e.currentTarget).attr('data-value')));
        }
        console.log(window.unitTypes);
        CommonFloor.defaults['unitTypes'] = window.unitTypes.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      },
      'click @ui.variantNames': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          window.variantNames.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          window.variantNames = _.without(window.variantNames, parseInt($(e.currentTarget).attr('data-value')));
        }
        CommonFloor.defaults['unitVariants'] = window.variantNames.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      },
      'change @ui.priceMin': function(e) {
        if ($(e.currentTarget).val() !== "") {
          CommonFloor.defaults['price_min'] = $(e.currentTarget).val();
        } else {
          CommonFloor.defaults['price_min'] = 0;
        }
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      },
      'change @ui.priceMax': function(e) {
        if ($(e.currentTarget).val() !== "") {
          CommonFloor.defaults['price_max'] = $(e.currentTarget).val();
        } else {
          CommonFloor.defaults['price_max'] = 999999900;
        }
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      },
      'click @ui.status': function(e) {
        CommonFloor.defaults['availability'] = e.currentTarget.id;
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      },
      'change @ui.area': function(e) {
        CommonFloor.defaults['area_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['area_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      },
      'change @ui.budget': function(e) {
        CommonFloor.defaults['price_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['price_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      }
    };

    FilterApartmentView.prototype.onAptFilters = function(data) {
      var max, min, priceMax, priceMin, unitVariantArray, unitVariantColl, unittypesArray, unittypesColl;
      min = _.min(data[0].unitVariants);
      max = _.max(data[0].unitVariants);
      priceMin = _.min(data[0].budget);
      priceMax = _.max(data[0].budget);
      window.area.destroy();
      window.price.destroy();
      $("#area").ionRangeSlider({
        type: "double",
        min: min,
        max: max,
        grid: false
      });
      $("#budget").ionRangeSlider({
        type: "double",
        min: priceMin,
        max: priceMax,
        grid: false,
        prettify: function(num) {
          return window.numDifferentiation(num);
        }
      });
      unitVariantColl = _.pluck(apartmentVariantCollection.toArray(), 'id');
      unitVariantArray = unitVariantColl.map(function(item) {
        return parseInt(item);
      });
      unittypesColl = _.pluck(unitTypeCollection.toArray(), 'id');
      unittypesArray = unittypesColl.map(function(item) {
        return parseInt(item);
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
        if ($.inArray(parseInt($(item).attr('data-value')), unitVariantArray) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
    };

    FilterApartmentView.prototype.serializeData = function() {
      var data;
      data = FilterApartmentView.__super__.serializeData.call(this);
      data.unitTypes = Marionette.getOption(this, 'unitTypes');
      data.unitVariants = Marionette.getOption(this, 'unitVariants');
      data.unitVariantNames = Marionette.getOption(this, 'unitVariantNames');
      return data;
    };

    FilterApartmentView.prototype.onShow = function() {
      return this.loadSelectedFilters();
    };

    FilterApartmentView.prototype.loadSelectedFilters = function() {
      var area, budget, id, max, min, priceMax, priceMin, subArea, subBudget, types, typesArray, unitTypes, unitVariants, unitVariantsArray, unitsArr, unittypesArray, unittypesColl;
      unittypesArray = [];
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitVariantsArray = [];
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      typesArray = [];
      types = CommonFloor.defaults['type'].split(',');
      budget = [];
      area = [];
      id = [];
      unitsArr = [];
      unittypesColl = [];
      $.merge(unitsArr, apartmentVariantMasterCollection.getApartmentMasterUnits());
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        id.push(parseInt(unitDetails[0].get('id')));
        return unittypesColl.push(parseFloat(unitDetails[1].get('id')));
      });
      $.each(unitCollection.toArray(), function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        budget.push(parseFloat(unitDetails[3]));
        return area.push(parseFloat(unitDetails[0].get('super_built_up_area')));
      });
      console.log(budget);
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
        console.log($(item).attr('data-value'));
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
      min = _.min(CommonFloor.defaults['area_min']);
      max = _.max(CommonFloor.defaults['area_max']);
      subArea = (max - min) / 20;
      subArea = subArea.toFixed(0);
      priceMin = _.min(CommonFloor.defaults['price_min']);
      priceMax = _.max(CommonFloor.defaults['price_max']);
      subBudget = (priceMax - priceMin) / 20;
      subBudget = subBudget.toFixed(0);
      if (CommonFloor.defaults['area_min'] !== "" && CommonFloor.defaults['area_min'] !== "") {
        $("#area").ionRangeSlider({
          type: "double",
          min: min,
          max: max,
          grid: false,
          step: subArea
        });
      }
      if (CommonFloor.defaults['price_min'] !== "" && CommonFloor.defaults['price_max'] !== "") {
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
      window.price = $("#budget").data("ionRangeSlider");
      return window.area = $("#area").data("ionRangeSlider");
    };

    return FilterApartmentView;

  })(Marionette.ItemView);

  CommonFloor.FilterApartmentCtrl = (function(superClass) {
    extend(FilterApartmentCtrl, superClass);

    function FilterApartmentCtrl() {
      return FilterApartmentCtrl.__super__.constructor.apply(this, arguments);
    }

    FilterApartmentCtrl.prototype.initialize = function() {
      var apartmentFilters, area, budget, unitTypes, unitVariantNames, unitVariants, view;
      unitTypes = [];
      unitVariants = [];
      unitVariantNames = [];
      area = [];
      budget = [];
      apartmentFilters = this.getApartmentFilters();
      if (apartmentFilters.length !== 0) {
        $.merge(unitTypes, apartmentFilters[0].unitTypes);
        $.merge(unitVariants, apartmentFilters[0].unitVariants);
        $.merge(unitVariantNames, apartmentFilters[0].unitVariantNames);
        $.merge(budget, apartmentFilters[0].budget);
      }
      this.view = view = new CommonFloor.FilterApartmentView({
        'unitTypes': unitTypes,
        'unitVariants': _.uniq(unitVariants),
        'unitVariantNames': unitVariantNames,
        'budget': budget
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
      var budget, filters, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      apartmentVariantMasterCollection.each(function(item) {
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
              'type': 'A'
            });
          }
          unitVariants.push(item.get('super_built_up_area'));
          return unitVariantNames.push({
            'id': item.get('id'),
            'name': item.get('unit_variant_name'),
            'type': 'A'
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
        'budget': budget
      });
      return filters;
    };

    return FilterApartmentCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartment.filter.controller.js.map