(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
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

    ApartmentsListCtrl.prototype.intialize = function() {
      return this.show(new CommonFloor.ApartmentsListView);
    };

    return ApartmentsListCtrl;

  })(Marionette.RegionController);

  CommonFloor.TopApartmentView = (function(superClass) {
    extend(TopApartmentView, superClass);

    function TopApartmentView() {
      return TopApartmentView.__super__.constructor.apply(this, arguments);
    }

    TopApartmentView.prototype.template = '<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span> Back to Poject Overview </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1>We are now at Artha Zen\'s upcoming project having 50 villa\'s</h1> </div> </div> </div>';

    return TopApartmentView;

  })(Marionette.ItemView);

  CommonFloor.TopApartmentCtrl = (function(superClass) {
    extend(TopApartmentCtrl, superClass);

    function TopApartmentCtrl() {
      return TopApartmentCtrl.__super__.constructor.apply(this, arguments);
    }

    TopApartmentCtrl.prototype.intialize = function() {
      return this.show(new CommonFloor.TopApartmentView);
    };

    return TopApartmentCtrl;

  })(Marionette.RegionController);

  CommonFloor.LeftApartmentView = (function(superClass) {
    extend(LeftApartmentView, superClass);

    function LeftApartmentView() {
      return LeftApartmentView.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentView.prototype.template = '<div class="col-md-3 col-xs-12 col-sm-12 search-left-content leftview"></div>';

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

    LeftApartmentCtrl.prototype.intialize = function() {
      return this.show(new CommonFloor.LeftApartmentView);
    };

    return LeftApartmentCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterApartmentView = (function(superClass) {
    extend(CenterApartmentView, superClass);

    function CenterApartmentView() {
      return CenterApartmentView.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentView.prototype.template = '<div class="col-md-9 us-right-content"> <div class="list-view-container"> <div class="single-bldg"> <div class="prev"></div> <div class="next"></div> </div> <div class="svg-area"> <img src="../../images/bldg-3d.png" class="img-responsive"> </div> </div> </div>';

    return CenterApartmentView;

  })(Marionette.ItemView);

  CommonFloor.CenterApartmentCtrl = (function(superClass) {
    extend(CenterApartmentCtrl, superClass);

    function CenterApartmentCtrl() {
      return CenterApartmentCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentCtrl.prototype.intialize = function() {
      return this.show(new CommonFloor.CenterApartmentView);
    };

    return CenterApartmentCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartments.list.controller.js.map