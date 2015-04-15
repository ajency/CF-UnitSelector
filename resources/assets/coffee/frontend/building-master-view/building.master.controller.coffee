class BuildingListView extends Marionette.LayoutView

	template : '#project-view-template'

class CommonFloor.BuildingListCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
			@show new BuildingListView
		else
			@show new CommonFloor.NothingFoundView
			


class TopBuildingListView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
          <div class="col-md-12 col-xs-12 col-sm-12">
            <!--<div class="row breadcrumb-bar">
              <div class="col-xs-12 col-md-12">
                <div class="bread-crumb-list">
                  <ul class="brdcrmb-wrp clearfix">
                    <li class="">
                      <span class="bread-crumb-current">
                        <span class=".icon-arrow-right2"></span>Back to Poject Overview
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>-->

            <div class="search-header-wrap">
              <h1>Buildings List View</h1>
            </div>
          </div>
        </div>')


class CommonFloor.TopBuildingListCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBuildingListView


class LeftBuildingListView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>')

	onShow:->
		$('.filters').hide()


class CommonFloor.LeftBuildingListCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftBuildingListView

class CenterItemView extends Marionette.ItemView

	template :  Handlebars.compile('<li class="unit {{status}}">
                  <div class="pull-left info">
                    <label>{{name}}</label> 
                  </div>
                  <!--<div class="pull-right cost">
                    50 lakhs
                  </div>-->
                </li>')

	events:
		'mouseover' :(e)->
			id = @model.get 'id'
			building = new Building
			response = building.getUnitTypes(id)
			
			types = []
			$.each response,(ind,val)->
				unitTypeModel = unitTypeCollection.findWhere
									'id' : val
				variants = apartmentVariants.where
								'unit_type_id' : val
				units = []
				$.each variants,(index,value)->
					unitsColl = unitCollection.where
									'unit_variant_id' : value

					$.merge units, unitsColl
				types.push 
					'name' : unitTypeModel.gt 'name'
					'untis' : units.length
			console.log types


	
		











class CenterBuildingListView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-12 us-right-content">
            <!--<div class="controls">
              <div >
               <a href="#/List-view/bunglows"> Map View</a> |<a href="#/list-view/bunglows">List View</a>
              </div>
              <div class="clearfix"></div>
            </div>-->
            <div class="villa-list">
              <ul class="units">
                
                
              </ul>
              <div class="clearfix"></div>
            </div>
          </div>')

	childView : CenterItemView

	childViewContainer : '.units'


class CommonFloor.CenterBuildingListCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBuildingListView
			collection : buildingCollection