(function() {
  var BunglowListView, MasterBunglowListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BunglowListView = (function(superClass) {
    extend(BunglowListView, superClass);

    function BunglowListView() {
      return BunglowListView.__super__.constructor.apply(this, arguments);
    }

    BunglowListView.prototype.template = Handlebars.compile('	<div class=" info"> <label class="pull-left">{{unit_name}}</label> <div class="pull-right">{{unit_type}}</div> <!--{{super_built_up_area}}sqft--> <div class="clearfix"></div> </div> <div class="cost"> {{price}} </div>');

    BunglowListView.prototype.initialize = function() {
      this.$el.prop("id", 'unit' + this.model.get("id"));
      return this.classname = '';
    };

    BunglowListView.prototype.tagName = 'li';

    BunglowListView.prototype.className = 'unit blocks';

    BunglowListView.prototype.serializeData = function() {
      var availability, data, response, status;
      data = BunglowListView.__super__.serializeData.call(this);
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

    BunglowListView.prototype.onShow = function() {
      var availability, classname, id, status;
      id = this.model.get('id');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      classname = $('#unit' + id).attr('class');
      return $('#unit' + id).attr('class', classname + ' ' + status);
    };

    BunglowListView.prototype.events = {
      'mouseover': function(e) {
        var id;
        id = this.model.get('id');
        this.classname = $('#' + id + '.villa').attr('class');
        $('#' + id + '.villa').attr('class', 'layer villa svg_active ' + this.model.get('status'));
        return $('#unit' + id).attr('class', 'unit blocks' + ' ' + this.model.get('status') + ' active');
      },
      'mouseout': function(e) {
        var id;
        id = this.model.get('id');
        $('#unit' + id).attr('class', 'unit blocks' + ' ' + this.model.get('status'));
        return CommonFloor.applyVillaClasses(this.classname);
      },
      'click': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
          return CommonFloor.router.storeRoute();
        }
      }
    };

    return BunglowListView;

  })(Marionette.ItemView);

  MasterBunglowListView = (function(superClass) {
    extend(MasterBunglowListView, superClass);

    function MasterBunglowListView() {
      return MasterBunglowListView.__super__.constructor.apply(this, arguments);
    }

    MasterBunglowListView.prototype.template = Handlebars.compile('<div id="view_toggle" class="toggle-view-button map"></div> <div class="list-view-container w-map animated fadeIn"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">Buildings</li> <li class="prop-type Villas active ">Villas/Bungalows</li> <li class="prop-type Plots hidden">Plots</li> </ul> </div> <div class="advncd-filter-wrp  unit-list"> <div class="legend clearfix"> <ul> <!--<li class="available">AVAILABLE</li>--> <li class="sold">Not Available</li> <!--<li class="blocked">BLOCKED</li>--> <li class="na">Not in Selection</li> </ul> </div> <p class="text-center help-text">Hover on the units for more details</p> <!--<div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div>--> <ul class="units two"> </ul> <div class="clearfix"></div> </div> </div>');

    MasterBunglowListView.prototype.childView = BunglowListView;

    MasterBunglowListView.prototype.childViewContainer = '.units';

    MasterBunglowListView.prototype.ui = {
      viewtog: '#view_toggle'
    };

    MasterBunglowListView.prototype.events = {
      'click @ui.viewtog': function(e) {
        $('.us-left-content').toggleClass('not-visible visible');
        return $('.us-right-content').toggleClass('not-visible visible');
      },
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

    MasterBunglowListView.prototype.onShow = function() {
      if (buildingCollection.length !== 0) {
        $('.buildings').removeClass('hidden');
      }
      if (plotVariantCollection.length !== 0) {
        $('.Plots').removeClass('hidden');
      }
      return $('.units').mCustomScrollbar({
        theme: 'inset'
      });
    };

    return MasterBunglowListView;

  })(Marionette.CompositeView);

  CommonFloor.MasterBunglowListCtrl = (function(superClass) {
    extend(MasterBunglowListCtrl, superClass);

    function MasterBunglowListCtrl() {
      this.loadController = bind(this.loadController, this);
      return MasterBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    MasterBunglowListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection, view;
      newUnits = bunglowVariantCollection.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      this.view = view = new MasterBunglowListView({
        collection: unitsCollection
      });
      this.listenTo(this.view, "load:units", this.loadController);
      return this.show(view);
    };

    MasterBunglowListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return MasterBunglowListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/master-list-bunglows/master.list.bunglows.controller.js.map