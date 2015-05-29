window.unitTypes = []
window.unitVariants = []
window.variantNames = []
window.flooring = []
window.price = ''
window.area = ''
window.type  = []
class CommonFloor.FilterApartmentView extends Marionette.ItemView

	template : Handlebars.compile('<div class="fliters-container " id="collapsefilters">
         <a href="javascript:void(0)" class="text-primary filters-clear clear">Clear Filters </a> <button class="btn btn-primary filter-button" type="button"> <span class="icon-place"></span> </button> 
         <div class="filters-wrapper">
            <div class="filters-content mCustomScrollbar _mCS_2">
               <div id="mCSB_2" class="mCustomScrollBox mCS-cf-scroll mCSB_vertical mCSB_inside" tabindex="0">
                  <div id="mCSB_2_container" class="mCSB_container" style="position:relative; top:0; left:0;" dir="ltr">
                     <div class="property_type">
                        <h6 class="">PROPERTY TYPE</h6>
                        <div class="filter-chkbox-block">  
                         <div class="-lbl villa-check">
                          <input type="checkbox" class="custom-chckbx addCft types " id="Villas" value="Villas" > <label for="Villas" class="-lbl  ">Villas</label>  
                          </div>
                           <div class="-lbl apartment-check">
                          <input type="checkbox" class="custom-chckbx addCft types" id="Apartments" value="Apartments/Penthouse" > <label for="Apartments" class="-lbl">Apartments/Penthouse</label> 
                            </div>
                            <div class="-lbl plot-check">
                           <input type="checkbox" class="custom-chckbx addCft types" id="Plots" value="Plots"> <label for="Plots" class="-lbl">Plots</label>  
 </div>
                         </div>
                     </div>
     
           
               
                     <div class="">
                        <h6 class="">AREA (Sq.ft)</h6>
                        <div class="range-container"> <span class="irs js-irs-0"><span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">663</span><span class="irs-max">4 138</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span></span><input type="text" id="area" name="area" value="" class="irs-hidden-input" readonly=""> </div>
                     </div>
                     <div class="">
                        <h6 class="">BUDGET </h6>
                        <div class="range-container"> <span class="irs js-irs-1"><span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">19.23 Lac</span><span class="irs-max">2.22 Cr</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span></span> </div>
                     </div>
                     <div class="">
                        <h6 class="availability">AVAILABILITY</h6>
                        <div class="filter-chkbox-block"> <input type="checkbox" name="available" class="custom-chckbx addCft status" id="available" value="available"> <label for="available" class="-lbl">Show Available Units Only</label> </div>
                     </div>
                  </div>
                  <div id="mCSB_2_scrollbar_vertical" class="mCSB_scrollTools mCSB_2_scrollbar mCS-cf-scroll mCSB_scrollTools_vertical" style="display: block;">
                     <div class="mCSB_draggerContainer">
                        <div id="mCSB_2_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; display: block; height: 62px; max-height: 285px;" oncontextmenu="return false;">
                           <div class="mCSB_dragger_bar" style="line-height: 30px;"></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>


         <!--<div class="filters-bottom"> <a href="#">+ More Filters</a> </div>--> 
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
		if CommonFloor.defaults['unitTypes']!= ""
			unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		if CommonFloor.defaults['unitVariants']!= ""
			variantNames = CommonFloor.defaults['unitVariants'].split(',')
		if CommonFloor.defaults['type']!= ""
			window.type  = CommonFloor.defaults['type'].split(',')
		if CommonFloor.defaults['flooring']!= ""
			window.flooring  = CommonFloor.defaults['flooring'].split(',')
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
			$.each CommonFloor.defaults,(index,value)->
				CommonFloor.defaults[index] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
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
			CommonFloor.defaults['unitTypes'] = window.unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
			unitTempCollection.trigger( "filter_available") 
			# @resetFilters()
			
		'click @ui.variantNames':(e)->
			if $(e.currentTarget).is(':checked')
				window.variantNames.push parseInt $(e.currentTarget).attr('data-value')
			else
				window.variantNames = _.without window.variantNames ,parseInt $(e.currentTarget).attr('data-value')
			CommonFloor.defaults['unitVariants'] = window.variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()	
			unitTempCollection.trigger( "filter_available") 

		'change @ui.priceMin':(e)->
			if $(e.currentTarget).val() != ""
				CommonFloor.defaults['price_min'] = $(e.currentTarget).val()
			else
				CommonFloor.defaults['price_min'] = 0
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
			unitTempCollection.trigger( "filter_available") 
			

		'change @ui.priceMax':(e)->
			if $(e.currentTarget).val() != ""
				CommonFloor.defaults['price_max'] = $(e.currentTarget).val()
			else
				CommonFloor.defaults['price_max'] = 999999900
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
			unitTempCollection.trigger( "filter_available") 
			# @resetFilters()
			

		'click @ui.status':(e)->
			CommonFloor.defaults['availability'] = e.currentTarget.id
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
			unitTempCollection.trigger( "filter_available") 
			# @resetFilters()


		'change @ui.area':(e)->
			CommonFloor.defaults['area_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['area_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
			unitTempCollection.trigger( "filter_available") 

		'change @ui.budget':(e)->
			CommonFloor.defaults['price_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['price_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
			unitTempCollection.trigger( "filter_available") 

		'change @ui.floor':(e)->
			CommonFloor.defaults['floor_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['floor_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
			unitTempCollection.trigger( "filter_available") 


		'click @ui.flooring':(e)->
			if $(e.currentTarget).is(':checked')
				window.flooring.push $(e.currentTarget).attr('data-value')
			else
				window.flooring = _.without window.flooring ,$(e.currentTarget).attr('data-value')
			window.flooring =   _.uniq window.flooring 
			CommonFloor.defaults['flooring'] = window.flooring.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterBuilding(@building_id)
			CommonFloor.filter()
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
		@loadSelectedFilters()

		$('.filters-content').mCustomScrollbar
			theme: 'inset'
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
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitVariantsArray = []
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
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
		res = CommonFloor.getFilters()[0]
		if Object.keys(res).length == 0
			window.flag1 = 1

		@ui.status.prop('checked',false)
		if CommonFloor.defaults['availability'] != "" 
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
		flooringAttributes = []
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

				if $.inArray(item.get('variant_attributes').flooring,flooring) == -1 && ! _.isUndefined item.get('variant_attributes').flooring
					flooring.push item.get('variant_attributes').flooring
					flooringAttributes.push
							'id' : item.get('variant_attributes').flooring
							'name' : item.get('variant_attributes').flooring
							type: type
				
				

		unitsArr = apartmentVariantMasterCollection.getApartmentUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
		filters.push
			'unitTypes' 	: unitTypes
			'unitVariants'  : unitVariants
			'unitVariantNames' : unitVariantNames
			'budget'			: budget
			'flooring'		: flooringAttributes

		$.each filters[0],(index,value)->
			if $.inArray(index , project.get('filters').Villa) ==  -1 && index != 'budget' && index != 'unitVariants'
				filters[0][index] = []
		filters


	
								
