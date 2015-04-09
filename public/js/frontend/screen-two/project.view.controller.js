(function() {
  var CenterMasterView, LeftMasterView, TopMasterView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ProjectMasterViewLayout = (function(superClass) {
    extend(ProjectMasterViewLayout, superClass);

    function ProjectMasterViewLayout() {
      return ProjectMasterViewLayout.__super__.constructor.apply(this, arguments);
    }

    ProjectMasterViewLayout.prototype.template = '#project-view-template';

    return ProjectMasterViewLayout;

  })(Marionette.LayoutView);

  CommonFloor.ProjectMasterViewCtrl = (function(superClass) {
    extend(ProjectMasterViewCtrl, superClass);

    function ProjectMasterViewCtrl() {
      return ProjectMasterViewCtrl.__super__.constructor.apply(this, arguments);
    }

    ProjectMasterViewCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
      }
      window.loadJSONData();
      return this.show(new CommonFloor.ProjectMasterViewLayout);
    };

    return ProjectMasterViewCtrl;

  })(Marionette.RegionController);

  TopMasterView = (function(superClass) {
    extend(TopMasterView, superClass);

    function TopMasterView() {
      return TopMasterView.__super__.constructor.apply(this, arguments);
    }

    TopMasterView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1>We are now at Artha Zen\'s upcoming project having 50 villa\'s</h1> </div> </div> </div>');

    return TopMasterView;

  })(Marionette.ItemView);

  CommonFloor.TopMasterCtrl = (function(superClass) {
    extend(TopMasterCtrl, superClass);

    function TopMasterCtrl() {
      return TopMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopMasterCtrl.prototype.initialize = function() {
      return this.show(new TopMasterView);
    };

    return TopMasterCtrl;

  })(Marionette.RegionController);

  LeftMasterView = (function(superClass) {
    extend(LeftMasterView, superClass);

    function LeftMasterView() {
      return LeftMasterView.__super__.constructor.apply(this, arguments);
    }

    LeftMasterView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="advncd-filter-wrp"> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div> <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6 class="sold">V1001</h6> </div> <div class="col-sm-4"> <h6 class="">3BHK</h6> </div> <div class="col-sm-4"> <h6 class="">1460sqft</h6> </div> </div> </div> <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6 class="available">V1002</h6> </div> <div class="col-sm-4"> <h6 class="">3BHK</h6> </div> <div class="col-sm-4"> <h6 class="">1460sqft</h6> </div> </div> </div> </div> </div>');

    return LeftMasterView;

  })(Marionette.ItemView);

  CommonFloor.LeftMasterCtrl = (function(superClass) {
    extend(LeftMasterCtrl, superClass);

    function LeftMasterCtrl() {
      return LeftMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftMasterCtrl.prototype.initialize = function() {
      return this.show(new LeftMasterView);
    };

    return LeftMasterCtrl;

  })(Marionette.RegionController);

  CenterMasterView = (function(superClass) {
    extend(CenterMasterView, superClass);

    function CenterMasterView() {
      return CenterMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterMasterView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area"> <img src="../../images/map2.png"> </div> </div>');

    return CenterMasterView;

  })(Marionette.ItemView);

  CommonFloor.CenterMasterCtrl = (function(superClass) {
    extend(CenterMasterCtrl, superClass);

    function CenterMasterCtrl() {
      return CenterMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterMasterCtrl.prototype.initialize = function() {
      return this.show(new CenterMasterView);
    };

    return CenterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/screen-two/project.view.controller.js.map