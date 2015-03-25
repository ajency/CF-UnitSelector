(function() {
  jQuery(document).ready(function($) {
    $("select").select2();
    window.projectsCollection = [];
    $('#add_project select[name="city"]').change(function() {
      return $.ajax({
        url: 'http://commonfloor.local/error',
        type: 'jsonp',
        success: function(resp) {},
        error: function(resp) {
          var i, j, options, project;
          options = '';
          for (i = j = 0; j < 10; i = ++j) {
            project = {
              project_title: faker.name.findName(),
              cf_project_id: faker.internet.userName(),
              project_images: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
              project_address: (faker.address.streetAddress()) + " " + (faker.address.city()) + ", " + (faker.address.zipCode()),
              project_status: 'Under Construction'
            };
            projectsCollection.push(project);
            options += "<option value='" + project.cf_project_id + "'>" + project.project_title + "</option>";
          }
          return $('#add_project select[name="cf_project_id"]').append(options);
        }
      });
    });
    $('#add_project select[name="cf_project_id"]').change(function() {
      var project, projectId, tempalteFn, template;
      projectId = $(this).val();
      project = _.findWhere(window.projectsCollection, {
        'cf_project_id': projectId
      });
      template = '<h4 class="semi-bold no-margin">{{ project_title }}</h4> <input type="hidden" name="project_title" value="{{ project_title }}"/> <br> <p><i class="fa fa-map-marker"></i>{{ project_address }}</p> <input type="hidden" name="project_address" value="{{ project_address }}"/> <p><i class="fa fa-clock-o"></i>{{ project_status }}</p>';
      tempalteFn = Handlebars.compile(template);
      return $('#commonfloor-project-details').removeClass('hidden').html(tempalteFn(project));
    });
    return $('#layout-condensed-toggle').click();
  });

}).call(this);

//# sourceMappingURL=add.projects.js.map