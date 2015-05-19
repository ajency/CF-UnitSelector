#view for a bungalow : model
class BunglowListView extends Marionette.ItemView

	template : Handlebars.compile('	<div class=" info">
										<label class="pull-left">{{unit_name}}</label><span class="status-icon"></span> <div class="pull-right">{{unit_type}}</div> <!--{{super_built_up_area}}sqft-->
										<div class="clearfix"></div>
									</div>
									<div class="cost">
									  {{price}}
									</div>')

	initialize:->
		@$el.prop("id", 'unit'+@model.get("id"))
		@classname = ''

	
	tagName: 'li'

	className : 'unit blocks'



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

		'mouseover,click' :(e)->
			@iniTooltip(@model.get('id'))
			html = @getHtml(@model.get('id'))
			id = @model.get('id')
			# $('.villa').attr('class','layer villa')
			$('#'+id+'.villa').attr('class' ,'layer villa svg_active '+@model.get('status'))
			$('#unit'+id).attr('class' ,'unit blocks'+' '+@model.get('status')+' active')
			$('#'+id).tooltipster('content', html)
			$('.region').attr('style', ' stroke-width: 3px; stroke-dasharray: 320 0;stroke-dashoffset: 0;')
			
			
		'mouseout':(e)->
			id = @model.get('id')
			# $('#'+id+'.villa').attr('class' ,'layer villa')
			$('#unit'+id).attr('class' , 'unit blocks'+' '+@model.get('status'))
			$('#'+id).tooltipster('hide')
			CommonFloor.applyVillaClasses(@classname)

		'click' :(e)->
			@iniTooltip(@model.get('id'))
			html = @getHtml(@model.get('id'))
			id = @model.get('id')
			# $('.villa').attr('class','layer villa')
			$('#'+id+'.villa').attr('class' ,'layer villa svg_active '+@model.get('status'))
			$('#unit'+id).attr('class' ,'unit blocks'+' '+@model.get('status')+' active')
			$('#'+id).tooltipster('content', html)
			$('.region').attr('style', ' stroke-width: 3px; stroke-dasharray: 320 0;stroke-dashoffset: 0;')

	iniTooltip:(id)->
		$('#'+id).trigger('mouseover')

	getHtml:(id)->
		html = ""
		unit = unitCollection.findWhere 
			id :  parseInt id 
		if unit is undefined
			html += '<div class="svg-info">
						<div class="details empty">
							Villa details not entered 
						</div>  
					</div>'
			$('.layer').tooltipster('content', html)
			return 


		response = window.unit.getUnitDetails(id)
		window.convertRupees(response[3])
		availability = unit.get('availability')
		availability = s.decapitalize(availability)
		html = ""
		html += '<div class="svg-info '+availability+' ">
					<div class="action-bar">
						<div class="villa"></div>
					</div>

					<h5 class="pull-left m-t-0">'+unit.get('unit_name')+'</h5>
					<br> <br>
					<!--<span class="pull-right icon-cross"></span>
					<span class="label label-success"></span
					<div class="clearfix"></div>-->
					<div class="details">
						<div>
							'+response[1].get('name')+' ('+response[0].get('super_built_up_area')+' Sq.ft)
							<!--<label>Variant</label> - '+response[0].get('unit_variant_name')+'-->
						</div>
						<div>
							Starting Price <span class="text-primary">'+$('#price').val()+'</span>
						</div> 
					</div>'

		if availability == 'available'
			html +='<div class="circle">
						<a href="#unit-view/'+id+'" class="arrow-up icon-chevron-right"></a>
					</div> 
				</div>'
		else
			html += '</div>'
		html


#view for list of bungalows : Collection
class MasterBunglowListView extends Marionette.CompositeView


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
							                <li class="prop-type Villas active ">Villas/Bungalows</li>
											<li class="prop-type Plots hidden">Plots</li>
							              </ul>
							            </div>
							            <div class="advncd-filter-wrp  unit-list">
							            	<div class="legend clearfix">
							            	  <ul>
							            	    <!--<li class="available">AVAILABLE</li>-->
							            	    <li class="sold">Not Available</li>
							            	    <!--<li class="blocked">BLOCKED</li>-->
							            	    <li class="na">Not in Selection</li>
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
							                <ul class="units two">
							                </ul>
							                <div class="clearfix"></div>

										</div>
									</div>')

	childView : BunglowListView

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
		if plotVariantCollection.length != 0
			$('.Plots').removeClass 'hidden'

		# if!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		# $(window).resize ->
		if $(window).width() > 991
			$('.units').mCustomScrollbar
				theme: 'inset'
		

#controller for the Center region
class CommonFloor.MasterBunglowListCtrl extends Marionette.RegionController

	initialize:->
		console.log newUnits = bunglowVariantCollection.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@view = view = new MasterBunglowListView
			collection : unitsCollection
		# @listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data

