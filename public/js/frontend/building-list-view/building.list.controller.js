(function() {
  var CenterBuildingListView, CenterItemView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CenterItemView = (function(superClass) {
    extend(CenterItemView, superClass);

    function CenterItemView() {
      return CenterItemView.__super__.constructor.apply(this, arguments);
    }

    CenterItemView.prototype.template = Handlebars.compile('<li class="bldg blocks {{status}}"> <div class="bldg-img"></div> <div class="info"> <h2 class="m-b-5">{{name}}</h2> <!--<div>Starting from Rs.<span>50 lakhs</span></div> <div>No. of Floors: <span>45</span></div>--> </div> <div class="clearfix"></div> <div class="unit-type-info"> <ul> {{#types}} <li> {{name}}: <span>{{units}}</span> </li> {{/types}} </ul> </div> </li>');

    CenterItemView.prototype.serializeData = function() {
      var data, id, response, types;
      data = CenterItemView.__super__.serializeData.call(this);
      id = this.model.get('id');
      response = building.getUnitTypes(id);
      types = [];
      $.each(response, function(ind, val) {
        var unitTypeModel, units, variants;
        unitTypeModel = unitTypeCollection.findWhere({
          'id': val
        });
        variants = apartmentVariantCollection.where({
          'unit_type_id': val
        });
        units = [];
        $.each(variants, function(index, value) {
          var unitsColl;
          unitsColl = unitCollection.where({
            'unit_variant_id': value.get('id')
          });
          return $.merge(units, unitsColl);
        });
        return types.push({
          'name': unitTypeModel.get('name'),
          'units': units.length
        });
      });
      data.types = types;
      return data;
    };

    return CenterItemView;

  })(Marionette.ItemView);

  CenterBuildingListView = (function(superClass) {
    extend(CenterBuildingListView, superClass);

    function CenterBuildingListView() {
      return CenterBuildingListView.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingListView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container"> <div class="controls mapView"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings active">buildings</li> <li class="prop-type Villas hidden">Villas/Bungalows</li> <li class="prop-type Plots hidden">Plots</li> </ul> </div> <div class="bldg-list"> <ul class="units"> </ul> <div class="clearfix"></div> </div> </div> </div>');

    CenterBuildingListView.prototype.childView = CenterItemView;

    CenterBuildingListView.prototype.childViewContainer = '.units';

    CenterBuildingListView.prototype.events = {
      'click .buildings': function(e) {
        var data, units;
        units = apartmentVariantCollection.getApartmentUnits();
        data = {};
        data.units = units;
        data.type = 'building';
        console.log(this.region = new Marionette.Region({
          el: '#centerregion'
        }));
        new CommonFloor.CenterBuildingListCtrl({
          region: this.region
        });
        return CommonFloor.BunglowListCtrl.prototype.trigger("load:units", data);
      },
      'click .Villas': function(e) {
        var data, units;
        units = bunglowVariantCollection.getBunglowUnits();
        data = {};
        data.units = units;
        data.type = 'villa';
        console.log(this.region = new Marionette.Region({
          el: '#centerregion'
        }));
        new CommonFloor.ListCtrl({
          region: this.region
        });
        return CommonFloor.BunglowListCtrl.prototype.trigger("load:units", data);
      }
    };

    CenterBuildingListView.prototype.onShow = function() {
      if (project.get('project_master').front === "") {
        $('.mapView').hide();
      } else {
        $('.mapView').show();
      }
      if (apartmentVariantCollection.length !== 0) {
        return $('.buildings').removeClass('hidden');
      }
    };

    return CenterBuildingListView;

  })(Marionette.CompositeView);

  CommonFloor.CenterBuildingListCtrl = (function(superClass) {
    extend(CenterBuildingListCtrl, superClass);

    function CenterBuildingListCtrl() {
      return CenterBuildingListCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingListCtrl.prototype.initialize = function() {
      return this.show(new CenterBuildingListView({
        collection: buildingCollection
      }));
    };

    return CenterBuildingListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-list-view/building.list.controller.js.map