#No Found Controller and veiw
class CommonFloor.NothingFoundView extends Marionette.ItemView
	
	template : '#noFound-template'

class CommonFloor.NothingFoundCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NothingFoundView

#api required to load second step
CommonFloor.loadJSONData = ()->

	$.ajax
		type : 'GET',
		url  : BASERESTURL+'/project/'+	PROJECTID+'/step-two'
		async : false
		success :(response)->
			#parsing the integer fields 
			response = window.convertToInt(response)
			response = response.data
			# response.units = [
			# 	{
			# 		"id": 1,
			# 		"unit_name": "Cullen Rowland",
			# 		"building_id": 1,
			# 		"unit_variant_id": 4,
			# 		"facing": 1,
			# 		"views": 5,
			# 		"position": 7,
			# 		"status": 3,
			# 		"floor": 6
			# 	},
			# 	{
			# 		"unit_id": 2,
			# 		"unit_name": "Colby Walters",
			# 		"building_id": 1,
			# 		"unit_variant_id": 5,
			# 		"facing": 2,
			# 		"views": 4,
			# 		"position": 2,
			# 		"status": 2,
			# 		"floor": 7
			# 	},
			# 	{
			# 		"unit_id": 3,
			# 		"unit_name": "Merritt Garner",
			# 		"building_id": 3,
			# 		"unit_variant_id": 4,
			# 		"facing": 1,
			# 		"views": 9,
			# 		"position": 3,
			# 		"status": 1,
			# 		"floor": 7
			# 	},
			# 	{
			# 		"unit_id": 4,
			# 		"unit_name": "Quentin Whitney",
			# 		"building_id": 3,
			# 		"unit_variant_id": 4,
			# 		"facing": 8,
			# 		"views": 3,
			# 		"position": 3,
			# 		"status": 2,
			# 		"floor": 2
			# 	}]
			bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants)
			settings.setSettingsAttributes(response.settings)
			unitCollection.setUnitAttributes(response.units)
			unitTypeCollection.setUnitTypeAttributes(response.unit_types)
			buildingCollection.setBuildingAttributes(response.buildings)
			apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants)
			
		error :(response)->
			console.log "aaaaaaaaaaassdff"

#find the property type with maximum number of units
CommonFloor.propertyMaxUnits = ()->
	Router = []
	Router.push 
		'type'  : 'bunglows'
		'count' :bunglowVariantCollection.getBunglowUnits()
	Router.push 
		'type'  : 'building'
		'count' :apartmentVariantCollection.getApartmentUnits()
	console.log Router
	controller = _.max Router , (item)->
		return parseInt item.count.length

	controller	

	
#function to load the default controller
CommonFloor.checkPropertyType = ()->
	CommonFloor.loadJSONData()
	controller = CommonFloor.propertyMaxUnits()
	if project.get('project_master').front  == ""
		CommonFloor.navigate '#/list-view/'+controller.type , true
	else
		CommonFloor.navigate '#/master-view/'+controller.type , true


#funtion to convert string into integers
window.convertToInt = (response)->
	$.each response ,(index,value)->
		$.map(value,(item)->

			$.each item ,(ind,val)->
				return parseInt val



		)





