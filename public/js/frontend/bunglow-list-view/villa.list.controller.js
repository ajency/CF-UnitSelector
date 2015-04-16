(function() {
  var CenterBunglowListView, CenterCompositeView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CenterBunglowListView = (function(superClass) {
    extend(CenterBunglowListView, superClass);

    function CenterBunglowListView() {
      return CenterBunglowListView.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowListView.prototype.template = Handlebars.compile('<li class="unit {{status}}"> <div class="pull-left info"> <label>{{unit_name}}</label> ({{unit_type}} {{super_built_up_area}}sqft) </div> <!--<div class="pull-right cost"> 50 lakhs </div>--> </li>');

    CenterBunglowListView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    CenterBunglowListView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = CenterBunglowListView.__super__.serializeData.call(this);
      console.log(unitVariant = bunglowVariantCollection.findWhere({
        'id': this.model.get('unit_variant_id')
      }));
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
          return CommonFloor.navigate('/bunglows/unit-view/' + this.model.get('id'), true);
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

    CenterCompositeView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container"> <div class="controls mapView"> <div class="toggle"> <a href="#/master-view/bunglows" class="map">Map</a><a href="#/list-view/bunglows" class="list active">List</a> </div> </div> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings">buildings</li> <li class="prop-type Villas active">Villas/Bungalows</li> <li class="prop-type Plots">Plots</li> </ul> </div> <div class="legend"> <ul> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> </ul> </div> <div class="villa-list"> <ul class="units"> </ul> </div> </div> </div>');

    CenterCompositeView.prototype.childView = CenterBunglowListView;

    CenterCompositeView.prototype.childViewContainer = '.units';

    CenterCompositeView.prototype.events = {
      'click .buildings': function(e) {
        console.log(this.region = new Marionette.Region({
          el: '#centerregion'
        }));
        return new CommonFloor.CenterBuildingListCtrl({
          region: this.region
        });
      }
    };

    CenterCompositeView.prototype.onShow = function() {
      if (project.get('project_master').front === "") {
        return $('.mapView').hide();
      } else {
        return $('.mapView').show();
      }
    };

    return CenterCompositeView;

  })(Marionette.CompositeView);

  CommonFloor.ListCtrl = (function(superClass) {
    extend(ListCtrl, superClass);

    function ListCtrl() {
      return ListCtrl.__super__.constructor.apply(this, arguments);
    }

    ListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection;
      newUnits = bunglowVariantCollection.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      return this.show(new CenterCompositeView({
        collection: unitsCollection
      }));
    };

    return ListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/bunglow-list-view/villa.list.controller.js.map