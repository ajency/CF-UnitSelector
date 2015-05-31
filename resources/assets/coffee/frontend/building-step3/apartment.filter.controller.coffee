window.unitTypes = []
window.unitVariants = []
window.variantNames = []
window.flooring = []
window.price = ''
window.area = ''
window.type  = []
class CommonFloor.FilterApartmentView extends Marionette.ItemView

	template : Handlebars.compile('<div class="fliters-container closed" id="collapsefilters">
										<a href="javascript:void(0)"  class="text-primary filters-clear clear">Clear Filters </a>
										<button class="btn btn-primary filter-button" type="button">
											<span class="icon-place"></span>											
										</button>
										<div class="filters-wrapper">
										  	<div class="filters-content">
											  	
												<div class="unit_type_filter">
				                                    <h6>UNIT TYPE</h6>
				                                    <div class="filter-chkbox-block">
					                                    {{#unitTypes}}
					                                      <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > 
					                                      <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> 
					                                    {{/unitTypes}} 
				                                    </div>
				                                </div>
				                                <div class="variant_filter">
				                                    <h6>VARIANT</h6>
				                                    <div class="filter-chkbox-block">
					                                       	{{#unitVariantNames}}
					                                       	<input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > 
					                                        <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> 
					                                       	{{/unitVariantNames}}
				                                       	<!--<a href="#" class="hide-div">+ Show More</a>-->
				                                    </div>
				                                </div>
				                                 <div class="flooring_filter">
				                                    <h6 class="">Flooring</h6>
				                                       <div class="filter-chkbox-block">
					                                       	{{#flooring}}
					                                       	<input type="checkbox" class="custom-chckbx addCft flooring" id="flooring{{id}}" value="flooring{{id}}" value="1" data-value="{{id}}" > 
					                                        <label for="flooring{{id}}" class="-lbl">{{name}}({{type}})</label> 
					                                       	{{/flooring}}
				                                       	<!--<a href="#" class="hide-div">+ Show More</a>-->
				                                    </div>
				                                </div>
				                                <div class="">
				                                    <h6>AREA ({{measurement_units}})</h6>
				                                    <div class="range-container">
				                                		<input type="text" id="area" name="area" value="" />
				                                	</div>
				                                </div>
				                                <div class="">
				                                    <h6>BUDGET </h6>
				                                    <div class="range-container">
				                                    	<input type="text" id="budget" name="budget" value="" />
				                                    </div>
				                                </div>
				                                <div class="">
				                                    <h6>FLOOR </h6>
				                                    <div class="range-container">
				                                    	<input type="text" id="floor" name="floor" value="" />
				                                    </div>
				                                </div>
				                                <div class="">
				                                  	<h6 class="availability">AVAILABILITY</h6>
				                                    <div class="filter-chkbox-block">
				                                      	<input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> 
				                                       	<label for="available" class="-lbl">Show Available Units Only</label> 
				                                    </div>
				                                </div>
				                            </div>  
				                        </div>
											
									</div>')


	


	ui:
		unitTypes : '.unit_types'
		priceMin : '.price_min'
		priceMax : '.price_max'
		status : '.status'
		apply : '.apply'
		variantNames : '.variant_names'
		area : '#area'
		budget : '#budget'
		clear : '.clear'
		floor : '#floor'
		flooring : '.flooring'

	initialize:->
		@price = ''
		@area = ''
		@floor = ''
		variantNames = []
		unitTypes = []
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		@building_id = building_id
		if CommonFloor.defaults['apartment']['unit_type_id']!= ""
			unitTypes = CommonFloor.defaults['apartment']['unit_type_id'].split(',')
		if CommonFloor.defaults['apartment']['unit_variant_id']!= ""
			variantNames = CommonFloor.defaults['apartment']['unit_variant_id'].split(',')
		if CommonFloor.defaults['type']!= ""
			window.type  = CommonFloor.defaults['type'].split(',')
		# if CommonFloor.defaults['flooring']!= ""
		# 	window.flooring  = CommonFloor.defaults['flooring'].split(',')
		window.unitTypes = unitTypes.map (item)->
			return parseInt item
		window.variantNames = variantNames.map (item)->
			return parseInt item

	events:
		'click @ui.clear':(e)->
			window.unitTypes = []
			window.unitVariants = []
			window.variantNames = []
			window.price = ''
			window.area = ''
			window.type  = []
			# arr = CommonFloor.defaults['type'].split(',')
			# index = arr.indexOf 'apartment'
			# arr.splice(index, 1)
			# CommonFloor.defaults['type'] = arr.join(',')
			$.each CommonFloor.defaults['apartment'],(index,value)->
				CommonFloor.defaults['apartment'][index] = ""
			$.each CommonFloor.defaults['common'],(index,value)->
				CommonFloor.defaults['common'][index] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 
			@loadSelectedFilters()
			@price = $("#budget").data("ionRangeSlider")
			@area = $("#area").data("ionRangeSlider")
			@floor = $("#floor").data("ionRangeSlider")
			@price.destroy()
			@area.destroy()
			@floor.destroy()
			@loadClearFilters()

		'click @ui.unitTypes':(e)->
			if $(e.currentTarget).is(':checked')
				window.unitTypes.push parseInt $(e.currentTarget).attr('data-value')
			else
				window.unitTypes = _.without window.unitTypes ,parseInt $(e.currentTarget).attr('data-value')
			CommonFloor.defaults['type'] = 'apartment'
			CommonFloor.defaults['apartment']['unit_type_id'] = window.unitTypes.join(',')
			CommonFloor.defaults['step_three']['unit_type_id'] = window.unitTypes.join(',') 
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 
			# @resetFilters()
			
		'click @ui.variantNames':(e)->
			if $(e.currentTarget).is(':checked')
				window.variantNames.push parseInt $(e.currentTarget).attr('data-value')
			else
				window.variantNames = _.without window.variantNames ,parseInt $(e.currentTarget).attr('data-value')
			CommonFloor.defaults['type'] = 'apartment'
			CommonFloor.defaults['apartment']['unit_variant_id'] = window.variantNames.join(',')
			CommonFloor.defaults['step_three']['unit_variant_id'] = window.variantNames.join(',') 
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()	
			unitTempCollection.trigger( "filter_available") 

		'change @ui.priceMin':(e)->
			if $(e.currentTarget).val() != ""
				CommonFloor.defaults['common']['price_min'] = $(e.currentTarget).val()
			else
				CommonFloor.defaults['common']['price_min'] = 0
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 
			

		'change @ui.priceMax':(e)->
			if $(e.currentTarget).val() != ""
				CommonFloor.defaults['common']['price_max'] = $(e.currentTarget).val()
			else
				CommonFloor.defaults['common']['price_max'] = 999999900
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 
			# @resetFilters()
			

		'click @ui.status':(e)->
			CommonFloor.defaults['common']['availability'] = e.currentTarget.id
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 
			# @resetFilters()


		'change @ui.area':(e)->
			CommonFloor.defaults['common']['area_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['common']['area_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 

		'change @ui.budget':(e)->
			CommonFloor.defaults['common']['price_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['common']['price_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 

		'change @ui.floor':(e)->
			CommonFloor.defaults['common']['floor_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['common']['floor_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 



		'click @ui.flooring':(e)->
			if $(e.currentTarget).is(':checked')
				window.flooring.push $(e.currentTarget).attr('data-value')
			else
				window.flooring = _.without window.flooring ,$(e.currentTarget).attr('data-value')
			window.flooring =   _.uniq window.flooring 
			CommonFloor.defaults['type'] = 'apartment'
			CommonFloor.defaults['apartment']['attributes'] = window.flooring.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterNew()
			unitTempCollection.trigger( "filter_available") 
			
		'click .filter-button':(e)->
			window.flag1 = 0
			$('.fliters-container').toggleClass 'closed'
			if $('.fliters-container').hasClass( "closed")
				window.flag1 = 1


			
	
	

	# #function to check the filters dependency
	# onAptFilters:(data)->
	# 	min = _.min data[0].unitVariants
	# 	max = _.max data[0].unitVariants
	# 	priceMin = _.min data[0].budget
	# 	priceMax = _.max data[0].budget
	# 	window.area.destroy()
	# 	window.price.destroy()
	# 	$("#area").ionRangeSlider(
	# 	    type: "double",
	# 	    min: min,
	# 	    max: max,
	# 	    grid: false
	# 	)
	# 	$("#budget").ionRangeSlider(
	# 	    type: "double",
	# 	    min: priceMin,
	# 	    max: priceMax,
	# 	    grid: false
	# 	    prettify :(num)->
	# 	    	return window.numDifferentiation(num)

	# 	)
	# 	unitVariantColl = _.pluck apartmentVariantCollection.toArray() , 'id'
	# 	unitVariantArray = unitVariantColl.map (item)->
	# 		return parseInt item
	# 	unittypesColl = _.pluck unitTypeCollection.toArray() , 'id'
	# 	unittypesArray = unittypesColl.map (item)->
	# 		return parseInt item
	# 	$(@ui.unitTypes).each (ind,item)->
	# 		$('#'+item.id).attr('checked',false)
	# 		$('#'+item.id).attr('disabled',false)
	# 		if $.inArray(parseInt($(item).attr('data-value')),unittypesArray) is -1
	# 			$('#'+item.id).prop('checked',false)
	# 			$('#'+item.id).attr('disabled',true)
	# 	$(@ui.variantNames).each (ind,item)->
	# 		$('#'+item.id).attr('checked',false)
	# 		$('#'+item.id).attr('disabled',false)
	# 		if $.inArray(parseInt($(item).attr('data-value')),unitVariantArray) is -1
	# 			$('#'+item.id).prop('checked',false)
	# 			$('#'+item.id).attr('disabled',true)


	

	serializeData:->
		data = super()
		data.unitTypes = Marionette.getOption(@,'unitTypes')
		data.unitVariants = Marionette.getOption(@,'unitVariants')
		data.unitVariantNames = Marionette.getOption(@,'unitVariantNames')
		data.flooring = Marionette.getOption(@,'flooring')
		data

	onShow:->
		# CommonFloor.removeStepFilters
		@loadSelectedFilters()

		$('.filters-content').mCustomScrollbar
			theme: 'inset'
		budget = []
		area = []
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		floor = buildingMasterCollection.findWhere
					'id' : building_id
		units = unitMasterCollection.where
					'building_id' : @building_id
		$.each units, (index,value)->
			unitDetails = window.unit.getUnitDetails(value.get('id'))
			budget.push parseFloat unitDetails[3]
			area.push parseFloat unitDetails[0].get 'super_built_up_area'
		min = _.min area
		max = _.max area
		subArea = (max - min)/ 20 
		subArea = subArea.toFixed(0)
		priceMin = _.min budget
		priceMax = _.max budget		
		subBudget = (priceMax - priceMin)/ 20
		subBudget = subBudget.toFixed(0)

		$("#area").ionRangeSlider(
		    type: "double",
		    min: min,
		    max:  max,
		    step : subArea,
		    grid: false
		)
		$("#budget").ionRangeSlider(
		    type: "double",
		    min: priceMin,
		    max: priceMax,
		    grid: false,
		    step : subBudget,
		    prettify :(num)->
		    	return window.numDifferentiation(num)

		)
		$("#floor").ionRangeSlider(
		    type: "double",
		    min: 1,
		    max: floor.get('no_of_floors'),
		    grid: false
		    

		)
		if Marionette.getOption(@,'flooring').length == 0
			$('.flooring_filter').hide()
		if Marionette.getOption(@,'unitTypes').length == 0
			$('.unit_type_filter').hide()
		if Marionette.getOption(@,'unitVariantNames').length == 0
			$('.variant_filter').hide()

	loadClearFilters:->
		budget = []
		area = []
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		floor = buildingMasterCollection.findWhere
					'id' : building_id
		$.each unitMasterCollection.toArray(), (index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
			area.push parseFloat unitDetails[0].get 'super_built_up_area'
		min = _.min area
		max = _.max area
		subArea = (max - min)/ 20 
		subArea = subArea.toFixed(0)
		priceMin = _.min budget
		priceMax = _.max budget		
		subBudget = (priceMax - priceMin)/ 20
		subBudget = subBudget.toFixed(0)

		$('#area').val(min+";"+max)
		$('#budget').val(priceMin+";"+priceMax)
		$('#floor').val(1+";"+floor.get('no_of_floors'))
		$("#area").ionRangeSlider(
		    type: "double",
		    min: min,
		    max:  max,
		    step : subArea,
		    grid: false
		)
		$("#budget").ionRangeSlider(
		    type: "double",
		    min: priceMin,
		    max: priceMax,
		    grid: false,
		    step : subBudget,
		    prettify :(num)->
		    	return window.numDifferentiation(num)

		)
		$("#floor").ionRangeSlider(
		    type: "double",
		    min: 1,
		    max: floor.get('no_of_floors'),
		    grid: false
		    

		)
		

	loadSelectedFilters:->
		unittypesArray = []
		unitTypes = CommonFloor.defaults['apartment']['unit_type_id'].split(',')
		unitVariantsArray = []
		unitVariants = CommonFloor.defaults['apartment']['unit_variant_id'].split(',')
		typesArray = []
		types = CommonFloor.defaults['type'].split(',')
		
		id = []
		unitsArr = []
		unittypesColl = []
		$.merge unitsArr, apartmentVariantMasterCollection.getApartmentMasterUnits()
			
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			id.push parseInt unitDetails[0].get 'id'
			unittypesColl.push parseInt unitDetails[1].get 'id'
		
			
		
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).attr('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($(item).attr('data-value'),unitTypes) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unittypesColl) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			$('#'+item.id).attr('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($(item).attr('data-value'),unitVariants) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),id) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		
		
		# window.price = $("#budget").data("ionRangeSlider")
		# window.area = $("#area").data("ionRangeSlider")
		# window.floor = $("#floor").data("ionRangeSlider")
		# window.area.update(
		#    from : min
		#    to  : max
		# )
		# window.price.update(
		#    from : priceMin
		#    to  : priceMax
		# )
		# window.floor.update(
		#    from : 1
		#    to  : floor.get('no_of_floors')
		# )
		# min = _.min CommonFloor.defaults['area_min']
		# max = _.max CommonFloor.defaults['area_max']
		# subArea = (max - min)/ 20 
		# subArea = subArea.toFixed(0)
		# priceMin = _.min CommonFloor.defaults['price_min']
		# priceMax = _.max CommonFloor.defaults['price_max']		
		# subBudget = (priceMax - priceMin)/ 20
		# subBudget = subBudget.toFixed(0)
		# if CommonFloor.defaults['area_min'] != "" && CommonFloor.defaults['area_min'] != ""
		# 	window.area.update(
		# 	   from : min
		# 	   to  : max
		# )
		# if CommonFloor.defaults['price_min'] != "" && CommonFloor.defaults['price_max'] != ""
		# 	window.price.update(
		# 	   from : priceMin
		# 	   to  : priceMax
		# )
		# if CommonFloor.defaults['floor_min'] != "" && CommonFloor.defaults['floor_max'] != ""
		# 	window.floor.update(
		# 	   from : parseInt CommonFloor.defaults['floor_min']
		# 	   to  : parseInt CommonFloor.defaults['floor_max']
		# )
		# res = CommonFloor.getFilters()[0]
		# if Object.keys(res).length == 0
		# 	window.flag1 = 1

		@ui.status.prop('checked',false)
		if CommonFloor.defaults['common']['availability'] != "" 
			 @ui.status.prop('checked',true)

		if window.flag1 == 0
			$('.fliters-container').removeClass 'closed'
		else
			$('.fliters-container').addClass 'closed'
		
	


class CommonFloor.FilterApartmentCtrl extends Marionette.RegionController

	initialize:->
		unitTypes = []
		unitVariants = []
		unitVariantNames = []
		area = []
		budget = []
		flooring = []
		apartmentFilters = @getApartmentFilters()
		if apartmentFilters.length != 0
			$.merge unitTypes , apartmentFilters[0].unitTypes
			$.merge unitVariants , apartmentFilters[0].unitVariants
			$.merge unitVariantNames , apartmentFilters[0].unitVariantNames
			$.merge budget , apartmentFilters[0].budget
			$.merge flooring , apartmentFilters[0].flooring
		@view = view = new CommonFloor.FilterApartmentView
				model : project
				'unitTypes' : unitTypes
				'unitVariants' : _.uniq unitVariants
				'unitVariantNames' : unitVariantNames
				'budget'			: budget
				'flooring'  : flooring

		@listenTo @view,"load:apt:filters" ,@loadAptFilter

		@show @view

	loadAptFilter:->
		aptFilters = @getApartmentFilters()
		@view.triggerMethod "apt:filters", aptFilters

	

	#function to generate all the apartment filters
	getApartmentFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
		budget = []
		newtemp = []
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		apartmentVariantMasterCollection.each (item)->
			units = unitMasterCollection.where 
						'unit_variant_id' : item.get('id')
			
			if units.length != 0
				unitTypeModel = unitTypeMasterCollection.findWhere
									'id' : item.get 'unit_type_id'
				type = 'A'
				if window.propertyTypes[unitTypeModel.get('property_type_id')] == 'Penthouse'
						type = 'PH'
				if $.inArray(item.get('unit_type_id'),unit_types) == -1
					unit_types.push parseInt unitTypeModel.get 'id'
					unitTypes.push 
							'id' : unitTypeModel.get 'id'
							'name' : unitTypeModel.get 'name'
							'type'	: type
				unitVariants.push item.get 'super_built_up_area'
				unitVariantNames.push
						'id' : item.get 'id'
						'name'	: item.get 'unit_variant_name'
						'type'	: type

				$.each project.get('filters').Apartment , (index,value)->
					temp = []
					$.each item.get('variant_attributes') ,(ind,val)->
						if ind == value && $.inArray(value,flooring) is -1
							flooring.push value
							temp.push
								'id' : val
								'name' : val
								'classname' : 'attributes'
								'label' : ind
								type: 'P'
							newtemp.push 
								'label' : ind.toUpperCase()
								'value' : temp
				
				

		unitsArr = apartmentVariantMasterCollection.getApartmentUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
		filters.push
			'unitTypes' 	: unitTypes
			'unitVariants'  : unitVariants
			'unitVariantNames' : unitVariantNames
			'budget'			: budget
			'flooring'		: newtemp

		$.each filters[0],(index,value)->
			if $.inArray(index , project.get('filters').Villa) ==  -1 && index != 'budget' && index != 'unitVariants'
				filters[0][index] = []
		filters


	
								
