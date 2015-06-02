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

    PlotItemView.prototype.template = Handlebars.compile('<li class="unit blocks {{status}}"> <div class="col-sm-2 col-xs-2"> <i class="plot-ico m-t-10 "></i> </div> <div class="col-sm-10 col-xs-10"> <div class="pull-left info"> <label>{{unit_name}}</label> ({{unit_type}} {{super_built_up_area}} {{measurement_units}}) </div> <div class="clearfix"></div> <div class="text-primary m-t-5"> <span class="icon-rupee-icn"></span>{{price}} </div> </div> </li>');

    PlotItemView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    PlotItemView.prototype.serializeData = function() {
      var availability, data, response;
      data = PlotItemView.__super__.serializeData.call(this);
      response = window.unit.getUnitDetails(this.model.get('id'));
      data.unit_type = response[1].get('name');
      data.super_built_up_area = response[0].get('super_built_up_area');
      availability = this.model.get('availability');
      data.status = s.decapitalize(availability);
      this.model.set('status', status);
      data.price = window.numDifferentiation(response[3]);
      this.model.set('status', data.status);
      data.measurement_units = project.get('measurement_units');
      return data;
    };

    PlotItemView.prototype.events = {
      'click .unit': function(e) {
        if (this.model.get('status') === 'available') {
          return CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
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

    PlotView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container animated fadeInUp"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <span class="pull-left top-legend"> <ul> <li class="na">N/A</li> </ul> </span> <h2 class="text-center">List of Plots</h2> <hr class="margin-none"> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">Buildings</li> <li class="prop-type Villas hidden ">Villas/Bungalows</li> <li class="prop-type Plots active">Plots</li> </ul> </div> <div class="legend"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <div class="clearfix"></div> <div class="villa-list"> <ul class="units"> </ul> </div> </div> </div>');

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
        return new CommonFloor.PlotListCtrl({
          region: this.region
        });
      }
    };

    PlotView.prototype.onShow = function() {
      var arr, type;
      if (CommonFloor.defaults['type'] !== "") {
        type = CommonFloor.defaults['type'].split(',');
        if ($.inArray('apartment', type) > -1) {
          $('.buildings').removeClass('hidden');
        }
        if ($.inArray('villa', type) > -1) {
          return $('.Villas').removeClass('hidden');
        }
      } else {
        arr = _.values(window.propertyTypes);
        if ($.inArray('Apartments', arr) > -1 || $.inArray('Penthouse', arr) > -1) {
          $('.buildings').removeClass('hidden');
        }
        if ($.inArray('Plot', arr) > -1) {
          $('.Plots').removeClass('hidden');
        }
        if ($.inArray('Villas/Bungalows', arr) > -1) {
          return $('.Villas').removeClass('hidden');
        }
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