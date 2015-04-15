(function() {
  var BuildingMasterView,
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

}).call(this);

//# sourceMappingURL=../../frontend/building-master-view/building.master.controller.js.map