class CenterItemView extends Marionette.ItemView

	template :  Handlebars.compile('
					                    <div class="bldg-img"></div>
					                    <div class="info">
					                      <h2 class="m-b-5">{{building_name}}</h2>

					                      <div class="floors"><span>{{floors}}</span> floors</div>
					                    </div>
					                    <div class="clearfix"></div>
					                    <div class="unit-type-info">
					                      <ul>
					                     	{{#types}}
					                        <li>
					                          {{name}}<!--: <span>{{units}}</span>-->
					                        </li>
					                        {{/types}}
					                       

					                      </ul>
					                      <span class="area {{areaname}}">{{area}} Sq.Ft</span>
					                      <div class="price {{classname}}">From <span>Rs.{{price}}</span></div>

					                      </ul>

					                    </div>
					                  ')

	tagName : 'li'

	className : 'bldg blocks'

	initialize:->
		@$el.prop("id", 'bldg'+@model.get("id"))


		
	serializeData:->
		data = super()
		id = @model.get 'id'
		response = building.getUnitTypes(id)
		types = building.getUnitTypesCount(id,response)
		floors = @model.get 'floors'
		areaname = ""
		data.area = building.getMinimumArea(id)
		if data.area == 0
			areaname = 'hidden'
		console.log data.areaname = areaname
		console.log cost = building.getMinimumCost(id)
		data.classname = ""
		if cost == 0
			data.classname = 'hidden'
		console.log data.classname
		data.price = window.numDifferentiation(cost)
		data.floors = Object.keys(floors).length
		data.types = types
		data

	events:
		'mouseover':(e)->
			id = @model.get 'id'
			$('#'+id+'.building').attr('class' ,'layer building active_bldg')
			$('#bldg'+id).attr('class' ,'bldg blocks active')
		'mouseout' :(e)->
			id = @model.get 'id'
			$('#'+id+'.building').attr('class' ,'layer building')
			$('#bldg'+id).attr('class' ,'bldg blocks')
			
				
		'click ':(e)->
			id = @model.get 'id'
			units = unitCollection.where 
						'building_id' : id
			if units.length == 0
				return
			buildingModel = buildingCollection.findWhere
							'id' : id
			if buildingModel.get('building_master').front == ""
				CommonFloor.navigate '/building/'+id+'/apartments' , true
			else
				CommonFloor.navigate '/building/'+id+'/master-view' , true


class MasterBuildingListView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-3 us-left-content">
			<div class="list-view-container w-map animated fadeInLeft">
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
				<p class="text-center help-text">Hover on the buildings for more details</p>
			  	<ul class="units one">				
				
			  	</ul>
			  	<div class="clearfix"></div>
			</div>
			</div>
		  </div>')

	childView : CenterItemView

	childViewContainer : '.units'

	events : 
		'click .buildings':(e)->
			console.log units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterBuildingListCtrl region : @region
			# @trigger "load:units" , data

			

		'click .Villas':(e)->
			console.log units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterBunglowListCtrl region : @region
			# MasterBuildingListCtrl@trigger "load:units" , data


	onShow:->
		if project.get('project_master').front  == ""
			$('.map-View').hide()
		else
			$('.map-View').show()

		if bunglowVariantCollection.length != 0
			$('.Villas').removeClass 'hidden'




class CommonFloor.MasterBuildingListCtrl extends Marionette.RegionController

	initialize:->
		@view = view = new MasterBuildingListView
					collection : buildingCollection
		@listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data
