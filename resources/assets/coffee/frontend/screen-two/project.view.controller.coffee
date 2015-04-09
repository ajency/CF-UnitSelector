class CommonFloor.ProjectMasterViewLayout extends Marionette.LayoutView

	template : '#project-view-template'



class CommonFloor.ProjectMasterViewCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
		window.loadJSONData()
		@show new CommonFloor.ProjectMasterViewLayout


class TopMasterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
          <div class="col-md-12 col-xs-12 col-sm-12">
            <div class="search-header-wrap">
              <h1>We are now at Artha Zen\'s upcoming project having 50 villa\'s</h1>
            </div>
          </div>
        </div>')


class CommonFloor.TopMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new TopMasterView

class LeftMasterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
            <div class="filters-wrapper">
              
              <div class="advncd-filter-wrp">
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
                <div class="blck-wrap">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="sold">V1001</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">3BHK</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">1460sqft</h6>                      
                    </div>
                  </div>
                </div>
                <div class="blck-wrap">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="available">V1002</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">3BHK</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">1460sqft</h6>                      
                    </div>
                  </div>
                </div>
                </div>
                </div>')


class CommonFloor.LeftMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftMasterView


class CenterMasterView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
            <div class="svg-area">
              <img src="../../images/map2.png">
            </div>
          </div>')

class CommonFloor.CenterMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterMasterView
