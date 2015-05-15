(function() {
  var CenterUnitView, LeftUnitView, TopUnitView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.UnitView = (function(superClass) {
    extend(UnitView, superClass);

    function UnitView() {
      return UnitView.__super__.constructor.apply(this, arguments);
    }

    UnitView.prototype.template = '#unit-view-template';

    return UnitView;

  })(Marionette.LayoutView);

  CommonFloor.UnitCtrl = (function(superClass) {
    extend(UnitCtrl, superClass);

    function UnitCtrl() {
      return UnitCtrl.__super__.constructor.apply(this, arguments);
    }

    UnitCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      console.log(project.toJSON());
      if (jQuery.isEmptyObject(project.toJSON())) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.UnitView);
      }
    };

    return UnitCtrl;

  })(Marionette.RegionController);

  TopUnitView = (function(superClass) {
    extend(TopUnitView, superClass);

    function TopUnitView() {
      return TopUnitView.__super__.constructor.apply(this, arguments);
    }

    TopUnitView.prototype.template = Handlebars.compile('<div class="container-fluid"> <div class="row animated fadeIn"> <div class="col-md-12 col-xs-12 col-sm-12 text-center"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"> Back to Project Overview </a> </div> <h2 class="proj-name">{{project_title}} - {{unit_name}}</h2> <!--<div class="pull-right m-t-25"> <button class="btn btn-primary cf-btn-white">Get Price List</button> <button class="btn btn-primary cf-btn-primary">Book Now</button> </div>--> <div class="clearfix"></div> </div> </div> </div>');

    TopUnitView.prototype.ui = {
      unitBack: '.unit_back'
    };

    TopUnitView.prototype.serializeData = function() {
      var data;
      data = TopUnitView.__super__.serializeData.call(this);
      data.project_title = project.get('project_title');
      return data;
    };

    TopUnitView.prototype.events = function() {
      return {
        'click @ui.unitBack': function(e) {
          var previousRoute;
          e.preventDefault();
          previousRoute = CommonFloor.router.previous();
          return CommonFloor.navigate('/' + previousRoute, true);
        }
      };
    };

    TopUnitView.prototype.onShow = function() {
      CommonFloor.router.storeRoute();
      if (CommonFloor.router.history.length === 1) {
        return this.ui.unitBack.hide();
      }
    };

    return TopUnitView;

  })(Marionette.ItemView);

  CommonFloor.TopUnitCtrl = (function(superClass) {
    extend(TopUnitCtrl, superClass);

    function TopUnitCtrl() {
      return TopUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    TopUnitCtrl.prototype.initialize = function() {
      var response, unit, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unit = unitCollection.findWhere({
        id: unitid
      });
      response = window.unit.getUnitDetails(unitid);
      unit.set('type', s.capitalize(response[2]));
      return this.show(new TopUnitView({
        model: unit
      }));
    };

    return TopUnitCtrl;

  })(Marionette.RegionController);

  LeftUnitView = (function(superClass) {
    extend(LeftUnitView, superClass);

    function LeftUnitView() {
      return LeftUnitView.__super__.constructor.apply(this, arguments);
    }

    LeftUnitView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content unit-details animated fadeIn"> <div class="filters-wrapper"> <div class="blck-wrap title-row"> <!--<h3 class="pull-left"><strong>{{unit_name}}</strong></h3> <span class="label label-success">For Sale</span> --> <div class="clearfix"></div> <div class="details"> <div> <label>Price: </label> <span class="icon-rupee-icn price"></span> </div> <div> <label>Unit Variant:</label> {{unit_variant}} </div> <div> <label>Unit Type:</label> {{type}} </div> <div> <label>Area:</label> {{area}} sqft </div> </div> <div class="room-attr m-t-10"> <label class="property hidden">Property Attributes</label> {{#attributes}} <div class="m-b-5"> <span>{{attribute}}</span>: {{value}} </div> {{/attributes}} </div> </div> <div class="unit-list"> {{#levels}} <div class="blck-wrap no-hover"> <h4 class="m-b-10 m-t-10 text-primary">{{level_name}}</h4> <!--<div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Rooms</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div>--> {{#rooms}} <div class="room-attr"> <div class="m-b-15"> <h5 class="m-b-5">{{room_name}}</h5> {{#attributes}} <div class=""><span>{{attribute}}</span>: {{value}} </div> {{/attributes}} <!--<h6 class="">{{size}}sqft</h6>--> </div> </div> {{/rooms}} </div> {{/levels}} </div> </div> <div class="clearfix"></div> <div class="similar-section"> <span class="similar">{{similarUnitsText}}</span><br> <!--<p>Pool View, Garden, 3BHK</p>--> <ul> {{#similarUnits}} <li class=""> {{unit_name}} </li> {{/similarUnits}} </ul> </div> </div> </div>');

    LeftUnitView.prototype.serializeData = function() {
      var attributes, data, floor, response, similarUnits, temp, unit, unitid, url;
      data = LeftUnitView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      unit = unitCollection.findWhere({
        id: unitid
      });
      floor = response[0].get('floor');
      attributes = [];
      if (response[4] !== null) {
        $.each(response[4], function(index, value) {
          return attributes.push({
            'attribute': s.capitalize(index),
            'value': value
          });
        });
      }
      similarUnits = this.getSimilarUnits(unit)[0];
      temp = [];
      $.each(similarUnits, function(index, value) {
        return temp.push({
          'unit_name': value.get('unit_name')
        });
      });
      data.area = response[0].get('super_built_up_area');
      data.type = response[1].get('name');
      data.unit_variant = response[0].get('unit_variant_name');
      data.levels = this.generateLevels(floor, response, unit);
      data.attributes = attributes;
      data.similarUnits = temp;
      data.similarUnitsText = this.getSimilarUnits(unit)[1];
      return data;
    };

    LeftUnitView.prototype.getSimilarUnits = function(unit) {
      var i, property, text, unitModel, unitType, unitid, units, unitsArr, url;
      units = [];
      i = 0;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unitModel = unitMasterCollection.findWhere({
        'id': unitid
      });
      unitType = unitTypeMasterCollection.findWhere({
        'id': unitModel.get('unit_type_id')
      });
      property = window.propertyTypes[unitType.get('property_type_id')];
      text = '';
      if (s.decapitalize(property) === 'apartments' || s.decapitalize(property) === 'penthouse') {
        unitCollection.reset(apartmentVariantCollection.getApartmentUnits());
        text = 'Similar ' + s.decapitalize(property) + ' based on your filters';
      }
      if (s.decapitalize(property) === 'villas/Bungalows') {
        unitCollection.reset(bunglowVariantCollection.getBunglowUnits());
        text = 'Similar ' + s.decapitalize(property) + ' based on your filters';
      }
      if (s.decapitalize(property) === 'plot') {
        unitCollection.reset(plotVariantCollection.getPlotUnits());
        text = 'Similar ' + s.decapitalize(property) + ' based on your filters';
      }
      unitsArr = unitCollection.toArray();
      $.each(unitsArr, function(item, value) {
        if (value.get('id') !== unitid) {
          units.push(value);
          i++;
        }
        if (i === 3) {
          return false;
        }
      });
      if (unitsArr.length === 1) {
        text = '';
      }
      return [units, text];
    };

    LeftUnitView.prototype.generateLevels = function(floor, response, unit) {
      var levels;
      levels = [];
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
      return levels;
    };

    LeftUnitView.prototype.onShow = function() {
      var response, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      $('.price').text(window.numDifferentiation(response[3]));
      console.log(response[4]);
      if (response[4] !== null && response[4].length !== 0) {
        return $('.property').removeClass('hidden');
      }
    };

    return LeftUnitView;

  })(Marionette.ItemView);

  CommonFloor.LeftUnitCtrl = (function(superClass) {
    extend(LeftUnitCtrl, superClass);

    function LeftUnitCtrl() {
      return LeftUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftUnitCtrl.prototype.initialize = function() {
      return this.show(new LeftUnitView);
    };

    return LeftUnitCtrl;

  })(Marionette.RegionController);

  CenterUnitView = (function(superClass) {
    extend(CenterUnitView, superClass);

    function CenterUnitView() {
      return CenterUnitView.__super__.constructor.apply(this, arguments);
    }

    CenterUnitView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content animated fadeIn"> <div class="svg-area"> <div class="liquid-slider slider" id="slider-id"> <div class="ls-wrapper ls-responsive"> <div class="ls-nav"> <ul> <li class="external "> <h4 class="title">External 3D</h4> </li> <li class="twoD"> <h4 class="title">2D Layout</h4> </li> <li class="threeD"> <h4 class="title">3D Layout</h4> </li> <li class="gallery"> <h4 class="title">Gallery</h4> </li> </ul> </div> <!--<div class="external"> <h2 class="title">External 3D</h2> </div> <div class="twoD"> <h2 class="title">2D Layout</h2> </div> <div class="threeD"> <h2 class="title">3D Layout</h2> </div>--> </div> <div class="liquid-slider slider"> <div class="panel-wrapper"> <div class="level "> <div class="images animated fadeIn text-center"> </div> </div> </div> </div> </div> </div> </div>');

    CenterUnitView.prototype.ui = {
      imagesContainer: '.us-right-content'
    };

    CenterUnitView.prototype.events = {
      'click .threeD': function(e) {
        var html, response;
        response = this.generateLevels();
        html = '';
        $.each(response[1], function(index, value) {
          return html += '<div class="layouts animated fadeIn"> <a class="fancybox" rel="3d" href="' + value + '" title="' + s.replaceAll(response[2][index], "_", " ") + '"> <img class="img" data-src="' + value + '" /> <div class="img-overlay"></div> <span>' + s.replaceAll(response[2][index], "_", " ") + '</span> </a> </div>';
        });
        $('.images').html(html);
        $('.img').lazyLoadXT();
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
          return html += '<div class="layouts animated fadeIn"> <a class="fancybox" rel="2d" href="' + value + '" title="' + s.replaceAll(response[2][index], "_", " ") + '"> <img class="img" data-src="' + value + '" /> <div class="img-overlay"></div> <span>' + s.replaceAll(response[2][index], "_", " ") + '</span> </a> </div>';
        });
        $('.images').html(html);
        $('.img').lazyLoadXT();
        $('.twoD').addClass('current');
        $('.external').removeClass('current');
        $('.threeD').removeClass('current');
        return $('.gallery').removeClass('current');
      },
      'click .external': function(e) {
        var html, response;
        response = this.generateLevels();
        html = '';
        html += '<div class="animated fadeIn"> <img class="img" data-src="' + response[3].get('external3durl') + '" /> </div>';
        $('.images').html(html);
        $('.img').lazyLoadXT();
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
          return html += '<div class="animated fadeIn gallery-img"> <a class="fancybox" rel="gall" href="' + value + '"> <img class="img" data-src="' + value + '" /> <div class="img-overlay"></div> </a> </div>';
        });
        $('.images').html(html);
        $('.img').lazyLoadXT();
        $('.gallery').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        return $('.external').removeClass('current');
      }
    };

    CenterUnitView.prototype.onShow = function() {
      var height, html, response;
      this.getNextPrevUnit();
      response = this.generateLevels();
      html = '';
      $.each(response[0], function(index, value) {
        return html += '<div class="layouts animated fadeIn"> <a class="fancybox" href="' + value + '"> <img class="img" data-src="' + value + '" /> <div class="img-overlay"></div> <span>' + s.replaceAll(response[2][index], "_", " ") + '</span> </a> </div>';
      });
      $('.twoD').addClass('current');
      $('.threeD').removeClass('current');
      $('.external').removeClass('current');
      $('.gallery').removeClass('current');
      if (response[0].length === 0) {
        $.each(response[1], function(index, value) {
          return html += '<img data-src="' + value + '" /><span>' + s.replaceAll(response[2][index], "_", " ") + '</span>';
        });
        $('.threeD').addClass('current');
        $('.external').removeClass('current');
        $('.twoD').removeClass('current');
        $('.gallery').removeClass('current');
      }
      $('.images').html(html);
      $('.level').attr('class', 'level Level_0 ' + _.last(response[2]));
      if (!_.isUndefined(response[3].get('external3durl'))) {
        html = '<img class="img lazy-hidden"  data-src="' + response[3].get('external3durl') + '" />';
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
      if (_.isUndefined(response[3].get('external3durl'))) {
        $('.external').hide();
      }
      if (_.isUndefined(response[3].get('galleryurl'))) {
        $('.gallery').hide();
      }
      if (response[0].length === 0 && response[1].length === 0 && _.isUndefined(response[3].get('external3durl'))) {
        $('.gallery').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.external').removeClass('current');
        if (!_.isUndefined(response[3].get('galleryurl'))) {
          $.each(response[3].get('galleryurl'), function(index, value) {
            return html += '<div class="animated fadeIn"><img class="img" data-src="' + value + '" /></div>';
          });
        }
      }
      height = this.ui.imagesContainer.height();
      $('.search-left-content').css('height', height);
      $('.search-left-content').mCustomScrollbar({
        theme: 'inset'
      });
      $('.images').html(html);
      $(".fancybox").fancybox();
      return $('.img').lazyLoadXT();
    };

    CenterUnitView.prototype.generateLevels = function() {
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
        if (!_.isUndefined(value.url2dlayout_image) && value.url2dlayout_image !== "") {
          twoD.push(value.url2dlayout_image);
        }
        if (!_.isUndefined(value.url3dlayout_image) && value.url3dlayout_image !== "") {
          threeD.push(value.url3dlayout_image);
        }
        level_name = 'Level  ' + index;
        level.push(s.replaceAll('Level ' + i, " ", "_"));
        return i = i + 1;
      });
      return [twoD, threeD, level, response[0]];
    };

    CenterUnitView.prototype.getNextPrevUnit = function() {
      var next, prev, property, unitModel, unitType, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unitModel = unitCollection.findWhere({
        'id': unitid
      });
      unitType = unitTypeMasterCollection.findWhere({
        'id': unitModel.get('unit_type_id')
      });
      property = window.propertyTypes[unitType.get('property_type_id')];
      if (s.decapitalize(property) === 'apartments' || s.decapitalize(property) === 'penthouse') {
        unitCollection.reset(apartmentVariantCollection.getApartmentUnits());
      }
      if (s.decapitalize(property) === 'villas/Bungalows') {
        unitCollection.reset(bunglowVariantCollection.getBunglowUnits());
      }
      if (s.decapitalize(property) === 'plot') {
        unitCollection.reset(plotVariantCollection.getPlotUnits());
      }
      unitCollection.setRecord(unitModel);
      console.log(next = unitCollection.next());
      return console.log(prev = unitCollection.prev());
    };

    return CenterUnitView;

  })(Marionette.ItemView);

  CommonFloor.CenterUnitCtrl = (function(superClass) {
    extend(CenterUnitCtrl, superClass);

    function CenterUnitCtrl() {
      return CenterUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterUnitCtrl.prototype.initialize = function() {
      return this.show(new CenterUnitView);
    };

    return CenterUnitCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/unit-view/unit.controller.js.map