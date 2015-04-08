#Project model Definition
class Project extends Backbone.Model

	#url to fetch project data
	urlRoot :->
		'public/project'



	# set attributes of a projet model
	# if blank,fetch it from the server with the url mentioned above.
	setProjectAttributes:(project_id)->
		# @set projectData
		if jQuery.isEmptyObject(@toJSON()) || parseInt(@get('aj_id')) != parseInt(project_id)
			@fetch(
				async: false
				data : 
					project_id : project_id
				success:(collection, response)=>
					if response == 0
						@clear()
				error:(collection, response)=>
					console.log "aaaaaaaaaaaaaaaaa"

				)
			@resetEntitites()

		@

	resetEntitites:->
		buildingCollection.reset()
		unitCollection.reset()
		building.clear()
		apartmentVariantCollection.reset()
		settings.clear()

	checkRotationView:->
		rotationImages = @get('project_master').image.length
		if parseInt(rotationImages) >= 4
			@set 'rotation' , 'yes'
		else
			@set 'rotation' , 'no'

		@get('rotation')




		

		

	
