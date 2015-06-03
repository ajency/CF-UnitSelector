(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AuthoringTool.ProjectView = (function(superClass) {
    extend(ProjectView, superClass);

    function ProjectView() {
      return ProjectView.__super__.constructor.apply(this, arguments);
    }

    ProjectView.prototype.template = Handlebars.compile('<form id="add-form"> <div class="form-group"> <label class="unit-label" for="exampleInputPassword1">Name</label> <input type="text" class="form-control" id="" value="{{title}}" disabled> </div> <div class="form-group"> <label for="Address">Address</label> <textarea class="form-control" rows="2" id="" disabled>{{address}}</textarea> </div> <div class="form-group"> <label for="City">City</label> <input type="text" class="form-control" id="" value="{{city}}" disabled> </div> <form>');

    ProjectView.prototype.ui = {
      units: '.units',
      unitLabel: '.unit-label'
    };

    ProjectView.prototype.serializeData = function() {
      var data, project_data;
      data = ProjectView.__super__.serializeData.call(this);
      project_data = Marionette.getOption(this, 'project_data');
      data.title = project_data['title'];
      data.address = project_data['project_address'];
      data.city = project_data['city'];
      return data;
    };

    return ProjectView;

  })(Marionette.ItemView);

  AuthoringTool.ProjectCtrl = (function(superClass) {
    extend(ProjectCtrl, superClass);

    function ProjectCtrl() {
      return ProjectCtrl.__super__.constructor.apply(this, arguments);
    }

    ProjectCtrl.prototype.initialize = function(opts) {
      console.log(opts);
      return this.show(new AuthoringTool.ProjectView({
        project_data: project_data
      }));
    };

    return ProjectCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../authoring-tool/entities/project.entity.js.map