api = ""
class CommonFloor.BunglowMasterView extends Marionette.LayoutView

	template : '#project-view-template'


#starting point for Master view for bunglows
class CommonFloor.BunglowMasterCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.checkPropertyType()
		if  project.get('project_master').front  != ""
			@show new CommonFloor.BunglowMasterView
		else
			@show new CommonFloor.NothingFoundView


class TopBunglowMasterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
		<div class="col-md-12 col-xs-12 col-sm-12">
			<div class="search-header-wrap">

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

	serializeData:->
		data = super()
		response = CommonFloor.propertyTypes() 
		data.types = response
		data


class CommonFloor.TopBunglowMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBunglowMasterView
			model : project


class CommonFloor.LeftBunglowMasterCtrl extends Marionette.RegionController

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



class CommonFloor.CenterBunglowMasterView extends Marionette.ItemView



	template : Handlebars.compile('<div class="col-md-9 us-right-content">
									<div class="list-view-container animated fadeInRight">
										<!--<div class="controls mapView">
											<div class="toggle">
												<a href="#/master-view" class="map active">Map</a><a href="#/list-view" class="list">List</a>
											</div>
										</div>-->
										
										
										<div id="spritespin"></div>
										<div class="svg-maps">
											<img class="first_image img-responsive" src="" />
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

	
	initialize:->
		@currentBreakPoint = 0
		@breakPoints = []
		@class = ''
		

	events :
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

			if buildingModel.get('building_master').front == ""
				CommonFloor.navigate '/building/'+id+'/apartments' , true
			else
				CommonFloor.navigate '/building/'+id+'/master-view' , true

		'click .villa':(e)->
			id = parseInt e.target.id

			unitModel = unitCollection.findWhere
							'id' : id
			if unitModel == undefined
				return false

			CommonFloor.defaults['unit'] =id
			CommonFloor.navigate '/unit-view/'+id , true

		'click #prev':->
			@setDetailIndex(@currentBreakPoint - 1)

		'click #next':->
			@setDetailIndex(@currentBreakPoint + 1)


		'mouseout .villa':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere 
				id :  id 
			if unit is undefined
				return 
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			$('.layer').attr('class' ,'layer villa') 
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

			# @class = $('#'+id).attr('class')
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
			console.log response = building.getUnitTypesCount(id,unitTypes)
			html = '<div class="svg-info">
						<h4 class="pull-left">'+buildingModel.get('building_name')+'</h4>
						<!--<span class="label label-success"></span-->
						<div class="clearfix"></div>'
			$.each response,(index,value)->
				html += '<div class="details">
							<div>
								<label>'+value.name+'</label> - '+value.units+'
							</div> 
							
							 
						</div>  
					</div>'

			html += '<div>
						<label>No. of floors</label> - '+floors+'
					</div>'
			$('.layer').tooltipster('content', html)
			$('#bldg'+id).attr('class' ,'bldg blocks active') 
			$('#'+id).attr('class' ,'layer building active_bldg')


			


	onShow:->
		height =  @ui.svgContainer.width() / 1.46
		$('.us-left-content').css('height',height)
		$('#spritespin').hide()
		if project.get('project_master').front  == ""
			$('.mapView').hide()
		else
			$('.map').addClass 'active'
			$('.mapView').show()

		that = @
		

		transitionImages = []
		svgs = {}
		breakpoints = project.get('breakpoints')
		$.each breakpoints,(index,value)->
			svgs[value] = BASEURL+'/projects/'+PROJECTID+'/master/master-'+value+'.svg'
		# svgs[4] = project.get('project_master').right
		# svgs[8] = project.get('project_master').back
		# svgs[12] =  project.get('project_master').left

		$.merge transitionImages , project.get('project_master')['right-front']
		$.merge transitionImages , project.get('project_master')['back-right']
		$.merge transitionImages , project.get('project_master')['left-back']
		$.merge transitionImages , project.get('project_master')['front-left']
		$('.region').load(project.get('project_master').front,
			$('.first_image').attr('src',transitionImages[0]);that.iniTooltip).addClass('active').removeClass('inactive')
		$('.first_image').bttrlazyloading(
			animation: 'fadeIn'
			placeholder: 'data:image/gif;base64,R0lGODlhMgAyAKUAAO7u...'

			)
		$('.first_image').load ()->
			console.log "loaded"
			response = project.checkRotationView()
			if response is 1
				$('.cf-loader').removeClass 'hidden'
		@initializeRotate(transitionImages,svgs)
		
		


	setDetailIndex:(index)->
		$('.region').text ''
		$('.region').addClass('inactive').removeClass('active')
		@currentBreakPoint = index;
		if (@currentBreakPoint < 0) 
			@currentBreakPoint = @breakPoints.length - 1
		
		if (@currentBreakPoint >= @breakPoints.length) 
			@currentBreakPoint = 0
		
		api.playTo(@breakPoints[@currentBreakPoint], 
			nearest: true
		)

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
		that = @
		api = spin.spritespin("api")
		spin.bind("onFrame" , ()->
			data = api.data
			if data.frame is data.stopFrame
				console.log url = svgs[data.frame]
				$('.region').load(url,that.iniTooltip).addClass('active').removeClass('inactive')
				
		)

		spin.bind("onLoad" , ()->
			$('.first_image').remove()
			$('.rotate').removeClass 'hidden'
			$('#spritespin').show()
			$('.cf-loader').addClass 'hidden'

				
		)

		


		


	iniTooltip:->
		$('.layer').tooltipster(
			theme: 'tooltipster-shadow',
			contentAsHTML: true
			onlyOne : true
			arrow : false
			offsetX : 50
			offsetY : -10
		)
	


class CommonFloor.CenterBunglowMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.CenterBunglowMasterView
				model :project


				
