#view for the Center setion
class BunglowListView extends Marionette.ItemView

	template : Handlebars.compile('<li class="unit blocks {{status}}">
						                <div class="pull-left info">
						                  <label>{{unit_name}}</label> ( {{unit_type}} {{super_built_up_area}}sqft )
						                </div>
						                <div class="pull-right cost">
						                  50 lakhs
						                </div>
						            </li>')

	initialize:->
		@$el.prop("id", 'unit'+@model.get("id"))

	# className : 'blck-wrap'
	tagName: 'li'

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
		'mouseover .row' :(e)->
			id = @model.get('id')
			$('#'+id).attr('class' ,'layer '+@model.get('status'))
		'mouseout .row' :(e)->
			$('.layer').attr('class' ,'layer') 
		'click .row' :(e)->
			if @model.get('status') == 'available'
				CommonFloor.defaults['unit'] = @model.get('id')
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true



#Composite view for the Center setion


class MasterBunglowListView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-3 us-left-content">
									<div class="list-view-container animated fadeInLeft">
							            <!--<div class="controls map-View">
								            <div class="toggle">
								            	<a href="#/master-view" class="map">Map</a><a href="#/list-view" class="list active">List</a>
								            </div>
							            </div>-->
							            <div class="text-center">
							              <ul class="prop-select">
							                <li class="prop-type buildings hidden">buildings</li>
							                <li class="prop-type Villas active ">Villas/Bungalows</li>
							                <li class="prop-type Plots hidden">Plots</li>
							              </ul>
							            </div>
							            <div class="advncd-filter-wrp  unit-list">
											<!--<div class="blck-wrap title-row">
				                  				<div class="row">
								                    <div class="col-sm-4">
								                      <h5 class="accord-head">Villa No</h5>                      
								                    </div>
								                    <div class="col-sm-4">
								                      <h5 class="accord-head">Type</h5>                      
								                    </div>
								                    <div class="col-sm-4">
								                      <h5 class="accord-head">Area</h5>                      
								                    </div>
				                  				</div>
				                			</div>-->
							                <ul class="units four">
							                </ul>
										</div>
							        </div>
							       </div>')

	childView : BunglowListView

	childViewContainer : '.units'

	events : 
		'click .buildings':(e)->
			units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.CenterBuildingListCtrl region : @region
			@trigger "load:units" , data
			

		'click .Villas':(e)->
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.ListCtrl region : @region
			@trigger "load:units" , data
			

	onShow:->
		if project.get('project_master').front  == ""
			$('.map-View').hide()
		else
			$('.map-View').show()

		if apartmentVariantCollection.length != 0
			$('.buildings').removeClass 'hidden'
		

#controller for the Center region
class CommonFloor.MasterBunglowListCtrl extends Marionette.RegionController

	initialize:->
		newUnits = bunglowVariantCollection.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@view = view = new MasterBunglowListView
			collection : unitsCollection
		@listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data

		