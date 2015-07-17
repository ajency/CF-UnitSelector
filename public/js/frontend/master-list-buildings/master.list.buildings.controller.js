(function() {
  var BuildingEmptyView, ListItemView, MasterBuildingListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ListItemView = (function(superClass) {
    extend(ListItemView, superClass);

    function ListItemView() {
      return ListItemView.__super__.constructor.apply(this, arguments);
    }

    ListItemView.prototype.template = Handlebars.compile('<div class="bldg-img"></div> <div class="info"> <h2 class="m-b-5">{{building_name}}</h2> <div class="floors"><span>{{floors}}</span> floors</div> </div> <div class="clearfix"></div> <div class="unit-type-info"> <ul> {{#types}} <li> {{name}}<!--: <span>{{units}}</span>--> </li> {{/types}} </ul> <span class="area {{areaname}}">{{area}} {{measurement_units}}</span> <div class="text-primary price {{classname}}">Starting price <span class="icon-rupee-icn"></span>{{price}}</div> </div>');

    ListItemView.prototype.tagName = 'li';

    ListItemView.prototype.className = 'bldg blocks';

    ListItemView.prototype.initialize = function() {
      return this.$el.prop("id", 'bldg' + this.model.get("id"));
    };

    ListItemView.prototype.serializeData = function() {
      var areaname, cost, data, floors, id, response, types;
      data = ListItemView.__super__.serializeData.call(this);
      id = this.model.get('id');
      response = building.getUnitTypes(id);
      types = building.getUnitTypesCount(id, response);
      floors = this.model.get('floors');
      areaname = "";
      data.area = building.getMinimumArea(id);
      if (data.area === 0) {
        areaname = 'hidden';
      }
      data.areaname = areaname;
      cost = building.getMinimumCost(id);
      data.classname = "";
      if (cost === 0) {
        data.classname = 'hidden';
      }
      data.price = window.numDifferentiation(cost);
      data.floors = this.model.get('no_of_floors');
      data.types = types;
      data.measurement_units = project.get('measurement_units');
      return data;
    };

    ListItemView.prototype.events = {
      'mouseover': function(e) {
        var html, id;
        this.iniTooltip(this.model.get('id'));
        html = this.getHtml(this.model.get('id'));
        id = this.model.get('id');
        $('#' + id + '.building').attr('class', 'layer building svg_active');
        $('#bldg' + id).attr('class', 'bldg blocks active');
        $('#' + id).tooltipster('content', html);
        return $('#' + id).tooltipster('show');
      },
      'mouseout': function(e) {
        var id;
        id = this.model.get('id');
        $('#' + id + '.building').attr('class', 'layer building');
        $('#bldg' + id).attr('class', 'bldg blocks');
        return $('#' + id).tooltipster('hide');
      },
      'click ': function(e) {
        var buildingModel, id, units;
        id = this.model.get('id');
        units = unitCollection.where({
          'building_id': id,
          'availability': 'available'
        });
        if (units.length === 0) {
          return;
        }
        buildingModel = buildingCollection.findWhere({
          'id': id
        });
        $('.layer').tooltipster('hide');
        $('svg').attr('class', 'zoom');
        $('#spritespin').addClass('zoom');
        $('.us-right-content').addClass('fadeOut');
        $('.cf-loader').removeClass('hidden');
        return setTimeout(function(x) {
          if (Object.keys(buildingModel.get('building_master')).length === 0) {
            return CommonFloor.navigate('/building/' + id + '/apartments', true);
          } else {
            return CommonFloor.navigate('/building/' + id + '/master-view', true);
          }
        }, 500);
      }
    };

    ListItemView.prototype.iniTooltip = function(id) {
      return $('#' + id).trigger('mouseover');
    };

    ListItemView.prototype.getHtml = function(id) {
      var availability, buildingModel, floors, html, minprice, price, response, unit, unitTypes, url;
      html = "";
      id = parseInt(id);
      buildingModel = buildingCollection.findWhere({
        'id': id
      });
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
        html += '</ul> </div> <a href="#' + url + '" class="view-unit"> <div class="circle"> <span class="arrow-up icon-chevron-right"></span> </div> </a> </div> </div>';
      }
      return html;
    };

    return ListItemView;

  })(Marionette.ItemView);

  BuildingEmptyView = (function(superClass) {
    extend(BuildingEmptyView, superClass);

    function BuildingEmptyView() {
      return BuildingEmptyView.__super__.constructor.apply(this, arguments);
    }

    BuildingEmptyView.prototype.template = 'No units added';

    return BuildingEmptyView;

  })(Marionette.ItemView);

  MasterBuildingListView = (function(superClass) {
    extend(MasterBuildingListView, superClass);

    function MasterBuildingListView() {
      return MasterBuildingListView.__super__.constructor.apply(this, arguments);
    }

    MasterBuildingListView.prototype.template = Handlebars.compile('		<div id="trig" class="toggle-button"></div> <div id="view_toggle" class="toggle-view-button map"></div> <div class="list-view-container w-map animated fadeIn"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings active">Buildings</li> <li class="prop-type Villas hidden">Villas</li> <li class="prop-type Plots hidden">Plots</li> </ul> </div> <div class="bldg-list"> <p class="text-center help-text">Hover on the buildings for more details</p> <ul class="units one"> </ul> <div class="clearfix"></div> </div> </div>');

    MasterBuildingListView.prototype.childView = ListItemView;

    MasterBuildingListView.prototype.childViewContainer = '.units';

    MasterBuildingListView.prototype.ui = {
      viewtog: '#view_toggle',
      trig: '#trig'
    };

    MasterBuildingListView.prototype.events = {
      'click @ui.trig': function(e) {
        return $('.list-container').toggleClass('closed');
      },
      'click @ui.viewtog': function(e) {
        $('.us-left-content').toggleClass('not-visible visible');
        return $('.us-right-content').toggleClass('not-visible visible');
      },
      'click .buildings': function(e) {
        var data, units;
        units = buildingCollection;
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        return new CommonFloor.MasterBuildingListCtrl({
          region: this.region
        });
      },
      'click .Villas': function(e) {
        var data, units;
        units = bunglowVariantCollection.getBunglowUnits();
        data = {};
        data.units = units;
        data.type = 'villa';
        this.region = new Marionette.Region({
          el: '#leftregion'
        });
        return new CommonFloor.MasterBunglowListCtrl({
          region: this.region
        });
      },
      'click .Plots': function(e) {
        var data, units;
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

    MasterBuildingListView.prototype.onShow = function() {
      if (bunglowVariantCollection.length !== 0) {
        $('.Villas').removeClass('hidden');
      }
      if (plotVariantCollection.length !== 0) {
        $('.Plots').removeClass('hidden');
      }
      if ($(window).width() > 991) {
        return $('.units').mCustomScrollbar({
          theme: 'cf-scroll'
        });
      }
    };

    return MasterBuildingListView;

  })(Marionette.CompositeView);

  CommonFloor.MasterBuildingListCtrl = (function(superClass) {
    extend(MasterBuildingListCtrl, superClass);

    function MasterBuildingListCtrl() {
      this.loadController = bind(this.loadController, this);
      return MasterBuildingListCtrl.__super__.constructor.apply(this, arguments);
    }

    MasterBuildingListCtrl.prototype.initialize = function() {
      var view;
      this.view = view = new MasterBuildingListView({
        collection: buildingCollection
      });
      return this.show(view);
    };

    MasterBuildingListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return MasterBuildingListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/master-list-buildings/master.list.buildings.controller.js.map