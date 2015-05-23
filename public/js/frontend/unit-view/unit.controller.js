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

    TopUnitView.prototype.template = Handlebars.compile('<div class="container-fluid animated fadeIn"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"></a> </div> <div class="header-info"> <h2 class="pull-left proj-name">{{project_title}} - {{unit_name}}</h2> </div> <div class="clearfix"></div> </div> </div> </div>');

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
          var buildingModel, building_id, previousRoute, property, unit, unitType, unitid, url;
          e.preventDefault();
          previousRoute = CommonFloor.router.previous();
          url = Backbone.history.fragment;
          unitid = parseInt(url.split('/')[1]);
          console.log(unit = unitCollection.findWhere({
            id: unitid
          }));
          unitType = unitTypeMasterCollection.findWhere({
            'id': unit.get('unit_type_id')
          });
          property = window.propertyTypes[unitType.get('property_type_id')];
          if (s.decapitalize(property) === 'penthouse' || s.decapitalize(property) === 'apartments') {
            buildingModel = buildingCollection.findWhere({
              'id': unit.get('building_id')
            });
            building_id = buildingModel.get('id');
            if (Object.keys(buildingModel.get('building_master')).length === 0) {
              return CommonFloor.navigate('/building/' + building_id + '/apartments', true);
            } else {
              return CommonFloor.navigate('/building/' + building_id + '/master-view', true);
            }
          } else {
            return CommonFloor.navigate('/master-view', true);
          }
        }
      };
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

    LeftUnitView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content animated fadeIn"> <div class="unit-details"> <div class="row detail-list"> <div class="col-sm-6 col-xs-6"> <span class="facts-icon icon-total-units"></span> <div class="unit-label"> <h3>{{unit_variant}}</h3> <h5 class="text-muted">Unit Variant</h5> </div> </div> <div class="col-sm-6 col-xs-6"> <span class="facts-icon icon-BHKtype"></span> <div class="unit-label"> <h3>{{type}}</h3> <h5 class="text-muted">Unit Type</h5> </div> </div> </div> <div class="row detail-list"> <div class="col-sm-6 col-xs-6"> <span class="facts-icon icon-BHK-area-2"></span> <div class="unit-label"> <h3>{{area}} sq.ft</h3> <h5 class="text-muted">Area</h5> </div> </div> <div class="col-sm-6 col-xs-6"> <span class="facts-icon icon-rupee-icn"></span> <div class="unit-label"> <h3 class="price">{{price}}</h3> <h5 class="text-muted">Price</h5> </div> </div> </div> <div class="advncd-filter-wrp"> <div class="blck-wrap title-row"> <h5 class="bold property hidden">Property Attributes</h5> </div> {{#attributes}} <div class="row"> <div class="col-sm-12"> <h6><span class="text-muted">{{attribute}}:</span> {{value}}</h6> </div> </div> {{/attributes}} </div> <div class=" title-row"> <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"> {{#levels}} <div class="panel panel-default"> <div class="panel-heading" role="tab" id="headingTwo"> <h4 class="panel-title m-b-15 p-b-10"> <a class="accordion-toggle collapsed text-primary " data-toggle="collapse" data-parent="#accordion" href="#{{id}}" aria-expanded="false" > {{level_name}} </a> </h4> </div> <div id="{{id}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo"> <div class="panel-body"> {{#rooms}} <div class="room-attr"> <div class="m-b-15"> <h5 class="m-b-5">{{room_name}}</h5> {{#attributes}} <div class=""><span>{{attribute}}</span>: {{value}}</div> {{/attributes}} </div> </div> {{/rooms}} </div> </div> </div> {{/levels}} </div> </div> </div> <div class="clearfix"></div> <div class="similar-section"> <h5 class="bold m-b-15">{{similarUnitsText}}</h5> {{#similarUnits}} <div class="row m-b-15"> <div class="col-sm-4 hidden-xs"> <div class="alert "> <i class="{{type}}-ico"></i> </div> </div> <div class="col-sm-8 col-xs-12"> <h5><a href="' + BASEURL + '/project/' + PROJECTID + '/#unit-view/{{id}}">{{unit_name}}</a> <span class="text-primary pull-right"><span class="icon-rupee-icn"></span>{{price}}</span></h5> <span class="text-muted">Unit Variant: </span>{{variant}}<br> <span class="text-muted">Unit Type:</span> {{unit_type}}<br> <span class="text-muted"> Area:</span> {{area}} sqft </div> </div> {{/similarUnits}} </div> </div> </div>');

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
      similarUnits = this.getSimilarUnits(unit);
      temp = [];
      $.each(similarUnits[0], function(index, value) {
        return temp.push({
          'unit_name': value.get('unit_name'),
          'unit_type': response[1].get('name'),
          'price': window.numDifferentiation(response[3]),
          'area': response[0].get('super_built_up_area'),
          'variant': response[0].get('unit_variant_name'),
          'id': value.get('id'),
          'type': similarUnits[2]
        });
      });
      data.area = response[0].get('super_built_up_area');
      data.type = response[1].get('name');
      data.unit_variant = response[0].get('unit_variant_name');
      data.levels = this.generateLevels(floor, response, unit);
      data.attributes = attributes;
      data.similarUnits = temp;
      data.similarUnitsText = similarUnits[1];
      return data;
    };

    LeftUnitView.prototype.getSimilarUnits = function(unit) {
      var i, text, unitColl, unitModel, unitid, units, unitsArr, url;
      units = [];
      i = 0;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unitModel = unitMasterCollection.findWhere({
        'id': unitid
      });
      unitColl = CommonFloor.getUnitsProperty(unitModel);
      unitsArr = unitColl[0];
      text = unitColl[1];
      $.each(unitsArr.toArray(), function(index, value) {
        if (value.id !== unitid) {
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
      return [units, text, unitColl[2]];
    };

    LeftUnitView.prototype.generateLevels = function(floor, response, unit) {
      var levels;
      levels = [];
      $.each(floor, function(index, value) {
        var level_id, level_name, rooms;
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
        level_id = s.replaceAll(level_name, " ", "_");
        return levels.push({
          'level_name': level_name,
          'rooms': rooms,
          'id': level_id
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

    CenterUnitView.prototype.template = Handlebars.compile('<div class="col-md-9 col-sm-12 col-xs-12 us-right-content unit-slides animated fadeIn"> <div class=""> <div class="liquid-slider slider" id="slider-id"> <div class="ls-wrapper ls-responsive"> <div class="ls-nav"> <ul> <li class="external "> <h4 class="title">External 3D</h4> </li> <li class="twoD"> <h4 class="title">2D Layout</h4> </li> <li class="threeD"> <h4 class="title">3D Layout</h4> </li> <li class="gallery"> <h4 class="title">Gallery</h4> </li> </ul> </div> <!--<div class="external"> <h2 class="title">External 3D</h2> </div> <div class="twoD"> <h2 class="title">2D Layout</h2> </div> <div class="threeD"> <h2 class="title">3D Layout</h2> </div>--> </div> <div class="liquid-slider slider"> <div class="panel-wrapper"> <div class="level "> <div class="images animated fadeIn text-center"> </div> </div> </div> </div> <div class="single-bldg"> <div class="prev"></div> <div class="next"></div> </div> </div> </div> </div>');

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
        html += '<div class="animated fadeIn"> <img class="img img-responsive" data-src="' + response[3].get('external3durl') + '" /> </div>';
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
          return html += '<div class="animated fadeIn gallery-img"> <a class="fancybox" rel="gall" href="' + value + '"> <img class="img" data-src="' + value + '" /> </a> </div>';
        });
        $('.images').html(html);
        $('.img').lazyLoadXT();
        $('.gallery').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        return $('.external').removeClass('current');
      },
      'mouseover .next,.prev': function(e) {
        var html, id, response, unitColl, unitModel;
        id = parseInt($(e.target).attr('data-id'));
        unitModel = unitCollection.findWhere({
          'id': id
        });
        response = window.unit.getUnitDetails(id);
        unitColl = CommonFloor.getUnitsProperty(unitModel);
        html = '<div class="svg-info"> <i class="' + unitColl[2] + '-ico"></i> <h5 class=" m-t-0">' + unitModel.get('unit_name') + '</h5> <div class="details"> <span>' + response[1].get('name') + '</span></br> <div class="text-primary"><span class="text-primary facts-icon icon-rupee-icn"></span>' + window.numDifferentiation(response[3]) + '</div> <!--<div>Area: <span>' + response[0].get('super_built_up_area') + 'Sq.Ft</span></div> <div>Variant: <span>' + response[0].get('unit_variant_name') + '</span></div>--> </div> </div>';
        return $(e.target).tooltipster('content', html);
      },
      'click .next,.prev': function(e) {
        var id, unitModel;
        id = parseInt($(e.target).attr('data-id'));
        unitModel = unitCollection.findWhere({
          'id': id
        });
        CommonFloor.navigate('/unit-view/' + id, true);
        return CommonFloor.router.storeRoute();
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
        html = '<img class="img lazy-hidden img-responsive external-img"  data-src="' + response[3].get('external3durl') + '" />';
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
      if ($(window).width() > 991) {
        $('.search-left-content').css('height', height);
        $('.search-left-content').mCustomScrollbar({
          theme: 'inset'
        });
      }
      $('.images').html(html);
      if (html === "") {
        $('.images').html('<div>No images found</div>');
      }
      $(".fancybox").fancybox();
      $('.img').lazyLoadXT();
      return this.iniTooltip();
    };

    CenterUnitView.prototype.iniTooltip = function() {
      return $('.next,.prev').tooltipster({
        theme: 'tooltipster-shadow circle-tooltip',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10,
        interactive: true,
        trigger: 'hover'
      });
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
      var next, prev, unitModel, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unitModel = unitCollection.findWhere({
        'id': unitid
      });
      CommonFloor.getUnitsProperty(unitModel);
      window.tempColl.setRecord(unitModel);
      next = tempColl.next();
      if (_.isUndefined(next)) {
        $('.next').hide();
      } else {
        $('.next').attr('data-id', next.get('id'));
      }
      prev = tempColl.prev();
      if (_.isUndefined(prev)) {
        return $('.prev').hide();
      } else {
        return $('.prev').attr('data-id', prev.get('id'));
      }
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