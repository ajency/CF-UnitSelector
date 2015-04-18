(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
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

    ApartmentsMasterCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      if (apartmentVariantCollection.length === 0) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.ApartmentsMasterView);
      }
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

    TopApartmentMasterCtrl.prototype.initialize = function() {
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

    LeftApartmentMasterCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.LeftApartmentMasterView);
    };

    return LeftApartmentMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterApartmentMasterView = (function(superClass) {
    extend(CenterApartmentMasterView, superClass);

    function CenterApartmentMasterView() {
      return CenterApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentMasterView.prototype.template = '<div class="col-md-9 us-right-content"> <div class="list-view-container"> <div class="single-bldg"> <div class="prev"></div> <div class="next"></div> </div> <div class="svg-area"> <img src="../../images/bldg-3d.png" class="img-responsive"> </div> </div> </div>';

    return CenterApartmentMasterView;

  })(Marionette.ItemView);

  CommonFloor.CenterApartmentMasterCtrl = (function(superClass) {
    extend(CenterApartmentMasterCtrl, superClass);

    function CenterApartmentMasterCtrl() {
      return CenterApartmentMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentMasterCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.CenterApartmentMasterView);
    };

    return CenterApartmentMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartments.master.controller.js.map