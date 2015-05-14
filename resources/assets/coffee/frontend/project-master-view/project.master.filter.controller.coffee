window.unitTypes = []
window.unitVariants = []
window.variantNames = []
window.price = ''
window.area = ''
window.type  = []
class CommonFloor.FilterMsterView extends Marionette.ItemView

	template : Handlebars.compile('
									<div class="collapse" id="collapsefilters">
										<div class="container-fluid"">

											<div class="filters-wrapper">
											  	<div class="row">
												  	<div class="col-sm-4 col-md-4 property_type ">
					                                    <h5># PROPERTY TYPE</h5>
					                                    <div class="filter-chkbox-block">
					                                      	{{#types}}
					                                        <input type="checkbox" class="custom-chckbx addCft types" id="{{id}}" value="{{type}}">
					                                        <label for="{{id}}" class="-lbl">{{type}}{{type_name}}</label> 
					                                		{{/types}}
					                                    </div>	  
		                                 			</div>
													<div class="col-sm-4 col-md-4 ">
					                                    <h5># UNIT TYPE</h5>
					                                    <div class="filter-chkbox-block">
						                                    {{#unitTypes}}
						                                      <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} > 
						                                      <label for="unit_type{{id}}" class="-lbl">{{name}}({{type}})</label> 
						                                    {{/unitTypes}} 
					                                    </div>
					                                </div>
					                                <div class="col-sm-4 col-md-4 ">
					                                    <h5># VARIANT</h5>
					                                       <div class="filter-chkbox-block">
						                                       	{{#unitVariantNames}}
						                                       	<input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} > 
						                                        <label for="varinat_name{{id}}" class="-lbl">{{name}}({{type}})</label> 
						                                       	{{/unitVariantNames}}
					                                       	<!--<a href="#" class="hide-div">+ Show More</a>-->
					                                    </div>
					                                </div>
					                            </div>
					                        </div>

											<div class="filters-wrapper">
					                            <div class="row">
					                                <div class="col-sm-4 col-md-4 ">
					                                    <h5># AREA (Sqft)</h5>
					                                	<div class="range-container">
					                                		<input type="text" id="area" name="area" value="" />
					                                	</div>
					                                </div>
					                                <div class="col-sm-4 col-md-4 ">
					                                    <h5># BUDGET </h5>
					                                    <div class="range-container">
					                                    	<input type="text" id="budget" name="budget" value="" />
					                                    </div>
					                                </div>
					                                <div class="col-sm-4 col-md-4 ">
					                                  	<h5># AVAILABILITY</h5>
					                                    <div class="alert ">
					                                      	<input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> 
					                                       	<label for="available" class="-lbl">Show Available Units Only</label> 
					                                    </div>
					                                </div>
					                            </div>  
					                        </div>

					                        <div class="filters-bottom clearfix">
					                        	<a href="javascript:void(0)"  class="text-primary pull-left m-b-10"><span class="icon-cross clear"></span> Clear Filters </a>
					                        	<a href="javascript:void(0)" data-toggle="collapse" data-target="#collapsefilters" class="text-primary pull-right m-b-10"><span class="icon-chevron-up"></span> Close </a>
					                        </div>
											
										</div>
									</div>
									')


	

	ui:
		unitTypes : '.unit_types'
		priceMin : '.price_min'
		priceMax : '.price_max'
		status : '.status'
		apply : '.apply'
		variantNames : '.variant_names'
		area : '#area'
		budget : '#budget'
		types : '.types'
		clear : '.clear'

	events:
		'click @ui.clear':(e)->
			window.unitTypes = []
			window.unitVariants = []
			window.variantNames = []
			window.price = ''
			window.area = ''
			window.type  = []
			$.each CommonFloor.defaults,(index,value)->
				CommonFloor.defaults[index] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@loadSelectedFilters()

		'click @ui.types':(e)->
			window.unitTypes = []
			window.unitVariants = []
			window.variantNames = []
			$.each CommonFloor.defaults,(index,value)->
				if index != 'type'
						CommonFloor.defaults[index] = ""
			if $(e.currentTarget).is(':checked')
				window.type.push $(e.target).val()
			else
				window.type = _.without window.type ,$(e.target).val()
			CommonFloor.defaults['type'] = window.type.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			if e.target.id == 'Villas'
				@villaFilters() 
			if e.target.id == 'Apartments'
				@apartmentFilters()
			if e.target.id == 'Plots'
				@plotFilters()
			
			
		'click @ui.unitTypes':(e)->
			if $(e.currentTarget).is(':checked')
				window.unitTypes.push parseInt $(e.currentTarget).attr('data-value')
			else
				window.unitTypes = _.without window.unitTypes ,parseInt $(e.currentTarget).attr('data-value')
			window.unitTypes =   _.uniq window.unitTypes 
			CommonFloor.defaults['unitTypes'] = window.unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			# @resetFilters()
			
		'click @ui.variantNames':(e)->
			if $(e.currentTarget).is(':checked')
				window.variantNames.push parseInt $(e.currentTarget).attr('data-value')
			else
				window.variantNames = _.without window.variantNames ,parseInt $(e.currentTarget).attr('data-value')
			window.variantNames =   _.uniq window.variantNames 
			CommonFloor.defaults['unitVariants'] = window.variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()	
			unitCollection.trigger('available')

		'click @ui.status':(e)->
			if $(e.currentTarget).is(':checked')
				CommonFloor.defaults['availability'] = e.currentTarget.id
			else
				CommonFloor.defaults['availability'] = ""
				
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			# @resetFilters()


		'change @ui.area':(e)->
			CommonFloor.defaults['area_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['area_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')

		'change @ui.budget':(e)->
			console.log $(e.target).val()
			CommonFloor.defaults['price_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['price_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			


			
	
	#function to check the filters dependency
	villaFilters:()->
		budget = []
		area = []
		id = []
		unitsArr = []
		unittypesColl = _.pluck unitTypeCollection.toArray() , 'id'
		unittypesArray = unittypesColl.map (item)->
			return parseInt item
		$.merge unitsArr, plotVariantCollection.getPlotUnits()
		$.merge unitsArr, apartmentVariantCollection.getApartmentUnits()
		$.merge unitsArr, bunglowVariantCollection.getBunglowUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
			area.push parseFloat unitDetails[0].get 'super_built_up_area'
			id.push parseInt unitDetails[0].get 'id'
		# priceMin = _.min budget
		# priceMax = _.max budget
		# areaArray = area.map (item)->
		# 	return parseFloat item

		# min = _.min areaArray
		# max = _.max areaArray
		
		# window.area.update(
		#    from : min
		#    to  : max
		# )
		# window.price.update(
		#    from : priceMin
		#    to  : priceMax
		# )
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).attr('disabled',false)
			$('#'+item.id).attr('checked',false)
			if $.inArray(parseInt($(item).attr('data-value')),unittypesArray) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			$('#'+item.id).attr('checked',false)
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),id) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)

	#function to check the filters dependency
	apartmentFilters:()->
		budget = []
		area = []
		id = []
		unitsArr = []
		unittypesColl = _.pluck unitTypeCollection.toArray() , 'id'
		unittypesArray = unittypesColl.map (item)->
			return parseInt item
		$.merge unitsArr, plotVariantCollection.getPlotUnits()
		$.merge unitsArr, apartmentVariantCollection.getApartmentUnits()
		$.merge unitsArr, bunglowVariantCollection.getBunglowUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
			area.push parseFloat unitDetails[0].get 'super_built_up_area'
			id.push parseInt unitDetails[0].get 'id'
		# priceMin = _.min budget
		# priceMax = _.max budget
		# areaArray = area.map (item)->
		# 	return parseFloat item

		# min = _.min areaArray
		# max = _.max areaArray
		# window.area.update(
		#    from : min
		#    to  : max
		# )
		# window.price.update(
		#    from : priceMin
		#    to  : priceMax
		# )
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).attr('checked',false)
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unittypesArray) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			$('#'+item.id).attr('checked',false)
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),id) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)


	plotFilters:()->
		budget = []
		area = []
		id = []
		unitsArr = []
		unittypesColl = _.pluck unitTypeCollection.toArray() , 'id'
		unittypesArray = unittypesColl.map (item)->
			return parseInt item

		$.merge unitsArr, plotVariantCollection.getPlotUnits()
		$.merge unitsArr, apartmentVariantCollection.getApartmentUnits()
		$.merge unitsArr, bunglowVariantCollection.getBunglowUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
			area.push parseFloat unitDetails[0].get 'super_built_up_area'
			id.push parseInt unitDetails[0].get 'id'
		# priceMin = _.min budget
		# priceMax = _.max budget
		# areaArray = area.map (item)->
		# 	return parseFloat item

		# min = _.min areaArray
		# max = _.max areaArray
		
		# window.area.update(
		#    from : min
		#    to  : max
		# )
		# window.price.update(
		#    from : priceMin
		#    to  : priceMax
		# )
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).attr('checked',false)
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unittypesArray) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			$('#'+item.id).attr('checked',false)
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),id) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		



	serializeData:->
		data = super()
		data.unitTypes = Marionette.getOption(@,'unitTypes')
		data.unitVariants = Marionette.getOption(@,'unitVariants')
		data.unitVariantNames = Marionette.getOption(@,'unitVariantNames')
		data.types = Marionette.getOption(@,'types')
		data

	onShow:->
		budget = []
		area = []
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
		
		types = Marionette.getOption(@,'types')
		flag = 0
		$.each CommonFloor.defaults,(index,value)->
				if CommonFloor.defaults[index] != "" 
					flag = 1
		if flag == 1  
			$('#collapsefilters').collapse('show')
		if types.length == 1
			$('.property_type').hide()
		@loadSelectedFilters()

	loadSelectedFilters:->
		types = []
		pt_types = Marionette.getOption(@,'types')
		types = CommonFloor.defaults['type'].split(',')
		if pt_types.length == 1
			types.push pt_types[0].type
		unittypesArray = []
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitVariantsArray = []
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
		typesArray = []
		
		
		id = []
		unitsArr = []
		unittypesColl = []
		$.each types,(index,value)->
			if value == 'Villas'
				$.merge unitsArr, bunglowVariantMasterCollection.getBunglowMasterUnits()
			if value == 'Apartments/Penthouse'
				$.merge unitsArr, apartmentVariantMasterCollection.getApartmentMasterUnits()
			if value == 'Plots'
				$.merge unitsArr, plotVariantMasterCollection.getPlotMasterUnits()
			if value == ""
				$.merge unitsArr, bunglowVariantMasterCollection.getBunglowUnits()
				$.merge unitsArr, apartmentVariantMasterCollection.getApartmentUnits()
				$.merge unitsArr, plotVariantMasterCollection.getPlotUnits()

		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			id.push parseInt unitDetails[0].get 'id'
			unittypesColl.push parseFloat unitDetails[1].get 'id'
		
			
		unittypesColl = _.uniq unittypesColl
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).attr('checked',true)
			$('#'+item.id).attr('disabled',false)
			console.log $.inArray($(item).attr('data-value'),unitTypes)
			if $.inArray($(item).attr('data-value'),unitTypes) is -1
				console.log item.id
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unittypesColl) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			console.log $(item).attr('data-value')
			$('#'+item.id).attr('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($(item).attr('data-value'),unitVariants) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),id) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.types).each (ind,item)->
			$('#'+item.id).attr('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($('#'+item.id).val(),types) is -1
				$('#'+item.id).prop('checked',false)

		
		# window.area.update(
		#    from : min
		#    to  : max
		# )
		# window.price.update(
		#    from : priceMin
		#    to  : priceMax
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
		@ui.status.prop('checked',false)
		if CommonFloor.defaults['availability'] != "" 
			 @ui.status.prop('checked',true)

		
		
	


class CommonFloor.FilterMasterCtrl extends Marionette.RegionController

	initialize:->
		unitTypes = []
		unitVariants = []
		unitVariantNames = []
		area = []
		budget = []
		villaFilters = @getVillaFilters()
		if villaFilters.length != 0
			$.merge unitTypes , villaFilters[0].unitTypes
			$.merge unitVariants , villaFilters[0].unitVariants
			$.merge unitVariantNames , villaFilters[0].unitVariantNames
			$.merge budget , villaFilters[0].budget
		apartmentFilters = @getApartmentFilters()
		if apartmentFilters.length != 0
			$.merge unitTypes , apartmentFilters[0].unitTypes
			$.merge unitVariants , apartmentFilters[0].unitVariants
			$.merge unitVariantNames , apartmentFilters[0].unitVariantNames
			$.merge budget , apartmentFilters[0].budget
		plotFilters = @getPlotFilters()
		if plotFilters.length != 0
			$.merge unitTypes , plotFilters[0].unitTypes
			$.merge unitVariants , plotFilters[0].unitVariants
			$.merge unitVariantNames , plotFilters[0].unitVariantNames
			$.merge budget , plotFilters[0].budget
		types = CommonFloor.masterPropertyTypes()
		$.each types,(index,value)->
			if value.count == 0
				types = _.omit(types, index) 
			value['id'] = value.type
			if value.type == 'Apartments'
				value.type = 'Apartments/Penthouse'
				value.type_name = '(A)/(PH)'
				value['id'] = 'Apartments'
		@view = view = new CommonFloor.FilterMsterView
				'unitTypes' : unitTypes
				'unitVariants' : _.uniq unitVariants
				'unitVariantNames' : unitVariantNames
				'budget'			: budget
				'types'			: types

		# @listenTo @view,  'render:view' , @renderView()

		@show @view

	

	
	#function to generate all the villa filters
	getVillaFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
		budget = []
		bunglowVariantMasterCollection.each (item)->
			units = unitMasterCollection.where 
						'unit_variant_id' : item.get('id')
			
			if units.length != 0
				unitTypeModel = unitTypeMasterCollection.findWhere
									'id' : item.get 'unit_type_id'
				if $.inArray(item.get('unit_type_id'),unit_types) == -1
					unit_types.push parseInt unitTypeModel.get 'id'
					unitTypes.push 
							'id' : unitTypeModel.get 'id'
							'name' : unitTypeModel.get 'name'
							'type'	: 'V'
				unitVariants.push item.get 'super_built_up_area'
				unitVariantNames.push
						'id' : item.get 'id'
						'name'	: item.get 'unit_variant_name'
						'type'	: 'V'
			unitsArr = bunglowVariantMasterCollection.getBunglowUnits()
			$.each unitsArr,(index,value)->
				unitDetails = window.unit.getUnitDetails(value.id)
				budget.push parseFloat unitDetails[3]
			
		filters.push
			'unitTypes' 	: unitTypes
			'unitVariants'  : unitVariants
			'unitVariantNames' : unitVariantNames
			'budget'			: budget


		filters

	#function to generate all the apartment filters
	getApartmentFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
		budget = []
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
				

		unitsArr = apartmentVariantMasterCollection.getApartmentUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
		filters.push
			'unitTypes' 	: unitTypes
			'unitVariants'  : unitVariants
			'unitVariantNames' : unitVariantNames
			'budget'			: budget
		filters


		#function to generate all the plot filters
	getPlotFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
		budget = []
		plotVariantMasterCollection.each (item)->
			units = unitMasterCollection.where 
						'unit_variant_id' : item.get('id')
			
			if units.length != 0
				unitTypeModel = unitTypeMasterCollection.findWhere
									'id' : item.get 'unit_type_id'
				if $.inArray(item.get('unit_type_id'),unit_types) == -1
					unit_types.push parseInt unitTypeModel.get 'id'
					unitTypes.push 
							'id' : unitTypeModel.get 'id'
							'name' : unitTypeModel.get 'name'
							'type'	: 'P'
				unitVariants.push item.get 'size'
				unitVariantNames.push
						'id' : item.get 'id'
						'name'	: item.get 'unit_variant_name'
						'type'	: 'P'

				
		unitsArr = plotVariantMasterCollection.getPlotUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]	
		filters.push
			'unitTypes' 	: unitTypes
			'unitVariants'  : unitVariants
			'unitVariantNames' : unitVariantNames
			'budget'			: budget
		filters
								
