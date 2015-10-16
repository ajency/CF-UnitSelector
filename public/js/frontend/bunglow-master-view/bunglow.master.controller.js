(function() {
  var TopMasterView, api,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  api = "";

  CommonFloor.ProjectMasterView = (function(superClass) {
    extend(ProjectMasterView, superClass);

    function ProjectMasterView() {
      return ProjectMasterView.__super__.constructor.apply(this, arguments);
    }

    ProjectMasterView.prototype.template = '#project-view-template';

    return ProjectMasterView;

  })(Marionette.LayoutView);

  CommonFloor.ProjectMasterCtrl = (function(superClass) {
    extend(ProjectMasterCtrl, superClass);

    function ProjectMasterCtrl() {
      return ProjectMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    ProjectMasterCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.checkPropertyType();
      }
      if (project.get('project_master').front !== "") {
        return this.show(new CommonFloor.ProjectMasterView);
      } else {
        return this.show(new CommonFloor.NothingFoundView);
      }
    };

    return ProjectMasterCtrl;

  })(Marionette.RegionController);

  TopMasterView = (function(superClass) {
    extend(TopMasterView, superClass);

    function TopMasterView() {
      return TopMasterView.__super__.constructor.apply(this, arguments);
    }

    TopMasterView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1 class="pull-left proj-name">{{project_title}}</h1> <div class="proj-type-count"> {{#types}} <h1 class="text-primary pull-left">{{count.length}}</h1> <p class="pull-left">{{type}}</p> {{/types}} <div class="clearfix"></div> </div> <div class="clearfix"></div> </div> </div> </div>');

    TopMasterView.prototype.serializeData = function() {
      var data, response;
      data = TopMasterView.__super__.serializeData.call(this);
      response = CommonFloor.propertyTypes();
      data.types = response;
      return data;
    };

    return TopMasterView;

  })(Marionette.ItemView);

  CommonFloor.TopMasterCtrl = (function(superClass) {
    extend(TopMasterCtrl, superClass);

    function TopMasterCtrl() {
      return TopMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopMasterCtrl.prototype.initialize = function() {
      return this.show(new TopMasterView({
        model: project
      }));
    };

    return TopMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.LeftMasterCtrl = (function(superClass) {
    extend(LeftMasterCtrl, superClass);

    function LeftMasterCtrl() {
      return LeftMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftMasterCtrl.prototype.initialize = function() {
      var data, response, units;
      response = CommonFloor.checkListView();
      if (response.type === 'bunglows') {
        units = bunglowVariantCollection.getBunglowUnits();
        data = {};
        data.units = units;
        data.type = 'villa';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.MasterBunglowListCtrl({
          region: this.region
        });
        this.parent().trigger("load:units", data);
      }
      if (response.type === 'building') {
        units = buildingCollection;
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.MasterBuildingListCtrl({
          region: this.region
        });
        return this.parent().trigger("load:units", data);
      }
    };

    return LeftMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterMasterView = (function(superClass) {
    extend(CenterMasterView, superClass);

    function CenterMasterView() {
      return CenterMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterMasterView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="list-view-container animated fadeInRight"> <!--<div class="controls mapView"> <div class="toggle"> <a href="#/master-view" class="map active">Map</a><a href="#/list-view" class="list">List</a> </div> </div>--> <div id="spritespin"></div> <div class="svg-maps"> <img class="first_image img-responsive" src="" /> <div class="region inactive"></div> </div> <div class="cf-loader hidden"></div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> </div> </div>');

    CenterMasterView.prototype.ui = {
      svgContainer: '.list-view-container'
    };

    CenterMasterView.prototype.initialize = function() {
      this.currentBreakPoint = 0;
      this.breakPoints = [];
      return this["class"] = '';
    };

    CenterMasterView.prototype.events = {
      'click .building': function(e) {
        var buildingModel, id, unit;
        id = parseInt(e.target.id);
        buildingModel = buildingCollection.findWhere({
          'id': id
        });
        if (buildingModel === void 0) {
          return false;
        }
        unit = unitCollection.where({
          'building_id': id
        });
        if (unit.length === 0) {
          return;
        }
        if (buildingModel.get('building_master').front === "") {
          return CommonFloor.navigate('/building/' + id + '/apartments', true);
        } else {
          return CommonFloor.navigate('/building/' + id + '/master-view', true);
        }
      },
      'click .villa': function(e) {
        var id, unitModel;
        id = parseInt(e.target.id);
        unitModel = unitCollection.findWhere({
          'id': id
        });
        if (unitModel === void 0) {
          return false;
        }
        CommonFloor.defaults['unit'] = id;
        return CommonFloor.navigate('/unit-view/' + id, true);
      },
      'click #prev': function() {
        return this.setDetailIndex(this.currentBreakPoint - 1);
      },
      'click #next': function() {
        return this.setDetailIndex(this.currentBreakPoint + 1);
      },
      'mouseout .villa': function(e) {
        var availability, id, unit;
        id = parseInt(e.target.id);
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit === void 0) {
          return;
        }
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        $('.layer').attr('class', 'layer villa');
        return $('#unit' + id).attr('class', 'unit blocks ' + availability);
      },
      'mouseout .building': function(e) {
        var id;
        id = parseInt(e.target.id);
        $('.layer').attr('class', 'layer building');
        return $('#bldg' + id).attr('class', 'bldg blocks');
      },
      'mouseover .villa': function(e) {
        var availability, html, id, response, unit;
        id = parseInt(e.target.id);
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit === void 0) {
          html += '<div class="svg-info"> <div class="details"> Villa details not entered </div> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        response = window.unit.getUnitDetails(id);
        window.convertRupees(response[3]);
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        html = "";
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Area</label> - ' + response[0].get('super_built_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + response[1].get('name') + '</div> <div> <label>Price </label> - ' + $('#price').val() + '</div> </div> </div>';
        $('#' + id).attr('class', 'layer villa ' + availability);
        $('#unit' + id).attr('class', 'unit blocks active');
        return $('.layer').tooltipster('content', html);
      },
      'mouseover .building': function(e) {
        var buildingModel, floors, html, id, response, unitTypes;
        id = parseInt(e.target.id);
        buildingModel = buildingCollection.findWhere({
          'id': id
        });
        if (buildingModel === void 0) {
          html = '<div class="svg-info"> <div class="details"> Building details not entered </div> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        floors = buildingModel.get('floors');
        floors = Object.keys(floors).length;
        unitTypes = building.getUnitTypes(id);
        console.log(response = building.getUnitTypesCount(id, unitTypes));
        html = '<div class="svg-info"> <h4 class="pull-left">' + buildingModel.get('building_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div>';
        $.each(response, function(index, value) {
          return html += '<div class="details"> <div> <label>' + value.name + '</label> - ' + value.units + '</div>';
        });
        html += '<div> <label>No. of floors</label> - ' + floors + '</div> </div> </div>';
        $('.layer').tooltipster('content', html);
        $('#bldg' + id).attr('class', 'bldg blocks active');
        return $('#' + id).attr('class', 'layer building active_bldg');
      }
    };

    CenterMasterView.prototype.onShow = function() {
      var breakpoints, height, svgs, that, transitionImages;
      height = this.ui.svgContainer.width() / 1.46;
      $('.us-left-content').css('height', height);
      $('#spritespin').hide();
      if (project.get('project_master').front === "") {
        $('.mapView').hide();
      } else {
        $('.map').addClass('active');
        $('.mapView').show();
      }
      that = this;
      transitionImages = [];
      svgs = {};
      breakpoints = project.get('breakpoints');
      $.each(breakpoints, function(index, value) {
        return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/master/master-' + value + '.svg';
      });
      $.merge(transitionImages, project.get('project_master')['right-front']);
      $.merge(transitionImages, project.get('project_master')['back-right']);
      $.merge(transitionImages, project.get('project_master')['left-back']);
      $.merge(transitionImages, project.get('project_master')['front-left']);
      $('.region').load(svgs[0], $('.first_image').attr('src', transitionImages[0]), that.iniTooltip).addClass('active').removeClass('inactive');
      $('.first_image').load(function() {
        var response;
        console.log("loaded");
        response = project.checkRotationView();
        if (response === 1) {
          return $('.cf-loader').removeClass('hidden');
        }
      });
      return this.initializeRotate(transitionImages, svgs);
    };

    CenterMasterView.prototype.setDetailIndex = function(index) {
      $('.region').empty();
      $('.region').addClass('inactive').removeClass('active');
      this.currentBreakPoint = index;
      if (this.currentBreakPoint < 0) {
        this.currentBreakPoint = this.breakPoints.length - 1;
      }
      if (this.currentBreakPoint >= this.breakPoints.length) {
        this.currentBreakPoint = 0;
      }
      return api.playTo(this.breakPoints[this.currentBreakPoint], {
        nearest: true
      });
    };

    CenterMasterView.prototype.initializeRotate = function(transitionImages, svgs) {
      var frames, spin, that, width;
      frames = transitionImages;
      this.breakPoints = project.get('breakpoints');
      this.currentBreakPoint = 0;
      width = this.ui.svgContainer.width() + 20;
      $('.svg-maps > div').first().removeClass('inactive').addClass('active').css('width', width);
      spin = $('#spritespin');
      spin.spritespin({
        source: frames,
        width: this.ui.svgContainer.width(),
        sense: -1,
        height: this.ui.svgContainer.width() / 1.46,
        animate: false
      });
      that = this;
      api = spin.spritespin("api");
      spin.bind("onFrame", function() {
        var data, url;
        data = api.data;
        if (data.frame === data.stopFrame) {
          console.log(url = svgs[data.frame]);
          return $('.region').load(url, that.iniTooltip).addClass('active').removeClass('inactive');
        }
      });
      return spin.bind("onLoad", function() {
        $('.first_image').remove();
        $('.rotate').removeClass('hidden');
        $('#spritespin').show();
        return $('.cf-loader').addClass('hidden');
      });
    };

    CenterMasterView.prototype.iniTooltip = function() {
      return $('.layer').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10
      });
    };

    return CenterMasterView;

  })(Marionette.ItemView);

  CommonFloor.CenterMasterCtrl = (function(superClass) {
    extend(CenterMasterCtrl, superClass);

    function CenterMasterCtrl() {
      return CenterMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterMasterCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.CenterMasterView({
        model: project
      }));
    };

    return CenterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/bunglow-master-view/bunglow.master.controller.js.map