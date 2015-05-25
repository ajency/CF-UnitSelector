(function() {
  var BunglowListView, MasterBunglowListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BunglowListView = (function(superClass) {
    extend(BunglowListView, superClass);

    function BunglowListView() {
      return BunglowListView.__super__.constructor.apply(this, arguments);
    }

    BunglowListView.prototype.template = Handlebars.compile('	<div class=" info"> <label class="pull-left">{{unit_name}}</label><span class="status-icon"></span> <div class="pull-right">{{unit_type}}</div> <!--{{super_built_up_area}}sqft--> <div class="clearfix"></div> </div> <div class="cost"> <span class="icon-rupee-icn"> </span>{{price}} </div>');

    BunglowListView.prototype.initialize = function() {
      this.$el.prop("id", 'unit' + this.model.get("id"));
      return this.classname = '';
    };

    BunglowListView.prototype.tagName = 'li';

    BunglowListView.prototype.className = 'unit blocks';

    BunglowListView.prototype.serializeData = function() {
      var availability, data, response, status;
      data = BunglowListView.__super__.serializeData.call(this);
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

    BunglowListView.prototype.onShow = function() {
      var availability, classname, id, status;
      id = this.model.get('id');
      availability = this.model.get('availability');
      status = s.decapitalize(availability);
      classname = $('#unit' + id).attr('class');
      return $('#unit' + id).attr('class', classname + ' ' + status);
    };

    BunglowListView.prototype.events = {
      'mouseover': function(e) {
        var html, id;
        html = this.getHtml(this.model.get('id'));
        id = this.model.get('id');
        $('#' + id + '.villa').attr('class', 'layer villa svg_active ' + this.model.get('status'));
        $('#unit' + id).attr('class', 'unit blocks' + ' ' + this.model.get('status') + ' active');
        $('#' + id).tooltipster('content', html);
        return $('#' + id).tooltipster('show');
      },
      'mouseout': function(e) {
        var id;
        id = this.model.get('id');
        $('#' + id + '.villa').attr('class', 'layer villa ' + this.model.get('status'));
        $('#unit' + id).attr('class', 'unit blocks ' + ' ' + this.model.get('status'));
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
            return CommonFloor.navigate('/unit-view/' + id, {
              trigger: true
            });
          }, 500);
        }
      }
    };

    BunglowListView.prototype.iniTooltip = function(id) {
      return $('#' + id).trigger('click');
    };

    BunglowListView.prototype.getHtml = function(id) {
      var availability, html, price, response, unit, unitMaster;
      html = "";
      unit = unitCollection.findWhere({
        id: id
      });
      unitMaster = unitMasterCollection.findWhere({
        id: id
      });
      if (unit === void 0) {
        html += '<div class="svg-info"> <div class="action-bar2"> <div class="txt-dft"></div> </div> <h5 class="pull-left">Villa details not entered </h5> </div>';
        $('.layer').tooltipster('content', html);
        return;
      }
      response = window.unit.getUnitDetails(id);
      price = window.numDifferentiation(response[3]);
      availability = unit.get('availability');
      availability = s.decapitalize(availability);
      html = "";
      html += '<div class="svg-info ' + availability + ' "> <div class="action-bar"> <div class="villa"></div> </div> <h5 class="pull-left m-t-0">' + unit.get('unit_name') + '</h5> <br> <br> <div class="details"> <div>' + response[1].get('name') + ' (' + response[0].get('super_built_up_area') + ' ' + project.get('area_unit') + ') <!--<label>Variant</label> - ' + response[0].get('unit_variant_name') + '--> </div> <div class="text-primary"> <span class="text-primary icon-rupee-icn"></span>' + price + '</div> </div>';
      if (availability === 'available') {
        html += '<div class="circle"> <a href="#unit-view/' + id + '" class="arrow-up icon-chevron-right"></a> </div> <div class="details"> <div class="text-muted text-default">Click arrow to move forward</div> </div> </div>';
      } else {
        html += '</div>';
      }
      return html;
    };

    return BunglowListView;

  })(Marionette.ItemView);

  MasterBunglowListView = (function(superClass) {
    extend(MasterBunglowListView, superClass);

    function MasterBunglowListView() {
      return MasterBunglowListView.__super__.constructor.apply(this, arguments);
    }

    MasterBunglowListView.prototype.template = Handlebars.compile('	<div id="trig" class="toggle-button"></div> <div id="view_toggle" class="toggle-view-button map"></div> <div class="list-view-container w-map animated fadeIn"> <div class="text-center"> <ul class="prop-select"> <li class="prop-type buildings hidden">Buildings</li> <li class="prop-type Villas active ">Villas</li> <li class="prop-type Plots_tab hidden">Plots</li> </ul> </div> <div class="advncd-filter-wrp  unit-list"> <div class="legend clearfix"> <ul> <!--<li class="available">AVAILABLE</li>--> <li class="sold">Not Available</li> <!--<li class="blocked">BLOCKED</li>--> <li class="na">Not in Selection</li> </ul> </div> <p class="text-center help-text">Hover on the units for more details</p> <!--<div class="blck-wrap title-row"> <div class="row"> <div class="col-sm-4"> <h5 class="accord-head">Villa No</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Type</h5> </div> <div class="col-sm-4"> <h5 class="accord-head">Area</h5> </div> </div> </div>--> <ul class="units two"> </ul> <div class="clearfix"></div> </div> </div>');

    MasterBunglowListView.prototype.childView = BunglowListView;

    MasterBunglowListView.prototype.childViewContainer = '.units';

    MasterBunglowListView.prototype.ui = {
      viewtog: '#view_toggle',
      trig: '#trig'
    };

    MasterBunglowListView.prototype.events = {
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
      'click .Plots_tab': function(e) {
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

    MasterBunglowListView.prototype.onShow = function() {
      if (buildingCollection.length !== 0) {
        $('.buildings').removeClass('hidden');
      }
      if (plotVariantCollection.length !== 0) {
        $('.Plots_tab').removeClass('hidden');
      }
      if ($(window).width() > 991) {
        return $('.units').mCustomScrollbar({
          theme: 'cf-scroll'
        });
      }
    };

    return MasterBunglowListView;

  })(Marionette.CompositeView);

  CommonFloor.MasterBunglowListCtrl = (function(superClass) {
    extend(MasterBunglowListCtrl, superClass);

    function MasterBunglowListCtrl() {
      this.loadController = bind(this.loadController, this);
      return MasterBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    MasterBunglowListCtrl.prototype.initialize = function() {
      var newUnits, unitsCollection, view;
      newUnits = bunglowVariantCollection.getBunglowUnits();
      unitsCollection = new Backbone.Collection(newUnits);
      this.view = view = new MasterBunglowListView({
        collection: unitsCollection
      });
      return this.show(view);
    };

    MasterBunglowListCtrl.prototype.loadController = function(data) {
      return Backbone.trigger("load:units", data);
    };

    return MasterBunglowListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/master-list-bunglows/master.list.bunglows.controller.js.map