#view for each building
class BuildingItemView extends Marionette.ItemView

	template :  Handlebars.compile('<li class="bldg blocks {{status}}">
					                    <div class="bldg-img"></div>
					                    <div class="info">
					                      <h2 class="m-b-5">{{building_name}}</h2>
					                      <!--<div>Starting from Rs.<span>50 lakhs</span></div>-->
					                      <div>No. of Floors: <span>{{floors}}</span></div>
					                    </div>
					                    <div class="clearfix"></div>
					                    <div class="unit-type-info">
					                      <ul>
					                     	{{#types}}
					                        <li>
					                          {{name}}: <span>{{units}}</span>
					                        </li>
					                        {{/types}}
					                       
					                      </ul>
					                    </div>
					                  </li>')
	serializeData:->
		data = super()
		id = @model.get 'id'
		response = building.getUnitTypes(id)
		types = building.getUnitTypesCount(id,response)
		floors = @model.get 'floors'
		data.floors = Object.keys(floors).length
		data.types = types
		data

	events:
		'click .bldg':(e)->
			id = @model.get 'id'
			unit = unitCollection.where 
				'building_id' :  id 
			if unit.length is 0
				return 
			buildingModel = buildingCollection.findWhere
							'id' : id
			if buildingModel.get('building_master').front == ""
				CommonFloor.navigate '/building/'+id+'/apartments' , true
				CommonFloor.router.storeRoute()
			else
				CommonFloor.navigate '/building/'+id+'/master-view' , true
				CommonFloor.router.storeRoute()

#view for listing buildings : Collection
class BuildingListView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-12 us-right-content">
			<div class="list-view-container animated fadeInDown">
			<!--<div class="controls map-View">
	            <div class="toggle">
	            	<a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a>
	            </div>
            </div>-->
			<div class="text-center">
              <ul class="prop-select">
                <li class="prop-type buildings active">Buildings</li>
                <li class="prop-type Villas hidden">Villas/Bungalows</li>
                <li class="prop-type Plots hidden">Plots</li>
              </ul>
            </div>
			<div class="bldg-list">
			  <ul class="units">
				
				
			  </ul>
			  <div class="clearfix"></div>
			</div>
			</div>
		  </div>')

	childView : BuildingItemView

	childViewContainer : '.units'

	events : 
		'click .buildings':(e)->
			console.log units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.BuildingListCtrl region : @region
			# @trigger "load:units" , data
			

		'click .Villas':(e)->
			console.log units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.VillaListCtrl region : @region
			# @trigger "load:units" , data

	onShow:->
		if project.get('project_master').front  == ""
			$('.map-View').hide()
		else
			$('.map-View').show()

		if bunglowVariantCollection.length != 0
			$('.Villas').removeClass 'hidden'



#controller for listing buildings
class CommonFloor.BuildingListCtrl extends Marionette.RegionController

	initialize:->
		@view = view = new BuildingListView
					collection : buildingCollection
		@listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data
