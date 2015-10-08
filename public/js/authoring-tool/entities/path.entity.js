var Path,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Path = (function(superClass) {
  extend(Path, superClass);

  function Path() {
    return Path.__super__.constructor.apply(this, arguments);
  }

  Path.prototype.initialize = function() {
    this.node = "";
    return this.pointList = [];
  };

  Path.prototype.generatePathTag = function(item) {
    var group, path, points;
    points = item.points;
    group = draw.group();
    path = group.path(points);
    path.attr({
      'class': item.other_details["class"],
      'id': item.object_id,
      'type': item.object_type,
      svgid: item.id
    });
    path.addClass('path-type');
    if (item.primary_breakpoint !== null) {
      path.data('primary-breakpoint', item.primary_breakpoint);
    }
    if (item.object_type === "amenity") {
      path.data('amenity-title', item.other_details.title);
      return path.data('amenity-desc', item.other_details.description);
    }
  };

  return Path;

})(Backbone.Model);

window.path = new Path;
