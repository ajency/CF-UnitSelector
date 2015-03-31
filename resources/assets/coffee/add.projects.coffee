jQuery(document).ready ($)->
	
	#global setup
	$.ajaxSetup
        headers:
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

		
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
						project_image: faker.image.avatar()
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
		$('[name="project_title"]').val project.project_title
		$('[name="project_address"]').val project.project_address
		template = '<div class="user-description-box">
						<div class="row">
							<div class="col-sm-8">
								<h4 class="semi-bold">{{ project_title }} - <span class="bold text-primary">{{ cf_project_id }}</span></h4>
								<i class="fa fa-map-marker"></i> <b>Address:</b>
								<p>{{ project_address }}</p>
							</div>
							<div class="col-sm-4">
								{{#if project_image }} 
								<img src="{{ project_image }}" class="img-responsive">
								{{/if}}
							</div>
						</div>
						<div class="alert alert-warning m-t-20">
							<input type="hidden" name="builder_name" value={{ builder_name }}/>
							<input type="hidden" name="builder_link" value={{ builder_link }}/>
							<input type="hidden" name="project_image" value={{ project_image }}/>
							<strong>Note: </strong> The above information is as entered in CommonFloor database.
						</div>
					</div>'
				
		tempalteFn = Handlebars.compile template
		$('#commonfloor-project-details').removeClass('hidden').html tempalteFn project
		
	registerRemovePhaseListener = ->
		$('.remove-phase').off 'click'
		$('.remove-phase').on 'click', ->

			if confirm('Are you sure you want to delete this phase? 
						All building will be affected with this action. Continue?') is false
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
		
		
	$('.add-phase-btn').click ->
		phaseName = $('.phase-name').val()
		
		successFn = (resp, status, xhr)->
			if xhr.status isnt 201
				phaseId = resp.data.phase_id
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
	
#	$('.property-type > div, .property-type label').hide()	
#	
#	$('[name="property_types[]"]').change (evt)->
#		
#		$('.property-type > div')
#			.hide()
#			.find 'input'
#			.removeAttr 'required'
#			
#		propertyTypes = $(@).val()
#
#		if _.isNull propertyTypes
#			$('.property-type label').hide()
#			return
#		
#		$('.property-type label').show()	
#		_.each propertyTypes, (propertyType)->
#			$(".property-type-#{propertyType}")
#				.show()
#				.find 'input'
#				.attr 'required', true
#				
#	$('.add-unit-type-btn').click (evt)->
#		template = '<div class="form-inline m-b-10">
#						<div class="form-group">
#							<input type="text" class="form-control" value="{{ unit_type }}">
#							<button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
#						</div>
#					</div>'
#		value = $(@).parent().find('input').val()
#		if value is ''
#			return
#		
#		data = 
#			unit_type : value
#		compileFn = Handlebars.compile template
#		$(@).closest('.form-inline').before compileFn data
#		$(@).parent().find('input').val ''
		
		