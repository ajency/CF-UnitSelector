(function() {
  var CenterBunglowListView, CenterCompositeView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CenterBunglowListView = (function(superClass) {
    extend(CenterBunglowListView, superClass);

    function CenterBunglowListView() {
      return CenterBunglowListView.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowListView.prototype.template = Handlebars.compile('<li class="unit blocks {{status}}"> <div class="pull-left info"> <label>{{unit_name}}</label> ({{unit_type}} {{super_built_up_area}}sqft) </div> <!--<div class="pull-right cost"> 50 lakhs </div>--> </li>');

    CenterBunglowListView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    CenterBunglowListView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = CenterBunglowListView.__super__.serializeData.call(this);
      unitVariant = bunglowVariantCollection.findWhere({
        'id': this.model.get('unit_variant_id')
      });
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.unit_type = unitType.get('name');
      data.super_built_up_area = unitVariant.get('super_built_up_area');
      availability = this.model.get('availability');
      data.status = s.decapitalize(availability);
      this.model.set('status', data.status);
      return data;
    };

    CenterBunglowListView.prototype.events = {
      'click .unit': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          return CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
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

    CenterCompositeView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container animated fadeInUp"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">buildings</li> <li class="prop-type Villas active ">Villas/Bungalows</li> <li class="prop-type Plots hidden">Plots</li> </ul> </div> <div class="legend"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">NOT IN SELECTION</li> </ul> </div> <div class="clearfix"></div> <div class="villa-list"> <ul class="units"> </ul> </div> </div> </div>');

    CenterCompositeView.prototype.childView = CenterBunglowListView;

    CenterCompositeView.prototype.childViewContainer = '.units';

    CenterCompositeView.prototype.events = {
      'click .buildings': function(e) {
        var data, units;
        units = buildingCollection;
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
        units = bunglowVariantCollection.getBunglowUnits();
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

    CenterCompositeView.prototype.onShow = function() {
      if (project.get('project_master').front === "") {
        $('.map-View').hide();
      } else {
        $('.map-View').show();
      }
      if (apartmentVariantCollection.length !== 0) {
        return $('.buildings').removeClass('hidden');
      }
    };

    return CenterCompositeView;

  })(Marionette.CompositeView);

  CommonFloor.ListCtrl = (function(superClass) {
    extend(ListCtrl, superClass);

    function ListCtrl() {
      this.loadController = bind(this.loadController, this);
      return ListCtrl.__super__.constructor.apply(this, arguments);
    }

    ListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection, view;
      newUnits = bunglowVariantCollection.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      this.view = view = new CenterCompositeView({
        collection: unitsCollection
      });
      this.listenTo(this.view, "load:units", this.loadController);
      return this.show(view);
    };

    ListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return ListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/bunglow-list-view/villa.list.controller.js.map