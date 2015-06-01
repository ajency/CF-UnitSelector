window.unitTypes = []
window.unitVariants = []
window.variantNames = []
window.flooring = []
window.price = ''
window.area = ''
window.type  = []
class CommonFloor.FilterMsterView extends Marionette.ItemView

	template : Handlebars.compile('
         <a href="javascript:void(0)" class="text-primary filters-clear clear">Clear Filters </a> <button class="btn btn-primary filter-button" type="button"> <span class="icon-place"></span> </button> 
         <div class="filters-wrapper">
            <div class="filters-content">
                                    <div class="property_type">
                        <h6 class="">PROPERTY TYPE</h6>
                        <div class="filter-chkbox-block"> 
                        {{#types}}
                         <div class="-lbl ">
                          <input type="checkbox" class="custom-chckbx addCft types {{name}}" id="{{id}}" value="{{type}}" data-value="{{name}}"" > <label for="{{id}}" class="-lbl  ">{{type}}</label>  
                          </div>
                       {{/types}} 
                         </div>
                     </div>
     
           
               
                     <div class="">
                         <h6 class="">AREA ({{measurement_units}})</h6>
                        	<div class="range-container">
                        		<input type="text" id="area" name="area" value="" />
                        	</div>                     </div>
                     <div class="">
                        <h6 class="">BUDGET </h6>
                        <div class="range-container">
                        	<input type="text" id="budget" name="budget" value="" />
                        </div>                     </div>
                     <div class="">
                        <h6 class="availability">AVAILABILITY</h6>
                      	<div class="filter-chkbox-block">
                          	<input type="checkbox" name="available"  class="custom-chckbx addCft status" id="available" value="available"> 
                           	<label for="available" class="-lbl">Show Available Units Only</label>
                        </div>                     </div>
                  </div>
                 
              
         </div>


         <!--<div class="filters-bottom"> <a href="#">+ More Filters</a> </div>--> 
      </div>
      <div class="filters-wrapper-hover  filters-wrapper villa-wrapper">
          <div class="arrow-left"> </div>
          	<button class="btn btn-primary filter-button back_btn" type="button"> 
          		<span class="icon-place"></span> Back
          	</button>
          	{{#villas}}
       <div class="villa_unitTypes"> <h6 class="unit_type_filter">UNIT TYPE</h6> <div class="filter-chkbox-block">  
       	{{#unitTypes}}
          <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} data-type="villa"> 
          <label for="unit_type{{id}}" class="-lbl">{{name}}</label> 
        {{/unitTypes}} 
         </div>
		  </div>
       	<div class="villa_unitVariantNames"> <h6 class="unit_type_filter">UNIT VARIANTS</h6> <div class="filter-chkbox-block">  
       		{{#unitVariantNames}}
           	<input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} data-type="villa" > 
            <label for="varinat_name{{id}}" class="-lbl">{{name}}</label> 
		   {{/unitVariantNames}}
		  </div>
		  </div>	
		  {{#flooring}}
		  <div class=""> <h6 class="unit_type_filter">{{label}}</h6> <div class="filter-chkbox-block">  
       		{{#value}}
           	<input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}"" data-type="villa" > 
            <label for="{{id}}" class="-lbl">{{name}}</label> 
		   {{/value}}
		  </div>
		  </div>
		   {{/flooring}}
		  {{/villas}}</div>
	<div class="filters-wrapper-hover  filters-wrapper apartment-wrapper">
          <div class="arrow-left"> </div>
          	<button class="btn btn-primary filter-button back_btn" type="button"> 
          		<span class="icon-place"></span> Back
          	</button>
          	{{#apartments}}
       <div class="apartment_unitTypes"> <h6 class="unit_type_filter">UNIT TYPE</h6> <div class="filter-chkbox-block">  
       	{{#unitTypes}}
          <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}}  data-type="apartment"> 
          <label for="unit_type{{id}}" class="-lbl">{{name}}</label> 
        {{/unitTypes}} 
         </div>
		  </div>
       	<div class="apartment_unitVariantNames"> <h6 class="unit_type_filter">UNIT VARIANTS</h6> <div class="filter-chkbox-block">  
       		{{#unitVariantNames}}
           	<input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} data-type="apartment"> 
            <label for="varinat_name{{id}}" class="-lbl">{{name}}</label> 
		   {{/unitVariantNames}}
		  </div>
		  </div>
		   {{#flooring}}
		  <div class=""> <h6 class="unit_type_filter">{{label}}</h6> <div class="filter-chkbox-block">  
       		{{#value}}
           	<input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}"" data-type="villa" > 
            <label for="{{id}}" class="-lbl">{{name}}</label> 
		   {{/value}}
		  </div>
		  </div>
		   {{/flooring}}

		  {{/apartments}}</div>
	<div class="filters-wrapper-hover  filters-wrapper plot-wrapper">
          <div class="arrow-left"> </div>
          	<button class="btn btn-primary filter-button back_btn" type="button"> 
          		<span class="icon-place"></span> Back
          	</button>
          	{{#plots}}
       <div class="plot_unitTypes"> <h6 class="unit_type_filter">UNIT TYPE</h6> <div class="filter-chkbox-block">  
       	{{#unitTypes}}
          <input type="checkbox" class="custom-chckbx addCft unit_types" id="unit_type{{id}}" value="unit_type{{id}}" value="1" data-value={{id}} data-type="plot"> 
          <label for="unit_type{{id}}" class="-lbl">{{name}}</label> 
        {{/unitTypes}} 
         </div>
		  </div>

       	<div class="plot_unitVariantNames"> <h6 class="unit_type_filter">UNIT VARIANTS</h6> <div class="filter-chkbox-block">  
       		{{#unitVariantNames}}
           	<input type="checkbox" class="custom-chckbx addCft variant_names" id="varinat_name{{id}}" value="varinat_name{{id}}" value="1" data-value={{id}} data-type="plot"> 
            <label for="varinat_name{{id}}" class="-lbl">{{name}}</label> 
		   {{/unitVariantNames}}
		  </div>
		  </div>
		   {{#flooring}}
		  <div class=""> <h6 class="unit_type_filter">{{label}}</h6> <div class="filter-chkbox-block">  
       		{{#value}}
           	<input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}"" data-type="villa" > 
            <label for="{{id}}" class="-lbl">{{name}}</label> 
		   {{/value}}
		  </div>
		  </div>
		   {{/flooring}}

		  {{/plots}}</div></div>')


	

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
		flooring : '.attributes'
		villa : '.villa'
		apt : '.apartment'
		plot : '.plot'
		villaWrapper : '.villa-wrapper'
		aptWrapper : '.apartment-wrapper'
		plotWrapper : '.plot-wrapper'
		villaCheck : '.villa-check'
		aptCheck : '.apartment-check'
		plotCheck : '.plot-check'
		back_btn : '.back_btn'

	initialize:->
		@price = ''
		@area = ''
		unitTypes = []
		variantNames = []
		# if CommonFloor.defaults['unitTypes']!= ""
		# 	unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		# if CommonFloor.defaults['unitVariants']!= ""
		# 	variantNames = CommonFloor.defaults['unitVariants'].split(',')
		# if CommonFloor.defaults['type']!= ""
		# 	window.type  = CommonFloor.defaults['type'].split(',')
		# if CommonFloor.defaults['flooring']!= ""
		# 	window.flooring  = CommonFloor.defaults['flooring'].split(',')
		# window.unitTypes = unitTypes.map (item)->
		# 	return parseInt item
		# window.variantNames = variantNames.map (item)->
		# 	return parseInt item

	events:

		'click @ui.clear':(e)->
			window.unitTypes = []
			window.unitVariants = []
			window.variantNames = []
			window.price = ''
			window.area = ''
			window.type  = []
			CommonFloor.defaults['type'] = ""
			$.each CommonFloor.defaults['villa'],(index,value)->
				CommonFloor.defaults['villa'][index] = ""
			$.each CommonFloor.defaults['apartment'],(index,value)->
				CommonFloor.defaults['apartment'][index] = ""
			$.each CommonFloor.defaults['plot'],(index,value)->
				CommonFloor.defaults['plot'][index] = ""
			$.each CommonFloor.defaults['common'],(index,value)->
				CommonFloor.defaults['common'][index] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@loadSelectedFilters()
			@price = $("#budget").data("ionRangeSlider")
			@area = $("#area").data("ionRangeSlider")
			@price.destroy()
			@area.destroy()
			@loadClearFilter()

		'mouseover @ui.villaCheck,@ui.villaWrapper':(e)->
			$(".villa-wrapper").addClass("visible")

		'mouseout @ui.villaCheck,@ui.villaWrapper':(e)->
			$(".villa-wrapper").removeClass("visible")

		'mouseover @ui.aptCheck,@ui.aptWrapper':(e)->
			$(".apartment-wrapper").addClass("visible")

		'mouseout @ui.aptCheck,@ui.aptWrapper':(e)->
			$(".apartment-wrapper").removeClass("visible")

		'mouseover @ui.plotCheck,@ui.plotWrapper':(e)->
			$(".plot-wrapper").addClass("visible")

		'mouseout @ui.plotCheck,@ui.plotWrapper':(e)->
			$(".plot-wrapper").removeClass("visible")

		# 'click @ui.types':(e)->
		# 	window.unitTypes = []
		# 	window.unitVariants = []
		# 	window.variantNames = []
		# 	$.each CommonFloor.defaults,(index,value)->
		# 		if index != 'type'
		# 				CommonFloor.defaults[index] = ""
		# 	if $(e.currentTarget).is(':checked')
		# 		window.type.push $(e.target).val()
		# 	else
		# 		window.type = _.without window.type ,$(e.target).val()
		# 	CommonFloor.defaults['type'] = window.type.join(',')
		# 	unitCollection.reset unitMasterCollection.toArray()
		# 	CommonFloor.filter()
		# 	unitCollection.trigger('available')
		# 	if e.target.id == 'Villas'
		# 		@villaFilters() 
		# 	if e.target.id == 'Apartments'
		# 		@apartmentFilters()
		# 	if e.target.id == 'Plots'
		# 		@plotFilters()

		'click @ui.villa':(e)->
			types = []
			if CommonFloor.defaults['type']!= ""
				types = CommonFloor.defaults['type'].split(',')
			if $(e.currentTarget).is(':checked')
				$(e.currentTarget).parent().addClass 'villa-check'
				$(e.currentTarget).parent().addClass("villa-btn")
				$('.villa-wrapper').addClass("visible")
				types.push $(e.currentTarget).attr('data-value')
			else
				$(e.currentTarget).parent().removeClass 'villa-check'
				$(e.currentTarget).parent().removeClass 'villa-btn'
				$('.villa-wrapper').removeClass 'visible'
				types = _.without types ,$(e.currentTarget).attr('data-value')
			console.log types =   _.uniq types 
			CommonFloor.defaults['type'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
	
			CommonFloor.filterNew()
			unitCollection.trigger('available')

		'click @ui.apt':(e)->
			types = []
			if CommonFloor.defaults['type']!= ""
				types = CommonFloor.defaults['type'].split(',')
			if $(e.currentTarget).is(':checked')
				$(e.currentTarget).parent().addClass 'apartment-check'
				$(e.currentTarget).parent().addClass("apartment-btn")
				$('.apartment-wrapper').addClass("visible")
				types.push  $(e.currentTarget).attr('data-value')
			else
				$(e.currentTarget).parent().removeClass 'apartment-check'
				$(e.currentTarget).parent().removeClass 'apartment-btn'
				$('.apartment-wrapper').removeClass 'visible'
				types = _.without types , $(e.currentTarget).attr('data-value')
			console.log types =   _.uniq types 
			CommonFloor.defaults['type'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')

		'click @ui.plot':(e)->
			types = []
			if CommonFloor.defaults['type']!= ""
				types = CommonFloor.defaults['type'].split(',')
			if $(e.currentTarget).is(':checked')
				$(e.currentTarget).parent().addClass 'plot-check'
				$(e.currentTarget).parent().addClass("plot-btn")
				$('.plot-wrapper').addClass("visible")
				types.push  $(e.currentTarget).attr('data-value')
			else
				$(e.currentTarget).parent().removeClass 'plot-check'
				$(e.currentTarget).parent().removeClass 'plot-btn'
				$('.plot-wrapper').removeClass 'visible'
				types = _.without types , $(e.currentTarget).attr('data-value')
			types =   _.uniq types 
			CommonFloor.defaults['type'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
	
			CommonFloor.filterNew()
			unitCollection.trigger('available')
	
			
		'click @ui.unitTypes':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			if CommonFloor.defaults[type]['unit_type_id']!= ""
				types = CommonFloor.defaults[type]['unit_type_id'].split(',')
				types = types.map (item)->
					return parseInt item
			if $(e.currentTarget).is(':checked')
				types.push parseInt $(e.currentTarget).attr('data-value')
			else
				types = _.without types ,parseInt $(e.currentTarget).attr('data-value')
			types =   _.uniq types
			CommonFloor.defaults[type]['unit_type_id'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			# @resetFilters()
			
		'click @ui.variantNames':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			if CommonFloor.defaults[type]['unit_variant_id']!= ""
				types = CommonFloor.defaults[type]['unit_variant_id'].split(',')
				types = types.map (item)->
					return parseInt item
			if $(e.currentTarget).is(':checked')
				types.push parseInt $(e.currentTarget).attr('data-value')
			else
				types = _.without types ,parseInt $(e.currentTarget).attr('data-value')
			types =   _.uniq types
			CommonFloor.defaults[type]['unit_variant_id'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')

		'click @ui.status':(e)->
			if $(e.currentTarget).is(':checked')
				CommonFloor.defaults['common']['availability'] = e.currentTarget.id
			else
				CommonFloor.defaults['common']['availability'] = ""
				
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			# @resetFilters()


		'change @ui.area':(e)->
			CommonFloor.defaults['common']['area_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['common']['area_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')

		'change @ui.budget':(e)->
			CommonFloor.defaults['common']['price_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['common']['price_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')

		'click @ui.flooring':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			if CommonFloor.defaults[type]['attributes']!= ""
				types = CommonFloor.defaults[type]['attributes'].split(',')
				
			if $(e.currentTarget).is(':checked')
				types.push $(e.currentTarget).attr('data-value')
			else
				types = _.without types ,$(e.currentTarget).attr('data-value')
			types =   _.uniq types
			CommonFloor.defaults[type]['attributes'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			

		'click .filter-button':(e)->
			$('.fliters-container').toggleClass 'closed'
			# if $('.fliters-container').hasClass( "closed")
			# 	window.flag = 1

		'click .back_btn': (e)->
			$('.filters-wrapper-hover').removeClass 'visible'



			


			
	
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
		data.villas = Marionette.getOption(@,'villas')
		data.unitVariants = Marionette.getOption(@,'unitVariants')
		data.apartments = Marionette.getOption(@,'apartments')
		data.plots = Marionette.getOption(@,'plots')
		data.types = Marionette.getOption(@,'types')
		data

	onShow:->
		
		@hideLabels()
		$('.filters-content').mCustomScrollbar
			theme: 'cf-scroll'
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

		
		if CommonFloor.defaults['area_min'] != ""
			$("#area").ionRangeSlider(
			    type: "double",
			    min: min,
			    max:  max,
			    from : CommonFloor.defaults['area_min'],
				to : CommonFloor.defaults['area_max'],
			    step : subArea,
			    grid: false
			)
		else
			$("#area").ionRangeSlider(
		    type: "double",
		    min: min,
		    max:  max,
		    step : subArea,
		    grid: false
		)
		
		priceMin = _.min budget
		priceMax = _.max budget	
		subBudget = (priceMax - priceMin)/ 20
		subBudget = subBudget.toFixed(0)
		

		if CommonFloor.defaults['price_min'] != ""
			$("#budget").ionRangeSlider(
			    type: "double",
			    min: priceMin,
			    max: priceMax,
			    from : CommonFloor.defaults['price_min'],
			    to : CommonFloor.defaults['price_max'],
			    grid: false,
			    step : subBudget,
			    prettify :(num)->
			    	return window.numDifferentiation(num)

			)
		else
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
		
		# if types.length == 1
		# 	$('.property_type').hide()
		# if Marionette.getOption(@,'flooring').length == 0
		# 	$('.flooring_filter').hide()
		# if Marionette.getOption(@,'unitTypes').length == 0
		# 	$('.unit_type_filter').hide()
		# if Marionette.getOption(@,'unitVariantNames').length == 0
		# 	$('.variant_filter').hide()
		@loadSelectedFilters()

	hideLabels:->
		villas = Marionette.getOption(@,'villas')
		apartments = Marionette.getOption(@,'apartments')
		plots = Marionette.getOption(@,'plots')
		$.each villas[0] , (index,value)->
			if value.length is 0
				$('.villa_'+index).hide()
		$.each apartments[0] , (index,value)->
			if value.length is 0
				$('.apartment_'+index).hide()
		$.each plots[0] , (index,value)->
			if value.length is 0
				$('.plot_'+index).hide()


	loadClearFilter:->
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
		$('#area').val(min+";"+max)
		$('#budget').val(priceMin+";"+priceMax)
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
		

	loadSelectedFilters:->
		types = []
		pt_types = Marionette.getOption(@,'types')
		types = CommonFloor.defaults['type'].split(',')
		if pt_types.length == 1
			types.push pt_types[0].type
		unittypesArray = []
		unitTypes = []
		$.merge unitTypes, CommonFloor.defaults['villa']['unit_type_id'].split(',')
		$.merge unitTypes, CommonFloor.defaults['apartment']['unit_type_id'].split(',')
		$.merge unitTypes, CommonFloor.defaults['plot']['unit_type_id'].split(',')
		unitVariantsArray = []
		unitVariants = []
		$.merge unitVariants , CommonFloor.defaults['villa']['unit_variant_id'].split(',')
		$.merge unitVariants , CommonFloor.defaults['apartment']['unit_variant_id'].split(',')
		$.merge unitVariants , CommonFloor.defaults['plot']['unit_variant_id'].split(',')

		attributes = []
		$.merge attributes , CommonFloor.defaults['villa']['attributes'].split(',')
		$.merge attributes , CommonFloor.defaults['apartment']['attributes'].split(',')
		$.merge attributes , CommonFloor.defaults['plot']['attributes'].split(',')
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
			$('#'+item.id).prop('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($(item).attr('data-value'),unitTypes) is -1
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)
			# if $.inArray(parseInt($(item).attr('data-value')),unittypesColl) is -1 && CommonFloor.defaults['type'] != ''
			# 	$('#'+item.id).prop('checked',false)
			# 	$('#'+item.id).attr('disabled',true)
		$(@ui.variantNames).each (ind,item)->
			$('#'+item.id).prop('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($(item).attr('data-value'),unitVariants) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)
			# if $.inArray(parseInt($(item).attr('data-value')),id) is -1 && CommonFloor.defaults['type'] != ''
			# 	$('#'+item.id).prop('checked',false)
			# 	$('#'+item.id).attr('disabled',true)
		$(@ui.types).each (ind,item)->
			$('#'+item.id).prop('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($('#'+item.id).attr('data-value'),types) is -1
				$('#'+item.id).prop('checked',false)
			else
				type = $('#'+item.id).attr('data-value')
				$('#'+item.id).parent().addClass(type+'-check')
				$('#'+item.id).parent().addClass (type+'-btn')
				# $("."+$('#'+item.id).attr('data-value')+"-wrapper").addClass("visible")
			 	# $('.'+$('#'+item.id).attr('data-value')).trigger('click')
		$(@ui.flooring).each (ind,item)->
			$('#'+item.id).prop('checked',true)
			$('#'+item.id).attr('disabled',false)
			console.log $.inArray($(item).attr('data-value'),attributes)
			if $.inArray($(item).attr('data-value'),attributes) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)


		
		
		@ui.status.prop('checked',false)
		if CommonFloor.defaults['common']['availability'] != "" 
			 @ui.status.prop('checked',true)

		# res = CommonFloor.getFilters()
		# if Object.keys(res).length == 0
		# 	window.flag = 1
		# if window.flag == 0
		# 	$('.fliters-container').removeClass 'closed'
		# else
		# 	$('.fliters-container').addClass 'closed'
		


		
		
		
	


class CommonFloor.FilterMasterCtrl extends Marionette.RegionController

	initialize:->
		unitVariants = []
		budget = []
		villaFilters = @getVillaFilters()
		if villaFilters.length != 0
			$.merge unitVariants , villaFilters[0].unitVariants
			$.merge budget , villaFilters[0].budget
			
		apartmentFilters = @getApartmentFilters()
		if apartmentFilters.length != 0
			$.merge unitVariants , apartmentFilters[0].unitVariants
			$.merge budget , apartmentFilters[0].budget
			
		plotFilters = @getPlotFilters()
		if plotFilters.length != 0
			$.merge unitVariants , plotFilters[0].unitVariants
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
				model : project
				'villas' : villaFilters
				'unitVariants' : _.uniq unitVariants
				'apartments' : apartmentFilters
				'budget'			: budget
				'types'			: types
				'plots'		: plotFilters

		# @listenTo @view,  'render:view' , @renderView()

		@show @view

	

	
	#function to generate all the villa filters
	getVillaFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
		flooringAttributes = []
		budget = []
		flooring = []
		temp = []
		newtemp = []
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
				
				$.each project.get('filters').Villa , (index,value)->
					temp = []
					$.each item.get('variant_attributes') ,(ind,val)->
						if ind == value && $.inArray(value,flooring) is -1 && val != ""
							flooring.push value
							temp.push
								'name' : val
								'id' : s.replaceAll(val, " ", "_")
								'classname' : 'attributes'
								'label' : ind
								type: 'P'
							newtemp.push 
								'label' : ind.toUpperCase()
								'value' : temp
				# if $.inArray(item.get('variant_attributes').flooring,flooring) == -1 && ! _.isUndefined item.get('variant_attributes').flooring
				# 	flooring.push item.get('variant_attributes').flooring
				# 	flooringAttributes.push
				# 			'id' : item.get('variant_attributes').flooring
				# 			'name' : item.get('variant_attributes').flooring
				# 			type: 'V'
					
			unitsArr = bunglowVariantMasterCollection.getBunglowUnits()
			$.each unitsArr,(index,value)->
				unitDetails = window.unit.getUnitDetails(value.id)
				budget.push parseFloat unitDetails[3]
		
		filters.push
			'unitTypes' 	: unitTypes
			'unitVariants'  : unitVariants
			'unitVariantNames' : unitVariantNames
			'flooring'			: newtemp
			'budget'			: budget

		$.each filters[0],(index,value)->
			if $.inArray(index , project.get('filters').Villa) ==  -1 && index != 'budget' && index != 'unitVariants'
				filters[0][index] = []
				

		filters

	#function to generate all the apartment filters
	getApartmentFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
		budget = []
		flooringAttributes = []
		flooring = []
		temp = []
		newtemp = []
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
						if ind == value && $.inArray(value,flooring) is -1 && val != ""
							flooring.push value
							temp.push
								'name' : val
								'id' : s.replaceAll(val, " ", "_")
								'classname' : 'attributes'
								'label' : ind
								type: 'P'
							newtemp.push 
								'label' : ind.toUpperCase()
								'value' : temp

				# if $.inArray(item.get('variant_attributes').flooring,flooring) == -1 && ! _.isUndefined item.get('variant_attributes').flooring
				# 	flooring.push item.get('variant_attributes').flooring
				# 	flooringAttributes.push
				# 			'id' : item.get('variant_attributes').flooring
				# 			'name' : item.get('variant_attributes').flooring
				# 			type: type
				

		unitsArr = apartmentVariantMasterCollection.getApartmentUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
		filters.push
			'unitTypes' 	: unitTypes
			'unitVariants'  : unitVariants
			'unitVariantNames' : unitVariantNames
			'flooring'		: newtemp
			'budget'			: budget

		$.each filters[0],(index,value)->
			if $.inArray(index , project.get('filters').Apartment) ==  -1 && index != 'budget' && index != 'unitVariants'
				filters[0][index] = []
		
		filters


		#function to generate all the plot filters
	getPlotFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
		flooringAttributes = []
		budget = []
		flooring = []
		temp = []
		newtemp = []
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

				$.each project.get('filters').Plot , (index,value)->
					temp = []
					$.each item.get('variant_attributes') ,(ind,val)->
						if ind == value && $.inArray(value,flooring) is -1 && val != ""
							flooring.push value
							temp.push
								'name' : val
								'id' : s.replaceAll(val, " ", "_")
								'classname' : 'attributes'
								'label' : ind
								type: 'P'
							newtemp.push 
								'label' : ind.toUpperCase()
								'value' : temp
								
				# if $.inArray(item.get('variant_attributes').flooring,flooring) == -1 && ! _.isUndefined item.get('variant_attributes').flooring
				# 	flooring.push item.get('variant_attributes').flooring
				# 	flooringAttributes.push
				# 			'id' : item.get('variant_attributes').flooring
				# 			'name' : item.get('variant_attributes').flooring
				# 			type: 'P'

				
		unitsArr = plotVariantMasterCollection.getPlotUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]	
		filters.push
			'unitTypes' 	: unitTypes
			'unitVariants'  : unitVariants
			'unitVariantNames' : unitVariantNames
			'flooring'			: newtemp
			'budget'			: budget

		$.each filters[0],(index,value)->
			if $.inArray(index , project.get('filters').Plot) ==  -1 && index != 'budget' && index != 'unitVariants'
				filters[0][index] = []
		
		filters
								
