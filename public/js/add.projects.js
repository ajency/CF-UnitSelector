(function() {
  var slice = [].slice;

  jQuery(document).ready(function($) {
    var checkUnitTypeRequired, registerRemovePhaseListener, registerRemoveUnitType;
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.notify.defaults({
      globalPosition: 'bottom right'
    });
    $(document).ajaxComplete(function() {
      var args, ref, ref1, xhr;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      xhr = args[1];
      if ((ref = xhr.status) === 201 || ref === 202 || ref === 203) {
        return $.notify(xhr.responseJSON.message, 'success');
      } else if ((ref1 = xhr.status) === 200) {
        return $.notify(xhr.responseJSON.message, 'error');
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
              project_image: 'http://cfunitselectortest.com/images/artha.gif',
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
      $('[name="project_title"],[name="hidden_project_title"]').val(project.project_title);
      $('[name="project_address"],[name="hidden_project_address"]').val(project.project_address);
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
      var objectType, phaseName, successFn;
      phaseName = $('.phase-name').val();
      objectType = $('div.object-phases').attr('data-object-type');
      if (phaseName === '') {
        alert('Please enter phase name');
        return;
      }
      successFn = function(resp, status, xhr) {
        var compile, html, phaseId, phasesContainer;
        if (xhr.status === 201) {
          $('.phase-name').val('');
          phaseId = resp.data.phase_id;
          if (objectType === 'building') {
            phasesContainer = $('select[name="phase_id"]');
            html = '<option value="{{ phase_id }}">{{ phase_name }}</option>';
          } else {
            phasesContainer = $('.phases');
            html = '<div class="pull-left m-r-10"> <strong>{{ phase_name }}</strong> <button type="button" data-phase-id="{{ phase_id }}" class="btn btn-small btn-link remove-phase"> <span class="fa fa-times text-danger"></span></button> </div>';
          }
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
    checkUnitTypeRequired = function() {
      return $('.add-unit-types > div').each(function() {
        var activeTypes;
        activeTypes = $(this);
        if ($(this).find('.unit-type').length === 0 && !$(this).hasClass('hidden')) {
          return $(this).find('.unit-type-name').attr('data-parsley-required', true);
        } else {
          return $(this).find('.unit-type-name').removeAttr('data-parsley-required');
        }
      });
    };
    registerRemoveUnitType = function() {
      $('.remove-unit-type').off('click');
      return $('.remove-unit-type').on('click', function() {
        var successFn, unitTypeId;
        unitTypeId = $(this).attr('data-unit-type-id');
        if (parseInt(unitTypeId) === 0) {
          $(this).closest('.unit_type_block').remove();
          return;
        }
        if (confirm('Are you sure you want to delete this unit type? All properties will be affected by this action. Continue?') === false) {
          return;
        }
        successFn = (function(_this) {
          return function(resp, status, xhr) {
            if (xhr.status === 204) {
              return $(_this).closest('.unit_type_block').remove();
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
    $('.add-unit-types').on('click', '.add-unit-type-btn', function() {
      var compile, data, html, propertyType, unitType;
      unitType = $(this).closest('.unit_type_block').find('select').val();
      if (unitType === '') {
        alert('please select unit type');
        return;
      }
      propertyType = $(this).attr('property-type');
      html = '<div class="row m-b-10 unit_type_block"> <div class="col-md-10"> <select onchange="createUnitType(this,{{ property_type }})" name="unittype[{{ property_type }}][]" class="select2-container select2 form-control select2-container-active">';
      html += $(this).closest('.unit_type_block').find('select').html();
      html += '</select> <input type="hidden" name="unittypekey[{{ property_type }}][]" value=""> <input type="hidden" name="unittypecustome[{{ property_type }}][]" value=""> </div> <div class="col-md-2 text-center"> <a  data-unit-type-id="0" class="btn btn-link remove-unit-type"><i class="fa fa-close"></i> </a> </div> </div>';
      compile = Handlebars.compile(html);
      data = {
        property_type: propertyType
      };
      $(this).closest('.unit_type_block').before(compile(data));
      $(this).closest('.unit_type_block').find('select').val('');
      $(this).closest('.unit_type_block').prev('.unit_type_block').find('select').val(unitType);
      $('select').select2();
      return registerRemoveUnitType();
    });
    $('.add_new_unit_type').click(function() {
      var newUnitType, selectoption;
      newUnitType = $(this).closest('.form-group').find('input').val();
      if (newUnitType === '') {
        alert('please enter unit type');
        return;
      }
      selectoption = "<option value='" + newUnitType + "'>" + newUnitType + "</option>";
      return $(this).prev('.form-group').find('select').remove();
    });
    $('.floor-position button.save-position').click(function() {
      var floorLayoutId, form, formData;
      form = $(this).closest('form');
      form.parsley().validate();
      if (form.parsley().isValid()) {
        formData = form.serializeArray();
        floorLayoutId = form.find('[name="floor_layout_id"]').val();
        return $.ajax({
          url: BASEURL + '/admin/floor-layout/' + floorLayoutId + '/position',
          type: 'POST',
          data: formData,
          success: function(response) {
            return console.log('show success message');
          }
        });
      }
    });
    $('.update-building').click(function() {
      var buildingId, form, updateSection, values;
      form = $(this).closest('form');
      form.parsley().validate();
      if (!form.parsley().isValid()) {
        return true;
      }
      updateSection = form.find('[name="update_section"]').val();
      values = form.serializeArray();
      buildingId = $(this).attr('data-building-id');
      return $.ajax({
        url: BASEURL + "/admin/project/" + PROJECTID + "/building/" + buildingId,
        type: 'PUT',
        data: values,
        success: function(resp) {
          if (updateSection === 'building') {
            window.location.reload();
          }
        }
      });
    });
    $('.apartment-unit-building').change(function() {
      var buildingId, floorSelection, i, j, noOfFloors, ref, results;
      $(this).closest('.row').find('.select-floor').addClass('hidden');
      buildingId = $(this).val();
      if (buildingId.trim() === '') {
        return;
      }
      floorSelection = $(this).closest('.row').find('.select-floor select');
      noOfFloors = $(this).find('option[value="' + buildingId + '"]').attr('data-no-of-floors');
      if (parseInt(noOfFloors) === 0) {
        return;
      }
      $(this).closest('.row').find('.select-floor').removeClass('hidden');
      floorSelection.empty();
      floorSelection.append("<option value=''>Select floor</option>");
      results = [];
      for (i = j = 0, ref = noOfFloors; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        results.push(floorSelection.append("<option value='" + (i + 1) + "'>" + (i + 1) + "</option>"));
      }
      return results;
    });
    $('.apartment-unit-floor-no').change(function() {
      var buildingId, floorNo;
      floorNo = $(this).val();
      buildingId = $('.apartment-unit-building').select2('val');
      return $.ajax({
        url: BASEURL + "/api/v1/buildings/" + buildingId + "/floor-layout",
        type: 'GET',
        data: {
          floor_no: floorNo
        },
        success: function(resp) {}
      });
    });
    $('.update-response-table').click(function() {
      var projectId;
      projectId = $(this).attr('data-p-id');
      return $.ajax({
        url: BASEURL + "/api/v1/project/" + projectId + "/update-response-table",
        type: 'GET',
        success: function(resp) {}
      });
    });
    $('[data-toggle="tooltip"]').tooltip({
      animation: false
    });
    $('[data-toggle="popover"]').popover();
    return $('.add_level').click(function() {
      var compile, counter, data, i, str;
      counter = $("#counter").val();
      i = parseInt(counter) + 1;
      str = '<div class="row" id="level_{{ level }}"> <div class="no-border"> <div class="grid simple" style="margin-bottom:0;"> <div class="grid-body no-border" style="padding-bottom:0;"> <div class="grid simple vertical orange"> <div class="grid-title"> <h4>Level {{ level }}</h4> <input type="hidden" value="{{ level }}" name="levels[]"> </div> <div class="grid-body"><h4> <span class="semi-bold">Layouts</span></h4> <div class="row"> <div class="col-md-6"> <div class="grid simple"> <div class="grid-body"> <div class="inline">2D Layout</div> <input type="hidden" name="image_{{ level }}_2d_id" id="image_{{ level }}_2d_id" value=""> <div class="pull-right" id="2d_{{ level }}_image"> <div class="img-hover img-thumbnail"> <div id="pickfiles_{{ level }}_2d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;"> <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;"> <i class="fa fa-image" style="font-size:30px;"></i> <p class="">Select File</p> </div> </div> </div> </div> </div> </div> </div> <div class="col-md-6"> <div class="grid simple" > <div class="grid-body"> <div class="inline">3D Layout</div> <input type="hidden" name="image_{{ level }}_3d_id" id="image_{{ level }}_3d_id" value=""> <div class="pull-right" id="3d_{{ level }}_image"> <div class="img-hover img-thumbnail"> <div id="pickfiles_{{ level }}_3d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;"> <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;"> <i class="fa fa-image" style="font-size:30px;"></i> <p class="">Select File</p> </div> </div> </div> </div> </div> </div> </div> </div> <div class="row user-description-box"> <div class="col-md-4"> <div> <label class="form-label">Select Room</label> <div class="row"> <div class="col-md-9"> <select onchange="openRoomTypeModal(this, 0)" name="room_type[]" class="select2 form-control">';
      str += $(this).closest('.row').find('select[name="room_type[]"]').html();
      str += '</select> </div> <div class="col-md-3"> <button type="button" onclick="getRoomTypeAttributes(this, {{ level }});" class="btn btn-white"><i class="fa fa-plus inline"></i> Add Room to Level</button> </div> </div> </div> </div> <div class="col-md-8"></div> </div> <div class="room_attributes_block"> </div> </div> </div> </div> </div> </div> </div>';
      compile = Handlebars.compile(str);
      data = {
        level: i
      };
      $("#addFloorlevel").append(compile(data));
      $("select").select2();
      $("#level_" + i).find('select[name="room_type[]"]').val('');
      $("#counter").val(i);
      return addFloorLevelUploader(i);
    });
  });

}).call(this);

//# sourceMappingURL=add.projects.js.map