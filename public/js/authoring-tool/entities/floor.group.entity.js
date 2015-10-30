var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AuthoringTool.FloorGroupView = (function(superClass) {
  extend(FloorGroupView, superClass);

  function FloorGroupView() {
    return FloorGroupView.__super__.constructor.apply(this, arguments);
  }

  FloorGroupView.prototype.template = Handlebars.compile('<form id="add-form"><div class="form-group"> <label  class="unit-label" for="exampleInputPassword1">Group Name</label> <select class="form-control units"> <option value="">Select</option> {{#options}} <option value="{{id}}">{{name}}</option> {{/options}} </select> </div> <div class="checkbox"> <label> <input type="checkbox" name="check_primary"> Mark as primary unit </label> </div> </form>');

  FloorGroupView.prototype.ui = {
    units: '.units',
    unitLabel: '.unit-label'
  };

  FloorGroupView.prototype.serializeData = function() {
    var data, options, units;
    data = FloorGroupView.__super__.serializeData.call(this);
    options = [];
    units = Marionette.getOption(this, 'units');
    $.each(units, function(ind, val) {
      return options.push({
        'id': val['id'],
        'name': val['name']
      });
    });
    data.options = options;
    return data;
  };

  FloorGroupView.prototype.onShow = function() {
    var units;
    units = buildingCollection;
    if (units.length === 0 && EDITMODE === false) {
      this.ui.units.hide();
      this.ui.unitLabel.hide();
      $('.alert').text('No Floor Groups');
      return window.hideAlert();
    }
  };

  return FloorGroupView;

})(Marionette.ItemView);

AuthoringTool.FloorGroupCtrl = (function(superClass) {
  extend(FloorGroupCtrl, superClass);

  function FloorGroupCtrl() {
    return FloorGroupCtrl.__super__.constructor.apply(this, arguments);
  }

  FloorGroupCtrl.prototype.initialize = function() {
    var attributes, building, buildings, units;
    buildings = buildingCollection.toArray();
    building = _.where(buildings, {
      id: parseInt(building_id)
    });
    attributes = _.pluck(building, 'attributes');
    units = _.pluck(attributes, 'floor_group');
    return this.show(new AuthoringTool.FloorGroupView({
      units: units[0]
    }));
  };

  return FloorGroupCtrl;

})(Marionette.RegionController);
