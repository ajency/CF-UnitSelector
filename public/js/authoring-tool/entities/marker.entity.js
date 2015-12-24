var Marker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marker = (function(superClass) {
  extend(Marker, superClass);

  function Marker() {
    return Marker.__super__.constructor.apply(this, arguments);
  }

  Marker.prototype.generateMarkerTag = function(item) {
    var circle1, circle2, cx, cy, details, drawMarkerElements, ellipse, ellipseHeight, ellipseWidth, groupMarker, innerRadius, markerType, outerRadius, points, polygon, typeClass;
    markerType = item.other_details.marker_type;
    cx = item.other_details.cx;
    cy = item.other_details.cy;
    innerRadius = item.other_details.innerRadius;
    outerRadius = item.other_details.outerRadius;
    ellipseWidth = item.other_details.ellipseWidth;
    ellipseHeight = item.other_details.ellipseHeight;
    typeClass = item['other_details']['class'];
    points = item.points;
    drawMarkerElements = [];
    groupMarker = draw.group();
    groupMarker.attr({
      "class": 'marker-grp',
      type: item.object_type,
      id: item.object_id,
      svgid: item.id
    });
    if (item.object_type === "amenity") {
      groupMarker.data('amenity-title', item.other_details.title);
      groupMarker.data('amenity-desc', item.other_details.description);
    }
    switch (markerType) {
      case 'concentric':
        groupMarker.addClass('concentric');
        groupMarker.addClass(typeClass);
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
        groupMarker.addClass('solid');
        groupMarker.addClass(typeClass);
        circle1 = draw.circle(innerRadius);
        circle1.attr({
          fill: '#43FFF8',
          cx: points[0],
          cy: points[1]
        });
        circle2 = draw.circle(outerRadius);
        circle2.attr({
          fill: 'none',
          cx: points[0],
          cy: points[1],
          stroke: "#43FFF8",
          'stroke-width': 4,
          'stroke-miterlimit': 10
        });
        drawMarkerElements.push(circle1);
        drawMarkerElements.push(circle2);
        break;
      case 'location':
        window.canvas_type = "locationMarker";
        groupMarker.addClass('location');
        groupMarker.addClass(typeClass);
        polygon = draw.polygon('776.906,408.457 821.094,407 798.01,459.243');
        polygon.attr({
          fill: '#F7931E'
        });
        drawMarkerElements.push(polygon);
        ellipse = draw.ellipse(40, 40);
        ellipse.attr({
          'fill': '#FFFFFF',
          'stroke': '#F7931E',
          'stroke-width': 6,
          'stroke-miterlimit': 10,
          cx: points[0],
          cy: points[1]
        });
        drawMarkerElements.push(ellipse);
        break;
      case 'earthlocation':
        window.canvas_type = "earthlocationMarker";
        groupMarker.addClass('earthlocation');
        details = item.other_details;
        ellipse = draw.ellipse(window.ellipseWidth, window.ellipseHeight);
        ellipse.addClass(typeClass);
        ellipse.attr({
          'fill': '#FF6700',
          'stroke': '#FF7300',
          'stroke-width': 3,
          'fill-opacity': 0.2,
          'stroke-miterlimit': 10,
          cx: points[0],
          cy: points[1]
        });
        drawMarkerElements.push(ellipse);
        break;
    }
    return _.each(drawMarkerElements, (function(_this) {
      return function(markerElement, key) {
        return groupMarker.add(markerElement);
      };
    })(this));
  };

  Marker.prototype.generateLocationMarker = function(item) {
    var details, dx, dy, eCx, eCy, ellipse, groupLocation, pointList, pointsArr, polygon;
    details = item.other_details;
    groupLocation = draw.group();
    groupLocation.attr({
      "class": details['location_marker_class']
    });
    groupLocation.addClass('marker');
    dx = parseInt(details['location_marker_x']);
    dy = parseInt(details['location_marker_y']);
    pointsArr = [];
    pointsArr.push(parseInt(776.906) + dx);
    pointsArr.push(parseInt(408.457) + dy);
    pointsArr.push(parseInt(821.094) + dx);
    pointsArr.push(parseInt(407) + dy);
    pointsArr.push(parseInt(798.01) + dx);
    pointsArr.push(parseInt(459.243) + dy);
    pointList = this.getPointList(pointsArr);
    pointList = pointList.join(' ');
    polygon = draw.polygon(pointList);
    polygon.attr({
      fill: '#F7931E'
    });
    groupLocation.add(polygon);
    ellipse = draw.ellipse(40, 40);
    eCx = 798.696 + dx;
    eCy = 401.52 + dy;
    return ellipse.attr({
      'fill': '#FFFFFF',
      'stroke': '#F7931E',
      'stroke-width': 6,
      'stroke-miterlimit': 10,
      cx: eCx,
      cy: eCy
    });
  };

  Marker.prototype.getPointList = function(pointsArr) {
    var formattedPoints, i, k, l, len, pointList;
    pointList = [];
    i = 0;
    l = pointsArr.length;
    while (i < l) {
      pointList.push([parseInt(pointsArr[i]), parseInt(pointsArr[i + 1])]);
      i += 2;
    }
    formattedPoints = [];
    k = 0;
    len = pointList.length;
    while (k < len) {
      formattedPoints.push(pointList[k].join());
      k++;
    }
    return formattedPoints;
  };

  return Marker;

})(Backbone.Model);

window.marker = new Marker;
