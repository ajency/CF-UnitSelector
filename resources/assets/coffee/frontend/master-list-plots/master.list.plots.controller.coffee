#view for a plot : model
class PlotListView extends Marionette.ItemView

	template : Handlebars.compile('	<div class="info">
                                      <h2 class="m-b-5">{{unit_name}}</h2>
                						<div class="floors"><span>{{unit_type}}</span></div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="unit-type-info">
                                      <div class="price {{classname}}"> <span>{{price}}</span></div>
                					 </div>

					                ')

	initialize:->
		@$el.prop("id", 'unit'+@model.get("id"))
		@classname = ''

	
	tagName: 'li'

	className : 'bldg blocks'

	serializeData:->
		data = super()
		response = window.unit.getUnitDetails(@model.get('id'))
		
		data.unit_type = response[1].get('name')
		data.super_built_up_area = response[0].get('super_built_up_area')
		availability = @model.get('availability')
		status = s.decapitalize(availability)
		@model.set 'status' , status
		window.convertRupees(response[3])
		data.price = $('#price').val()
		data



	onShow:->
		id = @model.get 'id'
		availability = @model.get('availability')
		status = s.decapitalize(availability)
		classname =  $('#unit'+id).attr('class')
		$('#unit'+id).attr('class' , classname+' '+status)
		# $('#'+id).attr('class' ,'layer villa  '+ status) 
		# @iniTooltip()

	

	events:

		'mouseover' :(e)->
			id = @model.get('id')
			@classname = $('#'+id+'.villa').attr('class')
			$('.layer').attr('class','layer plot')
			$('#'+id+'.plot').attr('class' ,'layer plot '+@model.get('status'))
			$('#unit'+id).attr('class' ,'bldg blocks'+' '+@model.get('status')+' active')
			
			
		'mouseout':(e)->
			id = @model.get('id')
			# $('#'+id+'.villa').attr('class' ,'layer villa')
			$('#unit'+id).attr('class' , 'bldg blocks'+' '+@model.get('status'))
			CommonFloor.applyPlotClasses(@classname)

		'click' :(e)->
			if @model.get('status') == 'available'
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true
				CommonFloor.router.storeRoute()



#view for list of plots : Collection
class MasterPlotListView extends Marionette.CompositeView

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

							                <li class="prop-type buildings hidden">Buildings</li>
							                <li class="prop-type Villas  hidden ">Villas/Bungalows</li>
							                <li class="prop-type Plots active">Plots</li>
							              </ul>
							            </div>
							            <div class="bldg-list">
							            	<div class="legend clearfix">
							            	  <ul>
							            	    <li class="available">AVAILABLE</li>
							            	    <li class="sold">SOLD</li>
							            	    <li class="blocked">BLOCKED</li>
							            	    <li class="na">N/A</li>
							            	  </ul>
							            	</div>

							            	<p class="text-center help-text">Hover on the units for more details</p>
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
							                <ul class="units one">
							                </ul>
							                <div class="clearfix"></div>
										</div>
							        </div>')

	childView :PlotListView

	childViewContainer : '.units'

	ui :
		viewtog      : '#view_toggle'

	events :
		'click @ui.viewtog':(e)->
			$('.us-left-content').toggleClass 'not-visible visible'
			$('.us-right-content').toggleClass 'not-visible visible'

		'click .buildings':(e)->
			units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterBuildingListCtrl region : @region
			# @trigger "load:units" , data

		'click .Villas':(e)->
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterBunglowListCtrl region : @region
			# @trigger "load:units" , data

		'click .Plots':(e)->
			units = plotVariantCollection.getPlotUnits()
			data = {}
			data.units = units
			data.type = 'plot'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterPlotListCtrl region : @region
			# @trigger "load:units" , data

			

	onShow:->
		if buildingCollection.length != 0
			$('.buildings').removeClass 'hidden'
		if bunglowVariantCollection.length != 0
			$('.Villas').removeClass 'hidden'

		$('.units').mCustomScrollbar
			theme: 'inset'
		

#controller for the Center region
class CommonFloor.MasterPlotListCtrl extends Marionette.RegionController

	initialize:->
		newUnits = plotVariantCollection.getPlotUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@view = view = new MasterPlotListView
			collection : unitsCollection
		@listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data

		