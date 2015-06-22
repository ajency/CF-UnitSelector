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
												<div class="svg-info not-available">
													<div class="action-bar">
														<h5>{{i10n "project_by"}}</h5>
														<img src="{{logo}}" class="img-responsive builder-logo">
													</div>	
													<h5 class="pull-left m-t-0">{{address}}</h5>
													<div class="details">
														{{#propertyTypes}}
														<div>
															{{prop_type}} <span class="text-muted">({{unit_types}})</span>
														</div>
														{{/propertyTypes}}
														<div class="text-muted text-default"> Click arrow to move forward</div>
													</div>
													<div class="circle action_button">
														<span class="arrow-up icon-chevron-right"></span>
													</div>  
												</div>
											</div>
										</div>

										<div class="proj-info" style="width:140px;height:170px;">
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
												  <span>{{i10n "starting_area"}}:</span> {{starting_area}}'+project.get('measurement_units')+'
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
										<div class="step1-container">
											<div class="img-loader ">
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

											<div class="step1-wrapper animated fadeIn hidden">
												<img src="../../projects/3/google_earth/step1.jpg" class="firstimage img-responsive earth-img" />
												<div class="svg-area"></div>
											</div>
										</div>
									</div>')

	ui :
		svgContainer : '.us-right-content'


			
	events : 
		'mouseover .step1-marker':(e)->
			$('.step1-marker').tooltipster('show')
			$('.tooltipstered').tooltipster('show')

		'mouseout .step1-marker':(e)->
			$('.step1-marker').tooltipster('hide')
			$('.tooltipstered').tooltipster('hide')


		'mouseover .amenity':(e)->
			html = '<div class="row">
						<div class="col-sm-12 b-r">
							<h4 class="text-warning margin-none">'+$(e.currentTarget).attr('data-amenity-title')+'</h4>
							<h6 class="text-muted">'+$(e.currentTarget).attr('data-amenity-desc')+'</h6>
						</div>
					</div>'

			$('.amenity').tooltipster('content', html)

		'mouseout .amenity':(e)->
			$('.amenity').tooltipster('hide')

		
			
	onShow:->
		PATH = BASEURL+'/projects/'+PROJECTID+'/google_earth/map.svg'
		windowHeight = $(window).innerHeight() - 56
		$('.svg-area').css 'height', windowHeight
		$('.step1-container').css 'height', windowHeight
		$('.step1-container').css 'min-width', windowHeight * 2

		windowWidth = $(window).innerWidth()
		$('.earth-img').css 'min-width', windowWidth

		

		img = @model.get('step_one').svg
		$('.firstimage').attr 'src' , img
		$('.firstimage').load ()->
			$('.img-loader').addClass 'hidden'
			$('.svg-area').load(PATH, ()->
				$('.step1-wrapper').removeClass 'hidden'
				$('.step1-marker').tooltipster(
					theme: 'tooltipster-shadow'
					contentAsHTML: true
					onlyOne : true
					arrow : false
					offsetX : 150
					offsetY : 60
					interactive : true
					animation : 'fade'
					trigger: 'click'
					content : $('#proj_info').html()
					functionReady:(e)->
						$('.action_button').on('click' , (e)->
							$('.img-loader').removeClass 'hidden'
							$('.step1-wrapper').attr('class' ,'zoom') 
							$('.step1').addClass 'animated fadeOut'
							$('.step1-marker').tooltipster('hide')
							setTimeout( (x)->
								CommonFloor.checkPropertyType()
							, 100)
						)
						tooltipHeight = $('.tooltipster-content').height() + 10
						$('.action-bar').css 'min-height', tooltipHeight

						svgHeight = $(window).innerHeight() - 56
						svgWidth = svgHeight * 2
						if $(window).width() < 1025
							$('.step1-container').css 'min-height', svgHeight
							$('.step1-container').css 'min-width', svgWidth
							$('.svg-area').css 'min-width', svgWidth
				)
				$('.step1-marker').tooltipster('show')


				$('.tooltipstered').tooltipster(
					theme: 'tooltipster-shadow'
					contentAsHTML: true
					onlyOne : true
					arrow : false
					offsetX : 150
					offsetY : 60
					interactive : true
					animation : 'fade'
					trigger: 'click'
					content : $('#proj_info').html()
					functionReady:(e)->
						$('.action_button').on('click' , (e)->
							$('.img-loader').removeClass 'hidden'
							$('.step1-wrapper').attr('class' ,'zoom') 
							$('.step1').addClass 'animated fadeOut'
							$('.step1-marker').tooltipster('hide')
							setTimeout( (x)->
								CommonFloor.checkPropertyType()
							, 100)
						)
						tooltipHeight = $('.tooltipster-content').height() + 10
						$('.action-bar').css 'min-height', tooltipHeight
				)
				$('.tooltipstered').tooltipster('show')

				$('.amenity').tooltipster(
					theme: 'tooltipster-shadow'
					contentAsHTML: true
					onlyOne : true
					arrow : false
					offsetX : 150
					offsetY : 60
					interactive : true
					animation : 'fade'
					trigger: 'hover'

				)

		)

		

		
		


		

#Controller for the cneter view of Project
class CommonFloor.CenterCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterView
				model : project
				