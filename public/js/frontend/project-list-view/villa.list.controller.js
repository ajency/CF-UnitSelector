(function() {
  var VillaItemView, VillaView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  VillaItemView = (function(superClass) {
    extend(VillaItemView, superClass);

    function VillaItemView() {
      return VillaItemView.__super__.constructor.apply(this, arguments);
    }

    VillaItemView.prototype.template = Handlebars.compile('<li class="unit blocks {{status}}"> <div class="pull-left info"> <label>{{unit_name}}</label> ({{unit_type}} {{super_built_up_area}}sqft) </div> <!--<div class="pull-right cost"> 50 lakhs </div>--> </li>');

    VillaItemView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    VillaItemView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = VillaItemView.__super__.serializeData.call(this);
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

    VillaItemView.prototype.events = {
      'click .unit': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
          return CommonFloor.router.storeRoute();
        }
      }
    };

    return VillaItemView;

  })(Marionette.ItemView);

  VillaView = (function(superClass) {
    extend(VillaView, superClass);

    function VillaView() {
      return VillaView.__super__.constructor.apply(this, arguments);
    }

    VillaView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container animated fadeIn"> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">Buildings</li> <li class="prop-type Villas active ">Villas/Bungalows</li> <li class="prop-type Plots hidden">Plots</li> </ul> </div> <div class="legend"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <div class="clearfix"></div> <div class="villa-list"> <ul class="units eight"> </ul> </div> </div> </div>');

    VillaView.prototype.childView = VillaItemView;

    VillaView.prototype.childViewContainer = '.units';

    VillaView.prototype.events = {
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

    VillaView.prototype.onShow = function() {
      if (apartmentVariantCollection.length !== 0) {
        $('.buildings').removeClass('hidden');
      }
      if (plotVariantCollection.length !== 0) {
        return $('.Plots').removeClass('hidden');
      }
    };

    return VillaView;

  })(Marionette.CompositeView);

  CommonFloor.VillaListCtrl = (function(superClass) {
    extend(VillaListCtrl, superClass);

    function VillaListCtrl() {
      this.loadController = bind(this.loadController, this);
      return VillaListCtrl.__super__.constructor.apply(this, arguments);
    }

    VillaListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection, view;
      newUnits = bunglowVariantCollection.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      this.view = view = new VillaView({
        collection: unitsCollection
      });
      this.listenTo(this.view, "load:units", this.loadController);
      return this.show(view);
    };

    VillaListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return VillaListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-list-view/villa.list.controller.js.map