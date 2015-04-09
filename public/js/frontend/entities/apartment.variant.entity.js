(function() {
  var ApartmentVariant, ApartmentVariantCollection,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ApartmentVariant = (function(superClass) {
    extend(ApartmentVariant, superClass);

    function ApartmentVariant() {
      return ApartmentVariant.__super__.constructor.apply(this, arguments);
    }

    ApartmentVariant.prototype.findUnitPrice = function(unit_model) {
      var basic_cost, floorRise, unitVarinatModel;
      if (!(unit_model instanceof Backbone.Model) || unit_model === "") {
        return;
      }
      unitVarinatModel = apartmentVariantCollection.findWhere({
        'variant_id': parseInt(unit_model.get('unit_variant'))
      });
      floorRise = settings.get('floor_rise')[unit_model.get('floor')];
      basic_cost = (parseFloat(unitVarinatModel.get('per_sq_ft_price')) + parseFloat(floorRise)) * parseFloat(unitVarinatModel.get('sellable_area'));
      return basic_cost.toFixed(2);
    };

    return ApartmentVariant;

  })(Backbone.Model);

  ApartmentVariantCollection = (function(superClass) {
    extend(ApartmentVariantCollection, superClass);

    function ApartmentVariantCollection() {
      return ApartmentVariantCollection.__super__.constructor.apply(this, arguments);
    }

    ApartmentVariantCollection.prototype.model = ApartmentVariant;

    ApartmentVariantCollection.prototype.url = function() {
      return "http://commonfloor.local/methods/functions.php?action=load_apartment_variants";
    };

    ApartmentVariantCollection.prototype.setApartmentVariantAttributes = function(project_id) {
      if (this.length === 0) {
        return apartmentVariantCollection.fetch({
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

    return ApartmentVariantCollection;

  })(Backbone.Collection);

  window.apartmentVariantCollection = new ApartmentVariantCollection;

}).call(this);

//# sourceMappingURL=../../frontend/entities/apartment.variant.entity.js.map