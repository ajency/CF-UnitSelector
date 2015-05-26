#view for each plot
class PlotItemView extends Marionette.ItemView

	template : Handlebars.compile('<li class="unit blocks {{status}}">
                  <div class="pull-left info">
                    <label>{{unit_name}}</label> ({{unit_type}} {{super_built_up_area}} {{area_unit}})
                  </div>
                  <!--<div class="pull-right cost">
                    50 lakhs
                  </div>-->
                </li>')

	initialize:->
		@$el.prop("id", 'unit'+@model.get("id"))

	serializeData:->
		data = super()
		response = window.unit.getUnitDetails(@model.get('id'))
		data.unit_type = response[1].get('name')
		data.super_built_up_area = response[0].get('super_built_up_area')
		availability = @model.get('availability')
		data.status = s.decapitalize(availability)
		@model.set 'status' , status
		data.price = window.numDifferentiation(response[3])
		@model.set 'status' , data.status
		data.area_unit = project.get('area_unit')
		data

	events:
		'click .unit' :(e)->
				if @model.get('status') == 'available'
					CommonFloor.navigate '/unit-view/'+@model.get('id') , true
					# CommonFloor.router.storeRoute()


#Composite view for plots
class PlotView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-12 us-right-content">
									<div class="list-view-container animated fadeInUp">
							            <!--<div class="controls map-View">
								            <div class="toggle">
								            	<a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a>
								            </div>
							            </div>-->
							            	<h2 class="text-center">List of Plots <span class="pull-right top-legend">     <ul>
				                <li class="available">AVAILABLE</li>
				                <li class="na">N/AVAILABLE</li>
				              </ul></span></h2><hr class="margin-none">
							            <div class="text-center">
							              <ul class="prop-select">
							                <li class="prop-type buildings hidden">Buildings</li>
							                <li class="prop-type Villas hidden ">Villas/Bungalows</li>
							                <li class="prop-type Plots active">Plots</li>
							              </ul>
							            </div>
							            <div class="legend">
							              <ul>
							                <li class="available">AVAILABLE</li>
							                <li class="sold">SOLD</li>
							                <li class="blocked">BLOCKED</li>
							                <li class="na">N/A</li>
							              </ul>
							            </div>
							            <div class="clearfix"></div>
							            <div class="villa-list">
							            	<ul class="units">
							            	</ul>
							            </div>
							        </div>
							       </div>')

	childView : PlotItemView

	childViewContainer : '.units'

	
	events : 
		'click .buildings':(e)->
			units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.BuildingListCtrl region : @region
			# @trigger "load:units" , data
			

		'click .Villas':(e)->
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.VillaListCtrl region : @region
			# @trigger "load:units" , data

		'click .Plots':(e)->
			units = plotVariantCollection.getPlotUnits()
			data = {}
			data.units = units
			data.type = 'plot'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.PlotListCtrl region : @region
			# @trigger "load:units" , data
			

	onShow:->
		if apartmentVariantCollection.length != 0
			$('.buildings').removeClass 'hidden'
		if bunglowVariantCollection.length != 0
			$('.Villas').removeClass 'hidden'
		

#controller for the listing all the plots
class CommonFloor.PlotListCtrl extends Marionette.RegionController

	initialize:->
		newUnits = plotVariantCollection.getPlotUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@view = view = new PlotView
			collection : unitsCollection
		@listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data

		