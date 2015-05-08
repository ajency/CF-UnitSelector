(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.FilterMsterView = (function(superClass) {
    extend(FilterMsterView, superClass);

    function FilterMsterView() {
      return FilterMsterView.__super__.constructor.apply(this, arguments);
    }

    FilterMsterView.prototype.template = Handlebars.compile('<div class="collapse" id="collapsefilters"> <div class="filters-wrapper"> <div class="col-sm-4 col-md-4 "> <h5># UNIT TYPE</h5> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitTypes}} </div> </div> <div class="col-sm-4 col-md-4 "> <h5># VARIANT</h5> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> {{/unitVariantNames}} <a href="#" class="hide-div">+ Show More</a> </div> </div> </div> <div class="row"> <div class=" col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="row"> <div class="col-sm-4 col-md-4 "> <h5># AREA (Sqft)</h5> <input type="text" id="example_id" name="example_name" value="" /> </div> <div class="col-sm-4 col-md-4 "> <h5># BUDGET </h5> <input type="text" id="budget" name="example_name" value="" /> </div> <div class="col-sm-4 col-md-4 "> </div> </div> </div> </div> </div> <div class="filters-wrapper"> <div class="blck-wrap clearfix"> <h5>Budget</h5> <select class="price_min form-control budget-range min-budget addCft" name="price_min"> <option selected="" value="">Min</option> <option value="500000">5 Lac</option> <option value="1000000">10 Lac</option> <option value="2000000">20 Lac</option> <option value="3000000">30 Lac</option> <option value="4000000">40 Lac</option> <option value="5000000">50 Lac</option> <option value="6000000">60 Lac</option> <option value="7000000">70 Lac</option> <option value="8000000">80 Lac</option> <option value="9000000">90 Lac</option> <option value="10000000">1 Cr</option> <option value="12000000">1.2 Cr</option> <option value="14000000">1.4 Cr</option> <option value="16000000">1.6 Cr</option> <option value="18000000">1.8 Cr</option> <option value="20000000">2 Cr</option> <option value="23000000">2.3 Cr</option> <option value="26000000">2.6 Cr</option> <option value="30000000">3 Cr</option> <option value="35000000">3.5 Cr</option> <option value="40000000">4 Cr</option> <option value="45000000">4.5 Cr</option> <option value="50000000">5 Cr</option> </select> <select class="price_max form-control budget-range addCft" name="pice_max"> <option style="display: block;" selected="" value="">Max</option> <option style="display: none;" value="500000">5 Lac</option> <option style="display: none;" value="1000000">10 Lac</option> <option style="display: block;" value="2000000">20 Lac</option> <option style="display: block;" value="3000000">30 Lac</option> <option style="display: block;" value="4000000">40 Lac</option> <option style="display: block;" value="5000000">50 Lac</option> <option style="display: block;" value="6000000">60 Lac</option> <option style="display: block;" value="7000000">70 Lac</option> <option style="display: block;" value="8000000">80 Lac</option> <option style="display: block;" value="9000000">90 Lac</option> <option style="display: block;" value="10000000">1 Cr</option> <option style="display: block;" value="12000000">1.2 Cr</option> <option style="display: block;" value="14000000">1.4 Cr</option> <option style="display: block;" value="16000000">1.6 Cr</option> <option style="display: block;" value="18000000">1.8 Cr</option> <option style="display: block;" value="20000000">2 Cr</option> <option style="display: block;" value="23000000">2.3 Cr</option> <option style="display: block;" value="26000000">2.6 Cr</option> <option style="display: block;" value="30000000">3 Cr</option> <option style="display: block;" value="35000000">3.5 Cr</option> <option style="display: block;" value="40000000">4 Cr</option> <option style="display: block;" value="45000000">4.5 Cr</option> <option style="display: block;" value="50000000">5 Cr</option> <option style="display: block;" value="999999900">&gt; 5 Cr</option> </select> </div> </div> <div class="filters-wrapper"> <div class="blck-wrap"> <h5>Availability</h5> <div class="filter-chkbox-block"> {{#status}} <input type="checkbox" class="aptFilters status custom-chckbx" name="{{id}}" id="{{id}}" value="1"  /> <label for="{{id}}">{{name}}</label> {{/status}} </div> </div> </div> </div>');

    FilterMsterView.prototype.initialize = function() {
      this.unitTypes = [];
      this.unitVariants = [];
      this.variantNames = [];
      return this.status = [];
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
      variantNames: '.variant_names'
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
      'click @ui.unitVariants': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          this.unitVariants.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          this.unitVariants = _.without(this.unitVariants, parseInt($(e.currentTarget).attr('data-value')));
        }
        CommonFloor.defaults['area'] = this.unitVariants.join(',');
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
        if ($(e.currentTarget).is(':checked')) {
          this.status.push(e.currentTarget.id);
        } else {
          this.status = _.without(this.status, e.currentTarget.id);
        }
        console.log(this.status);
        CommonFloor.defaults['availability'] = this.status.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        return CommonFloor.filter();
      },
      'click @ui.apply': function(e) {}
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
      var max, min, unitVariants;
      CommonFloor.defaults['price_min'] = 0;
      CommonFloor.defaults['price_max'] = 999999900;
      unitVariants = Marionette.getOption(this, 'unitVariants');
      min = _.min(unitVariants);
      max = _.max(unitVariants);
      return $("#example_id").ionRangeSlider({
        type: "double",
        min: min,
        max: max,
        grid: false
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
      var apartmentFilters, area, plotFilters, unitTypes, unitVariantNames, unitVariants, view, villaFilters;
      unitTypes = [];
      unitVariants = [];
      unitVariantNames = [];
      area = [];
      villaFilters = this.getVillaFilters();
      $.merge(unitTypes, villaFilters[0].unitTypes);
      $.merge(unitVariants, villaFilters[0].unitVariants);
      $.merge(unitVariantNames, villaFilters[0].unitVariantNames);
      apartmentFilters = this.getApartmentFilters();
      $.merge(unitTypes, apartmentFilters[0].unitTypes);
      $.merge(unitVariants, apartmentFilters[0].unitVariants);
      $.merge(unitVariantNames, apartmentFilters[0].unitVariantNames);
      plotFilters = this.getPlotFilters();
      $.merge(unitTypes, plotFilters[0].unitTypes);
      $.merge(unitVariants, plotFilters[0].unitVariants);
      $.merge(unitVariantNames, plotFilters[0].unitVariantNames);
      console.log(unitTypes);
      console.log(unitVariants);
      this.view = view = new CommonFloor.FilterMsterView({
        'unitTypes': unitTypes,
        'unitVariants': _.uniq(unitVariants),
        'unitVariantNames': unitVariantNames
      });
      return this.show(this.view);
    };

    FilterMasterCtrl.prototype.loadController = function() {
      var apartmentFilters;
      apartmentFilters = this.getApartmentFilters();
      return this.view.triggerMethod("filter:data", apartmentFilters);
    };

    FilterMasterCtrl.prototype.getVillaFilters = function() {
      var filters, unitTypes, unitVariantNames, unitVariants, unit_types;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      bunglowVariantCollection.each(function(item) {
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
              'type': 'V'
            });
          }
          unitVariants.push(item.get('super_built_up_area'));
          return unitVariantNames.push({
            'id': item.get('id'),
            'name': item.get('unit_variant_name'),
            'type': 'V'
          });
        }
      });
      if (unitVariants.length !== 0) {
        filters.push({
          'unitTypes': unitTypes,
          'unitVariants': unitVariants,
          'unitVariantNames': unitVariantNames
        });
      }
      return filters;
    };

    FilterMasterCtrl.prototype.getApartmentFilters = function() {
      var filters, unitTypes, unitVariantNames, unitVariants, unit_types;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
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
      if (unitVariants.length !== 0) {
        filters.push({
          'unitTypes': unitTypes,
          'unitVariants': unitVariants,
          'unitVariantNames': unitVariantNames
        });
      }
      return filters;
    };

    FilterMasterCtrl.prototype.getPlotFilters = function() {
      var filters, unitTypes, unitVariantNames, unitVariants, unit_types;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
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
      if (unitVariants.length !== 0) {
        filters.push({
          'unitTypes': unitTypes,
          'unitVariants': unitVariants,
          'unitVariantNames': unitVariantNames
        });
      }
      return filters;
    };

    return FilterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-master-view/project.master.filter.controller.js.map