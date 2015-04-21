class CommonFloor.BunglowListView extends Marionette.LayoutView

	template : '#project-template'

#starting point for List view for bunglows
class CommonFloor.BunglowListCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
		if bunglowVariantCollection.length == 0 && apartmentVariantCollection.length == 0
			@show new CommonFloor.NothingFoundView
		else
			@show new CommonFloor.BunglowListView
		
		

#view for the top setion
class TopBunglowListView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
		  <div class="col-md-12 col-xs-12 col-sm-12">
			<div class="search-header-wrap">

			  <h1>{{project_title}} {{#types}} {{count.length}} {{type}} {{/types}}</h1>

			</div>
		  </div>
		</div>')

	serializeData:->
		data = super()
		response = CommonFloor.propertyTypes() 
		data.types = response
		data



	
#controller for the top region
class CommonFloor.TopBunglowListCtrl extends Marionette.RegionController

	initialize:->
		console.log "aaaaaaaaaaa"
		@show new TopBunglowListView 
				model : project

		# @listenTo Backbone , "load:units" , @showViews

		
		

	

#view for the Left setion
class LeftBunglowListView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>')

	onShow:->
		$('.filters').hide()

#controller for the Left region
class CommonFloor.LeftBunglowListCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftBunglowListView 



#controller for the Center region
class CommonFloor.CenterBunglowListCtrl extends Marionette.RegionController

	initialize:->
		response = CommonFloor.checkListView()
		if response.type is 'bunglows' 
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.ListCtrl region : @region
			@parent().trigger "load:units" , data

		if response.type is 'building' 
			console.log @parent()
			units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.CenterBuildingListCtrl region : @region
			@parent().trigger "load:units" , data

		
			
		

