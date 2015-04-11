(function() {
  var CenterBunglowView, LeftBunglowCompositeView, LeftBunglowView, TopBunglowView,
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
        CommonFloor.loadJSONData();
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

    TopBunglowView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1>We are now at {{project_title}}\'s upcoming project having {{units}} villas</h1> </div> </div> </div>');

    TopBunglowView.prototype.serializeData = function() {
      var data;
      data = TopBunglowView.__super__.serializeData.call(this);
      data.units = CommonFloor.getBunglowUnits().length;
      return data;
    };

    return TopBunglowView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowCtrl = (function(superClass) {
    extend(TopBunglowCtrl, superClass);

    function TopBunglowCtrl() {
      return TopBunglowCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowCtrl.prototype.initialize = function() {
      return this.show(new TopBunglowView({
        model: project
      }));
    };

    return TopBunglowCtrl;

  })(Marionette.RegionController);

  LeftBunglowView = (function(superClass) {
    extend(LeftBunglowView, superClass);

    function LeftBunglowView() {
      return LeftBunglowView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-sm-4"> <h6 class="{{availability}}">{{unit_name}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{unit_type}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{super_build_up_area}} sqft</h6> </div> </div>');

    LeftBunglowView.prototype.className = 'blck-wrap';

    LeftBunglowView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = LeftBunglowView.__super__.serializeData.call(this);
      console.log(unitVariant = bunglowVariantCollection.findWhere({
        'id': this.model.get('unit_variant_id')
      }));
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.unit_type = unitType.get('name');
      data.super_build_up_area = unitVariant.get('super_build_up_area');
      availability = this.model.get('availability');
      data.availability = s.decapitalize(availability);
      return data;
    };

    return LeftBunglowView;

  })(Marionette.ItemView);

  LeftBunglowCompositeView = (function(superClass) {
    extend(LeftBunglowCompositeView, superClass);

    function LeftBunglowCompositeView() {
      return LeftBunglowCompositeView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowCompositeView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper "> <div class="advncd-filter-wrp  unit-list"> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div> <div class="units"> </div> </div> </div> </div>');

    LeftBunglowCompositeView.prototype.childView = LeftBunglowView;

    LeftBunglowCompositeView.prototype.childViewContainer = '.units';

    return LeftBunglowCompositeView;

  })(Marionette.CompositeView);

  CommonFloor.LeftBunglowCtrl = (function(superClass) {
    extend(LeftBunglowCtrl, superClass);

    function LeftBunglowCtrl() {
      return LeftBunglowCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection;
      newUnits = CommonFloor.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      return this.show(new LeftBunglowCompositeView({
        collection: unitsCollection
      }));
    };

    return LeftBunglowCtrl;

  })(Marionette.RegionController);

  CenterBunglowView = (function(superClass) {
    extend(CenterBunglowView, superClass);

    function CenterBunglowView() {
      return CenterBunglowView.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area"> </div> </div>');

    CenterBunglowView.prototype.events = {
      'mouseover .layer': function(e) {
        var availability, html, id, unit, unitType, unitVariant;
        id = e.target.id;
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit === void 0) {
          html += '<div class="svg-info"> <div class="details"> Villa details not entered </div> </div>';
          $('.layer').tooltipster('content', html);
          return false;
        }
        console.log(unitVariant = bunglowVariantCollection.findWhere({
          'id': unit.get('unit_variant_id')
        }));
        console.log(unitType = unitTypeCollection.findWhere({
          'id': unitVariant.get('unit_type_id')
        }));
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        html = "";
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <span class="label label-success">For Sale</span> <div class="clearfix"></div> <div class="details"> <div> <label>Area</label> - ' + unitVariant.get('super_build_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + unitType.get('name') + '</div> </div> </div> </div>';
        $('.layer').tooltipster('content', html);
        return $('.layer').addClass(availability);
      }
    };

    CenterBunglowView.prototype.onShow = function() {
      var path;
      path = project.get('project_master').front;
      return $('<div></div>').load(path, this.iniTooltip).appendTo('.svg-area');
    };

    CenterBunglowView.prototype.iniTooltip = function() {
      return $('.layer').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10
      });
    };

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