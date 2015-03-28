jQuery(document).ready ($)->
		
	$('form button[type="reset"]').click();
	$("select").select2()
	
	window.projectsCollection = []
	
	$('#add_project select[name="city"]').change ->
		$('[type="reset"]').click()
		$.ajax
			url : 'http://commonfloor.local/error'
			type : 'jsonp'
			success : (resp)->
			error : (resp)->
				options = ''
				for i in [0...10]
					project = 
						project_title : faker.name.findName()
						cf_project_id : faker.internet.userName()
						project_image: faker.image.imageUrl()
						project_address : "#{faker.address.streetAddress()} #{faker.address.city()}, #{faker.address.zipCode()}"
						project_status : 'Under Construction'
						
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
								<img src="{{ project_image }}" class="img-responsive">
							</div>
						</div>
						<div class="alert alert-warning m-t-20">
							<strong>Note: </strong> The above information is as entered in CommonFloor database.
						</div>
					</div>'
				
		tempalteFn = Handlebars.compile template
		$('#commonfloor-project-details').removeClass('hidden').html tempalteFn project
		
	$('#layout-condensed-toggle').click();