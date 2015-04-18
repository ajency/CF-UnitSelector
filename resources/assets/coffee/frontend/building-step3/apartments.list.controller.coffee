class CommonFloor.ApartmentsListView extends Marionette.LayoutView

	template : '#project-template'



class CommonFloor.ApartmentsListCtrl extends Marionette.RegionController


	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
		if apartmentVariantCollection.length == 0
			@show new CommonFloor.NothingFoundView
		else
			@show new CommonFloor.ApartmentsListView


class CommonFloor.TopApartmentView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
		          <div class="col-md-12 col-xs-12 col-sm-12">
		            <!--<div class="row breadcrumb-bar">
		              <div class="col-xs-12 col-md-12">
		                <div class="bread-crumb-list">
		                  <ul class="brdcrmb-wrp clearfix">
		                    <li class="">
		                      <span class="bread-crumb-current">
		                        <span class=".icon-arrow-right2"></span> Back to Poject Overview
		                      </span>
		                    </li>
		                  </ul>
		                </div>
		              </div>
		            </div>-->

		            <div class="search-header-wrap">
		              <h1>We are now at {{project_title}}\'s upcoming project having {{units}} apartment\'s</h1>
		            </div>
		          </div>
		        </div>')

	serializeData:->
		data = super()
		units = Marionette.getOption( @, 'units' )
		data.units = units.length
		data.project_title = project.get('project_title')
		data

class CommonFloor.TopApartmentCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		buildingModel = buildingCollection.findWhere
							id : building_id
		@show new CommonFloor.TopApartmentView
					model : buildingModel
					units : response

class CommonFloor.LeftApartmentView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content 
				leftview"></div>')

	onShow:->
		$('.leftview').hide()

	

class CommonFloor.LeftApartmentCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.LeftApartmentView

class ApartmentsView extends Marionette.ItemView

	template : Handlebars.compile('<li>{{unit_name}}</li>')



class CommonFloor.CenterApartmentView extends Marionette.CompositeView

	template : '<div>
				<ul class="units">
				</ul>

				<div>'

	childView : ApartmentsView

	childViewContainer : '.units'

class CommonFloor.CenterApartmentCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		unitsCollection = new Backbone.Collection response
		@show new CommonFloor.CenterApartmentView
					collection : unitsCollection