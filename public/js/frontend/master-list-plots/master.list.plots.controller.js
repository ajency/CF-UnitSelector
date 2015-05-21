(function() {
  var MasterPlotListView, PlotListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PlotListView = (function(superClass) {
    extend(PlotListView, superClass);

    function PlotListView() {
      return PlotListView.__super__.constructor.apply(this, arguments);
    }

    PlotListView.prototype.template = Handlebars.compile('	<div class="info"> <h2 class="m-b-5">{{unit_name}}</h2> <div class="floors"><span>{{unit_type}}</span></div> </div> <div class="clearfix"></div> <div class="unit-type-info"> <div class="price {{classname}}"> <span>{{price}}</span></div> </div>');

    PlotListView.prototype.initialize = function() {
      this.$el.prop("id", 'unit' + this.model.get("id"));
      return this.classname = '';
    };

    PlotListView.prototype.tagName = 'li';

    PlotListView.prototype.className = 'bldg blocks';

    PlotListView.prototype.serializeData = function() {
      var availability, data, response, status;
      data = PlotListView.__super__.serializeData.call(this);
      response = window.unit.getUnitDetails(this.model.get('id'));
      data.unit_type = response[1].get('name');
      data.super_built_up_area = response[0].get('super_built_up_area');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      this.model.set('status', status);
      window.convertRupees(response[3]);
      data.price = window.numDifferentiation(response[3]);
      return data;
    };

    PlotListView.prototype.onShow = function() {
      var availability, classname, html, id, status;
      this.iniTooltip(this.model.get('id'));
      html = this.getHtml(this.model.get('id'));
      id = this.model.get('id');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      classname = $('#unit' + id).attr('class');
      return $('#unit' + id).attr('class', classname + ' ' + status);
    };

    PlotListView.prototype.events = {
      'mouseover': function(e) {
        var html, id;
        html = this.getHtml(this.model.get('id'));
        id = this.model.get('id');
        $('.layer').attr('class', 'layer plot');
        $('#' + id + '.plot').attr('class', 'layer plot svg_active ' + this.model.get('status'));
        $('#unit' + id).attr('class', 'bldg blocks' + ' ' + this.model.get('status') + ' active');
        $('#' + id).tooltipster('content', html);
        return $('#' + id).tooltipster('show');
      },
      'mouseout': function(e) {
        var id;
        id = this.model.get('id');
        $('#' + id + '.villa').attr('class', 'layer plot ' + this.model.get('status'));
        $('#unit' + id).attr('class', 'bldg blocks' + ' ' + this.model.get('status'));
        return $('#' + id).tooltipster('hide');
      },
      'click': function(e) {
        var id, unit;
        id = this.model.get('id');
        unit = unitCollection.findWhere({
          id: id
        });
        if (!_.isUndefined(unit)) {
          return setTimeout(function(x) {
            CommonFloor.navigate('/unit-view/' + id, {
              trigger: true
            });
            return CommonFloor.router.storeRoute();
          }, 500);
        }
      }
    };

    PlotListView.prototype.iniTooltip = function(id) {
      return $('#' + id).trigger('click');
    };

    PlotListView.prototype.getHtml = function(id) {
      var availability, html, price, response, unit, unitMaster;
      html = "";
      id = parseInt(id);
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
      if (unit === void 0) {
        html += '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left"> Plot details not entered </h5> </div>';
        $('.layer').tooltipster('content', html);
        return;
      }
      response = window.unit.getUnitDetails(id);
      price = window.numDifferentiation(response[3]);
      availability = unit.get('availability');
      availability = s.decapitalize(availability);
      html = "";
      html += '<div class="svg-info ' + availability + ' "> <div class="action-bar"> <div class="plot"></div> </div> <h5 class="pull-left m-t-0">' + unit.get('unit_name') + '</h5> <br> <br> <!--<span class="pull-right icon-cross cross"></span> <span class="label label-success"></span <div class="clearfix"></div>--> <div class="details"> <div>' + response[1].get('name') + ' (' + response[0].get('super_built_up_area') + ' Sq.ft) <!--<label>Variant</label> - ' + response[0].get('unit_variant_name') + '--> </div> <div> Starting Price <span class="text-primary">' + price + '</span> </div> </div>';
      if (availability === 'available') {
        html += '<div class="circle"> <a href="#unit-view/' + id + '" class="arrow-up icon-chevron-right"></a> </div> <div class="details"> <div class="text-muted text-default">Click arrow to move forward</div> </div> </div>';
      } else {
        html += '</div>';
      }
      return html;
    };

    return PlotListView;

  })(Marionette.ItemView);

  MasterPlotListView = (function(superClass) {
    extend(MasterPlotListView, superClass);

    function MasterPlotListView() {
      return MasterPlotListView.__super__.constructor.apply(this, arguments);
    }

    MasterPlotListView.prototype.template = Handlebars.compile('<div id="view_toggle" class="toggle-view-button map"></div> <div class="list-view-container w-map animated fadeIn"> <!--<div class="controls map-View"> <div class="toggle"> <a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a> </div> </div>--> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">Buildings</li> <li class="prop-type Villas  hidden ">Villas/Bungalows</li> <li class="prop-type Plots active">Plots</li> </ul> </div> <div class="bldg-list"> <div class="legend clearfix"> <ul> <li class="available">AVAILABLE</li> <li class="sold">SOLD</li> <li class="blocked">BLOCKED</li> <li class="na">N/A</li> </ul> </div> <p class="text-center help-text">Hover on the units for more details</p> <!--<div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div>--> <ul class="units one"> </ul> <div class="clearfix"></div> </div> </div>');

    MasterPlotListView.prototype.childView = PlotListView;

    MasterPlotListView.prototype.childViewContainer = '.units';

    MasterPlotListView.prototype.ui = {
      viewtog: '#view_toggle'
    };

    MasterPlotListView.prototype.events = {
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

    MasterPlotListView.prototype.onShow = function() {
      if (buildingCollection.length !== 0) {
        $('.buildings').removeClass('hidden');
      }
      if (bunglowVariantCollection.length !== 0) {
        $('.Villas').removeClass('hidden');
      }
      return $('.units').mCustomScrollbar({
        theme: 'inset'
      });
    };

    return MasterPlotListView;

  })(Marionette.CompositeView);

  CommonFloor.MasterPlotListCtrl = (function(superClass) {
    extend(MasterPlotListCtrl, superClass);

    function MasterPlotListCtrl() {
      this.loadController = bind(this.loadController, this);
      return MasterPlotListCtrl.__super__.constructor.apply(this, arguments);
    }

    MasterPlotListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection, view;
      console.log("aaaaaaaaa");
      newUnits = plotVariantCollection.getPlotUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      this.view = view = new MasterPlotListView({
        collection: unitsCollection
      });
      return this.show(view);
    };

    MasterPlotListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return MasterPlotListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/master-list-plots/master.list.plots.controller.js.map