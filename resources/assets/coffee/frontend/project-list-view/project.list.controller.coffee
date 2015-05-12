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

	template : Handlebars.compile('<div class="row">
		  <div class="col-md-12 col-xs-12 col-sm-12">
			<div class="search-header-wrap">
				<div class="row breadcrumb-bar">
							<div class="col-xs-12 col-md-12">
								<div class="bread-crumb-list">
									<ul class="brdcrmb-wrp clearfix">
										<li class="">
											<span class="bread-crumb-current">
												<span class=".icon-arrow-right2"></span><a class="unit_back" href="#">
													Back to Project Overview</a>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
				<h1 class="pull-left proj-name">{{project_title}}</h1> 
				  <div class="proj-type-count">
				  	{{#types}} 
				  	<h1 class="text-primary pull-left">{{count.length}}</h1> <p class="pull-left">{{type}}</p>
				  	{{/types}}
				  	<div class="clearfix"></div>
				  </div>
			  <div class="clearfix"></div>

			</div>
		  </div>
		</div>')

	ui  :
		unitBack : '.unit_back'
		unitTypes : '.unit_types'
		priceMin : '.price_min'
		priceMax : '.price_max'
		status : '.status'
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
			previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '/'+previousRoute , true

		'click @ui.types':(e)->
			arr = CommonFloor.defaults['type'].split(',')
			index = arr.indexOf $(e.target).attr('data-id')
			arr.splice(index, 1)
			CommonFloor.defaults['type'] = arr.join(',')
			
			
			if $(e.target).attr('data-id') == 'Villas'
				@removeVillaFilters()
			if $(e.target).attr('data-id') == 'Apartments'
				@removeAptFilters()
			if $(e.target).attr('data-id') == 'Plots'
				@removePlotFilters()
			@trigger  'render:view'
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			

			
		'click @ui.unitTypes':(e)->
			unitTypes = CommonFloor.defaults['unitTypes'].split(',')
			unitTypes = _.without unitTypes , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			@trigger  'render:view'
			
		'click @ui.variantNames':(e)->
			variantNames = CommonFloor.defaults['unitVariants'].split(',')
			variantNames = _.without variantNames , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['unitVariants'] = variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()	
			@trigger  'render:view'

		# 'click @ui.status':(e)->
		# 	CommonFloor.defaults['availability'] = e.currentTarget.id
		# 	unitCollection.reset unitMasterCollection.toArray()
		# 	CommonFloor.filter()
			

		'click @ui.area':(e)->
			CommonFloor.defaults['area_max'] = ""
			CommonFloor.defaults['area_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			@trigger  'render:view'

		'click @ui.budget':(e)->
			CommonFloor.defaults['price_max'] = ""
			CommonFloor.defaults['price_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			@trigger  'render:view'

	onShow:->
		if CommonFloor.router.history.length == 1
			@ui.unitBack.hide()


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
		@renderView()
		unitTempCollection.on("change reset add remove", @renderView, @)

	renderView:->
		@show new TopListView 
				model : project

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
		@renderView()
		unitTempCollection.on("change reset add remove", @renderView)
		
	renderView:->
		response = CommonFloor.checkListView()
		if response.type is 'bunglows' 
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.VillaListCtrl region : @region
			@parent().trigger "load:units" , data

		if response.type is 'building' 
			console.log @parent()
			units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.BuildingListCtrl region : @region
			@parent().trigger "load:units" , data

		
			
		

