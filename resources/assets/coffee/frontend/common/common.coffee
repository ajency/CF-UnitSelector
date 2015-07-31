#No Found Controller and veiw
class CommonFloor.NothingFoundView extends Marionette.ItemView
	
	template : '#noFound-template'

class CommonFloor.NothingFoundCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NothingFoundView

#No Found Controller and veiw
class CommonFloor.NoUnitsView extends Marionette.ItemView
	
	template : '<div>
					<div id="trig" class="toggle-button"></div>
					<div id="view_toggle" class="toggle-view-button map"></div>
					<div class="list-view-container w-map animated fadeIn">
						<div class="text-center" id="searchSorryPageWidget">
							<div class="m-t-10 bldg-list">
								<span class="icon-wondering"></span>
								<div class="m-t-10">Sorry! We havent found any properties matching your search.</div>
								<div>Please retry with different search options.</div>
							</div>
						</div>
					</div>
				</div>'

	ui :
		viewtog 	: '#view_toggle'
		trig 		: '#trig'

	events :
		'click @ui.trig':(e)->
			$('.list-container').toggleClass 'closed'

		'click @ui.viewtog':(e)->
			$('.us-left-content').toggleClass 'not-visible visible'
			$('.us-right-content').toggleClass 'not-visible visible'

class CommonFloor.NoUnitsCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NoUnitsView

#api required to load second step
CommonFloor.loadJSONData = ()->

	$.ajax
		type : 'GET',
		url  : BASERESTURL+'/project/'+	PROJECTID+'/step-two',
		data : 'agent_id='+AGENTID,
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
			plotVariantCollection.setPlotVariantAttributes(response.plot_variants)
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
	temp = []
	$.merge temp ,apartmentVariantCollection.getApartmentUnits()
	$.merge temp ,apartmentVariantCollection.getPenthouseUnits()
	Router.push 
		'type'  : 'building'
		'count' :temp
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
		val = (val/10000000).toFixed(2) 
		decimal  = val.split('.')[1]
		valBudget = decimal % 5
		valBudget = valBudget / 100 
		val = val - valBudget
		val = val.toFixed(2) 
		val = val + ' Cr'
	else if (val >= 100000) 
		val = (val/100000).toFixed(2) 
		decimal  = val.split('.')[1]
		valBudget = decimal % 5
		valBudget = valBudget / 100 
		val = val - valBudget
		val = val.toFixed(2) 
		val = val + ' Lac'
	else if(val >= 1000) 
		val = (val/1000).toFixed(2) 
		decimal  = val.split('.')[1]
		valBudget = decimal % 5
		valBudget = valBudget / 100 
		val = val - valBudget
		val = val.toFixed(2) 
		val = val + ' K'

	val


# function to calclate percentage
window.calculatePerc = (value,total)->
	value = parseInt value
	total = parseInt total

	perc = value/total
	perc = perc * 100
	perc = perc.toFixed(2)
	perc

	   
#function to convert value into price format		
window.convertRupees = (val)->

	$('#price').autoNumeric('init')
	$('#price').autoNumeric('set', val)

 
#Get all the property type with the count of units
CommonFloor.propertyTypes = ()->
	Router = []
	if bunglowVariantCollection.getBunglowUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'villa(s)'
			'count' :bunglowVariantCollection.getBunglowUnits()
			'type_name' : '(V)'
	if apartmentVariantCollection.getApartmentUnits().length != 0 || apartmentVariantCollection.getPenthouseUnits().length != 0
		temp = []
		$.merge temp ,apartmentVariantCollection.getApartmentUnits()
		$.merge temp ,apartmentVariantCollection.getPenthouseUnits()
		Router.push 
			'type'  : s.capitalize 'apartment(s)/Penthouse(s)'
			'count' :temp
			'type_name' : '(A)/(PH)'
	if plotVariantCollection.getPlotUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'plot(s)'
			'count' :plotVariantCollection.getPlotUnits()
			'type_name' : '(P)'
	controller = _.max Router , (item)->
		return parseInt item.count.length


	Router

#Get all the property type with the count of units
CommonFloor.masterPropertyTypes = ()->
	Router = []
	if bunglowVariantCollection.getBunglowMasterUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'villas'
			'count' :bunglowVariantCollection.getBunglowMasterUnits()
			'type_name' : '(V)'
			'name' : 'villa'
	if apartmentVariantCollection.getApartmentMasterUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'apartments'
			'count' :apartmentVariantCollection.getApartmentMasterUnits()
			'type_name' : '(A)'
			'name' : 'apartment'
	if plotVariantCollection.getPlotMasterUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'plots'
			'count' :plotVariantCollection.getPlotMasterUnits()
			'type_name' : '(P)'
			'name' : 'plot'
	controller = _.max Router , (item)->
		return parseInt item.count.length


	Router

# CommonFloor.applyVillaClasses = (classname) ->
# 	$('.villa').each (ind,item)->
# 		id = parseInt item.id
# 		unit = unitCollection.findWhere 
# 			id :  id 
		
# 		if ! _.isUndefined unit 
# 			availability = unit.get('availability')
# 			availability = s.decapitalize(availability)
# 			$('#'+id).attr('class' , 'layer villa '+availability)
			
			


# CommonFloor.applyAptClasses = (classname) ->
# 	$('.apartment').each (ind,item)->
# 		id = parseInt item.id
# 		unit = unitCollection.findWhere 
# 			id :  id 
		
# 		if ! _.isUndefined unit 
# 			availability = unit.get('availability')
# 			availability = s.decapitalize(availability)
# 			$('#'+id).attr('class' , 'layer apartment '+availability)
			
			


