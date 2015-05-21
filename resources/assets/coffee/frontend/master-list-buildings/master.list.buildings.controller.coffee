#view for each building : Model
class ListItemView extends Marionette.ItemView

	template :  Handlebars.compile('<div class="bldg-img"></div>
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
					                      		<span class="area {{areaname}}">{{area}} Sq.Ft</span>
					                      		<div class="price {{classname}}">From <span>{{price}}</span></div>
											</ul>
										 </div>')

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
		data.areaname = areaname
		cost = building.getMinimumCost(id)
		data.classname = ""
		if cost == 0
			data.classname = 'hidden'
		console.log data.classname
		# data.price = window.numDifferentiation(cost)
		window.convertRupees(cost)
		data.price = $('#price').val()
		data.floors = Object.keys(floors).length
		data.types = types
		data

	events:
		'mouseover':(e)->
			@iniTooltip(@model.get('id'))
			html = @getHtml(@model.get('id'))
			id = @model.get('id')
			$('#'+id+'.building').attr('class' ,'layer building svg_active')
			$('#bldg'+id).attr('class' ,'bldg blocks active')
			$('#'+id).tooltipster('content', html)

		'mouseout' :(e)->
			id = @model.get 'id'
			$('#'+id+'.building').attr('class' ,'layer building')
			$('#bldg'+id).attr('class' ,'bldg blocks')
			$('#'+id).tooltipster('hide')
			
		'click ':(e)->
			id = @model.get 'id'
			units = unitCollection.where 
						'building_id' : id
			if units.length == 0
				return
			buildingModel = buildingCollection.findWhere
							'id' : id
			$('.spritespin-canvas').addClass 'zoom'
			$('.us-left-content').addClass 'animated fadeOut'
			setTimeout( (x)->
				if Object.keys(buildingModel.get('building_master')).length == 0
					CommonFloor.navigate '/building/'+id+'/apartments' , true
					CommonFloor.router.storeRoute()
				else
					CommonFloor.navigate '/building/'+id+'/master-view' , true
					CommonFloor.router.storeRoute()

			, 500)

	iniTooltip:(id)->
		$('#'+id).trigger('mouseover')


	getHtml:(id)->
		html = ""
		id  = parseInt id
		buildingModel = buildingCollection.findWhere
						'id' : id

		if buildingModel == undefined
			html = '<div class="svg-info">
						<div class="details">
							Building details not entered 
						</div>  
					</div>'
			$('.layer').tooltipster('content', html)
			return 


		floors = buildingModel.get 'floors'
		floors = Object.keys(floors).length
		unitTypes = building.getUnitTypes(id)
		response = building.getUnitTypesCount(id,unitTypes)
		html = '<div class="svg-info">
					<h4 class="pull-left">'+buildingModel.get('building_name')+'</h4>
					<!--<span class="label label-success"></span-->
					<div class="clearfix"></div>'
		$.each response,(index,value)->
			html += '<div class="details">
						<div>
							<label>'+value.name+'</label> - '+value.units+'
						</div>'

		html += '<div>
					<label>No. of floors</label> - '+floors+'
				</div>
				</div>

				</div>'
		$('.layer').tooltipster('content', html)
		$('#bldg'+id).attr('class' ,'bldg blocks active') 
		$('#'+id).attr('class' ,'layer building active_bldg')

#view for list of buildings : Collection
class MasterBuildingListView extends Marionette.CompositeView

	template : Handlebars.compile('
										<div id="view_toggle" class="toggle-view-button map"></div>
										<div class="list-view-container w-map animated fadeIn">
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
										</div>')

	childView : ListItemView

	childViewContainer : '.units'


	ui :
		viewtog      : '#view_toggle'


	events : 
		'click @ui.viewtog':(e)->
			$('.us-left-content').toggleClass 'not-visible visible'
			$('.us-right-content').toggleClass 'not-visible visible'
			
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

		'click .Plots':(e)->
			units = plotVariantCollection.getPlotUnits()
			data = {}
			data.units = units
			data.type = 'plot'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterPlotListCtrl region : @region
			# @trigger "load:units" , data


	onShow:->
		if bunglowVariantCollection.length != 0
			$('.Villas').removeClass 'hidden'

		if plotVariantCollection.length != 0
			$('.Plots').removeClass 'hidden'
			
		$('.units').mCustomScrollbar
			theme: 'inset'



#Controller for lsiting all teh buildings in a project
class CommonFloor.MasterBuildingListCtrl extends Marionette.RegionController

	initialize:->
		@view = view = new MasterBuildingListView
					collection : buildingCollection
		# @listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data
