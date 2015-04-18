(function() {
  var FloorLayout, FloorLayoutCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  FloorLayout = (function(superClass) {
    extend(FloorLayout, superClass);

    function FloorLayout() {
      return FloorLayout.__super__.constructor.apply(this, arguments);
    }

    return FloorLayout;

  })(Backbone.Model);

  FloorLayoutCollection = (function(superClass) {
    extend(FloorLayoutCollection, superClass);

    function FloorLayoutCollection() {
      return FloorLayoutCollection.__super__.constructor.apply(this, arguments);
    }

    FloorLayoutCollection.prototype.model = FloorLayout;

    FloorLayoutCollection.prototype.setFloorLayoutAttributes = function(data) {
      return floorLayoutCollection.reset(data);
    };

    return FloorLayoutCollection;

  })(Backbone.Collection);

  window.floorLayoutCollection = new FloorLayoutCollection;

}).call(this);

//# sourceMappingURL=../../frontend/entities/floor.layout.entity.js.map