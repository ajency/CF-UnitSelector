(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.BuildingView = (function(superClass) {
    extend(BuildingView, superClass);

    function BuildingView() {
      return BuildingView.__super__.constructor.apply(this, arguments);
    }

    BuildingView.prototype.template = '<form id="add-form"><div class="form-group"> <label for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="">Select</option> {{#options}} <option value="{{id}}">{{name}}</option> {{/options}} </select> </div></form>';

    BuildingView.prototype.ui = {
      units: '.units'
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

    BuildingView.prototype.events = {
      'change @ui.units': function(e) {
        window.coord = 0;
        return $('.plot').each(function(index, value) {
          if (value.id === $(e.target).val()) {
            $('.alert').text('Already assigned');
            window.hideAlert();
            window.coord = 1;
          }
        });
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