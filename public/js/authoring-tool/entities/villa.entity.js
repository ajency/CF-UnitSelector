(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.VillaView = (function(superClass) {
    extend(VillaView, superClass);

    function VillaView() {
      return VillaView.__super__.constructor.apply(this, arguments);
    }

    VillaView.prototype.template = '<div class="form-group"> <label for="exampleInputPassword1">Units</label> <select class="form-control units"> <option value="1">Villa 1</option> <option value="2">Villa 2</option> <option value="3">Villa 3</option> <option value="4">Villa 4</option> <option value="5">Villa 5</option> </select> </div>';

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