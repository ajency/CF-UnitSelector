(function() {
  var CenterBuildingListView, CenterItemView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CenterItemView = (function(superClass) {
    extend(CenterItemView, superClass);

    function CenterItemView() {
      return CenterItemView.__super__.constructor.apply(this, arguments);
    }

    CenterItemView.prototype.template = Handlebars.compile('<li class="bldg blocks {{status}}"> <div class="bldg-img"></div> <div class="info"> <h2 class="m-b-5">{{building_name}}</h2> <!--<div>Starting from Rs.<span>50 lakhs</span></div>--> <div>No. of Floors: <span>{{floors}}</span></div> </div> <div class="clearfix"></div> <div class="unit-type-info"> <ul> {{#types}} <li> {{name}}: <span>{{units}}</span> </li> {{/types}} </ul> </div> </li>');

    CenterItemView.prototype.serializeData = function() {
      var data, floors, id, response, types;
      data = CenterItemView.__super__.serializeData.call(this);
      id = this.model.get('id');
      response = building.getUnitTypes(id);
      types = building.getUnitTypesCount(id, response);
      floors = this.model.get('floors');
      data.floors = Object.keys(floors).length;
      data.types = types;
      return data;
    };

    CenterItemView.prototype.events = {
      'click .bldg': function(e) {
        var buildingModel, id;
        id = this.model.get('id');
        buildingModel = buildingCollection.findWhere({
          'id': id
        });
        if (buildingModel.get('building_master').front === "") {
          return CommonFloor.navigate('/building/' + id + '/apartments', true);
        } else {
          return CommonFloor.navigate('/building/' + id + '/master-view', true);
        }
      }
    };

    return CenterItemView;

  })(Marionette.ItemView);

  CenterBuildingListView = (function(superClass) {
    extend(CenterBuildingListView, superClass);

    function CenterBuildingListView() {
      return CenterBuildingListView.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingListView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container animated fadeInDown"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings active">buildings</li> <li class="prop-type Villas hidden">Villas/Bungalows</li> <li class="prop-type Plots hidden">Plots</li> </ul> </div> <div class="bldg-list"> <ul class="units"> </ul> <div class="clearfix"></div> </div> </div> </div>');

    CenterBuildingListView.prototype.childView = CenterItemView;

    CenterBuildingListView.prototype.childViewContainer = '.units';

    CenterBuildingListView.prototype.events = {
      'click .buildings': function(e) {
        var data, units;
        console.log(units = buildingCollection);
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        return new CommonFloor.CenterBuildingListCtrl({
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
        return new CommonFloor.ListCtrl({
          region: this.region
        });
      }
    };

    CenterBuildingListView.prototype.onShow = function() {
      if (project.get('project_master').front === "") {
        $('.map-View').hide();
      } else {
        $('.map-View').show();
      }
      if (bunglowVariantCollection.length !== 0) {
        return $('.Villas').removeClass('hidden');
      }
    };

    return CenterBuildingListView;

  })(Marionette.CompositeView);

  CommonFloor.CenterBuildingListCtrl = (function(superClass) {
    extend(CenterBuildingListCtrl, superClass);

    function CenterBuildingListCtrl() {
      this.loadController = bind(this.loadController, this);
      return CenterBuildingListCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingListCtrl.prototype.initialize = function() {
      var view;
      this.view = view = new CenterBuildingListView({
        collection: buildingCollection
      });
      this.listenTo(this.view, "load:units", this.loadController);
      return this.show(view);
    };

    CenterBuildingListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return CenterBuildingListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-list-view/building.list.controller.js.map