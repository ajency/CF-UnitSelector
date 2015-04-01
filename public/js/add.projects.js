(function() {
  jQuery(document).ready(function($) {
    var registerRemovePhaseListener, registerRemoveUnitType;
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
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
    $('#add_project select[name="cf_project_id"]').change(function() {
      var project, projectId, tempalteFn, template;
      projectId = $(this).val();
      project = _.findWhere(window.projectsCollection, {
        'cf_project_id': projectId
      });
      $('[name="project_title"]').val(project.project_title);
      $('[name="project_address"]').val(project.project_address);
      template = '<div class="user-description-box"> <div class="row"> <div class="col-sm-8"> <h4 class="semi-bold">{{ project_title }} - <span class="bold text-primary">{{ cf_project_id }}</span></h4> <i class="fa fa-map-marker"></i> <b>Address:</b> <p>{{ project_address }}</p> <p>Builder Name: <label><b>{{ builder_name }}</b></label></p> <p>Website Link: <label><a href="http://{{ builder_link }}"><b>http://{{ builder_link }}</b></a></label></p> </div> <div class="col-sm-4"> {{#if project_image }} <img src="{{ project_image }}" class="img-responsive"> {{/if}} </div> </div> <div class="alert alert-warning m-t-20"> <input type="hidden" name="builder_name" value="{{ builder_name }}" /> <input type="hidden" name="builder_link" value="{{ builder_link }}" /> <input type="hidden" name="project_image" value="{{ project_image }}" /> <strong>Note: </strong> The above information is as entered in CommonFloor database. </div> </div>';
      tempalteFn = Handlebars.compile(template);
      return $('#commonfloor-project-details').removeClass('hidden').html(tempalteFn(project));
    });
    registerRemovePhaseListener = function() {
      $('.remove-phase').off('click');
      return $('.remove-phase').on('click', function() {
        var phaseId, successFn;
        if (confirm('Are you sure you want to delete this phase? All building will be affected by this action. Continue?') === false) {
          return;
        }
        phaseId = $(this).attr('data-phase-id');
        successFn = (function(_this) {
          return function(resp, status, xhr) {
            if (xhr.status === 204) {
              return $(_this).closest('.pull-left').remove();
            }
          };
        })(this);
        return $.ajax({
          url: "/admin/phase/" + phaseId,
          type: 'DELETE',
          data: {
            phase_id: phaseId
          },
          success: successFn
        });
      });
    };
    registerRemovePhaseListener();
    $('.add-phase-btn').click(function() {
      var phaseName, successFn;
      phaseName = $('.phase-name').val();
      if (phaseName === '') {
        alert('Please enter phase name');
        return;
      }
      successFn = function(resp, status, xhr) {
        var compile, html, phaseId, phasesContainer;
        if (xhr.status === 201) {
          $('.phase-name').val('');
          phaseId = resp.data.phase_id;
          phasesContainer = $('.phases');
          html = '<div class="pull-left m-r-10"> <strong>{{ phase_name }}</strong> <button type="button" data-phase-id="{{ phase_id }}" class="btn btn-small btn-link remove-phase"> <span class="fa fa-times text-danger"></span></button> </div>';
          compile = Handlebars.compile(html);
          phasesContainer.append(compile({
            phase_name: phaseName,
            phase_id: phaseId
          }));
          return registerRemovePhaseListener();
        }
      };
      return $.ajax({
        url: '/admin/phase',
        type: 'POST',
        data: {
          project_id: PROJECTID,
          phase_name: phaseName
        },
        success: successFn
      });
    });
    $('[name="property_types[]"]').change(function(evt) {
      var propertyTypes;
      $('.add-unit-types > div').addClass('hidden');
      propertyTypes = $(this).val();
      return _.each(propertyTypes, function(propertyType) {
        return $('.add-unit-types').find(".property-type-" + propertyType).removeClass('hidden');
      });
    });
    registerRemoveUnitType = function() {
      $('.remove-unit-type').off('click');
      return $('.remove-unit-type').on('click', function() {
        var successFn, unitTypeId;
        unitTypeId = $(this).attr('data-unit-type-id');
        if (parseInt(unitTypeId) === 0) {
          $(this).closest('.form-inline').remove();
          return;
        }
        if (confirm('Are you sure you want to delete this unit type? All properties will be affected by this action. Continue?') === false) {
          return;
        }
        successFn = (function(_this) {
          return function(resp, status, xhr) {
            if (xhr.status === 204) {
              return $(_this).closest('.form-inline').remove();
            }
          };
        })(this);
        return $.ajax({
          url: "/admin/project/" + PROJECTID + "/unittype/" + unitTypeId,
          type: 'DELETE',
          success: successFn
        });
      });
    };
    registerRemoveUnitType();
    return $('.add-unit-type-btn').click(function() {
      var compile, data, html, propertyType, unitType;
      unitType = $(this).parent().find('input').val();
      if (unitType === '') {
        return;
      }
      html = '<div class="form-inline m-b-10"> <div class="form-group"> <input type="text" name="unittype[{{ property_type }}][]" class="form-control" value="{{  unittype_name }}"> <input type="hidden" name="unittypekey[]" value=""> <button type="button" data-unit-type-id="0" class="btn btn-small btn-default m-t-5 remove-unit-type"> <i class="fa fa-trash"></i> Delete </button> </div> </div>';
      compile = Handlebars.compile(html);
      propertyType = $(this).attr('property-type');
      data = {
        property_type: propertyType,
        unittype_name: unitType
      };
      $('.add-unit-types').find(".property-type-" + propertyType).children('.form-inline').last().before(compile(data));
      $(this).parent().find('input').val('');
      return registerRemoveUnitType();
    });
  });

}).call(this);

//# sourceMappingURL=add.projects.js.map