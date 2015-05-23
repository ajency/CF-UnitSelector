#Layout view which has three regions in it
class CommonFloor.ProjectLayoutView extends Marionette.LayoutView

	template : '#project-template'


#starting point:Controller is executed which contains the logic to get the details
class CommonFloor.ProjectCtrl extends Marionette.RegionController

	initialize:->
		id = PROJECTID
		project.setProjectAttributes(id)
		#check to see whether project model is set or not
		if jQuery.isEmptyObject(project.toJSON())
			region  = new Marionette.Region el : '#noFound-template'
			#if not found then show the 'Nothing Found View'
			@show new CommonFloor.NothingFoundView

		else
			#if found then show the view for the Project
			@show new CommonFloor.ProjectLayoutView

#View for the top view of Project
class TopView extends Marionette.ItemView

	#template
	template : Handlebars.compile('<div class="row">
										<div class="col-md-12 col-xs-12 col-sm-12 animated fadeIn">
										  	<h2 class="proj-name"><small>{{i10n "explore"}}</small> {{project_title}}</h2>
										  	<!--<div class="pull-right">
												<div class="toggle_radio">
												  <input type="radio" checked class="toggle_option" id="first_toggle" name="toggle_option">
												  <input type="radio" class="toggle_option" id="second_toggle" name="toggle_option">
												  <input type="radio" class="toggle_option" id="third_toggle" name="toggle_option">
												  <label for="first_toggle"><p>Morning</p></label>
												  <label for="second_toggle"><p>Afternoon</p></label>
												  <label for="third_toggle"><p>Evening</p></label>
												  <div class="toggle_option_slider">
												  </div>
												</div>
										  	</div>-->
										  	<!--<span class="header-cta">
										  	    Call us on 89555444
										  	</span>-->
										  	<div class="clearfix"></div>
										</div>
									</div>')

	className : 'container-fluid'

#Controller for the top view of Project
class CommonFloor.TopCtrl extends Marionette.RegionController

	initialize:->
		@show new TopView
				model : project


#View for the left view of Project
class LeftView extends Marionette.ItemView
	#template
	template : Handlebars.compile('<div class="hidden">

										<div id="proj_info">
											<div class="big-tooltip">
												<div class="row">
												    <div class="col-sm-4">
												        <div class="m-t-15">
												           	<h5>{{i10n "project_by"}}</h5>
												          	<img src="{{logo}}" class="img-responsive builder-logo">
												        </div>
												    </div>
												   	<div class="col-sm-8 b-r">
												        <div class="m-t-15">
												        	{{#propertyTypes}}
												          	<p>{{prop_type}} <span class="text-muted">({{unit_types}})</span></p>
												        	{{/propertyTypes}}

												         	<br>
												       		<span class="icon-location pull-left"></span>
												       		<p class="address">{{address}}</p>
												        	<div class="clearfix"></div><br>
												        </div> 
												    </div>
												</div>
											</div>
										</div>

										<div class="proj-info">
											<div class="proj-logo section">
										  		<h3 class="m-t-10"><strong>{{i10n "project_by"}}</strong></h3>
										  		<img src="{{logo}}" class="img-responsive builder-logo">
										  	</div>

										  	<hr class="embossed" />


											<div class="proj-details">
											  	<h3 class="m-t-0"><strong>{{i10n "project_details"}}</strong></h3>
											  	<!--<span class="icon-map-marker"></span>
											  	<strong>Address: </strong><br>-->
												{{address}}
											</div>

											<hr class="embossed m-b-0" />
											
											{{#propertyTypes}}
											<div class="prop-types {{prop_type}}">
												<!--<h4 class="m-b-5 m-t-0 text-primary">{{prop_type}}</h4>
												  <span>{{i10n "project_type"}}:</span> {{prop_type}}
												<p>
												  <span>{{i10n "starting_area"}}:</span> {{starting_area}} Sq.Ft.
												</p>-->

												<span class="prop-icon"></span>
											  	<div class="unit-types">
											  		{{i10n "unit_types"}}:<br>
											  		<span>{{unit_types}}</span>
													
											  	</div>

												<!--<p>
												  <span>Available:</span> {{#availability}}
												  {{count}}	{{status}} 
												  {{/availability}}
												</p>
												<p>
												  <span>{{i10n "starting_price"}}:</span>  {{starting_price}}
												</p>-->
											</div>
											{{/propertyTypes}}

										</div>
				
										<!--<div class="info-slider">
										  	<div class="text-center">
												<img src="../images/marker-img.png" class="img-responsive marker-img">
												{{i10n "know_your_neighbour"}}
											</div>
									  	</div>-->

									</div>')

	serializeData:->
		data = super()
		propertyTypesData = @model.get 'project_property_types'
		properties = @model.get 'property_types'
		propertyTypes = [] 
		availability = []
		$.each propertyTypesData,(index,value)->
			$.each value.availability,(ind,val)->
				availability.push 
					'status'	: s.capitalize ind
					'count'		: val

			propertyTypes.push 
				'prop_type'  		: s.capitalize properties[index]
				'unit_types'		: value.unit_types.join(', ')
				'starting_area' 	: value.starting_area
				'starting_price' 	: window.numDifferentiation(value.starting_price)
				'availability'		: availability
		data.propertyTypes = propertyTypes
		data

		
#Controller for the left view of Project
class CommonFloor.LeftCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftView
				model : project
				


#View for the center view of Project
class CenterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-12 col-sm-12 col-xs-12 us-right-content animated fadeIn">
										<div class="cf-loader loader-center hidden"></div>
										<div class="svg-area" width="350" height="525" id="prImage-2" title="" alt="" 
											data-nodebug="" data-alwaysprocess="" 
											data-ratio="1.5" data-srcwidth="1920" data-crop="1" data-filters="usm" 
											class="primage fill-width">
										</div>
									</div>')

	ui :
		svgContainer : '.us-right-content'


	events:
		'click .step1-marker':(e)->
			# $('.svg-area').addClass 'zoom'
			$('.cf-loader').removeClass 'hidden'
			$('svg').attr('class' ,'zoom') 
			$('.step1').addClass 'animated fadeOut'
			setTimeout( (x)->
				CommonFloor.checkPropertyType()
			, 100)

		
			
	onShow:->
		$('img').lazyLoadXT()
		path = @model.get('step_one').svg
		$('.svg-area').load(path, ()->
			$('.marker').tooltipster(
				theme: 'tooltipster-shadow'
				contentAsHTML: true
				onlyOne : true
				arrow : false
				offsetX : 30
				interactive : true
				animation : 'grow'
				trigger: 'click'
				content : $('#proj_info').html()
			)
			$('.marker').tooltipster('show')

		)

		

		
		

		# if $(window).width() > 991
		# 	height= @.ui.svgContainer.width() / 2
		# 	$('.step1').css('height',height)
		# 	$('.proj-info').css('height',height-180)
		# 	$('.proj-info').mCustomScrollbar
		# 		theme: 'inset'


		

#Controller for the cneter view of Project
class CommonFloor.CenterCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterView
				model : project
				