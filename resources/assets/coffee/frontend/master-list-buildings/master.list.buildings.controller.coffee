class CenterItemView extends Marionette.ItemView

	template :  Handlebars.compile('
					                    <div class="bldg-img"></div>
					                    <div class="info">
					                      <h2 class="m-b-5">{{building_name}}</h2>

					                      <div class="price">Rs.<span>{{price}}</span></div>

					                      <div class="floors">Floors: <span>{{floors}}</span></div>
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
					                      <span class="area">{{area}} Sq.Ft</span>

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
		data.area = building.getMinimumArea(id)
		cost = building.getMinimumCost(id)
		data.price = window.numDifferentiation(cost)
		data.floors = Object.keys(floors).length
		data.types = types
		data

	events:
		'mouseover':(e)->
			id = @model.get 'id'
			$('#'+id+'.building').attr('class' ,'layer building available')
		'mouseout' :(e)->
			id = @model.get 'id'
			$('#'+id+'.building').attr('class' ,'layer building')
			$('#bldg'+id).attr('class' , 'bldg blocks')
				
		'click ':(e)->
			id = @model.get 'id'
			buildingModel = buildingCollection.findWhere
							'id' : id
			if buildingModel.get('building_master').front == ""
				CommonFloor.navigate '/building/'+id+'/apartments' , true
			else
				CommonFloor.navigate '/building/'+id+'/master-view' , true


class MasterBuildingListView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-3 us-left-content">
			<div class="list-view-container animated fadeInLeft">
			<!--<div class="controls map-View">
	            <div class="toggle">
	            	<a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a>
	            </div>
            </div>-->
			<div class="text-center">
              <ul class="prop-select">

                <li class="prop-type buildings active">Buildings</li>
                <li class="prop-type Villas hidden">Villas</li>

                <li class="prop-type Plots hidden">Plots</li>
              </ul>
            </div>
			<div class="bldg-list">
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
