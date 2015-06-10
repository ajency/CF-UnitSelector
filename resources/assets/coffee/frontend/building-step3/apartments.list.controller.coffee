class CommonFloor.ApartmentsListView extends Marionette.LayoutView

	template : '#apartment-list-template'


	onShow:->
		$('#leftregion').hide()



class CommonFloor.ApartmentsListCtrl extends Marionette.RegionController


	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
		if apartmentVariantMasterCollection.length == 0
			@show new CommonFloor.NothingFoundView
		else
			# url = Backbone.history.fragment
			# console.log building_id = parseInt url.split('/')[1]
			# CommonFloor.filterBuilding(building_id)
			@show new CommonFloor.ApartmentsListView


class CommonFloor.TopApartmentView extends Marionette.ItemView

	template : Handlebars.compile('<div class="container-fluid animated fadeIn">
							          	<div class="row">
								          	<div class="col-md-12 col-xs-12 col-sm-12">

									            <div class="breadcrumb-bar">
									                <a class="unit_back" href="#"></a>
									            </div>

									            <div class="header-info">
								              		<h2 class="pull-left proj-name">{{project_title}} - {{name}}</h2>
								              	
									              	<div class="proj-type-count">
									              		<h2 class="pull-left">{{results}}</h2><p class="pull-left">Apartment(s)/Penthouse(s)</p>
									              	</div>
									              	
									              	<div class="pull-left filter-result full">
									              		 {{#filters}}
													         	{{#each this}}
													         	{{#each this}}
													        
													                <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													        {{/each}}
													         {{/each}}
													         {{/filters}}
													          {{#area}}
													         	
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													         
													         {{/area}}
													     {{#budget}}
													         	
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													        
													         {{/budget}}
													          {{#views}}
													         	
													                <div class="filter-pill"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> 
													         
													         {{/views}}

													       {{#facings}}
													         	
													                <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> 
													       
													         {{/facings}}

													           {{#floor}}
													         	
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross floor" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													        
													         {{/floor}}

													      {{#status}}
													         	
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													        
													         {{/status}}						               
						                    		</div>
									          	</div>

									        </div>
								        </div>
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
		floor : '.floor'
		filter_flooring : '.filter_flooring'
		views : '.views'
		facings : '.facings'

	initialize:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		@building_id = building_id

	serializeData:->
		data = super()
		units = Marionette.getOption( @, 'units' )
		data.units = units.length
		data.project_title = project.get('project_title')
		main = CommonFloor.getStepFilters()
		mainFilters = main[0].filters[0]
		data.filters = []
		if ! _.isUndefined mainFilters
			data.filters  = main[0].filters[0].filters
		data.area  = main[0].area
		data.budget  = main[0].price
		data.status  = main[0].status
		data.floor  = main[0].floor
		data.views  = main[0].views
		data.facings  = main[0].facings
		results  = apartmentVariantCollection.getApartmentUnits()
		temp = new Backbone.Collection results
		newTemp = temp.where
				'building_id' : parseInt @building_id
		data.results = newTemp.length
		model = buildingMasterCollection.findWhere
						'id' : @building_id
		data.name  = model.get 'building_name'
		data

	events:->
		'click @ui.types':(e)->
			arr = CommonFloor.defaults['type'].split(',')
			index = arr.indexOf $(e.target).attr('data-id')
			arr.splice(index, 1)
			CommonFloor.defaults['type'] = arr.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.unitBack':(e)->
			e.preventDefault()
			# $.each CommonFloor.defaults,(index,value)->
			# 	CommonFloor.defaults[index] = ""
			# CommonFloor.removeStepFilters()
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterStepNew()
			previousRoute = CommonFloor.router.previous()
			if Object.keys(project.get('project_master')).length == 0
				CommonFloor.navigate '/list-view' , true	
			else
				CommonFloor.navigate '/master-view' , true

		'click @ui.unitTypes':(e)->
			unitTypes = CommonFloor.defaults['apartment']['unit_type_id'].split(',')
			unitTypes = _.without unitTypes , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['apartment']['unit_type_id'] = unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'
			
		'click @ui.variantNames':(e)->
			variantNames = CommonFloor.defaults['apartment']['unit_variant_id'].split(',')
			variantNames = _.without variantNames , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['apartment']['unit_variant_id'] = variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 	
			@trigger  'render:view'

		'click @ui.status':(e)->
			CommonFloor.defaults['common']['availability'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

			

		'click @ui.area':(e)->
			CommonFloor.defaults['common']['area_max'] = ""
			CommonFloor.defaults['common']['area_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.budget':(e)->
			CommonFloor.defaults['common']['price_max'] = ""
			CommonFloor.defaults['common']['price_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.floor':(e)->
			CommonFloor.defaults['common']['floor_max'] = ""
			CommonFloor.defaults['common']['floor_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'
			
		'click @ui.floor':(e)->
			CommonFloor.defaults['common']['floor_max'] = ""
			CommonFloor.defaults['common']['floor_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.facings':(e)->
			types = CommonFloor.defaults['common']['facings'].split(',')
			types = _.without types ,$(e.currentTarget).attr('data-id')
			CommonFloor.defaults['common']['facings'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.views':(e)->
			types = CommonFloor.defaults['common']['views'].split(',')
			types = _.without types ,$(e.currentTarget).attr('data-id')
			CommonFloor.defaults['common']['views'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.filter_flooring':(e)->
			flooring = CommonFloor.defaultsfilterNew['flooring'].split(',')
			flooring = _.without flooring , $(e.currentTarget).attr('data-id')
			CommonFloor.defaultsfilterNew['flooring'] = flooring.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

	onShow:->
		# if CommonFloor.router.history.length == 1
		# 	@ui.unitBack.hide()
		results  = CommonFloor.getFilters()
		if results.length == 0
			$('.proj-type-count').text 'No results found'


	
	
			
class CommonFloor.TopApartmentCtrl extends Marionette.RegionController

	initialize:->
		@renderTopView()
		unitTempCollection.bind( "filter_available", @renderTopView, @) 

	renderTopView:->

		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		buildingModel = buildingMasterCollection.findWhere
							id : building_id
		@view =  new CommonFloor.TopApartmentView
					model : buildingModel
					units : response
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
		new CommonFloor.FilterApartmentCtrl region : @region

class CommonFloor.LeftApartmentView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content 
				leftview"></div>')

	onShow:->
		$('#leftregion').hide()

	

class CommonFloor.LeftApartmentCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.LeftApartmentView

class ApartmentsView extends Marionette.ItemView

	template : Handlebars.compile('<li class="unit blocks {{status}}">
					                    <div class="bldg-img"></div>
					                     <div class="{{type}}-ico pull-left icon"></div>	
					                   <div class="pull-left bldg-info">
					                    <div class="info">
					                      <label>{{unit_name}} (Floor - {{floor}} )</label>
					                      
					                    </div>
					       
					                    ({{unit_type}} {{super_built_up_area}} {{measurement_units}})<br>
					                    <div class="text-primary m-t-5"><span class="icon-rupee-icn"></span>{{price}}</div>
					                    </div>
					                    <div class="clearfix"></div>
					                   
					                  </li>')


	serializeData:->
		data = super()
		response = window.unit.getUnitDetails(@model.get('id'))
		data.unit_type = response[1].get('name')
		data.super_built_up_area = response[0].get('super_built_up_area')
		availability = @model.get('availability')
		data.status = s.decapitalize(availability)
		@model.set 'status' , status
		data.price = window.numDifferentiation(response[3])
		unitType = unitTypeMasterCollection.findWhere
							'id' :  @model.get('unit_type_id')
		property = window.propertyTypes[unitType.get('property_type_id')]
		data.property = s.capitalize(property)
		data.floor = @model.get('floor')
		data.measurement_units = project.get('measurement_units')
		data.type = response[2]
		data

	events:
		'click .unit':(e)->
			if @model.get('availability') == 'available'
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true
				# CommonFloor.router.storeRoute()



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
				            <h2 class="text-center">List of Apartments/Penthouse <span class="pull-right top-legend">     <ul>
				                <li class="na">N/A</li>
				              </ul></span></h2><hr>
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
			# CommonFloor.router.storeRoute()

		'click .list':(e)->
			e.preventDefault()
			url = Backbone.history.fragment
			building_id = parseInt url.split('/')[1]
			CommonFloor.navigate '/building/'+building_id+'/apartments' , true
			# CommonFloor.router.storeRoute()

	
		


class CommonFloor.CenterApartmentCtrl extends Marionette.RegionController

	initialize:->
		@renderListView()
		unitTempCollection.bind( "filter_available", @renderListView, @) 
		

	renderListView:->

		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		if response.length == 0 && url.split('/')[2] == 'apartments'
			region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.NoUnitsCtrl region : region
			return
		unitsCollection = new Backbone.Collection response


		@view  = new CommonFloor.CenterApartmentView
					collection : unitsCollection

		
	
		@show @view 
