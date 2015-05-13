window.unitTypes = []
window.unitVariants = []
window.variantNames = []
window.price = ''
window.area = ''
window.type  = []
class CommonFloor.FilterApartmentView extends Marionette.ItemView

	template : Handlebars.compile('
									<div class="collapse" id="collapsefilters">
										<div class="container-fluid"">

											<div class="filters-wrapper">
											  	<div class="row">
												  	
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
					                        	<a href="javascript:void(0)" data-toggle="collapse" data-target="#collapsefilters" class="text-primary pull-right m-b-10"><span class="icon-cross"></span> Close </a>
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
		clear : '.clear'

	events:
		'click @ui.clear':(e)->
			$.each CommonFloor.defaults,(index,value)->
				CommonFloor.defaults[index] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			@loadSelectedFilters()

		'click @ui.unitTypes':(e)->
			if $(e.currentTarget).is(':checked')
				window.unitTypes.push parseInt $(e.currentTarget).attr('data-value')
			else
				window.unitTypes = _.without window.unitTypes ,parseInt $(e.currentTarget).attr('data-value')
			console.log window.unitTypes
			CommonFloor.defaults['unitTypes'] = window.unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			# @resetFilters()
			
		'click @ui.variantNames':(e)->
			if $(e.currentTarget).is(':checked')
				window.variantNames.push parseInt $(e.currentTarget).attr('data-value')
			else
				window.variantNames = _.without window.variantNames ,parseInt $(e.currentTarget).attr('data-value')
			CommonFloor.defaults['unitVariants'] = window.variantNames.join(',')
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
		data

	onShow:->
		flag = 0
		$.each CommonFloor.defaults,(index,value)->
				if CommonFloor.defaults[index] != ""
					flag = 1
		if flag == 1
			$('#collapsefilters').collapse('show')
		@loadSelectedFilters()

	loadSelectedFilters:->
		unittypesArray = []
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitVariantsArray = []
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
		typesArray = []
		types = CommonFloor.defaults['type'].split(',')
		budget = []
		area = []
		id = []
		unitsArr = []
		unittypesColl = []
		$.merge unitsArr, apartmentVariantMasterCollection.getApartmentMasterUnits()
			
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			id.push parseInt unitDetails[0].get 'id'
			unittypesColl.push parseFloat unitDetails[1].get 'id'
		$.each unitCollection.toArray(), (index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
			area.push parseFloat unitDetails[0].get 'super_built_up_area'
			

		
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
		window.price = $("#budget").data("ionRangeSlider")
		window.area = $("#area").data("ionRangeSlider")
		window.area.update(
		   from : min
		   to  : max
		)
		window.price.update(
		   from : priceMin
		   to  : priceMax
		)
		min = _.min CommonFloor.defaults['area_min']
		max = _.max CommonFloor.defaults['area_max']
		subArea = (max - min)/ 20 
		subArea = subArea.toFixed(0)
		priceMin = _.min CommonFloor.defaults['price_min']
		priceMax = _.max CommonFloor.defaults['price_max']		
		subBudget = (priceMax - priceMin)/ 20
		subBudget = subBudget.toFixed(0)
		if CommonFloor.defaults['area_min'] != "" && CommonFloor.defaults['area_min'] != ""
			window.area.update(
			   from : min
			   to  : max
		)
		if CommonFloor.defaults['price_min'] != "" && CommonFloor.defaults['price_max'] != ""
			window.price.update(
			   from : priceMin
			   to  : priceMax
		)
		@ui.status.prop('checked',false)
		if CommonFloor.defaults['availability'] != "" 
			 @ui.status.prop('checked',true)
		
	


class CommonFloor.FilterApartmentCtrl extends Marionette.RegionController

	initialize:->
		unitTypes = []
		unitVariants = []
		unitVariantNames = []
		area = []
		budget = []
		apartmentFilters = @getApartmentFilters()
		if apartmentFilters.length != 0
			$.merge unitTypes , apartmentFilters[0].unitTypes
			$.merge unitVariants , apartmentFilters[0].unitVariants
			$.merge unitVariantNames , apartmentFilters[0].unitVariantNames
			$.merge budget , apartmentFilters[0].budget
		
		@view = view = new CommonFloor.FilterApartmentView
				'unitTypes' : unitTypes
				'unitVariants' : _.uniq unitVariants
				'unitVariantNames' : unitVariantNames
				'budget'			: budget

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


	
								
