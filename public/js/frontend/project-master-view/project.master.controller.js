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
      if (Object.keys(project.get('project_master')).length !== 0 && unitCollection.length !== 0) {
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

    TopMasterView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span><a class="unit_back" href="#"> Back to Project Overview</a> </span> </li> </ul> </div> </div> </div> <h1 class="pull-left proj-name">{{project_title}}</h1> <div class="proj-type-count"> {{#types}} <h1 class="text-primary pull-left">{{count.length}}</h1> <p class="pull-left">{{type}}</p> {{/types}} <div class="clearfix"></div> </div> <div class="clearfix"></div> </div> </div> </div>');

    TopMasterView.prototype.ui = {
      unitBack: '.unit_back'
    };

    TopMasterView.prototype.serializeData = function() {
      var data, response;
      data = TopMasterView.__super__.serializeData.call(this);
      response = CommonFloor.propertyTypes();
      data.types = response;
      return data;
    };

    TopMasterView.prototype.events = function() {
      return {
        'click @ui.unitBack': function(e) {
          var previousRoute;
          e.preventDefault();
          previousRoute = CommonFloor.router.previous();
          return CommonFloor.navigate('/' + previousRoute, true);
        }
      };
    };

    TopMasterView.prototype.onShow = function() {
      if (CommonFloor.router.history.length === 1) {
        return this.ui.unitBack.hide();
      }
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
        this.parent().trigger("load:units", data);
      }
      if (response.type === 'plot') {
        units = plotVariantCollection.getPlotUnits();
        data = {};
        data.units = units;
        data.type = 'plot';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.MasterPlotListCtrl({
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

    CenterMasterView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div id="trig" class="toggle-button hidden">List View</div> <div class="list-view-container animated fadeIn"> <!--<div class="controls mapView"> <div class="toggle"> <a href="#/master-view" class="map active">Map</a><a href="#/list-view" class="list">List</a> </div> </div>--> <div id="spritespin"></div> <div class="svg-maps"> <img src=""  data-alwaysprocess="true" data-ratio="0.5" data-srcwidth="1600" data-crop="1" class="primage first_image img-responsive"> <div class="region inactive"></div> </div> <div class="cf-loader hidden"></div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> </div> </div>');

    CenterMasterView.prototype.ui = {
      svgContainer: '.list-view-container',
      trig: '#trig'
    };

    CenterMasterView.prototype.initialize = function() {
      this.currentBreakPoint = 0;
      this.breakPoints = [];
      return this["class"] = '';
    };

    CenterMasterView.prototype.events = {
      'click @ui.trig': function(e) {
        var that;
        $('.us-left-content').toggleClass('col-0 col-md-3');
        $('.us-right-content').toggleClass('col-md-12 col-md-9');
        that = this;
        return setTimeout(function(x) {
          console.log(that.ui.svgContainer.width());
          $('#spritespin').spritespin({
            width: that.ui.svgContainer.width(),
            sense: -1,
            height: that.ui.svgContainer.width() / 1.46,
            animate: false
          });
          return $('.svg-maps > div').first().css('width', that.ui.svgContainer.width());
        }, 650);
      },
      'click .building': function(e) {
        return setTimeout(function(x) {
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
          $('.spritespin-canvas').addClass('zoom');
          $('.us-left-content').addClass('animated fadeOut');
          if (Object.keys(buildingModel.get('building_master')).length === 0) {
            CommonFloor.navigate('/building/' + id + '/apartments', true);
            return CommonFloor.router.storeRoute();
          } else {
            CommonFloor.navigate('/building/' + id + '/master-view', true);
            return CommonFloor.router.storeRoute();
          }
        }, 500);
      },
      'click .villa': function(e) {
        return setTimeout(function(x) {
          var id, unitModel;
          id = parseInt(e.target.id);
          unitModel = unitCollection.findWhere({
            'id': id
          });
          if (unitModel === void 0) {
            return false;
          }
          $('.spritespin-canvas').addClass('zoom');
          $('.us-left-content').addClass('animated fadeOut');
          CommonFloor.defaults['unit'] = id;
          CommonFloor.navigate('/unit-view/' + id, true);
          return CommonFloor.router.storeRoute();
        }, 500);
      },
      'click .plot': function(e) {
        return setTimeout(function(x) {
          var id, unitModel;
          id = parseInt(e.target.id);
          unitModel = unitCollection.findWhere({
            'id': id
          });
          if (unitModel === void 0) {
            return false;
          }
          $('.spritespin-canvas').addClass('zoom');
          $('.us-left-content').addClass('animated fadeOut');
          CommonFloor.defaults['unit'] = id;
          CommonFloor.navigate('/unit-view/' + id, true);
          return CommonFloor.router.storeRoute();
        }, 500);
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
        if (unit !== void 0) {
          availability = unit.get('availability');
          availability = s.decapitalize(availability);
          CommonFloor.applyVillaClasses();
          return $('#unit' + id).attr('class', 'unit blocks ' + availability);
        }
      },
      'mouseout .plot': function(e) {
        var availability, id, unit;
        id = parseInt(e.target.id);
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit !== void 0) {
          availability = unit.get('availability');
          availability = s.decapitalize(availability);
          CommonFloor.applyPlotClasses();
          return $('#unit' + id).attr('class', 'unit blocks ' + availability);
        }
      },
      'mouseout .building': function(e) {
        var id;
        id = parseInt(e.target.id);
        $('.building').attr('class', 'layer building');
        return $('#bldg' + id).attr('class', 'bldg blocks');
      },
      'mouseover .villa': function(e) {
        var availability, html, id, response, unit;
        $('.villa').attr('class', 'layer villa');
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
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Variant</label> - ' + response[0].get('unit_variant_name') + '</div> <div> <label>Area</label> - ' + response[0].get('super_built_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + response[1].get('name') + '</div> <div> <label>Price </label> - ' + $('#price').val() + '</div> </div> </div>';
        $('#' + id).attr('class', 'layer villa ' + availability);
        $('#unit' + id).attr('class', 'unit blocks active');
        return $('.layer').tooltipster('content', html);
      },
      'mouseover .plot': function(e) {
        var availability, html, id, response, unit;
        $('.plot').attr('class', 'layer plot');
        id = parseInt(e.target.id);
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit === void 0) {
          html += '<div class="svg-info"> <div class="details"> Plot details not entered </div> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        response = window.unit.getUnitDetails(id);
        window.convertRupees(response[3]);
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        html = "";
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Variant</label> - ' + response[0].get('unit_variant_name') + '</div> <div> <label>Area</label> - ' + response[0].get('super_built_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + response[1].get('name') + '</div> <div> <label>Price </label> - ' + $('#price').val() + '</div> </div> </div>';
        $('#' + id).attr('class', 'layer plot ' + availability);
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
        response = building.getUnitTypesCount(id, unitTypes);
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
      var breakpoints, first, height, svgs, that, transitionImages;
      height = this.ui.svgContainer.width() / 1.46;
      $('.units').css('height', height - 162);
      $('#spritespin').hide();
      that = this;
      transitionImages = [];
      svgs = {};
      breakpoints = project.get('breakpoints');
      $.each(breakpoints, function(index, value) {
        return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/master/master-' + value + '.svg';
      });
      first = _.values(svgs);
      $.merge(transitionImages, project.get('project_master'));
      $('.region').load(first[0], $('.first_image').attr('data-src', transitionImages[0]), that.iniTooltip).addClass('active').removeClass('inactive');
      $('.first_image').load(function() {
        var response;
        response = project.checkRotationView();
        if (response === 1) {
          return $('.cf-loader').removeClass('hidden');
        }
      });
      $('.first_image').lazyLoadXT();
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
      console.log(this.ui.svgContainer.width());
      that = this;
      api = spin.spritespin("api");
      spin.bind("onFrame", function() {
        var data, url;
        data = api.data;
        if (data.frame === data.stopFrame) {
          url = svgs[data.frame];
          return $('.region').load(url, function() {
            that.iniTooltip();
            return CommonFloor.applyVillaClasses();
          }).addClass('active').removeClass('inactive');
        }
      });
      return spin.bind("onLoad", function() {
        var response;
        $('#trig').removeClass('hidden');
        response = project.checkRotationView();
        if (response === 1) {
          $('.first_image').remove();
          $('.rotate').removeClass('hidden');
          $('#spritespin').show();
          $('.cf-loader').addClass('hidden');
          return CommonFloor.applyVillaClasses();
        }
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

//# sourceMappingURL=../../frontend/project-master-view/project.master.controller.js.map