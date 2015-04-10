(function() {
  var CenterBunglowView, LeftBunglowView, TopBunglowView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.BunglowLayoutView = (function(superClass) {
    extend(BunglowLayoutView, superClass);

    function BunglowLayoutView() {
      return BunglowLayoutView.__super__.constructor.apply(this, arguments);
    }

    BunglowLayoutView.prototype.template = '#project-view-template';

    return BunglowLayoutView;

  })(Marionette.LayoutView);

  CommonFloor.BunglowMasterViewCtrl = (function(superClass) {
    extend(BunglowMasterViewCtrl, superClass);

    function BunglowMasterViewCtrl() {
      return BunglowMasterViewCtrl.__super__.constructor.apply(this, arguments);
    }

    BunglowMasterViewCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.checkProjectType();
      }
      return this.show(new CommonFloor.BunglowLayoutView);
    };

    return BunglowMasterViewCtrl;

  })(Marionette.RegionController);

  TopBunglowView = (function(superClass) {
    extend(TopBunglowView, superClass);

    function TopBunglowView() {
      return TopBunglowView.__super__.constructor.apply(this, arguments);
    }

    TopBunglowView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1>We are now at Artha Zen\'s upcoming project having 50 villa\'s</h1> </div> </div> </div>');

    return TopBunglowView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowCtrl = (function(superClass) {
    extend(TopBunglowCtrl, superClass);

    function TopBunglowCtrl() {
      return TopBunglowCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowCtrl.prototype.initialize = function() {
      return this.show(new TopBunglowView);
    };

    return TopBunglowCtrl;

  })(Marionette.RegionController);

  LeftBunglowView = (function(superClass) {
    extend(LeftBunglowView, superClass);

    function LeftBunglowView() {
      return LeftBunglowView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="advncd-filter-wrp"> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div> <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6 class="sold">V1001</h6> </div> <div class="col-sm-4"> <h6 class="">3BHK</h6> </div> <div class="col-sm-4"> <h6 class="">1460sqft</h6> </div> </div> </div> <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6 class="available">V1002</h6> </div> <div class="col-sm-4"> <h6 class="">3BHK</h6> </div> <div class="col-sm-4"> <h6 class="">1460sqft</h6> </div> </div> </div> </div> </div>');

    return LeftBunglowView;

  })(Marionette.ItemView);

  CommonFloor.LeftBunglowCtrl = (function(superClass) {
    extend(LeftBunglowCtrl, superClass);

    function LeftBunglowCtrl() {
      return LeftBunglowCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowCtrl.prototype.initialize = function() {
      return this.show(new LeftBunglowView);
    };

    return LeftBunglowCtrl;

  })(Marionette.RegionController);

  CenterBunglowView = (function(superClass) {
    extend(CenterBunglowView, superClass);

    function CenterBunglowView() {
      return CenterBunglowView.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area"> <img src="../../images/map2.png"> </div> </div>');

    return CenterBunglowView;

  })(Marionette.ItemView);

  CommonFloor.CenterBunglowCtrl = (function(superClass) {
    extend(CenterBunglowCtrl, superClass);

    function CenterBunglowCtrl() {
      return CenterBunglowCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowCtrl.prototype.initialize = function() {
      return this.show(new CenterBunglowView);
    };

    return CenterBunglowCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/screen-two/project.view.controller.js.map