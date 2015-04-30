jQuery(document).ready ($)->
	
	#global setup
	$.ajaxSetup
		headers:
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	
	$.notify.defaults globalPosition : 'bottom right'
	$( document ).ajaxComplete (args...)->
		xhr = args[1]
		if xhr.status in [201,202,203]
			$.notify xhr.responseJSON.message, 'success'

		
	$('form button[type="reset"]').click();
	$("select").select2()
	
	window.projectsCollection = []
	
	$('#add_project select[name="city"]').change ->
		$.ajax
			url : '/some-commonfloor-url'
			type : 'jsonp'
			success : (resp)->
			error : (resp)->
				options = ''
				for i in [0...10]
					project = 
						project_title : faker.name.findName()
						cf_project_id : faker.internet.userName()
						project_image: 'http://cfunitselectortest.com/images/artha.gif'
						project_address : "#{faker.address.streetAddress()} #{faker.address.city()}, #{faker.address.zipCode()}"
						project_status : 'Under Construction'
						builder_name : faker.name.findName()
						builder_link : faker.internet.domainName()
						
					projectsCollection.push project
					options += "<option value='#{project.cf_project_id}'>#{project.project_title}</option>"
					
				$('#add_project select[name="cf_project_id"]').append options
				
		
	$('#add_project select[name="cf_project_id"]').change ->
		projectId = $(@).val()
		project = _.findWhere window.projectsCollection, 'cf_project_id' : projectId
		$('[name="project_title"],[name="hidden_project_title"]').val project.project_title
		$('[name="project_address"],[name="hidden_project_address"]').val project.project_address
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

			if confirm('Are you sure you want to delete this phase? 
						All building will be affected by this action. Continue?') is false
				return

			phaseId = $(@).attr 'data-phase-id'

			successFn = (resp, status, xhr)=>
				if xhr.status is 204
					$(@).closest('.pull-left').remove()

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
				
				if objectType is 'building'
					phasesContainer = $('select[name="phase_id"]');
					html = '<option value="{{ phase_id }}">{{ phase_name }}</option>'
				else
					phasesContainer = $('.phases')
					html = '<div class="pull-left m-r-10">
								<strong>{{ phase_name }}</strong>
								<button type="button" data-phase-id="{{ phase_id }}" class="btn btn-small btn-link remove-phase">
								<span class="fa fa-times text-danger"></span></button>
							</div>'
				compile = Handlebars.compile html
				phasesContainer.append compile( { phase_name : phaseName, phase_id : phaseId } )
				registerRemovePhaseListener()
			
		$.ajax 
			url : '/admin/phase'
			type : 'POST'
			data : 
				project_id : PROJECTID
				phase_name : phaseName
			success : successFn
			
	checkUnitTypeRequired = ->
		$('.add-unit-types > div').each ->
			activeTypes = $(@)
			if $(@).find('.unit-type').length is 0 and not $(@).hasClass('hidden')
				$(@).find('.unit-type-name').attr 'data-parsley-required', true
			else
				$(@).find('.unit-type-name').removeAttr 'data-parsley-required'
			
				
	
	checkUnitTypeRequired()
	$('[name="property_types[]"]').change (evt)->
		
		$('.add-unit-types > div').addClass 'hidden'
		propertyTypes = $(@).val()
		
		_.each propertyTypes, (propertyType)->
			$('.add-unit-types').find(".property-type-#{propertyType}").removeClass 'hidden'
		
		checkUnitTypeRequired()
			
				
				
	registerRemoveUnitType = ->
		$('.remove-unit-type').off 'click'
		$('.remove-unit-type').on 'click', ->
			
			unitTypeId = $(@).attr 'data-unit-type-id'
			
			if parseInt(unitTypeId) is 0
				$(@).closest('.form-inline').remove()
				return
			
			if confirm('Are you sure you want to delete this unit type? 
						All properties will be affected by this action. Continue?') is false
				return
			
			successFn = (resp, status, xhr)=>
				if xhr.status is 204
					$(@).closest('.form-inline').remove()

			$.ajax 
				url : "/admin/project/#{PROJECTID}/unittype/#{unitTypeId}"
				type : 'DELETE'
				success : successFn
			
				
			
			
	registerRemoveUnitType()
	$('.add-unit-type-btn').click ->
		unitType = $(@).parent().find('input').val()
		if unitType is ''
			alert 'please enter unit type'
			return
			
		$(@).parent().find('input').removeAttr 'data-parsley-required'
		
		html = '<div class="form-inline m-b-10">
					<div class="form-group">
						<input type="text" name="unittype[{{ property_type }}][]" 
							   class="form-control" value="{{  unittype_name }}">
						<input type="hidden" name="unittypekey[]" value="">
						<button type="button" data-unit-type-id="0" class="btn btn-small btn-default m-t-5 remove-unit-type">
							<i class="fa fa-trash"></i> Delete
						</button>
					</div>
				</div>'
		compile = Handlebars.compile html
		propertyType = $(@).attr 'property-type'
		data = 
			property_type : propertyType
			unittype_name : unitType
		$('.add-unit-types').find(".property-type-#{propertyType}")
			.children('.form-inline').last().before compile data
		$(@).parent().find('input').val ''
		registerRemoveUnitType()
		
		
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

				
					
			
		
		