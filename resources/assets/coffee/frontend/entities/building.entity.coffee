#Building model and Building collection Definition
class Building extends Backbone.Model


	#Get all the unit types in a building
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

	#Count the number of units for each unit type in a building
	getUnitTypesCount:(building_id,unitTypes)->

		types = []
		if building_id == ""
			return types
		$.each unitTypes,(ind,val)->
			unitTypeModel = unitTypeCollection.findWhere
								'id' : val
			variants = apartmentVariantCollection.where
							'unit_type_id' : val
			units = []
			$.each variants,(index,value)->
				unitsColl = unitCollection.where
								'unit_variant_id' : value.get 'id'
								'building_id' : building_id

				$.merge units, unitsColl
			types.push 
				'name' : unitTypeModel.get 'name'
				'units' : units.length

		types

	#Get the minimum sellable area of all the apartments in a building
	getMinimumArea:(building_id)->
		if building_id == ""
			return
		units = unitCollection.where
					'building_id' : building_id
		temp = []
		$.each units,(index,value)->
			variants = apartmentVariantCollection.findWhere
							'id' : value.get 'unit_variant_id'
			temp.push variants.get 'super_built_up_area'
		min= 0
		if temp.length != 0	
			min =  _.min temp
		min

	#Get the minimum cost of all the apartments in a building
	getMinimumCost:(building_id)->
		if building_id == ""
			return
		units = unitCollection.where
					'building_id' : building_id
		temp = []
		$.each units,(index,value)->
			units = unit.getUnitDetails(value.get('id'))
			temp.push units[3]

		min= 0
		if temp.length != 0	
			min =  _.min temp
		min
		


	#get all the apartments in a building
	getBuildingUnits:(building_id)->
		if building_id == ""
			return
		units = unitCollection.where
					'building_id' : building_id

		units 

	#Rotation view for a building
	checkRotationView:(building)->
		if building == ""
			return
		transitionImages = []
		buildingModel = buildingCollection.findWhere({'id':parseInt(building)})
		breakpoints = buildingModel.get 'breakpoints'
		
		if parseInt(breakpoints.length) > 1
			@set 'rotation' , 1
		else
			@set 'rotation' , 0

		@get('rotation')





class BuildingCollection extends Backbone.Collection
	model : Building
	
	#set the attributes of a building model
	setBuildingAttributes:(data)->

		# @set buildingData
		buildingCollection.reset data

window.buildingCollection  = new BuildingCollection
window.building  = new Building