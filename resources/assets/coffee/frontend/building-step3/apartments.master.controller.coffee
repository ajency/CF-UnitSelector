api = ""
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
		              <h1>We are now at {{project_title}}\'s upcoming project having {{units}} apartments</h1>
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

class ApartmentsView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
					<div class="col-sm-4">
					  <h6 class="{{status}}">{{unit_name}}</h6>                      
					</div>
					<div class="col-sm-4">
					  <h6 class="">{{unit_type}}</h6>                      
					</div>
					<div class="col-sm-4">
					  <h6 class="">{{super_built_up_area}} sqft</h6>                      
					</div>
				  </div>')

	initialize:->
		@$el.prop("id", 'apartment'+@model.get("id"))

	className : 'blck-wrap'

	serializeData:->
		data = super()
		status = s.decapitalize @model.get 'availability'
		unitVariant = apartmentVariantCollection.findWhere
							'id' : @model.get('unit_variant_id')
		unitType = unitTypeCollection.findWhere
							'id' : unitVariant.get('unit_type_id')
		data.unit_type = unitType.get('name')
		data.super_built_up_area = unitVariant.get('super_built_up_area')
		data.status = status
		data

	events:
		'mouseover .row':(e)->
			id = @model.get 'id'
			$('#'+id).attr('class' ,'layer '+@model.get('availability'))
		'mouseout .row':(e)->
			id = @model.get 'id'
			$('#'+id).attr('class' ,'layer')

		'click .row':(e)->
			if @model.get('availability') == 'available'
				CommonFloor.defaults['unit'] = @model.get('id')
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true


class CommonFloor.LeftApartmentMasterView extends Marionette.CompositeView

	template : '	<div><div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
										<div class="filters-wrapper ">
											<div class="advncd-filter-wrp  unit-list">
												<div class="blck-wrap title-row">
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
					                			</div>
								                <div class="units">
								                </div>
											</div>
										</div>
									</div></div>'

	childView : ApartmentsView

	childViewContainer : '.units'




class CommonFloor.LeftApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		response = window.building.getBuildingUnits(building_id)
		unitsCollection = new Backbone.Collection response
		@show new CommonFloor.LeftApartmentMasterView
				collection : unitsCollection

class CommonFloor.CenterApartmentMasterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
	            <div class="list-view-container">
	            <!--<div class="controls mapView">
			            <div class="toggle">
			            	<a href="#" class="map active">Map</a><a href="#" class="list">List</a>
			            </div>
		            </div>-->
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

		'click .list':(e)->
			e.preventDefault()
			url = Backbone.history.fragment
			building_id = parseInt url.split('/')[1]
			CommonFloor.navigate '/building/'+building_id+'/apartments' , true

		'click .map':(e)->
			e.preventDefault()
			url = Backbone.history.fragment
			building_id = parseInt url.split('/')[1]
			CommonFloor.navigate '/building/'+building_id+'/master-view' , true
		

		


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
				$('.region').load(url).addClass('active').removeClass('inactive')
				
		)



class CommonFloor.CenterApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.CenterApartmentMasterView
					