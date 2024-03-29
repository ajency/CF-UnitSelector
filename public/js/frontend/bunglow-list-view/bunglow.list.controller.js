(function() {
  var LeftBunglowListView, TopBunglowListView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.BunglowListView = (function(superClass) {
    extend(BunglowListView, superClass);

    function BunglowListView() {
      return BunglowListView.__super__.constructor.apply(this, arguments);
    }

    BunglowListView.prototype.template = '#project-template';

    return BunglowListView;

  })(Marionette.LayoutView);

  CommonFloor.BunglowListCtrl = (function(superClass) {
    extend(BunglowListCtrl, superClass);

    function BunglowListCtrl() {
      return BunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    BunglowListCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      if (bunglowVariantCollection.length === 0 && apartmentVariantCollection.length === 0) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.BunglowListView);
      }
    };

    return BunglowListCtrl;

  })(Marionette.RegionController);

  TopBunglowListView = (function(superClass) {
    extend(TopBunglowListView, superClass);

    function TopBunglowListView() {
      return TopBunglowListView.__super__.constructor.apply(this, arguments);
    }

    TopBunglowListView.prototype.template = Handlebars.compile('<div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1>{{project_title}} {{#types}} {{count.length}} {{type}} {{/types}}</h1> </div> </div> </div>');

    TopBunglowListView.prototype.serializeData = function() {
      var data, response;
      data = TopBunglowListView.__super__.serializeData.call(this);
      response = CommonFloor.propertyTypes();
      data.types = response;
      return data;
    };

    return TopBunglowListView;

  })(Marionette.ItemView);

  CommonFloor.TopBunglowListCtrl = (function(superClass) {
    extend(TopBunglowListCtrl, superClass);

    function TopBunglowListCtrl() {
      return TopBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    TopBunglowListCtrl.prototype.initialize = function() {
      console.log("aaaaaaaaaaa");
      return this.show(new TopBunglowListView({
        model: project
      }));
    };

    return TopBunglowListCtrl;

  })(Marionette.RegionController);

  LeftBunglowListView = (function(superClass) {
    extend(LeftBunglowListView, superClass);

    function LeftBunglowListView() {
      return LeftBunglowListView.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowListView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>');

    LeftBunglowListView.prototype.onShow = function() {
      return $('.filters').hide();
    };

    return LeftBunglowListView;

  })(Marionette.ItemView);

  CommonFloor.LeftBunglowListCtrl = (function(superClass) {
    extend(LeftBunglowListCtrl, superClass);

    function LeftBunglowListCtrl() {
      return LeftBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftBunglowListCtrl.prototype.initialize = function() {
      return this.show(new LeftBunglowListView);
    };

    return LeftBunglowListCtrl;

  })(Marionette.RegionController);

  CommonFloor.CenterBunglowListCtrl = (function(superClass) {
    extend(CenterBunglowListCtrl, superClass);

    function CenterBunglowListCtrl() {
      return CenterBunglowListCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterBunglowListCtrl.prototype.initialize = function() {
      var data, response, units;
      response = CommonFloor.checkListView();
      if (response.type === 'bunglows') {
        units = bunglowVariantCollection.getBunglowUnits();
        data = {};
        data.units = units;
        data.type = 'villa';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        new CommonFloor.ListCtrl({
          region: this.region
        });
        this.parent().trigger("load:units", data);
      }
      if (response.type === 'building') {
        console.log(this.parent());
        units = buildingCollection;
        data = {};
        data.units = units;
        data.type = 'building';
        this.region = new Marionette.Region({
          el: '#centerregion'
        });
        new CommonFloor.CenterBuildingListCtrl({
          region: this.region
        });
        return this.parent().trigger("load:units", data);
      }
    };

    return CenterBunglowListCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/bunglow-list-view/bunglow.list.controller.js.map