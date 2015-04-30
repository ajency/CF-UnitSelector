(function() {
  var MasterPlotListView, PlotListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PlotListView = (function(superClass) {
    extend(PlotListView, superClass);

    function PlotListView() {
      return PlotListView.__super__.constructor.apply(this, arguments);
    }

    PlotListView.prototype.template = Handlebars.compile('	<div class=" info"> <label class="pull-left">{{unit_name}}</label> <div class="pull-right">{{unit_type}}</div> <!--{{super_built_up_area}}sqft--> <div class="clearfix"></div> </div> <div class="cost"> {{price}} </div>');

    PlotListView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    PlotListView.prototype.tagName = 'li';

    PlotListView.prototype.className = 'unit blocks';

    PlotListView.prototype.serializeData = function() {
      var availability, data, response, status;
      data = PlotListView.__super__.serializeData.call(this);
      response = window.unit.getUnitDetails(this.model.get('id'));
      data.unit_type = response[1].get('name');
      data.super_built_up_area = response[0].get('super_built_up_area');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      this.model.set('status', status);
      window.convertRupees(response[3]);
      data.price = $('#price').val();
      return data;
    };

    PlotListView.prototype.onShow = function() {
      var availability, classname, id, status;
      id = this.model.get('id');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      classname = $('#unit' + id).attr('class');
      return $('#unit' + id).attr('class', classname + ' ' + status);
    };

    PlotListView.prototype.events = {
      'mouseover': function(e) {
        var id;
        id = this.model.get('id');
        $('.layer').attr('class', 'layer plot');
        $('#' + id + '.plot').attr('class', 'layer plot ' + this.model.get('status'));
        return $('#unit' + id).attr('class', 'unit blocks' + ' ' + this.model.get('status') + ' active');
      },
      'mouseout': function(e) {
        var id;
        id = this.model.get('id');
        $('#unit' + id).attr('class', 'unit blocks' + ' ' + this.model.get('status'));
        return CommonFloor.applyPlotClasses();
      },
      'click': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
          return CommonFloor.router.storeRoute();
        }
      }
    };

    return PlotListView;

  })(Marionette.ItemView);

  MasterPlotListView = (function(superClass) {
    extend(MasterPlotListView, superClass);

    function MasterPlotListView() {
      return MasterPlotListView.__super__.constructor.apply(this, arguments);
    }

    MasterPlotListView.prototype.template = Handlebars.compile('<div class="col-xs-12 col-sm-12 col-md-3 us-left-content"> <div class="list-view-container w-map animated fadeInLeft"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">Buildings</li> <li class="prop-type Villas  hidden ">Villas/Bungalows</li> <li class="prop-type Plots active">Plots</li> </ul> </div> <div class="advncd-filter-wrp  bldg-list"> <div class="legend clearfix"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <p class="text-center help-text">Hover on the units for more details</p> <!--<div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div>--> <ul class="units one"> </ul> <div class="clearfix"></div> </div> </div> </div>');

    MasterPlotListView.prototype.childView = PlotListView;

    MasterPlotListView.prototype.childViewContainer = '.units';

    MasterPlotListView.prototype.events = {
      'click .buildings': function(e) {
        var data, units;
        units = buildingCollection;
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        return new CommonFloor.MasterBuildingListCtrl({
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
          el: '#leftregion'
        });
        return new CommonFloor.MasterBunglowListCtrl({
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
          el: '#leftregion'
        });
        return new CommonFloor.MasterPlotListCtrl({
          region: this.region
        });
      }
    };

    MasterPlotListView.prototype.onShow = function() {
      if (buildingCollection.length !== 0) {
        $('.buildings').removeClass('hidden');
      }
      if (bunglowVariantCollection.length !== 0) {
        $('.Villas').removeClass('hidden');
      }
      return $('.units').mCustomScrollbar({
        theme: 'inset'
      });
    };

    return MasterPlotListView;

  })(Marionette.CompositeView);

  CommonFloor.MasterPlotListCtrl = (function(superClass) {
    extend(MasterPlotListCtrl, superClass);

    function MasterPlotListCtrl() {
      this.loadController = bind(this.loadController, this);
      return MasterPlotListCtrl.__super__.constructor.apply(this, arguments);
    }

    MasterPlotListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection, view;
      newUnits = plotVariantCollection.getPlotUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      this.view = view = new MasterPlotListView({
        collection: unitsCollection
      });
      this.listenTo(this.view, "load:units", this.loadController);
      return this.show(view);
    };

    MasterPlotListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return MasterPlotListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/master-list-plots/master.list.plots.controller.js.map