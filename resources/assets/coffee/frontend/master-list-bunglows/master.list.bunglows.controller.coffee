#view for a bungalow : model
class BunglowListView extends Marionette.ItemView

	template : Handlebars.compile('	<div class=" info">
										<label class="pull-left">{{unit_name}}</label><span class="status-icon"></span> <div class="pull-right">{{unit_type}}</div> <!--{{super_built_up_area}}sqft-->
										<div class="clearfix"></div>
									</div>
									<div class="cost">
									 <span class="icon-rupee-icn"> </span>{{price}}
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
		data.price = window.numDifferentiation(response[3])
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
			# @iniTooltip(@model.get('id'))
			html = @getHtml(@model.get('id'))
			id = @model.get('id')
			# $('.villa').attr('class','layer villa')
			$('#'+id+'.villa').attr('class' ,'layer villa svg_active '+@model.get('status'))
			$('#unit'+id).attr('class' ,'unit blocks'+' '+@model.get('status')+' active')
			$('#'+id).tooltipster('content', html)
			$('#'+id).tooltipster('show')
			
	
			
			
		'mouseout':(e)->
			id = @model.get('id')
			$('#'+id+'.villa').attr('class' ,'layer villa '+@model.get('status'))
			$('#unit'+id).attr('class' , 'unit blocks '+' '+@model.get('status'))
			$('#'+id).tooltipster('hide')
			# CommonFloor.applyVillaClasses(@classname)
			

		'click' :(e)->
			id = @model.get('id')
			unit = unitCollection.findWhere 
				id :  id 
		
			if ! _.isUndefined unit 
				setTimeout( (x)->
					CommonFloor.navigate '/unit-view/'+id , trigger : true
					# CommonFloor.router.storeRoute()

				, 500)

			# html = @getHtml(@model.get('id'))
			# id = @model.get('id')
			# $('#'+id+'.villa').attr('class' ,'layer villa svg_active '+@model.get('status'))
			# $('#unit'+id).attr('class' ,'unit blocks'+' '+@model.get('status')+' active')
			# $('#'+id).webuiPopover(
			# 	trigger : 'manual'
			# 	content : html
			# 	closeable:true
			# 	placement : 'top'

			# )
			# $('#'+id).webuiPopover('show')
			# # $('#'+id).webuiPopover().on('shown.webui.popover', (e)->

			# # 	$('.close').bind('click', (e)->
			# # 		$('.layer').tooltipster('content', html)
			# # 		$('.tooltip-overlay').addClass 'hidden'
			# # 	)
			# # 	$('.layer').tooltipster('hide')
			# # 	$('.tooltip-overlay').removeClass 'hidden'
			# # )
			
			
			
			

	iniTooltip:(id)->
		$('#'+id).trigger('click')

	getHtml:(id)->
		html = ""
		unit = unitCollection.findWhere 
			id :  id 
		unitMaster = unitMasterCollection.findWhere 
			id :  id 
		if unit is undefined
			html += '<div class="svg-info">
						<div class="action-bar2">
					        <div class="txt-dft"></div>
					    </div> 
						<h5 class="pull-left">Villa details not entered </h5>
						 
					</div>'
			$('.layer').tooltipster('content', html)
			return 


		response = window.unit.getUnitDetails(id)
		price = window.numDifferentiation(response[3])
		availability = unit.get('availability')
		availability = s.decapitalize(availability)
		html = ""
		html += '<div class="svg-info '+availability+' ">
					<div class="action-bar">
						<div class="villa"></div>
					</div>

					<h5 class="pull-left m-t-0">'+unit.get('unit_name')+'</h5>
					<br> <br>
					
					<div class="details">
						<div>
							'+response[1].get('name')+' ('+response[0].get('super_built_up_area')+' '+project.get('area_unit')+')
							<!--<label>Variant</label> - '+response[0].get('unit_variant_name')+'-->
						</div>
						<div class="text-primary">
							 <span class="text-primary icon-rupee-icn"></span>'+price+'
						</div>
						 
					</div>'

		if availability == 'available'
			html +='<div class="circle">
						<a href="#unit-view/'+id+'" class="arrow-up icon-chevron-right"></a>
					</div>
					<div class="details">
						<div class="text-muted text-default">Click arrow to move forward</div>
					</div>
				</div>'
		else
			html += '</div>'
		html


#view for list of bungalows : Collection
class MasterBunglowListView extends Marionette.CompositeView


	template : Handlebars.compile('	<div id="trig" class="toggle-button"></div>

									<div id="view_toggle" class="toggle-view-button map"></div>

									<div class="list-view-container w-map animated fadeIn">
							            <div class="text-center">
							              <ul class="prop-select">

							                <li class="prop-type buildings hidden">Buildings</li>
							                <li class="prop-type Villas active ">Villas</li>
											<li class="prop-type Plots_tab hidden">Plots</li>
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
		viewtog 	: '#view_toggle'
		trig 		: '#trig'

	events :
		'click @ui.trig':(e)->
			$('.list-container').toggleClass 'closed'

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

		'click .Plots_tab':(e)->
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
			$('.Plots_tab').removeClass 'hidden'

		# if!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		# $(window).resize ->
		if $(window).width() > 991
			$('.units').mCustomScrollbar
				theme: 'cf-scroll'
		

#controller for the Center region
class CommonFloor.MasterBunglowListCtrl extends Marionette.RegionController

	initialize:->
		newUnits = bunglowVariantCollection.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@view = view = new MasterBunglowListView
			collection : unitsCollection
		# @listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data

