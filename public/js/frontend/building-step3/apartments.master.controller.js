(function() {
  var ApartmentsView, api, breakPoints, currentBreakPoint,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  api = "";

  currentBreakPoint = 0;

  breakPoints = [];

  CommonFloor.ApartmentsMasterView = (function(superClass) {
    extend(ApartmentsMasterView, superClass);

    function ApartmentsMasterView() {
      return ApartmentsMasterView.__super__.constructor.apply(this, arguments);
    }

    ApartmentsMasterView.prototype.template = '#apartment-master-template';

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
      if (apartmentVariantMasterCollection.length === 0) {
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

    TopApartmentMasterView.prototype.template = Handlebars.compile('<div class="container-fluid animated fadeIn"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"></a> </div> <div class="header-info"> <h2 class="pull-left proj-name">{{project_title}} - {{name}}</h2> <div class="proj-type-count"> <h2 class="pull-left">{{results}}</h2><p class="pull-left">Apartment(s)/Penthouse(s)</p> </div> <div class="pull-left filter-result full"> {{#filters}} {{#each this}} {{#each this}} <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" data-index="{{index}}" data-type="{{typename}}"></span> </div> {{/each}} {{/each}} {{/filters}} {{#area}} <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/area}} {{#budget}} <div class="filter-pill">  <span class="icon-rupee-icn"></span>{{name}} {{type}}</span> <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/budget}} {{#views}} <div class="filter-pill"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> {{/views}} {{#facings}} <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> {{/facings}} {{#floor}} <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross floor" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/floor}} {{#status}} <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> {{/status}} </div> </div> </div> </div> </div>');

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
      floor: '.floor',
      filter_flooring: '.filter_flooring',
      views: '.views',
      facings: '.facings'
    };

    TopApartmentMasterView.prototype.initialize = function() {
      var building_id, url;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      return this.building_id = building_id;
    };

    TopApartmentMasterView.prototype.serializeData = function() {
      var building_id, data, main, mainFilters, model, newTemp, results, temp, units, url;
      data = TopApartmentMasterView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      units = Marionette.getOption(this, 'units');
      data.units = units.length;
      data.project_title = project.get('project_title');
      main = CommonFloor.getStepFilters();
      mainFilters = main[0].filters[0];
      data.filters = [];
      if (!_.isUndefined(mainFilters)) {
        data.filters = main[0].filters[0].filters;
      }
      data.area = main[0].area;
      data.budget = main[0].price;
      data.status = main[0].status;
      data.floor = main[0].floor;
      data.views = main[0].views;
      data.facings = main[0].facings;
      results = apartmentVariantCollection.getApartmentUnits();
      temp = new Backbone.Collection(results);
      newTemp = temp.where({
        'building_id': parseInt(building_id)
      });
      data.results = newTemp.length;
      model = buildingMasterCollection.findWhere({
        'id': building_id
      });
      data.name = model.get('building_name');
      return data;
    };

    TopApartmentMasterView.prototype.events = function() {
      return {
        'click @ui.types': function(e) {
          var arr, index;
          arr = CommonFloor.defaults['type'].split(',');
          index = arr.indexOf($(e.currentTarget).attr('data-id'));
          arr.splice(index, 1);
          CommonFloor.defaults['type'] = arr.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.unitBack': function(e) {
          var previousRoute;
          e.preventDefault();
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          previousRoute = CommonFloor.router.previous();
          if (Object.keys(project.get('project_master')).length === 0) {
            return CommonFloor.navigate('/list-view', true);
          } else {
            return CommonFloor.navigate('/master-view', true);
          }
        },
        'click @ui.unitTypes': function(e) {
          var unitTypes;
          unitTypes = CommonFloor.defaults['apartment']['unit_type_id'].split(',');
          unitTypes = _.without(unitTypes, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['apartment']['unit_type_id'] = unitTypes.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.variantNames': function(e) {
          var variantNames;
          variantNames = CommonFloor.defaults['apartment']['unit_variant_id'].split(',');
          variantNames = _.without(variantNames, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['apartment']['unit_variant_id'] = variantNames.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.status': function(e) {
          CommonFloor.defaults['common']['availability'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.area': function(e) {
          CommonFloor.defaults['common']['area_max'] = "";
          CommonFloor.defaults['common']['area_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.budget': function(e) {
          CommonFloor.defaults['common']['price_max'] = "";
          CommonFloor.defaults['common']['price_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.floor': function(e) {
          CommonFloor.defaults['common']['floor_max'] = "";
          CommonFloor.defaults['common']['floor_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.facings': function(e) {
          var types;
          types = CommonFloor.defaults['common']['facings'].split(',');
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['common']['facings'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.views': function(e) {
          var types;
          types = CommonFloor.defaults['common']['views'].split(',');
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['common']['views'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger("filter_available");
          return this.trigger('render:view');
        },
        'click @ui.filter_flooring': function(e) {
          var flooring, index, types;
          types = [];
          index = $(e.currentTarget).attr('data-index');
          if (CommonFloor.defaults['apartment']['attributes'][index] !== "") {
            types = CommonFloor.defaults['apartment']['attributes'][index].split(',');
          }
          console.log(flooring = _.without(types, $(e.currentTarget).attr('data-id')));
          CommonFloor.defaults['apartment']['attributes'][index] = flooring.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterStepNew();
          unitTempCollection.trigger('filter_available');
          return this.trigger('render:view');
        }
      };
    };

    TopApartmentMasterView.prototype.onShow = function() {
      var results;
      results = CommonFloor.getFilters();
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
      buildingModel = buildingMasterCollection.findWhere({
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

    ApartmentsView.prototype.template = Handlebars.compile('	<div class="row"> <div class="col-xs-5  info"> <b class="bold">{{floor}}</b>-{{unit_name}} </div> <div class="col-xs-3  info"> {{unit_type}} </div> <div class="col-xs-4 text-primary"> <span class="icon-rupee-icn"></span>{{price}} <!--<span class="tick"></span>--> </div> </div>');

    ApartmentsView.prototype.initialize = function() {
      return this.$el.prop("id", 'apartment' + this.model.get("id"));
    };

    ApartmentsView.prototype.ui = {
      onview: '.onview'
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
      data.price = window.numDifferentiation(response[3]);
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
        $('#apartment' + id).addClass(' active');
        $('#' + id).attr('class', 'layer apartment svg_active ' + this.model.get('availability'));
        $('#' + id).tooltipster('content', html);
        return $('#' + id).tooltipster('show');
      },
      'mouseout': function(e) {
        var id;
        id = this.model.get('id');
        $('#apartment' + id).removeClass('active');
        $('#' + id).attr('class', 'layer apartment ' + this.model.get('availability'));
        return $('#' + id).tooltipster('hide');
      },
      'click': function(e) {
        var breakpoint;
        if ($(e.currentTarget).hasClass('onview')) {
          breakpoint = this.model.get('breakpoint');
          currentBreakPoint = _.indexOf(breakPoints, breakpoint);
          return api.playTo(breakpoint, {
            nearest: true
          });
        } else {
          if (this.model.get('availability') === 'available') {
            return CommonFloor.navigate('/unit-view/' + this.model.get('id'), true);
          }
        }
      }
    };

    ApartmentsView.prototype.getHtml = function(id) {
      var availability, html, price, response, unit;
      html = "";
      id = parseInt(id);
      unit = unitCollection.findWhere({
        'id': id
      });
      if (unit === void 0) {
        html = '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Apartment details not entered </div> </div>';
        $('.apartment').tooltipster('content', html);
        return false;
      }
      response = window.unit.getUnitDetails(id);
      price = window.numDifferentiation(response[3]);
      availability = unit.get('availability');
      availability = s.decapitalize(availability);
      html = "";
      html += '<div class="svg-info ' + availability + '"> <div class="action-bar"> <div class="apartment"></div> </div> <div class="pull-left"> <h4 class="m-t-0">' + unit.get('unit_name') + '</h4> <div class="details"> <ul> <li> <h5 class="inline-block">' + response[1].get('name') + '</h5> <span> - ' + response[0].get('super_built_up_area') + ' ' + project.get('measurement_units') + '</span> <!--<label>Variant</label> - ' + response[0].get('unit_variant_name') + '--> </li> </ul> <div class="price text-primary"> <span class="text-primary icon-rupee-icn"></span>' + price + '</div> </div> </div>';
      if (availability === 'available') {
        html += '<div class="circle"> <a href="#unit-view/' + id + '" class="arrow-up icon-chevron-right"></a> </div> </div>';
      } else {
        html += '</div>';
      }
      return html;
    };

    ApartmentsView.prototype.onShow = function() {
      var availability, classname, id, status;
      id = this.model.get('id');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      classname = $('#apartment' + id).attr('class');
      $('#apartment' + id).addClass(classname + ' ' + status);
      return CommonFloor.applyOnViewClass();
    };

    return ApartmentsView;

  })(Marionette.ItemView);

  CommonFloor.LeftApartmentMasterView = (function(superClass) {
    extend(LeftApartmentMasterView, superClass);

    function LeftApartmentMasterView() {
      return LeftApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    LeftApartmentMasterView.prototype.template = '<div> <div id="trig" class="toggle-button"></div> <div id="view_toggle" class="toggle-view-button map"></div> <div class="list-view-container w-map animated fadeInLeft"> <div class="advncd-filter-wrp  unit-list"> <div class="legend clearfix"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <div class="sort-unit"> All Units <input type="checkbox" name="inview" id="inview" checked data-toggle="toggle" data-on="&nbsp;" data-off="&nbsp;" data-onstyle="warning" data-offstyle="warning"> In View </div> <p class="text-center help-text">Hover on the units for more details</p> <ul class="units one apartments"> </ul> </div> </div> </div>';

    LeftApartmentMasterView.prototype.childView = ApartmentsView;

    LeftApartmentMasterView.prototype.childViewContainer = '.units';

    LeftApartmentMasterView.prototype.ui = {
      viewtog: '#view_toggle',
      trig: '#trig',
      notinview: '#notinview',
      inview: '#inview'
    };

    LeftApartmentMasterView.prototype.events = {
      'change @ui.inview': function(e) {
        if ($(e.currentTarget).is(':checked')) {
          return this.showInView();
        } else {
          return this.showNotInView();
        }
      },
      'click @ui.trig': function(e) {
        return $('.list-container').toggleClass('closed');
      },
      'click @ui.viewtog': function(e) {
        $('.us-left-content').toggleClass('not-visible visible');
        return $('.us-right-content').toggleClass('not-visible visible');
      }
    };

    LeftApartmentMasterView.prototype.showInView = function() {
      return $('.onview').hide();
    };

    LeftApartmentMasterView.prototype.showNotInView = function() {
      return $('.onview').show();
    };

    LeftApartmentMasterView.prototype.onShow = function() {
      return this.ui.inview.bootstrapToggle();
    };

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
      this.view = new CommonFloor.LeftApartmentMasterView({
        collection: unitsCollection
      });
      return this.show(this.view);
    };

    return LeftApartmentMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterApartmentMasterView = (function(superClass) {
    extend(CenterApartmentMasterView, superClass);

    function CenterApartmentMasterView() {
      return CenterApartmentMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterApartmentMasterView.prototype.template = Handlebars.compile('<div class="col-md-12 col-sm-12 col-xs-12 us-right-content mobile visible animated fadeIn overflow-h"> <div class="legend clearfix"> <ul> <!--<li class="available">AVAILABLE</li>--> <li class="sold">N/A</li> <!--<li class="blocked">BLOCKED</li> <li class="na">Available</li>--> </ul> </div> <div class="zoom-controls"> <div class="zoom-in"></div> <div class="zoom-out"></div> </div> <div id="view_toggle" class="toggle-view-button list"></div> <div id="trig" class="toggle-button hidden">List View</div> <div class=" master animated fadeIn"> <div class="single-bldg"> <div class="prev"></div> <div class="next"></div> </div> <div id="svg_loader" class="img-loader"> <div class="square" ></div> <div class="square"></div> <div class="square last"></div> <div class="square clear"></div> <div class="square"></div> <div class="square last"></div> <div class="square clear"></div> <div class="square "></div> <div class="square last"></div> </div> <div class="outer-wrap" STYLE="height:100%"> <div mag-thumb="outer" class="home-region"> <img class="zoomimage" /> </div> <div mag-zoom="outer"> <div id="spritespin" class="building-master"></div> <div class="svg-maps animated fadeIn hidden"> <img class="first_image img-responsive" /> <div class="region inactive"></div> </div> </div> </div> <div id="rotate_loader" class="cf-loader hidden"></div> </div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> <div class="mini-map hidden animated fadeIn"> <img class="firstimage img-responsive" src=""/> <div class="project_master"></div> </div> </div>');

    CenterApartmentMasterView.prototype.ui = {
      svgContainer: '.master',
      viewtog: '#view_toggle',
      zoomIn: '.Zoomin'
    };

    CenterApartmentMasterView.prototype.events = {
      'click @ui.zoomIn': function(e) {
        console.log("aaaaaaaaaaaa");
        $('.apartment').bind('mouseenter');
        return $('.apartment').on('click');
      },
      'click @ui.viewtog': function(e) {
        $('.us-left-content').toggleClass('not-visible visible');
        return $('.us-right-content').toggleClass('not-visible visible');
      },
      'click #prev': function() {
        return this.setDetailIndex(currentBreakPoint - 1);
      },
      'click #next': function() {
        return this.setDetailIndex(currentBreakPoint + 1);
      },
      'mouseover .apartment': function(e) {
        var availability, html, id, price, response, unit, unitMaster;
        console.log(id = parseInt(e.currentTarget.id));
        unit = unitCollection.findWhere({
          'id': id
        });
        unitMaster = unitMasterCollection.findWhere({
          id: id
        });
        if (unit === void 0 && unitMaster !== void 0) {
          html = '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Not in selection </div> </div>';
          $('.apartment').tooltipster('content', html);
          return;
        }
        response = window.unit.getUnitDetails(id);
        price = window.numDifferentiation(response[3]);
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        if (unit === void 0 || availability === 'archive') {
          html = '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Apartment details not entered </div> </div>';
          $('.apartment').tooltipster('content', html);
          return false;
        }
        html = "";
        html += '<div class="svg-info ' + availability + '"> <div class="action-bar"> <div class="' + response[2] + '"></div> </div> <div class="pull-left"> <h4 class="m-t-0">' + unit.get('unit_name') + '</h4> <div class="details"> <ul> <li> <h5 class="inline-block">' + response[1].get('name') + '</h5> <span> - ' + response[0].get('super_built_up_area') + ' ' + project.get('measurement_units') + '</span> <!--<label>Variant</label> - ' + response[0].get('unit_variant_name') + '--> </li> </ul> <div class="price text-primary"> <span class="text-primary icon-rupee-icn"></span>' + price + '</div> </div> </div>';
        if (availability === 'available') {
          html += '<a href="#unit-view/' + id + '" class="view-unit"> <div class="circle"> <span class="arrow-up icon-chevron-right"></span> </div> </a> </div>';
        } else {
          html += '</div>';
        }
        $('#' + id).attr('class', 'layer apartment svg_active ' + availability);
        $('#apartment' + id).addClass(' active');
        $('.units').mCustomScrollbar("scrollTo", '#apartment' + id);
        return $('.apartment').tooltipster('content', html);
      },
      'mouseout .apartment': function(e) {
        var availability, id, unit;
        id = parseInt(e.currentTarget.id);
        unit = unitCollection.findWhere({
          'id': id
        });
        if (unit === void 0) {
          return;
        }
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        $('#' + id).attr('class', 'layer apartment ' + availability);
        return $('#apartment' + id).removeClass(' active');
      },
      'mouseover .amenity': function(e) {
        var html;
        html = '<div class="row"> <div class="col-sm-12 b-r"> <h4 class="text-warning margin-none">' + $(e.currentTarget).attr('data-amenity-title') + '</h4> <h6 class="text-muted">' + $(e.currentTarget).attr('data-amenity-desc') + '</h6> </div> </div>';
        return $('.amenity').tooltipster('content', html);
      },
      'click .apartment': function(e) {
        var id, unit;
        id = parseInt(e.currentTarget.id);
        unit = unitCollection.findWhere({
          id: id
        });
        if (!(_.isUndefined(unit)) && unit.get('availability') === 'available') {
          return CommonFloor.navigate('/unit-view/' + id, true);
        }
      },
      'mouseover .next,.prev': function(e) {
        var buildingModel, cost, floors, html, id, images, price, response, unitTypes;
        id = parseInt($(e.currentTarget).attr('data-id'));
        buildingModel = buildingMasterCollection.findWhere({
          'id': id
        });
        images = Object.keys(buildingModel.get('building_master')).length;
        floors = buildingModel.get('no_of_floors');
        unitTypes = window.building.getUnitTypes(id);
        response = window.building.getUnitTypesCount(id, unitTypes);
        cost = window.building.getMinimumCost(id);
        price = window.numDifferentiation(cost);
        html = '<div class="svg-info"> <i class="building-ico"></i> <h5 class=" m-t-0">' + buildingModel.get('building_name') + '</h5> <div class="details"> <label>' + floors + ' Floors</label></br> <div class="text-primary"> <span class="text-primary facts-icon icon-rupee-icn"></span>' + price + '</div> </div> </div>';
        return $(e.currentTarget).tooltipster('content', html);
      },
      'click .next,.prev': function(e) {
        var buildingModel, id;
        id = parseInt($(e.currentTarget).attr('data-id'));
        buildingModel = buildingMasterCollection.findWhere({
          'id': id
        });
        if (Object.keys(buildingModel.get('building_master')).length === 0) {
          return CommonFloor.navigate('/building/' + id + '/apartments', true);
        } else {
          return CommonFloor.navigate('/building/' + id + '/master-view', true);
        }
      }
    };

    CenterApartmentMasterView.prototype.onShow = function() {
      var breakpoints, building, building_id, first, height, svgs, that, transitionImages, url, windowHeight;
      if ($(window).width() > 991) {
        window.magne = new Magnificent('[mag-thumb="outer"]', {
          mode: 'outer',
          position: 'drag',
          toggle: false,
          zoomMax: 3,
          zoomRate: 2,
          constrainZoomed: true
        });
        window.magne.zoomBy(-1);
      }
      windowHeight = $(window).innerHeight() - 56;
      $('.master').css('height', windowHeight);
      $('.master').css('min-width', windowHeight * 2);
      this.getNextPrev();
      height = this.ui.svgContainer.width() / 2;
      $('.search-left-content').css('height', height);
      $('#spritespin').hide();
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      building = buildingMasterCollection.findWhere({
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
      first = _.values(svgs);
      $('.first_image').attr('src', transitionImages[breakpoints[0]]);
      $('.first_image').load(function() {
        return $('.region').load(first[0], function() {
          var response;
          $('#svg_loader').addClass('hidden');
          that.iniTooltip();
          CommonFloor.applyAvailabilClasses();
          CommonFloor.randomClass();
          CommonFloor.applyFliterClass();
          CommonFloor.applyOnViewClass();
          if ($(window).width() > 991) {
            $(that.el).undelegate('.apartment', 'click');
            $(that.el).undelegate('.apartment', 'mouseover');
            that.zoomBuilding();
            $('.zoomimage').attr('src', transitionImages[breakpoints[0]]);
          } else {
            that.loadZoom();
            $('.first_image').first().css('width', that.ui.svgContainer.width());
          }
          response = building.checkRotationView(building_id);
          $('.svg-maps').removeClass('hidden');
          $('.mini-map').removeClass('hidden');
          if (response === 1) {
            $('.cf-loader').removeClass('hidden');
            return that.initializeRotate(transitionImages, svgs, building);
          }
        }).addClass('active').removeClass('inactive');
      });
      this.loadProjectMaster();
      if ($(window).width() > 991) {
        return $('.units').mCustomScrollbar({
          theme: 'cf-scroll'
        });
      }
    };

    CenterApartmentMasterView.prototype.ratioOffsetsFor = function($target, x, y) {
      return {
        x: x / $target.width(),
        y: y / $target.height()
      };
    };

    CenterApartmentMasterView.prototype.zoomBuilding = function() {
      var class_array, that;
      that = this;
      $(".mag-lens").resize(function(e) {
        var temp;
        temp = $(e.target).width();
        if (temp === 398) {
          $(that.el).undelegate('.apartment', 'click');
          $(that.el).undelegate('.apartment', 'mouseover');
          $('.apartment').tooltipster('disable');
          $('.svg-maps').on('click', '.sold');
          $('.svg-maps').on('click', '.blocked');
          return $('.svg-maps').on('click', '.not_relased');
        } else {
          that.delegateEvents();
          $('.svg-maps').off('click', '.sold');
          $('.svg-maps').off('click', '.blocked');
          $('.svg-maps').off('click', '.not_relased');
          that.iniTooltip();
          return $('.apartment').tooltipster('enable');
        }
      });
      class_array = ['.available', '.sold', '.blocked', '.not_relased'];
      return $.each(class_array, function(index, value) {
        return $('.svg-maps').on('click', value, function(e) {
          var temp, xapoint, xpoint, yapoint, ypoint;
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
          clearTimeout(window.renderLoopInterval);
          xpoint = e.clientX;
          ypoint = e.clientY;
          xpoint = xpoint / $(window).width();
          ypoint = ypoint / $(window).height();
          xpoint = xpoint.toFixed(1);
          ypoint = ypoint.toFixed(1);
          xapoint = xpoint / 10;
          yapoint = ypoint / 10;
          temp = window.magne;
          temp.model.focus = {
            x: xpoint,
            y: ypoint
          };
          temp.zoomBy(1);
          return temp.reinit();
        });
      });
    };

    CenterApartmentMasterView.prototype.loadProjectMaster = function() {
      var first, masterbreakpoints, svgs, transitionImages;
      svgs = [];
      masterbreakpoints = project.get('breakpoints');
      $.each(masterbreakpoints, function(index, value) {
        return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/master/master-' + value + '.svg';
      });
      first = _.values(svgs);
      transitionImages = [];
      $.merge(transitionImages, project.get('project_master'));
      if (project.get('project_master').length !== 0) {
        return $('.project_master').load(first[0], function() {
          var building_id, url;
          $('.firstimage').attr('src', transitionImages[masterbreakpoints[0]]);
          url = Backbone.history.fragment;
          building_id = url.split('/')[1];
          $('.villa,.plot,.amenity').each(function(ind, item) {
            var id;
            id = parseInt(item.id);
            return $('#' + id).attr('class', "no-fill");
          });
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
        return $('.prev').attr('data-id', prev.get('id'));
      }
    };

    CenterApartmentMasterView.prototype.setDetailIndex = function(index) {
      $('.region').empty();
      $('.region').addClass('inactive').removeClass('active');
      currentBreakPoint = index;
      if (currentBreakPoint < 0) {
        currentBreakPoint = breakPoints.length - 1;
      }
      if (currentBreakPoint >= breakPoints.length) {
        currentBreakPoint = 0;
      }
      return api.playTo(breakPoints[currentBreakPoint], {
        nearest: true
      });
    };

    CenterApartmentMasterView.prototype.initializeRotate = function(transitionImages, svgs, building) {
      var building_id, frames, spin, that, url, width;
      url = Backbone.history.fragment;
      building_id = parseInt(url.split('/')[1]);
      frames = transitionImages;
      breakPoints = building.get('breakpoints');
      currentBreakPoint = 0;
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
            CommonFloor.applyOnViewClass();
            if ($(window).width() < 992) {
              return that.loadZoom();
            }
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
          $('#rotate_loader').addClass('hidden');
        }
        return $('.region').load(url, function() {
          that.iniTooltip();
          if ($(window).width() < 992) {
            that.loadZoom();
          }
          CommonFloor.applyAvailabilClasses();
          CommonFloor.randomClass();
          CommonFloor.applyFliterClass();
          return CommonFloor.applyOnViewClass();
        }).addClass('active').removeClass('inactive');
      });
    };

    CenterApartmentMasterView.prototype.iniTooltip = function() {
      $('.apartment').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10,
        trigger: 'hover',
        interactive: true,
        functionReady: function(e) {
          return $('.view-unit').on('click', function(e) {
            $('.layer').tooltipster('hide');
            $('svg').attr('class', 'zoom');
            $('#spritespin').addClass('zoom');
            $('.us-right-content').addClass('fadeOut');
            return $('.cf-loader').removeClass('hidden');
          });
        }
      });
      $('.next').tooltipster({
        theme: 'tooltipster-shadow circle-tooltip',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        interactive: true,
        trigger: 'hover',
        position: 'left',
        delay: 50
      });
      $('.prev').tooltipster({
        theme: 'tooltipster-shadow circle-tooltip',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        interactive: true,
        trigger: 'hover',
        position: 'right',
        delay: 50
      });
      return $('.amenity').tooltipster({
        theme: 'tooltipster-shadow marker-tooltip',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        trigger: 'hover'
      });
    };

    CenterApartmentMasterView.prototype.loadZoom = function() {
      $('.master').panzoom({
        contain: 'invert',
        minScale: 1,
        maxScale: 2.4,
        increment: 0.4,
        $zoomIn: $('.zoom-in'),
        $zoomOut: $('.zoom-out')
      });
      return $('.master polygon').on('mousedown touchstart', function(e) {
        return e.stopImmediatePropagation();
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