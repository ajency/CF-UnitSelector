(function() {
  var Unit, UnitCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Unit = (function(superClass) {
    extend(Unit, superClass);

    function Unit() {
      return Unit.__super__.constructor.apply(this, arguments);
    }

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

    UnitCollection.prototype.setUnitAttributes = function(project_id) {
      if (this.length === 0) {
        return unitCollection.fetch({
          async: false,
          data: {
            project_id: project_id
          },
          success: (function(_this) {
            return function(collection, response) {
              if (response === 0) {
                return _this.reset();
              }
            };
          })(this)
        });
      }
    };

    return UnitCollection;

  })(Backbone.Collection);

  window.unitCollection = new UnitCollection;

}).call(this);

//# sourceMappingURL=../../frontend/entities/unit.entity.js.map