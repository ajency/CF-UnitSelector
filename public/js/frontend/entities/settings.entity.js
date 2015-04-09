(function() {
  var Settings,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Settings = (function(superClass) {
    extend(Settings, superClass);

    function Settings() {
      return Settings.__super__.constructor.apply(this, arguments);
    }

    Settings.prototype.urlRoot = function() {
      return "http://commonfloor.local/methods/functions.php?action=load_settings";
    };

    Settings.prototype.setSettingsAttributes = function(settingsData, project_id) {
      if (settingsData == null) {
        settingsData = {};
      }
      if (jQuery.isEmptyObject(this.toJSON())) {
        return settings.fetch({
          async: false,
          data: {
            project_id: project_id
          },
          success: (function(_this) {
            return function(collection, response) {
              if (response === 0) {
                return _this.reset();
              }
            };
          })(this)
        });
      }
    };

    return Settings;

  })(Backbone.Model);

  window.settings = new Settings;

}).call(this);

//# sourceMappingURL=../../frontend/entities/settings.entity.js.map