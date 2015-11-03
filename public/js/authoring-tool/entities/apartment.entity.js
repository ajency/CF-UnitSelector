var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AuthoringTool.ApartmentView = (function(superClass) {
  extend(ApartmentView, superClass);

  function ApartmentView() {
    return ApartmentView.__super__.constructor.apply(this, arguments);
  }

  ApartmentView.prototype.template = Handlebars.compile('<form id="add-form"> <div class="form-group"> <label class="floor-group-label" for="exampleInputPassword1">Group</label> <select class="form-control floor-group"> <option value="">Select</option> {{#floorgroupoptions}} <option value="{{id}}">{{name}}</option> {{/floorgroupoptions}} </select> </div> <div class="form-group"> <label class="unit-label" for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="">Select</option> {{#options}} <option value="{{id}}">{{name}}</option> {{/options}} </select> </div> <div class="checkbox"> <label> <input type="checkbox" name="check_primary"> Mark as primary unit </label> </div> <form>');

  ApartmentView.prototype.ui = {
    units: '.units',
    unitLabel: '.unit-label',
    floorGroup: '.floor-group',
    unitLabel: '.floor-group-label'
  };

  ApartmentView.prototype.serializeData = function() {
    var data, floorGroup, floorgroupoptions;
    data = ApartmentView.__super__.serializeData.call(this);
    floorgroupoptions = [];
    floorGroup = Marionette.getOption(this, 'floorGroup');
    $.each(floorGroup, function(ind, val) {
      return floorgroupoptions.push({
        'id': val['id'],
        'name': val['name']
      });
    });
    data.floorgroupoptions = floorgroupoptions;
    return data;
  };

  ApartmentView.prototype.events = {
    'change @ui.units': function(e) {
      window.coord = 0;
      return $('.villa').each(function(index, value) {
        if (value.id === $(e.target).val()) {
          $('.alert').text('Already assigned');
          window.coord = 1;
          window.hideAlert();
        }
      });
    },
    'change @ui.floorGroup': function(e) {
      var floorGroup, floorGroupId, floorGroups, floors, options, units;
      floorGroupId = $('.floor-group').val();
      floorGroups = Marionette.getOption(this, 'floorGroup');
      floorGroup = _.where(floorGroups, {
        id: parseInt(floorGroupId)
      });
      floors = floorGroup[0]['floors'];
      options = [];
      units = Marionette.getOption(this, 'units');
      return $.each(units, function(ind, val) {
        if (_.contains(floors, parseInt(val.get('floor')))) {
          return $('.units').append($('<option></option>').val(val.get('id')).html(val.get('unit_name')));
        }
      });
    }
  };

  ApartmentView.prototype.onShow = function() {
    var units;
    units = Marionette.getOption(this, 'units');
    if (units.length === 0 && EDITMODE === false) {
      this.ui.units.hide();
      this.ui.unitLabel.hide();
      $('.alert').text('No apartments');
      return window.hideAlert();
    }
  };

  return ApartmentView;

})(Marionette.ItemView);

AuthoringTool.ApartmentCtrl = (function(superClass) {
  extend(ApartmentCtrl, superClass);

  function ApartmentCtrl() {
    return ApartmentCtrl.__super__.constructor.apply(this, arguments);
  }

  ApartmentCtrl.prototype.initialize = function() {
    var attributes, building, buildings, floorGroup, floor_group, newUnits, temp, units;
    units = [];
    floorGroup = [];
    buildings = buildingCollection.toArray();
    building = _.where(buildings, {
      id: parseInt(building_id)
    });
    attributes = _.pluck(building, 'attributes');
    floor_group = _.pluck(attributes, 'floor_group');
    $.merge(units, apartmentVariantCollection.getApartmentUnits());
    $.merge(units, apartmentVariantCollection.getPenthouseUnits());
    temp = new Backbone.Collection(units);
    newUnits = temp.where({
      'building_id': parseInt(building_id)
    });
    return this.show(new AuthoringTool.ApartmentView({
      units: newUnits,
      floorGroup: floor_group[0]
    }));
  };

  return ApartmentCtrl;

})(Marionette.RegionController);
