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
		@iniTooltip(@model.get('id'))
		html = @getHtml(@model.get('id'))
		id = @model.get('id')
		availability = @model.get('availability')
		status = s.decapitalize(availability)
		classname =  $('#unit'+id).attr('class')
		$('#unit'+id).attr('class' , classname+' '+status)
		# $('#'+id).attr('class' ,'layer villa  '+ status) 
		# @iniTooltip()

	

	events:

		'mouseover' :(e)->
			@iniTooltip(@model.get('id'))
			html = @getHtml(@model.get('id'))
			id = @model.get('id')
			$('.layer').attr('class','layer plot')
			$('#'+id+'.plot').attr('class' ,'layer plot '+@model.get('status'))
			$('#unit'+id).attr('class' ,'bldg blocks'+' '+@model.get('status')+' active')
			$('#'+id).tooltipster('content', html)
			
			
		'mouseout':(e)->
			id = @model.get('id')
			$('#unit'+id).attr('class' , 'bldg blocks'+' '+@model.get('status'))
			# $('#'+id).tooltipster('hide')
			$('#'+id).tooltipster('show')

		'click' :(e)->
			@iniTooltip(@model.get('id'))
			html = @getHtml(@model.get('id'))
			id = @model.get('id')
			# $('.layer').attr('class','layer plot')
			# $('#'+id+'.plot').attr('class' ,'layer plot '+@model.get('status'))
			# $('#unit'+id).attr('class' ,'bldg blocks'+' '+@model.get('status')+' active')
			$('#'+id).tooltipster('content', html)
			# $('.tooltip-overlay').attr('class','tooltip-overlay')

	iniTooltip:(id)->
		$('#'+id).trigger('click')

	getHtml:(id)->
		html = ""
		id = parseInt id
		unit = unitCollection.findWhere 
				id :  id 
		if unit is undefined
			html += '<div class="svg-info">
						<div class="details">
							Plot details not entered 
						</div>  
					</div>'
			$('.layer').tooltipster('content', html)
			return 
		

		response = window.unit.getUnitDetails(id)
		window.convertRupees(response[3])
		availability = unit.get('availability')
		availability = s.decapitalize(availability)
		html = ""
		html += '<div class="svg-info">
					<h4 class="pull-left">'+unit.get('unit_name')+'</h4>
					<!--<span class="label label-success"></span-->
					<div class="clearfix"></div>
					<div class="details">
						<div>
							<label>Variant</label> - '+response[0].get('unit_variant_name')+'
						</div>
						<div>
							<label>Area</label> - '+response[0].get('super_built_up_area')+' Sq.ft
						</div> 
						<div>
							<label>Unit Type </label> - '+response[1].get('name')+'
						</div>
						<div>
							<label>Price </label> - '+$('#price').val()+'
						</div>  
					</div> 
					</div>'
		if availability == 'available'
			html +='<a href="#unit-view/'+id+'" class="action-bar">To Move forward Click Here <span class="icon-chevron-right pull-right"></span></a>
				</div>'
		else
			html += '</div>'
		
		$('#'+id).attr('class' ,'layer plot '+availability) 
		$('#unit'+id).attr('class' ,'bldg blocks active') 
		$('.layer').tooltipster('content', html)
			



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

		