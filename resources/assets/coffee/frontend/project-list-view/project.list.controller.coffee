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

	serializeData:->
		data = super()
		response = CommonFloor.propertyTypes() 
		data.types = response
		data

	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '/'+previousRoute , true

	onShow:->
		if CommonFloor.router.history.length == 1
			@ui.unitBack.hide()

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

		
			
		

