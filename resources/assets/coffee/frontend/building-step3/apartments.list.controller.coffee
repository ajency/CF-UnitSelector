class CommonFloor.ApartmentsListView extends Marionette.LayoutView

	template : '#project-template'



class CommonFloor.ApartmentsListCtrl extends Marionette.RegionController


	intialize:->
		@show new CommonFloor.ApartmentsListView


class CommonFloor.TopApartmentView extends Marionette.ItemView

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

class CommonFloor.TopApartmentCtrl extends Marionette.RegionController

	intialize:->
		@show new CommonFloor.TopApartmentView

class CommonFloor.LeftApartmentView extends Marionette.ItemView

	template : '<div class="col-md-3 col-xs-12 col-sm-12 search-left-content leftview"></div>'

	onShow:->
		$('.leftview').hide()

class CommonFloor.LeftApartmentCtrl extends Marionette.RegionController

	intialize:->
		@show new CommonFloor.LeftApartmentView

class CommonFloor.CenterApartmentView extends Marionette.ItemView

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

class CommonFloor.CenterApartmentCtrl extends Marionette.RegionController

	intialize:->
		@show new CommonFloor.CenterApartmentView