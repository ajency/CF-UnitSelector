(function() {
  var Settings,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Settings = (function(superClass) {
    extend(Settings, superClass);

    function Settings() {
      return Settings.__super__.constructor.apply(this, arguments);
    }

    Settings.prototype.setSettingsAttributes = function(data) {
      return settings.set(data);
    };

    return Settings;

  })(Backbone.Model);

  window.settings = new Settings;

}).call(this);

//# sourceMappingURL=../../frontend/entities/settings.entity.js.map