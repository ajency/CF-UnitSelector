(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.VillaView = (function(superClass) {
    extend(VillaView, superClass);

    function VillaView() {
      return VillaView.__super__.constructor.apply(this, arguments);
    }

    VillaView.prototype.template = '<form id="add-form"><div class="form-group"> <label for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="">Select</option> <option value="1">Villa 1</option> <option value="2">Villa 2</option> <option value="3">Villa 3</option> <option value="4">Villa 4</option> <option value="5">Villa 5</option> </select> </div><form>';

    VillaView.prototype.ui = {
      units: '.units'
    };

    VillaView.prototype.events = {
      'change @ui.units': function(e) {
        return $('.villa').each(function(index, value) {
          if (value.id === $(e.target).val()) {
            $('.alert').text('Already assigned');
            window.hideAlert();
          }
        });
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
      return this.show(new AuthoringTool.VillaView);
    };

    return VillaCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/villa.entity.js.map