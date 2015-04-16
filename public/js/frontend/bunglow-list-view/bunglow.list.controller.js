(function() {
  var CenterBunglowListView, CenterCompositeView, LeftBunglowListView, TopBunglowListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.BunglowListView = (function(superClass) {
    extend(BunglowListView, superClass);

    function BunglowListView() {
      return BunglowListView.__super__.constructor.apply(this, arguments);
    }

    BunglowListView.prototype.template = '#project-view-template';

    return BunglowListView;

  })(Marionette.LayoutView);

  CommonFloor.BunglowListCtrl = (function(superClass) {
    extend(BunglowListCtrl, superClass);

    function BunglowListCtrl() {
      return BunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    BunglowListCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.checkPropertyType();
      }
      if (bunglowVariantCollection.length !== 0) {
        return this.show(new CommonFloor.BunglowListView);
      } else {
        return this.show(new CommonFloor.NothingFoundView);
      }
    };

    return BunglowListCtrl;

  })(Marionette.RegionController);

  TopBunglowListView = (function(superClass) {
    extend(TopBunglowListView, superClass);

    function TopBunglowListView() {
      return TopBunglowListView.__super__.constructor.apply(this, arguments);
    }

    TopBunglowListView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span>Back to Poject Overview </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1>We are now at {{project_title}}\'s upcoming project having {{units}} villa\'s</h1> </div> </div> </div>');

    TopBunglowListView.prototype.serializeData = function() {
      var data;
      data = TopBunglowListView.__super__.serializeData.call(this);
      data.units = bunglowVariantCollection.getBunglowUnits().length;
      return data;
    };

    return TopBunglowListView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowListCtrl = (function(superClass) {
    extend(TopBunglowListCtrl, superClass);

    function TopBunglowListCtrl() {
      return TopBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowListCtrl.prototype.initialize = function() {
      return this.show(new TopBunglowListView({
        model: project
      }));
    };

    return TopBunglowListCtrl;

  })(Marionette.RegionController);

  LeftBunglowListView = (function(superClass) {
    extend(LeftBunglowListView, superClass);

    function LeftBunglowListView() {
      return LeftBunglowListView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowListView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>');

    LeftBunglowListView.prototype.onShow = function() {
      return $('.filters').hide();
    };

    return LeftBunglowListView;

  })(Marionette.ItemView);

  CommonFloor.LeftBunglowListCtrl = (function(superClass) {
    extend(LeftBunglowListCtrl, superClass);

    function LeftBunglowListCtrl() {
      return LeftBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowListCtrl.prototype.initialize = function() {
      return this.show(new LeftBunglowListView);
    };

    return LeftBunglowListCtrl;

  })(Marionette.RegionController);

  CenterBunglowListView = (function(superClass) {
    extend(CenterBunglowListView, superClass);

    function CenterBunglowListView() {
      return CenterBunglowListView.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowListView.prototype.template = Handlebars.compile('<li class="unit blocks {{status}}"> <div class="pull-left info"> <label>{{unit_name}}</label> ({{unit_type}} {{super_build_up_area}}sqft) </div> <!--<div class="pull-right cost"> 50 lakhs </div>--> </li>');

    CenterBunglowListView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    CenterBunglowListView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = CenterBunglowListView.__super__.serializeData.call(this);
      console.log(unitVariant = bunglowVariantCollection.findWhere({
        'id': this.model.get('unit_variant_id')
      }));
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.unit_type = unitType.get('name');
      data.super_build_up_area = unitVariant.get('super_build_up_area');
      availability = this.model.get('availability');
      data.status = s.decapitalize(availability);
      this.model.set('status', data.status);
      return data;
    };

    CenterBunglowListView.prototype.events = {
      'click .unit': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          return CommonFloor.navigate('/bunglows/unit-view/' + this.model.get('id'), true);
        }
      }
    };

    return CenterBunglowListView;

  })(Marionette.ItemView);

  CenterCompositeView = (function(superClass) {
    extend(CenterCompositeView, superClass);

    function CenterCompositeView() {
      return CenterCompositeView.__super__.constructor.apply(this, arguments);
    }

    CenterCompositeView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container"> <div class="controls mapView"> <div class="toggle"> <a href="#/master-view/bunglows" class="map">Map</a><a href="#/list-view/bunglows" class="list active">List</a> </div> </div> <div class="text-center"> <ul class="prop-select"> <li class="prop-type">Buildings</li> <li class="prop-type active">Villas/Bungalows</li> <li class="prop-type">Plots</li> </ul> </div> <div class="legend"> <ul> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> </ul> </div> <div class="villa-list"> <ul class="units"> </ul> </div> </div> </div>');

    CenterCompositeView.prototype.childView = CenterBunglowListView;

    CenterCompositeView.prototype.childViewContainer = '.units';

    CenterCompositeView.prototype.onShow = function() {
      if (project.get('project_master').front === "") {
        return $('.mapView').hide();
      } else {
        return $('.mapView').show();
      }
    };

    return CenterCompositeView;

  })(Marionette.CompositeView);

  CommonFloor.CenterBunglowListCtrl = (function(superClass) {
    extend(CenterBunglowListCtrl, superClass);

    function CenterBunglowListCtrl() {
      return CenterBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection;
      newUnits = bunglowVariantCollection.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      return this.show(new CenterCompositeView({
        collection: unitsCollection
      }));
    };

    return CenterBunglowListCtrl;

  })(Marionette.RegionController);

  CommonFloor.MiddleBunglowMasterView = (function(superClass) {
    extend(MiddleBunglowMasterView, superClass);

    function MiddleBunglowMasterView() {
      return MiddleBunglowMasterView.__super__.constructor.apply(this, arguments);
    }

    MiddleBunglowMasterView.prototype.template = '';

    return MiddleBunglowMasterView;

  })(Marionette.ItemView);

  CommonFloor.MiddleBunglowMasterCtrl = (function(superClass) {
    extend(MiddleBunglowMasterCtrl, superClass);

    function MiddleBunglowMasterCtrl() {
      return MiddleBunglowMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    MiddleBunglowMasterCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.MiddleBunglowMasterView);
    };

    return MiddleBunglowMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/bunglow-list-view/bunglow.list.controller.js.map