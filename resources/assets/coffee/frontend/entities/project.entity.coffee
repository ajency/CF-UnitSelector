#Project model Definition
class CommonFloor.Project extends Backbone.Model

	#url to fetch project data
	urlRoot :->
		BASERESTURL+'/project/'+ @project_id


	parse:(response)->
		resp = response.data
		return resp
		





	# set attributes of a projet model
	# if blank,fetch it from the server with the url mentioned above.
	setProjectAttributes:(project_id)->
		# @set projectData
		@project_id = project_id
		if jQuery.isEmptyObject(@toJSON()) || parseInt(@get('id')) != parseInt(project_id)
			@fetch(
				async: false
				success:(collection, response)=>
					if response == 0 || jQuery.isEmptyObject(response)
						@clear()
				

				)
			# @resetEntitites()

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



window.project = new CommonFloor.Project
		

		

	
