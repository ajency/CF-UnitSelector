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

    ApartmentsMasterView.prototype.template = '#project-template';

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

    TopApartmentMasterView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span> Back to Poject Overview </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1 class="pull-left proj-name">{{project_title}}</h1> <div class="proj-type-count"> <h1 class="text-primary pull-left">{{units}}</h1><p class="pull-left">Apartments</p> <div class="clearfix"></div> </div> <div class="clearfix"></div> </div> </div> </div>');

    TopApartmentMasterView.prototype.serializeData = function() {
      var data, units;
      data = TopApartmentMasterView.__super__.serializeData.call(this);
      units = Marionette.getOption(this, 'units');
      data.units = units.length;
      data.project_title = project.get('project_title');
      return data;
    };

    return TopApartmentMasterView;

  })(Marionette.ItemView);

  CommonFloor.TopApartmentMasterCtrl = (function(superClass) {
    extend(TopApartmentMasterCtrl, superClass);

    function TopApartmentMasterCtrl() {
      return TopApartmentMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopApartmentMasterCtrl.prototype.initialize = function() {
      var buildingModel, building_id, response, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      response = window.building.getBuildingUnits(building_id);
      buildingModel = buildingCollection.findWhere({
        id: building_id
      });
      return this.show(new CommonFloor.TopApartmentMasterView({
        model: buildingModel,
        units: response
      }));
    };

    return TopApartmentMasterCtrl;

  })(Marionette.RegionController);

  ApartmentsView = (function(superClass) {
    extend(ApartmentsView, superClass);

    function ApartmentsView() {
      return ApartmentsView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsView.prototype.template = Handlebars.compile('	<div class=" info"> <label class="pull-left">{{unit_name}}</label> <div class="pull-right">{{unit_type}}</div> <!--{{super_built_up_area}}sqft--> <div class="clearfix"></div> </div> <div class="cost"> {{price}} </div>');

    ApartmentsView.prototype.initialize = function() {
      return this.$el.prop("id", 'apartment' + this.model.get("id"));
    };

    ApartmentsView.prototype.tagName = 'li';

    ApartmentsView.prototype.className = 'unit blocks';

    ApartmentsView.prototype.serializeData = function() {
      var availability, data, response, status;
      data = ApartmentsView.__super__.serializeData.call(this);
      response = window.unit.getUnitDetails(this.model.get('id'));
      data.unit_type = response[1].get('name');
      data.super_built_up_area = response[0].get('super_built_up_area');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      this.model.set('status', status);
      window.convertRupees(response[3]);
      data.price = $('#price').val();
      return data;
    };

    ApartmentsView.prototype.events = {
      'mouseover': function(e) {
        var id;
        id = this.model.get('id');
        $('#' + id).attr('class', 'layer ' + this.model.get('availability'));
        return $('#apartment' + id).attr('class', 'unit blocks ' + this.model.get('availability') + ' active');
      },
      'mouseout': function(e) {
        var id;
        id = this.model.get('id');
        $('#' + id).attr('class', 'layer');
        return $('#apartment' + id).attr('class', 'unit blocks ' + this.model.get('availability'));
      },
      'click': function(e) {
        if (this.model.get('availability') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          return CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
        }
      }
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

    LeftApartmentMasterView.prototype.template = '	<div><div class="col-md-3 col-xs-12 col-sm-12 search-left-content p-t-10"> <div class="filters-wrapper "> <div class="advncd-filter-wrp  unit-list"> <p class="text-center help-text">Hover on the units for more details</p> <ul class="units two"> </ul> </div> </div> </div></div>';

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
      var building_id, response, unitsCollection, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      response = window.building.getBuildingUnits(building_id);
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

    CenterApartmentMasterView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="list-view-container"> <!--<div class="controls mapView"> <div class="toggle"> <a href="#" class="map active">Map</a><a href="#" class="list">List</a> </div> </div>--> <div class="single-bldg"> <div class="prev"></div> <div class="next"></div> </div> <div id="spritespin"></div> <div class="svg-maps"> <img class="first_image img-responsive" src="" /> <div class="region inactive"></div> </div> <div class="cf-loader hidden"></div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> </div> </div>');

    CenterApartmentMasterView.prototype.ui = {
      svgContainer: '.list-view-container'
    };

    CenterApartmentMasterView.prototype.initialize = function() {
      this.currentBreakPoint = 0;
      return this.breakPoints = [];
    };

    CenterApartmentMasterView.prototype.events = {
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
        return CommonFloor.navigate('/building/' + building_id + '/apartments', true);
      },
      'click .map': function(e) {
        var building_id, url;
        e.preventDefault();
        url = Backbone.history.fragment;
        building_id = parseInt(url.split('/')[1]);
        return CommonFloor.navigate('/building/' + building_id + '/master-view', true);
      },
      'mouseover .layer': function(e) {
        var availability, html, id, response, unit;
        id = parseInt(e.target.id);
        unit = unitCollection.findWhere({
          'id': id
        });
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
        $('#' + id).attr('class', 'layer ' + availability);
        $('#apartment' + id).attr('class', ' unit blocks ' + availability + ' active');
        return $('.layer').tooltipster('content', html);
      },
      'mouseout .layer': function(e) {
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
        $('#' + id).attr('class', 'layer ');
        return $('#apartment' + id).attr('class', 'unit blocks ' + availability);
      }
    };

    CenterApartmentMasterView.prototype.onShow = function() {
      var breakpoints, building, building_id, height, svgs, that, transitionImages, url;
      height = this.ui.svgContainer.width() / 1.46;
      $('.search-left-content').css('height', height);
      $('#spritespin').hide();
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      console.log(building = buildingCollection.findWhere({
        id: building_id
      }));
      transitionImages = [];
      svgs = {};
      that = this;
      breakpoints = building.get('breakpoints');
      $.each(breakpoints, function(index, value) {
        console.log(value);
        return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/buildings/' + building_id + '/master-' + value + '.svg';
      });
      $.merge(transitionImages, building.get('building_master')['right-front']);
      $.merge(transitionImages, building.get('building_master')['back-right']);
      $.merge(transitionImages, building.get('building_master')['left-back']);
      $.merge(transitionImages, building.get('building_master')['front-left']);
      $('.region').load(svgs[0], $('.first_image').attr('src', transitionImages[0]), that.iniTooltip).addClass('active').removeClass('inactive');
      $('.first_image').bttrlazyloading({
        animation: 'fadeIn',
        placeholder: 'data:image/gif;base64,R0lGODlhMgAyAKUAAO7u...'
      });
      $('.first_image').load(function() {
        var response;
        response = building.checkRotationView(building_id);
        if (response === 1) {
          return $('.cf-loader').removeClass('hidden');
        }
      });
      return this.initializeRotate(transitionImages, svgs, breakpoints);
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

    CenterApartmentMasterView.prototype.initializeRotate = function(transitionImages, svgs, breakpoints) {
      var frames, spin, that, width;
      frames = transitionImages;
      this.breakPoints = breakpoints;
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
          url = svgs[data.frame];
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

    CenterApartmentMasterView.prototype.iniTooltip = function() {
      return $('.layer').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10
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