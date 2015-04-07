(function() {
  _.extend(Marionette.Application.prototype, {
    appStates: {
      'header': {
        url: '/'
      },
      'project': {
        url: '/project',
        parent: 'header',
        sections: {
          'top': {
            ctrl: 'TopCtrl'
          },
          'left': {
            ctrl: 'LeftCtrl'
          }
        }
      }
    },
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
        app: CommonFloor
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

}).call(this);

//# sourceMappingURL=../frontend/app.js.map