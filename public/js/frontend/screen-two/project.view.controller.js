(function() {
  var LeftBunglowCompositeView, LeftBunglowView, TopBunglowView, api,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  api = "";

  CommonFloor.BunglowLayoutView = (function(superClass) {
    extend(BunglowLayoutView, superClass);

    function BunglowLayoutView() {
      return BunglowLayoutView.__super__.constructor.apply(this, arguments);
    }

    BunglowLayoutView.prototype.template = '#project-view-template';

    return BunglowLayoutView;

  })(Marionette.LayoutView);

  CommonFloor.BunglowMasterViewCtrl = (function(superClass) {
    extend(BunglowMasterViewCtrl, superClass);

    function BunglowMasterViewCtrl() {
      return BunglowMasterViewCtrl.__super__.constructor.apply(this, arguments);
    }

    BunglowMasterViewCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.checkPropertyType();
      }
      if (bunglowVariantCollection.length !== 0) {
        return this.show(new CommonFloor.BunglowLayoutView);
      } else {
        return this.show(new CommonFloor.NothingFoundView);
      }
    };

    return BunglowMasterViewCtrl;

  })(Marionette.RegionController);

  TopBunglowView = (function(superClass) {
    extend(TopBunglowView, superClass);

    function TopBunglowView() {
      return TopBunglowView.__super__.constructor.apply(this, arguments);
    }

    TopBunglowView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1>We are now at {{project_title}}\'s upcoming project having {{units}} villas</h1> </div> </div> </div>');

    TopBunglowView.prototype.serializeData = function() {
      var data;
      data = TopBunglowView.__super__.serializeData.call(this);
      data.units = CommonFloor.getBunglowUnits().length;
      return data;
    };

    return TopBunglowView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowCtrl = (function(superClass) {
    extend(TopBunglowCtrl, superClass);

    function TopBunglowCtrl() {
      return TopBunglowCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowCtrl.prototype.initialize = function() {
      return this.show(new TopBunglowView({
        model: project
      }));
    };

    return TopBunglowCtrl;

  })(Marionette.RegionController);

  LeftBunglowView = (function(superClass) {
    extend(LeftBunglowView, superClass);

    function LeftBunglowView() {
      return LeftBunglowView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-sm-4"> <h6 class="{{status}}">{{unit_name}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{unit_type}}</h6> </div> <div class="col-sm-4"> <h6 class="">{{super_build_up_area}} sqft</h6> </div> </div>');

    LeftBunglowView.prototype.initialize = function() {
      return this.$el.prop("id", 'unit' + this.model.get("id"));
    };

    LeftBunglowView.prototype.className = 'blck-wrap';

    LeftBunglowView.prototype.serializeData = function() {
      var availability, data, unitType, unitVariant;
      data = LeftBunglowView.__super__.serializeData.call(this);
      console.log(unitVariant = bunglowVariantCollection.findWhere({
        'id': this.model.get('unit_variant_id')
      }));
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.unit_type = unitType.get('name');
      data.super_build_up_area = unitVariant.get('super_build_up_area');
      availability = this.model.get('availability');
      data.status = s.decapitalize(availability);
      this.model.set('status', data.status);
      return data;
    };

    LeftBunglowView.prototype.events = {
      'mouseover .row': function(e) {
        var id;
        id = this.model.get('id');
        return $('#' + id).attr('class', 'layer ' + this.model.get('status'));
      },
      'mouseout .row': function(e) {
        return $('.layer').attr('class', 'layer');
      },
      'click .row': function(e) {
        if (this.model.get('status') === 'available') {
          CommonFloor.defaults['unit'] = this.model.get('id');
          return CommonFloor.navigate('/bunglows/unit-view/' + this.model.get('id'), true);
        }
      }
    };

    return LeftBunglowView;

  })(Marionette.ItemView);

  LeftBunglowCompositeView = (function(superClass) {
    extend(LeftBunglowCompositeView, superClass);

    function LeftBunglowCompositeView() {
      return LeftBunglowCompositeView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowCompositeView.prototype.template = Handlebars.compile('	<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper "> <div class="advncd-filter-wrp  unit-list"> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div> <div class="units"> </div> </div> </div> </div>');

    LeftBunglowCompositeView.prototype.childView = LeftBunglowView;

    LeftBunglowCompositeView.prototype.childViewContainer = '.units';

    return LeftBunglowCompositeView;

  })(Marionette.CompositeView);

  CommonFloor.LeftBunglowCtrl = (function(superClass) {
    extend(LeftBunglowCtrl, superClass);

    function LeftBunglowCtrl() {
      return LeftBunglowCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection;
      newUnits = CommonFloor.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      return this.show(new LeftBunglowCompositeView({
        collection: unitsCollection
      }));
    };

    return LeftBunglowCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterBunglowView = (function(superClass) {
    extend(CenterBunglowView, superClass);

    function CenterBunglowView() {
      return CenterBunglowView.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div id="spritespin"></div> <div class="svg-maps"> <div class="region inactive"></div> </div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> </div>');

    CenterBunglowView.prototype.initialize = function() {
      this.currentBreakPoint = "";
      return this.breakPoints = "";
    };

    CenterBunglowView.prototype.events = {
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
        console.log(id = parseInt(e.target.id));
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
        html += '<div class="svg-info"> <h4 class="pull-left">' + unit.get('unit_name') + '</h4> <!--<span class="label label-success"></span--> <div class="clearfix"></div> <div class="details"> <div> <label>Area</label> - ' + unitVariant.get('super_build_up_area') + ' Sq.ft </div> <div> <label>Unit Type </label> - ' + unitType.get('name') + '</div> </div> </div>';
        console.log(availability);
        $('#' + id).attr('class', 'layer ' + availability);
        $('#unit' + id).attr('class', 'blck-wrap active');
        return $('.layer').tooltipster('content', html);
      }
    };

    CenterBunglowView.prototype.onShow = function() {
      var response, svgs, transitionImages;
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

    CenterBunglowView.prototype.setDetailIndex = function(index) {
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

    CenterBunglowView.prototype.initializeRotate = function(transitionImages, svgs) {
      var frames, spin, that;
      frames = transitionImages;
      this.breakPoints = [0, 4, 8, 12];
      this.currentBreakPoint = 0;
      $('.svg-maps > div').first().removeClass('inactive').addClass('active');
      spin = $('#spritespin');
      spin.spritespin({
        source: frames,
        width: 800,
        sense: -1,
        height: 600,
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

    CenterBunglowView.prototype.iniTooltip = function() {
      return $('.layer').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10
      });
    };

    return CenterBunglowView;

  })(Marionette.ItemView);

  CommonFloor.CenterBunglowCtrl = (function(superClass) {
    extend(CenterBunglowCtrl, superClass);

    function CenterBunglowCtrl() {
      return CenterBunglowCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.CenterBunglowView({
        model: project
      }));
    };

    return CenterBunglowCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/screen-two/project.view.controller.js.map