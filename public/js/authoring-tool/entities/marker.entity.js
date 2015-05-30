(function() {
  var Marker,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Marker = (function(superClass) {
    extend(Marker, superClass);

    function Marker() {
      return Marker.__super__.constructor.apply(this, arguments);
    }

    Marker.prototype.initialize = function() {
      this.node = "";
      return this.pointList = [];
    };

    Marker.prototype.createMarkerGroup = function() {
      return this.node = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    };

    Marker.prototype.createMarkerTag = function(item) {
      var markerType;
      console.log(item);
      this.createMarkerGroup();
      return markerType = item.other_details.marker_type;
    };

    return Marker;

  })(Backbone.Model);

  window.marker = new Marker;

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/marker.entity.js.map