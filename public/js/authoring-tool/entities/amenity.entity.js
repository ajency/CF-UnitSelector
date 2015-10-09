var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AuthoringTool.AmenityView = (function(superClass) {
  extend(AmenityView, superClass);

  function AmenityView() {
    return AmenityView.__super__.constructor.apply(this, arguments);
  }

  AmenityView.prototype.template = Handlebars.compile('<form id="add-form"> <div class="form-group"> <label for="markerTitle">Title</label> <input type="text" class="form-control" id="amenity-title"> </div> <div class="form-group"> <label for="Description">Description</label> <textarea class="form-control" rows="3" id="amenity-description"></textarea> </div> </form>');

  return AmenityView;

})(Marionette.ItemView);

AuthoringTool.AmenityCtrl = (function(superClass) {
  extend(AmenityCtrl, superClass);

  function AmenityCtrl() {
    return AmenityCtrl.__super__.constructor.apply(this, arguments);
  }

  AmenityCtrl.prototype.initialize = function(opts) {
    return this.show(new AuthoringTool.AmenityView);
  };

  return AmenityCtrl;

})(Marionette.RegionController);
