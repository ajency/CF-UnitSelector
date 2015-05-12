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

	template : Handlebars.compile('<div class="container-fluid">
							          	<div class="row">
								          	<div class="col-md-12 col-xs-12 col-sm-12 text-center">

									            <div class="breadcrumb-bar">
									                <a class="unit_back" href="#">
														Back to Poject Overview
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
		units = Marionette.getOption( @, 'units' )
		data.units = units.length
		data.project_title = project.get('project_title')
		data

	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '/'+previousRoute , true

	onShow:->
		if CommonFloor.router.history.length == 1
			@ui.unitBack.hide()
			
class CommonFloor.TopApartmentCtrl extends Marionette.RegionController

	initialize:->
		@renderView()
		unitTempCollection.on("change reset add remove", @renderView, @)

	renderView:->
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
					                    <label>{{property}}</label>
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
		unitType = unitTypeMasterCollection.findWhere
							'id' :  @model.get('unit_type_id')
		property = window.propertyTypes[unitType.get('property_type_id')]
		data.property = s.capitalize(property)
		data

	events:
		'click .unit':(e)->
			if @model.get('availability') == 'available'
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true
				CommonFloor.router.storeRoute()



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
			CommonFloor.router.storeRoute()

		'click .list':(e)->
			e.preventDefault()
			url = Backbone.history.fragment
			building_id = parseInt url.split('/')[1]
			CommonFloor.navigate '/building/'+building_id+'/apartments' , true
			CommonFloor.router.storeRoute()

	
		


class CommonFloor.CenterApartmentCtrl extends Marionette.RegionController

	initialize:->
		@renderView()
		unitTempCollection.on("change reset add remove", @renderView, @)

	renderView:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		unitsCollection = new Backbone.Collection response
		@show new CommonFloor.CenterApartmentView
					collection : unitsCollection