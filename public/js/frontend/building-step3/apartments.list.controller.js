(function() {
  var ApartmentsView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ApartmentsListView = (function(superClass) {
    extend(ApartmentsListView, superClass);

    function ApartmentsListView() {
      return ApartmentsListView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsListView.prototype.template = '#apartment-list-template';

    ApartmentsListView.prototype.onShow = function() {
      return $('#leftregion').hide();
    };

    return ApartmentsListView;

  })(Marionette.LayoutView);

  CommonFloor.ApartmentsListCtrl = (function(superClass) {
    extend(ApartmentsListCtrl, superClass);

    function ApartmentsListCtrl() {
      return ApartmentsListCtrl.__super__.constructor.apply(this, arguments);
    }

    ApartmentsListCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      if (apartmentVariantMasterCollection.length === 0) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.ApartmentsListView);
      }
    };

    return ApartmentsListCtrl;

  })(Marionette.RegionController);

  CommonFloor.TopApartmentView = (function(superClass) {
    extend(TopApartmentView, superClass);

    function TopApartmentView() {
      return TopApartmentView.__super__.constructor.apply(this, arguments);
    }

    TopApartmentView.prototype.template = Handlebars.compile('<div class="container-fluid animated fadeIn"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"></a> </div> <div class="header-info"> <h2 class="pull-left proj-name">{{project_title}} - {{name}}</h2> <div class="proj-type-count"> <h2 class="pull-left">{{results}}</h2><p class="pull-left">Apartment(s)/Penthouse(s)</p> </div> <div class="pull-left filter-result full"> {{#filters}} {{#each this}} {{#each this}} <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/each}} {{/each}} {{/filters}} {{#area}} <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/area}} {{#budget}} <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/budget}} {{#views}} <div class="filter-pill"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> {{/views}} {{#facings}} <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> {{/facings}} {{#floor}} <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross floor" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/floor}} {{#status}} <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/status}} </div> </div> </div> </div> </div>');

    TopApartmentView.prototype.ui = {
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
      floor: '.floor',
      filter_flooring: '.filter_flooring',
      views: '.views',
      facings: '.facings'
    };

    TopApartmentView.prototype.initialize = function() {
      var building_id, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      return this.building_id = building_id;
    };

    TopApartmentView.prototype.serializeData = function() {
      var data, main, mainFilters, model, newTemp, results, temp, units;
      data = TopApartmentView.__super__.serializeData.call(this);
      units = Marionette.getOption(this, 'units');
      data.units = units.length;
      data.project_title = project.get('project_title');
      main = CommonFloor.getStepFilters();
      mainFilters = main[0].filters[0];
      data.filters = [];
      if (!_.isUndefined(mainFilters)) {
        data.filters = main[0].filters[0].filters;
      }
      data.area = main[0].area;
      data.budget = main[0].price;
      data.status = main[0].status;
      data.floor = main[0].floor;
      data.views = main[0].views;
      data.facings = main[0].facings;
      results = apartmentVariantCollection.getApartmentUnits();
      temp = new Backbone.Collection(results);
      newTemp = temp.where({
        'building_id': parseInt(this.building_id)
      });
      data.results = newTemp.length;
      model = buildingMasterCollection.findWhere({
        'id': this.building_id
      });
      data.name = model.get('building_name');
      return data;
    };

    TopApartmentView.prototype.events = function() {
      return {
        'click @ui.types': function(e) {
          var arr, index;
          arr = CommonFloor.defaults['type'].split(',');
          index = arr.indexOf($(e.target).attr('data-id'));
          arr.splice(index, 1);
          CommonFloor.defaults['type'] = arr.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.unitBack': function(e) {
          var previousRoute;
          e.preventDefault();
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          previousRoute = CommonFloor.router.previous();
          return CommonFloor.navigate('#/master-view', true);
        },
        'click @ui.unitTypes': function(e) {
          var unitTypes;
          unitTypes = CommonFloor.defaults['apartment']['unit_type_id'].split(',');
          unitTypes = _.without(unitTypes, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['apartment']['unit_type_id'] = unitTypes.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.variantNames': function(e) {
          var variantNames;
          variantNames = CommonFloor.defaults['apartment']['unit_variant_id'].split(',');
          variantNames = _.without(variantNames, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['apartment']['unit_variant_id'] = variantNames.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.status': function(e) {
          CommonFloor.defaults['common']['availability'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.area': function(e) {
          CommonFloor.defaults['common']['area_max'] = "";
          CommonFloor.defaults['common']['area_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.budget': function(e) {
          CommonFloor.defaults['common']['price_max'] = "";
          CommonFloor.defaults['common']['price_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.floor': function(e) {
          CommonFloor.defaults['common']['floor_max'] = "";
          CommonFloor.defaults['common']['floor_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.floor': function(e) {
          CommonFloor.defaults['common']['floor_max'] = "";
          CommonFloor.defaults['common']['floor_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.facings': function(e) {
          var types;
          types = CommonFloor.defaults['common']['facings'].split(',');
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['common']['facings'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.views': function(e) {
          var types;
          types = CommonFloor.defaults['common']['views'].split(',');
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['common']['views'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.filter_flooring': function(e) {
          var flooring;
          flooring = CommonFloor.defaultsfilterNew['flooring'].split(',');
          flooring = _.without(flooring, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaultsfilterNew['flooring'] = flooring.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        }
      };
    };

    TopApartmentView.prototype.onShow = function() {
      var results;
      results = CommonFloor.getFilters();
      if (results.length === 0) {
        return $('.proj-type-count').text('No results found');
      }
    };

    return TopApartmentView;

  })(Marionette.ItemView);

  CommonFloor.TopApartmentCtrl = (function(superClass) {
    extend(TopApartmentCtrl, superClass);

    function TopApartmentCtrl() {
      return TopApartmentCtrl.__super__.constructor.apply(this, arguments);
    }

    TopApartmentCtrl.prototype.initialize = function() {
      this.renderTopView();
      return unitTempCollection.bind("filter_available", this.renderTopView, this);
    };

    TopApartmentCtrl.prototype.renderTopView = function() {
      var buildingModel, building_id, response, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      response = window.building.getBuildingUnits(building_id);
      buildingModel = buildingMasterCollection.findWhere({
        id: building_id
      });
      this.view = new CommonFloor.TopApartmentView({
        model: buildingModel,
        units: response
      });
      this.listenTo(this.view, "render:view", this.loadController);
      return this.show(this.view);
    };

    TopApartmentCtrl.prototype.loadController = function() {
      window.unitTypes = [];
      window.unitVariants = [];
      window.variantNames = [];
      window.price = '';
      window.area = '';
      window.type = [];
      this.region = new Marionette.Region({
        el: '#filterregion'
      });
      return new CommonFloor.FilterApartmentCtrl({
        region: this.region
      });
    };

    return TopApartmentCtrl;

  })(Marionette.RegionController);

  CommonFloor.LeftApartmentView = (function(superClass) {
    extend(LeftApartmentView, superClass);

    function LeftApartmentView() {
      return LeftApartmentView.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content leftview"></div>');

    LeftApartmentView.prototype.onShow = function() {
      return $('#leftregion').hide();
    };

    return LeftApartmentView;

  })(Marionette.ItemView);

  CommonFloor.LeftApartmentCtrl = (function(superClass) {
    extend(LeftApartmentCtrl, superClass);

    function LeftApartmentCtrl() {
      return LeftApartmentCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.LeftApartmentView);
    };

    return LeftApartmentCtrl;

  })(Marionette.RegionController);

  ApartmentsView = (function(superClass) {
    extend(ApartmentsView, superClass);

    function ApartmentsView() {
      return ApartmentsView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsView.prototype.template = Handlebars.compile('<li class="unit blocks {{status}}"> <div class="bldg-img"></div> <div class="{{type}} pull-left icon"></div> <div class="pull-left bldg-info"> <div class="info"> <label>{{unit_name}} (Floor - {{floor}} )</label> </div> ({{unit_type}} {{super_built_up_area}} {{measurement_units}})<br> <div class="text-primary m-t-5"><span class="icon-rupee-icn"></span>{{price}}</div> </div> <div class="clearfix"></div> </li>');

    ApartmentsView.prototype.serializeData = function() {
      var availability, data, property, response, unitType;
      data = ApartmentsView.__super__.serializeData.call(this);
      response = window.unit.getUnitDetails(this.model.get('id'));
      data.unit_type = response[1].get('name');
      data.super_built_up_area = response[0].get('super_built_up_area');
      availability = this.model.get('availability');
      data.status = s.decapitalize(availability);
      this.model.set('status', status);
      data.price = window.numDifferentiation(response[3]);
      unitType = unitTypeMasterCollection.findWhere({
        'id': this.model.get('unit_type_id')
      });
      property = window.propertyTypes[unitType.get('property_type_id')];
      data.property = s.capitalize(property);
      data.floor = this.model.get('floor');
      data.measurement_units = project.get('measurement_units');
      data.type = response[2];
      return data;
    };

    ApartmentsView.prototype.events = {
      'click .unit': function(e) {
        if (this.model.get('availability') === 'available') {
          return CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
        }
      }
    };

    return ApartmentsView;

  })(Marionette.ItemView);

  CommonFloor.CenterApartmentView = (function(superClass) {
    extend(CenterApartmentView, superClass);

    function CenterApartmentView() {
      return CenterApartmentView.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentView.prototype.template = '<div> <div class="col-md-12 us-right-content"> <div class="list-view-container"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#" class="map ">Map</a><a href="#" class="list active">List</a> </div> </div>--> <div class="legend clearfix"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <h2 class="text-center">List of Apartments/Penthouse <span class="pull-right top-legend">     <ul> <li class="na">N/A</li> </ul></span></h2><hr> <div class="villa-list"> <ul class="units eight"> </ul> </div> </div> </div> </div>';

    CenterApartmentView.prototype.childView = ApartmentsView;

    CenterApartmentView.prototype.childViewContainer = '.units';

    CenterApartmentView.prototype.events = {
      'click .map': function(e) {
        var building_id, url;
        e.preventDefault();
        url = Backbone.history.fragment;
        building_id = parseInt(url.split('/')[1]);
        return CommonFloor.navigate('/building/' + building_id + '/master-view', true);
      },
      'click .list': function(e) {
        var building_id, url;
        e.preventDefault();
        url = Backbone.history.fragment;
        building_id = parseInt(url.split('/')[1]);
        return CommonFloor.navigate('/building/' + building_id + '/apartments', true);
      }
    };

    return CenterApartmentView;

  })(Marionette.CompositeView);

  CommonFloor.CenterApartmentCtrl = (function(superClass) {
    extend(CenterApartmentCtrl, superClass);

    function CenterApartmentCtrl() {
      return CenterApartmentCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentCtrl.prototype.initialize = function() {
      this.renderListView();
      return unitTempCollection.bind("filter_available", this.renderListView, this);
    };

    CenterApartmentCtrl.prototype.renderListView = function() {
      var building_id, region, response, unitsCollection, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      response = window.building.getBuildingUnits(building_id);
      if (response.length === 0 && url.split('/')[2] === 'apartments') {
        region = new Marionette.Region({
          el: '#centerregion'
        });
        new CommonFloor.NoUnitsCtrl({
          region: region
        });
        return;
      }
      unitsCollection = new Backbone.Collection(response);
      this.view = new CommonFloor.CenterApartmentView({
        collection: unitsCollection
      });
      return this.show(this.view);
    };

    return CenterApartmentCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartments.list.controller.js.map