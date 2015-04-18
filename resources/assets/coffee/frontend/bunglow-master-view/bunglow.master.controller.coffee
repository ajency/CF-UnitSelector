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
			  <h1>We are now at {{project_title}}\'s upcoming project having {{units}} villas</h1>
			</div>
		  </div>
		</div>')

	serializeData:->
		data = super()
		data.units = bunglowVariantCollection.getBunglowUnits().length
		data


class CommonFloor.TopBunglowMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBunglowMasterView
			model : project

class LeftBunglowMasterView extends Marionette.ItemView

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
				  </div>
			
				')
	initialize:->
		@$el.prop("id", 'unit'+@model.get("id"))

	className : 'blck-wrap'

	serializeData:->
		data = super()
		console.log unitVariant = bunglowVariantCollection.findWhere
							'id' : @model.get('unit_variant_id')
		unitType = unitTypeCollection.findWhere
							'id' : unitVariant.get('unit_type_id')
		data.unit_type = unitType.get('name')
		data.super_built_up_area = unitVariant.get('super_built_up_area')
		availability = @model.get('availability')
		data.status = s.decapitalize(availability)
		@model.set 'status' , data.status
		data

	events:
		'mouseover .row' :(e)->
			id = @model.get('id')
			console.log window.unit
			response = window.unit.getUnitDetails(id)
			html = ""
			unit = unitCollection.findWhere 
				id :  id 
			if unit == undefined
				html += '<div class="svg-info">
							<div class="details">
								Villa details not entered 
							</div>  
						</div>'
				$('.layer').tooltipster('content', html)
				return false

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
						</div>  
					</div>'
			$('#'+id).attr('class' ,'layer '+@model.get('status'))
			$('.layer').tooltipster('content', html)

		'mouseout .row' :(e)->
			$('.layer').attr('class' ,'layer') 
		'click .row' :(e)->
			if @model.get('status') == 'available'
				CommonFloor.defaults['unit'] = @model.get('id')
				CommonFloor.navigate '/unit-view/'+@model.get('id') , true


	onShow:->
		@iniTooltip()

	iniTooltip:->
		$('.layer').tooltipster(
			theme: 'tooltipster-shadow',
			contentAsHTML: true
			onlyOne : true
			arrow : false
			offsetX : 50
			offsetY : -10
		)

class LeftBunglowMasterCompositeView extends Marionette.CompositeView

	template : Handlebars.compile('	<div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
										<div class="filters-wrapper animated fadeInLeft">
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
									</div>')


	childView : LeftBunglowMasterView

	childViewContainer : '.units'



class CommonFloor.LeftBunglowMasterCtrl extends Marionette.RegionController

	initialize:->
		newUnits = bunglowVariantCollection.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@show new LeftBunglowMasterCompositeView
			collection : unitsCollection


class CommonFloor.CenterBunglowMasterView extends Marionette.ItemView



	template : Handlebars.compile('<div class="col-md-9 us-right-content">
									<div class="list-view-container animated fadeInRight">
										<div class="controls mapView">
								            <div class="toggle">
								            	<a href="#" class="map">Map</a><a href="#" class="list">List</a>
								            </div>
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
		

	events :
		'mouseover .building':(e)->
			id = parseInt e.target.id
			buildingModel = buildingCollection.findWhere
							'id' : id
			if buildingModel.get('building_master').front == ""
				CommonFloor.navigate '/building/'+id+'/apartments' , true
			else
				CommonFloor.navigate '/building/'+id+'/master-view' , true

		'click .list':(e)->
			e.preventDefault()
			CommonFloor.navigate '/list-view' , true
			
		'click .map':(e)->
			e.preventDefault()
			CommonFloor.navigate '/master-view' , true
			
		'click #prev':->
			@setDetailIndex(@currentBreakPoint - 1)

		'click #next':->
			@setDetailIndex(@currentBreakPoint + 1)

		'mouseout':(e)->
			$('.layer').attr('class' ,'layer') 
			$('.blck-wrap').attr('class' ,'blck-wrap') 

		'mouseover .layer':(e)->
			id  = parseInt e.target.id
			html = ""
			unit = unitCollection.findWhere 
				id :  id 
			if unit == undefined
				html += '<div class="svg-info">
							<div class="details">
								Villa details not entered 
							</div>  
						</div>'
				$('.layer').tooltipster('content', html)
				return false
			unitVariant = bunglowVariantCollection.findWhere
								'id' : unit.get('unit_variant_id')
			
			unitType = unitTypeCollection.findWhere
								'id' :  unitVariant.get('unit_type_id')
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			html = ""
			html += '<div class="svg-info">
						<h4 class="pull-left">'+unit.get('unit_name')+'</h4>
						<!--<span class="label label-success"></span-->
						<div class="clearfix"></div>
						<div class="details">
							<div>
								<label>Area</label> - '+unitVariant.get('super_built_up_area')+' Sq.ft
							</div> 
							<div>
								<label>Unit Type </label> - '+unitType.get('name')+'
							</div>  
						</div>  
					</div>'
			console.log availability
			$('#'+id).attr('class' ,'layer '+availability) 
			$('#unit'+id).attr('class' ,'blck-wrap active') 
			$('.layer').tooltipster('content', html)
			


	onShow:->
		if project.get('project_master').front  == ""
			$('.mapView').hide()
		else
			$('.map').addClass 'active'
			$('.mapView').show()

		# $('<div></div>').load(project.get('project_master').front).appendTo('.front')
		# $('.us-right-content').imagesLoaded ->
		# 	divHeight = $('.us-right-content').height()
		# 	$('.unit-list').css 'max-height', divHeight + 'px'
		# 	return
		transitionImages = []
		svgs = {}
		svgs[0] = project.get('project_master').front 
		svgs[4] = project.get('project_master').right
		svgs[8] = project.get('project_master').back
		svgs[12] =  project.get('project_master').left

		$.merge transitionImages , project.get('project_master')['right-front']
		$.merge transitionImages , project.get('project_master')['back-right']
		$.merge transitionImages , project.get('project_master')['left-back']
		$.merge transitionImages , project.get('project_master')['front-left']
		response = project.checkRotationView()
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
	


class CommonFloor.CenterBunglowMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.CenterBunglowMasterView
				model :project


				
