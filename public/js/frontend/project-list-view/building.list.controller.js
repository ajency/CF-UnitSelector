(function() {
  var BuildingItemView, BuildingListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BuildingItemView = (function(superClass) {
    extend(BuildingItemView, superClass);

    function BuildingItemView() {
      return BuildingItemView.__super__.constructor.apply(this, arguments);
    }

    BuildingItemView.prototype.template = Handlebars.compile('<li class="bldg blocks {{status}}"> <div class="bldg-img"></div> <div class="info"> <h2 class="m-b-5">{{building_name}}</h2> <!--<div>Starting from Rs.<span>50 lakhs</span></div>--> <div>No. of Floors: <span>{{floors}}</span></div> </div> <div class="clearfix"></div> <div class="unit-type-info"> <ul> {{#types}} <li> {{name}}: <span>{{units}}</span> </li> {{/types}} </ul> </div> </li>');

    BuildingItemView.prototype.serializeData = function() {
      var data, floors, id, response, types;
      data = BuildingItemView.__super__.serializeData.call(this);
      id = this.model.get('id');
      response = building.getUnitTypes(id);
      types = building.getUnitTypesCount(id, response);
      floors = this.model.get('floors');
      data.floors = Object.keys(floors).length;
      data.types = types;
      return data;
    };

    BuildingItemView.prototype.events = {
      'click .bldg': function(e) {
        var buildingModel, id, unit;
        id = this.model.get('id');
        unit = unitCollection.where({
          'building_id': id
        });
        if (unit.length === 0) {
          return;
        }
        buildingModel = buildingCollection.findWhere({
          'id': id
        });
        if (Object.keys(buildingModel.get('building_master')).length === 0) {
          CommonFloor.navigate('/building/' + id + '/apartments', true);
          return CommonFloor.router.storeRoute();
        } else {
          CommonFloor.navigate('/building/' + id + '/master-view', true);
          return CommonFloor.router.storeRoute();
        }
      }
    };

    return BuildingItemView;

  })(Marionette.ItemView);

  BuildingListView = (function(superClass) {
    extend(BuildingListView, superClass);

    function BuildingListView() {
      return BuildingListView.__super__.constructor.apply(this, arguments);
    }

    BuildingListView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container animated fadeInDown"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings active">Buildings</li> <li class="prop-type Villas hidden">Villas/Bungalows</li> <li class="prop-type Plots hidden">Plots</li> </ul> </div> <div class="bldg-list"> <ul class="units"> </ul> <div class="clearfix"></div> </div> </div> </div>');

    BuildingListView.prototype.childView = BuildingItemView;

    BuildingListView.prototype.childViewContainer = '.units';

    BuildingListView.prototype.events = {
      'click .buildings': function(e) {
        var data, units;
        console.log(units = buildingCollection);
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        return new CommonFloor.BuildingListCtrl({
          region: this.region
        });
      },
      'click .Villas': function(e) {
        var data, units;
        console.log(units = bunglowVariantCollection.getBunglowUnits());
        data = {};
        data.units = units;
        data.type = 'villa';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        return new CommonFloor.VillaListCtrl({
          region: this.region
        });
      }
    };

    BuildingListView.prototype.onShow = function() {
      if (bunglowVariantCollection.length !== 0) {
        return $('.Villas').removeClass('hidden');
      }
    };

    return BuildingListView;

  })(Marionette.CompositeView);

  CommonFloor.BuildingListCtrl = (function(superClass) {
    extend(BuildingListCtrl, superClass);

    function BuildingListCtrl() {
      this.loadController = bind(this.loadController, this);
      return BuildingListCtrl.__super__.constructor.apply(this, arguments);
    }

    BuildingListCtrl.prototype.initialize = function() {
      var view;
      this.view = view = new BuildingListView({
        collection: buildingCollection
      });
      this.listenTo(this.view, "load:units", this.loadController);
      return this.show(view);
    };

    BuildingListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return BuildingListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-list-view/building.list.controller.js.map