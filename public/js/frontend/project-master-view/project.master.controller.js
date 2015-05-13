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

    TopMasterView.prototype.template = Handlebars.compile('<div class="container-fluid"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12 text-center"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"> Back to Project Overview </a> </div> <h2 class="proj-name">{{project_title}}</h2> </div> </div> </div> <div class="filter-summary-area"> <button class="btn btn-primary cf-btn-white pull-right m-t-15" type="button" data-toggle="collapse" data-target="#collapsefilters"> Filters <span class="icon-funnel"></span> </button> <div class="pull-left filter-result"> {{#each  filters}} {{#each this}} <div class="filter-pill"  > {{this.name}}{{this.type}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span> </div> {{/each}}{{/each }} </div> <div class="proj-type-count"> {{#types}} <p class="pull-right">{{type}}</p><h1 class="text-primary pull-right m-t-10">{{count.length}}</h1> {{/types}} </div> <div class="clearfix"></div> </div>');

    TopMasterView.prototype.ui = {
      unitBack: '.unit_back',
      unitTypes: '.unit_types',
      priceMin: '.price_min',
      priceMax: '.price_max',
      status: '.status',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#filter_area',
      budget: '#filter_budget',
      types: '.types',
      status: '#filter_available'
    };

    TopMasterView.prototype.serializeData = function() {
      var data, response, status;
      data = TopMasterView.__super__.serializeData.call(this);
      status = CommonFloor.getStatusFilters();
      if (status.length !== 0) {
        data.status = status;
      }
      data.filters = CommonFloor.getFilters()[0];
      data.results = CommonFloor.getFilters()[1];
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
        },
        'click @ui.types': function(e) {
          var arr, index;
          arr = CommonFloor.defaults['type'].split(',');
          index = arr.indexOf($(e.target).attr('data-id'));
          arr.splice(index, 1);
          CommonFloor.defaults['type'] = arr.join(',');
          if ($(e.target).attr('data-id') === 'Villas') {
            this.removeVillaFilters();
          }
          if ($(e.target).attr('data-id') === 'Apartments') {
            this.removeAptFilters();
          }
          if ($(e.target).attr('data-id') === 'Plots') {
            this.removePlotFilters();
          }
          this.trigger('render:view');
          unitCollection.reset(unitMasterCollection.toArray());
          return CommonFloor.filter();
        },
        'click @ui.unitTypes': function(e) {
          var unitTypes;
          unitTypes = CommonFloor.defaults['unitTypes'].split(',');
          unitTypes = _.without(unitTypes, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          return this.trigger('render:view');
        },
        'click @ui.variantNames': function(e) {
          var variantNames;
          variantNames = CommonFloor.defaults['unitVariants'].split(',');
          variantNames = _.without(variantNames, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['unitVariants'] = variantNames.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          return this.trigger('render:view');
        },
        'click @ui.status': function(e) {
          CommonFloor.defaults['availability'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          return this.trigger('render:view');
        },
        'click @ui.area': function(e) {
          CommonFloor.defaults['area_max'] = "";
          CommonFloor.defaults['area_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          return this.trigger('render:view');
        },
        'click @ui.budget': function(e) {
          CommonFloor.defaults['price_max'] = "";
          CommonFloor.defaults['price_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          return this.trigger('render:view');
        }
      };
    };

    TopMasterView.prototype.onShow = function() {
      if (CommonFloor.router.history.length === 1) {
        return this.ui.unitBack.hide();
      }
    };

    TopMasterView.prototype.removeVillaFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = bunglowVariantCollection.getBunglowMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['unitVariants'] = unitVariants.join(',');
    };

    TopMasterView.prototype.removeAptFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = apartmentVariantCollection.getApartmentMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['unitVariants'] = unitVariants.join(',');
    };

    TopMasterView.prototype.removePlotFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = plotVariantCollection.getPlotMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['unitTypes'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['unitVariants'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['unitVariants'] = unitVariants.join(',');
    };

    return TopMasterView;

  })(Marionette.ItemView);

  CommonFloor.TopMasterCtrl = (function(superClass) {
    extend(TopMasterCtrl, superClass);

    function TopMasterCtrl() {
      return TopMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopMasterCtrl.prototype.initialize = function() {
      this.renderView();
      return unitTempCollection.on("change reset add remove", this.renderView, this);
    };

    TopMasterCtrl.prototype.renderView = function() {
      this.view = new TopMasterView({
        model: project
      });
      this.listenTo(this.view, "render:view", this.loadController);
      return this.show(this.view);
    };

    TopMasterCtrl.prototype.loadController = function() {
      window.unitTypes = [];
      window.unitVariants = [];
      window.variantNames = [];
      window.price = '';
      window.area = '';
      window.type = [];
      this.region = new Marionette.Region({
        el: '#filterregion'
      });
      return new CommonFloor.FilterMasterCtrl({
        region: this.region
      });
    };

    return TopMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.LeftMasterCtrl = (function(superClass) {
    extend(LeftMasterCtrl, superClass);

    function LeftMasterCtrl() {
      return LeftMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftMasterCtrl.prototype.initialize = function() {
      this.renderView();
      return unitTempCollection.on("change reset add remove", this.renderView);
    };

    LeftMasterCtrl.prototype.renderView = function() {
      var data, region, response, units;
      response = CommonFloor.checkListView();
      if (response.count.length === 0) {
        region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.NoUnitsCtrl({
          region: region
        });
        return;
      }
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
      }
      if (response.type === 'plot') {
        units = plotVariantCollection.getPlotUnits();
        data = {};
        data.units = units;
        data.type = 'plot';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        return new CommonFloor.MasterPlotListCtrl({
          region: this.region
        });
      }
    };

    return LeftMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterMasterView = (function(superClass) {
    extend(CenterMasterView, superClass);

    function CenterMasterView() {
      return CenterMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterMasterView.prototype.template = Handlebars.compile('<div class="col-md-12 us-right-content mobile visible"> <div class="zoom-controls"> <div class="zoom-in"></div> <div class="zoom-out"></div> </div> <div id="view_toggle" class="toggle-view-button list"></div> <div id="trig" class="toggle-button hidden">List View</div> <div class=" master animated fadeIn"> <!--<div class="controls mapView"> <div class="toggle"> <a href="#/master-view" class="map active">Map</a><a href="#/list-view" class="list">List</a> </div> </div>--> <div id="spritespin"></div> <div class="svg-maps"> <img src=""  data-alwaysprocess="true" data-ratio="0.5" data-srcwidth="1600" data-crop="1" class="primage first_image img-responsive"> <div class="region inactive"></div> </div> <div class="cf-loader hidden"></div> </div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> </div>');

    CenterMasterView.prototype.ui = {
      svgContainer: '.master',
      trig: '#trig',
      viewtog: '#view_toggle'
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
          $('#spritespin').spritespin({
            width: that.ui.svgContainer.width(),
            sense: -1,
            height: that.ui.svgContainer.width() / 2,
            animate: false
          });
          return $('.svg-maps > div').first().css('width', that.ui.svgContainer.width());
        }, 650);
      },
      'click @ui.viewtog': function(e) {
        $('.us-left-content').toggleClass('not-visible visible');
        return $('.us-right-content').toggleClass('not-visible visible');
      },
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
        $('.spritespin-canvas').addClass('zoom');
        $('.us-left-content').addClass('animated fadeOut');
        return setTimeout(function(x) {
          if (Object.keys(buildingModel.get('building_master')).length === 0) {
            CommonFloor.navigate('/building/' + id + '/apartments', true);
            return CommonFloor.router.storeRoute();
          } else {
            CommonFloor.navigate('/building/' + id + '/master-view', true);
            return CommonFloor.router.storeRoute();
          }
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
          return $('#unit' + id).attr('class', 'bldg blocks ' + availability);
        }
      },
      'mouseout .building': function(e) {
        var id;
        id = parseInt(e.target.id);
        $('.building').attr('class', 'layer building');
        return $('#bldg' + id).attr('class', 'bldg blocks');
      },
      'mouseover .villa': function(e) {
        var availability, html, id, response, unit, unitMaster;
        id = parseInt(e.target.id);
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        unitMaster = unitMasterCollection.findWhere({
          id: id
        });
        if (unit === void 0 && unitMaster !== void 0) {
          html = '<div class="svg-info"> <div class="details"> Not in selection </div> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        if (unit === void 0) {
          html += '<div class="svg-info"> <div class="details empty"> Villa details not entered </div> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        response = window.unit.getUnitDetails(id);
        window.convertRupees(response[3]);
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        html = "";
        html += '<div class="svg-info ' + availability + ' "> <h5 class="pull-left m-t-0">' + unit.get('unit_name') + '</h5> <span class="pull-right icon-cross"></span> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div>' + response[1].get('name') + ' (' + response[0].get('super_built_up_area') + ' Sq.ft) <!--<label>Variant</label> - ' + response[0].get('unit_variant_name') + '--> </div> <div> Starting Price <span class="text-primary">' + $('#price').val() + '</span> </div> </div> <div class="action-bar "> <a href="#unit-view/' + id + '" class="icon-chevron-right pull-right">To Move forward Click Here</a> </div> </div>';
        $('#' + id).attr('class', 'layer villa  ' + availability);
        $('#unit' + id).attr('class', 'unit blocks active');
        return $('.layer').tooltipster('content', html);
      },
      'click .plot': function(e) {
        var availability, html, id, response, unit, unitMaster;
        id = parseInt(e.target.id);
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        unitMaster = unitMasterCollection.findWhere({
          id: id
        });
        if (unit === void 0 && unitMaster !== void 0) {
          html = '<div class="svg-info"> <div class="details"> Not in selection </div> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
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
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Variant</label> - ' + response[0].get('unit_variant_name') + '</div> <div> <label>Area</label> - ' + response[0].get('super_built_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + response[1].get('name') + '</div> <div> <label>Price </label> - ' + $('#price').val() + '</div> </div> <div class="action-bar "> <a href="#unit-view/' + id + '" class="icon-chevron-right pull-right">To Move forward Click Here</a> </div> </div>';
        $('#' + id).attr('class', 'layer plot ' + availability);
        $('#unit' + id).attr('class', 'bldg blocks active');
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
      $('img').lazyLoadXT();
      height = this.ui.svgContainer.width() / 2;
      $('.units').css('height', height - 380);
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
      width = this.ui.svgContainer.width();
      $('.svg-maps > div').first().removeClass('inactive').addClass('active').css('width', width);
      spin = $('#spritespin');
      spin.spritespin({
        source: frames,
        width: this.ui.svgContainer.width(),
        sense: -1,
        height: this.ui.svgContainer.width() / 2,
        animate: false
      });
      that = this;
      api = spin.spritespin("api");
      spin.bind("onFrame", function() {
        var data, url;
        data = api.data;
        if (data.frame === data.stopFrame) {
          url = svgs[data.frame];
          return $('.region').load(url, function() {
            that.iniTooltip();
            CommonFloor.applyVillaClasses();
            return CommonFloor.applyPlotClasses();
          }).addClass('active').removeClass('inactive');
        }
      });
      return spin.bind("onLoad", function() {
        var first, response, url;
        first = _.values(svgs);
        url = first[0];
        $('#trig').removeClass('hidden');
        response = project.checkRotationView();
        if (response === 1) {
          $('.first_image').remove();
          $('.rotate').removeClass('hidden');
          $('#spritespin').show();
          $('.cf-loader').addClass('hidden');
          return $('.region').load(url, function() {
            that.iniTooltip();
            CommonFloor.applyVillaClasses();
            CommonFloor.applyPlotClasses();
            return that.loadZoom();
          });
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
        offsetY: -25,
        interactive: true,
        trigger: 'hover'
      });
    };

    CenterMasterView.prototype.loadZoom = function() {
      var $panzoom;
      return $panzoom = $('.master').panzoom({
        contain: 'invert',
        minScale: 1,
        maxScale: 2,
        increment: 0.2,
        $zoomIn: $('.zoom-in'),
        $zoomOut: $('.zoom-out')
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