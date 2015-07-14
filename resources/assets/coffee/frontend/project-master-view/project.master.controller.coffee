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
		
		if bunglowVariantMasterCollection.length == 0 && apartmentVariantMasterCollection.length == 0 && plotVariantMasterCollection.length == 0  
			@show new CommonFloor.NothingFoundView
			
		else
			@show new CommonFloor.ProjectMasterView



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
														<h2 class="pull-left">{{count.length}}</h2><p class="pull-left">{{type}}</p> 
														{{/types}}
													</div>
													<div class="pull-left filter-result full">
														 <ul  id="flexiselDemo1">

														 {{#area}}

													         	 <li>
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													         </li>
													         {{/area}}
													     {{#budget}}
													         	 <li>
													                <div class="filter-pill"> <span class="icon-rupee-icn"></span>{{name}} {{type}}</span> <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													         </li>
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

													      {{#status}}
													         	 <li>
													                <div class="filter-pill"> {{name}} {{type}} <span class="icon-cross " id="{{id_name}}" data-id="{{id}}" data-type="{{typename}}"></span> </div> 
													         </li>
													         {{/status}}
														 {{#each  filters}} 
													          <li>
													              <div class="filter-title"> {{name}}  <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}" data-index="{{index}}"></span> </div>
													         </li>
													         {{#filters}}
													         	{{#each this}}
													         	{{#each this}}
													          <li>
													                <div class="filter-pill"> {{name}} <span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  data-index="{{index}}"  data-type="{{typename}}"></span> </div> 
													         </li>{{/each}}
													         {{/each}}
													         {{/filters}}
													        
													    {{/each}}

													    </ul>
														<!--{{#each  filters}}
														{{#each this}}
														<div class="filter-pill"  >
															{{this.name}}{{this.type}}
															<span class="icon-cross {{classname}}" id="{{id_name}}" data-id="{{id}}"  ></span>
														</div>	
														{{/each}}{{/each }}-->					               
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
		apply : '.apply'
		variantNames : '.variant_names'
		area : '#filter_area'
		budget : '#filter_budget'
		types : '.types'
		status : '#filter_available'
		filter_flooring : '.filter_flooring'
		views : '.views'
		facings : '.facings'

	serializeData:->
		data = super()
		status = CommonFloor.getStatusFilters()
		if status.length != 0
			data.status = status
		main = CommonFloor.getFilters()
		data.filters  = main[0].filters
		data.area  = main[0].area
		data.budget  = main[0].price
		data.status  = main[0].status
		data.views  = main[0].views
		data.facings  = main[0].facings
		# data.results  = CommonFloor.getFilters()[1]
		response = CommonFloor.propertyTypes() 
		data.types = response
		data


	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			# $.each CommonFloor.defaults , (index,value)->
			# 	 CommonFloor.defaults[index] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')
			CommonFloor.navigate '/' , true

		'click @ui.types':(e)->
			arr = CommonFloor.defaults['type'].split(',')
			index = arr.indexOf $(e.currentTarget).attr('data-id')
			arr.splice(index, 1)
			CommonFloor.defaults['type'] = arr.join(',')
			
			if $(e.currentTarget).attr('data-id') == 'villa'
				@removeVillaFilters()
			if $(e.currentTarget).attr('data-id') == 'apartment'
				@removeAptFilters()
			if $(e.currentTarget).attr('data-id') == 'plot'
				@removePlotFilters()
			
			@trigger  'render:view'
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			
			

			
		'click @ui.unitTypes':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			if CommonFloor.defaults[type]['unit_type_id']!= ""
				types = CommonFloor.defaults[type]['unit_type_id'].split(',')
				types = types.map (item)->
					return parseInt item
			
			types = _.without types , parseInt $(e.currentTarget).attr('data-id')
			
			CommonFloor.defaults[type]['unit_type_id'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'
			
		'click @ui.variantNames':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			if CommonFloor.defaults[type]['unit_variant_id']!= ""
				types = CommonFloor.defaults[type]['unit_variant_id'].split(',')
				types = types.map (item)->
					return parseInt item
			
			types = _.without types , parseInt $(e.currentTarget).attr('data-id')
			CommonFloor.defaults[type]['unit_variant_id'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.status':(e)->
			CommonFloor.defaults['common']['availability'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'

			

		'click @ui.area':(e)->
			CommonFloor.defaults['common']['area_max'] = ""
			CommonFloor.defaults['common']['area_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.budget':(e)->
			CommonFloor.defaults['common']['price_max'] = ""
			CommonFloor.defaults['common']['price_min'] = ""
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.filter_flooring':(e)->
			types = []
			type = $(e.currentTarget).attr('data-type')
			index = $(e.currentTarget).attr('data-index')
			if CommonFloor.defaults[type]['attributes'][index]!= ""
				types = CommonFloor.defaults[type]['attributes'][index].split(',')
				
		
			console.log types = _.without types , $(e.currentTarget).attr('data-id')
			CommonFloor.defaults[type]['attributes'][index] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.facings':(e)->
			types = CommonFloor.defaults['common']['facings'].split(',')
			types = _.without types ,$(e.currentTarget).attr('data-id')
			CommonFloor.defaults['common']['facings'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')
			@trigger  'render:view'

		'click @ui.views':(e)->
			types = CommonFloor.defaults['common']['views'].split(',')
			types = _.without types ,$(e.currentTarget).attr('data-id')
			CommonFloor.defaults['common']['views'] = types.join(',')
			unitCollection.reset unitMasterCollection.toArray()
			CommonFloor.resetCollections()
			CommonFloor.filterNew()	
			unitCollection.trigger('available')
			@trigger  'render:view'

	onShow:->
		# if CommonFloor.router.history.length == 1
		# 	@ui.unitBack.hide()
		$("#flexiselDemo1").flexisel(
		    visibleItems: 11,
		    animationSpeed: 200,
		    autoPlay: false,
		    autoPlaySpeed: 1000,
		    clone:false,
		    enableResponsiveBreakpoints: true,
		    responsiveBreakpoints: {
		      portrait: {
		        changePoint:480,
		        visibleItems: 5
		      }, 
		      landscape: {
		        changePoint:640,
		        visibleItems: 6
		      },
		      tablet: {
		        changePoint:768,
		        visibleItems: 3
		      }
		    }
		)
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
		unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',')

	removeAptFilters:->
		variants = []
		unittypes = []
		unitsArr = apartmentVariantCollection.getApartmentMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',')

	removePlotFilters:->
		variants = []
		unittypes = []
		unitsArr = plotVariantCollection.getPlotMasterUnits()
		$.each unitsArr,(index,value)->
			unitDetails = window.unit.getUnitDetails(value.id)
			variants.push  parseInt unitDetails[0].get 'id'
			unittypes.push parseInt unitDetails[1].get 'id'
		unitTypes = CommonFloor.defaults['villa']['unit_type_id'].split(',')
		unitTypesArr = unitTypes.map (item)->
				return parseInt item
		
		$.each unittypes,(index,value)->
			if $.inArray(parseInt(value), unitTypesArr) > -1
				unitTypes = _.without unitTypesArr , parseInt(value)
		
		CommonFloor.defaults['villa']['unit_type_id'] = unitTypes.join(',')
		unitVariants = CommonFloor.defaults['villa']['unit_variant_id'].split(',')
		unitVariantsArr = unitVariants.map (item)->
				return parseInt item
		$.each variants,(index,value)->
			if $.inArray(parseInt(value), unitVariantsArr) > -1
				unitVariants = _.without unitVariantsArr , parseInt(value)
		CommonFloor.defaults['villa']['unit_variant_id'] = unitVariants.join(',')


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
										
										<div class="legend c clearfix">
										  <ul>
											<!--<li class="available">AVAILABLE</li>-->
											<li class="sold">N/A</li>
											<!--<li class="blocked">BLOCKED</li>
											<li class="na">Available</li>-->
										  </ul>
										</div>
										<div class="zoom-controls master-zoom">
											<div class="zoom-in"></div>
											<div class="zoom-out"></div>
										</div>
										<div id="view_toggle" class="toggle-view-button list"></div>
										<div id="trig" class="toggle-button hidden">List View</div>
										<div class=" master b animated fadeIn">
											<!--<div class="controls mapView">
												<div class="toggle">
													<a href="#/master-view" class="map active">Map</a><a href="#/list-view" class="list">List</a>
												</div>
											</div>-->
											
											<div id="svg_loader" class="img-loader">
											  <div class="square" ></div>
											  <div class="square"></div>
											  <div class="square last"></div>
											  <div class="square clear"></div>
											  <div class="square"></div>
											  <div class="square last"></div>
											  <div class="square clear"></div>
											  <div class="square "></div>
											  <div class="square last"></div>
											</div>

											<div id="spritespin"></div>
											<div class="svg-maps animated fadeIn hidden">
												
												<img class="first_image" />
												
												<div class="region inactive"></div>
												<div class="tooltip-overlay hidden"></div>

											</div>
											<div id="rotate_loader" class="cf-loader hidden"></div>
											
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
		plotunit     : '.plot'

	
	initialize:->
		@currentBreakPoint = 0
		@breakPoints = []
		@class = ''
		

	events :
		'click @ui.viewtog':(e)->
			$('.us-left-content').toggleClass 'not-visible visible'
			$('.us-right-content').toggleClass 'not-visible visible'

		'click #prev':->
			@setDetailIndex(@currentBreakPoint - 1)

		'click #next':->
			@setDetailIndex(@currentBreakPoint + 1)

		'click .villa' :(e)->
			e.preventDefault()
			id = parseInt e.currentTarget.id
			unit = unitCollection.findWhere 
				id :  id
			if !(_.isUndefined unit) && unit.get('availability') is 'available'
				CommonFloor.navigate '/unit-view/'+id , true

		'click @ui.plotunit' :(e)->
			e.preventDefault()
			id = parseInt e.currentTarget.id
			unit = unitCollection.findWhere 
				id :  id
			if !(_.isUndefined unit) && unit.get('availability') is 'available'
				CommonFloor.navigate '/unit-view/'+id , true


		'click .building' :(e)->
			e.preventDefault()
			id = parseInt e.currentTarget.id
			building = buildingCollection.findWhere 
				id :  id 
			console.log units = unitCollection.where 
						'building_id' : id
			if units.length == 0
				return
			$('#spritespin').addClass 'zoom'
			$('.us-right-content').addClass 'fadeOut'
			$('.cf-loader').removeClass 'hidden'
			if building != undefined && units.length isnt 0
				if Object.keys(building.get('building_master')).length == 0
					CommonFloor.navigate '/building/'+id+'/apartments' , true
					
				else
					CommonFloor.navigate '/building/'+id+'/master-view' , true

		'mouseout .villa':(e)->
			id = parseInt e.currentTarget.id
			unit = unitCollection.findWhere 
				id :  id 
			if unit != undefined
				availability = unit.get('availability')
				availability = s.decapitalize(availability)
				$('#unit'+id).attr('class' ,'unit blocks '+availability) 

		'mouseout .plot':(e)->
			id = parseInt e.currentTarget.id
			unit = unitCollection.findWhere 
				id :  id 
			if unit != undefined
				availability = unit.get('availability')
				availability = s.decapitalize(availability)
				# CommonFloor.applyPlotClasses()
				$('#unit'+id).attr('class' ,'bldg blocks '+availability)  

		'mouseout .building':(e)->
			id = parseInt e.currentTarget.id
			building = buildingCollection.findWhere 
				id :  id 
			if building != undefined
				$('.building').attr('class' ,'layer building') 
				$('#bldg'+id).attr('class' ,'bldg blocks') 


		'mouseover .villa':(e)->
			# $('.villa').attr('class' ,'layer villa') 
			id  = parseInt e.currentTarget.id
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
			response = window.unit.getUnitDetails(id)
			price = window.numDifferentiation(response[3])
			availability = unit.get('availability')
			availability = s.decapitalize(availability)

			if unit is undefined || availability is 'archive'
				html += '<div class="svg-info">
							<div class="action-bar2">
						        <div class="txt-dft"></div>
						    </div> 
							<h5 class="pull-left">Villa details not entered </h5>
							 
						</div>'
				$('.layer').tooltipster('content', html)
				return 


			
			html = ""
			html += '<div class="svg-info '+availability+' ">
						<div class="action-bar">
							<div class="villa"></div>
						</div>
						<div class="pull-left">
							<h4 class="m-t-0">'+unit.get('unit_name')+'</h4>
						
							<div class="details">
								<ul>
									<li>
										<h5 class="inline-block">'+response[1].get('name')+'</h5> 
										<span> - '+response[0].get('super_built_up_area')+' '+project.get('measurement_units')+'</span>
										<!--<label>Variant</label> - '+response[0].get('unit_variant_name')+'-->
									</li>
								</ul>


								<h5 class="m-t-0 m-b-0 price text-primary">
									<span class="text-primary icon-rupee-icn"></span>'+price+'
								</h5>
								<span>'+s.capitalize(availability)+'</span>

							</div>
							 
						</div>'

			if availability == 'available'
				html +='<a href="#unit-view/'+id+'" class="view-unit">
							<div class="circle">
								<span class="arrow-up icon-chevron-right"></span>
							</div>
						</a>

					</div>'
			else
				html += '</div>'

						
			
			$('#'+id).attr('class' ,'layer villa  '+availability) 
			$('#unit'+id).attr('class' ,'unit blocks '+availability+'  active') 
			$('.units').mCustomScrollbar("scrollTo",'#unit'+id)
			$('#'+id).tooltipster('content', html)
			
			
			
			
		
		'mouseover .plot':(e)->
			# $('.plot').attr('class' ,'layer plot') 
			id  = parseInt e.currentTarget.id
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
			response = window.unit.getUnitDetails(id)
			price = window.numDifferentiation(response[3])
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			if unit is undefined || availability is 'archive'
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
			

			
			html = ""
			html += '<div class="svg-info '+availability+' ">
						<div class="action-bar">
							<div class="plot"></div>
						</div>

						<div class="pull-left">
							<h4 class="m-t-0">'+unit.get('unit_name')+'</h4>
						
							<div class="details">
								<ul>
									<li>
										<h5 class="inline-block">'+response[1].get('name')+'</h5> 
										<span> - '+response[0].get('super_built_up_area')+' '+project.get('measurement_units')+'</span>
										<!--<label>Variant</label> - '+response[0].get('unit_variant_name')+'-->
									</li>
								</ul>
								<h5 class="m-t-0 m-b-0 price text-primary">
									<span class="text-primary icon-rupee-icn"></span>'+price+'
								</h5>
								<span>'+s.capitalize(availability)+'</span>
							</div>
							 
						</div>'

			if availability == 'available'
				html +='<a href="#unit-view/'+id+'" class="view-unit">
							<div class="circle">
								<span class="arrow-up icon-chevron-right"></span>
							</div>
						</a>

					</div>'
			else
				html += '</div>'
			
			$('#'+id).attr('class' ,'layer plot '+availability) 
			$('#unit'+id).attr('class' ,'bldg blocks active') 
			$('.units').mCustomScrollbar("scrollTo",'#unit'+id)
			$('#'+id).tooltipster('content', html)
			
			
		'mouseover .amenity':(e)->
			html = '<div class="row">
						<div class="col-sm-12 b-r">
							<h4 class="text-warning margin-none">'+$(e.currentTarget).attr('data-amenity-title')+'</h4>
							<h6 class="text-muted">'+$(e.currentTarget).attr('data-amenity-desc')+'</h6>
						</div>
					</div>'

			$('.amenity').tooltipster('content', html)

		'mouseover .building':(e)->
			id  = parseInt e.currentTarget.id
			buildingModel = buildingCollection.findWhere
							'id' : id
			buildingMaster = buildingMasterCollection.findWhere 
							'id' :  id 
			if buildingModel is undefined && buildingMaster != undefined
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


			floors = buildingModel.get 'no_of_floors'
			# floors = Object.keys(floors).length
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
						</a>'
			
			html += '</div></div>'


			$('.layer').tooltipster('content', html)
			$('#bldg'+id).attr('class' ,'bldg blocks active') 
			$('.units').mCustomScrollbar("scrollTo",'#bldg'+id)
			$('#'+id).attr('class' ,'layer building active_bldg')

		'mousedown .layer':(e)->
			e.preventDefault()

		'mousedown .layer':(e)->
			e.preventDefault()



			


	onShow:->
		windowHeight = $(window).innerHeight() - 56
		$('.master').css 'height', windowHeight
		$('.master').css 'min-width', windowHeight * 2

		# if ($.browser.msie && $.browser.version == 10)
		# 	$('svg').css 'height', windowHeight

		
		$('#spritespin').hide()
		that = @
		transitionImages = []
		svgs = {}
		breakpoints = project.get('breakpoints')
		$.each breakpoints,(index,value)->
			svgs[value] = BASEURL+'/projects/'+PROJECTID+'/master/master-'+value+'.svg'

		
		first = _.values svgs
		$.merge transitionImages ,  project.get('project_master')
		
		# $('#svg_loader').removeClass 'hidden'
		$('.first_image').attr('src',transitionImages[breakpoints[0]])
		
			
			
			
		$('.first_image').load ()->
			$('.region').load(first[0],()->
					$('#svg_loader').addClass 'hidden'
					that.iniTooltip()
					CommonFloor.applyAvailabilClasses()
					CommonFloor.randomClass()
					CommonFloor.applyFliterClass()
					that.loadZoom()
					$('#trig').removeClass 'hidden'
					$('.svg-maps').removeClass 'hidden'
					response = project.checkRotationView()
					$('.first_image').first().css('width',that.ui.svgContainer.width())
					$('.unassign').attr('style', "opacity: 0;fill-opacity: 0;")
					if response is 1
						$('#rotate_loader').removeClass 'hidden'
						that.initializeRotate(transitionImages,svgs)
				).addClass('active').removeClass('inactive')

		
		
		
		
		
	

	

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
					that.loadZoom()
					$('.unassign').attr('style', "opacity: 0;fill-opacity: 0;")
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
				$('#rotate_loader').addClass 'hidden'
			$('.region').load(url,()->
				that.iniTooltip()
				CommonFloor.applyAvailabilClasses()
				that.loadZoom()
				CommonFloor.randomClass()
				CommonFloor.applyFliterClass()
				$('.unassign').attr('style', "opacity: 0;fill-opacity: 0;")
				$('.svg-maps svg').css('height',width / 2);

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
			functionReady:(e)->
				$('.view-unit').on('click' , (e)->
					$('.layer').tooltipster('hide')
					$('svg').attr('class' ,'zoom')
					$('#spritespin').addClass 'zoom'
					$('.us-right-content').addClass 'fadeOut'
					$('.cf-loader').removeClass 'hidden'
				)
		)
		$('.amenity').tooltipster(
			theme: 'tooltipster-shadow marker-tooltip'
			contentAsHTML: true
			onlyOne : true
			arrow : false
			# animation : 'grow'
			trigger: 'hover'
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

		
		
	

#controller for the center view
class CommonFloor.CenterMasterCtrl extends Marionette.RegionController

	initialize:->
		
		@show new CommonFloor.CenterMasterView
				model :project


				
