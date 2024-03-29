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

    TopApartmentMasterView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span> Back to Poject Overview </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1>We are now at {{project_title}}\'s upcoming project having {{units}} Apartments</h1> </div> </div> </div>');

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

    ApartmentsView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-sm-4"> <h6 class="{{status}}">{{unit_name}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{unit_type}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{super_built_up_area}} sqft</h6> </div> </div>');

    ApartmentsView.prototype.initialize = function() {
      return this.$el.prop("id", 'apartment' + this.model.get("id"));
    };

    ApartmentsView.prototype.className = 'blck-wrap';

    ApartmentsView.prototype.serializeData = function() {
      var data, status, unitType, unitVariant;
      data = ApartmentsView.__super__.serializeData.call(this);
      status = s.decapitalize(this.model.get('availability'));
      unitVariant = apartmentVariantCollection.findWhere({
        'id': this.model.get('unit_variant_id')
      });
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.unit_type = unitType.get('name');
      data.super_built_up_area = unitVariant.get('super_built_up_area');
      data.status = status;
      return data;
    };

    ApartmentsView.prototype.events = {
      'mouseover .row': function(e) {
        var id;
        id = this.model.get('id');
        return $('#' + id).attr('class', 'layer ' + this.model.get('availability'));
      },
      'mouseout .row': function(e) {
        var id;
        id = this.model.get('id');
        return $('#' + id).attr('class', 'layer');
      },
      'click .row': function(e) {
        if (this.model.get('availability') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          return CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
        }
      }
    };

    return ApartmentsView;

  })(Marionette.ItemView);

  CommonFloor.LeftApartmentMasterView = (function(superClass) {
    extend(LeftApartmentMasterView, superClass);

    function LeftApartmentMasterView() {
      return LeftApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentMasterView.prototype.template = '	<div><div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper "> <div class="advncd-filter-wrp  unit-list"> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div> <div class="units"> </div> </div> </div> </div></div>';

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

    CenterApartmentMasterView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="list-view-container"> <!--<div class="controls mapView"> <div class="toggle"> <a href="#" class="map active">Map</a><a href="#" class="list">List</a> </div> </div>--> <div class="single-bldg"> <div class="prev"></div> <div class="next"></div> </div> <div id="spritespin"></div> <div class="svg-maps"> <div class="region inactive"></div> </div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> </div> </div>');

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
        console.log(unit = unitCollection.findWhere({
          'id': id
        }));
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
        $('#apartment' + id).attr('class', 'blck-wrap active');
        return $('.layer').tooltipster('content', html);
      },
      'mouseout .layer': function(e) {
        var id;
        id = parseInt(e.target.id);
        $('#' + id).attr('class', 'layer ');
        return $('#apartment' + id).attr('class', 'blck-wrap');
      }
    };

    CenterApartmentMasterView.prototype.onShow = function() {
      var building, building_id, response, svgs, transitionImages, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      console.log(building = buildingCollection.findWhere({
        id: building_id
      }));
      transitionImages = [];
      svgs = {};
      svgs[0] = building.get('building_master').front;
      svgs[4] = building.get('building_master').right;
      svgs[8] = building.get('building_master').back;
      svgs[12] = building.get('building_master').left;
      console.log(svgs);
      $.merge(transitionImages, building.get('building_master')['right-front']);
      $.merge(transitionImages, building.get('building_master')['back-right']);
      $.merge(transitionImages, building.get('building_master')['left-back']);
      $.merge(transitionImages, building.get('building_master')['front-left']);
      response = building.checkRotationView(building);
      if (response === 1) {
        $('.rotate').removeClass('hidden');
      }
      return this.initializeRotate(transitionImages, svgs);
    };

    CenterApartmentMasterView.prototype.setDetailIndex = function(index) {
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

    CenterApartmentMasterView.prototype.initializeRotate = function(transitionImages, svgs) {
      var frames, spin, that, width;
      frames = transitionImages;
      this.breakPoints = [0, 4, 8, 12];
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
      return spin.bind("onFrame", function() {
        var data, url;
        data = api.data;
        if (data.frame === data.stopFrame) {
          url = svgs[data.frame];
          return $('.region').load(url, that.iniTooltip).addClass('active').removeClass('inactive');
        }
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