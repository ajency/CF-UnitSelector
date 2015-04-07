// Generated by CoffeeScript 1.7.1
var BunglowVariant, BunglowVariantCollection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BunglowVariant = (function(_super) {
  __extends(BunglowVariant, _super);

  function BunglowVariant() {
    return BunglowVariant.__super__.constructor.apply(this, arguments);
  }

  return BunglowVariant;

})(Backbone.Model);

BunglowVariantCollection = (function(_super) {
  __extends(BunglowVariantCollection, _super);

  function BunglowVariantCollection() {
    return BunglowVariantCollection.__super__.constructor.apply(this, arguments);
  }

  BunglowVariantCollection.prototype.model = BunglowVariant;

  BunglowVariantCollection.prototype.url = function() {
    return "http://commonfloor.local/methods/functions.php?action=load_bunglow_variants";
  };

  BunglowVariantCollection.prototype.setBunglowVariantAttributes = function(unitVariantData, project_id) {
    if (unitVariantData == null) {
      unitVariantData = {};
    }
    if (this.length === 0) {
      bunglowVariantCollection.fetch({
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
    return this;
  };

  return BunglowVariantCollection;

})(Backbone.Collection);
