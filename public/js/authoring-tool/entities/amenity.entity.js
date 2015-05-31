(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.AmenityView = (function(superClass) {
    extend(AmenityView, superClass);

    function AmenityView() {
      return AmenityView.__super__.constructor.apply(this, arguments);
    }

    AmenityView.prototype.template = '<form id="add-form"> <div class="form-group"> <label for="markerTitle">Title</label> <input type="text" class="form-control" id="amenity-title"> </div> <div class="form-group"> <label for="Description">Description</label> <textarea class="form-control" rows="3" id="amenity-description"></textarea> </div> <div> <label for="Image">Image</label> <div class="input-group"> <input type="text" class="form-control"> <span class="input-group-btn"> <button class="btn btn-default btn-orange" type="button">Upload</button> </span> </div> </div> </form>';

    AmenityView.prototype.ui = {
      units: '.units'
    };

    AmenityView.prototype.serializeData = function() {
      var data, options, units;
      data = AmenityView.__super__.serializeData.call(this);
      options = [];
      units = Marionette.getOption(this, 'units');
      $.each(units, function(ind, val) {
        return options.push({
          'id': val.get('id'),
          'name': val.get('unit_name')
        });
      });
      data.options = options;
      console.log(data);
      return data;
    };

    AmenityView.prototype.events = {
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

    return AmenityView;

  })(Marionette.ItemView);

  AuthoringTool.AmenityCtrl = (function(superClass) {
    extend(AmenityCtrl, superClass);

    function AmenityCtrl() {
      return AmenityCtrl.__super__.constructor.apply(this, arguments);
    }

    AmenityCtrl.prototype.initialize = function() {
      var units;
      units = plotVariantCollection.getPlotUnits();
      return this.show(new AuthoringTool.AmenityView({
        units: units
      }));
    };

    return AmenityCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/amenity.entity.js.map