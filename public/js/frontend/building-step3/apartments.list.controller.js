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

    TopApartmentView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span> Back to Poject Overview </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1>We are now at {{project_title}}\'s upcoming project having {{units}} apartment\'s</h1> </div> </div> </div>');

    TopApartmentView.prototype.serializeData = function() {
      var data, units;
      data = TopApartmentView.__super__.serializeData.call(this);
      units = Marionette.getOption(this, 'units');
      data.units = units.length;
      data.project_title = project.get('project_title');
      return data;
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

    ApartmentsView.prototype.template = Handlebars.compile('<li>{{unit_name}}</li>');

    return ApartmentsView;

  })(Marionette.ItemView);

  CommonFloor.CenterApartmentView = (function(superClass) {
    extend(CenterApartmentView, superClass);

    function CenterApartmentView() {
      return CenterApartmentView.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentView.prototype.template = '<div> <ul class="units"> </ul> <div>';

    CenterApartmentView.prototype.childView = ApartmentsView;

    CenterApartmentView.prototype.childViewContainer = '.units';

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