(function() {
  var BuildingListView, CenterBuildingListView, CenterItemView, LeftBuildingListView, TopBuildingListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BuildingListView = (function(superClass) {
    extend(BuildingListView, superClass);

    function BuildingListView() {
      return BuildingListView.__super__.constructor.apply(this, arguments);
    }

    BuildingListView.prototype.template = '#project-view-template';

    return BuildingListView;

  })(Marionette.LayoutView);

  CommonFloor.BuildingListCtrl = (function(superClass) {
    extend(BuildingListCtrl, superClass);

    function BuildingListCtrl() {
      return BuildingListCtrl.__super__.constructor.apply(this, arguments);
    }

    BuildingListCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
        this.show(new BuildingListView);
      }
      if (buildingCollection.length !== 0) {
        return this.show(new BuildingListView);
      } else {
        return this.show(new CommonFloor.NothingFoundView);
      }
    };

    return BuildingListCtrl;

  })(Marionette.RegionController);

  TopBuildingListView = (function(superClass) {
    extend(TopBuildingListView, superClass);

    function TopBuildingListView() {
      return TopBuildingListView.__super__.constructor.apply(this, arguments);
    }

    TopBuildingListView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span>Back to Poject Overview </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1>Buildings List View</h1> </div> </div> </div>');

    return TopBuildingListView;

  })(Marionette.ItemView);

  CommonFloor.TopBuildingListCtrl = (function(superClass) {
    extend(TopBuildingListCtrl, superClass);

    function TopBuildingListCtrl() {
      return TopBuildingListCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBuildingListCtrl.prototype.initialize = function() {
      return this.show(new TopBuildingListView);
    };

    return TopBuildingListCtrl;

  })(Marionette.RegionController);

  LeftBuildingListView = (function(superClass) {
    extend(LeftBuildingListView, superClass);

    function LeftBuildingListView() {
      return LeftBuildingListView.__super__.constructor.apply(this, arguments);
    }

    LeftBuildingListView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>');

    LeftBuildingListView.prototype.onShow = function() {
      return $('.filters').hide();
    };

    return LeftBuildingListView;

  })(Marionette.ItemView);

  CommonFloor.LeftBuildingListCtrl = (function(superClass) {
    extend(LeftBuildingListCtrl, superClass);

    function LeftBuildingListCtrl() {
      return LeftBuildingListCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBuildingListCtrl.prototype.initialize = function() {
      return this.show(new LeftBuildingListView);
    };

    return LeftBuildingListCtrl;

  })(Marionette.RegionController);

  CenterItemView = (function(superClass) {
    extend(CenterItemView, superClass);

    function CenterItemView() {
      return CenterItemView.__super__.constructor.apply(this, arguments);
    }

    CenterItemView.prototype.template = Handlebars.compile('<li class="unit {{status}}"> <div class="pull-left info"> <label>{{name}}</label> </div> <!--<div class="pull-right cost"> 50 lakhs </div>--> </li>');

    CenterItemView.prototype.events = {
      'mouseover': function(e) {
        var id, response, types;
        id = this.model.get('id');
        response = building.getUnitTypes(id);
        types = [];
        $.each(response, function(ind, val) {
          var unitTypeModel, units, variants;
          unitTypeModel = unitTypeCollection.findWhere({
            'id': val
          });
          variants = apartmentVariantCollection.where({
            'unit_type_id': val
          });
          units = [];
          $.each(variants, function(index, value) {
            var unitsColl;
            unitsColl = unitCollection.where({
              'unit_variant_id': value.get('id')
            });
            return $.merge(units, unitsColl);
          });
          return types.push({
            'name': unitTypeModel.get('name'),
            'units': units.length
          });
        });
        return console.log(types);
      }
    };

    return CenterItemView;

  })(Marionette.ItemView);

  CenterBuildingListView = (function(superClass) {
    extend(CenterBuildingListView, superClass);

    function CenterBuildingListView() {
      return CenterBuildingListView.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingListView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <!--<div class="controls"> <div > <a href="#/List-view/bunglows"> Map View</a> |<a href="#/list-view/bunglows">List View</a> </div> <div class="clearfix"></div> </div>--> <div class="villa-list"> <ul class="units"> </ul> <div class="clearfix"></div> </div> </div>');

    CenterBuildingListView.prototype.childView = CenterItemView;

    CenterBuildingListView.prototype.childViewContainer = '.units';

    return CenterBuildingListView;

  })(Marionette.CompositeView);

  CommonFloor.CenterBuildingListCtrl = (function(superClass) {
    extend(CenterBuildingListCtrl, superClass);

    function CenterBuildingListCtrl() {
      return CenterBuildingListCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingListCtrl.prototype.initialize = function() {
      return this.show(new CenterBuildingListView({
        collection: buildingCollection
      }));
    };

    return CenterBuildingListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-list-view/building.list.controller.js.map