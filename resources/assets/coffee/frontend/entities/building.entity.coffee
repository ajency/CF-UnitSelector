#Building model and Building collection Definition
class Building extends Backbone.Model


	#Count the number of units for each unit type in a building
	getUnitTypes:(building_id)->

		unitTypes = []
		if building_id == ""
			return unitTypes
		units = unitCollection.where
						'building_id'  : building_id

		units = new Backbone.Collection units
		variants = units.pluck("unit_variant_id") 
		$.each variants,(index,value)->
			varinatModel = apartmentVariantCollection.findWhere
									'id' : value
			unitTypes.push varinatModel.get 'unit_type_id'

		unitTypes = _.uniq unitTypes
		unitTypes

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
	setBuildingAttributes:(data)->

		# @set buildingData
		console.log data
		buildingCollection.reset data

window.buildingCollection  = new BuildingCollection
window.building  = new Building