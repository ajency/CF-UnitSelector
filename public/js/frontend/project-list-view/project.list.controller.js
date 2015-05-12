(function() {
  var LeftListView, TopListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ProjectListView = (function(superClass) {
    extend(ProjectListView, superClass);

    function ProjectListView() {
      return ProjectListView.__super__.constructor.apply(this, arguments);
    }

    ProjectListView.prototype.template = '#project-template';

    return ProjectListView;

  })(Marionette.LayoutView);

  CommonFloor.ProjectListCtrl = (function(superClass) {
    extend(ProjectListCtrl, superClass);

    function ProjectListCtrl() {
      return ProjectListCtrl.__super__.constructor.apply(this, arguments);
    }

    ProjectListCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      if (bunglowVariantCollection.length === 0 && apartmentVariantCollection.length === 0 && plotVariantCollection.length === 0) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.ProjectListView);
      }
    };

    return ProjectListCtrl;

  })(Marionette.RegionController);

  TopListView = (function(superClass) {
    extend(TopListView, superClass);

    function TopListView() {
      return TopListView.__super__.constructor.apply(this, arguments);
    }

    TopListView.prototype.template = Handlebars.compile('<div class="container-fluid"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12 text-center"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"> Back to Project Overview </a> </div> <h2 class="proj-name">{{project_title}}</h2> </div> </div> </div> <div class="filter-summary-area"> <button class="btn btn-primary cf-btn-white pull-right m-t-15" type="button" data-toggle="collapse" data-target="#collapsefilters"> Filters <span class="icon-funnel"></span> </button> <div class="pull-left filter-result"> {{#each  filters}} {{#each this}} <div class="filter-pill"  > {{this.name}}{{this.type}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span> </div> {{/each}}{{/each }} </div> <div class="proj-type-count"> {{#types}} <p class="pull-right">{{type}}</p><h1 class="text-primary pull-right m-t-10">{{count.length}}</h1> {{/types}} </div> <div class="clearfix"></div> </div>');

    TopListView.prototype.ui = {
      unitBack: '.unit_back'
    };

    TopListView.prototype.serializeData = function() {
      var data, response;
      data = TopListView.__super__.serializeData.call(this);
      response = CommonFloor.propertyTypes();
      data.types = response;
      return data;
    };

    TopListView.prototype.events = function() {
      return {
        'click @ui.unitBack': function(e) {
          var previousRoute;
          e.preventDefault();
          previousRoute = CommonFloor.router.previous();
          return CommonFloor.navigate('/' + previousRoute, true);
        }
      };
    };

    TopListView.prototype.onShow = function() {
      if (CommonFloor.router.history.length === 1) {
        return this.ui.unitBack.hide();
      }
    };

    return TopListView;

  })(Marionette.ItemView);

  CommonFloor.TopListCtrl = (function(superClass) {
    extend(TopListCtrl, superClass);

    function TopListCtrl() {
      return TopListCtrl.__super__.constructor.apply(this, arguments);
    }

    TopListCtrl.prototype.initialize = function() {
      this.renderView();
      return unitTempCollection.on("change reset add remove", this.renderView, this);
    };

    TopListCtrl.prototype.renderView = function() {
      return this.show(new TopListView({
        model: project
      }));
    };

    return TopListCtrl;

  })(Marionette.RegionController);

  LeftListView = (function(superClass) {
    extend(LeftListView, superClass);

    function LeftListView() {
      return LeftListView.__super__.constructor.apply(this, arguments);
    }

    LeftListView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>');

    LeftListView.prototype.onShow = function() {
      return $('.filters').hide();
    };

    return LeftListView;

  })(Marionette.ItemView);

  CommonFloor.LeftListCtrl = (function(superClass) {
    extend(LeftListCtrl, superClass);

    function LeftListCtrl() {
      return LeftListCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftListCtrl.prototype.initialize = function() {
      return this.show(new LeftListView);
    };

    return LeftListCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterListCtrl = (function(superClass) {
    extend(CenterListCtrl, superClass);

    function CenterListCtrl() {
      return CenterListCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterListCtrl.prototype.initialize = function() {
      this.renderView();
      return unitTempCollection.on("change reset add remove", this.renderView);
    };

    CenterListCtrl.prototype.renderView = function() {
      var data, response, units;
      response = CommonFloor.checkListView();
      if (response.type === 'bunglows') {
        units = bunglowVariantCollection.getBunglowUnits();
        data = {};
        data.units = units;
        data.type = 'villa';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        new CommonFloor.VillaListCtrl({
          region: this.region
        });
        this.parent().trigger("load:units", data);
      }
      if (response.type === 'building') {
        console.log(this.parent());
        units = buildingCollection;
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        new CommonFloor.BuildingListCtrl({
          region: this.region
        });
        return this.parent().trigger("load:units", data);
      }
    };

    return CenterListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-list-view/project.list.controller.js.map