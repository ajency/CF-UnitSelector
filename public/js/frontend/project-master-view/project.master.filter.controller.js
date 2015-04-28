(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.FilterMsterView = (function(superClass) {
    extend(FilterMsterView, superClass);

    function FilterMsterView() {
      return FilterMsterView.__super__.constructor.apply(this, arguments);
    }

    FilterMsterView.prototype.template = Handlebars.compile('{{#villaFilters}} <div class="filters-wrapper"> <div class="filter-chkbox-block"> <input type="checkbox" name="villa" class="custom-chckbx"  checked  /> <label for="villa">Villa</label> </div> Unit Types {{#unitTypes}} <div class="filter-chkbox-block"> <input type="checkbox" class="villaFilters unit_types custom-chckbx" name="{{id}}" id="{{id}}" value="1" checked /> <label for="{{id}}">{{name}}</label> </div> {{/unitTypes}} <br/> Unit Variants <br/> {{#unitVariants}} <div class="filter-chkbox-block"> <input type="checkbox" class="villaFilters unitvariants custom-chckbx" name="{{id}}" id="{{id}}" value="1" checked /> <label for="{{id}}">{{area}} Sq.Ft</label> </div> {{/unitVariants}} <br/> Budget <br/> <select class="price_min" name="price_min"> <option selected="" value="">Min</option> <option value="500000">5 Lac</option> <option value="1000000">10 Lac</option> <option value="2000000">20 Lac</option> <option value="3000000">30 Lac</option> <option value="4000000">40 Lac</option> <option value="5000000">50 Lac</option> <option value="6000000">60 Lac</option> <option value="7000000">70 Lac</option> <option value="8000000">80 Lac</option> <option value="9000000">90 Lac</option> <option value="10000000">1 Cr</option> <option value="12000000">1.2 Cr</option> <option value="14000000">1.4 Cr</option> <option value="16000000">1.6 Cr</option> <option value="18000000">1.8 Cr</option> <option value="20000000">2 Cr</option> <option value="23000000">2.3 Cr</option> <option value="26000000">2.6 Cr</option> <option value="30000000">3 Cr</option> <option value="35000000">3.5 Cr</option> <option value="40000000">4 Cr</option> <option value="45000000">4.5 Cr</option> <option value="50000000">5 Cr</option> </select> <select class="price_max" name="pice_max"> <option style="display: block;" selected="" value="">Max</option> <option style="display: none;" value="500000">5 Lac</option> <option style="display: none;" value="1000000">10 Lac</option> <option style="display: block;" value="2000000">20 Lac</option> <option style="display: block;" value="3000000">30 Lac</option> <option style="display: block;" value="4000000">40 Lac</option> <option style="display: block;" value="5000000">50 Lac</option> <option style="display: block;" value="6000000">60 Lac</option> <option style="display: block;" value="7000000">70 Lac</option> <option style="display: block;" value="8000000">80 Lac</option> <option style="display: block;" value="9000000">90 Lac</option> <option style="display: block;" value="10000000">1 Cr</option> <option style="display: block;" value="12000000">1.2 Cr</option> <option style="display: block;" value="14000000">1.4 Cr</option> <option style="display: block;" value="16000000">1.6 Cr</option> <option style="display: block;" value="18000000">1.8 Cr</option> <option style="display: block;" value="20000000">2 Cr</option> <option style="display: block;" value="23000000">2.3 Cr</option> <option style="display: block;" value="26000000">2.6 Cr</option> <option style="display: block;" value="30000000">3 Cr</option> <option style="display: block;" value="35000000">3.5 Cr</option> <option style="display: block;" value="40000000">4 Cr</option> <option style="display: block;" value="45000000">4.5 Cr</option> <option style="display: block;" value="50000000">5 Cr</option> <option style="display: block;" value="999999900">&gt; 5 Cr</option></select> <!--{{#price}} # 	<input type="checkbox" class="villaFilters price" name="{{name}}" id="{{name}}" value="1" checked />{{name}} # {{/price}}--> <br/> Availability <br/> {{#status}} <div class="filter-chkbox-block"> <input type="checkbox" class="villaFilters status custom-chckbx" name="{{name}}" id="{{name}}" value="1" checked /> <label for="{{name}}">{{name}}</label> </div> {{/status}} </div> {{/villaFilters}} <br/> {{#apartmentFilters}} <input type="checkbox" name="apartment" value="1" checked />Apartments <br/>Unit Types {{#unitTypes}} <input type="checkbox" class="aptFilters unit_types" name="{{id}}" id="{{id}}" value="1" checked />{{name}} {{/unitTypes}} <br/> Unit Variants <br/> {{#unitVariants}} <input type="checkbox" class="aptFilters unitvariants" name="{{id}}" id="{{id}}" value="1" checked />{{area}} Sq.Ft {{/unitVariants}} <br/> Budget <br/> <select class="price_min" name="price_min"> <option selected="" value="">Min</option> <option value="500000">5 Lac</option> <option value="1000000">10 Lac</option> <option value="2000000">20 Lac</option> <option value="3000000">30 Lac</option> <option value="4000000">40 Lac</option> <option value="5000000">50 Lac</option> <option value="6000000">60 Lac</option> <option value="7000000">70 Lac</option> <option value="8000000">80 Lac</option> <option value="9000000">90 Lac</option> <option value="10000000">1 Cr</option> <option value="12000000">1.2 Cr</option> <option value="14000000">1.4 Cr</option> <option value="16000000">1.6 Cr</option> <option value="18000000">1.8 Cr</option> <option value="20000000">2 Cr</option> <option value="23000000">2.3 Cr</option> <option value="26000000">2.6 Cr</option> <option value="30000000">3 Cr</option> <option value="35000000">3.5 Cr</option> <option value="40000000">4 Cr</option> <option value="45000000">4.5 Cr</option> <option value="50000000">5 Cr</option> </select> <select class="price_max" name="pice_max"> <option style="display: block;" selected="" value="">Max</option> <option style="display: none;" value="500000">5 Lac</option> <option style="display: none;" value="1000000">10 Lac</option> <option style="display: block;" value="2000000">20 Lac</option> <option style="display: block;" value="3000000">30 Lac</option> <option style="display: block;" value="4000000">40 Lac</option> <option style="display: block;" value="5000000">50 Lac</option> <option style="display: block;" value="6000000">60 Lac</option> <option style="display: block;" value="7000000">70 Lac</option> <option style="display: block;" value="8000000">80 Lac</option> <option style="display: block;" value="9000000">90 Lac</option> <option style="display: block;" value="10000000">1 Cr</option> <option style="display: block;" value="12000000">1.2 Cr</option> <option style="display: block;" value="14000000">1.4 Cr</option> <option style="display: block;" value="16000000">1.6 Cr</option> <option style="display: block;" value="18000000">1.8 Cr</option> <option style="display: block;" value="20000000">2 Cr</option> <option style="display: block;" value="23000000">2.3 Cr</option> <option style="display: block;" value="26000000">2.6 Cr</option> <option style="display: block;" value="30000000">3 Cr</option> <option style="display: block;" value="35000000">3.5 Cr</option> <option style="display: block;" value="40000000">4 Cr</option> <option style="display: block;" value="45000000">4.5 Cr</option> <option style="display: block;" value="50000000">5 Cr</option> <option style="display: block;" value="999999900">&gt; 5 Cr</option></select> <!--{{#price}} # 	<input type="checkbox" class="villaFilters price" name="{{name}}" id="{{name}}" value="1" checked />{{name}} # {{/price}}--> <br/> Availability <br/> {{#status}} <input type="checkbox" class="aptFilters status" name="{{name}}" id="{{name}}" value="1" checked />{{name}} {{/status}} {{/apartmentFilters}} <input type="button" name="apply" class="apply" value="Apply" />');

    FilterMsterView.prototype.initialize = function() {
      this.unitTypes = [];
      this.unitVariants = [];
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
      apply: '.apply'
    };

    FilterMsterView.prototype.events = {
      'click @ui.villaPropType': function(e) {
        if ($(e.target).is(':checked')) {
          $(this.ui.villaFilters).prop('checked', true);
          return $(this.ui.villaFilters).prop('disabled', false);
        } else {
          $(this.ui.villaFilters).prop('checked', false);
          return $(this.ui.villaFilters).prop('disabled', true);
        }
      },
      'click @ui.apartmentPropType': function(e) {
        if ($(e.target).is(':checked')) {
          $(this.ui.aptFilters).prop('checked', true);
          return $(this.ui.aptFilters).prop('disabled', false);
        } else {
          $(this.ui.aptFilters).prop('checked', false);
          return $(this.ui.aptFilters).prop('disabled', true);
        }
      },
      'click @ui.unitTypes': function(e) {
        if ($(e.target).is(':checked')) {
          this.unitTypes.push(parseInt(e.target.id));
        } else {
          this.unitTypes = _.without(this.unitTypes, parseInt(e.target.id));
        }
        console.log(this.unitTypes);
        CommonFloor.defaults['unitTypes'] = this.unitTypes.join(',');
        CommonFloor.filter();
        return this.resetFilters();
      },
      'click @ui.unitVariants': function(e) {
        if ($(e.target).is(':checked')) {
          this.unitVariants.push(parseInt(e.target.id));
        } else {
          this.unitVariants = _.without(this.unitVariants, parseInt(e.target.id));
        }
        CommonFloor.defaults['unitVariants'] = this.unitVariants.join(',');
        CommonFloor.filter();
        return this.resetFilters();
      },
      'change @ui.priceMin': function(e) {
        if ($(e.target).val() !== "") {
          CommonFloor.defaults['price_min'] = $(e.target).val();
        } else {
          CommonFloor.defaults['price_min'] = 0;
        }
        CommonFloor.filter();
        return this.resetFilters();
      },
      'change @ui.priceMax': function(e) {
        if ($(e.target).val() !== "") {
          CommonFloor.defaults['price_max'] = $(e.target).val();
        } else {
          CommonFloor.defaults['price_max'] = 999999900;
        }
        CommonFloor.filter();
        return this.resetFilters();
      },
      'click @ui.status': function(e) {
        if ($(e.target).is(':checked')) {
          this.status.push(e.target.id);
        } else {
          this.status = _.without(this.status, e.target.id);
        }
        console.log(this.status);
        CommonFloor.defaults['availability'] = this.status.join(',');
        CommonFloor.filter();
        return this.resetFilters();
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
        if ($.inArray(parseInt(item.id), apartments) === -1) {
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
      data.villaFilters = Marionette.getOption(this, 'villaFilters');
      data.apartmentFilters = Marionette.getOption(this, 'apartmentFilters');
      return data;
    };

    FilterMsterView.prototype.onShow = function() {
      var apartmentFilters, villaFilters;
      CommonFloor.defaults['price_min'] = 0;
      CommonFloor.defaults['price_max'] = 999999900;
      villaFilters = Marionette.getOption(this, 'villaFilters');
      apartmentFilters = Marionette.getOption(this, 'apartmentFilters');
      if (villaFilters.length !== 0) {
        this.assignVillaValues(villaFilters);
      }
      if (apartmentFilters.length !== 0) {
        return this.assignAptValues(apartmentFilters);
      }
    };

    FilterMsterView.prototype.assignVillaValues = function(villaFilters) {
      $.merge(this.unitTypes, _.pluck(villaFilters[0].unitTypes, 'id'));
      CommonFloor.defaults['unitTypes'] = this.unitTypes.join(',');
      $.merge(this.unitVariants, _.pluck(villaFilters[0].unitVariants, 'id'));
      CommonFloor.defaults['unitVariants'] = this.unitVariants.join(',');
      $.merge(this.status, _.pluck(villaFilters[0].status, 'name'));
      return CommonFloor.defaults['availability'] = this.status.join(',');
    };

    FilterMsterView.prototype.assignAptValues = function(apartmentFilters) {
      $.merge(this.unitTypes, _.pluck(apartmentFilters[0].unitTypes, 'id'));
      CommonFloor.defaults['unitTypes'] = this.unitTypes.join(',');
      $.merge(this.unitVariants, _.pluck(apartmentFilters[0].unitVariants, 'id'));
      CommonFloor.defaults['unitVariants'] = this.unitVariants.join(',');
      $.merge(this.status, _.pluck(apartmentFilters[0].status, 'name'));
      return CommonFloor.defaults['availability'] = this.status.join(',');
    };

    return FilterMsterView;

  })(Marionette.ItemView);

  CommonFloor.FilterMasterCtrl = (function(superClass) {
    extend(FilterMasterCtrl, superClass);

    function FilterMasterCtrl() {
      return FilterMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    FilterMasterCtrl.prototype.initialize = function() {
      var apartmentFilters, view, villaFilters;
      villaFilters = this.getVillaFilters();
      apartmentFilters = this.getApartmentFilters();
      this.view = view = new CommonFloor.FilterMsterView({
        'villaFilters': villaFilters,
        'apartmentFilters': apartmentFilters
      });
      return this.show(this.view);
    };

    FilterMasterCtrl.prototype.loadController = function() {
      var apartmentFilters;
      console.log(apartmentFilters = this.getApartmentFilters());
      return this.view.triggerMethod("filter:data", apartmentFilters);
    };

    FilterMasterCtrl.prototype.getVillaFilters = function() {
      var filters, status, status_arr, unitTypes, unitVariants, unit_types, villaUnits;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      status = [];
      bunglowVariantCollection.each(function(item) {
        var unitTypeModel;
        unitTypeModel = unitTypeCollection.findWhere({
          'id': item.get('unit_type_id')
        });
        if ($.inArray(item.get('unit_type_id', unit_types)) === -1) {
          unit_types.push(unitTypeModel.get('id'));
          unitTypes.push({
            'id': unitTypeModel.get('id'),
            'name': unitTypeModel.get('name')
          });
        }
        return unitVariants.push({
          'id': item.get('id'),
          'area': item.get('super_built_up_area')
        });
      });
      status = [];
      status_arr = [];
      villaUnits = bunglowVariantCollection.getBunglowUnits();
      $.each(villaUnits, function(index, value) {
        if (($.inArray(value.get('availability'), status_arr)) === -1) {
          status_arr.push(value.get('availability'));
          return status.push({
            'name': value.get('availability')
          });
        }
      });
      if (unitVariants.length !== 0) {
        filters.push({
          'unitTypes': unitTypes,
          'unitVariants': unitVariants,
          'status': status
        });
      }
      return filters;
    };

    FilterMasterCtrl.prototype.getApartmentFilters = function() {
      var apartmentUnits, filters, status, status_arr, unitTypes, unitVariants, unit_types;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      status = [];
      apartmentVariantCollection.each(function(item) {
        var unitTypeModel;
        unitTypeModel = unitTypeCollection.findWhere({
          'id': item.get('unit_type_id')
        });
        if ($.inArray(item.get('unit_type_id', unit_types)) === -1) {
          unit_types.push(unitTypeModel.get('id'));
          unitTypes.push({
            'id': unitTypeModel.get('id'),
            'name': unitTypeModel.get('name')
          });
        }
        return unitVariants.push({
          'id': item.get('id'),
          'area': item.get('super_built_up_area')
        });
      });
      status = [];
      status_arr = [];
      apartmentUnits = apartmentVariantCollection.getApartmentUnits();
      $.each(apartmentUnits, function(index, value) {
        if (($.inArray(value.get('availability'), status_arr)) === -1) {
          status_arr.push(value.get('availability'));
          return status.push({
            'name': value.get('availability')
          });
        }
      });
      if (unitVariants.length !== 0) {
        filters.push({
          'unitTypes': unitTypes,
          'unitVariants': unitVariants,
          'status': status
        });
      }
      return filters;
    };

    return FilterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-master-view/project.master.filter.controller.js.map