CommonFloor.applyAvailabilClasses = (classname)->
	$('.layer').each (ind,item)->
		id = parseInt item.id
		class_name = $('#'+id).attr('class')
		# if classname != ""
		# 	class_name = classname
		unit = unitCollection.findWhere 
			id :  id 
		
		if ! _.isUndefined unit 
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			$('#'+id).attr('class' ,class_name+' '+availability)

	$('.building').each (ind,item)->
		id = parseInt item.id
		class_name = $('#'+id).attr('class')
		unit = unitCollection.where 
			'building_id' :  id 
			'availability' : 'available'
		if unit.length > 0 
			$('#'+id).attr('class' ,class_name+' available')
		else
			$('#'+id).attr('class' ,class_name+' sold')
			
			
CommonFloor.randomClass = ()->
	$('.layer').each (ind,item)->
		id = parseInt item.id
		$('#'+id).attr('style' , 'transform: rotateY(0deg) scale(1); -webkit-transform: rotateY(0deg) scale(1);')
		




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
		params = 'type:'+CommonFloor.defaults['type']+'&unit_variant_id:'+CommonFloor.defaults['unitVariants']+'&unit_type_id:'+CommonFloor.defaults['unitTypes']+
				'&price_min:'+CommonFloor.defaults['price_min']+'&price_max:'+CommonFloor.defaults['price_max']+
				'&availability:'+CommonFloor.defaults['availability']+'&area_min:'+CommonFloor.defaults['area_min']+
				'&area_max:'+CommonFloor.defaults['area_max']+'&building_id:'+CommonFloor.defaults['building']+
				'&floor_min:'+CommonFloor.defaults['floor_min']+'&floor_max:'+CommonFloor.defaults['floor_max']+
				'&flooring:'+CommonFloor.defaults['flooring']
	else

		#url doesnt contain any parameters take the value of the defaults
		params = 'type:'+CommonFloor.defaults['type']+'&unit_variant_id:'+CommonFloor.defaults['unitVariants']+'&unit_type_id:'+CommonFloor.defaults['unitTypes']+
				'&price_min:'+CommonFloor.defaults['price_min']+'&price_max:'+CommonFloor.defaults['price_max']+
				'&availability:'+CommonFloor.defaults['availability']+'&area_min:'+CommonFloor.defaults['area_min']+
				'&area_max:'+CommonFloor.defaults['area_max']+'&building_id:'+CommonFloor.defaults['building']+
				'&floor_min:'+CommonFloor.defaults['floor_min']+'&floor_max:'+CommonFloor.defaults['floor_max']+
				'&flooring:'+CommonFloor.defaults['flooring']


	param_arr = params.split('&')
	$.each param_arr, (index,value)->
			value_arr  =  value.split(':')
			param_key = value_arr[0]
			if param_key == 'type' && value_arr[1] != ""
				CommonFloor.resetCollections()
				collection = CommonFloor.resetProperyType(value_arr[1])	
			if param_key != 'price_min' && param_key != 'price_max' && value_arr[1] != "" && param_key != 'area_min' && param_key != 'area_max' && param_key != 'type' && param_key != 'floor_min' && param_key != 'floor_max' &&  param_key != 'flooring'
				param_val = value_arr[1]
				param_val_arr = param_val.split(',')
				collection = []
				$.each param_val_arr, (index,value)->
						paramkey = {}
						paramkey[param_key] = parseInt(value)
						if param_key == 'availability'
							paramkey[param_key] = value
						$.merge collection, unitCollection.where paramkey
					
				
				unitCollection.reset collection
	if CommonFloor.defaults['price_max'] != ""
		CommonFloor.filterBudget()
	if CommonFloor.defaults['area_max'] != ""
		CommonFloor.filterArea()
	if CommonFloor.defaults['floor_max'] != ""
		CommonFloor.filterFloor()
	if CommonFloor.defaults['flooring'] != ""
		CommonFloor.filterFlooringAttributes()
	CommonFloor.resetCollections()
	CommonFloor.applyFliterClass()
	
	

CommonFloor.resetProperyType = (param)->
	collection = []
	if param == 'villa'
		$.merge collection , bunglowVariantCollection.getBunglowUnits()
	if param == 'apartment'
		$.merge collection , apartmentVariantCollection.getApartmentUnits()
		$.merge collection , apartmentVariantCollection.getPenthouseUnits()
	if param == 'plot'
		$.merge collection , plotVariantCollection.getPlotUnits()
	collection
	

