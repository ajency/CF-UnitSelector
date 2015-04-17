(function() {
  var CenterBunglowUnitView, LeftBunglowUnitView, TopBunglowUnitView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.BunglowUnitView = (function(superClass) {
    extend(BunglowUnitView, superClass);

    function BunglowUnitView() {
      return BunglowUnitView.__super__.constructor.apply(this, arguments);
    }

    BunglowUnitView.prototype.template = '#unit-view-template';

    return BunglowUnitView;

  })(Marionette.LayoutView);

  CommonFloor.BunglowUnitCtrl = (function(superClass) {
    extend(BunglowUnitCtrl, superClass);

    function BunglowUnitCtrl() {
      return BunglowUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    BunglowUnitCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      console.log(project.toJSON());
      if (jQuery.isEmptyObject(project.toJSON())) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.BunglowUnitView);
      }
    };

    return BunglowUnitCtrl;

  })(Marionette.RegionController);

  TopBunglowUnitView = (function(superClass) {
    extend(TopBunglowUnitView, superClass);

    function TopBunglowUnitView() {
      return TopBunglowUnitView.__super__.constructor.apply(this, arguments);
    }

    TopBunglowUnitView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span><a href="#/master-view/bunglows"> Back to Poject Overview</a> </span> </li> </ul> </div> </div> </div> <div class="search-header-wrap"> <h1>You have selected {{unit_name}} Villa</h1> </div> </div> </div>');

    return TopBunglowUnitView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowUnitCtrl = (function(superClass) {
    extend(TopBunglowUnitCtrl, superClass);

    function TopBunglowUnitCtrl() {
      return TopBunglowUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowUnitCtrl.prototype.initialize = function() {
      var unit, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unit = unitCollection.findWhere({
        id: unitid
      });
      return this.show(new TopBunglowUnitView({
        model: unit
      }));
    };

    return TopBunglowUnitCtrl;

  })(Marionette.RegionController);

  LeftBunglowUnitView = (function(superClass) {
    extend(LeftBunglowUnitView, superClass);

    function LeftBunglowUnitView() {
      return LeftBunglowUnitView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowUnitView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="blck-wrap"> <h2 class="pull-left"><strong>{{unit_name}}</strong></h2> <!-- <span class="label label-success">For Sale</span> --> <div class="clearfix"></div> <div class="details"> <!--<div> <label>Starting Price:</label> Rs 1.3 crores </div>--> <div> {{type}} ({{area}} sqft) </div> </div> </div> <div class="advncd-filter-wrp unit-list"> {{#levels}} <h4 class="m-b-0 m-t-20">{{level_name}}</h4> <div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Rooms</h5> </div> <!--<div class="col-sm-4"> <h5 class="accord-head">No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div>--> </div> </div> {{#rooms}} <div class="blck-wrap"> <div class="row"> <div class="col-sm-4"> <h6>{{room_name}}</h6> {{#attributes}} <div>{{attribute}}</div>:<div>{{value}}</div> {{/attributes}} </div> <!--<div class="col-sm-4"> <h6 class="">{{size}}sqft</h6> </div>--> </div> </div> {{/rooms}} {{/levels}} </div> </div> </div>');

    LeftBunglowUnitView.prototype.serializeData = function() {
      var data, floor, levels, unit, unitType, unitVariant, unitid, url;
      data = LeftBunglowUnitView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unit = unitCollection.findWhere({
        id: unitid
      });
      unitVariant = bunglowVariantCollection.findWhere({
        'id': unit.get('unit_variant_id')
      });
      levels = [];
      floor = unitVariant.get('floor');
      $.each(floor, function(index, value) {
        var rooms;
        rooms = [];
        $.each(value.rooms_data, function(ind, val) {
          var attributes;
          attributes = [];
          $.each(val.atributes, function(ind_att, val_att) {
            console.log(val_att);
            return attributes.push({
              'attribute': s.capitalize(val_att.attribute_key),
              'value': val_att.attribute_value
            });
          });
          return rooms.push({
            'room_name': val.room_name,
            'attributes': attributes
          });
        });
        return levels.push({
          'level_name': 'Level  ' + index,
          'rooms': rooms
        });
      });
      unitType = unitTypeCollection.findWhere({
        'id': unitVariant.get('unit_type_id')
      });
      data.area = unitVariant.get('super_built_up_area');
      data.type = unitType.get('name');
      data.unit_name = unit.get('unit_name');
      data.levels = levels;
      return data;
    };

    return LeftBunglowUnitView;

  })(Marionette.ItemView);

  CommonFloor.LeftBunglowUnitCtrl = (function(superClass) {
    extend(LeftBunglowUnitCtrl, superClass);

    function LeftBunglowUnitCtrl() {
      return LeftBunglowUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowUnitCtrl.prototype.initialize = function() {
      return this.show(new LeftBunglowUnitView);
    };

    return LeftBunglowUnitCtrl;

  })(Marionette.RegionController);

  CenterBunglowUnitView = (function(superClass) {
    extend(CenterBunglowUnitView, superClass);

    function CenterBunglowUnitView() {
      return CenterBunglowUnitView.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowUnitView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area"> <div class="liquid-slider" id="slider-id"> <div> <h2 class="title">External 3D</h2> <img src="{{external_url}}"> </div> <div> <h2 class="title">2D Layout</h2> <div class="row"> {{#levels}} <div class="col-sm-6 m-b-20"> <img src="{{two_d}}"> <h5 class="text-center">{{level_name}}</h5> </div> {{/levels}} </div> </div> <div> <h2 class="title">3D Layout</h2> <div class="row"> {{#levels}} <div class="col-sm-6 m-b-20"> <img src="{{three_d}}"> <h5 class="text-center">{{level_name}}</h5> </div> {{/levels}} </div> </div> </div> </div> </div>');

    CenterBunglowUnitView.prototype.serializeData = function() {
      var data, floor, levels, unit, unitVariant, unitid, url;
      data = CenterBunglowUnitView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unit = unitCollection.findWhere({
        id: unitid
      });
      unitVariant = bunglowVariantCollection.findWhere({
        'id': unit.get('unit_variant_id')
      });
      levels = [];
      floor = unitVariant.get('floor');
      $.each(floor, function(index, value) {
        var rooms;
        rooms = [];
        return levels.push({
          'two_d': value.url2dlayout_image,
          'three_d': value.url3dlayout_image,
          'level_name': 'Level ' + index
        });
      });
      data.levels = levels;
      data.external_url = unitVariant.get('external_3durl');
      return data;
    };

    CenterBunglowUnitView.prototype.onShow = function() {
      return $('#slider-id').liquidSlider({
        slideEaseFunction: "easeInOutQuad",
        includeTitle: false,
        autoSlideInterval: 4000,
        mobileNavigation: false,
        hideArrowsWhenMobile: false,
        dynamicTabsAlign: "center",
        dynamicArrows: false
      });
    };

    return CenterBunglowUnitView;

  })(Marionette.ItemView);

  CommonFloor.CenterBunglowUnitCtrl = (function(superClass) {
    extend(CenterBunglowUnitCtrl, superClass);

    function CenterBunglowUnitCtrl() {
      return CenterBunglowUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowUnitCtrl.prototype.initialize = function() {
      return this.show(new CenterBunglowUnitView);
    };

    return CenterBunglowUnitCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/bunglow-unit-view/bunglow.unit.controller.js.map