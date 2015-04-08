(function() {
  var HeaderView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  HeaderView = (function(superClass) {
    extend(HeaderView, superClass);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.template = '<li>hello</li>';

    HeaderView.prototype.onShow = function() {
      return console.log('view');
    };

    return HeaderView;

  })(Marionette.ItemView);

}).call(this);

//# sourceMappingURL=../../frontend/header/header.view.js.map