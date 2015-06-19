(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.BuildingView = (function(superClass) {
    extend(BuildingView, superClass);

    function BuildingView() {
      return BuildingView.__super__.constructor.apply(this, arguments);
    }

    BuildingView.prototype.template = Handlebars.compile('<form id="add-form"><div class="form-group"> <label  class="unit-label" for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="">Select</option> {{#options}} <option value="{{id}}">{{name}}</option> {{/options}} </select> </div> <div class="checkbox"> <label> <input type="checkbox" name="check_primary"> Mark as primary unit </label> </div> </form>');

    BuildingView.prototype.ui = {
      units: '.units',
      unitLabel: '.unit-label'
    };

    BuildingView.prototype.serializeData = function() {
      var data, options, units;
      data = BuildingView.__super__.serializeData.call(this);
      options = [];
      units = Marionette.getOption(this, 'units');
      $.each(units, function(ind, val) {
        return options.push({
          'id': val.get('id'),
          'name': val.get('building_name')
        });
      });
      data.options = options;
      return data;
    };

    BuildingView.prototype.onShow = function() {
      var units;
      units = buildingCollection;
      if (units.length === 0) {
        this.ui.units.hide();
        this.ui.unitLabel.hide();
        $('.alert').text('No buildings');
        return window.hideAlert();
      }
    };

    return BuildingView;

  })(Marionette.ItemView);

  AuthoringTool.BuildingCtrl = (function(superClass) {
    extend(BuildingCtrl, superClass);

    function BuildingCtrl() {
      return BuildingCtrl.__super__.constructor.apply(this, arguments);
    }

    BuildingCtrl.prototype.initialize = function() {
      var units;
      units = buildingCollection.toArray();
      return this.show(new AuthoringTool.BuildingView({
        units: units
      }));
    };

    return BuildingCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/building.entity.js.map