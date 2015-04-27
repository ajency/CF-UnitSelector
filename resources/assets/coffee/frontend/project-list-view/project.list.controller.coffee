class CommonFloor.ProjectListView extends Marionette.LayoutView

	template : '#project-template'

#starting point for Project List view 
class CommonFloor.ProjectListCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
		if bunglowVariantCollection.length == 0 && apartmentVariantCollection.length == 0
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
													Back to Poject Overview</a>
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

		
			
		

