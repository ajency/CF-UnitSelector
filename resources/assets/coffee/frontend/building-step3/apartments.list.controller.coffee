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
		              <h1 class="pull-left proj-name">{{project_title}}</h1> 
		              <div class="proj-type-count">
		              	<h1 class="text-primary pull-left">{{building_name}}</h1>
		              	<div class="clearfix"></div>
		              </div>
		              <div class="clearfix"></div>
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

	template : Handlebars.compile('<li class="unit blocks {{status}}">
					                    <div class="bldg-img"></div>
					                    <div class="info">
					                      <label>{{unit_name}}</label>
					                      ({{unit_type}} {{super_built_up_area}}sqft)
					                    </div>
					                    <div class="clearfix"></div>
					                   
					                  </li>')


	serializeData:->
		data = super()
		status = s.decapitalize @model.get 'availability'
		unitVariant = apartmentVariantCollection.findWhere
							'id' : @model.get('unit_variant_id')
		unitType = unitTypeCollection.findWhere
							'id' : unitVariant.get('unit_type_id')
		data.unit_type = unitType.get('name')
		data.super_built_up_area = unitVariant.get('super_built_up_area')
		data.status = status
		data

	events:
		'click .unit':(e)->
			if @model.get('availability') == 'available'
				CommonFloor.defaults['unit'] = @model.get('id')
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true



class CommonFloor.CenterApartmentView extends Marionette.CompositeView

	template : '<div>
					<div class="col-md-12 us-right-content">
						<div class="list-view-container">
								<!--<div class="controls map-View">
						            <div class="toggle">
						            	<a href="#" class="map ">Map</a><a href="#" class="list active">List</a>
						            </div>
					            </div>-->
							<div class="legend clearfix">
				              <ul>
				                <li class="available">AVAILABLE</li>
				                <li class="sold">SOLD</li>
				                <li class="blocked">BLOCKED</li>
				                <li class="na">N/A</li>
				              </ul>
				            </div>
							<div class="villa-list">
								<ul class="units eight">
								</ul>
							</div>
						</div>
					</div>
				</div>'

	childView : ApartmentsView

	childViewContainer : '.units'

	events : 
		'click .map':(e)->
			e.preventDefault()
			url = Backbone.history.fragment
			building_id = parseInt url.split('/')[1]
			CommonFloor.navigate '/building/'+building_id+'/master-view' , true

		'click .list':(e)->
			e.preventDefault()
			url = Backbone.history.fragment
			building_id = parseInt url.split('/')[1]
			CommonFloor.navigate '/building/'+building_id+'/apartments' , true

	onShow:->
		e.preventDefault()
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		buildingModel = buildingCollection.findWhere
						id : building_id
		if buildingModel.get('building_master').front  == ""
			$('.map-View').hide()
		else
			$('.map-View').show()

		


class CommonFloor.CenterApartmentCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		unitsCollection = new Backbone.Collection response
		@show new CommonFloor.CenterApartmentView
					collection : unitsCollection