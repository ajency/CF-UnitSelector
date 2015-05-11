class CommonFloor.FilterMsterView extends Marionette.ItemView

	template : Handlebars.compile('
									<div class="collapse" id="collapsefilters">

										<div class="filters-wrapper">
										  	<div class="row">
											  	<div class="col-sm-4 col-md-4 ">
				                                    <h5># PROPERTY TYPE</h5>
				                                    <div class="filter-chkbox-block">
				                                      	{{#types}}
				                                        <input type="checkbox" class="custom-chckbx addCft types" id="{{type}}" value="{{type}}">
				                                        <label for="{{type}}" class="-lbl">{{type}}{{type_name}}</label> 
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
				                                       	<a href="#" class="hide-div">+ Show More</a>
				                                    </div>
				                                  </div>
				                               	</div>
			                               	</div>

				                            <div class="row">
				                                <div class="col-sm-4 col-md-4 ">
				                                    <h5># AREA (Sqft)</h5>
				                                	<input type="text" id="area" name="area" value="" />
				                                </div>
				                                <div class="col-sm-4 col-md-4 ">
				                                    <h5># BUDGET </h5>
				                                    <input type="text" id="budget" name="budget" value="" />
				                                </div>
				                                <div class="col-sm-4 col-md-4 ">
				                                  	<h5># AVAILABILITY</h5>
				                                    <div class="alert ">
				                                      	<input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> 
				                                       	<label for="Available" class="-lbl">Show Available Units Only  (What\'s this?)</label> 
				                                    </div>
				                                </div>
				                            </div>  
				                        </div>
										
									</div>
									')


	initialize:->
		@unitTypes = []
		@unitVariants = []
		@variantNames = []
		@price = ''
		@area = ''
		
		


	ui:
		unitTypes : '.unit_types'
		unitVariants : '.unitvariants'
		priceMin : '.price_min'
		priceMax : '.price_max'
		status : '.status'
		apply : '.apply'
		variantNames : '.variant_names'
		area : '#area'
		budget : '#budget'
		types : '.types'

	events:
		'click @ui.types':(e)->
			unitCollection.reset unitMasterCollection.toArray()
			if e.target.id == 'Villas'
				@trigger "load:villa:filters" 
			if e.target.id == 'Apartments/Penthouse'
				@trigger "load:apt:filters" 
			if e.target.id == 'Plots'
				@trigger "load:plot:filters"

		'click @ui.unitTypes':(e)->
			if $(e.currentTarget).is(':checked')
				@unitTypes.push parseInt $(e.currentTarget).attr('data-value')
			else
				@unitTypes = _.without @unitTypes ,parseInt $(e.currentTarget).attr('data-value')
			console.log @unitTypes
			CommonFloor.defaults['unitTypes'] = @unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			# @resetFilters()
			
		'click @ui.variantNames':(e)->
			if $(e.currentTarget).is(':checked')
				@variantNames.push parseInt $(e.currentTarget).attr('data-value')
			else
				@variantNames = _.without @variantNames ,parseInt $(e.currentTarget).attr('data-value')
			CommonFloor.defaults['unitVariants'] = @variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()	

		'change @ui.priceMin':(e)->
			if $(e.currentTarget).val() != ""
				CommonFloor.defaults['price_min'] = $(e.currentTarget).val()
			else
				CommonFloor.defaults['price_min'] = 0
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			

		'change @ui.priceMax':(e)->
			if $(e.currentTarget).val() != ""
				CommonFloor.defaults['price_max'] = $(e.currentTarget).val()
			else
				CommonFloor.defaults['price_max'] = 999999900
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			# @resetFilters()
			

		'click @ui.status':(e)->
			CommonFloor.defaults['availability'] = e.currentTarget.id
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			# @resetFilters()


		'click @ui.apply':(e)->
			# @region =  new Marionette.Region el : '#leftregion'
			# new CommonFloor.LeftMasterCtrl region : @region

		'change @ui.area':(e)->
			CommonFloor.defaults['area_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['area_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()

		'change @ui.budget':(e)->
			CommonFloor.defaults['price_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['price_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			


			
	
	#function to check the filters dependency
	onVillaFilters:(data)->
		min = _.min data[0].unitVariants
		max = _.max data[0].unitVariants
		priceMin = _.min data[0].budget
		priceMax = _.max data[0].budget
		@area.destroy()
		@price.destroy()
		$("#area").ionRangeSlider(
		    type: "double",
		    min: min,
		    max: max,
		    grid: false
		)
		$("#budget").ionRangeSlider(
		    type: "double",
		    min: priceMin,
		    max: priceMax,
		    grid: false
		    prettify :(num)->
		    	return window.numDifferentiation(num)

		)
		unittypes = _.pluck data[0].unitTypes , 'id'
		unitVariantNames = _.pluck data[0].unitVariantNames , 'id'
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unittypes) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unitVariantNames) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)

	#function to check the filters dependency
	onAptFilters:(data)->
		min = _.min data[0].unitVariants
		max = _.max data[0].unitVariants
		priceMin = _.min data[0].budget
		priceMax = _.max data[0].budget
		@area.destroy()
		@price.destroy()
		$("#area").ionRangeSlider(
		    type: "double",
		    min: min,
		    max: max,
		    grid: false
		)
		$("#budget").ionRangeSlider(
		    type: "double",
		    min: priceMin,
		    max: priceMax,
		    grid: false
		    prettify :(num)->
		    	return window.numDifferentiation(num)

		)
		unittypes = _.pluck data[0].unitTypes , 'id'
		unitVariantNames = _.pluck data[0].unitVariantNames , 'id'
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unittypes) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unitVariantNames) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)


	onPlotFilters:(data)->
		min = _.min data[0].unitVariants
		max = _.max data[0].unitVariants
		priceMin = _.min data[0].budget
		priceMax = _.max data[0].budget
		@area.destroy()
		@price.destroy()
		$("#area").ionRangeSlider(
		    type: "double",
		    min: min,
		    max: max,
		    grid: false
		)
		$("#budget").ionRangeSlider(
		    type: "double",
		    min: priceMin,
		    max: priceMax,
		    grid: false
		    prettify :(num)->
		    	return window.numDifferentiation(num)

		)
		unittypes = _.pluck data[0].unitTypes , 'id'
		unitVariantNames = _.pluck data[0].unitVariantNames , 'id'
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unittypes) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			$('#'+item.id).attr('disabled',false)
			if $.inArray(parseInt($(item).attr('data-value')),unitVariantNames) is -1
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
		unitVariants = Marionette.getOption(@,'unitVariants')
		budget = Marionette.getOption(@,'budget')
		min = _.min unitVariants
		max = _.max unitVariants
		subArea = (max - min)/ 20 
		console.log subArea = subArea.toFixed(0)
		priceMin = _.min budget
		priceMax = _.max budget
		subBudget = (priceMax - priceMin)/ 20
		console.log subBudget = subBudget.toFixed(0)
		minimum = window.numDifferentiation(priceMin)
		$("#area").ionRangeSlider(
		    type: "double",
		    min: min,
		    max: max,
		    grid: false
		    step : subArea
		)
		$("#budget").ionRangeSlider(
		    type: "double",
		    min: priceMin,
		    max: priceMax,
		    grid: false
		    step : subBudget
		    prettify :(num)->
		    	return window.numDifferentiation(num)

		)
		@price = $("#budget").data("ionRangeSlider")
		@area = $("#area").data("ionRangeSlider")
		# if villaFilters.length != 0
		# 	@assignVillaValues(villaFilters)
		# if apartmentFilters.length != 0
		# 	@assignAptValues(apartmentFilters)
		
	#on load function to assign all the villa filters
	assignVillaValues:(villaFilters)->
		$.merge @unitTypes , _.pluck villaFilters[0].unitTypes ,'id'
		# CommonFloor.defaults['unitTypes'] = @unitTypes.join(',')
		$.merge @unitVariants ,  _.pluck villaFilters[0].unitVariants ,'id'
		# CommonFloor.defaults['unitVariants'] = @unitVariants.join(',')
		$.merge @status , _.pluck villaFilters[0].status,'name'
		# CommonFloor.defaults['availability'] = @status.join(',')

	#on load function to assign all the apartment filters
	assignAptValues:(apartmentFilters)->
		$.merge @unitTypes , _.pluck apartmentFilters[0].unitTypes ,'id'
		# CommonFloor.defaults['unitTypes'] = @unitTypes.join(',')
		$.merge @unitVariants ,  _.pluck apartmentFilters[0].unitVariants ,'id'
		# CommonFloor.defaults['unitVariants'] = @unitVariants.join(',')
		$.merge @status , _.pluck apartmentFilters[0].status,'name'
		# CommonFloor.defaults['availability'] = @status.join(',')


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
		types = CommonFloor.propertyTypes()
		$.each types,(index,value)->
			if value.count == 0
				types = _.omit(types, index) 
			if value.type == 'Buildings'
				value.type = 'Apartments/Penthouse'
				value.type_name = '(A)/(PH)'
		
		@view = view = new CommonFloor.FilterMsterView
				'unitTypes' : unitTypes
				'unitVariants' : _.uniq unitVariants
				'unitVariantNames' : unitVariantNames
				'budget'			: budget
				'types'			: types

		@listenTo @view,"load:villa:filters" ,@loadVillaFilter

		@listenTo @view,"load:apt:filters" ,@loadAptFilter

		@listenTo @view,"load:plot:filters" ,@loadPlotFilter
		
		@show @view

	loadVillaFilter:->
		villaFilters = @getVillaFilters()
		@view.triggerMethod "villa:filters", villaFilters

	loadAptFilter:->
		aptFilters = @getApartmentFilters()
		@view.triggerMethod "apt:filters", aptFilters

	loadPlotFilter:->
		plotFilters = @getPlotFilters()
		@view.triggerMethod "plot:filters", plotFilters

	#function to generate all the villa filters
	getVillaFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
		budget = []
		bunglowVariantCollection.each (item)->
			units = unitMasterCollection.where 
						'unit_variant_id' : item.get('id')
			
			if units.length != 0
				unitTypeModel = unitTypeCollection.findWhere
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
			unitsArr = bunglowVariantCollection.getBunglowUnits()
			$.each unitsArr,(index,value)->
				unitDetails = window.unit.getUnitDetails(value.id)
				budget.push parseFloat unitDetails[3]
			
		if unitVariants.length != 0
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
		apartmentVariantCollection.each (item)->
			units = unitMasterCollection.where 
						'unit_variant_id' : item.get('id')
			
			if units.length != 0
				unitTypeModel = unitTypeCollection.findWhere
									'id' : item.get 'unit_type_id'
				if $.inArray(item.get('unit_type_id'),unit_types) == -1
					unit_types.push parseInt unitTypeModel.get 'id'
					unitTypes.push 
							'id' : unitTypeModel.get 'id'
							'name' : unitTypeModel.get 'name'
							'type'	: 'A'
				unitVariants.push item.get 'super_built_up_area'
				unitVariantNames.push
						'id' : item.get 'id'
						'name'	: item.get 'unit_variant_name'
						'type'	: 'A'
				

		unitsArr = apartmentVariantCollection.getApartmentUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
		if unitVariants.length != 0
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
		plotVariantCollection.each (item)->
			units = unitMasterCollection.where 
						'unit_variant_id' : item.get('id')
			
			if units.length != 0
				unitTypeModel = unitTypeCollection.findWhere
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

				
		unitsArr = plotVariantCollection.getPlotUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]	
		if unitVariants.length != 0
			filters.push
					'unitTypes' 	: unitTypes
					'unitVariants'  : unitVariants
					'unitVariantNames' : unitVariantNames
					'budget'			: budget
		filters
								
