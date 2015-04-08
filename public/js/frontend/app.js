(function() {
  _.extend(Marionette.Application.prototype, {
    appStates: {},
    getCurrentRoute: function() {
      return Backbone.history.getFragment();
    },
    state: function(name, def) {
      if (def == null) {
        def = {};
      }
      this.appStates[name] = def;
      return this;
    },
    _registerStates: function() {
      Marionette.RegionControllers.prototype.controllers = this;
      _.extend(Marionette.AppStates.prototype, {
        appStates: this.appStates
      });
      return this.router = new Marionette.AppStates({
        app: this
      });
    },
    start: function(options) {
      if (options == null) {
        options = {};
      }
      this._detectRegions();
      this.triggerMethod('before:start', options);
      this._registerStates();
      this._initCallbacks.run(options, this);
      return this.triggerMethod('start', options);
    }
  });

  Handlebars.registerHelper('l10n', function(keyword) {
    var i, j, key, lang, len, locale, target;
    lang = navigator.language ? navigator.language : navigator.userLanguage;
    locale = window.locale[lang] || window.locale['en-US'] || window.locale || false;
    if (!locale) {
      return keyword;
    }
    target = locale;
    key = keyword.split(".");
    for (j = 0, len = key.length; j < len; j++) {
      i = key[j];
      target = target[key[i]];
    }
    target = target || keyword;
    return target;
  });

}).call(this);

//# sourceMappingURL=../frontend/app.js.map