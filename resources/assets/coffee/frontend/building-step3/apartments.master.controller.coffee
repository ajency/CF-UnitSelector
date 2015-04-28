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

		            <div class="search-header-wrap">
		              	<h1 class="pull-left proj-name">{{project_title}}</h1> 
		              	  <div class="proj-type-count">
		              	  	<h1 class="text-primary pull-left">{{building_name}}</h1>
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
		units = Marionette.getOption( @, 'units' )
		data.units = units.length
		data.project_title = project.get('project_title')
		data

	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '/'+previousRoute , true

	onShow:->
		if CommonFloor.router.history.length == 1
			@ui.unitBack.hide()

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

	template : Handlebars.compile('	<div class=" info">
						                <label class="pull-left">{{unit_name}}</label> <div class="pull-right">{{unit_type}}</div> <!--{{super_built_up_area}}sqft-->
						            	<div class="clearfix"></div>
						            </div>
					                <div class="cost">
					                  {{price}}
					                </div>')

	initialize:->
		@$el.prop("id", 'apartment'+@model.get("id"))

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

	events:
		'mouseover':(e)->
			id = @model.get 'id'
			$('#'+id).attr('class' ,'layer '+@model.get('availability'))
			$('#apartment'+id).attr('class' ,'unit blocks '+@model.get('availability')+' active')
		'mouseout':(e)->
			id = @model.get 'id'
			$('#'+id).attr('class' ,'layer')
			$('#apartment'+id).attr('class' ,'unit blocks '+@model.get('availability'))

		'click':(e)->
			if @model.get('availability') == 'available'
				CommonFloor.defaults['unit'] = @model.get('id')
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true
				CommonFloor.router.storeRoute()

	onShow:->
		id = @model.get 'id'
		availability = @model.get('availability')
		status = s.decapitalize(availability)
		classname =  $('#apartment'+id).attr('class')
		$('#apartment'+id).attr('class' , classname+' '+status)


class CommonFloor.LeftApartmentMasterView extends Marionette.CompositeView

	template : '	<div><div class="col-md-3 col-xs-12 col-sm-12 search-left-content p-t-10">
									<div class="list-view-container w-map animated fadeInLeft">
										<div class="filters-wrapper ">
											<div class="advncd-filter-wrp  unit-list">
												<div class="legend clearfix">
												  <ul>
												    <li class="available">AVAILABLE</li>
												    <li class="sold">SOLD</li>
												    <li class="blocked">BLOCKED</li>
												    <li class="na">N/A</li>
												  </ul>
												 </div>
				                  				<p class="text-center help-text">Hover on the units for more details</p>
								               	<ul class="units two">
							                	</ul>					                			
											</div>
										</div></div>
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
			CommonFloor.router.storeRoute()

		'click .map':(e)->
			e.preventDefault()
			url = Backbone.history.fragment
			building_id = parseInt url.split('/')[1]
			CommonFloor.navigate '/building/'+building_id+'/master-view' , true
			CommonFloor.router.storeRoute()

		'mouseover .layer':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere
					'id' : id
			if unit is undefined
				html = '<div class="svg-info">
							<div class="details">
								Apartment details not entered 
							</div>  
						</div>'
				$('.layer').tooltipster('content', html)
				return false

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
			$('#'+id).attr('class' ,'layer '+availability) 
			$('#apartment'+id).attr('class' ,' unit blocks '+availability+' active') 
			$('.layer').tooltipster('content', html)
		
		'mouseout .layer':(e)->
			id = parseInt e.target.id
			unit = unitCollection.findWhere
					'id' : id
			if unit is undefined
				return
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			$('#'+id).attr('class' ,'layer ') 
			$('#apartment'+id).attr('class' ,'unit blocks '+availability)
		


	onShow:->
		height =  @ui.svgContainer.width() / 1.46
		$('.search-left-content').css('height',height)
		$('#spritespin').hide()
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		console.log building = buildingCollection.findWhere
							id : building_id
		transitionImages = []
		svgs = {}
		that = @
		breakpoints = building.get 'breakpoints'
		$.each breakpoints,(index,value)->
			console.log value
			svgs[value] = BASEURL+'/projects/'+PROJECTID+'/buildings/'+building_id+'/master-'+value+'.svg'
		
		
		$.merge transitionImages , building.get('building_master')
		
		$('.region').load(svgs[0],
			$('.first_image').attr('src',transitionImages[0]);that.iniTooltip).addClass('active').removeClass('inactive')
		# $('.first_image').bttrlazyloading(
		# 	animation: 'fadeIn'
		# 	placeholder: 'data:image/gif;base64,R0lGODlhMgAyAKUAAO7u...'

		# 	)
		$('.first_image').load ()->
			response = building.checkRotationView(building_id)
			if response is 1
				$('.cf-loader').removeClass 'hidden'
		
		@initializeRotate(transitionImages,svgs,building)


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

	initializeRotate:(transitionImages,svgs,building)->
		url = Backbone.history.fragment
		building_id = parseInt url.split('/')[1]
		frames = transitionImages
		@breakPoints = building.get 'breakpoints'
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
		spin.bind("onLoad" , ()->
			console.log response = building.checkRotationView(building_id)
			if response is 1
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
	



class CommonFloor.CenterApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.CenterApartmentMasterView
					