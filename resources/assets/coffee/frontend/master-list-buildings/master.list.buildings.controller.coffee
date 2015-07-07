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
											</ul>
					                      	<span class="area {{areaname}}">{{area}} {{measurement_units}}</span>
					                      	<div class="text-primary price {{classname}}">Starting price <span class="icon-rupee-icn"></span>{{price}}</div>
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
		data.price = window.numDifferentiation(cost)
		data.floors =  @model.get 'no_of_floors'
		data.types = types
		data.measurement_units = project.get('measurement_units')
		data

	events:
		'mouseover':(e)->
			@iniTooltip(@model.get('id'))
			html = @getHtml(@model.get('id'))
			id = @model.get('id')
			$('#'+id+'.building').attr('class' ,'layer building svg_active')
			$('#bldg'+id).attr('class' ,'bldg blocks active')
			$('#'+id).tooltipster('content', html)
			$('#'+id).tooltipster('show')

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
			# window.building_id = id
			$('.layer').tooltipster('hide')
			$('svg').attr('class' ,'zoom')
			$('#spritespin').addClass 'zoom'
			$('.us-right-content').addClass 'fadeOut'
			$('.cf-loader').removeClass 'hidden'
			setTimeout( (x)->
				if Object.keys(buildingModel.get('building_master')).length == 0
					CommonFloor.navigate '/building/'+id+'/apartments' , true
					# CommonFloor.router.storeRoute()
				else
					CommonFloor.navigate '/building/'+id+'/master-view' , true
					# CommonFloor.router.storeRoute()

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
						<div class="action-bar2">
					        <div class="txt-dft"></div>
					    </div> 
						<h5 class="pull-left">
							Building details not entered 
						</h5>  
					</div>'
			$('.layer').tooltipster('content', html)
			return 


		floors = buildingModel.get 'floors'
		floors = Object.keys(floors).length
		unitTypes = building.getUnitTypes(id)
		response = building.getUnitTypesCount(id,unitTypes)
		minprice = building.getMinimumCost(id)
		price = window.numDifferentiation(minprice)
		unit = unitCollection.where 
			'building_id' :  id 
			'availability' : 'available'
		if unit.length > 0 
			availability = ' available'
		else
			availability = ' sold'
		html = '<div class="svg-info '+availability+' ">
					<div class="action-bar">
						<div class="building"></div>
					</div>

					<div class="pull-left">
						<h4 class="m-t-0 m-b-5">'+buildingModel.get('building_name')+'	<label class="text-muted">('+floors+' floors)</label></h4>
					
						<div class="details">
							<div class="price">
								Starting from <span class="text-primary"><span class="icon-rupee-icn"></span> '+price+'</span>
							</div>
							<ul class="bldg">'

		$.each response,(index,value)->
			html +='<li>
						<h5 class="m-t-0 m-b-0">' +value.name+'</h5>
						<span>'+value.units+' Available</span>
					</li>'

		if unit.length > 0 
				if Object.keys(buildingModel.get('building_master')).length == 0
					url =  '/building/'+id+'/apartments'
					
				else
					url = '/building/'+id+'/master-view' 
					
				html += '</ul>
						
					</div>
					<a href="#'+url+'" class="view-unit">
						<div class="circle">
							<span class="arrow-up icon-chevron-right"></span>
						</div>
					</a>
				</div>
				</div>'
		html

class BuildingEmptyView extends Marionette.ItemView

	template : 'No units added'

#view for list of buildings : Collection
class MasterBuildingListView extends Marionette.CompositeView

	template : Handlebars.compile('		<div id="trig" class="toggle-button"></div>
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
							                <li class="prop-type Villas hidden">Villas</li>

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
			# MasterBuildingListCtrl@trigger "load:units" , data

		'click .Plots':(e)->
			units = plotVariantCollection.getPlotUnits()
			data = {}
			data.units = units
			data.type = 'plot'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterPlotListCtrl region : @region
			


	onShow:->
		if bunglowVariantCollection.length != 0
             $('.Villas').removeClass 'hidden'
        if plotVariantCollection.length != 0
             $('.Plots').removeClass 'hidden'
		# if CommonFloor.defaults['type'] != ""
		# 	type = CommonFloor.defaults['type'].split(',')
		# 	if $.inArray('villa' ,type) > -1
		# 		$('.Villas').removeClass 'hidden'
		# 	if $.inArray('plot' ,type) > -1
		# 		$('.tab').removeClass 'hidden'
		# else
		# 	arr = _.values(window.propertyTypes)
		# 	if $.inArray('Apartments' ,arr) > -1 || $.inArray('Penthouse' ,arr) > -1
		# 		$('.buildings').removeClass 'hidden'
		# 	if $.inArray('Plot' ,arr) > -1
		# 		$('.tab').removeClass 'hidden'
		# 	if $.inArray('Villas/Bungalows' ,arr) > -1
		# 		$('.Villas').removeClass 'hidden'
			
		if $(window).width() > 991
			$('.units').mCustomScrollbar
				theme: 'cf-scroll'



#Controller for lsiting all teh buildings in a project
class CommonFloor.MasterBuildingListCtrl extends Marionette.RegionController

	initialize:->
		@view = view = new MasterBuildingListView
					collection : buildingCollection
		# @listenTo @view,"load:units" ,@loadController
		@show view

	loadController:(data)=>
		Backbone.trigger "load:units" , data
