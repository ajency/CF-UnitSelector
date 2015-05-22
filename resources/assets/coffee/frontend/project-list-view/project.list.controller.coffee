class CommonFloor.ProjectListView extends Marionette.LayoutView

	template : '#project-template'

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
														Back to Project Overview
													</a>
												</div>

												<h2 class="proj-name">{{project_title}}</h2>

											</div>
										</div>
									</div>

									<div class="filter-summary-area">

										<button class="btn btn-primary cf-btn-white pull-right m-t-15" type="button" data-toggle="collapse" data-target="#collapsefilters">
											Filters <span class="icon-funnel"></span>
										</button>
							            <div class="pull-left filter-result">
							              	{{#each  filters}}
							              	{{#each this}}
											<div class="filter-pill"  >
												{{this.name}}{{this.type}}
												<span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span>
							              	</div>	
							              	{{/each}}{{/each }}							               
							            </div>
										<div class="proj-type-count">
											{{#types}} 
											<p class="pull-right">{{type}}</p><h1 class="text-primary pull-right m-t-10">{{count.length}}</h1> 
											{{/types}}
										</div>

										<div class="clearfix"></div>
									</div>')

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

	serializeData:->
		data = super()
		status = CommonFloor.getStatusFilters()
		if status.length != 0
			data.status = status
		data.filters  = CommonFloor.getFilters()[0]
		data.results  = CommonFloor.getFilters()[1]
		response = CommonFloor.propertyTypes() 
		data.types = response
		data


	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			# previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '/' , true

		'click @ui.types':(e)->
			arr = CommonFloor.defaults['type'].split(',')
			index = arr.indexOf $(e.target).attr('data-id')
			arr.splice(index, 1)
			CommonFloor.defaults['type'] = arr.join(',')
			
			
			if $(e.target).attr('data-id') == 'Villas'
				@removeVillaFilters()
			if $(e.target).attr('data-id') == 'Apartments/Penthouse'
				@removeAptFilters()
			if $(e.target).attr('data-id') == 'Plots'
				@removePlotFilters()
			@trigger  'render:view'
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			

			
		'click @ui.unitTypes':(e)->
			unitTypes = CommonFloor.defaults['unitTypes'].split(',')
			unitTypes = _.without unitTypes , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@trigger  'render:view'
			
		'click @ui.variantNames':(e)->
			variantNames = CommonFloor.defaults['unitVariants'].split(',')
			variantNames = _.without variantNames , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['unitVariants'] = variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')	
			@trigger  'render:view'

		'click @ui.status':(e)->
			CommonFloor.defaults['availability'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@trigger  'render:view'

			

		'click @ui.area':(e)->
			CommonFloor.defaults['area_max'] = ""
			CommonFloor.defaults['area_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.budget':(e)->
			CommonFloor.defaults['price_max'] = ""
			CommonFloor.defaults['price_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@trigger  'render:view'

	onShow:->
		# if CommonFloor.router.history.length == 1
		# 	@ui.unitBack.hide()
		response = CommonFloor.propertyTypes() 
		if response.length == 0
			$('.proj-type-count').text 'No results found'


	removeVillaFilters:->
		variants = []
		unittypes = []
		unitsArr = bunglowVariantCollection.getBunglowMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['unitVariants'] = unitVariants.join(',')

	removeAptFilters:->
		variants = []
		unittypes = []
		unitsArr = apartmentVariantCollection.getApartmentMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['unitVariants'] = unitVariants.join(',')

	removePlotFilters:->
		variants = []
		unittypes = []
		unitsArr = plotVariantCollection.getPlotMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['unitVariants'] = unitVariants.join(',')

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

		
			
		

