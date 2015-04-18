(function() {
  var ApartmentsView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ApartmentsMasterView = (function(superClass) {
    extend(ApartmentsMasterView, superClass);

    function ApartmentsMasterView() {
      return ApartmentsMasterView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsMasterView.prototype.template = '#project-template';

    return ApartmentsMasterView;

  })(Marionette.LayoutView);

  CommonFloor.ApartmentsMasterCtrl = (function(superClass) {
    extend(ApartmentsMasterCtrl, superClass);

    function ApartmentsMasterCtrl() {
      return ApartmentsMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    ApartmentsMasterCtrl.prototype.intialize = function() {
      return this.show(new CommonFloor.ApartmentsMasterView);
    };

    return ApartmentsMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.TopApartmentMasterView = (function(superClass) {
    extend(TopApartmentMasterView, superClass);

    function TopApartmentMasterView() {
      return TopApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    TopApartmentMasterView.prototype.template = '<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span> Back to Poject Overview </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1>We are now at Artha Zen\'s upcoming project having 50 villa\'s</h1> </div> </div> </div>';

    return TopApartmentMasterView;

  })(Marionette.ItemView);

  CommonFloor.TopApartmentMasterCtrl = (function(superClass) {
    extend(TopApartmentMasterCtrl, superClass);

    function TopApartmentMasterCtrl() {
      return TopApartmentMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopApartmentMasterCtrl.prototype.intialize = function() {
      return this.show(new CommonFloor.TopApartmentMasterView);
    };

    return TopApartmentMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.LeftApartmentMasterView = (function(superClass) {
    extend(LeftApartmentMasterView, superClass);

    function LeftApartmentMasterView() {
      return LeftApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentMasterView.prototype.template = '<div class="col-md-3 col-xs-12 col-sm-12 search-left-content leftview"></div>';

    LeftApartmentMasterView.prototype.onShow = function() {
      return $('.leftview').hide();
    };

    return LeftApartmentMasterView;

  })(Marionette.ItemView);

  CommonFloor.LeftApartmentMasterCtrl = (function(superClass) {
    extend(LeftApartmentMasterCtrl, superClass);

    function LeftApartmentMasterCtrl() {
      return LeftApartmentMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentMasterCtrl.prototype.intialize = function() {
      return this.show(new CommonFloor.LeftApartmentMasterView);
    };

    return LeftApartmentMasterCtrl;

  })(Marionette.RegionController);

  ApartmentsView = (function(superClass) {
    extend(ApartmentsView, superClass);

    function ApartmentsView() {
      return ApartmentsView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsView.prototype.template = '<li>{{unit_name}}</li>';

    return ApartmentsView;

  })(Marionette.ItemView);

  CommonFloor.CenterApartmentMasterView = (function(superClass) {
    extend(CenterApartmentMasterView, superClass);

    function CenterApartmentMasterView() {
      return CenterApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentMasterView.prototype.template = '<div> <ul class="units"> </ul> <div>';

    CenterApartmentMasterView.prototype.childView = ApartmentsView;

    CenterApartmentMasterView.prototype.childViewContainer = '.units';

    return CenterApartmentMasterView;

  })(Marionette.CompositeView);

  CommonFloor.CenterApartmentMasterCtrl = (function(superClass) {
    extend(CenterApartmentMasterCtrl, superClass);

    function CenterApartmentMasterCtrl() {
      return CenterApartmentMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentMasterCtrl.prototype.intialize = function() {
      var response, unitsCollection;
      response = window.building.getBuildingUnits();
      unitsCollection = new Backbone.Collection(response);
      return this.show(new CommonFloor.CenterApartmentMasterView({
        collection: unitsCollection
      }));
    };

    return CenterApartmentMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartments.master.controller.js.map