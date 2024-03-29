// Generated by CoffeeScript 1.7.1
var Project,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Project = (function(_super) {
  __extends(Project, _super);

  function Project() {
    return Project.__super__.constructor.apply(this, arguments);
  }

  Project.prototype.urlRoot = function() {
    return 'http://commonfloor.local/methods/functions.php?action=load_project';
  };

  Project.prototype.setProjectAttributes = function(projectData, project_id) {
    if (projectData == null) {
      projectData = {};
    }
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
