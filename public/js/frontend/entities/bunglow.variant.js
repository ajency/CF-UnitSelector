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

    BunglowVariantCollection.prototype.setBunglowVariantAttributes = function(data) {
      return bunglowVariantCollection.reset(data);
    };

    return BunglowVariantCollection;

  })(Backbone.Collection);

  window.bunglowVariantCollection = new BunglowVariantCollection;

}).call(this);

//# sourceMappingURL=../../frontend/entities/bunglow.variant.js.map