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

	template : '<div class="row">
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
		              <h1>We are now at Artha Zen\'s upcoming project having 50 villa\'s</h1>
		            </div>
		          </div>
		        </div>'

class CommonFloor.TopApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.TopApartmentMasterView

class CommonFloor.LeftApartmentMasterView extends Marionette.ItemView

	template : '<div class="col-md-3 col-xs-12 col-sm-12 search-left-content leftview"></div>'

	onShow:->
		$('.leftview').hide()

class CommonFloor.LeftApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.LeftApartmentMasterView

class CommonFloor.CenterApartmentMasterView extends Marionette.ItemView

	template : '<div class="col-md-9 us-right-content">
	            <div class="list-view-container">
	              <div class="single-bldg">
	                <div class="prev"></div>
	                <div class="next"></div>
	              </div>
	              <div class="svg-area">
	                <img src="../../images/bldg-3d.png" class="img-responsive">
	              </div>
	            </div>
	          </div>'



class CommonFloor.CenterApartmentMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.CenterApartmentMasterView
					