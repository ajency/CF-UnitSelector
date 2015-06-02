(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.ApartmentView = (function(superClass) {
    extend(ApartmentView, superClass);

    function ApartmentView() {
      return ApartmentView.__super__.constructor.apply(this, arguments);
    }

    ApartmentView.prototype.template = Handlebars.compile('<form id="add-form"><div class="form-group"> <label class="unit-label" for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="">Select</option> {{#options}} <option value="{{id}}">{{name}}</option> {{/options}} </select> </div><form>');

    ApartmentView.prototype.ui = {
      units: '.units',
      unitLabel: '.unit-label'
    };

    ApartmentView.prototype.serializeData = function() {
      var data, options, units;
      data = ApartmentView.__super__.serializeData.call(this);
      options = [];
      units = Marionette.getOption(this, 'units');
      $.each(units, function(ind, val) {
        return options.push({
          'id': val.get('id'),
          'name': val.get('unit_name')
        });
      });
      data.options = options;
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
      }
    };

    ApartmentView.prototype.onShow = function() {
      var units;
      units = apartmentVariantCollection.getApartmentUnits();
      if (units.length === 0) {
        this.ui.units.hide();
        this.ui.unitLabel.hide();
        $('.alert').text('All apartments marked');
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
      var units;
      units = apartmentVariantCollection.getApartmentUnits();
      return this.show(new AuthoringTool.ApartmentView({
        units: units
      }));
    };

    return ApartmentCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/apartment.entity.js.map