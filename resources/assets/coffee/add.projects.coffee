jQuery(document).ready ($)->
    
    #global setup
    $.ajaxSetup
        headers:
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    
    $.notify.defaults globalPosition : 'bottom right'


    cfCityFetchOptions =
        method:"GET"
        url: "/api/v1/get-cities"
        async: false

    $.ajax(cfCityFetchOptions).done (resp, textStatus ,xhr)=>
        apiResp = resp.data
        response =  $.parseJSON apiResp
        cities = response.results
        $('#add_project select[name="city"]').empty()
        $('#add_project select[name="city"]') .append $('<option value="">Choose City</option>')  
        _.each cities, (value, key) ->
            $('#add_project select[name="city"]').append $('<option/>',
              value: value.city_name
              text: value.city_name)

    # $( document ).ajaxComplete (args...)->
    #     xhr = args[1]
    #     if xhr.status in [201,202,203]
    #         $.notify xhr.responseJSON.message, 'success'
    #     else if xhr.status in [200]
    #         $.notify xhr.responseJSON.message, 'error'

                                
                                

        
    $('form button[type="reset"]').click();
    $("select").select2()
    
    window.projectsCollection = []
    
    # $('#add_project select[name="city"]').change ->
    #     $.ajax
    #         url : '/api/v1/get-projects-by-area'
    #         data:
    #             'city': $('#add_project select[name="city"]').val()
    #             'area_zone': $('#autocompleteArea').val()
    #         success : (resp)->
    #             console.log resp
    #         error : (resp)->
    #             options = ''
    #             for i in [0...10]
    #                 project = 
    #                     project_title : faker.name.findName()
    #                     cf_project_id : faker.internet.userName()
    #                     project_image: 'http://cfunitselectortest.com/images/artha.gif'
    #                     project_address : "#{faker.address.streetAddress()} #{faker.address.city()}, #{faker.address.zipCode()}"
    #                     project_status : 'Under Construction'
    #                     builder_name : faker.name.findName()
    #                     builder_link : faker.internet.domainName()
                        
    #                 projectsCollection.push project
    #                 options += "<option value='#{project.cf_project_id}'>#{project.project_title}</option>"
                    
    #             $('#add_project select[name="cf_project_id"]').append options

    $('#add_project select[name="city"]').change ->
        # enable locality
        $("#autocompleteArea").prop('disabled', false)

    
      
    $('#autocompleteArea').autocomplete
      source: (request, response) ->
        # overlaydiv = document.getElementById('overlayImg')
        # overlaydiv.style.display = 'block'
		# overlaydiv.style.top = "31.5%";
        # overlaydiv.style.left = "88%";


        
        cityName = $('select[name="city"]').val()
        
        $.ajax
          url: '/api/v1/get-areas-by-city'
          type: 'GET'
          data:
            'city': cityName
            'area_str': $('#autocompleteArea').val()
          
          success: (resp) ->
            result = resp.data
            if typeof result == 'string'
              result = JSON.parse(result)
            if result != null and result != '' and !$.isEmptyObject(result)
              response $.map(result, (item, index) ->
                {
                  label: item
                  value: item
                  text: item
                  code: index
                }
              )
            else
              response [ 'No Data Found' ]
            # overlaydiv.style.display = 'none'
            return
          error: (result) ->
            response [ 'No Data Found' ]
            return
        return
      
      select: (event, ui) ->
        # prevent autocomplete from updating the textbox
        event.preventDefault()
        
        if ui.item.label != 'No Data Found'
            $('#autocompleteArea').val ui.item.value
            $('#area_code').val ui.item.code

            # populate project dropdown
            $.ajax
                url : '/api/v1/get-projects-by-area'
                data:
                    'city': $('#add_project select[name="city"]').val()
                    'area_zone': $('#area_code').val()
                success : (resp)->
                    # populate dropdown with response 
                    projects = resp.data
                    options =""
                    _.each projects, (proj, key) =>
                        project = 
                            project_title : proj.name
                            cf_project_id : proj.property_id
                            project_image: proj.builder_image_url
                            project_address : proj.address
                            project_status : ""
                            builder_name : proj.builder_name
                            builder_link : ""
                            
                        projectsCollection.push project
                        options += "<option value='#{project.cf_project_id}'>#{project.project_title}</option>"
                        
                    $('#add_project select[name="cf_project_id"]').append options                          
                    # enable project 
                    $('#add_project select[name="cf_project_id"]').prop('disabled', false)
                error : (resp)->
                    $.notify 'Error in fetching project data', 'error'
                    $('#add_project select[name="cf_project_id"]').prop('disabled', true)
                      
        return

        
    $('#add_project select[name="cf_project_id"]').change ->
        projectId = $(@).val()
        project = _.findWhere window.projectsCollection, 'cf_project_id' : projectId
        $('[name="project_title"],[name="hidden_project_title"]').val project.project_title
        $('[name="project_address"],[name="hidden_project_address"]').val project.project_address
        $("#add_project").parsley().reset();
        template = '<div class="user-description-box">
                        <div class="row">
                            <div class="col-sm-8">
                                <h4 class="semi-bold">{{ project_title }} - <span class="bold text-primary">{{ cf_project_id }}</span></h4>
                                <i class="fa fa-map-marker"></i> <b>Address:</b>
                                <p>{{ project_address }}</p>
                                <p>Builder Name: <label><b>{{ builder_name }}</b></label></p>
                                <p>Website Link: <label><a href="http://{{ builder_link }}"><b>http://{{ builder_link }}</b></a></label></p>
                            </div>
                            <div class="col-sm-4">
                                {{#if project_image }} 
                                <img src="{{ project_image }}" class="img-responsive">
                                {{/if}}
                            </div>
                        </div>
                        <div class="alert alert-warning m-t-20">
                            <input type="hidden" name="builder_name" value="{{ builder_name }}" />
                            <input type="hidden" name="builder_link" value="{{ builder_link }}" />
                            <input type="hidden" name="project_image" value="{{ project_image }}" />
                            <strong>Note: </strong> The above information is as entered in CommonFloor database.
                        </div>
                    </div>'
                
        tempalteFn = Handlebars.compile template
        $('#commonfloor-project-details').removeClass('hidden').html tempalteFn project
        
    registerRemovePhaseListener = ->
        $('.remove-phase').off 'click'
        $('.remove-phase').on 'click', ->

            if confirm('Are you sure you want to delete this phase?') is false
                return

            phaseId = $(@).attr 'data-phase-id'

            successFn = (resp, status, xhr)->
                if xhr.status is 201  
                  $('#phase-'+phaseId).after('<td colspan="3"><span class="error"><span for="form3FirstName" class="error">Project Has No Phases</span></span></td>')
                  $('#phase-'+phaseId).remove()    
                else if xhr.status is 204 
                    $('#phase-'+phaseId).remove()    

            $.ajax 
                url : "/admin/phase/#{phaseId}"
                type : 'DELETE'
                data : 
                    phase_id : phaseId
                success : successFn
        
    registerRemovePhaseListener()
    
    $('.add-phase-btn').click ->
        phaseName = $('.phase-name').val()
        objectType = $('div.object-phases').attr 'data-object-type'
        if phaseName is ''
            alert 'Please enter phase name'
            return
        
        successFn = (resp, status, xhr)->
            if xhr.status is 201
                $('.phase-name').val ''
                phaseId = resp.data.phase_id
                type = resp.data.type
                
                if objectType is 'building'
                    phasesContainer = $('select[name="phase_id"]');
                    html = '<option value="{{ phase_id }}">{{ phase_name }}</option>'
                else
                    phasesContainer = $('.phase-table tbody')
                    html = '<tr id="phase-{{ phase_id }}">
                            <td>{{ phase_name }}</td>
                            <td>
                             <select onchange="showUpdateButton(this);"  class="select2-container select2 form-control select2-container-active" style="width:50%;">
                            <option value="">Select Status</option>
                            <option value="live">Live</option>
                            <option value="not_live" selected>Not Live</option>
                            </select>
                            </td>
                            <td><a onclick="getPhaseData({{ project_id }}, {{ phase_id }})"  data-toggle="modal" data-target="#myModal" class="text-primary updatelink hidden">Update</a> <a data-phase-id="{{ phase_id }}" class="text-primary remove-phase">Delete</a></td>
                            </tr>'

                compile = Handlebars.compile html
                if type is 'add'
                    phasesContainer.append compile( { phase_name : phaseName, phase_id : phaseId, project_id : PROJECTID } )
                else
                    phasesContainer.html compile( { phase_name : phaseName, phase_id : phaseId, project_id : PROJECTID } )  
                registerRemovePhaseListener()
            
        $.ajax 
            url : '/admin/phase'
            type : 'POST'
            data : 
                project_id : PROJECTID
                phase_name : phaseName
            success : successFn

    $('#myModal').on 'click', '.update-phase-btn', ->
        phaseId = $(@).attr 'data-phase-id'
        successFn = (resp, status, xhr)->
             $('#myModal').modal('toggle')
             $("#phase-"+phaseId).find('select').attr('disabled',true)
             $("#phase-"+phaseId).find('.updatelink').addClass('hidden')
        $.ajax 
            url : '/admin/phase/'+phaseId
            type : 'POST'
            data : 
                _method : "PUT"
            success : successFn         

    $('#publishModal').on 'click', '.update-project-status', ->
        projectId = $(@).attr 'data-project-id'
        successFn = (resp, status, xhr)->
            updateResponseTable()
            
        $.ajax 
            url : '/admin/project/'+projectId+'/updateprojectstatus'
            type : 'POST'
            success : successFn             
                
            
    checkUnitTypeRequired = ->
        $('.add-unit-types > div').each ->
            activeTypes = $(@)
            if $(@).find('.unit-type').length is 0 and not $(@).hasClass('hidden')
                $(@).find('.unit-type-name').attr 'data-parsley-required', true
            else
                $(@).find('.unit-type-name').removeAttr 'data-parsley-required'
            
                
    registerRemoveUnitType = ->
        $('.propertyTypeUnitsAttributes').on 'click', '.remove-unit-type', ->
            
            unitTypeId = $(@).attr 'data-unit-type-id'
            
            if parseInt(unitTypeId) is 0
                $(@).closest('.unit_type_block').remove()
                return
            
            if confirm('Are you sure you want to delete this unit type? 
                        All properties will be affected by this action. Continue?') is false
                return
            
            successFn = (resp, status, xhr)=>
                if xhr.status is 204
                    $(@).closest('.unit_type_block').remove()

            $.ajax 
                url : "/admin/project/#{PROJECTID}/unittype/#{unitTypeId}"
                type : 'DELETE'
                success : successFn
            
    registerRemoveUnitType()
    $('.add-unit-types').on 'click', '.add-unit-type-btn', ->
        unitType = $(@).closest('.unit_type_block').find('select').val()

        if unitType is ''
            alert 'please select unit type'
            return
        propertyType = $(@).attr 'property-type'
        html = '<div class="row m-b-10 unit_type_block">
                  <div class="col-md-10">
                      <select onchange="createUnitType(this,{{ property_type }})" name="unittype[{{ property_type }}][]" class="select2-container select2 form-control select2-container-active">
                          '
    
        html+=  $(@).closest('.unit_type_block').find('select').html()
        html+= '</select>
              <input type="hidden" name="unittypekey[{{ property_type }}][]" value="">
              <input type="hidden" name="unittypecustome[{{ property_type }}][]" value="">      
                      </div>
                        <div class="col-md-2 text-center">
                            <a  data-unit-type-id="0" class="text-primary remove-unit-type"><i class="fa fa-close"></i> </a>
                        </div>
                                </div>'
                                    
        compile = Handlebars.compile html
        
        data = 
            property_type : propertyType

        $(@).closest('.unit_type_block').before compile data
        $(@).closest('.unit_type_block').find('select').val('')
        $(@).closest('.unit_type_block').prev('.unit_type_block').find('select').val(unitType)
        $('select').select2()
        registerRemoveUnitType()
                                 
    $('.add_new_unit_type').click ->
     newUnitType = $(@).closest('.form-group').find('input').val()
     if newUnitType is ''
       alert 'please enter unit type'   
       return

     selectoption = "<option value='#{newUnitType}'>#{newUnitType}</option>"
     $(@).prev('.form-group').find('select').remove()   
        
    $('.floor-position button.save-position').click ->  
        form = $(@).closest('form')
        form.parsley().validate()
        if form.parsley().isValid()
            formData = form.serializeArray()        
            floorLayoutId = form.find('[name="floor_layout_id"]').val()
            $.ajax
                url : BASEURL + '/admin/floor-layout/' + floorLayoutId + '/position'
                type : 'POST'
                data : formData                 
                success : (response)->
                    console.log 'show success message'
                    


    $('.update-building').click ->
        
        form = $(@).closest 'form'
        
        form.parsley().validate()
        
        if not form.parsley().isValid() then return true
        updateSection = form.find('[name="update_section"]').val()
        values = form.serializeArray()
        buildingId = $(@).attr 'data-building-id'
        $.ajax 
            url : "#{BASEURL}/admin/project/#{PROJECTID}/building/#{buildingId}"
            type : 'PUT'
            data : values
            success : (resp)->
                if updateSection is 'building'
                    window.location.reload()
                    return

    
    $('.apartment-unit-building').change ->
        $(@).closest('.row').find('.select-floor').addClass 'hidden'        
        buildingId = $(@).val()
        if buildingId.trim() is '' then return
        floorSelection = $(@).closest('.row').find('.select-floor select')
        noOfFloors = $(@).find('option[value="'+buildingId+'"]').attr 'data-no-of-floors'
        if parseInt(noOfFloors) is 0 then return
        $(@).closest('.row').find('.select-floor').removeClass 'hidden'
        floorSelection.empty()
        floorSelection.append "<option value=''>Select floor</option>"
        for i in [0...noOfFloors]
            floorSelection.append "<option value='#{i+1}'>#{i+1}</option>"  
            
    $('.apartment-unit-floor-no').change ->
        
        floorNo = $(@).val()
        buildingId = $('.apartment-unit-building').select2('val')
        $.ajax
            url : "#{BASEURL}/api/v1/buildings/#{buildingId}/floor-layout"
            type : 'GET'
            data : 
                floor_no : floorNo
            success : (resp)->


    $('.update-response-table').click ->

        projectId = $(@).attr 'data-p-id'
        $.ajax
            url : "#{BASEURL}/api/v1/project/#{projectId}/update-response-table"
            type : 'GET'
            success : (resp)->

    $('[data-toggle="tooltip"]').tooltip({
        animation: false
        })
    $('[data-toggle="popover"]').popover()

    $('.add_level').click ->
        counter = $("#counter").val() 
        i = parseInt(counter)+1
        
        str = '<div class="row" id="level_{{ level }}">
                    <div class="no-border">

                        <div class="grid simple" style="margin-bottom:0;">
                            <div class="grid-body no-border" style="padding-bottom:0;">
                                <div class="grid simple vertical orange">
                                    <div class="grid-title">
                                        <h4>Level {{ level }}</h4>
                                        <input type="hidden" value="{{ level }}" name="levels[]">
                                         <button title="Delete Level" style="float:right"  type="button" class="btn btn-white btn-small" onclick="deleteLevel({{ level }});" id="deletelevel_{{ level }}"><i class="fa fa-trash"></i></button>
                                    </div>
                                    <div class="grid-body"><h4> <span class="semi-bold">Layouts</span></h4>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="grid simple">
                                                    <div class="grid-body">
                                                        <div class="inline">2D Layout</div>
                                                        <input type="hidden" name="image_{{ level }}_2d_id" id="image_{{ level }}_2d_id" value="">   
                                                        <div class="pull-right" id="2d_{{ level }}_image">
                                                            <div class="img-hover img-thumbnail">
                                                                <div id="pickfiles_{{ level }}_2d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                                                    <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                        <i class="fa fa-image" style="font-size:30px;"></i>
                                                                        <p class="">Select File</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="grid simple" >
                                                    <div class="grid-body">
                                                        <div class="inline">3D Layout</div>
                                                        <input type="hidden" name="image_{{ level }}_3d_id" id="image_{{ level }}_3d_id" value="">    
                                                        <div class="pull-right" id="3d_{{ level }}_image">
                                                            <div class="img-hover img-thumbnail">
                                                                <div id="pickfiles_{{ level }}_3d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                                                    <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                        <i class="fa fa-image" style="font-size:30px;"></i>
                                                                        <p class="">Select File</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="room_attributes_block">

                                        </div>
                                        <div>
                                            <div class="col-md-5 add-unit p-t-10">
                                              <select onchange="openRoomTypeModal(this, 0)" name="room_type[]" class="select2 form-control"> 
                                                             '
        str +=  $('#addFloorlevel').find('select[name="room_type[]"]').html()
        str +=  '</select>
                                                       
                                                        <div class="text-right">
                                                            <button type="button" onclick="getRoomTypeAttributes(this,{{ level }});" class="btn btn-link">Add Room</button>
                                                        </div>
                                            </div>
                                         </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>'
    
        compile = Handlebars.compile str
        data = 
          level : i
        $("#addFloorlevel").append compile data
        $("#deletelevel_"+counter).addClass('hidden'); 
        $("select").select2()
        $("#level_"+i).find('select[name="room_type[]"]').val('')
        $("#counter").val i
        addFloorLevelUploader(i)

$('.add-project-attributes-btn').click ->
    attributeName = $(@).closest('.project_attribute_block').find('input[name="projectattributes[]"]').val()
    str = '<div class="row m-b-10 ">
                      <div class="col-md-10">
                          <input type="test" name="projectattributes[]" value="{{ name }}" class="form-control"> 
                          <input type="hidden" name="projectattributeId[]" value="" class="form-control">   
                      </div>
                      <div class="col-md-2 text-center">
                          <a  data-unit-type-id="0" class="text-primary remove-project-attribute"><i class="fa fa-close"></i> </a>
                      </div>
                  </div>'
    compile = Handlebars.compile str
    data = 
      name : attributeName                
    $(".project_attribute_block").before compile data
    $(@).closest('.project_attribute_block').find('input[name="projectattributes[]"]').val('')  
    
    
$('.room_attributes_block').on 'click', '.remove-room-attribute', ->
    level = $(@).closest('.row').find('input[name="levels[]"]').val()
    variantRoomId = $(@).closest('.variant_rooms').find('input[name="variantroomid['+level+'][]"]').val()
    variantRooms = $(@).closest('.room_attributes_block').find('input[name="variantroomid['+level+'][]"]').length
 
    if parseInt(variantRooms) <= 1
        alert('There Should Be Atleast 1 Room For Level')
        return
    
    if variantRoomId is ''
        $(@).closest('.variant_rooms').remove()
        return

    if confirm('Are you sure you want to delete this Room?') is false
        return

    successFn = (resp, status, xhr)=>
        if xhr.status is 204
            $(@).closest('.variant_rooms').remove()

    $.ajax 
        url : "/admin/project/#{PROJECTID}/roomtype/#{variantRoomId}/deletevariantrroom" 
        type : 'DELETE'
        success : successFn    


 

                 
 
    



                
                    
            
        
        