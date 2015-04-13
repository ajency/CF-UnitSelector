class CommonFloor.UnitLayoutView extends Marionette.LayoutView

	template : '#unit-view-template'



class CommonFloor.UnitDetailViewCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID)
			CommonFloor.loadJSONData()
		
		@show new CommonFloor.UnitLayoutView

class TopUnitView extends Marionette.ItemView

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

	



	

class CommonFloor.TopUnitCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		unit = unitCollection.findWhere
			id  : unitid
		@show new TopUnitView
				model : unit
			

class LeftUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
            <div class="filters-wrapper">
              <div class="blck-wrap">
                <h2 class="pull-left"><strong>Villa 1001</strong></h2>
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
                    <div class="col-sm-4">
                      <h5 class="accord-head">No</h5>                      
                    </div>
                    <div class="col-sm-4">
                      <h5 class="accord-head">Area</h5>                      
                    </div>
                  </div>
                </div>
                <div class="blck-wrap">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6>Bedroom</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">2</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">98sqft</h6>                      
                    </div>
                  </div>
                </div>
                <div class="blck-wrap">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6>Terrace</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">1</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">27sqft</h6>                      
                    </div>
                  </div>
                </div>
                <div class="blck-wrap">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6>Bathroom</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">4</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">98sqft</h6>                      
                    </div>
                  </div>
                </div>
                <div class="blck-wrap">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6>Store</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">1</h6>                      
                    </div>
                    <div class="col-sm-4">
                      <h6 class="">27sqft</h6>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>')

	serializeData:->
		data = super()
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		unit = unitCollection.findWhere
			id  : unitid
		unitVariant = bunglowVariantCollection.findWhere
								'id' : unit.get('unit_variant_id')
			
		unitType = unitTypeCollection.findWhere
								'id' :  unitVariant.get('unit_type_id')
		data.area = unitVariant.get('super_build_up_area')
		data.type = unitType.get('name')
		data
	

class CommonFloor.LeftUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftUnitView
			

class CenterUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
            <div class="svg-area">
              <img src="../../images/step3.png">
            </div>
          </div>')

	

class CommonFloor.CenterUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterUnitView
			
			

