(function() {
  jQuery(document).ready(function($) {
    var cfCityFetchOptions, checkUnitTypeRequired, registerRemovePhaseListener, registerRemoveUnitType;
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.notify.defaults({
      globalPosition: 'bottom right'
    });
    cfCityFetchOptions = {
      method: "GET",
      url: "/api/v1/get-cities",
      async: false
    };
    $.ajax(cfCityFetchOptions).done((function(_this) {
      return function(resp, textStatus, xhr) {
        var apiResp, cities, response;
        apiResp = resp.data;
        response = $.parseJSON(apiResp);
        cities = response.results;
        $('#add_project select[name="city"]').empty();
        $('#add_project select[name="city"]').append($('<option value="">Choose City</option>'));
        return _.each(cities, function(value, key) {
          return $('#add_project select[name="city"]').append($('<option/>', {
            value: value.city_name,
            text: value.city_name
          }));
        });
      };
    })(this));
    $('form button[type="reset"]').click();
    $("select").select2();
    window.projectsCollection = [];
    $('#add_project select[name="city"]').change(function() {
      return $("#autocompleteArea").prop('disabled', false);
    });
    $('#autocompleteArea').autocomplete({
      source: function(request, response) {
        var cityName;
        cityName = $('select[name="city"]').val();
        $.ajax({
          url: '/api/v1/get-areas-by-city',
          type: 'GET',
          data: {
            'city': cityName,
            'area_str': $('#autocompleteArea').val()
          },
          success: function(resp) {
            var result;
            result = resp.data;
            if (typeof result === 'string') {
              result = JSON.parse(result);
            }
            if (result !== null && result !== '' && !$.isEmptyObject(result)) {
              response($.map(result, function(item, index) {
                return {
                  label: item,
                  value: item,
                  text: item,
                  code: index
                };
              }));
            } else {
              response(['No Data Found']);
            }
          },
          error: function(result) {
            response(['No Data Found']);
          }
        });
      },
      select: function(event, ui) {
        event.preventDefault();
        if (ui.item.label !== 'No Data Found') {
          $('#autocompleteArea').val(ui.item.value);
          $('#area_code').val(ui.item.code);
          $.ajax({
            url: '/api/v1/get-projects-by-area',
            data: {
              'city': $('#add_project select[name="city"]').val(),
              'area_zone': $('#area_code').val()
            },
            success: function(resp) {
              var options, projects;
              projects = resp.data;
              options = "";
              _.each(projects, (function(_this) {
                return function(proj, key) {
                  var project;
                  project = {
                    project_title: proj.name,
                    cf_project_id: proj.property_id,
                    project_image: proj.builder_image_url,
                    project_address: proj.address,
                    project_status: "",
                    builder_name: proj.builder_name,
                    builder_link: ""
                  };
                  projectsCollection.push(project);
                  return options += "<option value='" + project.cf_project_id + "'>" + project.project_title + "</option>";
                };
              })(this));
              $('#add_project select[name="cf_project_id"]').append(options);
              return $('#add_project select[name="cf_project_id"]').prop('disabled', false);
            },
            error: function(resp) {
              $.notify('Error in fetching project data', 'error');
              return $('#add_project select[name="cf_project_id"]').prop('disabled', true);
            }
          });
        }
      }
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
        successFn = function(resp, status, xhr) {
          if (xhr.status === 201) {
            $('#phase-' + phaseId).after('<td colspan="3"><span class="error"><span for="form3FirstName" class="error">Project Has No Phases</span></span></td>');
            return $('#phase-' + phaseId).remove();
          } else if (xhr.status === 204) {
            return $('#phase-' + phaseId).remove();
          }
        };
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
        var compile, html, phaseId, phasesContainer, type;
        if (xhr.status === 201) {
          $('.phase-name').val('');
          phaseId = resp.data.phase_id;
          type = resp.data.type;
          if (objectType === 'building') {
            phasesContainer = $('select[name="phase_id"]');
            html = '<option value="{{ phase_id }}">{{ phase_name }}</option>';
          } else {
            phasesContainer = $('.phase-table tbody');
            html = '<tr> <td>{{ phase_name }}</td> <td> <select id="phases1" class="select2-container select2 form-control select2-container-active" style="width:50%;"> <option value="">Select Status</option> <option >Live</option> <option selected>Not Live</option> </select> </td> <td><a href="#"  data-toggle="modal" data-target="#myModal" class="text-primary hidden">Update</a></td> </tr>';
          }
          compile = Handlebars.compile(html);
          if (type === 'add') {
            phasesContainer.append(compile({
              phase_name: phaseName,
              phase_id: phaseId
            }));
          } else {
            phasesContainer.html(compile({
              phase_name: phaseName,
              phase_id: phaseId
            }));
          }
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
    $('#myModal').on('click', '.update-phase-btn', function() {
      var phaseId, successFn;
      phaseId = $(this).attr('data-phase-id');
      successFn = function(resp, status, xhr) {
        $('#myModal').modal('toggle');
        $("#phase-" + phaseId).find('select').attr('disabled', true);
        return $("#phase-" + phaseId).find('.updatelink').addClass('hidden');
      };
      return $.ajax({
        url: '/admin/phase/' + phaseId,
        type: 'POST',
        data: {
          _method: "PUT"
        },
        success: successFn
      });
    });
    $('#publishModal').on('click', '.update-project-status', function() {
      var projectId, successFn;
      projectId = $(this).attr('data-project-id');
      successFn = function(resp, status, xhr) {
        return updateResponseTable();
      };
      return $.ajax({
        url: '/admin/project/' + projectId + '/updateprojectstatus',
        type: 'POST',
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
      return $('.propertyTypeUnitsAttributes').on('click', '.remove-unit-type', function() {
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
      html += '</select> <input type="hidden" name="unittypekey[{{ property_type }}][]" value=""> <input type="hidden" name="unittypecustome[{{ property_type }}][]" value=""> </div> <div class="col-md-2 text-center"> <a  data-unit-type-id="0" class="text-primary remove-unit-type"><i class="fa fa-close"></i> </a> </div> </div>';
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
      str = '<div class="row" id="level_{{ level }}"> <div class="no-border"> <div class="grid simple" style="margin-bottom:0;"> <div class="grid-body no-border" style="padding-bottom:0;"> <div class="grid simple vertical orange"> <div class="grid-title"> <h4>Level {{ level }}</h4> <input type="hidden" value="{{ level }}" name="levels[]"> <input style="float:right" type="button" value="Delete Level" class="" onclick="deleteLevel({{ level }});"> </div> <div class="grid-body"><h4> <span class="semi-bold">Layouts</span></h4> <div class="row"> <div class="col-md-6"> <div class="grid simple"> <div class="grid-body"> <div class="inline">2D Layout</div> <input type="hidden" name="image_{{ level }}_2d_id" id="image_{{ level }}_2d_id" value=""> <div class="pull-right" id="2d_{{ level }}_image"> <div class="img-hover img-thumbnail"> <div id="pickfiles_{{ level }}_2d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;"> <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;"> <i class="fa fa-image" style="font-size:30px;"></i> <p class="">Select File</p> </div> </div> </div> </div> </div> </div> </div> <div class="col-md-6"> <div class="grid simple" > <div class="grid-body"> <div class="inline">3D Layout</div> <input type="hidden" name="image_{{ level }}_3d_id" id="image_{{ level }}_3d_id" value=""> <div class="pull-right" id="3d_{{ level }}_image"> <div class="img-hover img-thumbnail"> <div id="pickfiles_{{ level }}_3d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;"> <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;"> <i class="fa fa-image" style="font-size:30px;"></i> <p class="">Select File</p> </div> </div> </div> </div> </div> </div> </div> </div> <div class="room_attributes_block"> </div> <div> <div class="col-md-5 add-unit p-t-10"> <select onchange="openRoomTypeModal(this, 0)" name="room_type[]" class="select2 form-control">';
      str += $('#addFloorlevel').find('select[name="room_type[]"]').html();
      str += '</select> <div class="text-right"> <button type="button" onclick="getRoomTypeAttributes(this,{{ level }});" class="btn btn-link">Add Room</button> </div> </div> </div> </div> </div> </div> </div> </div>';
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

  $('.add-project-attributes-btn').click(function() {
    var attributeName, compile, data, str;
    attributeName = $(this).closest('.project_attribute_block').find('input[name="projectattributes[]"]').val();
    str = '<div class="row m-b-10 "> <div class="col-md-10"> <input type="test" name="projectattributes[]" value="{{ name }}" class="form-control"> <input type="hidden" name="projectattributeId[]" value="" class="form-control"> </div> <div class="col-md-2 text-center"> <a  data-unit-type-id="0" class="text-primary remove-project-attribute"><i class="fa fa-close"></i> </a> </div> </div>';
    compile = Handlebars.compile(str);
    data = {
      name: attributeName
    };
    $(".project_attribute_block").before(compile(data));
    return $(this).closest('.project_attribute_block').find('input[name="projectattributes[]"]').val('');
  });

  $('.room_attributes_block').on('click', '.remove-room-attribute', function() {
    var level, successFn, variantRoomId, variantRooms;
    level = $(this).closest('.row').find('input[name="levels[]"]').val();
    variantRoomId = $(this).closest('.variant_rooms').find('input[name="variantroomid[' + level + '][]"]').val();
    variantRooms = $(this).closest('.room_attributes_block').find('input[name="variantroomid[' + level + '][]"]').length;
    if (parseInt(variantRooms) <= 1) {
      alert('There Should Be Atleast 1 Room For Level');
      return;
    }
    if (variantRoomId === '') {
      $(this).closest('.variant_rooms').remove();
      return;
    }
    if (confirm('Are you sure you want to delete this Room?') === false) {
      return;
    }
    successFn = (function(_this) {
      return function(resp, status, xhr) {
        if (xhr.status === 204) {
          return $(_this).closest('.variant_rooms').remove();
        }
      };
    })(this);
    return $.ajax({
      url: "/admin/project/" + PROJECTID + "/roomtype/" + variantRoomId + "/deletevariantrroom",
      type: 'DELETE',
      success: successFn
    });
  });

}).call(this);

//# sourceMappingURL=add.projects.js.map