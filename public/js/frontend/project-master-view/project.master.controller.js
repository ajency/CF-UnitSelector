(function() {
  var TopMasterView, api,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  api = "";

  CommonFloor.ProjectMasterView = (function(superClass) {
    extend(ProjectMasterView, superClass);

    function ProjectMasterView() {
      return ProjectMasterView.__super__.constructor.apply(this, arguments);
    }

    ProjectMasterView.prototype.template = '#project-view-template';

    return ProjectMasterView;

  })(Marionette.LayoutView);

  CommonFloor.ProjectMasterCtrl = (function(superClass) {
    extend(ProjectMasterCtrl, superClass);

    function ProjectMasterCtrl() {
      return ProjectMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    ProjectMasterCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.checkPropertyType();
      }
      if (bunglowVariantMasterCollection.length === 0 && apartmentVariantMasterCollection.length === 0 && plotVariantMasterCollection.length === 0) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.ProjectMasterView);
      }
    };

    return ProjectMasterCtrl;

  })(Marionette.RegionController);

  TopMasterView = (function(superClass) {
    extend(TopMasterView, superClass);

    function TopMasterView() {
      return TopMasterView.__super__.constructor.apply(this, arguments);
    }

    TopMasterView.prototype.template = Handlebars.compile('<div class="container-fluid animated fadeIn"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"></a> </div> <div class="header-info"> <h2 class="pull-left proj-name">{{project_title}}</h2> <div class="proj-type-count"> {{#types}} <h2 class="pull-left">{{count.length}}</h2><p class="pull-left">{{type}}</p> {{/types}} </div> <div class="pull-left filter-result full"> <ul  id="flexiselDemo1"> {{#area}} <li> <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> </li> {{/area}} {{#budget}} <li> <div class="filter-pill"> <span class="icon-rupee-icn"></span>{{name}} {{type}}</span> <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> </li> {{/budget}} {{#views}} <li> <div class="filter-pill"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> </li> {{/views}} {{#facings}} <li> <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> </li> {{/facings}} {{#status}} <li> <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> </li> {{/status}} {{#each  filters}} <li> <div class="filter-title"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" data-index="{{index}}"></span> </div> </li> {{#filters}} {{#each this}} {{#each this}} <li> <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  data-index="{{index}}"  data-type="{{typename}}"></span> </div> </li>{{/each}} {{/each}} {{/filters}} {{/each}} </ul> <!--{{#each  filters}} {{#each this}} <div class="filter-pill"  > {{this.name}}{{this.type}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span> </div> {{/each}}{{/each }}--> </div> <div class="clearfix"></div> </div> </div> </div> </div>');

    TopMasterView.prototype.ui = {
      unitBack: '.unit_back',
      unitTypes: '.unit_types',
      priceMin: '.price_min',
      priceMax: '.price_max',
      apply: '.apply',
      variantNames: '.variant_names',
      area: '#filter_area',
      budget: '#filter_budget',
      types: '.types',
      status: '#filter_available',
      filter_flooring: '.filter_flooring',
      views: '.views',
      facings: '.facings'
    };

    TopMasterView.prototype.serializeData = function() {
      var data, main, response, status;
      data = TopMasterView.__super__.serializeData.call(this);
      status = CommonFloor.getStatusFilters();
      if (status.length !== 0) {
        data.status = status;
      }
      main = CommonFloor.getFilters();
      data.filters = main[0].filters;
      data.area = main[0].area;
      data.budget = main[0].price;
      data.status = main[0].status;
      data.views = main[0].views;
      data.facings = main[0].facings;
      response = CommonFloor.propertyTypes();
      data.types = response;
      return data;
    };

    TopMasterView.prototype.events = function() {
      return {
        'click @ui.unitBack': function(e) {
          e.preventDefault();
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return CommonFloor.navigate('/', true);
        },
        'click @ui.types': function(e) {
          var arr, index;
          arr = CommonFloor.defaults['type'].split(',');
          index = arr.indexOf($(e.currentTarget).attr('data-id'));
          arr.splice(index, 1);
          CommonFloor.defaults['type'] = arr.join(',');
          if ($(e.currentTarget).attr('data-id') === 'villa') {
            this.removeVillaFilters();
          }
          if ($(e.currentTarget).attr('data-id') === 'apartment') {
            this.removeAptFilters();
          }
          if ($(e.currentTarget).attr('data-id') === 'plot') {
            this.removePlotFilters();
          }
          this.trigger('render:view');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          return unitCollection.trigger('available');
        },
        'click @ui.unitTypes': function(e) {
          var type, types;
          types = [];
          type = $(e.currentTarget).attr('data-type');
          if (CommonFloor.defaults[type]['unit_type_id'] !== "") {
            types = CommonFloor.defaults[type]['unit_type_id'].split(',');
            types = types.map(function(item) {
              return parseInt(item);
            });
          }
          types = _.without(types, parseInt($(e.currentTarget).attr('data-id')));
          CommonFloor.defaults[type]['unit_type_id'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.variantNames': function(e) {
          var type, types;
          types = [];
          type = $(e.currentTarget).attr('data-type');
          if (CommonFloor.defaults[type]['unit_variant_id'] !== "") {
            types = CommonFloor.defaults[type]['unit_variant_id'].split(',');
            types = types.map(function(item) {
              return parseInt(item);
            });
          }
          types = _.without(types, parseInt($(e.currentTarget).attr('data-id')));
          CommonFloor.defaults[type]['unit_variant_id'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.status': function(e) {
          CommonFloor.defaults['common']['availability'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.area': function(e) {
          CommonFloor.defaults['common']['area_max'] = "";
          CommonFloor.defaults['common']['area_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.budget': function(e) {
          CommonFloor.defaults['common']['price_max'] = "";
          CommonFloor.defaults['common']['price_min'] = "";
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.filter_flooring': function(e) {
          var index, type, types;
          types = [];
          type = $(e.currentTarget).attr('data-type');
          index = $(e.currentTarget).attr('data-index');
          if (CommonFloor.defaults[type]['attributes'][index] !== "") {
            types = CommonFloor.defaults[type]['attributes'][index].split(',');
          }
          console.log(types = _.without(types, $(e.currentTarget).attr('data-id')));
          CommonFloor.defaults[type]['attributes'][index] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.facings': function(e) {
          var types;
          types = CommonFloor.defaults['common']['facings'].split(',');
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['common']['facings'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        },
        'click @ui.views': function(e) {
          var types;
          types = CommonFloor.defaults['common']['views'].split(',');
          types = _.without(types, $(e.currentTarget).attr('data-id'));
          CommonFloor.defaults['common']['views'] = types.join(',');
          unitCollection.reset(unitMasterCollection.toArray());
          CommonFloor.resetCollections();
          CommonFloor.filterNew();
          unitCollection.trigger('available');
          return this.trigger('render:view');
        }
      };
    };

    TopMasterView.prototype.onShow = function() {
      var response;
      $("#flexiselDemo1").flexisel({
        visibleItems: 11,
        animationSpeed: 200,
        autoPlay: false,
        autoPlaySpeed: 1000,
        clone: false,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
          portrait: {
            changePoint: 480,
            visibleItems: 5
          },
          landscape: {
            changePoint: 640,
            visibleItems: 6
          },
          tablet: {
            changePoint: 768,
            visibleItems: 3
          }
        }
      });
      response = CommonFloor.propertyTypes();
      if (response.length === 0) {
        return $('.proj-type-count').html('<p class="p-l-15">No results found</p>');
      }
    };

    TopMasterView.prototype.removeVillaFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = bunglowVariantCollection.getBunglowMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',');
    };

    TopMasterView.prototype.removeAptFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = apartmentVariantCollection.getApartmentMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',');
    };

    TopMasterView.prototype.removePlotFilters = function() {
      var unitTypes, unitTypesArr, unitVariants, unitVariantsArr, unitsArr, unittypes, variants;
      variants = [];
      unittypes = [];
      unitsArr = plotVariantCollection.getPlotMasterUnits();
      $.each(unitsArr, function(index, value) {
        var unitDetails;
        unitDetails = window.unit.getUnitDetails(value.id);
        variants.push(parseInt(unitDetails[0].get('id')));
        return unittypes.push(parseInt(unitDetails[1].get('id')));
      });
      unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',');
      unitTypesArr = unitTypes.map(function(item) {
        return parseInt(item);
      });
      $.each(unittypes, function(index, value) {
        if ($.inArray(parseInt(value), unitTypesArr) > -1) {
          return unitTypes = _.without(unitTypesArr, parseInt(value));
        }
      });
      CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',');
      unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',');
      unitVariantsArr = unitVariants.map(function(item) {
        return parseInt(item);
      });
      $.each(variants, function(index, value) {
        if ($.inArray(parseInt(value), unitVariantsArr) > -1) {
          return unitVariants = _.without(unitVariantsArr, parseInt(value));
        }
      });
      return CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',');
    };

    return TopMasterView;

  })(Marionette.ItemView);

  CommonFloor.TopMasterCtrl = (function(superClass) {
    extend(TopMasterCtrl, superClass);

    function TopMasterCtrl() {
      return TopMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    TopMasterCtrl.prototype.initialize = function() {
      this.renderToppView();
      return unitCollection.bind("available", this.renderToppView, this);
    };

    TopMasterCtrl.prototype.renderToppView = function() {
      this.view = new TopMasterView({
        model: project
      });
      this.listenTo(this.view, "render:view", this.loadController);
      return this.show(this.view);
    };

    TopMasterCtrl.prototype.loadController = function() {
      window.unitTypes = [];
      window.unitVariants = [];
      window.variantNames = [];
      window.price = '';
      window.area = '';
      window.type = [];
      this.region = new Marionette.Region({
        el: '#filterregion'
      });
      return new CommonFloor.FilterMasterCtrl({
        region: this.region
      });
    };

    return TopMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.LeftMasterCtrl = (function(superClass) {
    extend(LeftMasterCtrl, superClass);

    function LeftMasterCtrl() {
      return LeftMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftMasterCtrl.prototype.initialize = function() {
      this.renderLeftMasterView();
      return unitCollection.bind("available", this.renderLeftMasterView, this);
    };

    LeftMasterCtrl.prototype.renderLeftMasterView = function() {
      var data, region, response, units;
      response = CommonFloor.checkListView();
      if (response.count.length === 0) {
        region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.NoUnitsCtrl({
          region: region
        });
        return;
      }
      if (response.type === 'bunglows') {
        units = bunglowVariantCollection.getBunglowUnits();
        data = {};
        data.units = units;
        data.type = 'villa';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.MasterBunglowListCtrl({
          region: this.region
        });
      }
      if (response.type === 'building') {
        units = buildingCollection;
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        new CommonFloor.MasterBuildingListCtrl({
          region: this.region
        });
      }
      if (response.type === 'plot') {
        units = plotVariantCollection.getPlotUnits();
        data = {};
        data.units = units;
        data.type = 'plot';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        return new CommonFloor.MasterPlotListCtrl({
          region: this.region
        });
      }
    };

    return LeftMasterCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterMasterView = (function(superClass) {
    extend(CenterMasterView, superClass);

    function CenterMasterView() {
      return CenterMasterView.__super__.constructor.apply(this, arguments);
    }

    CenterMasterView.prototype.template = Handlebars.compile('<div class="col-md-12 col-sm-12 col-xs-12 us-right-content mobile visible animated fadeIn"> <div class="legend c clearfix"> <ul> <!--<li class="available">AVAILABLE</li>--> <li class="sold">N/A</li> <!--<li class="blocked">BLOCKED</li> <li class="na">Available</li>--> </ul> </div> <div class="zoom-controls master-zoom"> <div class="zoom-in"></div> <div class="zoom-out"></div> </div> <div id="view_toggle" class="toggle-view-button list"></div> <div id="trig" class="toggle-button hidden">List View</div> <div class=" master b animated fadeIn"> <!--<div class="controls mapView"> <div class="toggle"> <a href="#/master-view" class="map active">Map</a><a href="#/list-view" class="list">List</a> </div> </div>--> <div id="svg_loader" class="img-loader"> <div class="square" ></div> <div class="square"></div> <div class="square last"></div> <div class="square clear"></div> <div class="square"></div> <div class="square last"></div> <div class="square clear"></div> <div class="square "></div> <div class="square last"></div> </div> <div id="spritespin"></div> <div class="svg-maps animated fadeIn hidden"> <img class="first_image" /> <div class="region inactive"></div> <div class="tooltip-overlay hidden"></div> </div> <div id="rotate_loader" class="cf-loader hidden"></div> </div> <div class="rotate rotate-controls hidden"> <div id="prev" class="rotate-left">Left</div> <span class="rotate-text">Rotate</span> <div id="next" class="rotate-right">Right</div> </div> </div>');

    CenterMasterView.prototype.ui = {
      svgContainer: '.master',
      trig: '#trig',
      viewtog: '#view_toggle',
      plotunit: '.plot'
    };

    CenterMasterView.prototype.initialize = function() {
      this.currentBreakPoint = 0;
      this.breakPoints = [];
      return this["class"] = '';
    };

    CenterMasterView.prototype.events = {
      'click @ui.viewtog': function(e) {
        $('.us-left-content').toggleClass('not-visible visible');
        return $('.us-right-content').toggleClass('not-visible visible');
      },
      'click #prev': function() {
        return this.setDetailIndex(this.currentBreakPoint - 1);
      },
      'click #next': function() {
        return this.setDetailIndex(this.currentBreakPoint + 1);
      },
      'click .villa': function(e) {
        var id, unit;
        e.preventDefault();
        id = parseInt(e.currentTarget.id);
        unit = unitCollection.findWhere({
          id: id
        });
        if (!(_.isUndefined(unit)) && unit.get('availability') === 'available') {
          return CommonFloor.navigate('/unit-view/' + id, true);
        }
      },
      'click @ui.plotunit': function(e) {
        var id, unit;
        e.preventDefault();
        id = parseInt(e.currentTarget.id);
        unit = unitCollection.findWhere({
          id: id
        });
        if (!(_.isUndefined(unit)) && unit.get('availability') === 'available') {
          return CommonFloor.navigate('/unit-view/' + id, true);
        }
      },
      'click .building': function(e) {
        var building, id, units;
        e.preventDefault();
        id = parseInt(e.currentTarget.id);
        building = buildingCollection.findWhere({
          id: id
        });
        console.log(units = unitCollection.where({
          'building_id': id
        }));
        if (units.length === 0) {
          return;
        }
        $('#spritespin').addClass('zoom');
        $('.us-right-content').addClass('fadeOut');
        $('.cf-loader').removeClass('hidden');
        if (building !== void 0 && units.length !== 0) {
          if (Object.keys(building.get('building_master')).length === 0) {
            return CommonFloor.navigate('/building/' + id + '/apartments', true);
          } else {
            return CommonFloor.navigate('/building/' + id + '/master-view', true);
          }
        }
      },
      'mouseout .villa': function(e) {
        var availability, id, unit;
        id = parseInt(e.currentTarget.id);
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit !== void 0) {
          availability = unit.get('availability');
          availability = s.decapitalize(availability);
          return $('#unit' + id).attr('class', 'unit blocks ' + availability);
        }
      },
      'mouseout .plot': function(e) {
        var availability, id, unit;
        id = parseInt(e.currentTarget.id);
        unit = unitCollection.findWhere({
          id: id
        });
        if (unit !== void 0) {
          availability = unit.get('availability');
          availability = s.decapitalize(availability);
          return $('#unit' + id).attr('class', 'bldg blocks ' + availability);
        }
      },
      'mouseout .building': function(e) {
        var building, id;
        id = parseInt(e.currentTarget.id);
        building = buildingCollection.findWhere({
          id: id
        });
        if (building !== void 0) {
          $('.building').attr('class', 'layer building');
          return $('#bldg' + id).attr('class', 'bldg blocks');
        }
      },
      'mouseover .villa': function(e) {
        var availability, html, id, price, response, unit, unitMaster;
        id = parseInt(e.currentTarget.id);
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        unitMaster = unitMasterCollection.findWhere({
          id: id
        });
        if (unit === void 0 && unitMaster !== void 0) {
          html = '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Not in selection </h5> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        response = window.unit.getUnitDetails(id);
        price = window.numDifferentiation(response[3]);
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        if (unit === void 0 || availability === 'archive') {
          html += '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left">Villa details not entered </h5> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        html = "";
        html += '<div class="svg-info ' + availability + ' "> <div class="action-bar"> <div class="villa"></div> </div> <div class="pull-left"> <h4 class="m-t-0">' + unit.get('unit_name') + '</h4> <div class="details"> <ul> <li> <h5 class="inline-block">' + response[1].get('name') + '</h5> <span> - ' + response[0].get('super_built_up_area') + ' ' + project.get('measurement_units') + '</span> <!--<label>Variant</label> - ' + response[0].get('unit_variant_name') + '--> </li> </ul> <h5 class="price text-primary m-b-0">' + s.capitalize(availability) + '</h5> </div> </div>';
        if (availability === 'available') {
          html += '<a href="#unit-view/' + id + '" class="view-unit"> <div class="circle"> <span class="arrow-up icon-chevron-right"></span> </div> </a> </div>';
        } else {
          html += '</div>';
        }
        $('#' + id).attr('class', 'layer villa  ' + availability);
        $('#unit' + id).attr('class', 'unit blocks ' + availability + '  active');
        $('.units').mCustomScrollbar("scrollTo", '#unit' + id);
        return $('#' + id).tooltipster('content', html);
      },
      'mouseover .plot': function(e) {
        var availability, html, id, price, response, unit, unitMaster;
        id = parseInt(e.currentTarget.id);
        html = "";
        unit = unitCollection.findWhere({
          id: id
        });
        unitMaster = unitMasterCollection.findWhere({
          id: id
        });
        if (unit === void 0 && unitMaster !== void 0) {
          html = '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Not in selection </h5> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        response = window.unit.getUnitDetails(id);
        price = window.numDifferentiation(response[3]);
        availability = unit.get('availability');
        availability = s.decapitalize(availability);
        if (unit === void 0 || availability === 'archive') {
          html += '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Plot details not entered </h5> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        html = "";
        html += '<div class="svg-info ' + availability + ' "> <div class="action-bar"> <div class="plot"></div> </div> <div class="pull-left"> <h4 class="m-t-0">' + unit.get('unit_name') + '</h4> <div class="details"> <ul> <li> <h5 class="inline-block">' + response[1].get('name') + '</h5> <span> - ' + response[0].get('super_built_up_area') + ' ' + project.get('measurement_units') + '</span> <!--<label>Variant</label> - ' + response[0].get('unit_variant_name') + '--> </li> </ul> <div class="price text-primary"> <span class="text-primary icon-rupee-icn"></span>' + price + '</div> <div class="price text-primary"> <span class="text-primary"></span>' + s.capitalize(availability) + '</div> </div> </div>';
        if (availability === 'available') {
          html += '<a href="#unit-view/' + id + '" class="view-unit"> <div class="circle"> <span class="arrow-up icon-chevron-right"></span> </div> </a> </div>';
        } else {
          html += '</div>';
        }
        $('#' + id).attr('class', 'layer plot ' + availability);
        $('#unit' + id).attr('class', 'bldg blocks active');
        $('.units').mCustomScrollbar("scrollTo", '#unit' + id);
        return $('#' + id).tooltipster('content', html);
      },
      'mouseover .amenity': function(e) {
        var html;
        html = '<div class="row"> <div class="col-sm-12 b-r"> <h4 class="text-warning margin-none">' + $(e.currentTarget).attr('data-amenity-title') + '</h4> <h6 class="text-muted">' + $(e.currentTarget).attr('data-amenity-desc') + '</h6> </div> </div>';
        return $('.amenity').tooltipster('content', html);
      },
      'mouseover .building': function(e) {
        var availability, buildingMaster, buildingModel, floors, html, id, minprice, price, response, unit, unitTypes, url;
        id = parseInt(e.currentTarget.id);
        buildingModel = buildingCollection.findWhere({
          'id': id
        });
        buildingMaster = buildingMasterCollection.findWhere({
          'id': id
        });
        if (buildingModel === void 0 && buildingMaster !== void 0) {
          html = '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Not in selection </h5> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        if (buildingModel === void 0) {
          html = '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Building details not entered </h5> </div>';
          $('.layer').tooltipster('content', html);
          return;
        }
        floors = buildingModel.get('no_of_floors');
        unitTypes = building.getUnitTypes(id);
        response = building.getUnitTypesCount(id, unitTypes);
        minprice = building.getMinimumCost(id);
        price = window.numDifferentiation(minprice);
        unit = unitCollection.where({
          'building_id': id,
          'availability': 'available'
        });
        if (unit.length > 0) {
          availability = ' available';
        } else {
          availability = ' sold';
        }
        html = '<div class="svg-info ' + availability + ' "> <div class="action-bar"> <div class="building"></div> </div> <div class="pull-left"> <h4 class="m-t-0 m-b-5">' + buildingModel.get('building_name') + '	<label class="text-muted">(' + floors + ' floors)</label></h4> <div class="details"> <div class="price"> Starting from <span class="text-primary"><span class="icon-rupee-icn"></span> ' + price + '</span> </div> <ul class="bldg">';
        $.each(response, function(index, value) {
          return html += '<li> <h5 class="m-t-0 m-b-0">' + value.name + '</h5> <span>' + value.units + ' Available</span> </li>';
        });
        if (unit.length > 0) {
          if (Object.keys(buildingModel.get('building_master')).length === 0) {
            url = '/building/' + id + '/apartments';
          } else {
            url = '/building/' + id + '/master-view';
          }
          html += '</ul> </div> <a href="#' + url + '" class="view-unit"> <div class="circle"> <span class="arrow-up icon-chevron-right"></span> </div> </a>';
        }
        html += '</div></div>';
        $('.layer').tooltipster('content', html);
        $('#bldg' + id).attr('class', 'bldg blocks active');
        $('.units').mCustomScrollbar("scrollTo", '#bldg' + id);
        return $('#' + id).attr('class', 'layer building active_bldg');
      },
      'mousedown .layer': function(e) {
        return e.preventDefault();
      },
      'mousedown .layer': function(e) {
        return e.preventDefault();
      }
    };

    CenterMasterView.prototype.onShow = function() {
      var breakpoints, first, svgs, that, transitionImages, windowHeight;
      windowHeight = $(window).innerHeight() - 56;
      $('.master').css('height', windowHeight);
      $('.master').css('min-width', windowHeight * 2);
      $('#spritespin').hide();
      that = this;
      transitionImages = [];
      svgs = {};
      breakpoints = project.get('breakpoints');
      $.each(breakpoints, function(index, value) {
        return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/master/master-' + value + '.svg';
      });
      first = _.values(svgs);
      $.merge(transitionImages, project.get('project_master'));
      $('.first_image').attr('src', transitionImages[breakpoints[0]]);
      return $('.first_image').load(function() {
        return $('.region').load(first[0], function() {
          var response;
          $('#svg_loader').addClass('hidden');
          that.iniTooltip();
          CommonFloor.applyAvailabilClasses();
          CommonFloor.randomClass();
          CommonFloor.applyFliterClass();
          that.loadZoom();
          $('#trig').removeClass('hidden');
          $('.svg-maps').removeClass('hidden');
          response = project.checkRotationView();
          $('.first_image').first().css('width', that.ui.svgContainer.width());
          $('.unassign').attr('style', "opacity: 0;fill-opacity: 0;");
          if (response === 1) {
            $('#rotate_loader').removeClass('hidden');
            return that.initializeRotate(transitionImages, svgs);
          }
        }).addClass('active').removeClass('inactive');
      });
    };

    CenterMasterView.prototype.setDetailIndex = function(index) {
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

    CenterMasterView.prototype.initializeRotate = function(transitionImages, svgs) {
      var frames, spin, that, width;
      frames = transitionImages;
      this.breakPoints = project.get('breakpoints');
      this.currentBreakPoint = 0;
      width = this.ui.svgContainer.width();
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
        var data, url;
        data = api.data;
        data.frame;
        if (data.frame === data.stopFrame) {
          url = svgs[data.frame];
          return $('.region').load(url, function() {
            that.iniTooltip();
            CommonFloor.applyAvailabilClasses();
            CommonFloor.randomClass();
            CommonFloor.applyFliterClass();
            that.loadZoom();
            return $('.unassign').attr('style', "opacity: 0;fill-opacity: 0;");
          }).addClass('active').removeClass('inactive');
        }
      });
      return spin.bind("onLoad", function() {
        var first, response, url;
        first = _.values(svgs);
        url = first[0];
        $('#trig').removeClass('hidden');
        response = project.checkRotationView();
        if (response === 1) {
          $('.first_image').remove();
          $('.rotate').removeClass('hidden');
          $('#spritespin').show();
          $('#rotate_loader').addClass('hidden');
        }
        return $('.region').load(url, function() {
          that.iniTooltip();
          CommonFloor.applyAvailabilClasses();
          that.loadZoom();
          CommonFloor.randomClass();
          CommonFloor.applyFliterClass();
          $('.unassign').attr('style', "opacity: 0;fill-opacity: 0;");
          return $('.svg-maps svg').css('height', width / 2);
        }).addClass('active').removeClass('inactive');
      });
    };

    CenterMasterView.prototype.iniTooltip = function() {
      $('.layer').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10,
        interactive: true,
        trigger: 'hover',
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
      return $('.amenity').tooltipster({
        theme: 'tooltipster-shadow marker-tooltip',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        trigger: 'hover'
      });
    };

    CenterMasterView.prototype.loadZoom = function() {
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

    return CenterMasterView;

  })(Marionette.ItemView);

  CommonFloor.CenterMasterCtrl = (function(superClass) {
    extend(CenterMasterCtrl, superClass);

    function CenterMasterCtrl() {
      return CenterMasterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterMasterCtrl.prototype.initialize = function() {
      return this.show(new CommonFloor.CenterMasterView({
        model: project
      }));
    };

    return CenterMasterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project-master-view/project.master.controller.js.map