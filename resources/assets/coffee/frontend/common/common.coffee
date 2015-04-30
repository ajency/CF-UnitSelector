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
			bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants)
			settings.setSettingsAttributes(response.settings)
			unitCollection.setUnitAttributes(response.units)
			unitTypeCollection.setUnitTypeAttributes(response.unit_types)
			buildingCollection.setBuildingAttributes(response.buildings)
			apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants)
			floorLayoutCollection.setFloorLayoutAttributes(response.floor_layout)
			plotVariantCollection.setPlotVariantAttributes(response.plot_variants)
			
		error :(response)->
			@region =  new Marionette.Region el : '#noFound-template'
			new CommonFloor.ProjectCtrl region : @region
			

#find the property type with maximum number of units
CommonFloor.propertyMaxUnits = ()->
	Router = []
	Router.push 
		'type'  : 'bunglows'
		'count' :bunglowVariantCollection.getBunglowUnits()
	Router.push 
		'type'  : 'building'
		'count' :apartmentVariantCollection.getApartmentUnits()
	Router.push 
		'type'  : 'plot'
		'count' :plotVariantCollection.getPlotUnits()
	
	controller = _.max Router , (item)->
		return parseInt item.count.length

	controller	

	
#function to load the default controller fro master view
CommonFloor.checkPropertyType = ()->
	CommonFloor.loadJSONData()
	if Object.keys(project.get('project_master')).length  ==  0
		CommonFloor.navigate '#/list-view' , true
		CommonFloor.router.storeRoute()
	else
		CommonFloor.navigate '#/master-view' , true
		CommonFloor.router.storeRoute()

#function to load the default controller for list view 
CommonFloor.checkListView = ()->
	controller = CommonFloor.propertyMaxUnits()
	#CommonFloor.navigate '#/list-view/'+controller.type , true


#funtion to convert string into integers
window.convertToInt = (response)->
	$.each response ,(index,value)->
		$.map(value,(item)->

			$.each item ,(ind,val)->
				return parseInt val
	)

#function to convert value into price format
window.numDifferentiation = (val)->
	if (val >= 10000000) 
		val = (val/10000000).toFixed(2) + ' Cr'
	else if (val >= 100000) 
		val = (val/100000).toFixed(2) + ' Lac'
	else if(val >= 1000) 
		val = (val/1000).toFixed(2) + ' K'
	val
	   

#function to convert value into price format		
window.convertRupees = (val)->

	$('#price').autoNumeric('init')
	$('#price').autoNumeric('set', val)

 
#Get all the property type with the count of units
CommonFloor.propertyTypes = ()->
	Router = []
	if bunglowVariantCollection.getBunglowUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'villas'
			'count' :bunglowVariantCollection.getBunglowUnits()
	if buildingCollection.toArray().length != 0
		Router.push 
			'type'  : s.capitalize 'buildings'
			'count' :buildingCollection.toArray()
	if plotVariantCollection.getPlotUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'plots'
			'count' :plotVariantCollection.getPlotUnits()
	controller = _.max Router , (item)->
		return parseInt item.count.length


	Router

CommonFloor.applyVillaClasses = ()->
	$('.villa').each (ind,item)->
		console.log id = parseInt item.id
		unit = unitCollection.findWhere 
			id :  id 
		if ! _.isUndefined unit 
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			$('#'+id).attr('class' ,'layer villa '+availability) 





