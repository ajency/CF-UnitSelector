(function() {
  var LeftListView, TopListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ProjectListView = (function(superClass) {
    extend(ProjectListView, superClass);

    function ProjectListView() {
      return ProjectListView.__super__.constructor.apply(this, arguments);
    }

    ProjectListView.prototype.template = '#project-listview-template';

    return ProjectListView;

  })(Marionette.LayoutView);

  CommonFloor.ProjectListCtrl = (function(superClass) {
    extend(ProjectListCtrl, superClass);

    function ProjectListCtrl() {
      return ProjectListCtrl.__super__.constructor.apply(this, arguments);
    }

    ProjectListCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      if (bunglowVariantCollection.length === 0 && apartmentVariantCollection.length === 0 && plotVariantCollection.length === 0) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.ProjectListView);
      }
    };

    return ProjectListCtrl;

  })(Marionette.RegionController);

  TopListView = (function(superClass) {
    extend(TopListView, superClass);

    function TopListView() {
      return TopListView.__super__.constructor.apply(this, arguments);
    }

    TopListView.prototype.template = Handlebars.compile('<div class="container-fluid"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12 text-center"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"> </a> </div> <div class="header-info"> <h2 class="proj-name pull-left">{{project_title}}</h2> <div class="proj-type-count"> {{#types}} <p class="pull-right">{{type}}</p><h2 class=" pull-right m-t-10">{{count.length}}</h2> {{/types}} </div> <div class="clearfix"></div> </div> </div> </div> </div> <div class="pull-left filter-result full"> <ul  id="flexiselDemo1"> {{#each  filters}} <li> <div class="filter-title"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"></span> </div> </li> {{#filters}} {{#each this}} {{#each this}} <li> <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> </li>{{/each}} {{/each}} {{/filters}} {{/each}} {{#area}} <li> <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> </li> {{/area}} {{#budget}} <li> <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> </li> {{/budget}} {{#views}} <li> <div class="filter-pill"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> </li> {{/views}} {{#facings}} <li> <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> </li> {{/facings}} {{#status}} <li> <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> </li> {{/status}} </ul> </div> <div class="clearfix"></div>');

    TopListView.prototype.ui = {
      unitBack: '.unit_back',
      unitTypes: '.unit_types',
      priceMin: '.price_min',
      priceMax: '.price_max',
      status: '#filter_available',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#filter_area',
      budget: '#filter_budget',
      types: '.types',
      filter_flooring: '.filter_flooring',
      views: '.views',
      facings: '.facings'
    };

    TopListView.prototype.serializeData = function() {
      var data, main, response, status;
      data = TopListView.__super__.serializeData.call(this);
      status = CommonFloor.getStatusFilters();
      if (status.length !== 0) {
        data.status = status;
      }
      main = CommonFloor.getFilters();
      console.log(data.filters = main[0].filters);
      data.area = main[0].area;
      data.budget = main[0].price;
      data.status = main[0].status;
      data.views = main[0].views;
      data.facings = main[0].facings;
      response = CommonFloor.propertyTypes();
      data.types = response;
      return data;
    };

    TopListView.prototype.events = function() {
      return {
        'click @ui.unitBack': function(e) {
          e.preventDefault();
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return CommonFloor.navigate('/', true);
        },
        'click @ui.types': function(e) {
          var arr, index;
          arr = CommonFloor.defaults['type'].split(',');
          index = arr.indexOf($(e.target).attr('data-id'));
          arr.splice(index, 1);
          CommonFloor.defaults['type'] = arr.join(',');
          if ($(e.target).attr('data-id') === 'villa') {
            this.removeVillaFilters();
          }
          if ($(e.target).attr('data-id') === 'apartment') {
            this.removeAptFilters();
          }
          if ($(e.target).attr('data-id') === 'plot') {
            this.removePlotFilters();
          }
          this.trigger('render:view');
          unitCollection.reset(unitMasterCollection.toArray());
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
          console.log(types);
          types = _.without(types, parseInt($(e.currentTarget).attr('data-id')));
          console.log(types);
          CommonFloor.defaults[type]['unit_type_id'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
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
          console.log(types);
          types = _.without(types, parseInt($(e.currentTarget).attr('data-id')));
          CommonFloor.defaults[type]['unit_variant_id'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.status': function(e) {
          CommonFloor.defaults['common']['availability'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.area': function(e) {
          CommonFloor.defaults['common']['area_max'] = "";
          CommonFloor.defaults['common']['area_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.budget': function(e) {
          CommonFloor.defaults['common']['price_max'] = "";
          CommonFloor.defaults['common']['price_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.filter_flooring': function(e) {
          var type, types;
          types = [];
          type = $(e.currentTarget).attr('data-type');
          if (CommonFloor.defaults[type]['attributes'] !== "") {
            types = CommonFloor.defaults[type]['attributes'].split(',');
          }
          console.log(types);
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults[type]['attributes'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.facings': function(e) {
          var types;
          types = CommonFloor.defaults['common']['facings'].split(',');
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['common']['facings'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.views': function(e) {
          var types;
          types = CommonFloor.defaults['common']['views'].split(',');
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['common']['views'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        }
      };
    };

    TopListView.prototype.onShow = function() {
      var response;
      $("#flexiselDemo1").flexisel({
        visibleItems: 11,
        animationSpeed: 200,
        autoPlay: false,
        autoPlaySpeed: 1000,
        clone: false,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
          portrait: {
            changePoint: 480,
            visibleItems: 5
          },
          landscape: {
            changePoint: 640,
            visibleItems: 6
          },
          tablet: {
            changePoint: 768,
            visibleItems: 3
          }
        }
      });
      response = CommonFloor.propertyTypes();
      if (response.length === 0) {
        return $('.proj-type-count').html('<p class="p-l-15">No results found</p>');
      }
    };

    TopListView.prototype.removeVillaFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = bunglowVariantCollection.getBunglowMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',');
    };

    TopListView.prototype.removeAptFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = apartmentVariantCollection.getApartmentMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',');
    };

    TopListView.prototype.removePlotFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = plotVariantCollection.getPlotMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',');
    };

    return TopListView;

  })(Marionette.ItemView);

  CommonFloor.TopListCtrl = (function(superClass) {
    extend(TopListCtrl, superClass);

    function TopListCtrl() {
      return TopListCtrl.__super__.constructor.apply(this, arguments);
    }

    TopListCtrl.prototype.initialize = function() {
      this.renderTopListView();
      return unitCollection.bind("available", this.renderTopListView, this);
    };

    TopListCtrl.prototype.renderTopListView = function() {
      this.view = new TopListView({
        model: project
      });
      this.listenTo(this.view, "render:view", this.loadController);
      return this.show(this.view);
    };

    TopListCtrl.prototype.loadController = function() {
      window.unitTypes = [];
      window.unitVariants = [];
      window.variantNames = [];
      window.price = '';
      window.area = '';
      window.type = [];
      this.region = new Marionette.Region({
        el: '#filterregion'
      });
      return new CommonFloor.FilterMasterCtrl({
        region: this.region
      });
    };

    return TopListCtrl;

  })(Marionette.RegionController);

  LeftListView = (function(superClass) {
    extend(LeftListView, superClass);

    function LeftListView() {
      return LeftListView.__super__.constructor.apply(this, arguments);
    }

    LeftListView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>');

    LeftListView.prototype.onShow = function() {
      return $('.filters').hide();
    };

    return LeftListView;

  })(Marionette.ItemView);

  CommonFloor.LeftListCtrl = (function(superClass) {
    extend(LeftListCtrl, superClass);

    function LeftListCtrl() {
      return LeftListCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftListCtrl.prototype.initialize = function() {
      return this.show(new LeftListView);
    };

    return LeftListCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterListCtrl = (function(superClass) {
    extend(CenterListCtrl, superClass);

    function CenterListCtrl() {
      return CenterListCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterListCtrl.prototype.initialize = function() {
      this.renderCenterListView();
      return unitCollection.bind("available", this.renderCenterListView, this);
    };

    CenterListCtrl.prototype.renderCenterListView = function() {
      var data, region, response, units;
      response = CommonFloor.checkListView();
      if (response.count.length === 0) {
        region = new Marionette.Region({
          el: '#centerregion'
        });
        new CommonFloor.NoUnitsCtrl({
          region: region
        });
        return;
      }
      if (response.type === 'bunglows') {
        units = bunglowVariantCollection.getBunglowUnits();
        data = {};
        data.units = units;
        data.type = 'villa';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        new CommonFloor.VillaListCtrl({
          region: this.region
        });
      }
      if (response.type === 'building') {
        units = buildingCollection;
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        new CommonFloor.BuildingListCtrl({
          region: this.region
        });
      }
      if (response.type === 'plot') {
        units = plotVariantCollection.getPlotUnits();
        data = {};
        data.units = units;
        data.type = 'plot';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        return new CommonFloor.PlotListCtrl({
          region: this.region
        });
      }
    };

    return CenterListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-list-view/project.list.controller.js.map