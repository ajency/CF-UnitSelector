#No Found Controller and veiw
class CommonFloor.NothingFoundView extends Marionette.ItemView
	
	template : '#noFound-template'

class CommonFloor.NothingFoundCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NothingFoundView

#No Found Controller and veiw
class CommonFloor.NoUnitsView extends Marionette.ItemView
	
	template : '<div>
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

class CommonFloor.NoUnitsCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NoUnitsView

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
			'type'  : s.capitalize 'villa(s)'
			'count' :bunglowVariantCollection.getBunglowUnits()
			'type_name' : '(V)'
	if buildingCollection.toArray().length != 0
		Router.push 
			'type'  : s.capitalize 'building(s)'
			'count' :buildingCollection.toArray()
			'type_name' : '(A)'
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
	if apartmentVariantCollection.getApartmentMasterUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'apartments'
			'count' :apartmentVariantCollection.getApartmentMasterUnits()
			'type_name' : '(A)'
	if plotVariantCollection.getPlotMasterUnits().length != 0
		Router.push 
			'type'  : s.capitalize 'plots'
			'count' :plotVariantCollection.getPlotMasterUnits()
			'type_name' : '(P)'
	controller = _.max Router , (item)->
		return parseInt item.count.length


	Router

CommonFloor.applyVillaClasses = (classname) ->
	$('.villa').each (ind,item)->
		id = parseInt item.id
		# class_name = $('#'+id).attr('class')
		# if classname != undefined
		# 	class_name = classname
		unit = unitCollection.findWhere 
			id :  id 
		# $('#'+id).attr('class' ,class_name)
		if ! _.isUndefined unit 
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			$('#'+id).attr('class' , 'layer villa unit_fadein '+availability)


CommonFloor.applyPlotClasses = (classname)->
	$('.plot').each (ind,item)->
		id = parseInt item.id
		# class_name = $('#'+id).attr('class')
		# if classname != ""
		# 	class_name = classname
		unit = unitCollection.findWhere 
			id :  id 
		# $('#'+id).attr('class' ,class_name)
		if ! _.isUndefined unit 
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			$('#'+id).attr('class' ,'layer plot unit_fadein '+availability)  





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
				'&floor_min:'+CommonFloor.defaults['floor_min']+'&floor_max:'+CommonFloor.defaults['floor_max']
	else

		#url doesnt contain any parameters take the value of the defaults
		params = 'type:'+CommonFloor.defaults['type']+'&unit_variant_id:'+CommonFloor.defaults['unitVariants']+'&unit_type_id:'+CommonFloor.defaults['unitTypes']+
				'&price_min:'+CommonFloor.defaults['price_min']+'&price_max:'+CommonFloor.defaults['price_max']+
				'&availability:'+CommonFloor.defaults['availability']+'&area_min:'+CommonFloor.defaults['area_min']+
				'&area_max:'+CommonFloor.defaults['area_max']+'&building_id:'+CommonFloor.defaults['building']+
				'&floor_min:'+CommonFloor.defaults['floor_min']+'&floor_max:'+CommonFloor.defaults['floor_max']


	param_arr = params.split('&')
	$.each param_arr, (index,value)->
			value_arr  =  value.split(':')
			param_key = value_arr[0]
			if param_key == 'type' && value_arr[1] != ""
				CommonFloor.resetCollections()
				collection = CommonFloor.resetProperyType(value_arr[1])	
			if param_key != 'price_min' && param_key != 'price_max' && value_arr[1] != "" && param_key != 'area_min' && param_key != 'area_max' && param_key != 'type' && param_key != 'floor_min' && param_key != 'floor_max'
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
	CommonFloor.applyFliterClass()
	CommonFloor.resetCollections()

CommonFloor.resetProperyType = (param)->
	param_val_arr = param.split(',')
	collection = []
	$.each param_val_arr, (index,value)->
		if value == 'Villas'
			$.merge collection , bunglowVariantCollection.getBunglowUnits()
		if value == 'Apartments/Penthouse'
			$.merge collection , apartmentVariantCollection.getApartmentUnits()
		if value == 'Plots'
			$.merge collection , plotVariantCollection.getPlotUnits()
	unitCollection.reset collection


