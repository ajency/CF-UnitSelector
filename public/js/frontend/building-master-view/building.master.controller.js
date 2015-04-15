(function() {
  var BuildingMasterView, CenterBuildingMasterCtrl, CenterBuildingMasterView, CenterItemView, LeftBuildingMasterCtrl, LeftBuildingMasterView, TopBuildingMasterCtrl, TopBuildingMasterView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BuildingMasterView = (function(superClass) {
    extend(BuildingMasterView, superClass);

    function BuildingMasterView() {
      return BuildingMasterView.__super__.constructor.apply(this, arguments);
    }

    BuildingMasterView.prototype.template = '#building-master';

    return BuildingMasterView;

  })(Marionette.LayoutView);

  CommonFloor.BuildingMasterCtrl = (function(superClass) {
    extend(BuildingMasterCtrl, superClass);

    function BuildingMasterCtrl() {
      return BuildingMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    BuildingMasterCtrl.prototype.initialize = function() {
      return this.show(new BuildingMasterView);
    };

    return BuildingMasterCtrl;

  })(Marionette.RegionController);

  TopBuildingMasterView = (function(superClass) {
    extend(TopBuildingMasterView, superClass);

    function TopBuildingMasterView() {
      return TopBuildingMasterView.__super__.constructor.apply(this, arguments);
    }

    TopBuildingMasterView.prototype.template = '#building-master';

    return TopBuildingMasterView;

  })(Marionette.ItemView);

  TopBuildingMasterCtrl = (function(superClass) {
    extend(TopBuildingMasterCtrl, superClass);

    function TopBuildingMasterCtrl() {
      return TopBuildingMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBuildingMasterCtrl.prototype.initialize = function() {
      return this.show(new TopBuildingMasterView);
    };

    return TopBuildingMasterCtrl;

  })(Marionette.RegionController);

  LeftBuildingMasterView = (function(superClass) {
    extend(LeftBuildingMasterView, superClass);

    function LeftBuildingMasterView() {
      return LeftBuildingMasterView.__super__.constructor.apply(this, arguments);
    }

    LeftBuildingMasterView.prototype.template = '#building-master';

    return LeftBuildingMasterView;

  })(Marionette.ItemView);

  LeftBuildingMasterCtrl = (function(superClass) {
    extend(LeftBuildingMasterCtrl, superClass);

    function LeftBuildingMasterCtrl() {
      return LeftBuildingMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBuildingMasterCtrl.prototype.initialize = function() {
      return this.show(new LeftBuildingMasterView);
    };

    return LeftBuildingMasterCtrl;

  })(Marionette.RegionController);

  CenterItemView = (function(superClass) {
    extend(CenterItemView, superClass);

    function CenterItemView() {
      return CenterItemView.__super__.constructor.apply(this, arguments);
    }

    CenterItemView.prototype.template = '';

    CenterItemView.prototype.events = {
      'mouseover': function(e) {
        var id, response, types;
        id = this.model.get('id');
        response = this.getUnitTypes(id);
        types = [];
        $.each(response, function(ind, val) {
          var unitTypeModel, units, variants;
          unitTypeModel = unitTypeCollection.findWhere({
            'id': val
          });
          variants = apartmentVariants.where({
            'unit_type_id': val
          });
          units = [];
          $.each(variants, function(index, value) {
            var unitsColl;
            unitsColl = unitCollection.where({
              'unit_variant_id': value
            });
            return $.merge(units, unitsColl);
          });
          return types.push({
            'name': unitTypeModel.gt('name'),
            'untis': units.length
          });
        });
        return console.log(types);
      }
    };

    CenterItemView.prototype.getUnitTypes = function(id) {
      var unitTypes, units, variants;
      units = unitCollection.where({
        'building_id': this.model.get('id')
      });
      variants = units.pluck("unit_variant_id");
      unitTypes = [];
      $.each(variants, function(index, value) {
        var varinatModel;
        varinatModel = apartmentVariants.findWhere({
          'id': value
        });
        return unitTypes.push(varinatModel.get('unit_type_id'));
      });
      unitTypes = _.uniq(unitTypes);
      return unitTypes;
    };

    return CenterItemView;

  })(Marionette.ItemView);

  CenterBuildingMasterView = (function(superClass) {
    extend(CenterBuildingMasterView, superClass);

    function CenterBuildingMasterView() {
      return CenterBuildingMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingMasterView.prototype.template = '#building-master';

    CenterBuildingMasterView.prototype.childView = CenterItemView;

    CenterBuildingMasterView.prototype.childViewContainer = '';

    return CenterBuildingMasterView;

  })(Marionette.CompositeView);

  CenterBuildingMasterCtrl = (function(superClass) {
    extend(CenterBuildingMasterCtrl, superClass);

    function CenterBuildingMasterCtrl() {
      return CenterBuildingMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBuildingMasterCtrl.prototype.initialize = function() {
      return this.show(new CenterBuildingMasterView({
        collection: buildingCollection
      }));
    };

    return CenterBuildingMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-master-view/building.master.controller.js.map