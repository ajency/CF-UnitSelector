(function() {
  var CenterView, LeftView, TopView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ProjectLayoutView = (function(superClass) {
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
      var id, region;
      id = PROJECTID;
      project.setProjectAttributes(id);
      if (jQuery.isEmptyObject(project.toJSON())) {
        region = new Marionette.Region({
          el: '#noFound-template'
        });
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.ProjectLayoutView);
      }
    };

    return ProjectCtrl;

  })(Marionette.RegionController);

  TopView = (function(superClass) {
    extend(TopView, superClass);

    function TopView() {
      return TopView.__super__.constructor.apply(this, arguments);
    }

    TopView.prototype.template = Handlebars.compile('<div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1>Explore {{project_title}}\'s</h1> <div class="pull-right"> <div class="toggle_radio"> <input type="radio" checked class="toggle_option" id="first_toggle" name="toggle_option"> <input type="radio" class="toggle_option" id="second_toggle" name="toggle_option"> <input type="radio" class="toggle_option" id="third_toggle" name="toggle_option"> <label for="first_toggle"><p>Morning</p></label> <label for="second_toggle"><p>Afternoon</p></label> <label for="third_toggle"><p>Evening</p></label> <div class="toggle_option_slider"> </div> </div> </div> <div class="clearfix"></div> </div> </div>');

    TopView.prototype.className = 'row';

    return TopView;

  })(Marionette.ItemView);

  CommonFloor.TopCtrl = (function(superClass) {
    extend(TopCtrl, superClass);

    function TopCtrl() {
      return TopCtrl.__super__.constructor.apply(this, arguments);
    }

    TopCtrl.prototype.initialize = function() {
      return this.show(new TopView({
        model: project
      }));
    };

    return TopCtrl;

  })(Marionette.RegionController);

  LeftView = (function(superClass) {
    extend(LeftView, superClass);

    function LeftView() {
      return LeftView.__super__.constructor.apply(this, arguments);
    }

    LeftView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="tab-main-container"> <div class="blck-wrap"> <h4><strong>Project by</strong></h4> <img src="{{logo}}" class="img-responsive builder-logo"> </div> <div class="blck-wrap"> <h4><strong>Project Details</strong></h4> <div class="proj-details"> <p> Bannerghatta Road, Bangalore, Karnataka, India </p> <div class="detail-pts"> <p> <span>Project Type:</span> {{property_types}} </p> <p> <span>BHK Area Range:</span> 1881 - 4780 Sq.Ft. </p> <p> <span>BHK Type:</span> 3BHK / 4BHK </p> <p> <span>Price Range:</span> 1.25 Crores - 2.85 Crores </p> <p> <span>Project Status:</span> Under Construction </p> </div> </div> </div> <div class="blck-wrap"> <div class="text-center"> <img src="../images/marker-img.png" class="img-responsive marker-img"> Know your neighborhood. The orange markers are important landmarks. Click for more information. </div> </div> </div> </div> </div>');

    return LeftView;

  })(Marionette.ItemView);

  CommonFloor.LeftCtrl = (function(superClass) {
    extend(LeftCtrl, superClass);

    function LeftCtrl() {
      return LeftCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftCtrl.prototype.initialize = function() {
      return this.show(new LeftView({
        model: project
      }));
    };

    return LeftCtrl;

  })(Marionette.RegionController);

  CenterView = (function(superClass) {
    extend(CenterView, superClass);

    function CenterView() {
      return CenterView.__super__.constructor.apply(this, arguments);
    }

    CenterView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area"> <img id="svg_project" class="bttrlazyloading" data-bttrlazyloading-md-src="{{step_one.svg}}" /> </div> </div>');

    CenterView.prototype.onShow = function() {
      return $('#svg_project').bttrlazyloading();
    };

    return CenterView;

  })(Marionette.ItemView);

  CommonFloor.CenterCtrl = (function(superClass) {
    extend(CenterCtrl, superClass);

    function CenterCtrl() {
      return CenterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterCtrl.prototype.initialize = function() {
      return this.show(new CenterView({
        model: project
      }));
    };

    return CenterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/screen-one/project.controller.js.map