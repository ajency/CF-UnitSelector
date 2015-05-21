(function() {
  var ApartmentsView, api,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  api = "";

  CommonFloor.ApartmentsMasterView = (function(superClass) {
    extend(ApartmentsMasterView, superClass);

    function ApartmentsMasterView() {
      return ApartmentsMasterView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsMasterView.prototype.template = '#project-view-template';

    return ApartmentsMasterView;

  })(Marionette.LayoutView);

  CommonFloor.ApartmentsMasterCtrl = (function(superClass) {
    extend(ApartmentsMasterCtrl, superClass);

    function ApartmentsMasterCtrl() {
      return ApartmentsMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    ApartmentsMasterCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      if (apartmentVariantCollection.length === 0) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.ApartmentsMasterView);
      }
    };

    return ApartmentsMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.TopApartmentMasterView = (function(superClass) {
    extend(TopApartmentMasterView, superClass);

    function TopApartmentMasterView() {
      return TopApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    TopApartmentMasterView.prototype.template = Handlebars.compile('<div class="container-fluid animated fadeIn"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"></a> </div> <div class="header-info"> <h2 class="pull-left proj-name">{{project_title}}</h2> <div class="proj-type-count"> {{#types}} <h1 class="pull-left">{{results}}</h1><p class="pull-left">Apartment(s)/Penthouse(s)</p> {{/types}} </div> <div class="pull-left filter-result"> {{#each  filters}} {{#each this}} <div class="filter-pill"  > {{this.name}}{{this.type}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span> </div> {{/each}}{{/each }} </div> </div> </div> </div> </div>');

    TopApartmentMasterView.prototype.ui = {
      unitBack: '.unit_back',
      unitTypes: '.unit_types',
      priceMin: '.price_min',
      priceMax: '.price_max',
      status: '#filter_available',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#filter_area',
      budget: '#filter_budget',
      types: '.types',
      floor: '.floor'
    };

    TopApartmentMasterView.prototype.initialize = function() {
      var building_id, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      return this.building_id = building_id;
    };

    TopApartmentMasterView.prototype.serializeData = function() {
      var building_id, data, model, units, url;
      data = TopApartmentMasterView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      units = Marionette.getOption(this, 'units');
      data.units = units.length;
      data.project_title = project.get('project_title');
      data.filters = CommonFloor.getFilters()[0];
      data.results = CommonFloor.getApartmentFilters().count;
      console.log(model = buildingCollection.findWhere({
        'id': building_id
      }));
      data.name = model.get('building_name');
      return data;
    };

    TopApartmentMasterView.prototype.events = function() {
      return {
        'click @ui.types': function(e) {
          var arr, index;
          arr = CommonFloor.defaults['type'].split(',');
          index = arr.indexOf($(e.target).attr('data-id'));
          arr.splice(index, 1);
          CommonFloor.defaults['type'] = arr.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.unitBack': function(e) {
          var previousRoute;
          e.preventDefault();
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          previousRoute = CommonFloor.router.previous();
          return CommonFloor.navigate('/' + previousRoute, true);
        },
        'click @ui.unitTypes': function(e) {
          var unitTypes;
          unitTypes = CommonFloor.defaults['unitTypes'].split(',');
          unitTypes = _.without(unitTypes, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['unitTypes'] = unitTypes.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.variantNames': function(e) {
          var variantNames;
          variantNames = CommonFloor.defaults['unitVariants'].split(',');
          variantNames = _.without(variantNames, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['unitVariants'] = variantNames.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.status': function(e) {
          CommonFloor.defaults['availability'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.area': function(e) {
          CommonFloor.defaults['area_max'] = "";
          CommonFloor.defaults['area_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.budget': function(e) {
          CommonFloor.defaults['price_max'] = "";
          CommonFloor.defaults['price_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.floor': function(e) {
          CommonFloor.defaults['floor_max'] = "";
          CommonFloor.defaults['floor_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.filter();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        }
      };
    };

    TopApartmentMasterView.prototype.onShow = function() {
      var results;
      if (CommonFloor.router.history.length === 1) {
        this.ui.unitBack.hide();
      }
      results = CommonFloor.getFilters()[1];
      if (results.length === 0) {
        return $('.proj-type-count').text('No results found');
      }
    };

    return TopApartmentMasterView;

  })(Marionette.ItemView);

  CommonFloor.TopApartmentMasterCtrl = (function(superClass) {
    extend(TopApartmentMasterCtrl, superClass);

    function TopApartmentMasterCtrl() {
      return TopApartmentMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopApartmentMasterCtrl.prototype.initialize = function() {
      this.renderMasterTopView();
      return unitTempCollection.bind("filter_available", this.renderMasterTopView, this);
    };

    TopApartmentMasterCtrl.prototype.renderMasterTopView = function() {
      var buildingModel, building_id, response, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      response = window.building.getBuildingUnits(building_id);
      buildingModel = buildingCollection.findWhere({
        id: building_id
      });
      this.view = new CommonFloor.TopApartmentMasterView({
        model: buildingModel,
        units: response
      });
      this.listenTo(this.view, "render:view", this.loadController);
      return this.show(this.view);
    };

    TopApartmentMasterCtrl.prototype.loadController = function() {
      window.unitTypes = [];
      window.unitVariants = [];
      window.variantNames = [];
      window.price = '';
      window.area = '';
      window.type = [];
      this.region = new Marionette.Region({
        el: '#filterregion'
      });
      return new CommonFloor.FilterApartmentCtrl({
        region: this.region
      });
    };

    return TopApartmentMasterCtrl;

  })(Marionette.RegionController);

  ApartmentsView = (function(superClass) {
    extend(ApartmentsView, superClass);

    function ApartmentsView() {
      return ApartmentsView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsView.prototype.template = Handlebars.compile('	<div class="row"> <div class="col-sm-4  info"> <b class="bold">{{floor}}</b> - {{unit_name}} </div> <div class="col-sm-3  info"> {{unit_type}} </div> <div class="col-sm-5 text-primary"> <!--<span class="icon-rupee-icn"></span>-->{{price}} <!--<span class="tick"></span>--> </div> </div>');

    ApartmentsView.prototype.initialize = function() {
      return this.$el.prop("id", 'apartment' + this.model.get("id"));
    };

    ApartmentsView.prototype.tagName = 'li';

    ApartmentsView.prototype.className = 'unit blocks';

    ApartmentsView.prototype.serializeData = function() {
      var availability, data, property, response, status, unitType;
      data = ApartmentsView.__super__.serializeData.call(this);
      response = window.unit.getUnitDetails(this.model.get('id'));
      data.unit_type = response[1].get('name');
      data.super_built_up_area = response[0].get('super_built_up_area');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      this.model.set('status', status);
      window.convertRupees(response[3]);
      data.price = $('#price').val();
      unitType = unitTypeMasterCollection.findWhere({
        'id': this.model.get('unit_type_id')
      });
      property = window.propertyTypes[unitType.get('property_type_id')];
      data.property = s.capitalize(property);
      data.floor = 'F' + this.model.get('floor');
      return data;
    };

    ApartmentsView.prototype.events = {
      'mouseover': function(e) {
        var html, id;
        id = this.model.get('id');
        html = this.getHtml(this.model.get('id'));
        $('#' + id).attr('class', 'layer apartment ' + this.model.get('availability'));
        $('#apartment' + id).attr('class', 'unit blocks ' + this.model.get('availability') + ' active');
        $('#' + id).tooltipster('content', html);
        return $('#' + id).tooltipster('show');
      },
      'mouseout': function(e) {
        var id;
        id = this.model.get('id');
        $('#apartment' + id).attr('class', 'unit blocks ' + this.model.get('availability'));
        $('#' + id).attr('class', 'layer apartment ' + this.model.get('availability'));
        return $('#' + id).tooltipster('hide');
      },
      'click': function(e) {
        if (this.model.get('availability') === 'available') {
          CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
          return CommonFloor.router.storeRoute();
        }
      }
    };

    ApartmentsView.prototype.getHtml = function(id) {
      var availability, html, response, unit, unitMaster;
      html = "";
      id = parseInt(id);
      unit = unitCollection.findWhere({
        'id': id
      });
      unitMaster = unitMasterCollection.findWhere({
        id: id
      });
      if (unit === void 0 && unitMaster !== void 0) {
        html = '<div class="svg-info"> <div class="details empty"> Not in selection </div> </div>';
        $('.layer').tooltipster('content', html);
        return;
      }
      if (unit === void 0) {
        html = '<div class="svg-info"> <div class="details"> Apartment details not entered </div> </div>';
        $('.layer').tooltipster('content', html);
        return false;
      }
      response = window.unit.getUnitDetails(id);
      window.convertRupees(response[3]);
      availability = unit.get('availability');
      availability = s.decapitalize(availability);
      html = "";
      html += '<div class="svg-info"> <div class="action-bar"> <div class="apartment"></div> </div> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Area</label> - ' + response[0].get('super_built_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + response[1].get('name') + '</div> <div> <label>Price </label> - ' + $('#price').val() + '</div> </div> </div>';
      return html;
    };

    ApartmentsView.prototype.onShow = function() {
      var availability, classname, id, status;
      id = this.model.get('id');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      classname = $('#apartment' + id).attr('class');
      return $('#apartment' + id).attr('class', classname + ' ' + status);
    };

    return ApartmentsView;

  })(Marionette.ItemView);

  CommonFloor.LeftApartmentMasterView = (function(superClass) {
    extend(LeftApartmentMasterView, superClass);

    function LeftApartmentMasterView() {
      return LeftApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentMasterView.prototype.template = '<div> <div class="list-view-container w-map animated fadeInLeft"> <div class="advncd-filter-wrp  unit-list"> <div class="legend clearfix"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <p class="text-center help-text">Hover on the units for more details</p> <ul class="units one"> </ul> </div> </div> </div>';

    LeftApartmentMasterView.prototype.childView = ApartmentsView;

    LeftApartmentMasterView.prototype.childViewContainer = '.units';

    return LeftApartmentMasterView;

  })(Marionette.CompositeView);

  CommonFloor.LeftApartmentMasterCtrl = (function(superClass) {
    extend(LeftApartmentMasterCtrl, superClass);

    function LeftApartmentMasterCtrl() {
      return LeftApartmentMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentMasterCtrl.prototype.initialize = function() {
      this.renderLeftView();
      return unitTempCollection.bind("filter_available", this.renderLeftView, this);
    };

    LeftApartmentMasterCtrl.prototype.renderLeftView = function() {
      var building_id, region, response, unitsCollection, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      response = window.building.getBuildingUnits(building_id);
      if (response.length === 0) {
        region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.NoUnitsCtrl({
          region: region
        });
        return;
      }
      unitsCollection = new Backbone.Collection(response);
      return this.show(new CommonFloor.LeftApartmentMasterView({
        collection: unitsCollection
      }));
    };

    return LeftApartmentMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterApartmentMasterView = (function(superClass) {
    extend(CenterApartmentMasterView, superClass);

    function CenterApartmentMasterView() {
      return CenterApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentMasterView.prototype.template = Handlebars.compile('<div class="col-md-12 col-sm-12 col-xs-12 us-right-content mobile visible animated fadeIn overflow-h"> <div class="legend clearfix"> <ul> <!--<li class="available">AVAILABLE</li>--> <li class="sold">N/A</li> <!--<li class="blocked">BLOCKED</li>--> <li class="na">Available</li> </ul> </div> <div class="zoom-controls"> <div class="zoom-in"></div> <div class="zoom-out"></div> </div> <div id="view_toggle" class="toggle-view-button list"></div> <div id="trig" class="toggle-button">List View</div> <div class=" master animated fadeIn"> <div class="single-bldg"> <div class="prev"></div> <div class="next"></div> </div> <div id="spritespin"></div> <div class="svg-maps"> <img class="first_image img-responsive" src="" /> <div class="region inactive"></div> </div> </div> <div class="cf-loader hidden"></div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> <div class="mini-map"> <img class="firstimage img-responsive" src="" /> <div class="project_master"></div> </div> </div>');

    CenterApartmentMasterView.prototype.ui = {
      svgContainer: '.master',
      trig: '#trig',
      viewtog: '#view_toggle'
    };

    CenterApartmentMasterView.prototype.initialize = function() {
      this.currentBreakPoint = 0;
      return this.breakPoints = [];
    };

    CenterApartmentMasterView.prototype.events = {
      'click @ui.trig': function(e) {
        var that;
        $('.us-left-content').toggleClass('col-0 col-md-3');
        $('.us-right-content').toggleClass('col-md-12 col-md-9');
        that = this;
        setTimeout(function(x) {
          var height;
          $('#spritespin').spritespin({
            width: that.ui.svgContainer.width() + 13,
            sense: -1,
            height: that.ui.svgContainer.width() / 2,
            animate: false
          });
          $('.svg-maps > div').first().css('width', that.ui.svgContainer.width() + 13);
          $('.first_image').first().css('width', that.ui.svgContainer.width() + 13);
          height = that.ui.svgContainer.width() / 2;
          return $('.units').css('height', height - 10);
        }, 650);
        return setTimeout(function(x) {
          return $('.master').panzoom('resetDimensions');
        }, 800);
      },
      'click @ui.viewtog': function(e) {
        $('.us-left-content').toggleClass('not-visible visible');
        return $('.us-right-content').toggleClass('not-visible visible');
      },
      'click #prev': function() {
        return this.setDetailIndex(this.currentBreakPoint - 1);
      },
      'click #next': function() {
        return this.setDetailIndex(this.currentBreakPoint + 1);
      },
      'click .list': function(e) {
        var building_id, url;
        e.preventDefault();
        url = Backbone.history.fragment;
        building_id = parseInt(url.split('/')[1]);
        CommonFloor.navigate('/building/' + building_id + '/apartments', true);
        return CommonFloor.router.storeRoute();
      },
      'click .map': function(e) {
        var building_id, url;
        e.preventDefault();
        url = Backbone.history.fragment;
        building_id = parseInt(url.split('/')[1]);
        CommonFloor.navigate('/building/' + building_id + '/master-view', true);
        return CommonFloor.router.storeRoute();
      },
      'mouseover .apartment': function(e) {
        var availability, html, id, response, unit, unitMaster;
        id = parseInt(e.target.id);
        unit = unitCollection.findWhere({
          'id': id
        });
        unitMaster = unitMasterCollection.findWhere({
          id: id
        });
        if (unit === void 0 && unitMaster !== void 0) {
          html = '<div class="svg-info"> <div class="details empty"> Not in selection </div> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        if (unit === void 0) {
          html = '<div class="svg-info"> <div class="details"> Apartment details not entered </div> </div>';
          $('.layer').tooltipster('content', html);
          return false;
        }
        response = window.unit.getUnitDetails(id);
        window.convertRupees(response[3]);
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        html = "";
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Area</label> - ' + response[0].get('super_built_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + response[1].get('name') + '</div> <div> <label>Price </label> - ' + $('#price').val() + '</div> </div> </div>';
        $('#' + id).attr('class', 'layer apartment ' + availability);
        $('#apartment' + id).attr('class', ' unit blocks ' + availability + ' active');
        return $('.layer').tooltipster('content', html);
      },
      'mouseout .apartment': function(e) {
        var availability, id, unit;
        id = parseInt(e.target.id);
        unit = unitCollection.findWhere({
          'id': id
        });
        if (unit === void 0) {
          return;
        }
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        $('#' + id).attr('class', 'layer apartment ' + availability);
        return $('#apartment' + id).attr('class', 'unit blocks ' + availability);
      },
      'mouseover .next': function(e) {
        var buildingModel, floors, html, id, images, response, unitTypes;
        id = parseInt($(e.target).attr('data-id'));
        buildingModel = buildingCollection.findWhere({
          'id': id
        });
        images = Object.keys(buildingModel.get('building_master')).length;
        if (images !== 0) {
          console.log("show image");
        }
        floors = buildingModel.get('floors');
        floors = Object.keys(floors).length;
        unitTypes = window.building.getUnitTypes(id);
        response = window.building.getUnitTypesCount(id, unitTypes);
        html = '<div class="svg-info"> <h4 class="pull-left">' + buildingModel.get('building_name') + '</h4> <h4 class="pull-left">' + window.building.getMinimumCost(id) + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div>';
        $.each(response, function(index, value) {
          return html += '<div class="details"> <div> <label>' + value.name + '</label> - ' + value.units + '</div>';
        });
        html += '<div> <label>No. of floors</label> - ' + floors + '</div> </div> </div>';
        return $(e.target).tooltipster('content', html);
      },
      'click .next,.prev': function(e) {
        var buildingModel, id;
        id = parseInt($(e.target).attr('data-id'));
        buildingModel = buildingMasterCollection.findWhere({
          'id': id
        });
        if (Object.keys(buildingModel.get('building_master')).length === 0) {
          CommonFloor.navigate('/building/' + id + '/apartments', true);
          return CommonFloor.router.storeRoute();
        } else {
          CommonFloor.navigate('/building/' + id + '/master-view', true);
          return CommonFloor.router.storeRoute();
        }
      }
    };

    CenterApartmentMasterView.prototype.onShow = function() {
      var breakpoints, building, building_id, first, height, svgs, that, transitionImages, url;
      this.getNextPrev();
      $('img').lazyLoadXT();
      height = this.ui.svgContainer.width() / 2;
      $('.search-left-content').css('height', height);
      $('#spritespin').hide();
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      building = buildingCollection.findWhere({
        id: building_id
      });
      transitionImages = [];
      svgs = {};
      that = this;
      breakpoints = building.get('breakpoints');
      $.each(breakpoints, function(index, value) {
        return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/buildings/' + building_id + '/master-' + value + '.svg';
      });
      $.merge(transitionImages, building.get('building_master'));
      console.log(first = _.values(svgs));
      $('.region').load(first[0], function() {
        $('.first_image').attr('data-src', transitionImages[0]);
        that.iniTooltip();
        CommonFloor.applyAvailabilClasses();
        CommonFloor.randomClass();
        CommonFloor.applyFliterClass();
        return that.loadZoom();
      }).addClass('active').removeClass('inactive');
      $('.first_image').lazyLoadXT();
      $('.first_image').load(function() {
        var response;
        response = building.checkRotationView(building_id);
        $('.cf-loader').removeClass('hidden');
        if (response === 1) {
          return $('.cf-loader').removeClass('hidden');
        }
      });
      this.initializeRotate(transitionImages, svgs, building);
      this.loadProjectMaster();
      if ($(window).width() > 991) {
        return $('.units').mCustomScrollbar({
          theme: 'inset'
        });
      }
    };

    CenterApartmentMasterView.prototype.loadProjectMaster = function() {
      var breakpoints, first, svgs, transitionImages;
      svgs = [];
      breakpoints = project.get('breakpoints');
      $.each(breakpoints, function(index, value) {
        return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/master/master-' + value + '.svg';
      });
      first = _.values(svgs);
      transitionImages = [];
      $.merge(transitionImages, project.get('project_master'));
      if (project.get('project_master').length !== 0) {
        return $('.project_master').load(first[0], function() {
          var building_id, url;
          $('.firstimage').attr('src', transitionImages[0]);
          url = Backbone.history.fragment;
          building_id = url.split('/')[1];
          return $('#' + building_id + '.building').attr('class', 'layer building svg_active');
        });
      }
    };

    CenterApartmentMasterView.prototype.getNextPrev = function() {
      var buildingModel, building_id, next, prev, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      buildingModel = buildingMasterCollection.findWhere({
        'id': building_id
      });
      buildingMasterCollection.setRecord(buildingModel);
      next = buildingMasterCollection.next();
      if (_.isUndefined(next)) {
        $('.next').hide();
      } else {
        $('.next').attr('data-id', next.get('id'));
      }
      prev = buildingMasterCollection.prev();
      if (_.isUndefined(prev)) {
        return $('.prev').hide();
      } else {
        return $('.prev').attr('data-id', next.get('id'));
      }
    };

    CenterApartmentMasterView.prototype.setDetailIndex = function(index) {
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

    CenterApartmentMasterView.prototype.initializeRotate = function(transitionImages, svgs, building) {
      var building_id, frames, spin, that, url, width;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      frames = transitionImages;
      this.breakPoints = building.get('breakpoints');
      this.currentBreakPoint = 0;
      width = this.ui.svgContainer.width() + 20;
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
        var data;
        data = api.data;
        if (data.frame === data.stopFrame) {
          url = svgs[data.frame];
          return $('.region').load(url, function() {
            that.iniTooltip();
            CommonFloor.applyAvailabilClasses();
            CommonFloor.randomClass();
            CommonFloor.applyFliterClass();
            return that.loadZoom();
          }).addClass('active').removeClass('inactive');
        }
      });
      return spin.bind("onLoad", function() {
        var response;
        response = building.checkRotationView(building_id);
        if (response === 1) {
          $('.first_image').remove();
          $('.rotate').removeClass('hidden');
          $('#spritespin').show();
          $('.cf-loader').addClass('hidden');
        }
        return $('.region').load(url, function() {
          that.iniTooltip();
          that.loadZoom();
          CommonFloor.applyAvailabilClasses();
          CommonFloor.randomClass();
          CommonFloor.applyFliterClass();
          return that.loadZoom();
        }).addClass('active').removeClass('inactive');
      });
    };

    CenterApartmentMasterView.prototype.iniTooltip = function() {
      return $('.layer,.next,.prev').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10
      });
    };

    CenterApartmentMasterView.prototype.loadZoom = function() {
      var $panzoom;
      return $panzoom = $('.master').panzoom({
        contain: 'invert',
        minScale: 1,
        maxScale: 2.4,
        increment: 0.4,
        $zoomIn: $('.zoom-in'),
        $zoomOut: $('.zoom-out')
      });
    };

    return CenterApartmentMasterView;

  })(Marionette.ItemView);

  CommonFloor.CenterApartmentMasterCtrl = (function(superClass) {
    extend(CenterApartmentMasterCtrl, superClass);

    function CenterApartmentMasterCtrl() {
      return CenterApartmentMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentMasterCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.CenterApartmentMasterView);
    };

    return CenterApartmentMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/building-step3/apartments.master.controller.js.map