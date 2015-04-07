_.extend(Marionette.Application.prototype, {
  appStates: {
    'header': {
      url: '/'
    },
    'project': {
      url: 'project',
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

jQuery(document).ready(function($) {});

CommonFloor.addInitializer(function() {
  return Backbone.history.start();
});

CommonFloor.start();



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

var LeftView, ProjectLayoutView, TopView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ProjectLayoutView = (function(superClass) {
  extend(ProjectLayoutView, superClass);

  function ProjectLayoutView() {
    return ProjectLayoutView.__super__.constructor.apply(this, arguments);
  }

  ProjectLayoutView.prototype.template = '#project-template';

  return ProjectLayoutView;

})(Marionette.LayoutView);

CommonFloor.ProjectCtrl = (function(superClass) {
  extend(ProjectCtrl, superClass);

  function ProjectCtrl() {
    return ProjectCtrl.__super__.constructor.apply(this, arguments);
  }

  ProjectCtrl.prototype.initialize = function() {
    console.log("aaaaaaaa");
    return this.show(new ProjectLayoutView);
  };

  return ProjectCtrl;

})(Marionette.RegionController);

TopView = (function(superClass) {
  extend(TopView, superClass);

  function TopView() {
    return TopView.__super__.constructor.apply(this, arguments);
  }

  TopView.prototype.template = '<li>top</li>';

  return TopView;

})(Marionette.ItemView);

CommonFloor.TopCtrl = (function(superClass) {
  extend(TopCtrl, superClass);

  function TopCtrl() {
    return TopCtrl.__super__.constructor.apply(this, arguments);
  }

  TopCtrl.prototype.initialize = function() {
    return this.show(new TopView);
  };

  return TopCtrl;

})(Marionette.RegionController);

LeftView = (function(superClass) {
  extend(LeftView, superClass);

  function LeftView() {
    return LeftView.__super__.constructor.apply(this, arguments);
  }

  LeftView.prototype.template = '<li>left</li>';

  return LeftView;

})(Marionette.ItemView);

CommonFloor.LeftCtrl = (function(superClass) {
  extend(LeftCtrl, superClass);

  function LeftCtrl() {
    return LeftCtrl.__super__.constructor.apply(this, arguments);
  }

  LeftCtrl.prototype.initialize = function() {
    return this.show(new LeftView);
  };

  return LeftCtrl;

})(Marionette.RegionController);

//# sourceMappingURL=all.js.map