
class CommonFloor.FilterMsterView extends Marionette.ItemView

	template : Handlebars.compile('
         <a href="javascript:void(0)" class="text-primary filters-clear clear">Clear Filters </a> <button class="btn btn-primary filter-button filter-toggle" type="button"> <span class="icon"></span> </button> 
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
				                      <div class="viewLabel">
				                        <h6 class="">VIEWS</h6>
				                        <div class="filter-chkbox-block"> 
				                        {{#views}}
				                        
				                          <input type="checkbox" class="custom-chckbx addCft views " id="{{id}}" value="{{id}}"  > <label for="{{id}}" class="-lbl  ">{{name}}</label>  
				                        
				                       {{/views}} 
				                         </div>
				                     </div>
				                      <div class="facingLabel">
				                        <h6 class="">FACINGS</h6>
				                        <div class="filter-chkbox-block"> 
				                        {{#facings}}
				                         
				                          <input type="checkbox" class="custom-chckbx addCft facings " id="{{id}}" value="{{id}}"  > <label for="{{id}}" class="-lbl  ">{{name}}</label>  
				                          
				                       {{/facings}} 
				                         </div>
				                     </div>
     
           
               
                     <div class="areaLabel">
                         <h6 class="">AREA ({{measurement_units}})</h6>
                        	<div class="range-container">
                        		<input type="text" id="area" name="area" value="" />
                        	</div>                     </div>
                     <div class="budgetLabel">
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
          		<span class="icon"></span> Back
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
           	<input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}" data-type="villa" > 
            <label for="{{id}}" class="-lbl">{{name}}</label> 
		   {{/value}}
		  </div>
		  </div>
		   {{/flooring}}
		  {{/villas}}</div>
	<div class="filters-wrapper-hover  filters-wrapper apartment-wrapper">
          <div class="arrow-left"> </div>
          	<button class="btn btn-primary filter-button back_btn" type="button"> 
          		<span class="icon"></span> Back
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
           	<input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}" data-type="apartment" > 
            <label for="{{id}}" class="-lbl">{{name}}</label> 
		   {{/value}}
		  </div>
		  </div>
		   {{/flooring}}

		  {{/apartments}}</div>
	<div class="filters-wrapper-hover  filters-wrapper plot-wrapper">
          <div class="arrow-left"> </div>
          	<button class="btn btn-primary filter-button back_btn" type="button"> 
          		<span class="icon"></span> Back
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
           	<input type="checkbox" class="custom-chckbx addCft {{classname}}" id="{{id}}" value="{{id}}" value="1" data-value="{{name}}" data-type="plot" > 
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
		back_btn : '.back_btn'
		facings : '.facings'
		views : '.views'

	initialize:->
		@price = ''
		@area = ''
		
		

	events:

		'click @ui.clear':(e)->
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
			types =   _.uniq types 
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
			types =   _.uniq types 
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
			CommonFloor.resetCollections()
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
			CommonFloor.resetCollections()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')

		'click @ui.status':(e)->
			if $(e.currentTarget).is(':checked')
				CommonFloor.defaults['common']['availability'] = e.currentTarget.id
			else
				CommonFloor.defaults['common']['availability'] = ""
				
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			# @resetFilters()


		'change @ui.area':(e)->
			CommonFloor.defaults['common']['area_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['common']['area_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')

		'change @ui.budget':(e)->
			CommonFloor.defaults['common']['price_max'] = parseFloat $(e.target).val().split(';')[1]
			CommonFloor.defaults['common']['price_min'] = parseFloat $(e.target).val().split(';')[0]
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')

		'click @ui.views':(e)->
			types = []
			if CommonFloor.defaults['common']['views']!= ""
				types = CommonFloor.defaults['common']['views'].split(',')
			
			if $(e.currentTarget).is(':checked')
				types.push  $(e.currentTarget).val()
			else
				types = _.without types ,$(e.currentTarget).val()
			types =   _.uniq types
			CommonFloor.defaults['common']['views'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')

		'click @ui.facings':(e)->
			types = []
			if CommonFloor.defaults['common']['facings']!= ""
				types = CommonFloor.defaults['common']['facings'].split(',')
			
			
			if $(e.currentTarget).is(':checked')
				types.push  $(e.currentTarget).val()
			else
				types = _.without types ,$(e.currentTarget).val()
			types =   _.uniq types
			CommonFloor.defaults['common']['facings'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
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
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			

		'click .filter-toggle':(e)->
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
		data.views = Marionette.getOption(@,'views')
		data.facings = Marionette.getOption(@,'facings')
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
		submin = min % 5
		min = min - submin
		max = _.max area
		submax = max % 5
		max = max - submax
		subArea = (max - min)/ 20 
		subArea = subArea.toFixed(0)
		sub  = subArea % 5
		subArea = subArea - sub
		
		if CommonFloor.defaults['common']['area_min'] != ""
			$("#area").ionRangeSlider(
			    type: "double",
			    min: min,
			    max:  max,
			    from : CommonFloor.defaults['common']['area_min'],
				to : CommonFloor.defaults['common']['area_max'],
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
		

		if CommonFloor.defaults['common']['price_min'] != ""
			$("#budget").ionRangeSlider(
			    type: "double",
			    min: priceMin,
			    max: priceMax,
			    from : CommonFloor.defaults['common']['price_min'],
			    to : CommonFloor.defaults['common']['price_max'],
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
		
		@loadSelectedFilters()

	hideLabels:->
		villas = Marionette.getOption(@,'villas')
		apartments = Marionette.getOption(@,'apartments')
		plots = Marionette.getOption(@,'plots')
		views = Marionette.getOption(@,'views')
		facings = Marionette.getOption(@,'facings')
		budget = Marionette.getOption(@,'budget')
		unitVariants = Marionette.getOption(@,'unitVariants')
		types = Marionette.getOption(@,'types')
		$.each villas[0] , (index,value)->
			if value.length is 0
				$('.villa_'+index).hide()
		$.each apartments[0] , (index,value)->
			if value.length is 0
				$('.apartment_'+index).hide()
		$.each plots[0] , (index,value)->
			if value.length is 0
				$('.plot_'+index).hide()
		if views.length is 0
			$('.viewLabel').hide()
		if facings.length is 0
			$('.facingLabel').hide()
		if budget.length is 0
			$('.budgetLabel').hide()
		if unitVariants.length is 0
			$('.areaLabel').hide()
		if types.length is 0
			$('.property_type').hide()


	loadClearFilter:->
		budget = []
		area = []
		$.each unitMasterCollection.toArray(), (index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			budget.push parseFloat unitDetails[3]
			area.push parseFloat unitDetails[0].get 'super_built_up_area'
		min = _.min area
		submin = min % 5
		min = min - submin
		max = _.max area
		submax = max % 5
		max = max - submax
		subArea = (max - min)/ 20 
		subArea = subArea.toFixed(0)
		sub  = subArea % 5
		subArea = subArea - sub
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

		views = []
		$.merge views , CommonFloor.defaults['common']['views'].split(',')

		facings = []
		$.merge facings , CommonFloor.defaults['common']['facings'].split(',')

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
			if $.inArray($(item).attr('data-value'),attributes) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)

		$(@ui.views).each (ind,item)->
			$('#'+item.id).prop('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($(item).val(),views) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)

		$(@ui.facings).each (ind,item)->
			$('#'+item.id).prop('checked',true)
			$('#'+item.id).attr('disabled',false)
			if $.inArray($(item).val(),facings) is -1 
				$('#'+item.id).prop('checked',false)
				$('#'+item.id).attr('disabled',false)
		
		
		@ui.status.prop('checked',false)
		if CommonFloor.defaults['common']['availability'] != "" 
			 @ui.status.prop('checked',true)

		


		
		
		
	


class CommonFloor.FilterMasterCtrl extends Marionette.RegionController

	initialize:->
		unitVariants = []
		budget = []
		views = []
		facings = []
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


		if $.inArray('budget' , project.get('filters').defaults) ==  -1 ||  _.isUndefined project.get('filters').defaults
				budget = []

		if $.inArray('area' , project.get('filters').defaults) ==  -1 ||  _.isUndefined project.get('filters').defaults
				unitVariants = []
			

		viewsFacingsArr = @getViewsFacings() 
		views = viewsFacingsArr[0]
		facings = viewsFacingsArr[1]
		data = CommonFloor.masterPropertyTypes()
		types = $.grep(data, (e)->
			if _.has(project.get('filters'), s.capitalize(e.name)) && e.count.length > 0
				return e
		    
		)
		$.each types,(index,value)->
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
				'views' : views
				'facings' : facings

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
		if ! _.isUndefined project.get('filters').Villa
			$.each project.get('filters').Villa , (index,value)->
				if value != 'unitTypes' && value!= 'unitVariantNames'
					temp = []
					bunglowVariantMasterCollection.each (item)->
						units = unitMasterCollection.where 
									'unit_variant_id' : item.get('id')
				
						if units.length != 0
							
							$.each item.get('variant_attributes') ,(ind,val)->
								if ind == value && $.inArray(val,flooring) is -1 && val != ""
									flooring.push val
									temp.push
										'name' : val
										'id' : 'villa'+s.replaceAll(val, " ", "_")
										'dataId' : s.replaceAll(val, " ", "_")
										'classname' : 'attributes'
										'label' : ind
										type: 'V'
					if temp.length != 0 
						newtemp.push 
							'label' : value.toUpperCase()
							'value' : temp
							'index' : value
				
					
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
			if $.inArray(index , project.get('filters').Villa) ==  -1 && index != 'budget' && index != 'unitVariants'  && index != 'flooring'
				filters[0][index] = []

			if index == 'flooring'
				$.each value,(ind,val)->
					if $.inArray(val.index , project.get('filters').Villa) ==  -1 
						value[ind] = []
				
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
				
		if ! _.isUndefined project.get('filters').Apartment
			$.each project.get('filters').Apartment , (index,value)->
				if value != 'unitTypes' && value!= 'unitVariantNames'
					temp = []
					apartmentVariantMasterCollection.each (item)->
						units = unitMasterCollection.where 
									'unit_variant_id' : item.get('id')
				
						if units.length != 0
							
							$.each item.get('variant_attributes') ,(ind,val)->
								if ind == value && $.inArray(val,flooring) is -1 && val != ""
									flooring.push val
									temp.push
										'name' : val
										'id' : 'villa'+s.replaceAll(val, " ", "_")
										'dataId' : s.replaceAll(val, " ", "_")
										'classname' : 'attributes'
										'label' : ind
										type: 'A'
					if temp.length != 0 
						newtemp.push 
							'label' : value.toUpperCase()
							'value' : temp
							'index' : value

			
				

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
			if $.inArray(index , project.get('filters').Apartment) ==  -1 && index != 'budget' && index != 'unitVariants'  && index != 'flooring'
				filters[0][index] = []

			if index == 'flooring'
				$.each value,(ind,val)->
					if $.inArray(val.index , project.get('filters').Apartment) ==  -1 
						value[ind] = []

		
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

		if ! _.isUndefined project.get('filters').Plot
			$.each project.get('filters').Plot , (index,value)->
				if value != 'unitTypes' && value!= 'unitVariantNames'
					temp = []
					plotVariantMasterCollection.each (item)->
						units = unitMasterCollection.where 
									'unit_variant_id' : item.get('id')
				
						if units.length != 0
							
							$.each item.get('variant_attributes') ,(ind,val)->
								if ind == value && $.inArray(val,flooring) is -1 && val != ""
									flooring.push val
									temp.push
										'name' : val
										'id' : 'villa'+s.replaceAll(val, " ", "_")
										'dataId' : s.replaceAll(val, " ", "_")
										'classname' : 'attributes'
										'label' : ind
										type: 'A'
					if temp.length != 0 
						newtemp.push 
							'label' : value.toUpperCase()
							'value' : temp
							'index' : value
			
			
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
			if $.inArray(index , project.get('filters').Plot) ==  -1 && index != 'budget' && index != 'unitVariants' &&  index != 'flooring'
				filters[0][index] = []

			if index == 'flooring'
				$.each value,(ind,val)->
					if $.inArray(val.index , project.get('filters').Plot) ==  -1 
						value[ind] = []

	
		
		filters

	getViewsFacings:->
		views = []
		viewArr = []
		facingsArr = []
		_.each unitCollection.toArray(),(item)->
			$.merge views , item.get('views')

		views = _.uniq views

		$.each views , (ind,val)->
			viewArr.push
				'id' : val
				'name' : val

		facings = ['North' , 'South' ,'East' , 'West' , 'North-East','Norht-West','South-East','South-West']						

		$.each facings , (ind,val)->
			facingsArr.push
				'id' : val
				'name' : val

		if $.inArray('views' , project.get('filters').defaults) ==  -1 ||  _.isUndefined project.get('filters').defaults
				viewArr = []

		if $.inArray('direction' , project.get('filters').defaults) ==  -1 ||  _.isUndefined project.get('filters').defaults
				facingsArr = []

		[viewArr,facingsArr]