CommonFloor.applyFliterClass = ()->
	actualunits = _.pluck unitMasterCollection.toArray() ,'id'
	filterunits = _.pluck unitCollection.toArray() ,'id'
	notSelecteUnits = _.difference actualunits , filterunits
	actualbuildings = _.pluck buildingMasterCollection.toArray() ,'id'
	filterbuildings = _.pluck buildingCollection.toArray() ,'id'
	notSelectebuildings = _.difference actualbuildings , filterbuildings
	flag = CommonFloor.applyNonFilterClass()
	if flag == 0
		return false
	$('.villa,.plot,.apartment').each (ind,item)->
		id = parseInt item.id
		if $.inArray(id , filterunits) > -1
			setTimeout( ()->
				$('#'+id).attr('style', ' stroke-width: 3px; stroke-dasharray: 320 0;stroke-dashoffset: 0;stroke:#F68121; transform: rotateY(0deg) scale(1); -webkit-transform: rotateY(0deg) scale(1);');
			,Math.random() * 1000)
			
		else
			setTimeout( ()->
				$('#'+id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0;transform: rotateY(0deg) scale(1); -webkit-transform: rotateY(0deg) scale(1);');
			,Math.random() * 1000)
			

	$('.building').each (ind,item)->
		types = []
		if CommonFloor.defaults['type']!= ""
			types = CommonFloor.defaults['type'].split(',')
		id = parseInt item.id
		if $.inArray('villa',types) ==  -1 && $.inArray('plot',types) ==  -1
			if $.inArray(id , filterbuildings) > -1 && filterbuildings.length != 0 && buildingCollection.length isnt 0
				setTimeout( ()->
					$('#'+id).attr('style', ' stroke-width: 3px; stroke-dasharray: 320 0;stroke-dashoffset: 0; stroke:#F68121; transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
				,Math.random() * 1000)
				
			else
				setTimeout( ()->
					$('#'+id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0; transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
				,Math.random() * 1000)
		else
			setTimeout( ()->
					$('#'+id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0; transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
				,Math.random() * 1000)

CommonFloor.applyNonFilterClass = ()->
	flag = 0
	if CommonFloor.defaults['type']  != ""
				flag = 1
	$.each CommonFloor.defaults['apartment'],(index,value)->
		if value  != "" && !(_.isEmpty value)
			flag = 1
	$.each CommonFloor.defaults['plot'],(index,value)->
		if value  != "" && !(_.isEmpty value)
			flag = 1
	$.each CommonFloor.defaults['villa'],(index,value)->
		if value  != "" && !(_.isEmpty value)
			flag = 1
	$.each CommonFloor.defaults['common'],(index,value)->
		if value  != "" 
			flag = 1

	if flag == 0
		$('.villa,.plot,.apartment').each (ind,item)->
			id = parseInt item.id
			$('#'+id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0;transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
			
		$('.building').each (ind,item)->
			id = parseInt item.id
			$('#'+id).attr('style', ' stroke-width: 0px; stroke-dasharray: 320 0;stroke-dashoffset: 0;transform: rotateY(0deg) scale(1);-webkit-transform: rotateY(0deg) scale(1);');
			
	return flag
			


CommonFloor.resetCollections = ()->
	apartments = []
	bunglows   = []
	unitTypes = []
	plots = []
	buildings = []
	unitCollection.each (item)->
		unitType = unitTypeMasterCollection.findWhere
							'id' :  item.get('unit_type_id')
		if item.get('building_id') != 0 
			building = buildingMasterCollection.findWhere
						'id' : item.get('building_id')
			buildings.push building
		property = window.propertyTypes[unitType.get('property_type_id')]
		if s.decapitalize(property) == 'apartments' || s.decapitalize(property) == 'penthouses'
			apartments.push apartmentVariantMasterCollection.get(item.get('unit_variant_id'))
		if s.decapitalize(property) == 'villas/Bungalows'
			bunglows.push bunglowVariantMasterCollection.get(item.get('unit_variant_id'))
		if s.decapitalize(property) == 'plots'
			plots.push plotVariantMasterCollection.get(item.get('unit_variant_id'))
		unitTypes.push unitType
		
	apartmentVariantCollection.reset apartments
	bunglowVariantCollection.reset bunglows
	plotVariantCollection.reset plots
	unitTypeCollection.reset unitTypes
	buildingCollection.reset buildings
	unitCollection.reset unitCollection.toArray()
	

CommonFloor.filterBudget = ()->
	CommonFloor.resetCollections()
	budget = []
	unitCollection.each (item)->
		unitPrice = parseFloat window.unit.getFilterUnitDetails(item.get('id'))[3]
		if unitPrice >= parseFloat(CommonFloor.defaults['common']['price_min']) && unitPrice <= parseFloat(CommonFloor.defaults['common']['price_max'])
			budget.push item

	unitCollection.reset budget

CommonFloor.filterFloor = ()->
	CommonFloor.resetCollections()
	floorArr = []
	unitCollection.each (item)->
		floor = item.get 'floor'
		if floor >= parseInt(CommonFloor.defaults['common']['floor_min']) && floor <= parseInt(CommonFloor.defaults['common']['floor_max'])
			floorArr.push item

	unitCollection.reset floorArr

CommonFloor.filterArea = ()->
	CommonFloor.resetCollections()
	areaArr = []
	unitCollection.each (item)->
		area = item.get('area')
		if area >= parseFloat(CommonFloor.defaults['common']['area_min']) && area <= parseFloat(CommonFloor.defaults['common']['area_max'])
			areaArr.push item

	unitCollection.reset areaArr

CommonFloor.getFilters = ()->
	unitTypes = []
	unitVariants = []
	results = []
	flooring = []
	type = []
	filters = []
	price = []
	area = []
	type= []
	status= []
	floor = []
	main = []
	views = []
	facings = []
	if CommonFloor.defaults['common']['price_max'] != ""
		min_price = window.numDifferentiation CommonFloor.defaults['common']['price_min']
		max_price = window.numDifferentiation CommonFloor.defaults['common']['price_max']
		price.push 
				'name' : min_price+'-'+max_price
				'type'  : '' 
				'id' : 'budget'
				'id_name' : 'filter_budget'
				'classname' : 'budget'

	if CommonFloor.defaults['common']['area_max'] != ""
		area_min = CommonFloor.defaults['common']['area_min']
		area_max = CommonFloor.defaults['common']['area_max']
		area.push 
				'name' : area_min+'-'+area_max
				'type'  : project.get('measurement_units') 
				'id' : 'area'
				'id_name' : 'filter_area'
				'classname' : 'area'

	if CommonFloor.defaults['common']['floor_max'] != ""
		floor_min = CommonFloor.defaults['common']['floor_min']
		floor_max = CommonFloor.defaults['common']['floor_max']
		floor.push 
				'name' : 'Floor ' +floor_min+'-'+floor_max
				'type'  : '' 
				'id' : 'floor'
				'id_name' : 'filter_floor'
				'classname' : 'floor'

	if CommonFloor.defaults['common']['availability'] != ""
		status.push 
			'name' : 'Available'
			'classname' : 'types'
			'id'		: 'available'
			'id_name' : 'filter_available'

	if CommonFloor.defaults['common']['views'] != ""
		$.each CommonFloor.defaults['common']['views'].split(',') , (index,value)->

			views.push 
				'name' : value
				'classname' : 'views'
				'id'		: value
				'id_name' : 'filter_'+value

	if CommonFloor.defaults['common']['facings'] != ""
		$.each CommonFloor.defaults['common']['facings'].split(',') , (index,value)->

			facings.push 
				'name' : value
				'classname' : 'facings'
				'id'		: value
				'id_name' : 'filter_'+value

	if CommonFloor.defaults['type'] != ""
		typeArr = CommonFloor.defaults['type'].split(',')
		$.each typeArr, (index,value)->
			name = s.capitalize(value) 
			name = name+'(s)'
			if value == 'apartment'
				name = 'Apartment(s)/Penthouse(s)'
				filters = CommonFloor.getApartmentFilters()
			if value == 'villa'
				filters = CommonFloor.getVillaFilters()
			if value == 'plot'
				filters = CommonFloor.getPlotFilters()
			$.each filters,(index,value)->
				if value.length == 0 
					filters = _.omit(filters, index)
			if Object.keys(filters).length == 0
				filters = []

			type.push 
				'name' : name
				'classname' : 'types'
				'id'		: value
				'id_name' : 'filter_'+value
				'filters' : filters
				

	main.push 
		'filters' : type
		'area' : area
		'price' : price
		'floor' : floor
		'status' : status
		'views' : views
		'facings' : facings

	
	# $.each main,(index,value)->
	# 	if value.length == 0
	# 		main[index] = []
	main

CommonFloor.getStepFilters = ()->
	unitTypes = []
	unitVariants = []
	results = []
	flooring = []
	type = []
	filters = []
	price = []
	area = []
	type= []
	status= []
	floor = []
	main = []
	views = []
	facings = []
	if CommonFloor.defaults['common']['price_max'] != ""
		min_price = window.numDifferentiation CommonFloor.defaults['common']['price_min']
		max_price = window.numDifferentiation CommonFloor.defaults['common']['price_max']
		price.push 
				'name' : min_price+'-'+max_price
				'type'  : '' 
				'id' : 'budget'
				'id_name' : 'filter_budget'
				'classname' : 'budget'

	if CommonFloor.defaults['common']['area_max'] != ""
		area_min = CommonFloor.defaults['common']['area_min']
		area_max = CommonFloor.defaults['common']['area_max']
		area.push 
				'name' : area_min+'-'+area_max
				'type'  : project.get('measurement_units') 
				'id' : 'area'
				'id_name' : 'filter_area'
				'classname' : 'area'

	if CommonFloor.defaults['common']['floor_max'] != ""
		floor_min = CommonFloor.defaults['common']['floor_min']
		floor_max = CommonFloor.defaults['common']['floor_max']
		floor.push 
				'name' : 'Floor ' +floor_min+'-'+floor_max
				'type'  : '' 
				'id' : 'floor'
				'id_name' : 'filter_floor'
				'classname' : 'floor'

	if CommonFloor.defaults['common']['availability'] != ""
		status.push 
			'name' : 'Available'
			'classname' : 'types'
			'id'		: 'available'
			'id_name' : 'filter_available'

	if CommonFloor.defaults['common']['views'] != ""
		$.each CommonFloor.defaults['common']['views'].split(',') , (index,value)->

			views.push 
				'name' : value
				'classname' : 'views'
				'id'		: value
				'id_name' : 'filter_'+value

	if CommonFloor.defaults['common']['facings'] != ""
		$.each CommonFloor.defaults['common']['facings'].split(',') , (index,value)->

			facings.push 
				'name' : value
				'classname' : 'facings'
				'id'		: value
				'id_name' : 'filter_'+value

	filters = CommonFloor.getApartmentFilters()
			
	if Object.keys(filters).length == 0
		filters = []

	type.push 
		'filters' : filters
				

	main.push 
		'area' : area
		'price' : price
		'floor' : floor
		'status' : status
		'views' : views
		'facings' : facings
		'filters' : type
		


	# $.each main,(index,value)->
	# 	if value.length == 0
	# 		main = _.omit(main, index)
	main



CommonFloor.getFilters111 = ()->
	unitTypes = []
	unitVariants = []
	results = []
	flooring = []
	villaFilters = CommonFloor.getVillaFilters()
	$.merge unitTypes , villaFilters.unitTypes
	$.merge unitVariants , villaFilters.unitVariants
	$.merge flooring , villaFilters.flooring
	# apartmentFilters = CommonFloor.getApartmentFilters()
	# $.merge unitTypes , apartmentFilters.unitTypes
	# $.merge unitVariants , apartmentFilters.unitVariants
	# $.merge flooring , apartmentFilters.flooring
	# plotFilters = CommonFloor.getPlotFilters()
	# $.merge unitTypes , plotFilters.unitTypes
	# $.merge unitVariants , plotFilters.unitVariants
	# $.merge flooring , plotFilters.flooring
	price = []
	area = []
	type= []
	status= []
	floor = []
	# results.push
	# 	'type'	: 'Villa(s)'
	# 	'count' : villaFilters.count
	# results.push
	# 	'type'	: 'Apartment(s)/Penthouse(s)'
	# 	'count' : apartmentFilters.count
	# results.push
	# 	'type'	: 'Plot(s)'
	# 	'count' : plotFilters.count
	# if CommonFloor.defaults['price_max'] != ""
	# 	min_price = window.numDifferentiation CommonFloor.defaults['price_min']
	# 	max_price = window.numDifferentiation CommonFloor.defaults['price_max']
	# 	price.push 
	# 			'name' : min_price+'-'+max_price
	# 			'type'  : '' 
	# 			'id' : 'budget'
	# 			'id_name' : 'filter_budget'
	# 			'classname' : 'budget'
	# if CommonFloor.defaults['area_max'] != ""
	# 	area_min = CommonFloor.defaults['area_min']
	# 	area_max = CommonFloor.defaults['area_max']
	# 	area.push 
	# 			'name' : area_min+'-'+area_max
	# 			'type'  : project.get('measurement_units') 
	# 			'id' : 'area'
	# 			'id_name' : 'filter_area'
	# 			'classname' : 'area'

	# if CommonFloor.defaults['floor_max'] != ""
	# 	floor_min = CommonFloor.defaults['floor_min']
	# 	floor_max = CommonFloor.defaults['floor_max']
	# 	floor.push 
	# 			'name' : 'Floor ' +floor_min+'-'+floor_max
	# 			'type'  : '' 
	# 			'id' : 'floor'
	# 			'id_name' : 'filter_floor'
	# 			'classname' : 'floor'

	if CommonFloor.defaults['type'] != ""
		typeArr = CommonFloor.defaults['type'].split(',')
		$.each typeArr, (index,value)->
			name = s.capitalize(value) 
			name = name+'(s)'
			if value == 'apartement'
				name = 'Apartment(s)/Penthouse(s)'
			type.push 
				'name' : name
				'classname' : 'types'
				'id'		: value
				'id_name' : 'filter_'+value
	
	# if CommonFloor.defaults['availability'] != ""
	# 	status.push 
	# 		'name' : 'Available'
	# 		'classname' : 'types'
	# 		'id'		: 'available'
	# 		'id_name' : 'filter_available'
	filters = {'type' : type
				,'unitTypes' : unitTypes
				,'unitVariants' : unitVariants
				,'price' : price
				,'area' : area
				,'status' : status
				,'floor': floor
				,'flooring' : flooring
				}
	$.each filters,(index,value)->
		if value.length == 0
			filters = _.omit(filters, index)
	$.each results,(index,value)->
		if value.count == 0
			results = _.omit(results, index)
	[filters,results]	
			
CommonFloor.getVillaFilters = ()->
	unitVariants = []
	unit_variant = ''
	unitTypes = []
	unit_type = ''
	status = []
	flooring = []
	$.each CommonFloor.defaults['villa'],(ind,val)->
		if val != "" && ind != 'attributes'
			param_val_arr = val.split(',')
			$.each param_val_arr, (index,value)->
				if value != "" && ind == 'unit_variant_id'
					if ! _.isUndefined bunglowVariantMasterCollection.get(parseInt(value))
						unit_variant = bunglowVariantMasterCollection.findWhere
									'id' : parseInt value
						unitVariants.push 
									'typename':'villa'
									'name'	: unit_variant.get 'unit_variant_name'
									'type'	: '(V)'
									'classname' : 'variant_names'
									'id' : unit_variant.get 'id'
									'id_name' : 'filter_varinat_name'+unit_variant.get 'id'
									'index'  : ''
				if value != "" && ind == 'unit_type_id' && $.inArray(parseInt(value),bunglowVariantMasterCollection.getVillaUnitTypes()) > -1
					unit_type = unitTypeMasterCollection.findWhere
									'id' : parseInt value

					unitTypes.push 
								'typename':'villa'
								'name' : unit_type.get 'name'
								'type'	: '(V)'
								'classname' : 'unit_types'
								'id' : unit_type.get 'id'
								'id_name' : 'filter_unit_type'+unit_type.get 'id'
								'index'  : ''
		else if val != "" && ind == 'attributes'
			$.each val ,(ind1,val1)->
				temp_var = val1.split(',')
				$.each temp_var , (indexkey,valkey)->

					if $.isNumeric(valkey)
						temp = parseInt valkey
					else
						temp = valkey
					if valkey != ""  && $.inArray(temp,bunglowVariantMasterCollection.getVillaAttributes()) > -1
						flooring.push 
								'typename':'villa'
								'name' : valkey
								'type'	: '(V)'
								'classname' : 'filter_flooring'
								'id' : valkey
								'id_name' : 'filter_'+valkey
								'index'  : ind1

	
	filters = {'unitVariants' : unitVariants,'unitTypes': unitTypes
			,'flooring' : flooring}
	
	filters

CommonFloor.getApartmentFilters = ()->
	unitVariants = []
	unit_variant = ''
	unitTypes = []
	unit_type = ''
	status = []
	flooring = []
	$.each CommonFloor.defaults['apartment'],(ind,val)->
		if val != "" && ind != 'attributes'
			param_val_arr = val.split(',')
			$.each param_val_arr, (index,value)->
				if value != "" && ind == 'unit_variant_id'
					if !_.isUndefined apartmentVariantMasterCollection.get(parseInt(value))
						unit_variant = apartmentVariantMasterCollection.findWhere
									'id' : parseInt value
						unitTypeModel = unitTypeMasterCollection.findWhere
									'id' : parseInt unit_variant.get('unit_type_id')
						type = 'A'
						if window.propertyTypes[unitTypeModel.get('property_type_id')] == 'Penthouses'
								type = 'PH'
						unitVariants.push 
									'typename':'apartment'
									'name'	: unit_variant.get 'unit_variant_name'
									'type'	: '('+type+')'
									'classname' : 'variant_names'
									'id' : unit_variant.get 'id'
									'id_name' : 'filter_varinat_name'+unit_variant.get 'id'
									'index'  : ''
				if value != "" && ind == 'unit_type_id' && $.inArray(parseInt(value),apartmentVariantMasterCollection.getApartmentUnitTypes()) > -1
					unit_type = unitTypeMasterCollection.findWhere
									'id' : parseInt value
					type = 'A'
					if window.propertyTypes[unit_type.get('property_type_id')] == 'Penthouses'
								type = 'PH'
					unitTypes.push 
								'typename':'apartment'
								'name' : unit_type.get 'name'
								'type'	: '('+type+')'
								'classname' : 'unit_types'
								'id' : unit_type.get 'id'
								'id_name' : 'filter_unit_type'+unit_type.get 'id'
								'index'  : ''

		else if val != "" && ind == 'attributes'
			$.each val ,(ind1,val1)->
					temp_var = val1.split(',')
					$.each temp_var , (indexkey,valkey)->

						if $.isNumeric(valkey)
							temp = parseInt valkey
						else
							temp = valkey
						attributes = apartmentVariantMasterCollection.getApartmentAttributes()
						if valkey != "" && $.inArray(temp,attributes[0]) > -1
							flooring.push 
									'typename':'apartment'
									'name' : valkey
									'type'	: '(A)'
									'classname' : 'filter_flooring'
									'id' : valkey
									'id_name' : 'filter_'+valkey
									'index'  : ind1
			
				
		
	filters = {'unitVariants' : unitVariants,'unitTypes': unitTypes 
				,'flooring' :flooring}
	# $.each filters,(index,value)->
	# 	if value.length == 0
	# 		filters = _.omit(filters, index) 
	filters

CommonFloor.getPlotFilters = ()->
	unitVariants = []
	unit_variant = ''
	unitTypes = []
	unit_type = ''
	status = []
	flooring = []
	$.each CommonFloor.defaults['plot'],(ind,val)->
		if val != "" && ind != 'attributes'
			param_val_arr = val.split(',')
			$.each param_val_arr, (index,value)->
				if value != "" && ind == 'unit_variant_id'
					if !_.isUndefined plotVariantMasterCollection.get(parseInt(value))
						unit_variant = plotVariantMasterCollection.findWhere
									'id' : parseInt value
						unitVariants.push 
									'typename':'plot'
									'name'	: unit_variant.get 'unit_variant_name'
									'type'	: '(P)'
									'classname' : 'variant_names'
									'id' : unit_variant.get 'id'
									'id_name' : 'filter_varinat_name'+unit_variant.get 'id'
									'index'  : ''
				if value != "" && ind == 'unit_type_id' && $.inArray(parseInt(value),plotVariantMasterCollection.getPlotUnitTypes()) > -1
					unit_type = unitTypeMasterCollection.findWhere
									'id' : parseInt value

					unitTypes.push 
								'typename':'plot'
								'name' : unit_type.get 'name'
								'type'	: '(P)'
								'classname' : 'unit_types'
								'id' : unit_type.get 'id'
								'id_name' : 'filter_unit_type'+unit_type.get 'id'
								'index'  : ''


		else if val != "" && ind == 'attributes'
			$.each val ,(ind1,val1)->
					temp_var = val1.split(',')
					$.each temp_var , (indexkey,valkey)->

						if $.isNumeric(valkey)
							temp = parseInt valkey
						else
							temp = valkey
						if valkey != ""  && $.inArray(temp,plotVariantMasterCollection.getPlotAttributes()) > -1
							flooring.push 
									'typename':'plot'
									'name' : valkey
									'type'	: '(P)'
									'classname' : 'filter_flooring'
									'id' : valkey
									'id_name' : 'filter_'+valkey
									'index'  : ind1

		
				

		
	filters = {'unitVariants' : unitVariants,'unitTypes': unitTypes 
				,'flooring':flooring}
	filters

CommonFloor.getStatus = ()->
	status = []
	status_arr = []
	unitMasterCollection.each (item)->

		if ($.inArray item.get('availability') , status_arr) ==  -1
				status_arr.push item.get 'availability'
				status.push 
					'id': item.get 'availability'
					'name': s.humanize item.get 'availability'
	status

CommonFloor.getStatusFilters = ()->
	status = []
	response = CommonFloor.getStatus()
	statusColl = new Backbone.Collection response
	statusIds = statusColl.pluck 'id'
	$.each CommonFloor.defaults,(ind,val)->
		if ind == 'availability' && val != ""
			param_val_arr = val.split(',')
			$.each param_val_arr, (index,value)->
				if value != "" && ind == 'availability' && $.inArray(value,statusIds) > -1
					status.push s.humanize value

	{'status' : status}


CommonFloor.filterBuilding = (id)->
	collection = unitCollection.where
					'building_id' : id
	unitCollection.reset collection
	CommonFloor.resetCollections()
	unitTempCollection.reset unitCollection.toArray()
	window.building_id = id


CommonFloor.getUnitsProperty = (unitModel)->	
	unitType = unitTypeMasterCollection.findWhere
							'id' :  unitModel.get('unit_type_id')
	property = window.propertyTypes[unitType.get('property_type_id')]
	text = ''
	type = ''
	window.tempColl = unitCollection.clone()
	if s.decapitalize(property) == 'apartments' 
		temp = []
		$.each apartmentVariantCollection.getApartmentUnits() , (index,value)->
			if value.get('availability') is 'available'
				temp.push value
		window.tempColl.reset temp
		text =  'Similar '+s.decapitalize(property)+' based on your filters'
		type = 'apartment'
	if s.decapitalize(property) == 'penthouses'
		temp = []
		$.each apartmentVariantCollection.getPenthouseUnits() , (index,value)->
			if value.get('availability') is 'available'
				temp.push value
		window.tempColl.reset temp
		text =  'Similar '+s.decapitalize(property)+' based on your filters'
		type = s.decapitalize(property)
	if s.decapitalize(property) == 'villas/Bungalows'
		temp = []
		$.each bunglowVariantCollection.getBunglowUnits() , (index,value)->
			if value.get('availability') is 'available'
				temp.push value
		window.tempColl.reset temp
		text =  'Similar '+s.decapitalize(property)+' based on your filters'
		type = 'villa'
	if s.decapitalize(property) == 'plots'
		temp = []
		$.each plotVariantCollection.getPlotUnits() , (index,value)->
			if value.get('availability') is 'available'
				temp.push value
		window.tempColl.reset temp
		text =  'Similar '+s.decapitalize(property)+' based on your filters'
		type = s.decapitalize(property)

	[window.tempColl,text,type]


#get apartments which are in the view
CommonFloor.getApartmentsInView = ()->
	units = []
	newUnits = []
	$('.apartment').each (index,value)->
		id  = parseInt value.id
		units.push value.id
	newUnits  = $.map units, (item)->
		return parseInt item
	newUnits


CommonFloor.applyOnViewClass = ()->
	viewUnits = CommonFloor.getApartmentsInView()
	classview = ''
	units = unitCollection.toArray()
	$.each units,(index,value)->
		id  = parseInt value.id
		if $.inArray(id, viewUnits) == -1
			$('#apartment'+id).addClass 'onview'
			$('#apartment'+id).hide()
		else
			$('#apartment'+id).removeClass 'onview'
			$('#apartment'+id).show()
	$('#inview').bootstrapToggle('on')

CommonFloor.filterFlooringAttributes= ()->
	flooring = []
	unitCollection.each ( item)->
		unitDetails = window.unit.getUnitDetails(item.get('id'))
		unitVarinat = unitDetails[0]
		attributes = unitVarinat.get('variant_attributes').flooring
		arr = CommonFloor.defaults['flooring'].split(',')
		if $.inArray(attributes, arr ) > -1
			flooring.push item

	unitCollection.reset flooring

#new filter function applied
CommonFloor.filterNew = ()->
	collection = []
	temp = []
	params = CommonFloor.defaults['type'].split(',')
	if CommonFloor.defaults['type'] == ""
		$.merge collection , unitCollection.toArray()
	$.each params , (ind,val)->
		if val is 'villa'
			unitCollection.reset unitMasterCollection.toArray()
			temp = CommonFloor.filterVillas()
		if val is 'apartment'
			unitCollection.reset unitMasterCollection.toArray()
			temp = CommonFloor.filterApartments()
		if val is 'plot'
			unitCollection.reset unitMasterCollection.toArray()
			temp = CommonFloor.filterPlots()
		$.merge collection , temp
	unitCollection.reset collection
	if CommonFloor.defaults['common']['price_max'] != ""
		CommonFloor.filterBudget()
	if CommonFloor.defaults['common']['area_max'] != ""
		CommonFloor.filterArea()
	if CommonFloor.defaults['common']['floor_max'] != ""
		CommonFloor.filterFloor()
	if CommonFloor.defaults['common']['views'] != ""
		CommonFloor.filterViews()
	if CommonFloor.defaults['common']['facings'] != ""
		CommonFloor.filterFacings()
	if CommonFloor.defaults['common']['availability'] != ""
		paramkey = {}
		paramkey['availability'] = 'available'
		temp = unitCollection.where paramkey
		unitCollection.reset temp
	CommonFloor.applyFliterClass()
	CommonFloor.resetCollections()

CommonFloor.filterStepNew = ()->
	collection = []
	temp = []
	
	temp = CommonFloor.filterApartments()
	$.merge collection , temp
	unitCollection.reset collection
	if CommonFloor.defaults['common']['price_max'] != ""
		CommonFloor.filterBudget()
	if CommonFloor.defaults['common']['area_max'] != ""
		CommonFloor.filterArea()
	if CommonFloor.defaults['common']['floor_max'] != ""
		CommonFloor.filterFloor()
	if CommonFloor.defaults['common']['views'] != ""
		CommonFloor.filterViews()
	if CommonFloor.defaults['common']['facings'] != ""
		CommonFloor.filterFacings()
	if CommonFloor.defaults['common']['availability'] != ""
		paramkey = {}
		paramkey['availability'] = 'available'
		temp = unitCollection.where paramkey
		unitCollection.reset temp
	CommonFloor.applyFliterClass()
	CommonFloor.resetCollections()





CommonFloor.filterVillas = ()->
	collection = []
	collection = CommonFloor.resetProperyType('villa')
	newColl = new Backbone.Collection collection	
	tempColl = []	
	$.each CommonFloor.defaults['villa'] , (index,value)->
		temp = []
	
		if value != "" && index == 'attributes' && ! _.isEmpty value
			attributes = bunglowVariantCollection.getBunglowUnits()
			if temp.length == 0
				temp = bunglowVariantCollection.getBunglowUnits()
			$.each CommonFloor.defaults['villa']['attributes'] , (ind1,val1)->
				if val1!= ""
					attributes = CommonFloor.filterVillaAttributes(ind1,val1)
			# $.merge temp, attributes
			# unitCollection.reset attributes

			newColl.reset attributes
		if value != "" && index != 'attributes'
			param_val  = value.split(',')
			$.each param_val,(key,key_val)->
				paramkey = {}
				paramkey[index] = parseInt(key_val)
				tempColl = unitCollection.where paramkey
				if tempColl.length is 0
					temp = []
				else
					$.merge temp, unitCollection.where paramkey
			unitCollection.reset temp
			newColl.reset temp
	newColl.toArray()	


CommonFloor.filterVillaAttributes = (ind1,val1)->
	flooring = []
	
	tempColl = bunglowVariantCollection.getBunglowUnits()
	newtempColl = _.intersection(tempColl,unitCollection.toArray())
	$.each newtempColl, (item , value)->
		unitDetails = window.unit.getUnitDetails(value.get('id'))
		unitVarinat = unitDetails[0]
		valkey = unitVarinat.get('variant_attributes')
		val = _.propertyOf(valkey)(ind1)
		arr = val1.split(',')
		if _.isUndefined val
			return
		if _.isArray(val)  
				$.each val , (ind1,val1)->
					if _.isString(val1)
						temp = val1
					else
						temp =  val1.toString()
					if $.inArray(temp, arr ) > -1
						flooring.push value
		else
			if _.isString(val)
				temp = val
			else
				temp =  val.toString()
			if $.inArray(temp, arr ) > -1
				flooring.push value
		unitCollection.reset flooring
	
	tem = 	unitCollection.toArray()			
	tem
	

CommonFloor.filterApartments = ()->
	collection = []
	collection = CommonFloor.resetProperyType('apartment')
	
	newColl = new Backbone.Collection collection	
	tempColl = []	
	$.each CommonFloor.defaults['apartment'] , (index,value)->
		temp = []
		if value != "" && index == 'attributes' && ! _.isEmpty value
			attributes = []
			$.merge attributes ,  apartmentVariantCollection.getApartmentUnits()
			$.merge attributes ,  apartmentVariantCollection.getPenthouseUnits()
			if temp.length == 0
				temp = apartmentVariantCollection.getApartmentUnits()
			$.each CommonFloor.defaults['apartment']['attributes'] , (ind1,val1)->
				if val1!= ""
					attributes = CommonFloor.filterApartmentAttributes(ind1,val1)
			# $.merge temp, attributes
			# unitCollection.reset attributes

			newColl.reset attributes
		
		if value != "" && index != 'attributes'
			param_val  = value.split(',')
			$.each param_val,(key,key_val)->
				paramkey = {}
				paramkey[index] = parseInt(key_val)
				tempColl = unitCollection.where paramkey
				if tempColl.length is 0
					temp = []
				else
					$.merge temp, unitCollection.where paramkey
				
			unitCollection.reset temp
			newColl.reset temp
	newColl.toArray()


CommonFloor.filterApartmentAttributes= (ind1,val1)->
	flooring = []
	tempColl = []
	$.merge tempColl ,  apartmentVariantCollection.getApartmentUnits()
	$.merge tempColl ,  apartmentVariantCollection.getPenthouseUnits()
	newtempColl = _.intersection(tempColl,unitCollection.toArray())
	$.each newtempColl, (item , value)->
		unitDetails = window.unit.getUnitDetails(value.get('id'))
		unitVarinat = unitDetails[0]
		valkey = unitVarinat.get('variant_attributes')
		val = _.propertyOf(valkey)(ind1)
		arr = val1.split(',')
		if _.isUndefined val
			return
		if _.isArray(val)  
				$.each val , (ind1,val1)->
					if _.isString(val1)
						temp = val1
					else
						temp =  val1.toString()
					if $.inArray(temp, arr ) > -1
						flooring.push value
		else
			if _.isString(val)
				temp = val
			else
				temp =  val.toString()
			if $.inArray(temp, arr ) > -1
				flooring.push value
		unitCollection.reset flooring
	
				
	tem = 	unitCollection.toArray()			
	tem

CommonFloor.filterPlots = ()->
	collection = []
	collection = CommonFloor.resetProperyType('plot')
	newColl = new Backbone.Collection collection	
	tempColl = []	
	$.each CommonFloor.defaults['plot'] , (index,value)->
		temp = []
		if value != "" && index == 'attributes' && ! _.isEmpty value
			attributes = plotVariantCollection.getPlotUnits()
			if temp.length == 0
				temp = plotVariantCollection.getPlotUnits()
			$.each CommonFloor.defaults['plot']['attributes'] , (ind1,val1)->
				if val1!= ""
					attributes = CommonFloor.filterPlotAttributes(ind1,val1)
			# $.merge temp, attributes
			# unitCollection.reset attributes

			newColl.reset attributes
		
		if value != "" && index != 'attributes'
			param_val  = value.split(',')
			$.each param_val,(key,key_val)->
				paramkey = {}
				paramkey[index] = parseInt(key_val)
				tempColl = unitCollection.where paramkey
				if tempColl.length is 0
					temp = []
				else
					$.merge temp, unitCollection.where paramkey
				
			unitCollection.reset temp
			newColl.reset temp
	newColl.toArray()

CommonFloor.filterPlotAttributes= (ind1,val1)->
	flooring = []
	tempColl = plotVariantCollection.getPlotUnits()
	newtempColl = _.intersection(tempColl,unitCollection.toArray())
	$.each newtempColl, (item , value)->
		unitDetails = window.unit.getUnitDetails(value.get('id'))
		unitVarinat = unitDetails[0]
		valkey = unitVarinat.get('variant_attributes')
		val = _.propertyOf(valkey)(ind1)
		arr = val1.split(',')
		if _.isUndefined val
			return
		if _.isArray(val)  
				$.each val , (ind1,val1)->
					if _.isString(val1)
						temp = val1
					else
						temp =  val1.toString()
					if $.inArray(temp, arr ) > -1
						flooring.push value
		else
			if _.isString(val)
				temp = val
			else
				temp =  val.toString()
			if $.inArray(temp, arr ) > -1
				flooring.push value
		unitCollection.reset flooring
	
				
	tem = 	unitCollection.toArray()			
	tem


CommonFloor.removeStepFilters = ()->
	
	$.each CommonFloor.defaults['apartment'] , (index,value)->
		if value != ""
			step_types = CommonFloor.defaults['step_three'][index].split(',')
			types = step_types.map (item)->
				return parseInt item
			value_Arr = value.split(',')
			new_types = value_Arr.map (item)->
				return parseInt item
			actualTypes = _.difference new_types , types
			CommonFloor.defaults['apartment'][index] = actualTypes.join(',')
			CommonFloor.defaults['step_three'][index] = ""

	$.each CommonFloor.defaults['common'],(index,value)->
		CommonFloor.defaults['common'][index] = ""

	unitCollection.reset unitMasterCollection.toArray()
	CommonFloor.resetCollections()
	CommonFloor.filterNew()


$(window).bind('hashchange', ()->


	CommonFloor.defaults['type'] = ""
	$.each CommonFloor.defaults['villa'],(index,value)->
		CommonFloor.defaults['villa'][index] = ""
	$.each CommonFloor.defaults['plot'],(index,value)->
		CommonFloor.defaults['plot'][index] = ""
	$.each CommonFloor.defaults['apartment'],(index,value)->
		CommonFloor.defaults['apartment'][index] = ""
	$.each CommonFloor.defaults['common'],(index,value)->
		CommonFloor.defaults['common'][index] = ""
	unitCollection.reset unitMasterCollection.toArray()
	CommonFloor.resetCollections()
	CommonFloor.filterNew()
	clearTimeout(window.renderLoopInterval)
)

CommonFloor.filterViews = ()->
	CommonFloor.resetCollections()
	temp = []
	unitCollection.each (item)->
		views = item.get('views')
		$.each views , (ind,val)->
			if $.inArray(val,CommonFloor.defaults['common']['views'].split(',')) > -1 && val != ""
				temp.push item

	unitCollection.reset temp


CommonFloor.filterFacings = ()->
	CommonFloor.resetCollections()
	temp = []
	unitCollection.each (item)->
		facings = item.get('direction')
		if $.inArray(facings,CommonFloor.defaults['common']['facings'].split(',')) > -1  && facings != ""
				temp.push item

	unitCollection.reset temp






