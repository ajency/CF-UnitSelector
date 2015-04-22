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

    TopBunglowUnitView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <!--<div class="row breadcrumb-bar"> <div class="col-xs-12 col-md-12"> <div class="bread-crumb-list"> <ul class="brdcrmb-wrp clearfix"> <li class=""> <span class="bread-crumb-current"> <span class=".icon-arrow-right2"></span><a href="#/master-view"> Back to Poject Overview</a> </span> </li> </ul> </div> </div> </div>--> <div class="search-header-wrap"> <h1 class="pull-left">You have selected Yoshi Gold Artha Villa</h1> <div class="pull-right m-t-25"> <button class="btn btn-primary cf-btn-white">Get Price List</button> <button class="btn btn-primary cf-btn-primary">Book Now</button> </div> <div class="clearfix"></div> </div> </div> <div class="search-header-wrap"> <h1 class="pull-left proj-name">{{project_title}}</h1> <div class="proj-type-count"> <h1 class="text-primary pull-left">{{unit_name}}</h1> <div class="clearfix"></div> </div> <div class="clearfix"></div> </div> </div> </div>');

    TopBunglowUnitView.prototype.serializeData = function() {
      var data;
      data = TopBunglowUnitView.__super__.serializeData.call(this);
      data.project_title = project.get('project_title');
      return data;
    };

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
      unit.set('type', s.capitalize(response[2]));
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

    LeftBunglowUnitView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="blck-wrap title-row"> <!--<h3 class="pull-left"><strong>{{unit_name}}</strong></h3> <span class="label label-success">For Sale</span> --> <div class="clearfix"></div> <div class="details"> <div> <label>Price: </label> <span class="price"></span> </div> <div> <label>Unit Type:</label> {{type}} </div> <div> <label>Area:</label> {{area}} sqft </div> </div> <div class="room-attr m-t-10"> <label class="property hidden">Property Attributes</label> {{#attributes}} <div class="m-b-5"> <span>{{attribute}}</span>: {{value}} </div> {{/attributes}} </div> </div> <div class="unit-list"> {{#levels}} <div class="blck-wrap no-hover"> <h4 class="m-b-10 m-t-10 text-primary">{{level_name}}</h4> <!--<div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Rooms</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div>--> {{#rooms}} <div class="room-attr"> <div class="m-b-15"> <h5 class="m-b-5">{{room_name}}</h5> {{#attributes}} <div class=""><span>{{attribute}}</span>: {{value}} </div> {{/attributes}} <!--<h6 class="">{{size}}sqft</h6>--> </div> </div> {{/rooms}} </div> {{/levels}} </div> </div> </div> </div>');

    LeftBunglowUnitView.prototype.serializeData = function() {
      var attributes, data, floor, levels, response, unit, unitType, unitid, url;
      data = LeftBunglowUnitView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      unit = unitCollection.findWhere({
        id: unitid
      });
      levels = [];
      floor = response[0].get('floor');
      $.each(floor, function(index, value) {
        var level_name, rooms;
        rooms = [];
        level_name = 'Level  ' + index;
        if (response[2] === 'apartment') {
          level_name = 'Floor ' + unit.get('floor');
        }
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
          'level_name': level_name,
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
      $('.price').text($('#price').val());
      if (response[4] !== null) {
        return $('.property').removeClass('hidden');
      }
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

    CenterBunglowUnitView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area"> <div class="liquid-slider slider" id="slider-id"> <div class="ls-wrapper ls-responsive"> <div class="ls-nav"> <ul> <li class="external "> <h4 class="title">External 3D</h4> </li> <li class="twoD"> <h4 class="title">2D Layout</h4> </li> <li class="threeD"> <h4 class="title">3D Layout</h4> </li> <li class="gallery"> <h4 class="title">Gallery</h4> </li> </ul> </div> <!--<div class="external"> <h2 class="title">External 3D</h2> </div> <div class="twoD"> <h2 class="title">2D Layout</h2> </div> <div class="threeD"> <h2 class="title">3D Layout</h2> </div>--> </div> <div class="liquid-slider slider"> <div class="panel-wrapper"> <div class="level "> <div class="images animated fadeIn"> </div> </div> </div> </div> </div> </div> </div>');

    CenterBunglowUnitView.prototype.events = {
      'click .threeD': function(e) {
        var html, response;
        response = this.generateLevels();
        html = '';
        $.each(response[1], function(index, value) {
          return html += '<div class="layouts animated fadeIn"> <img class="img" src="' + value + '" /><span>' + s.replaceAll(response[2][index], "_", " ") + '</span> </div>';
        });
        $('.images').html(html);
        $('.threeD').addClass('current');
        $('.external').removeClass('current');
        $('.twoD').removeClass('current');
        return $('.gallery').removeClass('current');
      },
      'click .twoD': function(e) {
        var html, response;
        response = this.generateLevels();
        html = '';
        $.each(response[0], function(index, value) {
          return html += '<div class="layouts animated fadeIn"> <img class="img" src="' + value + '" /><span>' + s.replaceAll(response[2][index], "_", " ") + '</span> </div>';
        });
        $('.images').html(html);
        $('.twoD').addClass('current');
        $('.external').removeClass('current');
        $('.threeD').removeClass('current');
        return $('.gallery').removeClass('current');
      },
      'click .external': function(e) {
        var html, response;
        response = this.generateLevels();
        html = '';
        html += '<div class="animated fadeIn"> <img class="img" src="' + response[3].get('external3durl') + '" /> </div>';
        $('.images').html(html);
        $('.external').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        return $('.gallery').removeClass('current');
      },
      'click .gallery': function(e) {
        var html, response;
        response = this.generateLevels();
        html = '';
        $.each(response[3].get('galleryurl'), function(index, value) {
          return html += '<div class="animated fadeIn"><img class="img" src="' + value + '" /></div>';
        });
        $('.images').html(html);
        $('.gallery').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        return $('.external').removeClass('current');
      }
    };

    CenterBunglowUnitView.prototype.onShow = function() {
      var html, response;
      response = this.generateLevels();
      html = '';
      $.each(response[0], function(index, value) {
        return html += '<img class="img" src="' + value + '" /><span>' + s.replaceAll(response[2][index], "_", " ") + '</span>';
      });
      $('.twoD').addClass('current');
      $('.threeD').removeClass('current');
      $('.external').removeClass('current');
      $('.gallery').removeClass('current');
      if (response[0].length === 0) {
        $.each(response[1], function(index, value) {
          return html += '<img class="img" src="' + value + '" /><span>' + s.replaceAll(response[2][index], "_", " ") + '</span>';
        });
        $('.threeD').addClass('current');
        $('.external').removeClass('current');
        $('.twoD').removeClass('current');
        $('.gallery').removeClass('current');
      }
      $('.images').html(html);
      $('.level').attr('class', 'level ' + _.last(response[2]));
      if (response[3].get('external3durl') !== void 0) {
        html = '<img class="img" src="' + response[3].get('external3durl') + '" />';
        $('.images').html(html);
        $('.external').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.gallery').removeClass('current');
      }
      if (response[0].length === 0) {
        $('.twoD').hide();
      }
      if (response[1].length === 0) {
        $('.threeD').hide();
      }
      if (response[3].get('external3durl') === void 0) {
        $('.external').hide();
      }
      if (response[3].get('galleryurl') === void 0) {
        $('.gallery').hide();
      }
      if (response[0].length === 0 && response[1].length === 0 && response[3].get('external3durl') === void 0) {
        $('.gallery').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.external').removeClass('current');
        $.each(response[3].get('galleryurl'), function(index, value) {
          return html += '<div class="animated fadeIn"><img class="img" src="' + value + '" /></div>';
        });
      }
      $('.images').html(html);
      return $('.img').bttrlazyloading({
        animation: 'fadeIn',
        placeholder: '<div class="cf-loader"></div>'
      });
    };

    CenterBunglowUnitView.prototype.generateLevels = function() {
      var floor, i, level, response, threeD, twoD, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      twoD = [];
      threeD = [];
      level = [];
      floor = response[0].get('floor');
      i = 0;
      $.each(floor, function(index, value) {
        var level_name;
        if (value.url2dlayout_image !== void 0 && value.url2dlayout_image !== "") {
          twoD.push(value.url2dlayout_image);
        }
        if (value.url3dlayout_image !== void 0 && value.url3dlayout_image !== "") {
          threeD.push(value.url3dlayout_image);
        }
        level_name = 'Level  ' + index;
        if (response[2] !== 'apartment') {
          level.push(s.replaceAll('Level ' + i, " ", "_"));
        }
        return i = i + 1;
      });
      return [twoD, threeD, level, response[0]];
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