CommonFloor.applyFliterClass = ()->
	CommonFloor.applyPlotClasses()
	CommonFloor.applyVillaClasses()
	actualunits = _.pluck unitMasterCollection.toArray() ,'id'
	filterunits = _.pluck unitCollection.toArray() ,'id'
	notSelecteUnits = _.difference actualunits , filterunits
	$('.villa').each (ind,item)->
		id = parseInt item.id
		if $.inArray(id , notSelecteUnits) > -1
			$('#'+id).attr('class' ,'layer villa unit_fadein not_in_selection')

	$('.plot').each (ind,item)->
		id = parseInt item.id
		if $.inArray(id , notSelecteUnits) > -1
			$('#'+id).attr('class' ,'layer plot unit_fadein not_in_selection')

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
		if s.decapitalize(property) == 'apartments' || s.decapitalize(property) == 'penthouse'
			apartments.push apartmentVariantMasterCollection.get(item.get('unit_variant_id'))
		if s.decapitalize(property) == 'villas/Bungalows'
			bunglows.push bunglowVariantMasterCollection.get(item.get('unit_variant_id'))
		if s.decapitalize(property) == 'plot'
			plots.push plotVariantMasterCollection.get(item.get('unit_variant_id'))
		unitTypes.push unitType
		
	apartmentVariantCollection.reset apartments
	bunglowVariantCollection.reset bunglows
	plotVariantCollection.reset plots
	unitTypeCollection.reset unitTypes
	buildingCollection.reset buildings
	unitTempCollection.reset unitCollection.toArray()
	

CommonFloor.filterBudget = ()->
	CommonFloor.resetCollections()
	budget = []
	unitCollection.each (item)->
		unitPrice = parseFloat window.unit.getFilterUnitDetails(item.get('id'))[3]
		if unitPrice >= parseFloat(CommonFloor.defaults['price_min']) && unitPrice <= parseFloat(CommonFloor.defaults['price_max'])
			budget.push item

	unitCollection.reset budget

CommonFloor.filterFloor = ()->
	CommonFloor.resetCollections()
	floorArr = []
	unitCollection.each (item)->
		floor = item.get 'floor'
		if floor >= parseInt(CommonFloor.defaults['floor_min']) && floor <= parseInt(CommonFloor.defaults['floor_max'])
			floorArr.push item

	unitCollection.reset floorArr

CommonFloor.filterArea = ()->
	CommonFloor.resetCollections()
	areaArr = []
	unitCollection.each (item)->
		area = item.get('area')
		if area >= parseFloat(CommonFloor.defaults['area_min']) && area <= parseFloat(CommonFloor.defaults['area_max'])
			areaArr.push item

	unitCollection.reset areaArr

CommonFloor.getFilters = ()->
	unitTypes = []
	unitVariants = []
	results = []
	villaFilters = CommonFloor.getVillaFilters()
	$.merge unitTypes , villaFilters.unitTypes
	$.merge unitVariants , villaFilters.unitVariants
	apartmentFilters = CommonFloor.getApartmentFilters()
	$.merge unitTypes , apartmentFilters.unitTypes
	$.merge unitVariants , apartmentFilters.unitVariants
	plotFilters = CommonFloor.getPlotFilters()
	$.merge unitTypes , plotFilters.unitTypes
	$.merge unitVariants , plotFilters.unitVariants
	price = []
	area = []
	type= []
	status= []
	floor = []
	results.push
		'type'	: 'Villa(s)'
		'count' : villaFilters.count
	results.push
		'type'	: 'Apartment(s)/Penthouse(s)'
		'count' : apartmentFilters.count
	results.push
		'type'	: 'Plot(s)'
		'count' : plotFilters.count
	if CommonFloor.defaults['price_max'] != ""
		min_price = window.numDifferentiation CommonFloor.defaults['price_min']
		max_price = window.numDifferentiation CommonFloor.defaults['price_max']
		price.push 
				'name' : min_price+'-'+max_price
				'type'  : '' 
				'id' : 'budget'
				'id_name' : 'filter_budget'
				'classname' : 'budget'
	if CommonFloor.defaults['area_max'] != ""
		area_min = CommonFloor.defaults['area_min']
		area_max = CommonFloor.defaults['area_max']
		area.push 
				'name' : area_min+'-'+area_max
				'type'  : 'Sq.Ft' 
				'id' : 'area'
				'id_name' : 'filter_area'
				'classname' : 'area'

	if CommonFloor.defaults['floor_max'] != ""
		floor_min = CommonFloor.defaults['floor_min']
		floor_max = CommonFloor.defaults['floor_max']
		floor.push 
				'name' : 'Floor ' +floor_min+'-'+floor_max
				'type'  : '' 
				'id' : 'floor'
				'id_name' : 'filter_floor'
				'classname' : 'floor'

	if CommonFloor.defaults['type'] != ""
		typeArr = CommonFloor.defaults['type'].split(',')
		$.each typeArr, (index,value)->
			type.push 
				'name' : value
				'classname' : 'types'
				'id'		: value
				'id_name' : 'filter_'+value
	if CommonFloor.defaults['availability'] != ""
		status.push 
			'name' : 'Available'
			'classname' : 'types'
			'id'		: 'available'
			'id_name' : 'filter_available'
	filters = {'unitTypes' : unitTypes
				,'unitVariants' : unitVariants
				,'price' : price
				,'area' : area
				'type' : type
				'status' : status,
				'floor': floor}
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
	$.each CommonFloor.defaults,(ind,val)->
		if ind != 'price_min' && ind != 'price_max' && val != "" && ind != 'area_min' && ind != 'area_max' && ind != 'type' && ind != 'floor_min' && ind != 'floor_max'
			param_val_arr = val.split(',')
			$.each param_val_arr, (index,value)->
				if value != "" && ind == 'unitVariants'
					if ! _.isUndefined bunglowVariantMasterCollection.get(parseInt(value))
						unit_variant = bunglowVariantMasterCollection.findWhere
									'id' : parseInt value
						unitVariants.push 
									'name'	: unit_variant.get 'unit_variant_name'
									'type'	: '(V)'
									'classname' : 'variant_names'
									'id' : unit_variant.get 'id'
									'id_name' : 'filter_varinat_name'+unit_variant.get 'id'
				if value != "" && ind == 'unitTypes' && $.inArray(parseInt(value),bunglowVariantMasterCollection.getVillaUnitTypes()) > -1
					unit_type = unitTypeMasterCollection.findWhere
									'id' : parseInt value

					unitTypes.push 
								'name' : unit_type.get 'name'
								'type'	: '(V)'
								'classname' : 'unit_types'
								'id' : unit_type.get 'id'
								'id_name' : 'filter_unit_type'+unit_type.get 'id'

	
	filters = {'unitVariants' : unitVariants,'unitTypes': unitTypes
			,'count': bunglowVariantMasterCollection.getBunglowUnits().length}
	# $.each filters,(index,value)->
	# 	if value.length == 0
	# 		filters = _.omit(filters, index) 
	filters

