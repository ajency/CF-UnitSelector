(function() {
  var CenterUnitView, LeftUnitView, TopUnitView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.UnitLayoutView = (function(superClass) {
    extend(UnitLayoutView, superClass);

    function UnitLayoutView() {
      return UnitLayoutView.__super__.constructor.apply(this, arguments);
    }

    UnitLayoutView.prototype.template = '#unit-view-template';

    return UnitLayoutView;

  })(Marionette.LayoutView);

  CommonFloor.UnitDetailViewCtrl = (function(superClass) {
    extend(UnitDetailViewCtrl, superClass);

    function UnitDetailViewCtrl() {
      return UnitDetailViewCtrl.__super__.constructor.apply(this, arguments);
    }

    UnitDetailViewCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      console.log(project.toJSON());
      if (jQuery.isEmptyObject(project.toJSON())) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.UnitLayoutView);
      }
    };

    return UnitDetailViewCtrl;

  })(Marionette.RegionController);

  TopUnitView = (function(superClass) {
    extend(TopUnitView, superClass);

    function TopUnitView() {
      return TopUnitView.__super__.constructor.apply(this, arguments);
    }

    TopUnitView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span><a href="#/master-view/bunglows"> Back to Poject Overview</a> </span> </li> </ul> </div> </div> </div> <div class="search-header-wrap"> <h1>You have selected {{unit_name}} Villa</h1> </div> </div> </div>');

    return TopUnitView;

  })(Marionette.ItemView);

  CommonFloor.TopUnitCtrl = (function(superClass) {
    extend(TopUnitCtrl, superClass);

    function TopUnitCtrl() {
      return TopUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    TopUnitCtrl.prototype.initialize = function() {
      var unit, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unit = unitCollection.findWhere({
        id: unitid
      });
      return this.show(new TopUnitView({
        model: unit
      }));
    };

    return TopUnitCtrl;

  })(Marionette.RegionController);

  LeftUnitView = (function(superClass) {
    extend(LeftUnitView, superClass);

    function LeftUnitView() {
      return LeftUnitView.__super__.constructor.apply(this, arguments);
    }

    LeftUnitView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="blck-wrap"> <h2 class="pull-left"><strong>{{unit_name}}</strong></h2> <!-- <span class="label label-success">For Sale</span> --> <div class="clearfix"></div> <div class="details"> <!--<div> <label>Starting Price:</label> Rs 1.3 crores </div>--> <div> {{type}} ({{area}} sqft) </div> </div> </div> <div class="advncd-filter-wrp unit-list"> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Rooms</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div> <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6>Bedroom</h6> </div> <div class="col-sm-4"> <h6 class="">2</h6> </div> <div class="col-sm-4"> <h6 class="">98sqft</h6> </div> </div> </div> <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6>Terrace</h6> </div> <div class="col-sm-4"> <h6 class="">1</h6> </div> <div class="col-sm-4"> <h6 class="">27sqft</h6> </div> </div> </div> <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6>Bathroom</h6> </div> <div class="col-sm-4"> <h6 class="">4</h6> </div> <div class="col-sm-4"> <h6 class="">98sqft</h6> </div> </div> </div> <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6>Store</h6> </div> <div class="col-sm-4"> <h6 class="">1</h6> </div> <div class="col-sm-4"> <h6 class="">27sqft</h6> </div> </div> </div> </div> </div> </div>');

    LeftUnitView.prototype.serializeData = function() {
      var data, unit, unitType, unitVariant, unitid, url;
      data = LeftUnitView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unit = unitCollection.findWhere({
        id: unitid
      });
      unitVariant = bunglowVariantCollection.findWhere({
        'id': unit.get('unit_variant_id')
      });
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.area = unitVariant.get('super_build_up_area');
      data.type = unitType.get('name');
      data.unit_name = unit.get('unit_name');
      return data;
    };

    return LeftUnitView;

  })(Marionette.ItemView);

  CommonFloor.LeftUnitCtrl = (function(superClass) {
    extend(LeftUnitCtrl, superClass);

    function LeftUnitCtrl() {
      return LeftUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftUnitCtrl.prototype.initialize = function() {
      return this.show(new LeftUnitView);
    };

    return LeftUnitCtrl;

  })(Marionette.RegionController);

  CenterUnitView = (function(superClass) {
    extend(CenterUnitView, superClass);

    function CenterUnitView() {
      return CenterUnitView.__super__.constructor.apply(this, arguments);
    }

    CenterUnitView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area"> <div class="liquid-slider" id="slider-id"> <div> <h2 class="title">External 3D</h2> <img src="../../images/step3.png"> </div> <div> <h2 class="title">2D Layout</h2> <img src="../../images/step3.png"> </div> <div> <h2 class="title">3D Layout</h2> <img src="../../images/step3.png"> </div> </div> </div> </div>');

    CenterUnitView.prototype.onShow = function() {
      return $('#slider-id').liquidSlider({
        slideEaseFunction: "easeInOutQuad",
        includeTitle: false,
        autoSlideInterval: 4000,
        mobileNavigation: false,
        hideArrowsWhenMobile: false,
        dynamicTabsAlign: "center",
        dynamicArrows: false
      });
    };

    return CenterUnitView;

  })(Marionette.ItemView);

  CommonFloor.CenterUnitCtrl = (function(superClass) {
    extend(CenterUnitCtrl, superClass);

    function CenterUnitCtrl() {
      return CenterUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterUnitCtrl.prototype.initialize = function() {
      return this.show(new CenterUnitView);
    };

    return CenterUnitCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/screen-four/unit.details.controller.js.map