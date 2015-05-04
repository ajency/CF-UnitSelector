(function() {
  var PlotItemView, PlotView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PlotItemView = (function(superClass) {
    extend(PlotItemView, superClass);

    function PlotItemView() {
      return PlotItemView.__super__.constructor.apply(this, arguments);
    }

    PlotItemView.prototype.template = Handlebars.compile('<li class="unit blocks {{status}}"> <div class="pull-left info"> <label>{{unit_name}}</label> ({{unit_type}} {{super_built_up_area}}sqft) </div> <!--<div class="pull-right cost"> 50 lakhs </div>--> </li>');

    PlotItemView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    PlotItemView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = PlotItemView.__super__.serializeData.call(this);
      unitVariant = plotVariantCollection.findWhere({
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

    PlotItemView.prototype.events = {
      'click .unit': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
          return CommonFloor.router.storeRoute();
        }
      }
    };

    return PlotItemView;

  })(Marionette.ItemView);

  PlotView = (function(superClass) {
    extend(PlotView, superClass);

    function PlotView() {
      return PlotView.__super__.constructor.apply(this, arguments);
    }

    PlotView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container animated fadeInUp"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">Buildings</li> <li class="prop-type Villas hidden ">Villas/Bungalows</li> <li class="prop-type Plots active">Plots</li> </ul> </div> <div class="legend"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <div class="clearfix"></div> <div class="villa-list"> <ul class="units"> </ul> </div> </div> </div>');

    PlotView.prototype.childView = PlotItemView;

    PlotView.prototype.childViewContainer = '.units';

    PlotView.prototype.events = {
      'click .buildings': function(e) {
        var data, units;
        units = buildingCollection;
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
        units = bunglowVariantCollection.getBunglowUnits();
        data = {};
        data.units = units;
        data.type = 'villa';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        return new CommonFloor.VillaListCtrl({
          region: this.region
        });
      },
      'click .Plots': function(e) {
        var data, units;
        units = plotVariantCollection.getPlotUnits();
        data = {};
        data.units = units;
        data.type = 'plot';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        return new CommonFloor.VillaListCtrl({
          region: this.region
        });
      }
    };

    PlotView.prototype.onShow = function() {
      if (apartmentVariantCollection.length !== 0) {
        $('.buildings').removeClass('hidden');
      }
      if (bunglowVariantCollection.length !== 0) {
        return $('.Villas').removeClass('hidden');
      }
    };

    return PlotView;

  })(Marionette.CompositeView);

  CommonFloor.PlotListCtrl = (function(superClass) {
    extend(PlotListCtrl, superClass);

    function PlotListCtrl() {
      this.loadController = bind(this.loadController, this);
      return PlotListCtrl.__super__.constructor.apply(this, arguments);
    }

    PlotListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection, view;
      newUnits = plotVariantCollection.getPlotUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      this.view = view = new PlotView({
        collection: unitsCollection
      });
      this.listenTo(this.view, "load:units", this.loadController);
      return this.show(view);
    };

    PlotListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return PlotListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-list-view/plot.list.controller.js.map