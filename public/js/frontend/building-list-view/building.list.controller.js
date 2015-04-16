(function() {
  var CenterBuildingListView, CenterItemView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CenterItemView = (function(superClass) {
    extend(CenterItemView, superClass);

    function CenterItemView() {
      return CenterItemView.__super__.constructor.apply(this, arguments);
    }

    CenterItemView.prototype.template = Handlebars.compile('<li class="bldg blocks {{status}}"> <div class="bldg-img"></div> <div class="info"> <h2 class="m-b-5">{{name}}</h2> <div>Starting from Rs.<span>50 lakhs</span></div> <div>No. of Floors: <span>45</span></div> </div> <div class="clearfix"></div> <div class="unit-type-info"> <ul> <li> 2BHK: <span>30</span> </li> <li> 3BHK: <span>40</span> </li> <li> 4BHK: <span>50</span> </li> </ul> </div> </li>');

    CenterItemView.prototype.events = {
      'mouseover': function(e) {
        var id, response, types;
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
        return console.log(types);
      }
    };

    return CenterItemView;

  })(Marionette.ItemView);

  CenterBuildingListView = (function(superClass) {
    extend(CenterBuildingListView, superClass);

    function CenterBuildingListView() {
      return CenterBuildingListView.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingListView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content"> <div class="list-view-container"> <!--<div class="controls"> <div > <a href="#/List-view/bunglows"> Map View</a> |<a href="#/list-view/bunglows">List View</a> </div> <div class="clearfix"></div> </div>--> <div class="bldg-list"> <ul class="units"> </ul> <div class="clearfix"></div> </div> </div> </div>');

    CenterBuildingListView.prototype.childView = CenterItemView;

    CenterBuildingListView.prototype.childViewContainer = '.units';

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