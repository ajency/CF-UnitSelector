(function() {
  var LeftBunglowListView, TopBunglowListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.BunglowListView = (function(superClass) {
    extend(BunglowListView, superClass);

    function BunglowListView() {
      return BunglowListView.__super__.constructor.apply(this, arguments);
    }

    BunglowListView.prototype.template = '#project-view-template';

    return BunglowListView;

  })(Marionette.LayoutView);

  CommonFloor.BunglowListCtrl = (function(superClass) {
    extend(BunglowListCtrl, superClass);

    function BunglowListCtrl() {
      return BunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    BunglowListCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.BunglowListView);
    };

    return BunglowListCtrl;

  })(Marionette.RegionController);

  TopBunglowListView = (function(superClass) {
    extend(TopBunglowListView, superClass);

    function TopBunglowListView() {
      return TopBunglowListView.__super__.constructor.apply(this, arguments);
    }

    TopBunglowListView.prototype.template = Handlebars.Compile('<div></div>');

    return TopBunglowListView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowListCtrl = (function(superClass) {
    extend(TopBunglowListCtrl, superClass);

    function TopBunglowListCtrl() {
      return TopBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowListCtrl.prototype.initialize = function() {
      return this.show(new TopBunglowListView);
    };

    return TopBunglowListCtrl;

  })(Marionette.RegionController);

  LeftBunglowListView = (function(superClass) {
    extend(LeftBunglowListView, superClass);

    function LeftBunglowListView() {
      return LeftBunglowListView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowListView.prototype.template = Handlebars.Compile('<div></div>');

    return LeftBunglowListView;

  })(Marionette.ItemView);

  CommonFloor.LeftBunglowListCtrl = (function(superClass) {
    extend(LeftBunglowListCtrl, superClass);

    function LeftBunglowListCtrl() {
      return LeftBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowListCtrl.prototype.initialize = function() {
      return this.show(new LeftBunglowListView);
    };

    return LeftBunglowListCtrl;

  })(Marionette.RegionController);

  TopBunglowListView = (function(superClass) {
    extend(TopBunglowListView, superClass);

    function TopBunglowListView() {
      return TopBunglowListView.__super__.constructor.apply(this, arguments);
    }

    TopBunglowListView.prototype.template = Handlebars.Compile('<div></div>');

    return TopBunglowListView;

  })(Marionette.ItemView);

  CommonFloor.CenterBunglowListCtrl = (function(superClass) {
    extend(CenterBunglowListCtrl, superClass);

    function CenterBunglowListCtrl() {
      return CenterBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowListCtrl.prototype.initialize = function() {
      return this.show(new CenterBunglowListView);
    };

    return CenterBunglowListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/villa-list-view/bunglow.list.controller.js.map