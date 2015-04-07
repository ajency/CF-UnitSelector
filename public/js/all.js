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

  TopView.prototype.template = '<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="tab-main-container"> <div class="blck-wrap"> <h4><strong>Project by</strong></h4> <img src="../../images/artha_logo.png" class="img-responsive builder-logo"> </div> <div class="blck-wrap"> <h4><strong>Project Details</strong></h4> <div class="proj-details"> <p> Bannerghatta Road, Bangalore, Karnataka, India </p> <div class="detail-pts"> <p> <span>Project Type:</span> Villa </p> <p> <span>BHK Area Range:</span> 1881 - 4780 Sq.Ft. </p> <p> <span>BHK Type:</span> 3BHK / 4BHK </p> <p> <span>Price Range:</span> 1.25 Crores - 2.85 Crores </p> <p> <span>Project Status:</span> Under Construction </p> </div> </div> </div> <div class="blck-wrap"> <div class="text-center"> <img src="../../images/marker-img.png" class="img-responsive marker-img"> Know your neighborhood. The orange markers are important landmarks. Click for more information. </div> </div> </div> </div> </div> <div class="col-md-9 us-right-content"> <div class="svg-area"> <img src="../../images/map1.png"> </div> </div>';

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

  LeftView.prototype.template = '<div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1>Explore Artha Zen Villa\'s</h1> </div> </div>';

  LeftView.prototype.className = 'row';

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