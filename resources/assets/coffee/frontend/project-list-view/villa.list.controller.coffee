#view for each villa
class VillaItemView extends Marionette.ItemView

	template : Handlebars.compile('<li class="unit blocks {{status}}">
                  <div class="pull-left info">
                    <label>{{unit_name}}</label> ({{unit_type}} {{super_built_up_area}}sqft)
                  </div>
                  <!--<div class="pull-right cost">
                    50 lakhs
                  </div>-->
                </li>')

	initialize:->
		@$el.prop("id", 'unit'+@model.get("id"))

	serializeData:->
		data = super()
		unitVariant = bunglowVariantCollection.findWhere
							'id' : @model.get('unit_variant_id')
		unitType = unitTypeCollection.findWhere
							'id' : unitVariant.get('unit_type_id')
		data.unit_type = unitType.get('name')
		data.super_built_up_area = unitVariant.get('super_built_up_area')
		availability = @model.get('availability')
		data.status = s.decapitalize(availability)
		@model.set 'status' , data.status
		data

	events:
		'click .unit' :(e)->
				if @model.get('status') == 'available'
					CommonFloor.defaults['unit'] = @model.get('id')
					CommonFloor.navigate '/unit-view/'+@model.get('id') , true
					CommonFloor.router.storeRoute()



#Composite view for villas
class VillaView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-12 us-right-content">
									<div class="list-view-container animated fadeInUp">
							            <!--<div class="controls map-View">
								            <div class="toggle">
								            	<a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a>
								            </div>
							            </div>-->
							            <div class="text-center">
							              <ul class="prop-select">
							                <li class="prop-type buildings hidden">Buildings</li>
							                <li class="prop-type Villas active ">Villas/Bungalows</li>
							                <li class="prop-type Plots hidden">Plots</li>
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

	childView : VillaItemView

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
			

	onShow:->
		# if project.get('project_master').front  == ""
		# 	$('.map-View').hide()
		# else
		# 	$('.map-View').show()

		if apartmentVariantCollection.length != 0
			$('.buildings').removeClass 'hidden'
		

#controller for the listing all the villas
class CommonFloor.VillaListCtrl extends Marionette.RegionController

	initialize:->
		newUnits = bunglowVariantCollection.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@view = view = new VillaView
			collection : unitsCollection
		@listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data

		