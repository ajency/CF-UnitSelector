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
      console.log(item.details["class"]);
      this.pointList = [];
      this.createPolgyon();
      this.points(item.points);
      this.attribute('class', item.details["class"]);
      this.attribute('id', item.id);
      return this.node;
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