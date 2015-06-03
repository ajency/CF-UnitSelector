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

    FilterMsterView.prototype.template = Handlebars.compile('<a href="javascript:void(0)" class="text-primary filters-clear clear">Clear Filters </a> <button class="btn btn-primary filter-button filter-toggle" type="button"> <span class="icon"></span> </button> <div class="filters-wrapper"> <div class="filters-content"> <div class="property_type"> <h6 class="">PROPERTY TYPE</h6> <div class="filter-chkbox-block"> {{#types}} <div class="-lbl "> <input type="checkbox" class="custom-chckbx addCft types {{name}}" id="{{id}}" value="{{type}}" data-value="{{name}}"" > <label for="{{id}}" class="-lbl  ">{{type}}</label> </div> {{/types}} </div> </div> <div class="viewLabel"> <h6 class="">VIEWS</h6> <div class="filter-chkbox-block"> {{#views}} <input type="checkbox" class="custom-chckbx addCft views " id="{{id}}" value="{{id}}"  > <label for="{{id}}" class="-lbl  ">{{name}}</label> {{/views}} </div> </div> <div class="facingLabel"> <h6 class="">FACINGS</h6> <div class="filter-chkbox-block"> {{#facings}} <input type="checkbox" class="custom-chckbx addCft facings " id="{{id}}" value="{{id}}"  > <label for="{{id}}" class="-lbl  ">{{name}}</label> {{/facings}} </div> </div> <div class="areaLabel"> <h6 class="">AREA ({{measurement_units}})</h6> <div class="range-container"> <input type="text" id="area" name="area" value="" /> </div>                     </div> <div class="budgetLabel"> <h6 class="">BUDGET </h6> <div class="range-container"> <input type="text" id="budget" name="budget" value="" /> </div>                     </div> <div class=""> <h6 class="availability">AVAILABILITY</h6> <div class="filter-chkbox-block"> <input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> <label for="available" class="-lbl">Show Available Units Only</label> </div>                     </div> </div> </div> <!--<div class="filters-bottom"> <a href="#">+ More Filters</a> </div>--> </div> <div class="filters-wrapper-hover  filters-wrapper villa-wrapper"> <div class="arrow-left"> </div> <button class="btn btn-primary filter-button back_btn" type="button"> <span class="icon"></span> Back </button> {{#villas}} <div class="villa_unitTypes"> <h6 class="unit_type_filter">UNIT TYPE</h6> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} data-type="villa"> <label for="unit_type{{id}}" class="-lbl">{{name}}</label> {{/unitTypes}} </div> </div> <div class="villa_unitVariantNames"> <h6 class="unit_type_filter">UNIT VARIANTS</h6> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} data-type="villa" > <label for="varinat_name{{id}}" class="-lbl">{{name}}</label> {{/unitVariantNames}} </div> </div> {{#flooring}} <div class=""> <h6 class="unit_type_filter">{{label}}</h6> <div class="filter-chkbox-block"> {{#value}} <input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}"" data-type="villa" > <label for="{{id}}" class="-lbl">{{name}}</label> {{/value}} </div> </div> {{/flooring}} {{/villas}}</div> <div class="filters-wrapper-hover  filters-wrapper apartment-wrapper"> <div class="arrow-left"> </div> <button class="btn btn-primary filter-button back_btn" type="button"> <span class="icon"></span> Back </button> {{#apartments}} <div class="apartment_unitTypes"> <h6 class="unit_type_filter">UNIT TYPE</h6> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}}  data-type="apartment"> <label for="unit_type{{id}}" class="-lbl">{{name}}</label> {{/unitTypes}} </div> </div> <div class="apartment_unitVariantNames"> <h6 class="unit_type_filter">UNIT VARIANTS</h6> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} data-type="apartment"> <label for="varinat_name{{id}}" class="-lbl">{{name}}</label> {{/unitVariantNames}} </div> </div> {{#flooring}} <div class=""> <h6 class="unit_type_filter">{{label}}</h6> <div class="filter-chkbox-block"> {{#value}} <input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}"" data-type="apartment" > <label for="{{id}}" class="-lbl">{{name}}</label> {{/value}} </div> </div> {{/flooring}} {{/apartments}}</div> <div class="filters-wrapper-hover  filters-wrapper plot-wrapper"> <div class="arrow-left"> </div> <button class="btn btn-primary filter-button back_btn" type="button"> <span class="icon"></span> Back </button> {{#plots}} <div class="plot_unitTypes"> <h6 class="unit_type_filter">UNIT TYPE</h6> <div class="filter-chkbox-block"> {{#unitTypes}} <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} data-type="plot"> <label for="unit_type{{id}}" class="-lbl">{{name}}</label> {{/unitTypes}} </div> </div> <div class="plot_unitVariantNames"> <h6 class="unit_type_filter">UNIT VARIANTS</h6> <div class="filter-chkbox-block"> {{#unitVariantNames}} <input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} data-type="plot"> <label for="varinat_name{{id}}" class="-lbl">{{name}}</label> {{/unitVariantNames}} </div> </div> {{#flooring}} <div class=""> <h6 class="unit_type_filter">{{label}}</h6> <div class="filter-chkbox-block"> {{#value}} <input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}"" data-type="plot" > <label for="{{id}}" class="-lbl">{{name}}</label> {{/value}} </div> </div> {{/flooring}} {{/plots}}</div></div>');

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
      flooring: '.attributes',
      villa: '.villa',
      apt: '.apartment',
      plot: '.plot',
      villaWrapper: '.villa-wrapper',
      aptWrapper: '.apartment-wrapper',
      plotWrapper: '.plot-wrapper',
      villaCheck: '.villa-check',
      aptCheck: '.apartment-check',
      plotCheck: '.plot-check',
      back_btn: '.back_btn',
      back_btn: '.back_btn',
      facings: '.facings',
      views: '.views'
    };

    FilterMsterView.prototype.initialize = function() {
      var unitTypes, variantNames;
      this.price = '';
      this.area = '';
      unitTypes = [];
      return variantNames = [];
    };

    FilterMsterView.prototype.events = {
      'click @ui.clear': function(e) {
        window.unitTypes = [];
        window.unitVariants = [];
        window.variantNames = [];
        window.price = '';
        window.area = '';
        window.type = [];
        CommonFloor.defaults['type'] = "";
        $.each(CommonFloor.defaults['villa'], function(index, value) {
          return CommonFloor.defaults['villa'][index] = "";
        });
        $.each(CommonFloor.defaults['apartment'], function(index, value) {
          return CommonFloor.defaults['apartment'][index] = "";
        });
        $.each(CommonFloor.defaults['plot'], function(index, value) {
          return CommonFloor.defaults['plot'][index] = "";
        });
        $.each(CommonFloor.defaults['common'], function(index, value) {
          return CommonFloor.defaults['common'][index] = "";
        });
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        unitCollection.trigger('available');
        this.loadSelectedFilters();
        this.price = $("#budget").data("ionRangeSlider");
        this.area = $("#area").data("ionRangeSlider");
        this.price.destroy();
        this.area.destroy();
        return this.loadClearFilter();
      },
      'mouseover @ui.villaCheck,@ui.villaWrapper': function(e) {
        return $(".villa-wrapper").addClass("visible");
      },
      'mouseout @ui.villaCheck,@ui.villaWrapper': function(e) {
        return $(".villa-wrapper").removeClass("visible");
      },
      'mouseover @ui.aptCheck,@ui.aptWrapper': function(e) {
        return $(".apartment-wrapper").addClass("visible");
      },
      'mouseout @ui.aptCheck,@ui.aptWrapper': function(e) {
        return $(".apartment-wrapper").removeClass("visible");
      },
      'mouseover @ui.plotCheck,@ui.plotWrapper': function(e) {
        return $(".plot-wrapper").addClass("visible");
      },
      'mouseout @ui.plotCheck,@ui.plotWrapper': function(e) {
        return $(".plot-wrapper").removeClass("visible");
      },
      'click @ui.villa': function(e) {
        var types;
        types = [];
        if (CommonFloor.defaults['type'] !== "") {
          types = CommonFloor.defaults['type'].split(',');
        }
        if ($(e.currentTarget).is(':checked')) {
          $(e.currentTarget).parent().addClass('villa-check');
          $(e.currentTarget).parent().addClass("villa-btn");
          $('.villa-wrapper').addClass("visible");
          types.push($(e.currentTarget).attr('data-value'));
        } else {
          $(e.currentTarget).parent().removeClass('villa-check');
          $(e.currentTarget).parent().removeClass('villa-btn');
          $('.villa-wrapper').removeClass('visible');
          types = _.without(types, $(e.currentTarget).attr('data-value'));
        }
        types = _.uniq(types);
        CommonFloor.defaults['type'] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'click @ui.apt': function(e) {
        var types;
        types = [];
        if (CommonFloor.defaults['type'] !== "") {
          types = CommonFloor.defaults['type'].split(',');
        }
        if ($(e.currentTarget).is(':checked')) {
          $(e.currentTarget).parent().addClass('apartment-check');
          $(e.currentTarget).parent().addClass("apartment-btn");
          $('.apartment-wrapper').addClass("visible");
          types.push($(e.currentTarget).attr('data-value'));
        } else {
          $(e.currentTarget).parent().removeClass('apartment-check');
          $(e.currentTarget).parent().removeClass('apartment-btn');
          $('.apartment-wrapper').removeClass('visible');
          types = _.without(types, $(e.currentTarget).attr('data-value'));
        }
        types = _.uniq(types);
        CommonFloor.defaults['type'] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'click @ui.plot': function(e) {
        var types;
        types = [];
        if (CommonFloor.defaults['type'] !== "") {
          types = CommonFloor.defaults['type'].split(',');
        }
        if ($(e.currentTarget).is(':checked')) {
          $(e.currentTarget).parent().addClass('plot-check');
          $(e.currentTarget).parent().addClass("plot-btn");
          $('.plot-wrapper').addClass("visible");
          types.push($(e.currentTarget).attr('data-value'));
        } else {
          $(e.currentTarget).parent().removeClass('plot-check');
          $(e.currentTarget).parent().removeClass('plot-btn');
          $('.plot-wrapper').removeClass('visible');
          types = _.without(types, $(e.currentTarget).attr('data-value'));
        }
        types = _.uniq(types);
        CommonFloor.defaults['type'] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'click @ui.unitTypes': function(e) {
        var type, types;
        types = [];
        type = $(e.currentTarget).attr('data-type');
        if (CommonFloor.defaults[type]['unit_type_id'] !== "") {
          types = CommonFloor.defaults[type]['unit_type_id'].split(',');
          types = types.map(function(item) {
            return parseInt(item);
          });
        }
        if ($(e.currentTarget).is(':checked')) {
          types.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          types = _.without(types, parseInt($(e.currentTarget).attr('data-value')));
        }
        types = _.uniq(types);
        CommonFloor.defaults[type]['unit_type_id'] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'click @ui.variantNames': function(e) {
        var type, types;
        types = [];
        type = $(e.currentTarget).attr('data-type');
        if (CommonFloor.defaults[type]['unit_variant_id'] !== "") {
          types = CommonFloor.defaults[type]['unit_variant_id'].split(',');
          types = types.map(function(item) {
            return parseInt(item);
          });
        }
        if ($(e.currentTarget).is(':checked')) {
          types.push(parseInt($(e.currentTarget).attr('data-value')));
        } else {
          types = _.without(types, parseInt($(e.currentTarget).attr('data-value')));
        }
        types = _.uniq(types);
        CommonFloor.defaults[type]['unit_variant_id'] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'click @ui.status': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          CommonFloor.defaults['common']['availability'] = e.currentTarget.id;
        } else {
          CommonFloor.defaults['common']['availability'] = "";
        }
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'change @ui.area': function(e) {
        CommonFloor.defaults['common']['area_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['common']['area_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'change @ui.budget': function(e) {
        CommonFloor.defaults['common']['price_max'] = parseFloat($(e.target).val().split(';')[1]);
        CommonFloor.defaults['common']['price_min'] = parseFloat($(e.target).val().split(';')[0]);
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
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
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
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
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'click @ui.flooring': function(e) {
        var type, types;
        types = [];
        type = $(e.currentTarget).attr('data-type');
        if (CommonFloor.defaults[type]['attributes'] !== "") {
          types = CommonFloor.defaults[type]['attributes'].split(',');
        }
        if ($(e.currentTarget).is(':checked')) {
          types.push($(e.currentTarget).attr('data-value'));
        } else {
          types = _.without(types, $(e.currentTarget).attr('data-value'));
        }
        types = _.uniq(types);
        CommonFloor.defaults[type]['attributes'] = types.join(',');
        unitCollection.reset(unitMasterCollection.toArray());
        CommonFloor.resetCollections();
        CommonFloor.filterNew();
        return unitCollection.trigger('available');
      },
      'click .filter-toggle': function(e) {
        return $('.fliters-container').toggleClass('closed');
      },
      'click .back_btn': function(e) {
        return $('.filters-wrapper-hover').removeClass('visible');
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
      data.villas = Marionette.getOption(this, 'villas');
      data.unitVariants = Marionette.getOption(this, 'unitVariants');
      data.apartments = Marionette.getOption(this, 'apartments');
      console.log(data.plots = Marionette.getOption(this, 'plots'));
      data.types = Marionette.getOption(this, 'types');
      data.views = Marionette.getOption(this, 'views');
      data.facings = Marionette.getOption(this, 'facings');
      return data;
    };

    FilterMsterView.prototype.onShow = function() {
      var area, budget, max, min, priceMax, priceMin, subArea, subBudget, types;
      this.hideLabels();
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
      return this.loadSelectedFilters();
    };

    FilterMsterView.prototype.hideLabels = function() {
      var apartments, budget, facings, plots, unitVariants, views, villas;
      villas = Marionette.getOption(this, 'villas');
      apartments = Marionette.getOption(this, 'apartments');
      plots = Marionette.getOption(this, 'plots');
      views = Marionette.getOption(this, 'views');
      facings = Marionette.getOption(this, 'facings');
      console.log(budget = Marionette.getOption(this, 'budget'));
      console.log(unitVariants = Marionette.getOption(this, 'unitVariants'));
      $.each(villas[0], function(index, value) {
        if (value.length === 0) {
          return $('.villa_' + index).hide();
        }
      });
      $.each(apartments[0], function(index, value) {
        if (value.length === 0) {
          return $('.apartment_' + index).hide();
        }
      });
      $.each(plots[0], function(index, value) {
        if (value.length === 0) {
          return $('.plot_' + index).hide();
        }
      });
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
      var attributes, facings, id, pt_types, types, typesArray, unitTypes, unitVariants, unitVariantsArray, unitsArr, unittypesArray, unittypesColl, views;
      types = [];
      pt_types = Marionette.getOption(this, 'types');
      types = CommonFloor.defaults['type'].split(',');
      if (pt_types.length === 1) {
        types.push(pt_types[0].type);
      }
      unittypesArray = [];
      unitTypes = [];
      $.merge(unitTypes, CommonFloor.defaults['villa']['unit_type_id'].split(','));
      $.merge(unitTypes, CommonFloor.defaults['apartment']['unit_type_id'].split(','));
      $.merge(unitTypes, CommonFloor.defaults['plot']['unit_type_id'].split(','));
      unitVariantsArray = [];
      unitVariants = [];
      $.merge(unitVariants, CommonFloor.defaults['villa']['unit_variant_id'].split(','));
      $.merge(unitVariants, CommonFloor.defaults['apartment']['unit_variant_id'].split(','));
      $.merge(unitVariants, CommonFloor.defaults['plot']['unit_variant_id'].split(','));
      attributes = [];
      $.merge(attributes, CommonFloor.defaults['villa']['attributes'].split(','));
      $.merge(attributes, CommonFloor.defaults['apartment']['attributes'].split(','));
      $.merge(attributes, CommonFloor.defaults['plot']['attributes'].split(','));
      views = [];
      $.merge(views, CommonFloor.defaults['common']['views'].split(','));
      facings = [];
      $.merge(facings, CommonFloor.defaults['common']['facings'].split(','));
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
        $('#' + item.id).prop('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($(item).attr('data-value'), unitTypes) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', false);
        }
      });
      $(this.ui.variantNames).each(function(ind, item) {
        $('#' + item.id).prop('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($(item).attr('data-value'), unitVariants) === -1) {
          $('#' + item.id).prop('checked', false);
          return $('#' + item.id).attr('disabled', false);
        }
      });
      $(this.ui.types).each(function(ind, item) {
        var type;
        $('#' + item.id).prop('checked', true);
        $('#' + item.id).attr('disabled', false);
        if ($.inArray($('#' + item.id).attr('data-value'), types) === -1) {
          return $('#' + item.id).prop('checked', false);
        } else {
          type = $('#' + item.id).attr('data-value');
          $('#' + item.id).parent().addClass(type + '-check');
          return $('#' + item.id).parent().addClass(type + '-btn');
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

    return FilterMsterView;

  })(Marionette.ItemView);

  CommonFloor.FilterMasterCtrl = (function(superClass) {
    extend(FilterMasterCtrl, superClass);

    function FilterMasterCtrl() {
      return FilterMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    FilterMasterCtrl.prototype.initialize = function() {
      var apartmentFilters, budget, facings, plotFilters, types, unitVariants, view, views, villaFilters;
      unitVariants = [];
      budget = [];
      views = [];
      facings = [];
      villaFilters = this.getVillaFilters();
      if (villaFilters.length !== 0) {
        $.merge(unitVariants, villaFilters[0].unitVariants);
        $.merge(budget, villaFilters[0].budget);
      }
      apartmentFilters = this.getApartmentFilters();
      if (apartmentFilters.length !== 0) {
        $.merge(unitVariants, apartmentFilters[0].unitVariants);
        $.merge(budget, apartmentFilters[0].budget);
      }
      plotFilters = this.getPlotFilters();
      if (plotFilters.length !== 0) {
        $.merge(unitVariants, plotFilters[0].unitVariants);
        $.merge(budget, plotFilters[0].budget);
      }
      if ($.inArray('budget', project.get('filters').defaults) === -1 && !_.isUndefined(project.get('filters').defaults)) {
        budget = [];
      }
      if ($.inArray('area', project.get('filters').defaults) === -1 && !_.isUndefined(project.get('filters').defaults)) {
        unitVariants = [];
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
        model: project,
        'villas': villaFilters,
        'unitVariants': _.uniq(unitVariants),
        'apartments': apartmentFilters,
        'budget': budget,
        'types': types,
        'plots': plotFilters,
        'views': views,
        'facings': facings
      });
      return this.show(this.view);
    };

    FilterMasterCtrl.prototype.getVillaFilters = function() {
      var budget, filters, flooring, flooringAttributes, newtemp, temp, unitTypes, unitVariantNames, unitVariants, unit_types;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      flooringAttributes = [];
      budget = [];
      flooring = [];
      temp = [];
      newtemp = [];
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
          if (!_.isUndefined(project.get('filters').Villa)) {
            $.each(project.get('filters').Villa, function(index, value) {
              temp = [];
              return $.each(item.get('variant_attributes'), function(ind, val) {
                if (ind === value && $.inArray(value, flooring) === -1 && val !== "") {
                  flooring.push(value);
                  temp.push({
                    'name': val,
                    'id': s.replaceAll(val, " ", "_"),
                    'classname': 'attributes',
                    'label': ind,
                    type: 'P'
                  });
                  return newtemp.push({
                    'label': ind.toUpperCase(),
                    'value': temp,
                    'index': ind
                  });
                }
              });
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
        'flooring': newtemp,
        'budget': budget
      });
      $.each(filters[0], function(index, value) {
        if ($.inArray(index, project.get('filters').Villa) === -1 && index !== 'budget' && index !== 'unitVariants') {
          filters[0][index] = [];
        }
        if (index === 'flooring') {
          return $.each(value, function(ind, val) {
            if ($.inArray(val.index, project.get('filters').Villa) === -1) {
              return filters[0][index] = [];
            }
          });
        }
      });
      return filters;
    };

    FilterMasterCtrl.prototype.getApartmentFilters = function() {
      var budget, filters, flooring, flooringAttributes, newtemp, temp, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      budget = [];
      flooringAttributes = [];
      flooring = [];
      temp = [];
      newtemp = [];
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
          if (!_.isUndefined(project.get('filters').Apartment)) {
            return $.each(project.get('filters').Apartment, function(index, value) {
              temp = [];
              return $.each(item.get('variant_attributes'), function(ind, val) {
                if (ind === value && $.inArray(value, flooring) === -1 && val !== "") {
                  flooring.push(value);
                  temp.push({
                    'name': val,
                    'id': s.replaceAll(val, " ", "_"),
                    'classname': 'attributes',
                    'label': ind,
                    type: 'P'
                  });
                  return newtemp.push({
                    'label': ind.toUpperCase(),
                    'value': temp,
                    'index': ind
                  });
                }
              });
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
        'flooring': newtemp,
        'budget': budget
      });
      $.each(filters[0], function(index, value) {
        if ($.inArray(index, project.get('filters').Apartment) === -1 && index !== 'budget' && index !== 'unitVariants') {
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

    FilterMasterCtrl.prototype.getPlotFilters = function() {
      var budget, filters, flooring, flooringAttributes, newtemp, temp, unitTypes, unitVariantNames, unitVariants, unit_types, unitsArr;
      filters = [];
      unitTypes = [];
      unit_types = [];
      unitVariants = [];
      unitVariantNames = [];
      flooringAttributes = [];
      budget = [];
      flooring = [];
      temp = [];
      newtemp = [];
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
          if (!_.isUndefined(project.get('filters').Plot)) {
            return $.each(project.get('filters').Plot, function(index, value) {
              temp = [];
              return $.each(item.get('variant_attributes'), function(ind, val) {
                if (ind === value && $.inArray(value, flooring) === -1 && val !== "") {
                  flooring.push(value);
                  temp.push({
                    'name': val,
                    'id': s.replaceAll(val, " ", "_"),
                    'classname': 'attributes',
                    'label': ind,
                    type: 'P'
                  });
                  console.log(temp);
                  return newtemp.push({
                    'label': ind.toUpperCase(),
                    'index': ind,
                    'value': temp
                  });
                }
              });
            });
          }
        }
      });
      console.log(newtemp);
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
        'flooring': newtemp,
        'budget': budget
      });
      $.each(filters[0], function(index, value) {
        if ($.inArray(index, project.get('filters').Plot) === -1 && index !== 'budget' && index !== 'unitVariants' && index !== 'flooring') {
          filters[0][index] = [];
        }
        if (index === 'flooring') {
          return $.each(value, function(ind, val) {
            if ($.inArray(val.index, project.get('filters').Plot) === -1) {
              return filters[0][index] = [];
            }
          });
        }
      });
      return filters;
    };

    FilterMasterCtrl.prototype.getViewsFacings = function() {
      var facings, facingsArr, viewArr, views;
      views = [];
      viewArr = [];
      facingsArr = [];
      _.each(unitCollection.toArray(), function(item) {
        return $.merge(views, item.get('views'));
      });
      views = _.uniq(views);
      $.each(views, function(ind, val) {
        return viewArr.push({
          'id': val,
          'name': val
        });
      });
      facings = ['North', 'South', 'East', 'West', 'North-east', 'Norht-west', 'South-East', 'South-West'];
      $.each(facings, function(ind, val) {
        return facingsArr.push({
          'id': val,
          'name': val
        });
      });
      if ($.inArray('views', project.get('filters').defaults) === -1) {
        viewArr = [];
      }
      if ($.inArray('direction', project.get('filters').defaults) === -1) {
        facingsArr = [];
      }
      return [viewArr, facingsArr];
    };

    return FilterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-master-view/project.master.filter.controller.js.map