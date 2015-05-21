api = ""
#Layout for Poject Master view 
class CommonFloor.ProjectMasterView extends Marionette.LayoutView

	template : '#project-view-template'


#starting point for Poject Master view 
class CommonFloor.ProjectMasterCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID)
			CommonFloor.checkPropertyType()
		if  Object.keys(project.get('project_master')).length  != 0 && unitCollection.length != 0
			@show new CommonFloor.ProjectMasterView
		else
			@show new CommonFloor.NothingFoundView



#View for Poject Master top view 
class TopMasterView extends Marionette.ItemView
	#template
	template : Handlebars.compile('<div class="container-fluid animated fadeIn">
										<div class="row">
											<div class="col-md-12 col-xs-12 col-sm-12">

												<div class="breadcrumb-bar">
													<a class="unit_back" href="#"></a>
												</div>

												<div class="header-info">
													<h2 class="pull-left proj-name">{{project_title}}</h2>
													<div class="proj-type-count">
														{{#types}} 
														<h1 class="pull-left">{{count.length}}</h1><p class="pull-left">{{type}}</p> 
														{{/types}}
													</div>
													<div class="pull-left filter-result full">
														{{#each  filters}}
														{{#each this}}
														<div class="filter-pill"  >
															{{this.name}}{{this.type}}
															<span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span>
														</div>	
														{{/each}}{{/each }}							               
													</div>
													<div class="clearfix"></div>
												</div>

											</div>
										</div>
									</div>')

	ui  :
		unitBack : '.unit_back'
		unitTypes : '.unit_types'
		priceMin : '.price_min'
		priceMax : '.price_max'
		status : '.status'
		apply : '.apply'
		variantNames : '.variant_names'
		area : '#filter_area'
		budget : '#filter_budget'
		types : '.types'
		status : '#filter_available'

	serializeData:->
		data = super()
		status = CommonFloor.getStatusFilters()
		if status.length != 0
			data.status = status
		data.filters  = CommonFloor.getFilters()[0]
		data.results  = CommonFloor.getFilters()[1]
		response = CommonFloor.propertyTypes() 
		data.types = response
		data


	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '/'+previousRoute , true

		'click @ui.types':(e)->
			arr = CommonFloor.defaults['type'].split(',')
			index = arr.indexOf $(e.target).attr('data-id')
			arr.splice(index, 1)
			CommonFloor.defaults['type'] = arr.join(',')
			
			
			if $(e.target).attr('data-id') == 'Villas'
				@removeVillaFilters()
			if $(e.target).attr('data-id') == 'Apartments/Penthouse'
				@removeAptFilters()
			if $(e.target).attr('data-id') == 'Plots'
				@removePlotFilters()
			
			@trigger  'render:view'
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			
			

			
		'click @ui.unitTypes':(e)->
			unitTypes = CommonFloor.defaults['unitTypes'].split(',')
			unitTypes = _.without unitTypes , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@trigger  'render:view'
			
		'click @ui.variantNames':(e)->
			variantNames = CommonFloor.defaults['unitVariants'].split(',')
			variantNames = _.without variantNames , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults['unitVariants'] = variantNames.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()	
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.status':(e)->
			CommonFloor.defaults['availability'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@trigger  'render:view'

			

		'click @ui.area':(e)->
			CommonFloor.defaults['area_max'] = ""
			CommonFloor.defaults['area_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.budget':(e)->
			CommonFloor.defaults['price_max'] = ""
			CommonFloor.defaults['price_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.filter()
			unitCollection.trigger('available')
			@trigger  'render:view'

	onShow:->
		if CommonFloor.router.history.length == 1
			@ui.unitBack.hide()
		response = CommonFloor.propertyTypes() 
		if response.length == 0
			$('.proj-type-count').html '<p class="p-l-15">No results found</p>'

	removeVillaFilters:->
		variants = []
		unittypes = []
		unitsArr = bunglowVariantCollection.getBunglowMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['unitVariants'] = unitVariants.join(',')

	removeAptFilters:->
		variants = []
		unittypes = []
		unitsArr = apartmentVariantCollection.getApartmentMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['unitVariants'] = unitVariants.join(',')

	removePlotFilters:->
		variants = []
		unittypes = []
		unitsArr = plotVariantCollection.getPlotMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['unitTypes'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['unitTypes'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['unitVariants'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['unitVariants'] = unitVariants.join(',')


#Controller for Poject Master top view 
class CommonFloor.TopMasterCtrl extends Marionette.RegionController

	initialize:->

		@renderToppView()
		unitCollection.bind( "available", @renderToppView, @) 

	renderToppView:->
		@view =  new TopMasterView
			model : project

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
		new CommonFloor.FilterMasterCtrl region : @region

#Controller for Poject Master left view 
class CommonFloor.LeftMasterCtrl extends Marionette.RegionController

	initialize:->
		@renderLeftMasterView()
		unitCollection.bind( "available", @renderLeftMasterView, @)  

	renderLeftMasterView:->
		response = CommonFloor.checkListView()
		if response.count.length == 0
			region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.NoUnitsCtrl region : region
			return
			
		if response.type is 'bunglows' 
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterBunglowListCtrl region : @region
			# @parent().trigger "load:units" , data

		if response.type is 'building' 
			units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterBuildingListCtrl region : @region
			# @parent().trigger "load:units" , data

		if response.type is 'plot' 
			units = plotVariantCollection.getPlotUnits()
			data = {}
			data.units = units
			data.type = 'plot'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterPlotListCtrl region : @region
			# @parent().trigger "load:units" , data


#Center view for project master
class CommonFloor.CenterMasterView extends Marionette.ItemView




	template : Handlebars.compile('<div class="col-md-12 col-sm-12 col-xs-12 us-right-content mobile visible animated fadeIn">
										
										<div class="legend clearfix">
										  <ul>
											<!--<li class="available">AVAILABLE</li>-->
											<li class="sold">N/A</li>
											<!--<li class="blocked">BLOCKED</li>-->
											<li class="na">Available</li>
										  </ul>
										</div>
										<div class="zoom-controls">
											<div class="zoom-in"></div>
											<div class="zoom-out"></div>
										</div>
										<div id="view_toggle" class="toggle-view-button list"></div>
										<div id="trig" class="toggle-button hidden">List View</div>
										<div class=" master animated fadeIn">
											<!--<div class="controls mapView">
												<div class="toggle">
													<a href="#/master-view" class="map active">Map</a><a href="#/list-view" class="list">List</a>
												</div>
											</div>-->
											
											
											<div id="spritespin"></div>
											<div class="svg-maps">
												
												<img src=""  class="first_image img-responsive">
												
												<div class="region inactive"></div>
												<div class="tooltip-overlay hidden"></div>

											</div>
											<div class="cf-loader hidden"></div>
											
										</div>

										<div class="rotate rotate-controls hidden">
											<div id="prev" class="rotate-left">Left</div>
											<span class="rotate-text">Rotate</span>
											<div id="next" class="rotate-right">Right</div>
										</div>


									</div>')

	ui :
		svgContainer : '.master'
		trig         : '#trig'
		viewtog      : '#view_toggle'

	
	initialize:->
		@currentBreakPoint = 0
		@breakPoints = []
		@class = ''
		

	events :
		'click @ui.trig':(e)->
			$('.us-left-content').toggleClass 'col-0 col-md-3'
			$('.us-right-content').toggleClass 'col-md-12 col-md-9'
			# $('.filter-result').toggleClass 'full'
			that = @
			setTimeout( (x)->
				
				$('#spritespin').spritespin(
					width: that.ui.svgContainer.width() + 13
					sense: -1
					height: that.ui.svgContainer.width() / 2
					animate: false
				)
				$('.svg-maps > div').first().css('width',that.ui.svgContainer.width() + 13)
				$('.first_image').first().css('width',that.ui.svgContainer.width() + 13)

				height= that.ui.svgContainer.width() / 2
				$('.units').css('height',height-120)

			, 650)

			setTimeout( (x)->
				$('.master').panzoom('resetDimensions');				
			, 800)

			
		'click @ui.viewtog':(e)->
			$('.us-left-content').toggleClass 'not-visible visible'
			$('.us-right-content').toggleClass 'not-visible visible'	

		  
		'click .building':(e)->
			id = parseInt e.target.id
			buildingModel = buildingCollection.findWhere
							'id' : id

			if buildingModel == undefined
				return false
			
			unit = unitCollection.where 
				'building_id' :  id 
			if unit.length is 0
				return 
			$('.spritespin-canvas').addClass 'zoom'
			$('.us-left-content').addClass 'animated fadeOut'
			# CommonFloor.defaults['building'] = jQuery.makeArray(id).join(',')
			# CommonFloor.filter()
			setTimeout( (x)->
				if Object.keys(buildingModel.get('building_master')).length == 0
					CommonFloor.navigate '/building/'+id+'/apartments' , true
					CommonFloor.router.storeRoute()
				else
					CommonFloor.navigate '/building/'+id+'/master-view' , true
					CommonFloor.router.storeRoute()

			, 500)
			

		'click .villa,.plot':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere 
				id :  id 
			if ! _.isUndefined unit 
				setTimeout( (x)->
					CommonFloor.navigate '/unit-view/'+id , trigger : true
					CommonFloor.router.storeRoute()

				, 500)
			# $(".layer").unbind('mouseenter mouseleave')	
			# console.log id  = parseInt e.target.id
			# html = ""
			# unit = unitCollection.findWhere 
			# 	id :  id 
			# unitMaster = unitMasterCollection.findWhere 
			# 	id :  id 
			# if unit is undefined && unitMaster != undefined
			# 	html = '<div class="svg-info">
			# 				<div class="details empty">
			# 					Not in selection
			# 				</div>  
			# 			</div>'
			# 	$('.layer').tooltipster('content', html)
			# 	return 
			# if unit is undefined
			# 	html += '<div class="svg-info">
			# 				<div class="details empty">
			# 					Villa details not entered 
			# 				</div>  
			# 			</div>'
			# 	$('.layer').tooltipster('content', html)
			# 	return 


			# response = window.unit.getUnitDetails(id)
			# window.convertRupees(response[3])
			# availability = unit.get('availability')
			# availability = s.decapitalize(availability)
			# html = ""
			# html += '<div class="svg-info '+availability+' ">
			# 			<div class="action-bar">
			# 				<div class="villa"></div>
			# 			</div>

			# 			<h5 class="pull-left m-t-0">'+unit.get('unit_name')+'</h5>
			# 			<br> <br>
			# 			<!--<span class="pull-right icon-cross"></span>
			# 			<span class="label label-success"></span>
			# 			<div class="clearfix"></div>-->
			# 			<div class="details">
			# 				<div>
			# 					'+response[1].get('name')+' ('+response[0].get('super_built_up_area')+' Sq.ft)
			# 					<!--<label>Variant</label> - '+response[0].get('unit_variant_name')+'-->
			# 				</div>
			# 				<div>
			# 					Starting Price <span class="text-primary">'+$('#price').val()+'</span>
			# 				</div> 
			# 			</div>'

			# if availability == 'available'
			# 	html +='<div class="circle">
			# 				<a href="#unit-view/'+id+'" class="arrow-up icon-chevron-right"></a>
			# 			</div> 
			# 		</div>'
			# else
			# 	html += '</div>'

						
			
			# $('#'+id).attr('class' ,'layer villa  '+availability) 
			# $('#unit'+id).attr('class' ,'unit blocks active') 
			# $('#'+id).tooltipster(trigger:'click')
			
			# $('#'+id).webuiPopover('show')
			

		# 'click .plot':(e)->
			
		# 	setTimeout( (x)->
		# 		id = parseInt e.target.id

		# 		unitModel = unitCollection.findWhere
		# 						'id' : id
		# 		if unitModel == undefined
		# 			return false
		# 		$('.spritespin-canvas').addClass 'zoom'
		# 		$('.us-left-content').addClass 'animated fadeOut'
		# 		CommonFloor.navigate '/unit-view/'+id , true
		# 		CommonFloor.router.storeRoute()

		# 	, 500)
			

		'click #prev':->
			@setDetailIndex(@currentBreakPoint - 1)

		'click #next':->
			@setDetailIndex(@currentBreakPoint + 1)


		'mouseout .villa':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere 
				id :  id 
			if unit != undefined
				availability = unit.get('availability')
				availability = s.decapitalize(availability)
				# CommonFloor.applyVillaClasses()
				$('#unit'+id).attr('class' ,'unit blocks '+availability) 

		'mouseout .plot':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere 
				id :  id 
			if unit != undefined
				availability = unit.get('availability')
				availability = s.decapitalize(availability)
				# CommonFloor.applyPlotClasses()
				$('#unit'+id).attr('class' ,'bldg blocks '+availability)  

		'mouseout .building':(e)->
			id = parseInt e.target.id
			building = buildingCollection.findWhere 
				id :  id 
			if building != undefined
				$('.building').attr('class' ,'layer building') 
				$('#bldg'+id).attr('class' ,'bldg blocks') 


		'mouseover .villa':(e)->
			# $('.villa').attr('class' ,'layer villa') 
			id  = parseInt e.target.id
			html = ""
			unit = unitCollection.findWhere 
				id :  id 
			unitMaster = unitMasterCollection.findWhere 
				id :  id 
			if unit is undefined && unitMaster != undefined
				html = '<div class="svg-info">
							<div class="action-bar2">
						        <div class="txt-dft"></div>
						    </div> 
							<h5 class="pull-left">
								Not in selection
							</h5>  
						</div>'
				$('.layer').tooltipster('content', html)
				return 
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
						<div class="details">
							<div class="text-muted text-default"> To Move Forward Click Arrow</div>
						</div>
					</div>'
			else
				html += '</div>'

						
			
			$('#'+id).attr('class' ,'layer villa  '+availability) 
			$('#unit'+id).attr('class' ,'unit blocks '+availability+'  active') 
			
			$('#'+id).tooltipster('content', html)
			
			# $('#'+id).webuiPopover(
			# 	trigger : 'click'
			# 	content : html
			# 	closeable:true
			# 	placement : 'top'

			# ).on('shown.webui.popover', (e)->
			# 	$('.close').bind('click', (e)->
			# 		$('.layer').tooltipster('content', html)
			# 		$('.tooltip-overlay').addClass 'hidden'
			# 	)
			# 	$('.layer').tooltipster('hide')
			# 	$('.tooltip-overlay').removeClass 'hidden'
			# )
			
			
			
			
		
		'mouseover .plot':(e)->
			# $('.plot').attr('class' ,'layer plot') 
			id  = parseInt e.target.id
			html = ""
			unit = unitCollection.findWhere 
				id :  id 
			unitMaster = unitMasterCollection.findWhere 
				id :  id 
			if unit is undefined && unitMaster != undefined
				html = '<div class="svg-info">
							<div class="action-bar2">
						        <div class="txt-dft"></div>
						    </div> 
							<h5 class="pull-left">
								Not in selection
							</h5>  
						</div>'
				$('.layer').tooltipster('content', html)
				return 
			if unit is undefined
				html += '<div class="svg-info">
							<div class="action-bar2">
						        <div class="txt-dft"></div>
						    </div> 
							<h5 class="pull-left">
								Plot details not entered 
							</h5>  
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
							<div class="plot"></div>
						</div>

						<h5 class="pull-left m-t-0">'+unit.get('unit_name')+'</h5>
						<br> <br>
						<!--<span class="pull-right icon-cross cross"></span>
						<span class="label label-success"></span
						<div class="clearfix"></div>-->
						<div class="details">
							<div>
								'+response[1].get('name')+' ('+response[0].get('super_built_up_area')+' Sq.ft)
								<!--<label>Variant</label> - '+response[0].get('unit_variant_name')+'-->
							</div>
							<div>
								Starting Price <span class="text-primary">'+price+'</span>
							</div> 
							 
						</div>'

			if availability == 'available'
				html +='<div class="circle">
							<a href="#unit-view/'+id+'" class="arrow-up icon-chevron-right"></a>
						</div>
						<div class="details">
							<div class="text-muted text-default"> To Move Forward Click Arrow</div>
						</div>
					</div>'
			else
				html += '</div>'
			
			$('#'+id).attr('class' ,'layer plot '+availability) 
			$('#unit'+id).attr('class' ,'bldg blocks active') 
			$('#'+id).tooltipster('content', html)
			
			# $('#'+id).webuiPopover(
			# 	trigger : 'click'
			# 	content : html
			# 	closeable:true

			# ).on('shown.webui.popover', (e)->
			# 	$('.close').bind('click', (e)->
			# 		$('.layer').tooltipster('content', html)
			# 		$('.tooltip-overlay').addClass 'hidden'
			# 	)
			# 	$('.layer').tooltipster('hide')
			# 	$('.tooltip-overlay').removeClass 'hidden'
			# )
			
			

		

		'mouseover .building':(e)->
			id  = parseInt e.target.id
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

						<h5 class="t m-t-0">'+buildingModel.get('building_name')+'	<label class="text-muted">( No. of floors - '+floors+' )</label></h5>
						
						<div class="details">
							
							<div>
								Starting Price <span class="text-primary">'+price+'</span>
							</div> 

						</div>
						<div class="details">'

			$.each response,(index,value)->
				html +=''+value.name+' ('+value.units+'),'

			html += '<div class="text-muted text-default"> To Move Forward Click Arrow</div>
					</div>

					</div>'
			$('.layer').tooltipster('content', html)
			$('#bldg'+id).attr('class' ,'bldg blocks active') 
			$('#'+id).attr('class' ,'layer building active_bldg')

		'mousedown .layer':(e)->
			e.preventDefault()

		'mousedown .layer':(e)->
			e.preventDefault()



			


	onShow:->
		
		height =  @ui.svgContainer.width() / 2
		# $('.us-left-content').css('height',height)
		# if!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
		if $(window).width() > 991
			$('.units').css('height',height-310)
		$('#spritespin').hide()
		that = @
		transitionImages = []
		svgs = {}
		breakpoints = project.get('breakpoints')
		$.each breakpoints,(index,value)->
			svgs[value] = BASEURL+'/projects/'+PROJECTID+'/master/master-'+value+'.svg'

		
		first = _.values svgs
		$.merge transitionImages ,  project.get('project_master')
		$('.region').load(first[0],()->
				$('.first_image').attr('src',transitionImages[0])
				that.iniTooltip()
				CommonFloor.applyAvailabilClasses()
				CommonFloor.randomClass()
				CommonFloor.applyFliterClass()
				that.loadZoom()
				).addClass('active').removeClass('inactive')
		$('.first_image').lazyLoadXT()
		$('.first_image').load ()->
			
			$('#trig').removeClass 'hidden'
			response = project.checkRotationView()
			$('.first_image').first().css('width',that.ui.svgContainer.width())
			if response is 1
				$('.cf-loader').removeClass 'hidden'
		
		@initializeRotate(transitionImages,svgs)
		

		
	

	

	#clicl event for rotate
	setDetailIndex:(index)->
		$('.region').empty()
		$('.region').addClass('inactive').removeClass('active')
		@currentBreakPoint = index;
		if (@currentBreakPoint < 0) 
			@currentBreakPoint = @breakPoints.length-1
		
		if (@currentBreakPoint >= @breakPoints.length) 
			@currentBreakPoint = 0
		
		api.playTo(@breakPoints[@currentBreakPoint], 
			nearest: true
		)
	#initialize rotate plugin
	initializeRotate:(transitionImages,svgs)->
		frames = transitionImages
		@breakPoints = project.get('breakpoints')
		@currentBreakPoint = 0
		width = @ui.svgContainer.width()
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
			data.frame
			if data.frame is data.stopFrame
				url = svgs[data.frame]
				$('.region').load(url,()->
					that.iniTooltip()
					CommonFloor.applyAvailabilClasses()
					CommonFloor.randomClass()
					CommonFloor.applyFliterClass()
					).addClass('active').removeClass('inactive')
				
		)

		spin.bind("onLoad" , ()->
			first = _.values svgs
			url = first[0]
			$('#trig').removeClass 'hidden'
			response = project.checkRotationView()
			if response is 1
				$('.first_image').remove()
				$('.rotate').removeClass 'hidden'
				$('#spritespin').show()
				$('.cf-loader').addClass 'hidden'
			$('.region').load(url,()->
				that.iniTooltip()
				CommonFloor.applyAvailabilClasses()
				that.loadZoom()
				CommonFloor.randomClass()
				CommonFloor.applyFliterClass()

			).addClass('active').removeClass('inactive')

		)
	#intialize tooltip 
	iniTooltip:->
		$('.layer').tooltipster(
				theme: 'tooltipster-shadow'
				contentAsHTML: true
				onlyOne : true
				arrow : false
				offsetX : 50
				offsetY : -10
				interactive : true
				# animation : 'grow'
				trigger: 'hover'
				
				
		)

		
	

	loadZoom:->

		$panzoom =  $('.master').panzoom
			contain: 'invert'
			minScale: 1
			maxScale: 2.4
			increment: 0.4
			$zoomIn: $('.zoom-in')
			$zoomOut: $('.zoom-out')
			# $set: $('.spritespin-canvas')

		
	

#controller for the center view
class CommonFloor.CenterMasterCtrl extends Marionette.RegionController

	initialize:->
		
		@show new CommonFloor.CenterMasterView
				model :project


				
