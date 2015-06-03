(function() {
  var Polygon,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Polygon = (function(superClass) {
    extend(Polygon, superClass);

    function Polygon() {
      return Polygon.__super__.constructor.apply(this, arguments);
    }

    Polygon.prototype.initialize = function() {
      this.node = "";
      return this.pointList = [];
    };

    Polygon.prototype.createPolgyon = function() {
      return this.node = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    };

    Polygon.prototype.createPolgyonTag = function(item) {
      console.log(item.other_details["class"]);
      this.pointList = [];
      this.createPolgyon();
      this.points(item.points);
      this.attribute('class', item.other_details["class"]);
      this.attribute('id', item.object_id);
      this.attribute('type', item.object_type);
      return this.node;
    };

    Polygon.prototype.generatePolygonTag = function(item) {
      var pointList, polygon;
      pointList = this.getPointList(item.points);
      pointList = pointList.join(' ');
      polygon = draw.polygon(pointList);
      polygon.attr({
        'class': item.other_details["class"],
        'id': item.object_id,
        'type': item.object_type,
        svgid: item.id
      });
      if (item.primary_breakpoint !== null) {
        polygon.data('primary-breakpoint', item.primary_breakpoint);
      }
      if (item.object_type === "amenity") {
        polygon.data('amenity-title', item.other_details.title);
        return polygon.data('amenity-desc', item.other_details.description);
      }
    };

    Polygon.prototype.getPointList = function(pointsArr) {
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

    Polygon.prototype.attribute = function(key, val) {
      if (val === void 0) {
        return false;
      }
      return this.node.setAttribute(key, val);
    };

    Polygon.prototype.build = function(arg) {
      var i, l, res;
      res = [];
      i = 0;
      l = arg.length;
      while (i < l) {
        res.push(arg[i].join(','));
        i++;
      }
      return res.join(' ');
    };

    Polygon.prototype.points = function(args) {
      var i, l;
      i = 0;
      l = args.length;
      while (i < l) {
        this.pointList.push([args[i], args[i + 1]]);
        i += 2;
      }
      this.attribute('points', this.build(this.pointList));
      return this.node;
    };

    return Polygon;

  })(Backbone.Model);

  window.polygon = new Polygon;

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/polygon.entity.js.map