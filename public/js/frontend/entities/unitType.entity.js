(function() {
  var UnitType, UnitTypeCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  UnitType = (function(superClass) {
    extend(UnitType, superClass);

    function UnitType() {
      return UnitType.__super__.constructor.apply(this, arguments);
    }

    return UnitType;

  })(Backbone.Model);

  UnitTypeCollection = (function(superClass) {
    extend(UnitTypeCollection, superClass);

    function UnitTypeCollection() {
      return UnitTypeCollection.__super__.constructor.apply(this, arguments);
    }

    UnitTypeCollection.prototype.model = UnitType;

    UnitTypeCollection.prototype.setUnitTypeAttributes = function(data) {
      unitTypeCollection.reset(data);
      return unitTypeMasterCollection.reset(data);
    };

    return UnitTypeCollection;

  })(Backbone.Collection);

  window.unitTypeCollection = new UnitTypeCollection;

  window.unitTypeMasterCollection = new UnitTypeCollection;

}).call(this);

//# sourceMappingURL=../../frontend/entities/unitType.entity.js.map