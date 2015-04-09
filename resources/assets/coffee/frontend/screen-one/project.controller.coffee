class CommonFloor.ProjectLayoutView extends Marionette.LayoutView

	template : '#project-template'



class CommonFloor.ProjectCtrl extends Marionette.RegionController

	initialize:->
		id = PROJECTID
		project.setProjectAttributes(id);
		if jQuery.isEmptyObject(project.toJSON())
			region  = new Marionette.Region el : '#noFound-template'
			@show new CommonFloor.NothingFoundView

		else
			@show new CommonFloor.ProjectLayoutView


class TopView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-12 col-xs-12 col-sm-12">
					<div class="search-header-wrap">
					  <h1 class="pull-left">Explore {{project_title}}\'s</h1>
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
					  <h4><strong>Project by</strong></h4>
					  <img src="{{logo}}" class="img-responsive builder-logo">
					</div>
					<div class="blck-wrap">
					  <h4><strong>Project Details</strong></h4>
						<div class="proj-details">
						  <p>
						   {{address}}
						  </p>

						  <div class="detail-pts">   
							{{#propertyTypes}}   
								 <p>
								  <span>Project Type:</span> {{prop_type}}
								</p>
								<p>
								  <span>Area:</span> {{starting_area}} Sq.Ft.
								</p>
								<p>
								  <span>Unit Types:</span> {{unit_types}}
								</p>
								<p>
								  <span>Available:</span> {{#availability}}
								  {{count}}	{{status}} 
								  {{/availability}}
								</p>
								<p>
								  <span>Starting Price:</span>  {{starting_price}}
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
				'starting_price' 	: value.starting_price
				'availability'		: availability
		data.propertyTypes = propertyTypes
		data

	





class CommonFloor.LeftCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftView
				model : project
				



class CenterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
					<div class="svg-area">
						<img src="{{step_one.svg}}" data-alwaysprocess="true" 
						data-path="{{step_one.svg}}"  data-crop="true" class="primage">
						
					  
					</div>
				</div>')
   
	





class CommonFloor.CenterCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterView
				model : project
				