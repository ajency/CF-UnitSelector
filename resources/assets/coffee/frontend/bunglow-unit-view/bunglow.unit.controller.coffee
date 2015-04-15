class CommonFloor.BunglowUnitView extends Marionette.LayoutView

	template : '#unit-view-template'



class CommonFloor.BunglowUnitCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID)
			CommonFloor.loadJSONData()
		console.log project.toJSON()
		if jQuery.isEmptyObject(project.toJSON())
			@show new CommonFloor.NothingFoundView
		else
			@show new CommonFloor.BunglowUnitView

class TopBunglowUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
        <div class="col-md-12 col-xs-12 col-sm-12">
            <div class="row breadcrumb-bar">
              <div class="col-xs-12 col-md-12">
                <div class="bread-crumb-list">
                  <ul class="brdcrmb-wrp clearfix">
                    <li class="">
                      <span class="bread-crumb-current">
                        <span class=".icon-arrow-right2"></span><a href="#/master-view/bunglows">
                        	Back to Poject Overview</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="search-header-wrap">
              <h1>You have selected {{unit_name}} Villa</h1>
            </div>
          </div>
        </div>')

	



	

class CommonFloor.TopBunglowUnitCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[2]
		unit = unitCollection.findWhere
			id  : unitid
		@show new TopBunglowUnitView
				model : unit
			

class LeftBunglowUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
            <div class="filters-wrapper">
              <div class="blck-wrap">
                <h2 class="pull-left"><strong>{{unit_name}}</strong></h2>
                <!-- <span class="label label-success">For Sale</span> -->
                <div class="clearfix"></div>
                <div class="details">
                    <!--<div>
                      <label>Starting Price:</label> Rs 1.3 crores
                    </div>-->
                    <div>
                      {{type}} ({{area}} sqft)
                    </div>
                  </div>
              </div>
              <div class="advncd-filter-wrp unit-list">
                <div class="blck-wrap title-row">
                  <div class="row">
                    <div class="col-sm-4">
                      <h5 class="accord-head">Rooms</h5>                      
                    </div>
                    <!--<div class="col-sm-4">
                      <h5 class="accord-head">No</h5>                      
                    </div>-->
                    <div class="col-sm-4">
                      <h5 class="accord-head">Area</h5>                      
                    </div>
                  </div>
                </div>
                {{#levels}}
                <h6>{{level_name}}
                {{#rooms}}
                <div class="blck-wrap">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6>{{room_name}}</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">{{size}}sqft</h6>                      
                    </div>
                  </div>
                </div>
                {{/rooms}}
                {{/levels}}
                
              </div>
            </div>
          </div>')

	serializeData:->
		data = super()
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[2]
		unit = unitCollection.findWhere
			id  : unitid
		unitVariant = bunglowVariantCollection.findWhere
								'id' : unit.get('unit_variant_id')
			
		unitType = unitTypeCollection.findWhere
								'id' :  unitVariant.get('unit_type_id')
		data.area = unitVariant.get('super_build_up_area')
		data.type = unitType.get('name')
		data.unit_name = unit.get('unit_name')
		data
	

class CommonFloor.LeftBunglowUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftBunglowUnitView
			

class CenterBunglowUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
            <div class="svg-area">
              <div class="liquid-slider" id="slider-id">
                   <!--<div>
                        <h2 class="title">External 3D</h2>
                        <img src="../../images/step3.png">
                   </div>-->
                   <div>
                        <h2 class="title">2D Layout</h2>
                        <img src="../../images/step3.png">
                   </div>
                   <div>
                        <h2 class="title">3D Layout</h2>
                        <img src="../../images/step3.png">
                   </div>
              </div>
            </div>
          </div>')

	onShow:->
		$('#slider-id').liquidSlider(
	        slideEaseFunction: "easeInOutQuad",
	        includeTitle:false,
	        autoSlideInterval: 4000,
	        mobileNavigation: false,
	        hideArrowsWhenMobile: false,
	        dynamicTabsAlign: "center",
	        dynamicArrows: false,
       
      	)

	

class CommonFloor.CenterBunglowUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBunglowUnitView
			
			

