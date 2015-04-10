#Layout view which has three regions in it
class CommonFloor.ProjectLayoutView extends Marionette.LayoutView

	template : '#project-template'


#starting point:Controller is executed which contains the logic to get the details
class CommonFloor.ProjectCtrl extends Marionette.RegionController

	initialize:->
		id = PROJECTID
		project.setProjectAttributes(id);
		#check to see whether project model is set or not
		if jQuery.isEmptyObject(project.toJSON())
			region  = new Marionette.Region el : '#noFound-template'
			#if not found then show the 'Nothing Fpund View'
			@show new CommonFloor.NothingFoundView

		else
			#if found then show the view for the first step
			@show new CommonFloor.ProjectLayoutView

#Controller for the top view of step one
class TopView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-12 col-xs-12 col-sm-12">
					<div class="search-header-wrap">
					  <h1 class="pull-left">{{i10n "explore"}} {{project_title}}</h1>
					  <div class="pull-right">
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
					  </div>
					  <div class="clearfix"></div>
					</div>
				  </div>')

	className : 'row'













class CommonFloor.TopCtrl extends Marionette.RegionController

	initialize:->
		@show new TopView
				model : project



class LeftView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
				<div class="filters-wrapper">
				  <div class="tab-main-container">                
					<div class="blck-wrap">
					  <h4><strong>{{i10n "project_by"}}</strong></h4>
					  <img src="{{logo}}" class="img-responsive builder-logo">
					</div>
					<div class="blck-wrap">
					  <h4><strong>{{i10n "project_details"}}</strong></h4>
						<div class="proj-details">
						  <p>
						   {{address}}
						  </p>

						  <div class="detail-pts">   
							{{#propertyTypes}}   
								 <p>
								  <span>{{i10n "project_type"}}:</span> {{prop_type}}
								</p>
								<p>
								  <span>{{i10n "starting_area"}}:</span> {{starting_area}} Sq.Ft.
								</p>
								<p>
								  <span>{{i10n "unit_types"}}:</span> {{unit_types}}
								</p>
								<p>
								  <span>Available:</span> {{#availability}}
								  {{count}}	{{status}} 
								  {{/availability}}
								</p>
								<p>
								  <span>{{i10n "starting_price"}}:</span>  {{starting_price}}
								</p>
							{{/propertyTypes}}                  
											  
						  </div>
						</div>
					</div>
					<div class="blck-wrap">
					  <div class="text-center">
						<img src="../images/marker-img.png" class="img-responsive marker-img">
						{{i10n "know_your_neighbour"}}
					</div>
				  </div>
				</div>
				</div>')

	serializeData:->
		data = super()
		propertyTypesData = @model.get 'property_types'
		propertyTypes = [] 
		availability = []
		$.each propertyTypesData,(index,value)->
			$.each value.availability,(ind,val)->
				availability.push 
					'status'	: s.capitalize ind
					'count'		: val

			propertyTypes.push 
				'prop_type'  		: s.capitalize index
				'unit_types' 		: value.unit_types.join(',')
				'starting_area' 	: value.starting_area
				'starting_price' 	: window.numDifferentiation(value.starting_price)
				'availability'		: availability
		data.propertyTypes = propertyTypes
		data

	





class CommonFloor.LeftCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftView
				model : project
				



class CenterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
					<div class="svg-area width="350" height="525" id="prImage-2" title="" alt="" 
						data-nodebug="" data-alwaysprocess="" 
						data-imgprocessor="http://localhost/CF-UnitSelector/public/images/" 
						data-path="http://localhost/CF-UnitSelector/public/images/step1.jpg" 
						data-ratio="1.5" data-srcwidth="1920" data-crop="1" data-filters="usm" 
						class="primage fill-width">
						
					  
					</div>
					

				</div>')


	events:
		'click .step1-marker':(e)->
			CommonFloor.navigate '#/master-view/'+@model.get('id') , true

	onShow:->
		path = @model.get('step_one')
		$('<div></div>').load(path).appendTo('.svg-area')
	





class CommonFloor.CenterCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterView
				model : project
				