(function() {
  var LeftListView, TopListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ProjectListView = (function(superClass) {
    extend(ProjectListView, superClass);

    function ProjectListView() {
      return ProjectListView.__super__.constructor.apply(this, arguments);
    }

    ProjectListView.prototype.template = '#project-template';

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

    TopListView.prototype.template = Handlebars.compile('<div class="container-fluid"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12 text-center"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"> Back to Project Overview </a> </div> <h2 class="proj-name">{{project_title}}</h2> </div> </div> </div> <div class="filter-summary-area"> <button class="btn btn-primary cf-btn-white pull-right m-t-15" type="button" data-toggle="collapse" data-target="#collapsefilters"> Filters <span class="icon-funnel"></span> </button> <div class="pull-left filter-result"> {{#each  filters}} {{#each this}} <div class="filter-pill"  > {{this.name}}{{this.type}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span> </div> {{/each}}{{/each }} </div> <div class="proj-type-count"> {{#types}} <p class="pull-right">{{type}}</p><h1 class="text-primary pull-right m-t-10">{{count.length}}</h1> {{/types}} </div> <div class="clearfix"></div> </div>');

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
      types: '.types'
    };

    TopListView.prototype.serializeData = function() {
      var data, response, status;
      data = TopListView.__super__.serializeData.call(this);
      status = CommonFloor.getStatusFilters();
      if (status.length !== 0) {
        data.status = status;
      }
      data.filters = CommonFloor.getFilters()[0];
      data.results = CommonFloor.getFilters()[1];
      response = CommonFloor.propertyTypes();
      data.types = response;
      return data;
    };

    TopListView.prototype.events = function() {
      return {
        'click @ui.unitBack': function(e) {
          e.preventDefault();
          return CommonFloor.navigate('/', true);
        },
        'click @ui.types': function(e) {
          var arr, index;
          arr = CommonFloor.defaults['type'].split(',');
          index = arr.indexOf($(e.target).attr('data-id'));
          arr.splice(index, 1);
          CommonFloor.defaults['type'] = arr.join(',');
          if ($(e.target).attr('data-id') === 'Villas') {
            this.removeVillaFilters();
          }
          if ($(e.target).attr('data-id') === 'Apartments/Penthouse') {
            this.removeAptFilters();
          }
          if ($(e.target).attr('data-id') === 'Plots') {
            this.removePlotFilters();
          }
          this.trigger('render:view');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          return unitCollection.trigger('available');
        },
        'click @ui.unitTypes': function(e) {
          var unitTypes;
          unitTypes = CommonFloor.defaults['unitTypes'].split(',');
          unitTypes = _.without(unitTypes, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.variantNames': function(e) {
          var variantNames;
          variantNames = CommonFloor.defaults['unitVariants'].split(',');
          variantNames = _.without(variantNames, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['unitVariants'] = variantNames.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.status': function(e) {
          CommonFloor.defaults['availability'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.area': function(e) {
          CommonFloor.defaults['area_max'] = "";
          CommonFloor.defaults['area_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.budget': function(e) {
          CommonFloor.defaults['price_max'] = "";
          CommonFloor.defaults['price_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        }
      };
    };

    TopListView.prototype.onShow = function() {
      var response;
      response = CommonFloor.propertyTypes();
      if (response.length === 0) {
        return $('.proj-type-count').text('No results found');
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
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['unitVariants'] = unitVariants.join(',');
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
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['unitVariants'] = unitVariants.join(',');
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
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['unitVariants'] = unitVariants.join(',');
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