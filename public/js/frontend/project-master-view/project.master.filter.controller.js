(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.FilterMsterView = (function(superClass) {
    extend(FilterMsterView, superClass);

    function FilterMsterView() {
      return FilterMsterView.__super__.constructor.apply(this, arguments);
    }

    FilterMsterView.prototype.template = Handlebars.compile('<div class="collapse" id="collapsefilters"> <div class="container-fluid""> <div class="filters-wrapper"> <div class="row"> <div class="col-sm-4 col-md-4 "> <h5># PROPERTY TYPE</h5> <div class="filter-chkbox-block"> {{#types}} <input type="checkbox" class="custom-chckbx addCft types" id="{{id}}" value="{{type}}"> <label for="{{id}}" class="-lbl">{{type}}{{type_name}}</label> {{/types}} </div> </div> <div class="col-sm-4 col-md-4 "> <h5># UNIT TYPE</h5> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitTypes}} </div> </div> <div class="col-sm-4 col-md-4 "> <h5># VARIANT</h5> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitVariantNames}} <a href="#" class="hide-div">+ Show More</a> </div> </div> </div> </div> <div class="filters-wrapper"> <div class="row"> <div class="col-sm-4 col-md-4 "> <h5># AREA (Sqft)</h5> <div class="range-container"> <input type="text" id="area" name="area" value="" /> </div> </div> <div class="col-sm-4 col-md-4 "> <h5># BUDGET </h5> <div class="range-container"> <input type="text" id="budget" name="budget" value="" /> </div> </div> <div class="col-sm-4 col-md-4 "> <h5># AVAILABILITY</h5> <div class="alert "> <input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> <label for="available" class="-lbl">Show Available Units Only</label> </div> </div> </div> </div> <div class="filters-bottom clearfix"> <a href="javascript:void(0)" data-toggle="collapse" data-target="#collapsefilters" class="text-primary pull-right m-b-10"><span class="icon-cross"></span> Close </a> </div> </div> </div>');

    FilterMsterView.prototype.initialize = function() {
      this.unitTypes = [];
      this.unitVariants = [];
      this.variantNames = [];
      this.price = '';
      this.area = '';
      return this.type = [];
    };

    FilterMsterView.prototype.ui = {
      unitTypes: '.unit_types',
      unitVariants: '.unitvariants',
      priceMin: '.price_min',
      priceMax: '.price_max',
      status: '.status',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#area',
      budget: '#budget',
      types: '.types'
    };

    FilterMsterView.prototype.events = {
      'click @ui.types': function(e) {
        this.unitTypes = [];
        this.unitVariants = [];
        this.variantNames = [];
        $.each(CommonFloor.defaults, function(index, value) {
          if (index !== 'type') {
            return CommonFloor.defaults[index] = "";
          }
        });
        if ($(e.currentTarget).is(':checked')) {
          this.type.push(e.target.id);
        } else {
          this.type = _.without(this.type, e.target.id);
        }
        CommonFloor.defaults['type'] = this.type.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.filter();
        if (e.target.id === 'Villas') {
          this.trigger("load:villa:filters");
        }
        if (e.target.id === 'Apartments') {
          this.trigger("load:apt:filters");
        }
        if (e.target.id === 'Plots') {
          return this.trigger("load:plot:filters");
        }
      },
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

    FilterMsterView.prototype.onVillaFilters = function(data) {
      var max, min, priceMax, priceMin, unitVariantArray, unitVariantColl, unittypesArray, unittypesColl;
      min = _.min(data[0].unitVariants);
      max = _.max(data[0].unitVariants);
      priceMin = _.min(data[0].budget);
      priceMax = _.max(data[0].budget);
      this.area.destroy();
      this.price.destroy();
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
      unitVariantColl = _.pluck(bunglowVariantCollection.toArray(), 'id');
      unitVariantArray = unitVariantColl.map(function(item) {
        return parseInt(item);
      });
      unittypesColl = _.pluck(unitTypeCollection.toArray(), 'id');
      unittypesArray = unittypesColl.map(function(item) {
        return parseInt(item);
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
        if ($.inArray(parseInt($(item).attr('data-value')), unitVariantArray) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', true);
        }
      });
    };

    FilterMsterView.prototype.onAptFilters = function(data) {
      var max, min, priceMax, priceMin, unitVariantArray, unitVariantColl, unittypesArray, unittypesColl;
      min = _.min(data[0].unitVariants);
      max = _.max(data[0].unitVariants);
      priceMin = _.min(data[0].budget);
      priceMax = _.max(data[0].budget);
      this.area.destroy();
      this.price.destroy();
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

    FilterMsterView.prototype.onPlotFilters = function(data) {
      var max, min, priceMax, priceMin, unitVariantArray, unitVariantColl, unittypesArray, unittypesColl;
      min = _.min(data[0].unitVariants);
      max = _.max(data[0].unitVariants);
      priceMin = _.min(data[0].budget);
      priceMax = _.max(data[0].budget);
      this.area.destroy();
      this.price.destroy();
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
      unitVariantColl = _.pluck(plotVariantCollection.toArray(), 'id');
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

    FilterMsterView.prototype.serializeData = function() {
      var data;
      data = FilterMsterView.__super__.serializeData.call(this);
      data.unitTypes = Marionette.getOption(this, 'unitTypes');
      data.unitVariants = Marionette.getOption(this, 'unitVariants');
      data.unitVariantNames = Marionette.getOption(this, 'unitVariantNames');
      data.types = Marionette.getOption(this, 'types');
      return data;
    };

    FilterMsterView.prototype.onShow = function() {
      var budget, max, min, minimum, priceMax, priceMin, subArea, subBudget, unitVariants;
      unitVariants = Marionette.getOption(this, 'unitVariants');
      budget = Marionette.getOption(this, 'budget');
      min = _.min(unitVariants);
      max = _.max(unitVariants);
      subArea = (max - min) / 20;
      console.log(subArea = subArea.toFixed(0));
      priceMin = _.min(budget);
      priceMax = _.max(budget);
      subBudget = (priceMax - priceMin) / 20;
      console.log(subBudget = subBudget.toFixed(0));
      minimum = window.numDifferentiation(priceMin);
      $("#area").ionRangeSlider({
        type: "double",
        min: min,
        max: max,
        grid: false,
        step: subArea
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
      this.price = $("#budget").data("ionRangeSlider");
      return this.area = $("#area").data("ionRangeSlider");
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
      var apartmentFilters, area, budget, plotFilters, types, unitTypes, unitVariantNames, unitVariants, view, villaFilters;
      unitTypes = [];
      unitVariants = [];
      unitVariantNames = [];
      area = [];
      budget = [];
      villaFilters = this.getVillaFilters();
      if (villaFilters.length !== 0) {
        $.merge(unitTypes, villaFilters[0].unitTypes);
        $.merge(unitVariants, villaFilters[0].unitVariants);
        $.merge(unitVariantNames, villaFilters[0].unitVariantNames);
        $.merge(budget, villaFilters[0].budget);
      }
      apartmentFilters = this.getApartmentFilters();
      if (apartmentFilters.length !== 0) {
        $.merge(unitTypes, apartmentFilters[0].unitTypes);
        $.merge(unitVariants, apartmentFilters[0].unitVariants);
        $.merge(unitVariantNames, apartmentFilters[0].unitVariantNames);
        $.merge(budget, apartmentFilters[0].budget);
      }
      plotFilters = this.getPlotFilters();
      if (plotFilters.length !== 0) {
        $.merge(unitTypes, plotFilters[0].unitTypes);
        $.merge(unitVariants, plotFilters[0].unitVariants);
        $.merge(unitVariantNames, plotFilters[0].unitVariantNames);
        $.merge(budget, plotFilters[0].budget);
      }
      types = CommonFloor.propertyTypes();
      $.each(types, function(index, value) {
        if (value.count === 0) {
          types = _.omit(types, index);
        }
        value['id'] = value.type;
        if (value.type === 'Buildings') {
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
        'types': types
      });
      this.listenTo(this.view, "load:villa:filters", this.loadVillaFilter);
      this.listenTo(this.view, "load:apt:filters", this.loadAptFilter);
      this.listenTo(this.view, "load:plot:filters", this.loadPlotFilter);
      return this.show(this.view);
    };

    FilterMasterCtrl.prototype.loadVillaFilter = function() {
      var villaFilters;
      villaFilters = this.getVillaFilters();
      return this.view.triggerMethod("villa:filters", villaFilters);
    };

    FilterMasterCtrl.prototype.loadAptFilter = function() {
      var aptFilters;
      aptFilters = this.getApartmentFilters();
      return this.view.triggerMethod("apt:filters", aptFilters);
    };

    FilterMasterCtrl.prototype.loadPlotFilter = function() {
      var plotFilters;
      plotFilters = this.getPlotFilters();
      return this.view.triggerMethod("plot:filters", plotFilters);
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
      filters.push({
        'unitTypes': unitTypes,
        'unitVariants': unitVariants,
        'unitVariantNames': unitVariantNames,
        'budget': budget
      });
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
      unitsArr = apartmentVariantCollection.getApartmentUnits();
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
      filters.push({
        'unitTypes': unitTypes,
        'unitVariants': unitVariants,
        'unitVariantNames': unitVariantNames,
        'budget': budget
      });
      return filters;
    };

    return FilterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-master-view/project.master.filter.controller.js.map