CommonFloor.getApartmentFilters = ()->
	unitVariants = []
	unit_variant = ''
	unitTypes = []
	unit_type = ''
	status = []
	$.each CommonFloor.defaults,(ind,val)->
		if ind != 'price_min' && ind != 'price_max' && val != "" && ind != 'area_min' && ind != 'area_max' && ind != 'type' && ind != 'floor_min' && ind != 'floor_max'
			param_val_arr = val.split(',')
			$.each param_val_arr, (index,value)->
				if value != "" && ind == 'unitVariants'
					if !_.isUndefined apartmentVariantMasterCollection.get(parseInt(value))
						unit_variant = apartmentVariantMasterCollection.findWhere
									'id' : parseInt value
						unitTypeModel = unitTypeMasterCollection.findWhere
									'id' : parseInt unit_variant.get('id')
						type = 'A'
						if window.propertyTypes[unitTypeModel.get('property_type_id')] == 'Penthouse'
								type = 'PH'
						unitVariants.push 
									'name'	: unit_variant.get 'unit_variant_name'
									'type'	: '('+type+')'
									'classname' : 'variant_names'
									'id' : unit_variant.get 'id'
									'id_name' : 'filter_varinat_name'+unit_variant.get 'id'
				if value != "" && ind == 'unitTypes' && $.inArray(parseInt(value),apartmentVariantMasterCollection.getApartmentUnitTypes()) > -1
					unit_type = unitTypeMasterCollection.findWhere
									'id' : parseInt value
					type = 'A'
					if window.propertyTypes[unit_type.get('property_type_id')] == 'Penthouse'
								type = 'PH'
					unitTypes.push 
								'name' : unit_type.get 'name'
								'type'	: '('+type+')'
								'classname' : 'unit_types'
								'id' : unit_type.get 'id'
								'id_name' : 'filter_unit_type'+unit_type.get 'id'
		
	filters = {'unitVariants' : unitVariants,'unitTypes': unitTypes 
				,'count': apartmentVariantMasterCollection.getApartmentUnits().length}
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
	$.each CommonFloor.defaults,(ind,val)->
		if ind != 'price_min' && ind != 'price_max' && val != "" && ind != 'area_min' && ind != 'area_max' && ind != 'type' && ind != 'floor_min' && ind != 'floor_max'
			param_val_arr = val.split(',')
			$.each param_val_arr, (index,value)->
				if value != "" && ind == 'unitVariants'
					if !_.isUndefined plotVariantMasterCollection.get(parseInt(value))
						unit_variant = plotVariantMasterCollection.findWhere
									'id' : parseInt value
						unitVariants.push 
									'name'	: unit_variant.get 'unit_variant_name'
									'type'	: '(P)'
									'classname' : 'variant_names'
									'id' : unit_variant.get 'id'
									'id_name' : 'filter_varinat_name'+unit_variant.get 'id'
				if value != "" && ind == 'unitTypes' && $.inArray(parseInt(value),plotVariantMasterCollection.getPlotUnitTypes()) > -1
					unit_type = unitTypeMasterCollection.findWhere
									'id' : parseInt value

					unitTypes.push 
								'name' : unit_type.get 'name'
								'type'	: '(P)'
								'classname' : 'unit_types'
								'id' : unit_type.get 'id'
								'id_name' : 'filter_unit_type'+unit_type.get 'id'
		
	filters = {'unitVariants' : unitVariants,'unitTypes': unitTypes 
				,'count': plotVariantMasterCollection.getPlotUnits().length}
	# $.each filters,(index,value)->
	# 	if value.length == 0
	# 		filters = _.omit(filters, index) 
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