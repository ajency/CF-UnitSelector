(function() {
  var LeftBunglowMasterCompositeView, LeftBunglowMasterView, TopBunglowMasterView, api,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  api = "";

  CommonFloor.BunglowMasterView = (function(superClass) {
    extend(BunglowMasterView, superClass);

    function BunglowMasterView() {
      return BunglowMasterView.__super__.constructor.apply(this, arguments);
    }

    BunglowMasterView.prototype.template = '#project-view-template';

    return BunglowMasterView;

  })(Marionette.LayoutView);

  CommonFloor.BunglowMasterCtrl = (function(superClass) {
    extend(BunglowMasterCtrl, superClass);

    function BunglowMasterCtrl() {
      return BunglowMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    BunglowMasterCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.checkPropertyType();
      }
      if (project.get('project_master').front !== "") {
        return this.show(new CommonFloor.BunglowMasterView);
      } else {
        return this.show(new CommonFloor.NothingFoundView);
      }
    };

    return BunglowMasterCtrl;

  })(Marionette.RegionController);

  TopBunglowMasterView = (function(superClass) {
    extend(TopBunglowMasterView, superClass);

    function TopBunglowMasterView() {
      return TopBunglowMasterView.__super__.constructor.apply(this, arguments);
    }

    TopBunglowMasterView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1>We are now at {{project_title}}\'s upcoming project having {{units}} villas</h1> </div> </div> </div>');

    TopBunglowMasterView.prototype.serializeData = function() {
      var data;
      data = TopBunglowMasterView.__super__.serializeData.call(this);
      data.units = bunglowVariantCollection.getBunglowUnits().length;
      return data;
    };

    return TopBunglowMasterView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowMasterCtrl = (function(superClass) {
    extend(TopBunglowMasterCtrl, superClass);

    function TopBunglowMasterCtrl() {
      return TopBunglowMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowMasterCtrl.prototype.initialize = function() {
      return this.show(new TopBunglowMasterView({
        model: project
      }));
    };

    return TopBunglowMasterCtrl;

  })(Marionette.RegionController);

  LeftBunglowMasterView = (function(superClass) {
    extend(LeftBunglowMasterView, superClass);

    function LeftBunglowMasterView() {
      return LeftBunglowMasterView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowMasterView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-sm-4"> <h6 class="{{status}}">{{unit_name}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{unit_type}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{super_built_up_area}} sqft</h6> </div> </div>');

    LeftBunglowMasterView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    LeftBunglowMasterView.prototype.className = 'blck-wrap';

    LeftBunglowMasterView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = LeftBunglowMasterView.__super__.serializeData.call(this);
      console.log(unitVariant = bunglowVariantCollection.findWhere({
        'id': this.model.get('unit_variant_id')
      }));
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.unit_type = unitType.get('name');
      data.super_built_up_area = unitVariant.get('super_built_up_area');
      availability = this.model.get('availability');
      data.status = s.decapitalize(availability);
      this.model.set('status', data.status);
      return data;
    };

    LeftBunglowMasterView.prototype.events = {
      'mouseover .row': function(e) {
        var availability, html, id, response, unit;
        id = this.model.get('id');
        console.log(window.unit);
        response = window.unit.getUnitDetails(id);
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit === void 0) {
          html += '<div class="svg-info"> <div class="details"> Villa details not entered </div> </div>';
          $('.layer').tooltipster('content', html);
          return false;
        }
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        html = "";
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Area</label> - ' + response[0].get('super_built_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + response[1].get('name') + '</div> </div> </div>';
        $('#' + id).attr('class', 'layer ' + this.model.get('status'));
        return $('.layer').tooltipster('content', html);
      },
      'mouseout .row': function(e) {
        return $('.layer').attr('class', 'layer');
      },
      'click .row': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          return CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
        }
      }
    };

    LeftBunglowMasterView.prototype.onShow = function() {
      return this.iniTooltip();
    };

    LeftBunglowMasterView.prototype.iniTooltip = function() {
      return $('.layer').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10
      });
    };

    return LeftBunglowMasterView;

  })(Marionette.ItemView);

  LeftBunglowMasterCompositeView = (function(superClass) {
    extend(LeftBunglowMasterCompositeView, superClass);

    function LeftBunglowMasterCompositeView() {
      return LeftBunglowMasterCompositeView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowMasterCompositeView.prototype.template = Handlebars.compile('	<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper "> <div class="advncd-filter-wrp  unit-list"> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div> <div class="units"> </div> </div> </div> </div>');

    LeftBunglowMasterCompositeView.prototype.childView = LeftBunglowMasterView;

    LeftBunglowMasterCompositeView.prototype.childViewContainer = '.units';

    return LeftBunglowMasterCompositeView;

  })(Marionette.CompositeView);

  CommonFloor.LeftBunglowMasterCtrl = (function(superClass) {
    extend(LeftBunglowMasterCtrl, superClass);

    function LeftBunglowMasterCtrl() {
      return LeftBunglowMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowMasterCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection;
      newUnits = bunglowVariantCollection.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      return this.show(new LeftBunglowMasterCompositeView({
        collection: unitsCollection
      }));
    };

    return LeftBunglowMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterBunglowMasterView = (function(superClass) {
    extend(CenterBunglowMasterView, superClass);

    function CenterBunglowMasterView() {
      return CenterBunglowMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowMasterView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="list-view-container"> <div class="controls mapView"> <div class="toggle"> <a href="#" class="map">Map</a><a href="#" class="list">List</a> </div> </div> <div id="spritespin"></div> <div class="svg-maps"> <div class="region inactive"></div> </div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> </div> </div>');

    CenterBunglowMasterView.prototype.ui = {
      svgContainer: '.list-view-container'
    };

    CenterBunglowMasterView.prototype.initialize = function() {
      this.currentBreakPoint = 0;
      return this.breakPoints = [];
    };

    CenterBunglowMasterView.prototype.events = {
      'click .list': function(e) {
        e.preventDefault();
        return CommonFloor.navigate('/list-view', true);
      },
      'click .map': function(e) {
        e.preventDefault();
        return CommonFloor.navigate('/master-view', true);
      },
      'click #prev': function() {
        return this.setDetailIndex(this.currentBreakPoint - 1);
      },
      'click #next': function() {
        return this.setDetailIndex(this.currentBreakPoint + 1);
      },
      'mouseout': function(e) {
        $('.layer').attr('class', 'layer');
        return $('.blck-wrap').attr('class', 'blck-wrap');
      },
      'mouseover .layer': function(e) {
        var availability, html, id, unit, unitType, unitVariant;
        id = parseInt(e.target.id);
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit === void 0) {
          html += '<div class="svg-info"> <div class="details"> Villa details not entered </div> </div>';
          $('.layer').tooltipster('content', html);
          return false;
        }
        unitVariant = bunglowVariantCollection.findWhere({
          'id': unit.get('unit_variant_id')
        });
        unitType = unitTypeCollection.findWhere({
          'id': unitVariant.get('unit_type_id')
        });
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        html = "";
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Area</label> - ' + unitVariant.get('super_built_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + unitType.get('name') + '</div> </div> </div>';
        console.log(availability);
        $('#' + id).attr('class', 'layer ' + availability);
        $('#unit' + id).attr('class', 'blck-wrap active');
        return $('.layer').tooltipster('content', html);
      }
    };

    CenterBunglowMasterView.prototype.onShow = function() {
      var response, svgs, transitionImages;
      if (project.get('project_master').front === "") {
        $('.mapView').hide();
      } else {
        $('.map').addClass('active');
        $('.mapView').show();
      }
      transitionImages = [];
      svgs = {};
      svgs[0] = project.get('project_master').front;
      svgs[4] = project.get('project_master').right;
      svgs[8] = project.get('project_master').back;
      svgs[12] = project.get('project_master').left;
      $.merge(transitionImages, project.get('project_master')['right-front']);
      $.merge(transitionImages, project.get('project_master')['back-right']);
      $.merge(transitionImages, project.get('project_master')['left-back']);
      $.merge(transitionImages, project.get('project_master')['front-left']);
      response = project.checkRotationView();
      if (response === 1) {
        $('.rotate').removeClass('hidden');
      }
      return this.initializeRotate(transitionImages, svgs);
    };

    CenterBunglowMasterView.prototype.setDetailIndex = function(index) {
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

    CenterBunglowMasterView.prototype.initializeRotate = function(transitionImages, svgs) {
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

    CenterBunglowMasterView.prototype.iniTooltip = function() {
      return $('.layer').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10
      });
    };

    return CenterBunglowMasterView;

  })(Marionette.ItemView);

  CommonFloor.CenterBunglowMasterCtrl = (function(superClass) {
    extend(CenterBunglowMasterCtrl, superClass);

    function CenterBunglowMasterCtrl() {
      return CenterBunglowMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowMasterCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.CenterBunglowMasterView({
        model: project
      }));
    };

    return CenterBunglowMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/bunglow-master-view/bunglow.master.controller.js.map