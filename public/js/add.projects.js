var slice = [].slice;

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
    $("#autocompleteArea").prop('disabled', false);
    $("#autocompleteArea").prop('disabled', false);
    $('#autocompleteArea').val("");
    $('#add_project input[name="project_title"]').val("");
    $('#add_project textarea[name="project_address"]').val("");
    $('#add_project select[name="cf_project_id"]').select2('val', '');
    $('#add_project select[name="cf_project_id"]').empty();
    return $('#commonfloor-project-details').addClass('hidden');
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
            options = "<option value=''>Choose Commonfloor Project</option>";
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
                  builder_link: "",
                  property_page_link: proj.property_page_link
                };
                projectsCollection.push(project);
                return options += "<option value='" + project.cf_project_id + "'>" + project.project_title + "</option>";
              };
            })(this));
            $('#add_project input[name="project_title"]').val("");
            $('#add_project textarea[name="project_address"]').val("");
            $('#add_project select[name="cf_project_id"]').select2('val', '');
            $('#add_project select[name="cf_project_id"]').empty();
            $('#add_project select[name="cf_project_id"]').append(options);
            return $('#add_project select[name="cf_project_id"]').prop('disabled', false);
          },
          error: function(resp) {
            $.notify('Error in fetching project data.Please try again', 'error');
            $('#add_project select[name="cf_project_id"]').prop('disabled', true);
            $('#autocompleteArea').val("");
            $('#add_project input[name="project_title"]').val("");
            $('#add_project textarea[name="project_address"]').val("");
            $('#add_project select[name="cf_project_id"]').select2('val', '');
            return $('#add_project select[name="cf_project_id"]').empty();
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
    $("#add_project").parsley().reset();
    template = '<div class="user-description-box"> <div class="row"> <div class="col-sm-8"> <h4 class="semi-bold">{{ project_title }} - <span class="bold text-primary">{{ cf_project_id }}</span></h4> <i class="fa fa-map-marker"></i> <b>Address:</b> <p>{{ project_address }}</p> <p>Builder Name: <label><b>{{ builder_name }}</b></label></p> <p>Website Link: <label><a href="http://{{ builder_link }}"><b>http://{{ builder_link }}</b></a></label></p> </div> <div class="col-sm-4"> {{#if project_image }} <img src="{{ project_image }}" class="img-responsive"> {{/if}} </div> </div> <div class="alert alert-warning m-t-20"> <input type="hidden" name="builder_name" value="{{ builder_name }}" /> <input type="hidden" name="builder_link" value="{{ builder_link }}" /> <input type="hidden" name="project_image" value="{{ project_image }}" /> <input type="hidden" name="property_page_link" value="{{ property_page_link }}" /> <strong>Note: </strong> The above information is as entered in CommonFloor database. </div> </div>';
    tempalteFn = Handlebars.compile(template);
    return $('#commonfloor-project-details').removeClass('hidden').html(tempalteFn(project));
  });
  registerRemovePhaseListener = function() {
    $('.remove-phase').off('click');
    return $('.remove-phase').on('click', function() {
      var phaseId, successFn;
      if (confirm('Are you sure you want to delete this phase?') === false) {
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
          html = '<tr id="phase-{{ phase_id }}"> <td>{{ phase_name }}</td> <td> <select onchange="showUpdateButton(this);"  class="select2-container select2 form-control select2-container-active" style="width:50%;"> <option value="">Select Status</option> <option value="live">Live</option> <option value="not_live" selected>Not Live</option> </select> </td> <td><a onclick="getPhaseData({{ project_id }}, {{ phase_id }})"  data-toggle="modal" data-target="#myModal" class="text-primary updatelink hidden">Update</a> <a data-phase-id="{{ phase_id }}" class="text-primary remove-phase">Delete</a></td> </tr>';
        }
        compile = Handlebars.compile(html);
        if (type === 'add') {
          phasesContainer.append(compile({
            phase_name: phaseName,
            phase_id: phaseId,
            project_id: PROJECTID
          }));
        } else {
          phasesContainer.html(compile({
            phase_name: phaseName,
            phase_id: phaseId,
            project_id: PROJECTID
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
      $("#phase-" + phaseId).find('.updatelink').addClass('hidden');
      return $("#phase-" + phaseId).find('.remove-phase').addClass('hidden');
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
    $(this).closest('.unit_type_block').find('select').select2("focus");
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
    $('.select-position select').select2('val', '');
    $('.select-position select').empty();
    $('.select-position select').append("<option value=''>Select Position</option>");
    $(this).closest('.row').find('.select-floor').addClass('hidden');
    buildingId = $(this).val();
    if (buildingId.trim() === '') {
      return;
    }
    floorSelection = $(this).closest('.row').find('.select-floor select');
    floorSelection.select2('val', '');
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
    str = '<div class="row" id="level_{{ level }}"> <div class="no-border"> <div class="grid simple" style="margin-bottom:10px;"> <div class="grid-body no-border" style="padding-bottom:0;"> <div class="panel panel-default vertical orange"> <div class="panel-heading" role="tab" id="headingOne"> <h4 class="panel-title"> <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse{{ level }}" aria-expanded="false"> Level{{ level }} <input type="hidden" value="{{ level }}" name="levels[]"> <button title="Delete Level" style="float:right"  type="button" class="btn btn-white btn-small" onclick="deleteLevel({{ level }});" id="deletelevel_{{ level }}"><i class="fa fa-trash"></i></button> </a> </h4> </div> <div id="collapse{{ level }}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo"> <div class="panel-body"><h4> <span class="semi-bold">Layouts</span></h4> <div class="row"> <div class="col-md-6"> <div class="grid simple"> <div class="grid-body"> <div class="inline">2D Layout</div> <input type="hidden" name="image_{{ level }}_2d_id" id="image_{{ level }}_2d_id" value=""> <div class="pull-right" id="2d_{{ level }}_image"> <div class="img-hover img-thumbnail"> <div id="pickfiles_{{ level }}_2d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;"> <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;"> <i class="fa fa-image" style="font-size:30px;"></i> <p class="">Select File</p> </div> </div> </div> </div> </div> </div> </div> <div class="col-md-6"> <div class="grid simple" > <div class="grid-body"> <div class="inline">3D Layout</div> <input type="hidden" name="image_{{ level }}_3d_id" id="image_{{ level }}_3d_id" value=""> <div class="pull-right" id="3d_{{ level }}_image"> <div class="img-hover img-thumbnail"> <div id="pickfiles_{{ level }}_3d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;"> <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;"> <i class="fa fa-image" style="font-size:30px;"></i> <p class="">Select File</p> </div> </div> </div> </div> </div> </div> </div> </div> <div class="room_attributes_block"> </div> <div> <div class="col-md-5 add-unit p-t-10"> <select onchange="openRoomTypeModal(this, 0)" name="room_type[]" class="select2 form-control">';
    str += $('#addFloorlevel').find('select[name="room_type[]"]').html();
    str += '</select> <div class="text-right"> <button type="button" onclick="getRoomTypeAttributes(this,{{ level }});" class="btn btn-link">Add Room</button> </div> </div> </div> </div> </div> </div> </div> </div> </div> </div>';
    compile = Handlebars.compile(str);
    data = {
      level: i
    };
    $("#addFloorlevel").append(compile(data));
    $("#deletelevel_" + counter).addClass('hidden');
    $("select").select2();
    $("#level_" + i).find('select[name="room_type[]"]').val('');
    $("#counter").val(i);
    return addFloorLevelUploader(i);
  });
});

$('.add-project-attributes-btn').click(function() {
  var attributeName, compile, data, str;
  attributeName = $(this).closest('.project_attribute_block').find('input[name="projectattributes[]"]').val();
  if (attributeName === '') {
    alert('Enter Project View');
    return;
  }
  str = '<div class="row m-b-10 "> <div class="col-md-10"> <input type="test" name="projectattributes[]" value="{{ name }}" class="form-control"> <input type="hidden" name="projectattributeId[]" value="" class="form-control"> </div> <div class="col-md-2 text-center"> <a class="text-primary" onclick="deleteAttribute({{ project_id }},0, this);" data-object-type="view"><i class=" fa fa-close" ></i></a> </div> </div>';
  compile = Handlebars.compile(str);
  data = {
    name: attributeName,
    project_id: PROJECTID
  };
  $(".project_attribute_block").before(compile(data));
  return $(this).closest('.project_attribute_block').find('input[name="projectattributes[]"]').val('').focus();
});

$('.add-floor-group-btn').click(function() {
  var compile, data, floorGroupName, groupFloors, str;
  floorGroupName = $(this).closest('.floor_group_block').find('input[name="floor_group_name[]"]').val();
  groupFloors = $(this).closest('.floor_group_block').find('input[name="group_floors[]"]').val();
  if (floorGroupName === '') {
    alert('Enter Group Name');
    return;
  }
  if (groupFloors === '') {
    alert('Enter Floors');
    return;
  }
  str = '<div class="row m-b-10 "> <div class="col-md-10"> <input type="text" name="floor_group_name[]" value="{{groupName}}" class="form-control"> <input type="hidden" name="floor_group_id[]" value="" class="form-control"> &nbsp; <input type="text" name="group_floors[]" value="{{floors}}" class="form-control"> </div> <div class="col-md-2 text-center"> <a class="text-primary" onclick="deleteFloorGroup({{ building_id }},0, this);" data-object-type="view"><i class=" fa fa-close" ></i></a> </div> </div>';
  compile = Handlebars.compile(str);
  data = {
    groupName: floorGroupName,
    floors: groupFloors,
    project_id: PROJECTID
  };
  $(".floor_group_block").before(compile(data));
  $(this).closest('.floor_group_block').find('input[name="floor_group_name[]"]').val('').focus();
  return $(this).closest('.floor_group_block').find('input[name="group_floors[]"]').val('');
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

$('#project_name').autocomplete({
  source: function(request, response) {
    $.ajax({
      url: '/admin/project/getprojectname',
      type: 'POST',
      data: {
        'project_name': $("#project_name").val(),
        'userId': $('#user_id').val()
      },
      success: function(resp) {
        var result;
        result = resp.data.projects;
        if (result !== null && result !== '' && !$.isEmptyObject(result)) {
          response($.map(result, function(item, index) {
            return {
              label: item,
              value: item,
              text: item,
              project_id: index
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
      $('#project_name').val(ui.item.value);
      return $('#project_id').val(ui.item.project_id);
    }
  }
});

$('.add-project-user-btn').click(function() {
  var projectId, projectName, successFn, userId, userType;
  projectName = $('#project_name').val();
  projectId = $('#project_id').val();
  userId = $('#user_id').val();
  userType = $(this).attr('data-user-type');
  if (projectId === '') {
    alert('Please Enter Valid Project');
    $('#project_name').val('');
    return;
  }
  successFn = function(resp, status, xhr) {
    var compile, html;
    if (xhr.status === 201) {
      if ($('.project_block').length === 0) {
        $('.no-projects').addClass('hidden');
      }
      html = '<div class="row m-b-10  project-{{ project_id }}"> <div class="col-md-8"> <input type="text" name="user_project" value="{{ project_name }}" class="form-control"> </div>';
      if (userType === 'agent') {
        html += '<div class="col-md-2 text-center"> <a class="btn btn-primary pull-right m-l-5" onclick="openModal(this,\'{{ project_id }}\');"><i class="fa fa-upload"></i> Assign units</a> </div>';
      }
      html += '<div class="col-md-2 text-center"> <a class="text-primary delete-user-project" data-project-id="{{ project_id }}"><i class="fa fa-close"></i></a> </div> </div>';
      $('#project_name').val('');
      $('#project_id').val('');
      compile = Handlebars.compile(html);
      return $('.add_user_project_block').before(compile({
        project_name: projectName,
        project_id: projectId
      }));
    }
  };
  return $.ajax({
    url: '/admin/user/' + userId + '/userprojects',
    type: 'POST',
    data: {
      project_id: projectId
    },
    success: successFn
  });
});

$('.user-project').on('click', '.delete-user-project', function() {
  var projectId, projectName, successFn, userId;
  if (confirm('Are you sure you want to delete this project?') === false) {
    return;
  }
  projectName = $('#project_name').val();
  projectId = $(this).attr('data-project-id');
  userId = $('#user_id').val();
  successFn = function(resp, status, xhr) {
    if (xhr.status === 204) {
      $('.project-' + projectId).remove();
      if ($('.project_block').length === 0) {
        return $('.no-projects').removeClass('hidden');
      }
    }
  };
  return $.ajax({
    url: '/admin/user/' + userId + '/deleteuserproject',
    type: 'POST',
    data: {
      project_id: projectId
    },
    success: successFn
  });
});

$('.delete-building').click(function() {
  var buildingId, successFn;
  if (confirm('Are you sure you want to delete this building?') === false) {
    return;
  }
  buildingId = $(this).attr('data-building-id');
  successFn = function(resp, status, xhr) {
    if (xhr.status === 204) {
      return window.location = "/admin/project/" + PROJECTID + "/building";
    }
  };
  return $.ajax({
    url: "/admin/project/" + PROJECTID + "/building/" + buildingId,
    type: 'DELETE',
    success: successFn
  });
});

$('.delete-varint').click(function() {
  var successFn, variantId, variantType;
  if (confirm('Are you sure you want to delete this variant?') === false) {
    return;
  }
  variantId = $(this).attr('data-variant-id');
  variantType = $(this).attr('data-variant-type');
  successFn = function(resp, status, xhr) {
    if (xhr.status === 204) {
      return window.location = "/admin/project/" + PROJECTID + "/" + variantType + "";
    }
  };
  return $.ajax({
    url: "/admin/project/" + PROJECTID + "/bunglow-variant/" + variantId,
    type: 'DELETE',
    success: successFn
  });
});

$('.delete-unit').click(function() {
  var successFn, unitId, unitType;
  if (confirm('Are you sure you want to delete this unit?') === false) {
    return;
  }
  unitId = $(this).attr('data-unit-id');
  unitType = $(this).attr('data-unit-type');
  successFn = function(resp, status, xhr) {
    if (xhr.status === 204) {
      return window.location = "/admin/project/" + PROJECTID + "/" + unitType + "";
    }
  };
  return $.ajax({
    url: "/admin/project/" + PROJECTID + "/bunglow-unit/" + unitId,
    type: 'DELETE',
    success: successFn
  });
});

$('.quick-edit').click(function() {
  var compile, hideSaveButton, id, isAgent, str, toggleRow, unitStatus;
  id = $(this).attr('data-object-id');
  toggleRow = $(this).attr('data-toggle');
  isAgent = $(this).attr('is-agent');
  unitStatus = $(this).closest('tr').find('.object-status').attr('data-object-value');
  if (unitStatus === 'booked_by_agent' && isAgent === '1') {
    hideSaveButton = 'hidden';
  } else {
    hideSaveButton = '';
  }
  str = '<tr class="status-row-{{ object_id }}"> <td colspan="8"> <table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table"> <tr><td>Status:</td><td> <select name="unit_status" class="form-control"> <option value="available">Available</option> <option value="sold">Sold</option> <option value="not_released">Not Released</option> <option value="blocked">Blocked</option> <option value="booked_by_agent">Booked By Agent</option> <option value="archived">Archived</option> </select> <button class="btn btn-small btn-primary m-l-10 update-status {{ hide_button }}" data-object-id="{{ object_id }}">Save</button></td></tr> </table> </td> </tr>';
  compile = Handlebars.compile(str);
  if (toggleRow === 'hide') {
    $(this).closest('tr').after(compile({
      unit_status: unitStatus,
      object_id: id,
      hide_button: hideSaveButton
    }));
    $(".status-row-" + id).find('select[name="unit_status"]').val(unitStatus);
    return $(this).attr('data-toggle', 'show');
  } else {
    $(".status-row-" + id).remove();
    return $(this).attr('data-toggle', 'hide');
  }
});

$('#example2').on('click', '.update-status', function() {
  var successFn, unitId, unitStatus;
  unitId = $(this).attr('data-object-id');
  unitStatus = $(this).closest('tr').find('select[name="unit_status"]').val();
  successFn = function(resp, status, xhr) {
    if (xhr.status === 202) {
      $('.row-' + unitId).find('.object-status').attr('data-object-value', unitStatus);
      return $('.row-' + unitId).find('.object-status').html(resp.data.status);
    }
  };
  return $.ajax({
    url: '/admin/project/' + PROJECTID + '/bunglow-unit/' + unitId + '/updatestatus',
    type: 'POST',
    data: {
      unit_status: unitStatus
    },
    success: successFn
  });
});
