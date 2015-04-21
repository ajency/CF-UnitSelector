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

    TopBunglowUnitView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span><a href="#/master-view"> Back to Poject Overview</a> </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1>You have selected {{unit_name}} {{type}}</h1> </div> </div> </div>');

    return TopBunglowUnitView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowUnitCtrl = (function(superClass) {
    extend(TopBunglowUnitCtrl, superClass);

    function TopBunglowUnitCtrl() {
      return TopBunglowUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowUnitCtrl.prototype.initialize = function() {
      var response, unit, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unit = unitCollection.findWhere({
        id: unitid
      });
      response = window.unit.getUnitDetails(unitid);
      unit.set('type', response[2]);
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

    LeftBunglowUnitView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="blck-wrap title-row"> <h2 class="pull-left"><strong>{{unit_name}}</strong></h2> <!-- <span class="label label-success">For Sale</span> --> <div class="clearfix"></div> <div class="details"> <div> <label>Price: </label> <span class="price"></span> </div> <div> <label>Unit Type:</label> {{type}} </div> <div> <label>Area:</label> {{area}} sqft </div> </div> <div class="room-attr m-t-10"> <label>Property Attributes</label> {{#attributes}} <div class="m-b-5"> <span>{{attribute}}</span>: {{value}} </div> {{/attributes}} </div> <div class="unit-list"> {{#levels}} <div class="blck-wrap no-hover"> <h4 class="m-b-10 m-t-10 text-primary">{{level_name}}</h4> <!--<div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Rooms</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div>--> {{#rooms}} <div class="room-attr"> <div class="m-b-15"> <h5 class="m-b-5">{{room_name}}</h5> {{#attributes}} <div class=""><span>{{attribute}}</span>: {{value}} </div> {{/attributes}} <!--<h6 class="">{{size}}sqft</h6>--> </div> </div> {{/rooms}} </div> {{/levels}} </div> </div> </div> </div>');

    LeftBunglowUnitView.prototype.serializeData = function() {
      var attributes, data, floor, levels, response, unitType, unitid, url;
      data = LeftBunglowUnitView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      console.log(response = window.unit.getUnitDetails(unitid));
      levels = [];
      floor = response[0].get('floor');
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
        'id': response[0].get('unit_type_id')
      });
      attributes = [];
      if (response[4] !== null) {
        $.each(response[4], function(index, value) {
          return attributes.push({
            'attribute': s.capitalize(index),
            'value': value
          });
        });
      }
      data.area = response[0].get('super_built_up_area');
      data.type = response[1].get('name');
      data.unit_name = unit.get('unit_name');
      data.levels = levels;
      data.attributes = attributes;
      return data;
    };

    LeftBunglowUnitView.prototype.onShow = function() {
      var response, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      window.convertRupees(response[3]);
      return $('.price').text($('#price').val());
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

    CenterBunglowUnitView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area"> <div class="liquid-slider slider" id="slider-id"> <div class="ls-wrapper ls-responsive"> <div class="ls-nav"> <ul> <li class="external current"> <h4 class="title">External 3D</h4> </li> <li class="twoD"> <h4 class="title">2D Layout</h4> </li> <li class="threeD"> <h4 class="title">3D Layout</h4> </li> </ul> </div> <!--<div class="external"> <h2 class="title">External 3D</h2> </div> <div class="twoD"> <h2 class="title">2D Layout</h2> </div> <div class="threeD"> <h2 class="title">3D Layout</h2> </div>--> </div> <div class="liquid-slider slider"> <div class="panel-wrapper"> <div class="Level_2"> <div class="images animated fadeIn"> </div> </div> </div> </div> </div> </div> </div>');

    CenterBunglowUnitView.prototype.events = {
      'click .threeD': function(e) {
        var floor, html, i, level, response, threeD, twoD, unitid, url;
        url = Backbone.history.fragment;
        unitid = parseInt(url.split('/')[1]);
        response = window.unit.getUnitDetails(unitid);
        twoD = [];
        threeD = [];
        level = [];
        floor = response[0].get('floor');
        i = 0;
        $.each(floor, function(index, value) {
          twoD.push(value.url2dlayout_image);
          threeD.push(value.url3dlayout_image);
          level.push(s.replaceAll('Level ' + i, " ", "_"));
          return i = i + 1;
        });
        html = '';
        $.each(threeD, function(index, value) {
          return html += '<div class="layouts animated fadeIn"> <img src="' + value + '" /><span>' + level[index] + '</span> </div>';
        });
        $('.images').html(html);
        $('.threeD').addClass('current');
        $('.external').removeClass('current');
        return $('.twoD').removeClass('current');
      },
      'click .twoD': function(e) {
        var floor, html, i, level, response, threeD, twoD, unitid, url;
        url = Backbone.history.fragment;
        unitid = parseInt(url.split('/')[1]);
        response = window.unit.getUnitDetails(unitid);
        twoD = [];
        threeD = [];
        level = [];
        floor = response[0].get('floor');
        i = 0;
        $.each(floor, function(index, value) {
          twoD.push(value.url2dlayout_image);
          threeD.push(value.url3dlayout_image);
          level.push(s.replaceAll('Level ' + i, " ", "_"));
          return i = i + 1;
        });
        html = '';
        $.each(twoD, function(index, value) {
          return html += '<div class="layouts animated fadeIn"> <img src="' + value + '" /><span>' + level[index] + '</span> </div>';
        });
        $('.images').html(html);
        $('.twoD').addClass('current');
        $('.external').removeClass('current');
        return $('.threeD').removeClass('current');
      },
      'click .external': function(e) {
        var floor, html, level, response, threeD, twoD, unitid, url;
        url = Backbone.history.fragment;
        unitid = parseInt(url.split('/')[1]);
        response = window.unit.getUnitDetails(unitid);
        twoD = [];
        threeD = [];
        level = [];
        floor = response[0].get('floor');
        html = '<div class="animated fadeIn"> <img src="' + response[0].get('external3durl') + '" /> </div>';
        $('.images').html(html);
        $('.external').addClass('current');
        $('.threeD').removeClass('current');
        return $('.twoD').removeClass('current');
      }
    };

    CenterBunglowUnitView.prototype.onShow = function() {
      var floor, html, i, level, response, threeD, twoD, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      twoD = [];
      threeD = [];
      level = [];
      floor = response[0].get('floor');
      i = 0;
      $.each(floor, function(index, value) {
        twoD.push(value.url2dlayout_image);
        threeD.push(value.url3dlayout_image);
        level.push(s.replaceAll('Level ' + i, " ", "_"));
        return i = i + 1;
      });
      html = '';
      $.each(twoD, function(index, value) {
        return html += '<img src="' + value + '" /><span>' + level[index] + '</span>';
      });
      $('.images').html(html);
      if (response[0].get('external3durl') !== void 0) {
        html = '<img src="' + response[0].get('external3durl') + '" />';
        $('.images').html(html);
      }
      if (twoD.length === 0) {
        $('.twoD').hide();
      }
      if (threeD.length === 0) {
        $('.threeD').hide();
      }
      if (response[0].get('external3durl') === void 0) {
        return $('.external').hide();
      }
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