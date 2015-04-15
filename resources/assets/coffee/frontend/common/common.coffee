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
			#setting all the collections 
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
		'count' :CommonFloor.getBunglowUnits()
	console.log Router
	controller = _.max Router , (item)->
		return parseInt item.count.length

	controller	

	
#function to load the default controller
CommonFloor.checkPropertyType = ()->
	CommonFloor.loadJSONData()
	controller = CommonFloor.propertyMaxUnits()
	CommonFloor.navigate '#/master-view/'+controller.type , true

#get all the units of all the bunglow variants
CommonFloor.getBunglowUnits = ()->
	units = []
	newUnits = []
	bunglowVariantCollection.each (model)->
		bunglowUnits = unitCollection.where
			unit_variant_id : model.get('id')
		units.push  bunglowUnits
	$.each units,(index,value)->
		newUnits = $.merge(newUnits , value)

	newUnits

#funtion to convert string into integers
window.convertToInt = (response)->
	$.each response ,(index,value)->
		$.map(value,(item)->

			$.each item ,(ind,val)->
				return parseInt val



		)





