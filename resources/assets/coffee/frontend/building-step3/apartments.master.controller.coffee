class CommonFloor.ApartmentsMasterView extends Marionette.LayoutView

	template : '#project-template'



class CommonFloor.ApartmentsMasterCtrl extends Marionette.RegionController


	intialize:->
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

	intialize:->
		@show new CommonFloor.TopApartmentMasterView

class CommonFloor.LeftApartmentMasterView extends Marionette.ItemView

	template : '<div class="col-md-3 col-xs-12 col-sm-12 search-left-content leftview"></div>'

	onShow:->
		$('.leftview').hide()

class CommonFloor.LeftApartmentMasterCtrl extends Marionette.RegionController

	intialize:->
		@show new CommonFloor.LeftApartmentMasterView

class ApartmentsView extends Marionette.ItemView

	template : '<li>{{unit_name}}</li>'



class CommonFloor.CenterApartmentMasterView extends Marionette.CompositeView

	template : '<div>
				<ul class="units">
				</ul>

				<div>'

	childView : ApartmentsView

	childViewContainer : '.units'


class CommonFloor.CenterApartmentMasterCtrl extends Marionette.RegionController

	intialize:->
		response = window.building.getBuildingUnits()
		unitsCollection = new Backbone.Collection response
		@show new CommonFloor.CenterApartmentMasterView
					collection : unitsCollection