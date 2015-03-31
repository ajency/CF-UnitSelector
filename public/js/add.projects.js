(function() {
  jQuery(document).ready(function($) {
    $('form button[type="reset"]').click();
    $("select").select2();
    window.projectsCollection = [];
    $('#add_project select[name="city"]').change(function() {
      return $.ajax({
        url: '/some-commonfloor-url',
        type: 'jsonp',
        success: function(resp) {},
        error: function(resp) {
          var i, j, options, project;
          options = '';
          for (i = j = 0; j < 10; i = ++j) {
            project = {
              project_title: faker.name.findName(),
              cf_project_id: faker.internet.userName(),
              project_image: faker.image.avatar(),
              project_address: (faker.address.streetAddress()) + " " + (faker.address.city()) + ", " + (faker.address.zipCode()),
              project_status: 'Under Construction',
              builder_name: faker.name.findName(),
              builder_link: faker.internet.domainName()
            };
            projectsCollection.push(project);
            options += "<option value='" + project.cf_project_id + "'>" + project.project_title + "</option>";
          }
          return $('#add_project select[name="cf_project_id"]').append(options);
        }
      });
    });
    return $('#add_project select[name="cf_project_id"]').change(function() {
      var project, projectId, tempalteFn, template;
      projectId = $(this).val();
      project = _.findWhere(window.projectsCollection, {
        'cf_project_id': projectId
      });
      $('[name="project_title"]').val(project.project_title);
      $('[name="project_address"]').val(project.project_address);
      template = '<div class="user-description-box"> <div class="row"> <div class="col-sm-8"> <h4 class="semi-bold">{{ project_title }} - <span class="bold text-primary">{{ cf_project_id }}</span></h4> <i class="fa fa-map-marker"></i> <b>Address:</b> <p>{{ project_address }}</p> </div> <div class="col-sm-4"> {{#if project_image }} <img src="{{ project_image }}" class="img-responsive"> {{/if}} </div> </div> <div class="alert alert-warning m-t-20"> <input type="hidden" name="builder_name" value={{ builder_name }}/> <input type="hidden" name="builder_link" value={{ builder_link }}/> <input type="hidden" name="project_image" value={{ project_image }}/> <strong>Note: </strong> The above information is as entered in CommonFloor database. </div> </div>';
      tempalteFn = Handlebars.compile(template);
      return $('#commonfloor-project-details').removeClass('hidden').html(tempalteFn(project));
    });
  });

}).call(this);

//# sourceMappingURL=add.projects.js.map