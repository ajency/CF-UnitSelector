#Building model and Building collection Definition
class Building extends Backbone.Model


	#Count the number of units for each unit type in a building
	getUnitTypecount:(building_id)->

		response = []
		if building_id == ""
			return response
		statusObject  = settings.get 'status'
		statusColl = new Backbone.Collection statusObject
		status  = statusColl.findWhere({'name' : 'Available'})
		apartmentVariantCollection.each ( item)->
			units = unitCollection.where({'unit_variant':parseInt(item.get('id'))
				,'building_id':parseInt(building_id)
				,'status':parseInt(status.get('id'))});

			response.push({id:item.get('id')
				,name:item.get('name')
				,count:units.length})

	
		response

	#check 3d rotation view available or not
	checkRotationView:(buildingId)->
		buildingModel = buildingCollection.findWhere({'building_id':parseInt(buildingId)})
		if buildingId == ""
			return false
		rotationImages = buildingModel.get('threed_view').image.length
		if parseInt(rotationImages) >= 4
			buildingModel.set 'rotation' , 'yes'
		else
			buildingModel.set 'rotation' , 'no'

		buildingModel.get('rotation')




class BuildingCollection extends Backbone.Collection
	model : Building
	#url to fetch building data
	url : ->
		"http://commonfloor.local/methods/functions.php?action=load_buildings"

	#set the attributes of a building model
	# if blank,fetch it from the server with the url mentioned above.
	setBuildingAttributes:(buildingData = {},project_id)->

		# @set buildingData
		
		if @length == 0 
			buildingCollection.fetch(
				async : false
				data : 
					project_id : project_id
				success:(collection, response)=>
					model =  collection.models
					if response == 0
						@reset()

				)

window.buildingCollection  = new BuildingCollection;