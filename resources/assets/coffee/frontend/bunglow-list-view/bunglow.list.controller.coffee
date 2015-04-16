class CommonFloor.BunglowListView extends Marionette.LayoutView

	template : '#project-template'

#starting point for List view for bunglows
class CommonFloor.BunglowListCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.checkPropertyType()
		if bunglowVariantCollection.length != 0
			@show new CommonFloor.BunglowListView
		else
			@show new CommonFloor.NothingFoundView
		

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
              <h1>We are now at {{project_title}}\'s upcoming project having {{units}} villa\'s</h1>
            </div>
          </div>
        </div>')

	serializeData:->
		data = super()
		data.units = bunglowVariantCollection.getBunglowUnits().length
		data

#controller for the top region
class CommonFloor.TopBunglowListCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBunglowListView 
			model : project


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
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.ListCtrl region : @region

		
			
		

