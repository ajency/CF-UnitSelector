#view for the Center setion
class CenterBunglowListView extends Marionette.ItemView

	template : Handlebars.compile('<li class="unit {{status}}">
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
		console.log unitVariant = bunglowVariantCollection.findWhere
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



#Composite view for the Center setion


class CenterCompositeView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-12 us-right-content">
									<div class="list-view-container">
							            <div class="controls mapView">
								            <div class="toggle">
								            	<a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a>
								            </div>
							            </div>
							            <div class="text-center">
							              <ul class="prop-select">
							                <li class="prop-type buildings hidden">buildings</li>
							                <li class="prop-type Villas active ">Villas/Bungalows</li>
							                <li class="prop-type Plots hidden">Plots</li>
							              </ul>
							            </div>
							            <div class="legend">
							              <ul>
							                <li class="sold">SOLD</li>
							                <li class="blocked">BLOCKED</li>
							              </ul>
							            </div>
							            <div class="villa-list">
							            	<ul class="units">
							            	</ul>
							            </div>
							        </div>
							       </div>')

	childView : CenterBunglowListView

	childViewContainer : '.units'

	events : 
		'click .buildings':(e)->
			units = apartmentVariantCollection.getApartmentUnits()
			data = {}
			data.units = units
			data.type = 'building'
			
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.CenterBuildingListCtrl region : @region
			CommonFloor.BunglowListCtrl.prototype.trigger "load:units" , data

		'click .Villas':(e)->
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#centerregion'
			new CommonFloor.ListCtrl region : @region
			CommonFloor.BunglowListCtrl.prototype.trigger "load:units" , data

	onShow:->
		if project.get('project_master').front  == ""
			$('.mapView').hide()
		else
			$('.mapView').show()

		if apartmentVariantCollection.length != 0
			$('.buildings').removeClass 'hidden'
		

#controller for the Center region
class CommonFloor.ListCtrl extends Marionette.RegionController

	initialize:->
		newUnits = bunglowVariantCollection.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@show new CenterCompositeView
			collection : unitsCollection
		