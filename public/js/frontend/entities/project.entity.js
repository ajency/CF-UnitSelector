(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.Project = (function(superClass) {
    extend(Project, superClass);

    function Project() {
      return Project.__super__.constructor.apply(this, arguments);
    }

    Project.prototype.urlRoot = function() {
      return BASERESTURL + '/project/' + this.project_id;
    };

    Project.prototype.parse = function(response) {
      var resp;
      resp = response.data;
      return resp;
    };

    Project.prototype.setProjectAttributes = function(project_id) {
      this.project_id = project_id;
      if (jQuery.isEmptyObject(this.toJSON()) || parseInt(this.get('id')) !== parseInt(project_id)) {
        return this.fetch({
          async: false,
          success: (function(_this) {
            return function(collection, response) {
              _this.set('filters', {
                'Villa': ['unitTypes', 'unitVariantNames', 'flooring'],
                'Apartment': ['unitTypes', 'unitVariantNames', 'flooring'],
                'Plot': ['unitTypes', 'unitVariantNames', 'flooring']
              });
              _this.set('measurement_units', 'Sq.ft');
              if (response === 0 || jQuery.isEmptyObject(response)) {
                return _this.clear();
              }
            };
          })(this)
        });
      }
    };

    Project.prototype.resetEntitites = function() {
      unitCollection.reset();
      return settings.clear();
    };

    Project.prototype.checkRotationView = function() {
      var breakpoints, transitionImages;
      transitionImages = [];
      breakpoints = project.get('breakpoints');
      if (parseInt(breakpoints.length) > 1) {
        this.set('rotation', 1);
      } else {
        this.set('rotation', 0);
      }
      return this.get('rotation');
    };

    return Project;

  })(Backbone.Model);

  window.project = new CommonFloor.Project;

}).call(this);

//# sourceMappingURL=../../frontend/entities/project.entity.js.map