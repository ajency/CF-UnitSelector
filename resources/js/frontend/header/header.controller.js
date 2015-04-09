var HeaderView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

HeaderView = (function(superClass) {
  extend(HeaderView, superClass);

  function HeaderView() {
    return HeaderView.__super__.constructor.apply(this, arguments);
  }

  HeaderView.prototype.template = '#header-template';

  HeaderView.prototype.onShow = function() {
    return console.log('view');
  };

  return HeaderView;

})(Marionette.ItemView);

CommonFloor.HeaderCtrl = (function(superClass) {
  extend(HeaderCtrl, superClass);

  function HeaderCtrl() {
    return HeaderCtrl.__super__.constructor.apply(this, arguments);
  }

  HeaderCtrl.prototype.initialize = function(options) {
    console.log("aaaaaaaaa");
    return this.show(new HeaderView());
  };

  return HeaderCtrl;

})(Marionette.RegionController);
