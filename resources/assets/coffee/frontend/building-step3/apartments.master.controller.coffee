api = ""
currentBreakPoint = 0
breakPoints = []
class CommonFloor.ApartmentsMasterView extends Marionette.LayoutView

	template : '#apartment-master-template'



class CommonFloor.ApartmentsMasterCtrl extends Marionette.RegionController


	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
		if apartmentVariantCollection.length == 0
			@show new CommonFloor.NothingFoundView
		else
			@show new CommonFloor.ApartmentsMasterView


class CommonFloor.TopApartmentMasterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="container-fluid animated fadeIn">
										<div class="row">
											<div class="col-md-12 col-xs-12 col-sm-12">

												<div class="breadcrumb-bar">
													<a class="unit_back" href="#"></a>
												</div>
											   
												<div class="header-info">
													<h2 class="pull-left proj-name">{{project_title}} - {{name}}</h2>

													<div class="proj-type-count">
														<h2 class="pull-left">{{results}}</h2><p class="pull-left">Apartment(s)/Penthouse(s)</p>
													</div>

													<div class="pull-left filter-result full">
														 {{#filters}}
																{{#each this}}
																{{#each this}}
															
																	<div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
															{{/each}}
															 {{/each}}
															 {{/filters}}
															  {{#area}}
																
																	<div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
															 
															 {{/area}}
														 {{#budget}}
																
																	<div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
															
															 {{/budget}}

															  {{#views}}
													         	 <li>
													                <div class="filter-pill"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> 
													         </li>
													         {{/views}}

													       {{#facings}}
													         	 <li>
													                <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" ></span> </div> 
													         </li>
													         {{/facings}}

														 {{#floor}}
																
																	<div class="filter-pill"> {{name}} {{type}} <span class="icon-cross floor" id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
															
															 {{/floor}}

														  {{#status}}
																
																	<div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
															
															 {{/status}}
																							   
													</div>
												</div>

											</div>
										</div>
									</div>')
	
	ui  :
		unitBack : '.unit_back'
		unitTypes : '.unit_types'
		priceMin : '.price_min'
		priceMax : '.price_max'
		status : '#filter_available'
		apply : '.apply'
		variantNames : '.variant_names'
		area : '#filter_area'
		budget : '#filter_budget'
		types : '.types'
		floor : '.floor'
		filter_flooring : '.filter_flooring'
		views : '.views'
		facings : '.facings'

	initialize:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		@building_id = building_id

	serializeData:->
		data = super()
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		units = Marionette.getOption( @, 'units' )
		data.units = units.length
		data.project_title = project.get('project_title')
		main = CommonFloor.getStepFilters()
		mainFilters = main[0].filters[0]
		data.filters = []
		if ! _.isUndefined mainFilters
			data.filters  = main[0].filters[0].filters
		data.area  = main[0].area
		data.budget  = main[0].price
		data.status  = main[0].status
		data.floor  = main[0].floor
		data.views  = main[0].views
		data.facings  = main[0].facings
		
		results  = apartmentVariantCollection.getApartmentUnits()
		temp = new Backbone.Collection results
		newTemp = temp.where
				'building_id' : parseInt building_id
		data.results = newTemp.length
		model = buildingMasterCollection.findWhere
						'id' : building_id
		data.name  = model.get 'building_name'
		data

	events:->
		'click @ui.types':(e)->
			arr = CommonFloor.defaults['type'].split(',')
			index = arr.indexOf $(e.target).attr('data-id')
			arr.splice(index, 1)
			CommonFloor.defaults['type'] = arr.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.unitBack':(e)->
			e.preventDefault()
			# $.each CommonFloor.defaults,(index,value)->
			# 	CommonFloor.defaults[index] = ""
			# CommonFloor.removeStepFilters()
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterStepNew()
			previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '#/master-view' , true

		'click @ui.unitTypes':(e)->
			unitTypes = CommonFloor.defaults['apartment']['unit_type_id'].split(',')
			unitTypes = _.without unitTypes , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['apartment']['unit_type_id'] = unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'
			
		'click @ui.variantNames':(e)->
			variantNames = CommonFloor.defaults['apartment']['unit_variant_id'].split(',')
			variantNames = _.without variantNames , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['apartment']['unit_variant_id'] = variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 	
			@trigger  'render:view'

		'click @ui.status':(e)->
			CommonFloor.defaults['common']['availability'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

			

		'click @ui.area':(e)->
			CommonFloor.defaults['common']['area_max'] = ""
			CommonFloor.defaults['common']['area_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.budget':(e)->
			CommonFloor.defaults['common']['price_max'] = ""
			CommonFloor.defaults['common']['price_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.floor':(e)->
			CommonFloor.defaults['common']['floor_max'] = ""
			CommonFloor.defaults['common']['floor_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			# CommonFloor.filterBuilding(@building_id)
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.facings':(e)->
			types = CommonFloor.defaults['common']['facings'].split(',')
			types = _.without types ,$(e.currentTarget).attr('data-id')
			CommonFloor.defaults['common']['facings'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.views':(e)->
			types = CommonFloor.defaults['common']['views'].split(',')
			types = _.without types ,$(e.currentTarget).attr('data-id')
			CommonFloor.defaults['common']['views'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterStepNew()
			unitTempCollection.trigger( "filter_available") 
			@trigger  'render:view'

		'click @ui.filter_flooring':(e)->
			flooring = CommonFloor.defaults['apartment']['flooring'].split(',')
			flooring = _.without flooring , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['apartment']['flooring'] = flooring.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filterStepNew()
			unitCollection.trigger('filter_available')
			@trigger  'render:view'

	onShow:->
		# if CommonFloor.router.history.length == 1
		# 	@ui.unitBack.hide()
		results  = CommonFloor.getFilters()
		if results.length == 0
			$('.proj-type-count').text 'No results found'


class CommonFloor.TopApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@renderMasterTopView()
		unitTempCollection.bind( "filter_available", @renderMasterTopView, @) 

	renderMasterTopView:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		buildingModel = buildingMasterCollection.findWhere
							id : building_id
		@view =  new CommonFloor.TopApartmentMasterView
					model : buildingModel
					units : response

		@listenTo @view,"render:view" ,@loadController

		@show @view

	loadController:->
		# Backbone.trigger "render:view" 
		window.unitTypes = []
		window.unitVariants = []
		window.variantNames = []
		window.price = ''
		window.area = ''
		window.type  = []
		@region =  new Marionette.Region el : '#filterregion'
		new CommonFloor.FilterApartmentCtrl region : @region

class ApartmentsView extends Marionette.ItemView

	template : Handlebars.compile('	<div class="row">
										<div class="col-xs-5  info">
											<b class="bold">{{floor}}</b>-{{unit_name}} 
									  	</div>  

										<div class="col-xs-3  info">
											{{unit_type}}
										</div> 
										
										<div class="col-xs-4 text-primary">
											<span class="icon-rupee-icn"></span>{{price}} <!--<span class="tick"></span>-->
										</div> 
									</div>')

	initialize:->
		@$el.prop("id", 'apartment'+@model.get("id"))

	ui :
		onview : '.onview'
		

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
		data.price = window.numDifferentiation(response[3])
		unitType = unitTypeMasterCollection.findWhere
							'id' :  @model.get('unit_type_id')
		property = window.propertyTypes[unitType.get('property_type_id')]
		data.property = s.capitalize(property)
		data.floor = 'F' + @model.get('floor')
		data

	events:
		'mouseover':(e)->
			id = @model.get 'id'
			html = @getHtml(@model.get('id'))
			$('#apartment'+id).addClass ' active'
			$('#'+id).attr('class' ,'layer apartment svg_active '+@model.get('availability'))
			# $('#apartment'+id).attr('class' ,'unit blocks '+@model.get('availability')+' active')
			$('#'+id).tooltipster('content', html)
			$('#'+id).tooltipster('show')

		'mouseout':(e)->
			id = @model.get 'id'
			# $('#apartment'+id).attr('class' ,'unit blocks '+@model.get('availability'))
			$('#apartment'+id).removeClass 'active'	
			$('#'+id).attr('class' ,'layer apartment '+@model.get('availability'))
			$('#'+id).tooltipster('hide')

		'click':(e)->
			if $(e.currentTarget).hasClass 'onview'
				breakpoint = 10
				currentBreakPoint =  _.indexOf(breakPoints,breakpoint)
				# spin = $('#spritespin')
				# data = $("#spritespin").spritespin({}).data("spritespin")
				# data.stopFrame = 10
				# SpriteSpin.updateFrame(data)
				api.playTo(breakpoint, 
					nearest: true
				)

			else
				@model.get('availability') == 'available'
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true
				CommonFloor.router.storeRoute()

	

	getHtml:(id)->
		html = ""
		id = parseInt id
		unit = unitCollection.findWhere
					'id' : id
		if unit is undefined
			html = '<div class="svg-info">
							<div class="action-bar2">
							<div class="txt-dft"></div>
						</div> 
						<h5 class="pull-left">
							Apartment details not entered 
						</div>  
					</div>'
			$('.apartment').tooltipster('content', html)
			return false

		response = window.unit.getUnitDetails(id)
		price =  window.numDifferentiation(response[3])
		availability = unit.get('availability')
		availability = s.decapitalize(availability)
		html = ""
		html += '<div class="svg-info '+availability+'">
					<div class="action-bar">
						<div class="apartment"></div>
					</div>

					<h5 class="pull-left m-t-0">'+unit.get('unit_name')+'</h5>


					<!--<span class="label label-success"></span-->
					<br><br>
					<div class="details">
						<div>
							'+response[1].get('name')+' ('+response[0].get('super_built_up_area')+' '+project.get('measurement_units')+')
						</div>
						<div class="text-primary">
						<span class="icon-rupee-icn"></span>'+price+'
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

	onShow:->
		id = @model.get 'id'
		availability = @model.get('availability')
		status = s.decapitalize(availability)
		classname =  $('#apartment'+id).attr('class')
		
		$('#apartment'+id).addClass classname+' '+status
		CommonFloor.applyOnViewClass()
		
		
		# $('#apartment'+id).attr('class' , classname+' '+status)


class CommonFloor.LeftApartmentMasterView extends Marionette.CompositeView

	template : '<div>
					<div id="trig" class="toggle-button"></div>
					<div id="view_toggle" class="toggle-view-button map"></div>

					<div class="list-view-container w-map animated fadeInLeft">
						<div class="advncd-filter-wrp  unit-list">
							<div class="legend clearfix">
							  <ul>
								<li class="available">AVAILABLE</li>
								<li class="sold">SOLD</li>
								<li class="blocked">BLOCKED</li>
								<li class="na">N/A</li>
							  </ul>
							 </div>
							 <div class="sort-unit"> In View
							 	<input type="checkbox" name="inview" id="inview" checked data-toggle="toggle" data-on="&nbsp;" data-off="&nbsp;" data-onstyle="warning" data-offstyle="warning">
							 	All Units
							 </div>
							
							<p class="text-center help-text">Hover on the units for more details</p>
							<ul class="units one apartments">
							</ul>					                			
						</div>
					</div>
				</div>'

	childView : ApartmentsView

	childViewContainer : '.units'

	ui :
		viewtog 	: '#view_toggle'
		trig 		: '#trig'
		notinview   :  '#notinview'
		inview   	:  '#inview'

	events :
		'change @ui.inview':(e)->
			if $(e.currentTarget).is(':checked')
				@showInView()
			else
				@showNotInView()
		'click @ui.trig':(e)->
			$('.list-container').toggleClass 'closed'

		'click @ui.viewtog':(e)->
			$('.us-left-content').toggleClass 'not-visible visible'
			$('.us-right-content').toggleClass 'not-visible visible'

	showInView:->
		$('.onview').hide()

	showNotInView:->
		$('.onview').show()

	onShow:->
		@ui.inview.bootstrapToggle()



class CommonFloor.LeftApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@renderLeftView()
		unitTempCollection.bind( "filter_available", @renderLeftView, @) 

	renderLeftView:->
		
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		if response.length == 0
			region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.NoUnitsCtrl region : region
			return
		unitsCollection = new Backbone.Collection response
		@view = new CommonFloor.LeftApartmentMasterView
				collection : unitsCollection

		@show @view

	

class CommonFloor.CenterApartmentMasterView extends Marionette.ItemView


	template : Handlebars.compile('<div class="col-md-12 col-sm-12 col-xs-12 us-right-content mobile visible animated fadeIn overflow-h">

										<div class="legend clearfix">
										  <ul>
											<!--<li class="available">AVAILABLE</li>-->
											<li class="sold">N/A</li>
											<!--<li class="blocked">BLOCKED</li>
											<li class="na">Available</li>-->
										  </ul>
										</div>

										<div class="zoom-controls">
											<div class="zoom-in"></div>
											<div class="zoom-out"></div>
										</div>

										<div id="view_toggle" class="toggle-view-button list"></div>
										<div id="trig" class="toggle-button hidden">List View</div>
										  
										<div class=" master animated fadeIn">
											<div class="single-bldg">
												<div class="prev"></div>
												<div class="next"></div>
											</div>
											
											<div id="spritespin"></div>
											<div class="svg-maps">
												<img class="first_image lazy-hidden img-responsive" />
												<div class="region inactive"></div>
											</div>

											<div class="cf-loader hidden"></div>
										</div>
										
										<div class="rotate rotate-controls hidden">
											<div id="prev" class="rotate-left">Left</div>
											<span class="rotate-text">Rotate</span>
											<div id="next" class="rotate-right">Right</div>
										</div>

										<div class="mini-map">
											<img class="firstimage img-responsive" src=""/>
											<div class="project_master"></div>
										</div>
										  
									</div>')


	ui :
		svgContainer : '.master'
		# trig         : '#trig'
		viewtog      : '#view_toggle'

	
	# initialize:->
	# 	currentBreakPoint = 0
	# 	breakPoints = []
		

	events:
		# 'click @ui.trig':(e)->
		# 	$('.us-left-content').toggleClass 'col-0 col-md-3'
		# 	$('.us-right-content').toggleClass 'col-md-12 col-md-9'
		# 	that = @
		# 	CommonFloor.applyOnViewClass()
		# 	setTimeout( (x)->
				
		# 		$('#spritespin').spritespin(
		# 			width: that.ui.svgContainer.width() + 13
		# 			sense: -1
		# 			height: that.ui.svgContainer.width() / 2
		# 			animate: false
		# 		)
		# 		$('.svg-maps > div').first().css('width',that.ui.svgContainer.width() + 13)
		# 		$('.first_image').first().css('width',that.ui.svgContainer.width() + 13)

		# 		height= that.ui.svgContainer.width() / 2
		# 		$('.units').css('height',height-10)

		# 	, 650)

		# 	setTimeout( (x)->
		# 		$('.master').panzoom('resetDimensions');				
		# 	, 800)

			
		'click @ui.viewtog':(e)->
			$('.us-left-content').toggleClass 'not-visible visible'
			$('.us-right-content').toggleClass 'not-visible visible'
			
		'click #prev':->
			@setDetailIndex(currentBreakPoint - 1)

		'click #next':->
			@setDetailIndex(currentBreakPoint + 1)

		# 'click .list':(e)->
		# 	e.preventDefault()
		# 	url = Backbone.history.fragment
		# 	building_id = parseInt url.split('/')[1]
		# 	CommonFloor.navigate '/building/'+building_id+'/apartments' , true
		# 	# CommonFloor.router.storeRoute()

		# 'click .map':(e)->
		# 	e.preventDefault()
		# 	url = Backbone.history.fragment
		# 	building_id = parseInt url.split('/')[1]
		# 	CommonFloor.navigate '/building/'+building_id+'/master-view' , true
		# 	# CommonFloor.router.storeRoute()

		'mouseover .apartment':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere
					'id' : id
			unitMaster = unitMasterCollection.findWhere 
				id :  id 
			if unit is undefined && unitMaster != undefined
				html = '<div class="svg-info">
								<div class="action-bar2">
								<div class="txt-dft"></div>
							</div> 
							<h5 class="pull-left">
								Not in selection
							</div>  
						</div>'
				$('.apartment').tooltipster('content', html)
				return 
			if unit is undefined
				html = '<div class="svg-info">
								<div class="action-bar2">
								<div class="txt-dft"></div>
							</div> 
							<h5 class="pull-left">
								Apartment details not entered 
							</div>  
						</div>'
				$('.apartment').tooltipster('content', html)
				return false

			response = window.unit.getUnitDetails(id)
			price =  window.numDifferentiation(response[3])
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			html = ""
			html += '<div class="svg-info '+availability+'">
						<div class="action-bar">
							<div class="apartment"></div>
						</div>

						<h5 class="pull-left m-t-0">'+unit.get('unit_name')+'</h5>

						<br><br>
						<!--<span class="label label-success"></span-->
						<div class="details">
							<div>
								'+response[1].get('name')+' ('+response[0].get('super_built_up_area')+' '+project.get('measurement_units')+')
							</div>
							<div class="text-primary">
								<span class="icon-rupee-icn"></span>'+price+'
							</div>  
						</div>'
			if availability == 'available'
				html +='<a href="#unit-view/'+id+'" class="view-unit">
							<div class="circle">
								<span class="arrow-up icon-chevron-right"></span>
							</div>
						</a>
						<div class="details">
							<div class="text-muted text-default">Click arrow to move forward</div>
						</div>

					</div>'
			else
				html += '</div>'
			$('#'+id).attr('class' ,'layer apartment svg_active '+availability) 
			$('#apartment'+id).addClass ' active'
			$('.units').mCustomScrollbar("scrollTo",'#apartment'+id)
			$('.apartment').tooltipster('content', html)
		
		'mouseout .apartment':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere
					'id' : id
			if unit is undefined
				return
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			$('#'+id).attr('class' ,'layer apartment '+availability) 
			# $('#apartment'+id).attr('class' ,'unit blocks '+availability)
			$('#apartment'+id).removeClass ' active'

		'mouseover .marker-grp':(e)->
			html = '<div><label>Title:</label>'+$(e.currentTarget).attr('data-amenity-title')+
					'<br/><label>Desc:</label>'+$(e.currentTarget).attr('data-amenity-desc')+'</div>'

			$('.layer').tooltipster('content', html)

		# 'click .apartment':(e)->
		# 	id = parseInt e.target.id
		# 	CommonFloor.navigate '/unit-view/'+id , true
		# 	# CommonFloor.router.storeRoute()

		'mouseover .next,.prev':(e)->
			id = parseInt $(e.target).attr('data-id')
			buildingModel = buildingMasterCollection.findWhere
								'id' : id
			images = Object.keys(buildingModel.get('building_master')).length
			# if images != 0
			# 	console.log "show image"
			floors = buildingModel.get 'floors'
			floors = Object.keys(floors).length
			unitTypes = window.building.getUnitTypes(id)
			response = window.building.getUnitTypesCount(id,unitTypes)
			html = '<div class="svg-info">
						<h4 class="pull-left">'+buildingModel.get('building_name')+'</h4>
							<h4 class="pull-left">'+window.building.getMinimumCost(id)+'</h4>
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
			$(e.target).tooltipster('content', html)

		'click .next,.prev':(e)->
			id = parseInt $(e.target).attr('data-id')
			buildingModel = buildingMasterCollection.findWhere
								'id' : id
			if Object.keys(buildingModel.get('building_master')).length == 0
				CommonFloor.navigate '/building/'+id+'/apartments' , true
				# CommonFloor.router.storeRoute()
			else
				CommonFloor.navigate '/building/'+id+'/master-view' , true
				# CommonFloor.router.storeRoute()
				


		


	onShow:->

		windowHeight = $(window).innerHeight() - 56
		$('.master').css 'height', windowHeight
		$('.master').css 'min-width', windowHeight * 2

		@getNextPrev()
		$('img').lazyLoadXT()
		height =  @ui.svgContainer.width() / 2
		$('.search-left-content').css('height',height)
		$('#spritespin').hide()
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		building = buildingMasterCollection.findWhere
							id : building_id
		transitionImages = []
		svgs = {}
		that = @
		breakpoints = building.get 'breakpoints'
		$.each breakpoints,(index,value)->
			svgs[value] = BASEURL+'/projects/'+PROJECTID+'/buildings/'+building_id+'/master-'+value+'.svg'
		
		$.merge transitionImages ,  building.get('building_master')
		first = _.values svgs
		
		$('.first_image').lazyLoadXT()
		$('.first_image').load ()->
			$('.region').load(first[0],()->
				$('.first_image').attr('data-src',transitionImages[breakpoints[0]])
				that.iniTooltip()
				CommonFloor.applyAvailabilClasses()
				CommonFloor.randomClass()
				CommonFloor.applyFliterClass()
				CommonFloor.getApartmentsInView()
				that.loadZoom()
				response = building.checkRotationView(building_id)
				$('.cf-loader').removeClass 'hidden'
				if response is 1
					$('.cf-loader').removeClass 'hidden'
			).addClass('active').removeClass('inactive')
			
		
		@initializeRotate(transitionImages,svgs,building)
		@loadProjectMaster()

		if $(window).width() > 991
			$('.units').mCustomScrollbar
				theme: 'cf-scroll'

	loadProjectMaster:->
		svgs = []
		masterbreakpoints = project.get('breakpoints')
		$.each masterbreakpoints,(index,value)->
			svgs[value] = BASEURL+'/projects/'+PROJECTID+'/master/master-'+value+'.svg'

		
		first = _.values svgs
		transitionImages = []
		$.merge transitionImages ,  project.get('project_master')
		if project.get('project_master').length != 0
			$('.project_master').load(first[0],()->
				$('.firstimage').attr('src',transitionImages[masterbreakpoints[0]])
				url = Backbone.history.fragment
				building_id = url.split('/')[1]
				$('.villa,.plot').each (ind,item)->
					id = parseInt item.id
					$('#'+id).attr('class', "")
				$('#'+building_id+'.building').attr('class' ,'layer building svg_active'))
		

	getNextPrev:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		buildingModel = buildingMasterCollection.findWhere
					'id' : building_id
		buildingMasterCollection.setRecord(buildingModel)
		next = buildingMasterCollection.next()
		if _.isUndefined next
			$('.next').hide()
		else
			$('.next').attr('data-id',next.get('id'))
		prev = buildingMasterCollection.prev()
		if _.isUndefined prev
			$('.prev').hide()
		else
			$('.prev').attr('data-id',prev.get('id'))


	setDetailIndex:(index)->
		$('.region').empty()
		$('.region').addClass('inactive').removeClass('active')
		currentBreakPoint = index;
		if (currentBreakPoint < 0) 
			currentBreakPoint = breakPoints.length - 1
		
		if (currentBreakPoint >= breakPoints.length) 
			currentBreakPoint = 0
		
		api.playTo(breakPoints[currentBreakPoint], 
			nearest: true
		)

	initializeRotate:(transitionImages,svgs,building)->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		frames = transitionImages
		breakPoints = building.get 'breakpoints'
		currentBreakPoint = 0
		width = @ui.svgContainer.width() + 20
		$('.svg-maps > div').first().removeClass('inactive').addClass('active').css('width',width);
		spin = $('#spritespin')
		spin.spritespin(
			source: frames
			width: @ui.svgContainer.width() 
			sense: -1
			height: @ui.svgContainer.width() / 2
			animate: false
		)
		that = @
		api = spin.spritespin("api")
		spin.bind("onFrame" , ()->
			data = api.data
			if data.frame is data.stopFrame
				url = svgs[data.frame]
				$('.region').load(url,()->
					that.iniTooltip()
					CommonFloor.applyAvailabilClasses()
					CommonFloor.randomClass()
					CommonFloor.applyFliterClass()
					CommonFloor.getApartmentsInView()
					CommonFloor.applyOnViewClass()
					that.loadZoom()).addClass('active').removeClass('inactive')
				
				
		)
		spin.bind("onLoad" , ()->
			response = building.checkRotationView(building_id)
			if response is 1
				$('.first_image').remove()
				$('.rotate').removeClass 'hidden'
				$('#spritespin').show()
				$('.cf-loader').addClass 'hidden'
			$('.region').load(url,()->
				that.iniTooltip()
				that.loadZoom()
				CommonFloor.applyAvailabilClasses()
				CommonFloor.randomClass()
				CommonFloor.applyFliterClass()
				CommonFloor.getApartmentsInView()
				that.loadZoom()).addClass('active').removeClass('inactive')


				
		)


	iniTooltip:->
		$('.apartment,.next,.prev').tooltipster(
			theme: 'tooltipster-shadow',
			contentAsHTML: true
			onlyOne : true
			arrow : false
			offsetX : 50
			offsetY : -40
			trigger: 'hover'
			interactive : true
			functionReady:(e)->
				$('.view-unit').on('click' , (e)->
					$('.layer').tooltipster('hide')
					$('svg').attr('class' ,'zoom')
					$('#spritespin').addClass 'zoom'
					$('.us-right-content').addClass 'fadeOut'
					$('.cf-loader').removeClass 'hidden'
				)
		)

	loadZoom:->
		$('.master').panzoom
			contain: 'invert'
			minScale: 1
			maxScale: 2.4
			increment: 0.4
			$zoomIn: $('.zoom-in')
			$zoomOut: $('.zoom-out')
			# $set: $('.spritespin-canvas')

		$('.master polygon').on 'mousedown touchstart', (e) ->
			e.stopImmediatePropagation()
	



class CommonFloor.CenterApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.CenterApartmentMasterView
					