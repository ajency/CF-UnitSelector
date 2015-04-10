(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.NothingFoundView = (function(superClass) {
    extend(NothingFoundView, superClass);

    function NothingFoundView() {
      return NothingFoundView.__super__.constructor.apply(this, arguments);
    }

    NothingFoundView.prototype.template = '#noFound-template';

    return NothingFoundView;

  })(Marionette.ItemView);

  CommonFloor.NothingFoundCtrl = (function(superClass) {
    extend(NothingFoundCtrl, superClass);

    function NothingFoundCtrl() {
      return NothingFoundCtrl.__super__.constructor.apply(this, arguments);
    }

    NothingFoundCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.NothingFoundView);
    };

    return NothingFoundCtrl;

  })(Marionette.RegionController);

  CommonFloor.loadJSONData = function() {
    return $.ajax({
      type: 'GET',
      url: BASERESTURL + '/project/' + PROJECTID + '/step_one',
      async: false,
      sucess: function(response) {
        bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants);
        settings.setSettingsAttributes(response.settings);
        unitCollection.setUnitAttributes(response.units);
        unitTypeCollection.setUnitTypeAttributes(response.unit_types);
        return CommonFloor.checkProjectType();
      },
      error: function(response) {
        return console.log("aaaaaaaaaaassdff");
      }
    });
  };

  CommonFloor.checkProjectType = function() {
    var Router, controller;
    Router = [];
    bunglowVariantCollection.each(function(model) {
      var bunglowUnits;
      bunglowUnits = unitCollection.where({
        unit_variant: model.get('id')
      });
      return Router.push({
        'name': 'bunglows',
        'count': bunglowUnits.length
      });
    });
    controller = _.max(Router, function(item) {
      return parseInt(item.count);
    });
    console.log(controller);
    return CommonFloor.navigate('#/master-view/' + this.model.get('id') + '/bunglows', true);
  };

}).call(this);

//# sourceMappingURL=../../frontend/common/common.js.map