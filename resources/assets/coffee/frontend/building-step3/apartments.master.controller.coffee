class CommonFloor.ApartmentsMasterView extends Marionette.LayoutView

	template : '#project-template'



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

	template : Handlebars.compile('<div class="row">
		          <div class="col-md-12 col-xs-12 col-sm-12">
		            <!--<div class="row breadcrumb-bar">
		              <div class="col-xs-12 col-md-12">
		                <div class="bread-crumb-list">
		                  <ul class="brdcrmb-wrp clearfix">
		                    <li class="">
		                      <span class="bread-crumb-current">
		                        <span class=".icon-arrow-right2"></span> Back to Poject Overview
		                      </span>
		                    </li>
		                  </ul>
		                </div>
		              </div>
		            </div>-->

		            <div class="search-header-wrap">
		              <h1>We are now at {{project_title}}\'s upcoming project having {{units}} apartment\'s</h1>
		            </div>
		          </div>
		        </div>')


	serializeData:->
		data = super()
		units = Marionette.getOption( @, 'units' )
		data.units = units.length
		data.project_title = project.get('project_title')
		data

class CommonFloor.TopApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		buildingModel = buildingCollection.findWhere
							id : building_id
		@show new CommonFloor.TopApartmentMasterView
					model : buildingModel
					units : response

class CommonFloor.LeftApartmentMasterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content leftview"></div>')

	onShow:->
		$('.leftview').hide()

class CommonFloor.LeftApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.LeftApartmentMasterView

class CommonFloor.CenterApartmentMasterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
	            <div class="list-view-container">
	              <div class="single-bldg">
	                <div class="prev"></div>
	                <div class="next"></div>
	              </div>
	              <div id="spritespin"></div>
										<div class="svg-maps">
											<div class="region inactive"></div>
										</div>
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
		

	events:
		'click #prev':->
			@setDetailIndex(@currentBreakPoint - 1)

		'click #next':->
			@setDetailIndex(@currentBreakPoint + 1)

	onShow:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		console.log building = buildingCollection.findWhere
							id : building_id
		transitionImages = []
		svgs = {}
		svgs[0] = building.get('building_master').front 
		svgs[4] = building.get('building_master').right
		svgs[8] = building.get('building_master').back
		svgs[12] =  building.get('building_master').left
		console.log svgs
		$.merge transitionImages , building.get('building_master')['right-front']
		$.merge transitionImages , building.get('building_master')['back-right']
		$.merge transitionImages , building.get('building_master')['left-back']
		$.merge transitionImages , building.get('building_master')['front-left']
		response = building.checkRotationView(building)
		if response is 1
			$('.rotate').removeClass 'hidden'
		@initializeRotate(transitionImages,svgs)


	setDetailIndex:(index)->
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
		@breakPoints = [0, 4, 8, 12]
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
				url = svgs[data.frame]
				$('.region').load(url,that.iniTooltip).addClass('active').removeClass('inactive')
				
		)



class CommonFloor.CenterApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.CenterApartmentMasterView
					