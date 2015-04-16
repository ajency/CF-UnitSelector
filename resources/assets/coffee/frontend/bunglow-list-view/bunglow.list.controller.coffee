class CommonFloor.BunglowListView extends Marionette.LayoutView

	template : '#project-view-template'

#starting point for List view for bunglows
class CommonFloor.BunglowListCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.checkPropertyType()
		if bunglowVariantCollection.length != 0
			@show new CommonFloor.BunglowListView
		else
			@show new CommonFloor.NothingFoundView
		

#view for the top setion
class TopBunglowListView extends Marionette.ItemView

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
              <h1>We are now at {{project_title}}\'s upcoming project having {{units}} villa\'s</h1>
            </div>
          </div>
        </div>')

	serializeData:->
		data = super()
		data.units = bunglowVariantCollection.getBunglowUnits().length
		data

#controller for the top region
class CommonFloor.TopBunglowListCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBunglowListView 
			model : project


#view for the Left setion
class LeftBunglowListView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content filters"><div>')

	onShow:->
		$('.filters').hide()

#controller for the Left region
class CommonFloor.LeftBunglowListCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftBunglowListView 

#view for the Center setion
class CenterBunglowListView extends Marionette.ItemView

	template : Handlebars.compile('<li class="unit {{status}}">
                  <div class="pull-left info">
                    <label>{{unit_name}}</label> ({{unit_type}} {{super_build_up_area}}sqft)
                  </div>
                  <!--<div class="pull-right cost">
                    50 lakhs
                  </div>-->
                </li>')

	initialize:->
		@$el.prop("id", 'unit'+@model.get("id"))

	serializeData:->
		data = super()
		console.log unitVariant = bunglowVariantCollection.findWhere
							'id' : @model.get('unit_variant_id')
		unitType = unitTypeCollection.findWhere
							'id' : unitVariant.get('unit_type_id')
		data.unit_type = unitType.get('name')
		data.super_build_up_area = unitVariant.get('super_build_up_area')
		availability = @model.get('availability')
		data.status = s.decapitalize(availability)
		@model.set 'status' , data.status
		data

	events:
		'click .unit' :(e)->
				if @model.get('status') == 'available'
					CommonFloor.defaults['unit'] = @model.get('id')
					CommonFloor.navigate '/bunglows/unit-view/'+@model.get('id') , true


#Composite view for the Center setion
class CenterCompositeView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-12 us-right-content">
									<div class="list-view-container">
							            <div class="controls mapView">
								            <div class="toggle">
								            	<a href="#/master-view/bunglows">Map</a> |<a href="#/list-view/bunglows">List</a>
								            </div>
							            </div>
							            <div class="legend">
							              <ul>
							                <li class="sold">SOLD</li>
							                <li class="blocked">BLOCKED</li>
							              </ul>
							            </div>
							            <div class="villa-list">
							            	<ul class="units">
							            	</ul>
							            </div>
							        </div>
							       </div>')

	childView : CenterBunglowListView

	childViewContainer : '.units'

	onShow:->
		if project.get('project_master').front  == ""
			$('.mapView').hide()
		else
			$('.mapView').show()

#controller for the Center region
class CommonFloor.CenterBunglowListCtrl extends Marionette.RegionController

	initialize:->
		newUnits = bunglowVariantCollection.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@show new CenterCompositeView
			collection : unitsCollection
		

class CommonFloor.MiddleBunglowMasterView extends Marionette.ItemView

	template : ''




class CommonFloor.MiddleBunglowMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.MiddleBunglowMasterView
				