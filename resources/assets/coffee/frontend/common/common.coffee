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
			unitTypeCollection.setUnitTypeAttributes(response.unit_types)
			buildingCollection.setBuildingAttributes(response.buildings)
			apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants)
			floorLayoutCollection.setFloorLayoutAttributes(response.floor_layout)
			window.propertyTypes = response.property_types
			unitCollection.setUnitAttributes(response.units)
			
			
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
	console.log Router
	controller = _.max Router , (item)->
		return parseInt item.count.length

	controller	

	
#function to load the default controller fro master view
CommonFloor.checkPropertyType = ()->
	CommonFloor.loadJSONData()
	if project.get('project_master').front  == ""
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
	controller = _.max Router , (item)->
		return parseInt item.count.length


	Router


CommonFloor.filter = ()->
	#check whether url contains any parameters
	if  window.location.href.indexOf('=') > -1
		params = params
		paramsArray = params.split('&')
		#loop through all the parameters
		for element,index in paramsArray
			param_key = element.split('=')
			CommonFloor.defaults[param_key[0]] = param_key[1]


		#set the params with the filters selected by the user
		params = 'unit_variant_id:'+CommonFloor.defaults['unitVariants']+'&unit_type_id:'+CommonFloor.defaults['unitTypes']+
				'&price_min:'+CommonFloor.defaults['price_min']+'price_max:'+CommonFloor.defaults['price_max']+
				'&availability:'+CommonFloor.defaults['availability']
	else

		#url doesnt contain any parameters take the value of the defaults
		params = 'unit_variant_id:'+CommonFloor.defaults['unitVariants']+'&unit_type_id:'+CommonFloor.defaults['unitTypes']+
				'&price_min:'+CommonFloor.defaults['price_min']+'price_max:'+CommonFloor.defaults['price_max']+
				'&availability:'+CommonFloor.defaults['availability']

	param_arr = params.split('&')
	$.each param_arr, (index,value)->
			value_arr  =  value.split(':')
			param_key = value_arr[0]
			if param_key != 'price_min' && param_key != 'price_max'
				param_val = value_arr[1]
				param_val_arr = param_val.split(',')
				collection = []
				$.each param_val_arr, (index,value)->
						paramkey = {}
						paramkey[param_key] = parseInt(value)
						# if _.isString(value)
						# 	paramkey[param_key] = value
						if param_key == 'availability'
							paramkey[param_key] = value
						console.log paramkey
						$.merge collection, unitTempCollection.where paramkey
						
				
				unitTempCollection.reset collection
	CommonFloor.filterBudget()
   
	CommonFloor.resetCollections()

CommonFloor.resetCollections = ()->
	apartments = []
	bunglows   = []
	unitTypes = []
	unitTempCollection.each (item)->
		unitType = unitTypeCollection.findWhere
							'id' :  item.get('unit_type_id')

		property = window.propertyTypes[unitType.get('property_type_id')]
		if s.decapitalize(property) == 'apartments'
			apartments.push apartmentVariantCollection.get(item.get('unit_variant_id'))
		if s.decapitalize(property) == 'villas/Bungalows'
			bunglows.push bunglowVariantCollection.get(item.get('unit_variant_id'))
		unitTypes.push unitType
	apartmentVariantTempCollection.reset apartments
	bunglowVariantTempCollection.reset bunglows
	unitTypeTempCollection.reset unitTypes

CommonFloor.filterBudget = ()->
	budget = []
	unitTempCollection.each (item)->
        console.log unitPrice = window.unit.getUnitDetails(item.get('id'))[3]
        if unitPrice > parseInt(CommonFloor.defaults['price_min']) && unitPrice < parseInt(CommonFloor.defaults['price_max'])
            budget.push item
    unitTempCollection.reset budget

		


