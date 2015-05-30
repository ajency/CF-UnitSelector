(function() {
  var Marker,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Marker = (function(superClass) {
    extend(Marker, superClass);

    function Marker() {
      return Marker.__super__.constructor.apply(this, arguments);
    }

    Marker.prototype.generateMarkerTag = function(item) {
      var circle, circle1, circle2, cx, cy, drawMarkerElements, groupMarker, innerRadius, markerType, outerRadius, points;
      markerType = item.other_details.marker_type;
      cx = item.other_details.cx;
      cy = item.other_details.cy;
      innerRadius = item.other_details.innerRadius;
      outerRadius = item.other_details.outerRadius;
      points = item.points;
      drawMarkerElements = [];
      groupMarker = draw.group();
      switch (markerType) {
        case 'concentric':
          groupMarker.attr({
            "class": 'marker-grp',
            id: item.object_id
          });
          circle1 = draw.circle(innerRadius);
          circle1.attr({
            fill: '#FF8500',
            cx: points[0],
            cy: points[1]
          });
          circle2 = draw.circle(outerRadius);
          circle2.attr({
            fill: 'none',
            cx: points[0],
            cy: points[1],
            stroke: "#FF7900",
            'stroke-width': 4,
            'stroke-miterlimit': 10
          });
          drawMarkerElements.push(circle1);
          drawMarkerElements.push(circle2);
          break;
        case 'solid':
          window.canvas_type = "solidMarker";
          groupMarker.attr({
            "class": 'marker-grp'
          });
          circle = draw.circle(outerRadius);
          circle.attr({
            fill: '#F7931E',
            cx: points[0],
            cy: points[1]
          });
          drawMarkerElements.push(circle);
          break;
      }
      return _.each(drawMarkerElements, (function(_this) {
        return function(markerElement, key) {
          return groupMarker.add(markerElement);
        };
      })(this));
    };

    return Marker;

  })(Backbone.Model);

  window.marker = new Marker;

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/marker.entity.js.map