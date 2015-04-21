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
		              <h1>We are now at {{project_title}}\'s upcoming project having {{units}} Apartments</h1>
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
		'mouseout':(e)->
			id = @model.get 'id'
			$('#'+id).attr('class' ,'layer')

		'click':(e)->
			if @model.get('availability') == 'available'
				CommonFloor.defaults['unit'] = @model.get('id')
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true


class CommonFloor.LeftApartmentMasterView extends Marionette.CompositeView

	template : '	<div><div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
										<div class="filters-wrapper ">
											<div class="advncd-filter-wrp  unit-list">
												<div class="blck-wrap title-row">
					                  				<p class="text-center help-text">Hover on the units for more details</p>
									               <ul class="units two">
								                	</ul>
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

		'mouseover .layer':(e)->
			id = parseInt e.target.id
			console.log unit = unitCollection.findWhere
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
			$('#apartment'+id).attr('class' ,' unit blocks active') 
			$('.layer').tooltipster('content', html)
		
		'mouseout .layer':(e)->
			id = parseInt e.target.id
			$('#'+id).attr('class' ,'layer ') 
			$('#apartment'+id).attr('class' ,'unit blocks')
		


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
					