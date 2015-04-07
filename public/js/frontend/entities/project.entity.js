(function() {
  var Project,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Project = (function(superClass) {
    extend(Project, superClass);

    function Project() {
      return Project.__super__.constructor.apply(this, arguments);
    }

    Project.prototype.urlRoot = function() {
      return 'public/project';
    };

    Project.prototype.setProjectAttributes = function(project_id) {
      if (jQuery.isEmptyObject(this.toJSON()) || parseInt(this.get('aj_id')) !== parseInt(project_id)) {
        this.fetch({
          async: false,
          data: {
            project_id: project_id
          },
          success: (function(_this) {
            return function(collection, response) {
              if (response === 0) {
                return _this.clear();
              }
            };
          })(this),
          error: (function(_this) {
            return function(collection, response) {
              return console.log("aaaaaaaaaaaaaaaaa");
            };
          })(this)
        });
        this.resetEntitites();
      }
      return this;
    };

    Project.prototype.resetEntitites = function() {
      buildingCollection.reset();
      unitCollection.reset();
      building.clear();
      apartmentVariantCollection.reset();
      return settings.clear();
    };

    Project.prototype.checkRotationView = function() {
      var rotationImages;
      rotationImages = this.get('project_master').image.length;
      if (parseInt(rotationImages) >= 4) {
        this.set('rotation', 'yes');
      } else {
        this.set('rotation', 'no');
      }
      return this.get('rotation');
    };

    return Project;

  })(Backbone.Model);

}).call(this);

//# sourceMappingURL=../../frontend/entities/project.entity.js.map