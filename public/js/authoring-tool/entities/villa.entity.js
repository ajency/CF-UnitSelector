(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.VillaView = (function(superClass) {
    extend(VillaView, superClass);

    function VillaView() {
      return VillaView.__super__.constructor.apply(this, arguments);
    }

    VillaView.prototype.template = Handlebars.compile('<form id="add-form"><div class="form-group"> <label class="unit-label" for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="">Select</option> {{#options}} <option value="{{id}}">{{name}}</option> {{/options}} </select> </div> <div class="checkbox"> <label> <input type="checkbox" name="check_primary"> Mark as primary unit </label> </div> <form>');

    VillaView.prototype.ui = {
      units: '.units',
      unitLabel: '.unit-label'
    };

    VillaView.prototype.serializeData = function() {
      var data, options, units;
      data = VillaView.__super__.serializeData.call(this);
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

    VillaView.prototype.events = {
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

    VillaView.prototype.onShow = function() {
      var units;
      units = bunglowVariantCollection.getBunglowUnits();
      if (units.length === 0 && EDITMODE === false) {
        this.ui.units.hide();
        this.ui.unitLabel.hide();
        $('.alert').text('No villas');
        return window.hideAlert();
      }
    };

    return VillaView;

  })(Marionette.ItemView);

  AuthoringTool.VillaCtrl = (function(superClass) {
    extend(VillaCtrl, superClass);

    function VillaCtrl() {
      return VillaCtrl.__super__.constructor.apply(this, arguments);
    }

    VillaCtrl.prototype.initialize = function() {
      var units;
      units = bunglowVariantCollection.getBunglowUnits();
      return this.show(new AuthoringTool.VillaView({
        units: units
      }));
    };

    return VillaCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/villa.entity.js.map