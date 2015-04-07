class ProjectLayoutView extends Marionette.LayoutView

	template : '#project-template'



class CommonFloor.ProjectCtrl extends Marionette.RegionController

	initialize:->
		id = PROJECTID
		project.setProjectAttributes(id);
		console.log project
		if jQuery.isEmptyObject(project.toJSON())
			new NothingFoundView
		else
			console.log "aaaaaaaaaa"
			@show new ProjectLayoutView


class TopView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-12 col-xs-12 col-sm-12">
		            <div class="search-header-wrap">
		              <h1>Explore {{project_title}}\'s</h1>
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
	                        Bannerghatta Road, Bangalore, Karnataka, India
	                      </p>

	                      <div class="detail-pts">                        
	                        <p>
	                          <span>Project Type:</span> {{property_types}}
	                        </p>
	                        <p>
	                          <span>BHK Area Range:</span> 1881 - 4780 Sq.Ft.
	                        </p>
	                        <p>
	                          <span>BHK Type:</span> 3BHK / 4BHK
	                        </p>
	                        <p>
	                          <span>Price Range:</span> 1.25 Crores - 2.85 Crores
	                        </p>
	                        <p>
	                          <span>Project Status:</span> Under Construction
	                        </p>                    
	                      </div>
	                    </div>
	                </div>
	                <div class="blck-wrap">
	                  <div class="text-center">
	                    <img src="../images/marker-img.png" class="img-responsive marker-img">
	                    Know your neighborhood. The orange markers are important landmarks. Click for more information.
	                  </div>
	                </div>
	              </div>
	            </div>
	          	</div>')

	





class CommonFloor.LeftCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftView
				model : project
				



class CenterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
		            <div class="svg-area">
		            	<img id="svg_project" class="bttrlazyloading"
						    data-bttrlazyloading-md-src="{{step_one.svg}}"
						/>
		              
		            </div>
          		</div>')


	onShow:->
		$('#svg_project').bttrlazyloading();


   
	





class CommonFloor.CenterCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterView
				model : project
				