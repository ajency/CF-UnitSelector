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

    BunglowListView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-sm-4"> <h6 class="{{status}}">{{unit_name}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{unit_type}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{super_built_up_area}} sqft</h6> </div> </div>');

    BunglowListView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    BunglowListView.prototype.className = 'blck-wrap';

    BunglowListView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = BunglowListView.__super__.serializeData.call(this);
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

    BunglowListView.prototype.events = {
      'mouseover .row': function(e) {
        var id;
        id = this.model.get('id');
        return $('#' + id).attr('class', 'layer ' + this.model.get('status'));
      },
      'mouseout .row': function(e) {
        return $('.layer').attr('class', 'layer');
      },
      'click .row': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          return CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
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

    MasterBunglowListView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container animated fadeInUp"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">buildings</li> <li class="prop-type Villas active ">Villas/Bungalows</li> <li class="prop-type Plots hidden">Plots</li> </ul> </div> <div class="advncd-filter-wrp  unit-list"> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div> <div class="units"> </div> </div> </div> </div>');

    MasterBunglowListView.prototype.childView = BunglowListView;

    MasterBunglowListView.prototype.childViewContainer = '.units';

    MasterBunglowListView.prototype.events = {
      'click .buildings': function(e) {
        var data, units;
        units = buildingCollection;
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.CenterBuildingListCtrl({
          region: this.region
        });
        return this.trigger("load:units", data);
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
        new CommonFloor.ListCtrl({
          region: this.region
        });
        return this.trigger("load:units", data);
      }
    };

    MasterBunglowListView.prototype.onShow = function() {
      if (project.get('project_master').front === "") {
        $('.map-View').hide();
      } else {
        $('.map-View').show();
      }
      if (apartmentVariantCollection.length !== 0) {
        return $('.buildings').removeClass('hidden');
      }
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