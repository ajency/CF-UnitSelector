(function() {
  var Settings,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Settings = (function(superClass) {
    extend(Settings, superClass);

    function Settings() {
      return Settings.__super__.constructor.apply(this, arguments);
    }

    Settings.prototype.generateFloorRise = function(building) {
      var buildingModel, cost, floorrise, floors, i, sum;
      if (building === "") {
        return;
      }
      buildingModel = buildingMasterCollection.findWhere({
        'id': building
      });
      i = 0;
      floors = buildingModel.get('floors');
      floors = Object.keys(floors).length;
      floorrise = [];
      cost = settings.get('floor_rise');
      sum = 0 + cost;
      while (i < 1) {
        floorrise[i] = 0;
        i++;
      }
      while (i <= floors) {
        floorrise[i] = sum;
        sum = sum + cost;
        i++;
      }
      return floorrise;
    };

    Settings.prototype.setSettingsAttributes = function(data) {
      return settings.set(data);
    };

    return Settings;

  })(Backbone.Model);

  window.settings = new Settings;

}).call(this);

//# sourceMappingURL=../../frontend/entities/settings.entity.js.map