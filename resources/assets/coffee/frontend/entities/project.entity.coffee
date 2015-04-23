#Project model Definition
class CommonFloor.Project extends Backbone.Model


	#url to fetch project data
	urlRoot :->
		BASERESTURL+'/project/'+@project_id



	
	parse:(response)->
		resp = response.data
		return resp
		





	# set attributes of a projet model
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

		

	resetEntitites:->
		unitCollection.reset()
		settings.clear()

	#Rotation for project master
	checkRotationView:->
		transitionImages = []
		breakpoints = project.get('breakpoints')
		# $.merge transitionImages , project.get('project_master')['right-front']
		# $.merge transitionImages , project.get('project_master')['back-right']
		# $.merge transitionImages , project.get('project_master')['left-back']
		# $.merge transitionImages , project.get('project_master')['front-left']
		if parseInt(breakpoints.length) > 1
			@set 'rotation' , 1
		else
			@set 'rotation' , 0

		@get('rotation')



window.project = new CommonFloor.Project
		

		

	
