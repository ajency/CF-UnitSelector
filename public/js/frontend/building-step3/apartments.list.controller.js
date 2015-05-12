(function() {
  var ApartmentsView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ApartmentsListView = (function(superClass) {
    extend(ApartmentsListView, superClass);

    function ApartmentsListView() {
      return ApartmentsListView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsListView.prototype.template = '#project-template';

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
      if (apartmentVariantCollection.length === 0) {
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

    TopApartmentView.prototype.template = Handlebars.compile('<div class="container-fluid"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12 text-center"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"> Back to Poject Overview </a> </div> <h2 class="proj-name">{{project_title}}</h2> </div> </div> </div> <div class="filter-summary-area"> <button class="btn btn-primary cf-btn-white pull-right m-t-15" type="button" data-toggle="collapse" data-target="#collapsefilters"> Filters <span class="icon-funnel"></span> </button> <div class="pull-left filter-result"> {{#each  filters}} {{#each this}} <div class="filter-pill"  > {{this.name}}{{this.type}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span> </div> {{/each}}{{/each }} </div> <div class="proj-type-count"> {{#types}} <p class="pull-right">{{type}}</p><h1 class="text-primary pull-right m-t-10">{{count.length}}</h1> {{/types}} </div> <div class="clearfix"></div> </div>');

    TopApartmentView.prototype.ui = {
      unitBack: '.unit_back'
    };

    TopApartmentView.prototype.serializeData = function() {
      var data, units;
      data = TopApartmentView.__super__.serializeData.call(this);
      units = Marionette.getOption(this, 'units');
      data.units = units.length;
      data.project_title = project.get('project_title');
      return data;
    };

    TopApartmentView.prototype.events = function() {
      return {
        'click @ui.unitBack': function(e) {
          var previousRoute;
          e.preventDefault();
          previousRoute = CommonFloor.router.previous();
          return CommonFloor.navigate('/' + previousRoute, true);
        }
      };
    };

    TopApartmentView.prototype.onShow = function() {
      if (CommonFloor.router.history.length === 1) {
        return this.ui.unitBack.hide();
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
      var buildingModel, building_id, response, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      response = window.building.getBuildingUnits(building_id);
      buildingModel = buildingCollection.findWhere({
        id: building_id
      });
      return this.show(new CommonFloor.TopApartmentView({
        model: buildingModel,
        units: response
      }));
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
      return $('.leftview').hide();
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

    ApartmentsView.prototype.template = Handlebars.compile('<li class="unit blocks {{status}}"> <div class="bldg-img"></div> <div class="info"> <label>{{unit_name}}</label> ({{unit_type}} {{super_built_up_area}}sqft) </div> <label>{{property}}</label> <div class="clearfix"></div> </li>');

    ApartmentsView.prototype.serializeData = function() {
      var data, property, status, unitType, unitVariant;
      data = ApartmentsView.__super__.serializeData.call(this);
      status = s.decapitalize(this.model.get('availability'));
      unitVariant = apartmentVariantCollection.findWhere({
        'id': this.model.get('unit_variant_id')
      });
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.unit_type = unitType.get('name');
      data.super_built_up_area = unitVariant.get('super_built_up_area');
      data.status = status;
      unitType = unitTypeMasterCollection.findWhere({
        'id': this.model.get('unit_type_id')
      });
      property = window.propertyTypes[unitType.get('property_type_id')];
      data.property = s.capitalize(property);
      return data;
    };

    ApartmentsView.prototype.events = {
      'click .unit': function(e) {
        if (this.model.get('availability') === 'available') {
          CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
          return CommonFloor.router.storeRoute();
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

    CenterApartmentView.prototype.template = '<div> <div class="col-md-12 us-right-content"> <div class="list-view-container"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#" class="map ">Map</a><a href="#" class="list active">List</a> </div> </div>--> <div class="legend clearfix"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <div class="villa-list"> <ul class="units eight"> </ul> </div> </div> </div> </div>';

    CenterApartmentView.prototype.childView = ApartmentsView;

    CenterApartmentView.prototype.childViewContainer = '.units';

    CenterApartmentView.prototype.events = {
      'click .map': function(e) {
        var building_id, url;
        e.preventDefault();
        url = Backbone.history.fragment;
        building_id = parseInt(url.split('/')[1]);
        CommonFloor.navigate('/building/' + building_id + '/master-view', true);
        return CommonFloor.router.storeRoute();
      },
      'click .list': function(e) {
        var building_id, url;
        e.preventDefault();
        url = Backbone.history.fragment;
        building_id = parseInt(url.split('/')[1]);
        CommonFloor.navigate('/building/' + building_id + '/apartments', true);
        return CommonFloor.router.storeRoute();
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
      var building_id, response, unitsCollection, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      response = window.building.getBuildingUnits(building_id);
      unitsCollection = new Backbone.Collection(response);
      return this.show(new CommonFloor.CenterApartmentView({
        collection: unitsCollection
      }));
    };

    return CenterApartmentCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartments.list.controller.js.map