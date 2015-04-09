(function() {
  var BunglowVariant, BunglowVariantCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BunglowVariant = (function(superClass) {
    extend(BunglowVariant, superClass);

    function BunglowVariant() {
      return BunglowVariant.__super__.constructor.apply(this, arguments);
    }

    return BunglowVariant;

  })(Backbone.Model);

  BunglowVariantCollection = (function(superClass) {
    extend(BunglowVariantCollection, superClass);

    function BunglowVariantCollection() {
      return BunglowVariantCollection.__super__.constructor.apply(this, arguments);
    }

    BunglowVariantCollection.prototype.model = BunglowVariant;

    BunglowVariantCollection.prototype.url = function() {
      return "http://commonfloor.local/methods/functions.php?action=load_bunglow_variants";
    };

    BunglowVariantCollection.prototype.setBunglowVariantAttributes = function(project_id) {
      if (this.length === 0) {
        return bunglowVariantCollection.fetch({
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

    return BunglowVariantCollection;

  })(Backbone.Collection);

  window.bunglowVariantCollection = new BunglowVariantCollection;

}).call(this);

//# sourceMappingURL=../../frontend/entities/bunglow.variant.js.map