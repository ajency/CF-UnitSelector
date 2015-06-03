class CommonFloor.ProjectListView extends Marionette.LayoutView

	template : '#project-listview-template'

#starting point for Project List view 
class CommonFloor.ProjectListCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
		if bunglowVariantCollection.length == 0 && apartmentVariantCollection.length == 0 && plotVariantCollection.length == 0  
			@show new CommonFloor.NothingFoundView
		else
			@show new CommonFloor.ProjectListView
		
		

#view for the top setion
class TopListView extends Marionette.ItemView

	template : Handlebars.compile('<div class="container-fluid">
										<div class="row">
											<div class="col-md-12 col-xs-12 col-sm-12 text-center">

												<div class="breadcrumb-bar">
													<a class="unit_back" href="#">
														
													</a>
												</div>
												<div class="header-info">
												<h2 class="proj-name pull-left">{{project_title}}</h2>
															<div class="proj-type-count">
																{{#types}} 
																<p class="pull-right">{{type}}</p><h2 class=" pull-right m-t-10">{{count.length}}</h2> 
																{{/types}}
															</div>
															<div class="clearfix"></div>
													</div>			
											</div>
										</div>
									</div>

									

										
							            <div class="pull-left filter-result full">
							              	 <ul  id="flexiselDemo1">
							              	 {{#area}}
													         	 <li>
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													         </li>
													         {{/area}}
													     {{#budget}}
													         	 <li>
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													         </li>
													         {{/budget}}

													         
													      {{#views}}
													         	 <li>
													                <div class="filter-pill"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> 
													         </li>
													         {{/views}}

													       {{#facings}}
													         	 <li>
													                <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> 
													         </li>
													         {{/facings}}

													      {{#status}}
													         	 <li>
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													         </li>
													         {{/status}}
														 {{#each  filters}} 
													          <li>
													              <div class="filter-title"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"></span> </div>
													         </li>
													         {{#filters}}
													         	{{#each this}}
													         	{{#each this}}
													          <li>
													                <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													         </li>{{/each}}
													         {{/each}}
													         {{/filters}}
													        
													    {{/each}}
													     
													    </ul>						               
							            </div>
							
										<div class="clearfix"></div>
								')

	ui  :
		unitBack : '.unit_back'
		unitTypes : '.unit_types'
		priceMin : '.price_min'
		priceMax : '.price_max'
		status : '#filter_available'
		apply : '.apply'
		variantNames : '.variant_names'
		area : '#filter_area'
		budget : '#filter_budget'
		types : '.types'
		filter_flooring : '.filter_flooring'
		views : '.views'
		facings : '.facings'

	serializeData:->
		data = super()
		status = CommonFloor.getStatusFilters()
		if status.length != 0
			data.status = status
		main = CommonFloor.getFilters()
		console.log data.filters  = main[0].filters
		data.area  = main[0].area
		data.budget  = main[0].price
		data.status  = main[0].status
		data.views  = main[0].views
		data.facings  = main[0].facings
		response = CommonFloor.propertyTypes() 
		data.types = response
		data


	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			# $.each CommonFloor.defaults , (index,value)->
			# 	 CommonFloor.defaults[index] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')
			CommonFloor.navigate '/' , true

		'click @ui.types':(e)->
			arr = CommonFloor.defaults['type'].split(',')
			index = arr.indexOf $(e.target).attr('data-id')
			arr.splice(index, 1)
			CommonFloor.defaults['type'] = arr.join(',')
			
			if $(e.target).attr('data-id') == 'villa'
				@removeVillaFilters()
			if $(e.target).attr('data-id') == 'apartment'
				@removeAptFilters()
			if $(e.target).attr('data-id') == 'plot'
				@removePlotFilters()
			
			@trigger  'render:view'
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			
			

			
		'click @ui.unitTypes':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			if CommonFloor.defaults[type]['unit_type_id']!= ""
				types = CommonFloor.defaults[type]['unit_type_id'].split(',')
				types = types.map (item)->
					return parseInt item
			console.log types
			types = _.without types , parseInt $(e.currentTarget).attr('data-id')
			console.log types
			CommonFloor.defaults[type]['unit_type_id'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'
			
		'click @ui.variantNames':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			if CommonFloor.defaults[type]['unit_variant_id']!= ""
				types = CommonFloor.defaults[type]['unit_variant_id'].split(',')
				types = types.map (item)->
					return parseInt item
			console.log types
			types = _.without types , parseInt $(e.currentTarget).attr('data-id')
			CommonFloor.defaults[type]['unit_variant_id'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.status':(e)->
			CommonFloor.defaults['common']['availability'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'

			

		'click @ui.area':(e)->
			CommonFloor.defaults['common']['area_max'] = ""
			CommonFloor.defaults['common']['area_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.budget':(e)->
			CommonFloor.defaults['common']['price_max'] = ""
			CommonFloor.defaults['common']['price_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.filter_flooring':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			if CommonFloor.defaults[type]['attributes']!= ""
				types = CommonFloor.defaults[type]['attributes'].split(',')
				
			console.log types
			types = _.without types , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults[type]['attributes'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.facings':(e)->
			types = CommonFloor.defaults['common']['facings'].split(',')
			types = _.without types ,$(e.currentTarget).attr('data-id')
			CommonFloor.defaults['common']['facings'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.views':(e)->
			types = CommonFloor.defaults['common']['views'].split(',')
			types = _.without types ,$(e.currentTarget).attr('data-id')
			CommonFloor.defaults['common']['views'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')
			@trigger  'render:view'

		# 'click @ui.filter_flooring':(e)->
		# 	flooring = CommonFloor.defaults['flooring'].split(',')
		# 	flooring = _.without flooring , $(e.currentTarget).attr('data-id')
		# 	CommonFloor.defaults['flooring'] = flooring.join(',')
		# 	unitCollection.reset unitMasterCollection.toArray()
		# 	CommonFloor.filter()
		# 	unitCollection.trigger('available')
		# 	@trigger  'render:view'

	onShow:->
		$("#flexiselDemo1").flexisel(
		    visibleItems: 11,
		    animationSpeed: 200,
		    autoPlay: false,
		    autoPlaySpeed: 1000,
		    clone:false,
		    enableResponsiveBreakpoints: true,
		    responsiveBreakpoints: {
		      portrait: {
		        changePoint:480,
		        visibleItems: 5
		      }, 
		      landscape: {
		        changePoint:640,
		        visibleItems: 6
		      },
		      tablet: {
		        changePoint:768,
		        visibleItems: 3
		      }
		    }
		)
		response = CommonFloor.propertyTypes() 
		if response.length == 0
			$('.proj-type-count').html '<p class="p-l-15">No results found</p>'


	removeVillaFilters:->
		variants = []
		unittypes = []
		unitsArr = bunglowVariantCollection.getBunglowMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',')

	removeAptFilters:->
		variants = []
		unittypes = []
		unitsArr = apartmentVariantCollection.getApartmentMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',')

	removePlotFilters:->
		variants = []
		unittypes = []
		unitsArr = plotVariantCollection.getPlotMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',')

#controller for the top region
class CommonFloor.TopListCtrl extends Marionette.RegionController

	initialize:->
		@renderTopListView()
		unitCollection.bind( "available", @renderTopListView, @) 

	renderTopListView:->
		@view =  new TopListView 
					model : project

		@listenTo @view,"render:view" ,@loadController

		@show @view 

	loadController:->
		# Backbone.trigger "render:view" 
		window.unitTypes = []
		window.unitVariants = []
		window.variantNames = []
		window.price = ''
		window.area = ''
		window.type  = []
		@region =  new Marionette.Region el : '#filterregion'
		new CommonFloor.FilterMasterCtrl region : @region

		# @listenTo Backbone , "load:units" , @showViews

#view for the Left setion
class LeftListView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>')

	onShow:->
		$('.filters').hide()

#controller for the Left region
class CommonFloor.LeftListCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftListView 



#controller for the Center region
class CommonFloor.CenterListCtrl extends Marionette.RegionController

	initialize:->
		@renderCenterListView()
		unitCollection.bind( "available", @renderCenterListView, @)  
		
	renderCenterListView:->
		response = CommonFloor.checkListView()
		if response.count.length == 0 
			region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.NoUnitsCtrl region : region
			return
		if response.type is 'bunglows' 
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.VillaListCtrl region : @region
			# @parent().trigger "load:units" , data

		if response.type is 'building' 
			units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.BuildingListCtrl region : @region
			# @parent().trigger "load:units" , data

		if response.type is 'plot' 
			units = plotVariantCollection.getPlotUnits()
			data = {}
			data.units = units
			data.type = 'plot'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.PlotListCtrl region : @region
			# @parent().trigger "load:units" , data

		
			
		

