(function() {
  var Unit, UnitCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Unit = (function(superClass) {
    extend(Unit, superClass);

    function Unit() {
      return Unit.__super__.constructor.apply(this, arguments);
    }

    Unit.prototype.getUnitDetails = function(unit_id) {
      var id, unit, unitType, unitVariant;
      id = parseInt(unit_id);
      unit = unitCollection.findWhere({
        id: id
      });
      unitVariant = bunglowVariantCollection.findWhere({
        'id': unit.get('unit_variant_id')
      });
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      return [unitVariant, unitType];
    };

    return Unit;

  })(Backbone.Model);

  UnitCollection = (function(superClass) {
    extend(UnitCollection, superClass);

    function UnitCollection() {
      return UnitCollection.__super__.constructor.apply(this, arguments);
    }

    UnitCollection.prototype.model = Unit;

    UnitCollection.prototype.url = function() {
      return "http://commonfloor.local/methods/functions.php?action=load_units";
    };

    UnitCollection.prototype.setUnitAttributes = function(data) {
      return unitCollection.reset(data);
    };

    return UnitCollection;

  })(Backbone.Collection);

  window.unitCollection = new UnitCollection;

  window.unit = new Unit;

}).call(this);

//# sourceMappingURL=../../frontend/entities/unit.entity.js.map