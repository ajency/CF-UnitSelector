(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.FilterMsterView = (function(superClass) {
    extend(FilterMsterView, superClass);

    function FilterMsterView() {
      return FilterMsterView.__super__.constructor.apply(this, arguments);
    }

    FilterMsterView.prototype.template = Handlebars.compile('<div class="collapse" id="collapsefilters"> <div class="filters-wrapper"> <div class="col-sm-4 col-md-4 "> <h5># UNIT TYPE</h5> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitTypes}} </div> </div> <div class="col-sm-4 col-md-4 "> <h5># VARIANT</h5> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitVariantNames}} <a href="#" class="hide-div">+ Show More</a> </div> </div> </div> <div class="row"> <div class=" col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="row"> <div class="col-sm-4 col-md-4 "> <h5># AREA (Sqft)</h5> <input type="text" id="area" name="area" value="" /> </div> <div class="col-sm-4 col-md-4 "> <h5># BUDGET </h5> <input type="text" id="budget" name="budget" value="" /> </div> <div class="col-sm-4 col-md-4 "> </div> </div> </div> </div> </div> <div "> <h5># AVAILABILITY</h5> <div class="alert "> <input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> <label for="Available" class="-lbl">Show Available Units Only  (What\'s this?)</label> </div> </div> </div>');

    FilterMsterView.prototype.initialize = function() {
      this.unitTypes = [];
      this.unitVariants = [];
      return this.variantNames = [];
    };

    FilterMsterView.prototype.ui = {
      villaPropType: 'input[name="villa"]',
      villaFilters: '.villaFilters',
      apartmentPropType: 'input[name="apartment"]',
      aptFilters: '.aptFilters',
      unitTypes: '.unit_types',
      unitVariants: '.unitvariants',
      priceMin: '.price_min',
      priceMax: '.price_max',
      status: '.status',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#area',
      budget: '#budget'
    };

    FilterMsterView.prototype.events = {
      'click @ui.unitTypes': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          this.unitTypes.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          this.unitTypes = _.without(this.unitTypes, parseInt($(e.currentTarget).attr('data-value')));
        }
        console.log(this.unitTypes);
        CommonFloor.defaults['unitTypes'] = this.unitTypes.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      },
      'click @ui.variantNames': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          this.variantNames.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          this.variantNames = _.without(this.variantNames, parseInt($(e.currentTarget).attr('data-value')));
        }
        CommonFloor.defaults['unitVariants'] = this.variantNames.join(',');
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
      'click @ui.apply': function(e) {},
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

    FilterMsterView.prototype.resetFilters = function() {
      var apartments, bunglows, status, unittypes;
      unittypes = [];
      apartments = [];
      bunglows = [];
      status = [];
      unitTypeTempCollection.each(function(item) {
        return unittypes.push(item.get('id'));
      });
      apartmentVariantTempCollection.each(function(item) {
        return apartments.push(item.get('id'));
      });
      bunglowVariantTempCollection.each(function(item) {
        return bunglows.push(item.get('id'));
      });
      unitTempCollection.each(function(item) {
        return status.push(item.get('availability'));
      });
      $(this.ui.unitTypes).each(function(ind, item) {
        $('#' + item.id).prop('checked', true);
        if ($.inArray(parseInt(item.id), unittypes) === -1) {
          return $('#' + item.id).prop('checked', false);
        }
      });
      $(this.ui.unitVariants).each(function(ind, item) {
        $('#' + item.id).prop('checked', true);
        if ($.inArray(parseInt(item.id), apartments) === -1 && apartmentVariantTempCollection.length !== 0) {
          $('#' + item.id).prop('checked', false);
        }
        if ($.inArray(parseInt(item.id), bunglows) === -1 && bunglowVariantTempCollection.length !== 0) {
          return $('#' + item.id).prop('checked', false);
        }
      });
      return $(this.ui.status).each(function(ind, item) {
        $('#' + item.id).prop('checked', true);
        if ($.inArray(item.id, status) === -1) {
          return $('#' + item.id).prop('checked', false);
        }
      });
    };

    FilterMsterView.prototype.serializeData = function() {
      var data;
      data = FilterMsterView.__super__.serializeData.call(this);
      data.unitTypes = Marionette.getOption(this, 'unitTypes');
      data.unitVariants = Marionette.getOption(this, 'unitVariants');
      data.unitVariantNames = Marionette.getOption(this, 'unitVariantNames');
      return data;
    };

    FilterMsterView.prototype.onShow = function() {
      var budget, max, min, minimum, priceMax, priceMin, unitVariants;
      unitVariants = Marionette.getOption(this, 'unitVariants');
      budget = Marionette.getOption(this, 'budget');
      min = _.min(unitVariants);
      max = _.max(unitVariants);
      priceMin = _.min(budget);
      console.log(priceMax = _.max(budget));
      console.log(minimum = window.numDifferentiation(priceMin));
      $("#area").ionRangeSlider({
        type: "double",
        min: min,
        max: max,
        grid: false
      });
      return $("#budget").ionRangeSlider({
        type: "double",
        min: priceMin,
        max: priceMax,
        grid: false,
        prettify: function(num) {
          return window.numDifferentiation(num);
        }
      });
    };

    FilterMsterView.prototype.assignVillaValues = function(villaFilters) {
      $.merge(this.unitTypes, _.pluck(villaFilters[0].unitTypes, 'id'));
      $.merge(this.unitVariants, _.pluck(villaFilters[0].unitVariants, 'id'));
      return $.merge(this.status, _.pluck(villaFilters[0].status, 'name'));
    };

    FilterMsterView.prototype.assignAptValues = function(apartmentFilters) {
      $.merge(this.unitTypes, _.pluck(apartmentFilters[0].unitTypes, 'id'));
      $.merge(this.unitVariants, _.pluck(apartmentFilters[0].unitVariants, 'id'));
      return $.merge(this.status, _.pluck(apartmentFilters[0].status, 'name'));
    };

    return FilterMsterView;

  })(Marionette.ItemView);

  CommonFloor.FilterMasterCtrl = (function(superClass) {
    extend(FilterMasterCtrl, superClass);

    function FilterMasterCtrl() {
      return FilterMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    FilterMasterCtrl.prototype.initialize = function() {
      var apartmentFilters, area, budget, plotFilters, unitTypes, unitVariantNames, unitVariants, view, villaFilters;
      unitTypes = [];
      unitVariants = [];
      unitVariantNames = [];
      area = [];
      budget = [];
      villaFilters = this.getVillaFilters();
      $.merge(unitTypes, villaFilters[0].unitTypes);
      $.merge(unitVariants, villaFilters[0].unitVariants);
      $.merge(unitVariantNames, villaFilters[0].unitVariantNames);
      $.merge(budget, villaFilters[0].budget);
      apartmentFilters = this.getApartmentFilters();
      $.merge(unitTypes, apartmentFilters[0].unitTypes);
      $.merge(unitVariants, apartmentFilters[0].unitVariants);
      $.merge(unitVariantNames, apartmentFilters[0].unitVariantNames);
      $.merge(budget, apartmentFilters[0].budget);
      plotFilters = this.getPlotFilters();
      $.merge(unitTypes, plotFilters[0].unitTypes);
      $.merge(unitVariants, plotFilters[0].unitVariants);
      $.merge(unitVariantNames, plotFilters[0].unitVariantNames);
      $.merge(budget, plotFilters[0].budget);
      console.log(unitTypes);
      console.log(budget);
      this.view = view = new CommonFloor.FilterMsterView({
        'unitTypes': unitTypes,
        'unitVariants': _.uniq(unitVariants),
        'unitVariantNames': unitVariantNames,
        'budget': budget
      });
      return this.show(this.view);
    };

    FilterMasterCtrl.prototype.loadController = function() {
      var apartmentFilters;
      apartmentFilters = this.getApartmentFilters();
      return this.view.triggerMethod("filter:data", apartmentFilters);
    };

    FilterMasterCtrl.prototype.getVillaFilters = function() {
      var budget, filters, unitTypes, unitVariantNames, unitVariants, unit_types;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      bunglowVariantCollection.each(function(item) {
        var unitTypeModel, units, unitsArr;
        units = unitMasterCollection.where({
          'unit_variant_id': item.get('id')
        });
        if (units.length !== 0) {
          unitTypeModel = unitTypeCollection.findWhere({
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
        }
        unitsArr = bunglowVariantCollection.getBunglowUnits();
        return $.each(unitsArr, function(index, value) {
          var unitDetails;
          unitDetails = window.unit.getUnitDetails(value.id);
          return budget.push(parseFloat(unitDetails[3]));
        });
      });
      if (unitVariants.length !== 0) {
        filters.push({
          'unitTypes': unitTypes,
          'unitVariants': unitVariants,
          'unitVariantNames': unitVariantNames,
          'budget': budget
        });
      }
      return filters;
    };

    FilterMasterCtrl.prototype.getApartmentFilters = function() {
      var budget, filters, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      apartmentVariantCollection.each(function(item) {
        var unitTypeModel, units;
        units = unitMasterCollection.where({
          'unit_variant_id': item.get('id')
        });
        if (units.length !== 0) {
          unitTypeModel = unitTypeCollection.findWhere({
            'id': item.get('unit_type_id')
          });
          if ($.inArray(item.get('unit_type_id'), unit_types) === -1) {
            unit_types.push(parseInt(unitTypeModel.get('id')));
            unitTypes.push({
              'id': unitTypeModel.get('id'),
              'name': unitTypeModel.get('name'),
              'type': 'B'
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
      unitsArr = apartmentVariantCollection.getApartmentUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        return budget.push(parseFloat(unitDetails[3]));
      });
      if (unitVariants.length !== 0) {
        filters.push({
          'unitTypes': unitTypes,
          'unitVariants': unitVariants,
          'unitVariantNames': unitVariantNames,
          'budget': budget
        });
      }
      return filters;
    };

    FilterMasterCtrl.prototype.getPlotFilters = function() {
      var budget, filters, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      plotVariantCollection.each(function(item) {
        var unitTypeModel, units;
        units = unitMasterCollection.where({
          'unit_variant_id': item.get('id')
        });
        if (units.length !== 0) {
          unitTypeModel = unitTypeCollection.findWhere({
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
          return unitVariantNames.push({
            'id': item.get('id'),
            'name': item.get('unit_variant_name'),
            'type': 'P'
          });
        }
      });
      unitsArr = plotVariantCollection.getPlotUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        return budget.push(parseFloat(unitDetails[3]));
      });
      if (unitVariants.length !== 0) {
        filters.push({
          'unitTypes': unitTypes,
          'unitVariants': unitVariants,
          'unitVariantNames': unitVariantNames,
          'budget': budget
        });
      }
      return filters;
    };

    return FilterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-master-view/project.master.filter.controller.js.map