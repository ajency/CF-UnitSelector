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
		if  Object.keys(project.get('project_master')).length  != 0
			@show new CommonFloor.ProjectMasterView
		else
			@show new CommonFloor.NothingFoundView

#View for Poject Master top view 
class TopMasterView extends Marionette.ItemView
	#template
	template : Handlebars.compile('<div class="row">
		<div class="col-md-12 col-xs-12 col-sm-12">
			<div class="search-header-wrap">
				<div class="row breadcrumb-bar">
							<div class="col-xs-12 col-md-12">
								<div class="bread-crumb-list">
									<ul class="brdcrmb-wrp clearfix">
										<li class="">
											<span class="bread-crumb-current">
												<span class=".icon-arrow-right2"></span><a class="unit_back" href="#">
													Back to Project Overview</a>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
				<h1 class="pull-left proj-name">{{project_title}}</h1> 
				<div class="proj-type-count">
					{{#types}} 
					<h1 class="text-primary pull-left">{{count.length}}</h1> <p class="pull-left">{{type}}</p>
					{{/types}}
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>

			</div>
		  </div>
		</div>')

	ui  :
		unitBack : '.unit_back'

	serializeData:->
		data = super()
		response = CommonFloor.propertyTypes() 
		data.types = response
		data


	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '/'+previousRoute , true

	onShow:->
		if CommonFloor.router.history.length == 1
			@ui.unitBack.hide()

#Controller for Poject Master top view 
class CommonFloor.TopMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new TopMasterView
			model : project

#Controller for Poject Master left view 
class CommonFloor.LeftMasterCtrl extends Marionette.RegionController

	initialize:->
		response = CommonFloor.checkListView()
		if response.type is 'bunglows' 
			units = bunglowVariantCollection.getBunglowUnits()
			data = {}
			data.units = units
			data.type = 'villa'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterBunglowListCtrl region : @region
			@parent().trigger "load:units" , data

		if response.type is 'building' 
			units = buildingCollection
			data = {}
			data.units = units
			data.type = 'building'
			@region =  new Marionette.Region el : '#leftregion'
			new CommonFloor.MasterBuildingListCtrl region : @region
			@parent().trigger "load:units" , data


#Center view for project master
class CommonFloor.CenterMasterView extends Marionette.ItemView



	template : Handlebars.compile('<div class="col-md-9 us-right-content">
									<div id="trig" class="toggle-button">List View</div>
									<div class="list-view-container animated fadeInRight">
										<!--<div class="controls mapView">
											<div class="toggle">
												<a href="#/master-view" class="map active">Map</a><a href="#/list-view" class="list">List</a>
											</div>
										</div>-->
										
										
										<div id="spritespin"></div>
										<div class="svg-maps">
											<img src=""  data-alwaysprocess="true" 
											data-ratio="0.5" data-srcwidth="1600" data-crop="1" class="primage first_image img-responsive">
											
											<div class="region inactive"></div>
										</div>
										<div class="cf-loader hidden"></div>
										
										<div class="rotate rotate-controls hidden">
											<div id="prev" class="rotate-left">Left</div>
											<span class="rotate-text">Rotate</span>
											<div id="next" class="rotate-right">Right</div>
										</div>
									</div>

								</div>')

	ui :
		svgContainer : '.list-view-container'
		trig          : '#trig'

	
	initialize:->
		@currentBreakPoint = 0
		@breakPoints = []
		@class = ''
		

	events :
		'click @ui.trig':(e)->
			$('.us-left-content').toggleClass 'col-0 col-md-3'
			$('.us-right-content').toggleClass 'col-md-12 col-md-9'
			that = @
			setTimeout( (x)->
				console.log that.ui.svgContainer.width()
				$('#spritespin').spritespin(
					width: that.ui.svgContainer.width() 
					sense: -1
					height: that.ui.svgContainer.width() / 1.46
					animate: false
				)
				$('.svg-maps > div').first().css('width',that.ui.svgContainer.width())

			, 5000)
			
					

		  
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

			if Object.keys(buildingModel.get('building_master')).length == 0
				CommonFloor.navigate '/building/'+id+'/apartments' , true
				CommonFloor.router.storeRoute()
			else
				CommonFloor.navigate '/building/'+id+'/master-view' , true
				CommonFloor.router.storeRoute()

		'click .villa':(e)->
			id = parseInt e.target.id

			unitModel = unitCollection.findWhere
							'id' : id
			if unitModel == undefined
				return false

			CommonFloor.defaults['unit'] =id
			CommonFloor.navigate '/unit-view/'+id , true
			CommonFloor.router.storeRoute()

		'click #prev':->
			@setDetailIndex(@currentBreakPoint - 1)

		'click #next':->
			@setDetailIndex(@currentBreakPoint + 1)


		'mouseout .villa':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere 
				id :  id 
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			CommonFloor.applyVillaClasses()
			$('#unit'+id).attr('class' ,'unit blocks '+availability)  

		'mouseout .building':(e)->
			id = parseInt e.target.id
			$('.layer').attr('class' ,'layer building') 
			$('#bldg'+id).attr('class' ,'bldg blocks') 


		'mouseover .villa':(e)->
			id  = parseInt e.target.id
			html = ""
			unit = unitCollection.findWhere 
				id :  id 
			if unit is undefined
				html += '<div class="svg-info">
							<div class="details">
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
			html += '<div class="svg-info">
						<h4 class="pull-left">'+unit.get('unit_name')+'</h4>
						<!--<span class="label label-success"></span-->
						<div class="clearfix"></div>
						<div class="details">
							<div>
								<label>Variant</label> - '+response[0].get('unit_variant_name')+' Sq.ft
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

			$('#'+id).attr('class' ,'layer villa '+availability) 
			$('#unit'+id).attr('class' ,'unit blocks active') 
			$('.layer').tooltipster('content', html)

		'mouseover .building':(e)->
			id  = parseInt e.target.id
			buildingModel = buildingCollection.findWhere
							'id' : id

			if buildingModel == undefined
				html = '<div class="svg-info">
							<div class="details">
								Building details not entered 
							</div>  
						</div>'
				$('.layer').tooltipster('content', html)
				return 


			floors = buildingModel.get 'floors'
			floors = Object.keys(floors).length
			unitTypes = building.getUnitTypes(id)
			response = building.getUnitTypesCount(id,unitTypes)
			html = '<div class="svg-info">
						<h4 class="pull-left">'+buildingModel.get('building_name')+'</h4>
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
			$('.layer').tooltipster('content', html)
			$('#bldg'+id).attr('class' ,'bldg blocks active') 
			$('#'+id).attr('class' ,'layer building active_bldg')


			


	onShow:->
		# $('.first_image').lazyLoadXT()
		height =  @ui.svgContainer.width() / 1.46
		# $('.us-left-content').css('height',height)
		$('.units').css('height',height-162)
		$('#spritespin').hide()
		that = @
		transitionImages = []
		svgs = {}
		breakpoints = project.get('breakpoints')
		$.each breakpoints,(index,value)->
			svgs[value] = BASEURL+'/projects/'+PROJECTID+'/master/master-'+value+'.svg'

		
		first = _.values svgs
		$.merge transitionImages ,  project.get('project_master')
		$('.region').load(first[0],
			$('.first_image').attr('data-src',transitionImages[0]);that.iniTooltip).addClass('active').removeClass('inactive')
		$('.first_image').load ()->
			
			response = project.checkRotationView()
			if response is 1
				$('.cf-loader').removeClass 'hidden'
		@initializeRotate(transitionImages,svgs)
		


	

	#clicl event for rotate
	setDetailIndex:(index)->
		$('.region').empty()
		$('.region').addClass('inactive').removeClass('active')
		@currentBreakPoint = index;
		if (@currentBreakPoint < 0) 
			@currentBreakPoint = @breakPoints.length - 1
		
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
		width = @ui.svgContainer.width() + 20
		$('.svg-maps > div').first().removeClass('inactive').addClass('active').css('width',width);
		spin = $('#spritespin')
		spin.spritespin(
			source: frames
			width: @ui.svgContainer.width() 
			sense: -1
			height: @ui.svgContainer.width() / 1.46
			animate: false
		)
		console.log @ui.svgContainer.width() 
		that = @
		api = spin.spritespin("api")
		spin.bind("onFrame" , ()->
			data = api.data
			if data.frame is data.stopFrame
				url = svgs[data.frame]
				$('.region').load(url,()->that.iniTooltip();CommonFloor.applyVillaClasses()).addClass('active').removeClass('inactive')
				
		)

		spin.bind("onLoad" , ()->
			response = project.checkRotationView()
			if response is 1
				$('.first_image').remove()
				$('.rotate').removeClass 'hidden'
				$('#spritespin').show()
				$('.cf-loader').addClass 'hidden'
				CommonFloor.applyVillaClasses()

				
		)
	#intialize tooltip 
	iniTooltip:->
		$('.layer').tooltipster(
			theme: 'tooltipster-shadow',
			contentAsHTML: true
			onlyOne : true
			arrow : false
			offsetX : 50
			offsetY : -10

		)
	

#controller for the center view
class CommonFloor.CenterMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.CenterMasterView
				model :project


				
