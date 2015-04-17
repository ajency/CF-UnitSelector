class CommonFloor.BunglowListView extends Marionette.LayoutView

	template : '#project-template'

#starting point for List view for bunglows
class CommonFloor.BunglowListCtrl extends Marionette.RegionController

	initialize:->
		console.log "aaaaaaaaaa"
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
		@show new CommonFloor.BunglowListView
		
		

#view for the top setion
class TopBunglowListView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
          <div class="col-md-12 col-xs-12 col-sm-12">
            <!--<div class="row breadcrumb-bar">
              <div class="col-xs-12 col-md-12">
                <div class="bread-crumb-list">
                  <ul class="brdcrmb-wrp clearfix">
                    <li class="">
                      <span class="bread-crumb-current">
                        <span class=".icon-arrow-right2"></span>Back to Poject Overview
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>-->

            <div class="search-header-wrap">
              <h1>We are now at {{project_title}}\'s upcoming project having {{units}} {{type}}\'s</h1>
            </div>
          </div>
        </div>')

	serializeData:->
		data = super()
		units = Marionette.getOption( @, 'units' )
		type = Marionette.getOption( @, 'type' )
		data.units  = units.length
		data.type  = type
		data



	
#controller for the top region
class CommonFloor.TopBunglowListCtrl extends Marionette.RegionController

	initialize:->
		@listenTo @parent() , "load:units" , @showViews

		@listenTo Backbone , "load:units" , @showViews

	showViews:(data)->
		console.log data
		@show new TopBunglowListView 
				model : project
				units : data.units
				type: data.type
			
			
		

	

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

		
			
		

