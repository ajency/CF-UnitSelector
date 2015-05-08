class CommonFloor.FilterMsterView extends Marionette.ItemView

	template : Handlebars.compile('
									<div class="collapse" id="collapsefilters">
										

									
										
										  <div class="filters-wrapper">	

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
											<div class="row">
							                    <div class=" col-xs-12 col-sm-12 search-left-content">
							                         <div class="filters-wrapper">
							                              <div class="row">
							                                  <div class="col-sm-4 col-md-4 ">
							                                    <h5># AREA (Sqft)</h5>
							                                <input type="text" id="example_id" name="example_name" value="" />
							  
							                                  </div>
							                                  <div class="col-sm-4 col-md-4 ">
							                                    <h5># BUDGET </h5>
							                                    <input type="text" id="budget" name="example_name" value="" />
							                                  </div>
							                                  <div class="col-sm-4 col-md-4 ">
							                                  
							                                  </div>
							                              </div>  
							                          </div>
							                      </div>
							                  </div>


										<div class="filters-wrapper">
											<div class="blck-wrap clearfix">
													<h5>Budget</h5>
													<select class="price_min form-control budget-range min-budget addCft" name="price_min">
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
													<select class="price_max form-control budget-range addCft" name="pice_max">
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
														<option style="display: block;" value="999999900">&gt; 5 Cr</option>
													</select>
											</div>
										</div>
										<div class="filters-wrapper">
											<div class="blck-wrap">
												<h5>Availability</h5>
												<div class="filter-chkbox-block">
													{{#status}}
													<input type="checkbox" class="aptFilters status custom-chckbx" name="{{id}}" id="{{id}}" value="1"  />
													<label for="{{id}}">{{name}}</label>
													{{/status}}
												</div>
											</div>
										</div>
									</div>


									')


	initialize:->
		@unitTypes = []
		@unitVariants = []
		@variantNames = []
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
		variantNames : '.variant_names'

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
			
		'click @ui.variantNames':(e)->
			if $(e.currentTarget).is(':checked')
				@variantNames.push parseInt $(e.currentTarget).attr('data-value')
			else
				@variantNames = _.without @variantNames ,parseInt $(e.currentTarget).attr('data-value')
			CommonFloor.defaults['unitVariants'] = @variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()	


		'click @ui.unitVariants':(e)->
			if $(e.currentTarget).is(':checked')
				@unitVariants.push parseInt $(e.currentTarget).attr('data-value')
			else
				@unitVariants = _.without @unitVariants ,parseInt $(e.currentTarget).attr('data-value')
			CommonFloor.defaults['area'] = @unitVariants.join(',')
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
		data.unitTypes = Marionette.getOption(@,'unitTypes')
		data.unitVariants = Marionette.getOption(@,'unitVariants')
		data.unitVariantNames = Marionette.getOption(@,'unitVariantNames')
		data

	onShow:->
		CommonFloor.defaults['price_min'] = 0
		CommonFloor.defaults['price_max'] = 999999900
		unitVariants = Marionette.getOption(@,'unitVariants')
		min = _.min unitVariants
		max = _.max unitVariants
		$("#example_id").ionRangeSlider(
		    type: "double",
		    min: min,
		    max: max,
		    grid: false
		)
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
		villaFilters = @getVillaFilters()
		$.merge unitTypes , villaFilters[0].unitTypes
		$.merge unitVariants , villaFilters[0].unitVariants
		$.merge unitVariantNames , villaFilters[0].unitVariantNames
		apartmentFilters = @getApartmentFilters()
		$.merge unitTypes , apartmentFilters[0].unitTypes
		$.merge unitVariants , apartmentFilters[0].unitVariants
		$.merge unitVariantNames , apartmentFilters[0].unitVariantNames
		plotFilters = @getPlotFilters()
		$.merge unitTypes , plotFilters[0].unitTypes
		$.merge unitVariants , plotFilters[0].unitVariants
		$.merge unitVariantNames , plotFilters[0].unitVariantNames
		console.log unitTypes
		console.log unitVariants
		@view = view = new CommonFloor.FilterMsterView
				'unitTypes' : unitTypes
				'unitVariants' : _.uniq unitVariants
				'unitVariantNames' : unitVariantNames

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
		unitVariantNames = []
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
			
		if unitVariants.length != 0
			filters.push
					'unitTypes' 	: unitTypes
					'unitVariants'  : unitVariants
					'unitVariantNames' : unitVariantNames


		filters

	#function to generate all the apartment filters
	getApartmentFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
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
							'type'	: 'B'
				unitVariants.push item.get 'super_built_up_area'
				unitVariantNames.push
						'id' : item.get 'id'
						'name'	: item.get 'unit_variant_name'
						'type'	: 'A'
			
		if unitVariants.length != 0
			filters.push
					'unitTypes' 	: unitTypes
					'unitVariants'  : unitVariants
					'unitVariantNames' : unitVariantNames
		filters


		#function to generate all the plot filters
	getPlotFilters:->
		filters = []
		unitTypes = []
		unit_types = []
		unitVariants = []
		unitVariantNames = []
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
			
		if unitVariants.length != 0
			filters.push
					'unitTypes' 	: unitTypes
					'unitVariants'  : unitVariants
					'unitVariantNames' : unitVariantNames
		filters
								
