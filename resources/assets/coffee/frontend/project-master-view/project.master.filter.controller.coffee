class CommonFloor.FilterMsterView extends Marionette.ItemView

	template : Handlebars.compile('{{#villaFilters}}
									<div class="filters-wrapper">
										<div class="filter-chkbox-block">
											
											<label for="villa">Villa</label>
										</div>
										
										Unit Types
										{{#unitTypes}}
										<div class="filter-chkbox-block">

											<input type="checkbox" class="villaFilters unit_types custom-chckbx" name="unit_type{{id}}" id="unit_type{{id}}" value="1" data-value={{id}} />
											<label for="unit_type{{id}}">{{name}}</label>

										</div>
										{{/unitTypes}}

										<br/>
										Unit Variants
										<br/>
										{{#unitVariants}}
										<div class="filter-chkbox-block">

											<input type="checkbox" class="villaFilters unitvariants custom-chckbx" name="unit_variant{{id}}" id="unit_variant{{id}}" value="1" data-value={{id}} />
											<label for="unit_variant{{id}}">{{area}} Sq.Ft</label>

										</div>
										{{/unitVariants}}
										<br/>
										
										Availability
										<br/>
										{{#status}}
										<div class="filter-chkbox-block">

											<input type="checkbox" class="villaFilters status custom-chckbx" name="{{name}}" id="{{name}}" value="1"  />
											<label for="{{name}}">{{name}}</label>

										</div>
										{{/status}}

									</div>
									{{/villaFilters}}

								<br/>
								{{#apartmentFilters}}
									Apartments
									<br/>Unit Types
									{{#unitTypes}}

										<input type="checkbox" class="aptFilters unit_types" name="unit_type{{id}}" id="unit_type{{id}}" value="1" data-value={{id}} />
										<label for="unit_type{{id}}">{{name}}</label>
									{{/unitTypes}}

									<br/>
									Unit Variants
									<br/>
									{{#unitVariants}}

										<input type="checkbox" class="aptFilters unitvariants" name="unit_variant{{id}}" id="unit_variant{{id}}" value="1" data-value={{id}} />
										<label for="unit_variant{{id}}">{{area}} Sq.Ft</label>
									{{/unitVariants}}
									<br/>
									Availability
									<br/>
									{{#status}}

										<input type="checkbox" class="aptFilters status" name="{{name}}" id="{{name}}" value="1"  />{{name}} 

									{{/status}}

								{{/apartmentFilters}}
								<br/>
								{{#plotFilters}}
									<div class="filters-wrapper">
										<div class="filter-chkbox-block">
											
											<label for="villa">Plot</label>
										</div>
										
										Unit Types
										{{#unitTypes}}
										<div class="filter-chkbox-block">

											<input type="checkbox" class="villaFilters unit_types custom-chckbx" name="unit_type{{id}}" id="unit_type{{id}}" value="1" data-value={{id}} />
											<label for="unit_type{{id}}">{{name}}</label>

										</div>
										{{/unitTypes}}

										<br/>
										Unit Variants
										<br/>
										{{#unitVariants}}
										<div class="filter-chkbox-block">

											<input type="checkbox" class="villaFilters unitvariants custom-chckbx" name="unit_variant{{id}}" id="unit_variant{{id}}" value="1" data-value={{id}} />
											<label for="unit_variant{{id}}">{{area}} Sq.Ft</label>

										</div>
										{{/unitVariants}}
										
										<br/>
										Availability
										<br/>
										{{#status}}
										<div class="filter-chkbox-block">

											<input type="checkbox" class="villaFilters status custom-chckbx" name="{{name}}" id="{{name}}" value="1"  />
											<label for="{{name}}">{{name}}</label>

										</div>
										{{/status}}

									</div>
									{{/plotFilters}}
									Budget
										<br/>
										<select class="price_min" name="price_min">
											<option selected="" value="">Min</option> <option value="500000">5 Lac</option>
											 <option value="1000000">10 Lac</option> <option value="2000000">20 Lac</option> 
											 <option value="3000000">30 Lac</option> <option value="4000000">40 Lac</option> 
											 <option value="5000000">50 Lac</option> <option value="6000000">60 Lac</option> 
											 <option value="7000000">70 Lac</option> <option value="8000000">80 Lac</option> 
											 <option value="9000000">90 Lac</option> <option value="10000000">1 Cr</option> 
											 <option value="12000000">1.2 Cr</option> <option value="14000000">1.4 Cr</option> 
											 <option value="16000000">1.6 Cr</option> <option value="18000000">1.8 Cr</option> 
											 <option value="20000000">2 Cr</option> <option value="23000000">2.3 Cr</option> 
											 <option value="26000000">2.6 Cr</option> <option value="30000000">3 Cr</option> 
											 <option value="35000000">3.5 Cr</option> <option value="40000000">4 Cr</option> 
											 <option value="45000000">4.5 Cr</option> <option value="50000000">5 Cr</option>
										</select>
										<select class="price_max" name="pice_max">
											<option style="display: block;" selected="" value="">Max</option> <option style="display: none;" value="500000">5 Lac</option> 
											<option style="display: none;" value="1000000">10 Lac</option> <option style="display: block;" value="2000000">20 Lac</option> 
											<option style="display: block;" value="3000000">30 Lac</option> <option style="display: block;" value="4000000">40 Lac</option> 
											<option style="display: block;" value="5000000">50 Lac</option> <option style="display: block;" value="6000000">60 Lac</option> 
											<option style="display: block;" value="7000000">70 Lac</option> <option style="display: block;" value="8000000">80 Lac</option> 
											<option style="display: block;" value="9000000">90 Lac</option> <option style="display: block;" value="10000000">1 Cr</option> 
											<option style="display: block;" value="12000000">1.2 Cr</option> <option style="display: block;" value="14000000">1.4 Cr</option> 
											<option style="display: block;" value="16000000">1.6 Cr</option> <option style="display: block;" value="18000000">1.8 Cr</option> 
											<option style="display: block;" value="20000000">2 Cr</option> <option style="display: block;" value="23000000">2.3 Cr</option> 
											<option style="display: block;" value="26000000">2.6 Cr</option> <option style="display: block;" value="30000000">3 Cr</option> 
											<option style="display: block;" value="35000000">3.5 Cr</option> <option style="display: block;" value="40000000">4 Cr</option> 
											<option style="display: block;" value="45000000">4.5 Cr</option> <option style="display: block;" value="50000000">5 Cr</option> 
											<option style="display: block;" value="999999900">&gt; 5 Cr</option></select>
										
										<br/>
								<input type="button" name="apply" class="apply" value="Apply" />

								')

	initialize:->
		@unitTypes = []
		@unitVariants = []
		# @price = []
		@status = []


	ui:
		villaPropType : 'input[name="villa"]'
		villaFilters : '.villaFilters'
		apartmentPropType : 'input[name="apartment"]'
		aptFilters : '.aptFilters'
		unitTypes : '.unit_types'
		unitVariants : '.unitvariants'
		priceMin : '.price_min'
		priceMax : '.price_max'
		status : '.status'
		apply : '.apply'

	events:
		# 'click @ui.villaPropType':(e)->
		# 	if $(e.target).is(':checked')
		# 		$(@ui.villaFilters).prop('checked' ,true)
		# 		$(@ui.villaFilters).prop('disabled' ,false)
		# 	else
		# 		$(@ui.villaFilters).prop('checked' ,false)
		# 		$(@ui.villaFilters).prop('disabled' ,true)

		# 'click @ui.apartmentPropType':(e)->
		# 	if $(e.target).is(':checked')
		# 		$(@ui.aptFilters).prop('checked' ,true)
		# 		$(@ui.aptFilters).prop('disabled' ,false)
		# 	else
		# 		$(@ui.aptFilters).prop('checked' ,false)
		# 		$(@ui.aptFilters).prop('disabled' ,true)

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
			
			


		'click @ui.unitVariants':(e)->
			if $(e.currentTarget).is(':checked')
				@unitVariants.push parseInt $(e.currentTarget).attr('data-value')
			else
				@unitVariants = _.without @unitVariants ,parseInt $(e.currentTarget).attr('data-value')
			CommonFloor.defaults['unitVariants'] = @unitVariants.join(',')
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
			if $(e.currentTarget).is(':checked')
				@status.push  e.currentTarget.id
			else
				@status = _.without @status , e.currentTarget.id
			console.log @status
			CommonFloor.defaults['availability'] = @status.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			# @resetFilters()


		'click @ui.apply':(e)->
			# @region =  new Marionette.Region el : '#leftregion'
			# new CommonFloor.LeftMasterCtrl region : @region


			
	
	#function to check the filters dependency
	resetFilters:->
		unittypes = []
		apartments = []
		bunglows = []
		status = []
		unitTypeTempCollection.each (item)->
			unittypes.push item.get 'id'
		apartmentVariantTempCollection.each (item)->
			apartments.push item.get 'id'
		bunglowVariantTempCollection.each (item)->
			bunglows.push item.get 'id'
		unitTempCollection.each (item)->
			status.push item.get 'availability'
		
		$(@ui.unitTypes).each (ind,item)->
			$('#'+item.id).prop('checked',true)
			if $.inArray(parseInt(item.id),unittypes) is -1
				$('#'+item.id).prop('checked',false)
		$(@ui.unitVariants).each (ind,item)->
			$('#'+item.id).prop('checked',true)
			if $.inArray(parseInt(item.id),apartments) is -1 && apartmentVariantTempCollection.length != 0
				$('#'+item.id).prop('checked',false)
			if $.inArray(parseInt(item.id),bunglows) is -1 && bunglowVariantTempCollection.length != 0
				$('#'+item.id).prop('checked',false)
		$(@ui.status).each (ind,item)->
			$('#'+item.id).prop('checked',true)
			if $.inArray(item.id,status) is -1
				$('#'+item.id).prop('checked',false)





	serializeData:->
		data = super()
		data.villaFilters = Marionette.getOption(@,'villaFilters')
		data.apartmentFilters = Marionette.getOption(@,'apartmentFilters')
		data.plotFilters = Marionette.getOption(@,'plotFilters')
		data

	onShow:->
		CommonFloor.defaults['price_min'] = 0
		CommonFloor.defaults['price_max'] = 999999900
		villaFilters = Marionette.getOption(@,'villaFilters')
		apartmentFilters = Marionette.getOption(@,'apartmentFilters')
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
		villaFilters = @getVillaFilters()
		apartmentFilters = @getApartmentFilters()
		plotFilters = @getPlotFilters()
		@view = view = new CommonFloor.FilterMsterView
				'villaFilters' : villaFilters
				'apartmentFilters' : apartmentFilters
				'plotFilters'		: plotFilters

		# @listenTo @view,"load:units" ,@loadController
		
		@show @view

	loadController:->
		apartmentFilters = @getApartmentFilters()
		@view.triggerMethod "filter:data", apartmentFilters

	#function to generate all the villa filters
	getVillaFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		status = []
		bunglowVariantCollection.each (item)->
			unitTypeModel = unitTypeCollection.findWhere
								'id' : item.get 'unit_type_id'
			if $.inArray(item.get('unit_type_id'),unit_types) == -1
				unit_types.push parseInt unitTypeModel.get 'id'
				unitTypes.push 
						'id' : unitTypeModel.get 'id'
						'name' : unitTypeModel.get 'name'
			unitVariants.push 
					'id' : item.get 'id'
					'area' : item.get 'super_built_up_area'
			
		status = []
		status_arr = []
		villaUnits = bunglowVariantCollection.getBunglowUnits()
		$.each villaUnits,(index,value)->
			if ($.inArray value.get('availability') , status_arr) ==  -1
				status_arr.push value.get 'availability'
				status.push 'name': s.humanize value.get 'availability'
		
		if unitVariants.length != 0
			filters.push
					'unitTypes' 	: unitTypes
					'unitVariants'  : unitVariants
					'status'		: status


		filters

	#function to generate all the apartment filters
	getApartmentFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		status = []
		apartmentVariantCollection.each (item)->
			unitTypeModel = unitTypeCollection.findWhere
								'id' : item.get 'unit_type_id'
			if $.inArray(item.get('unit_type_id'),unit_types) == -1
				unit_types.push parseInt unitTypeModel.get 'id'
				unitTypes.push 
						'id' : unitTypeModel.get 'id'
						'name' : unitTypeModel.get 'name'
			unitVariants.push 
					'id' : item.get 'id'
					'area' : item.get 'super_built_up_area'
			
		status = []
		status_arr = []
		apartmentUnits = apartmentVariantCollection.getApartmentUnits()
		$.each apartmentUnits,(index,value)->
			if ($.inArray value.get('availability') , status_arr) ==  -1
				status_arr.push value.get 'availability'
				status.push 'name': s.humanize value.get 'availability'
		if unitVariants.length != 0
			filters.push
					'unitTypes' 	: unitTypes
					'unitVariants'  : unitVariants
					'status'		: status
		filters


		#function to generate all the plot filters
	getPlotFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		status = []
		plotVariantCollection.each (item)->
			unitTypeModel = unitTypeCollection.findWhere
								'id' : item.get 'unit_type_id'
			if $.inArray(item.get('unit_type_id'),unit_types) == -1
				unit_types.push parseInt unitTypeModel.get 'id'
				unitTypes.push 
						'id' : unitTypeModel.get 'id'
						'name' : unitTypeModel.get 'name'
			unitVariants.push 
					'id' : item.get 'id'
					'area' : item.get 'size'
			
		status = []
		status_arr = []
		plotUnits = plotVariantCollection.getPlotUnits()
		$.each plotUnits,(index,value)->
			if ($.inArray value.get('availability') , status_arr) ==  -1
				status_arr.push value.get 'availability'
				status.push 'name': s.humanize value.get 'availability'
		if unitVariants.length != 0
			filters.push
					'unitTypes' 	: unitTypes
					'unitVariants'  : unitVariants
					'status'		: status
		filters
								
