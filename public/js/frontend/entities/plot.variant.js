(function() {
  var PlotVariant, PlotVariantCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  PlotVariant = (function(superClass) {
    extend(PlotVariant, superClass);

    function PlotVariant() {
      return PlotVariant.__super__.constructor.apply(this, arguments);
    }

    return PlotVariant;

  })(Backbone.Model);

  PlotVariantCollection = (function(superClass) {
    extend(PlotVariantCollection, superClass);

    function PlotVariantCollection() {
      return PlotVariantCollection.__super__.constructor.apply(this, arguments);
    }

    PlotVariantCollection.prototype.model = PlotVariant;

    PlotVariantCollection.prototype.setPlotVariantAttributes = function(project_id) {
      if (this.length === 0) {
        return plotVariantCollection.fetch({
          async: false,
          data: {
            project_id: project_id
          },
          success: (function(_this) {
            return function(collection, response) {
              if (response === 0) {
                return _this.reset();
              }
            };
          })(this)
        });
      }
    };

    return PlotVariantCollection;

  })(Backbone.Collection);

  window.plotVariantCollection = new PlotVariantCollection;

}).call(this);

//# sourceMappingURL=../../frontend/entities/plot.variant.js.map