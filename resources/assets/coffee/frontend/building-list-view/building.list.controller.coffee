class CenterItemView extends Marionette.ItemView

	template :  Handlebars.compile('<li class="bldg blocks {{status}}">
					                    <div class="bldg-img"></div>
					                    <div class="info">
					                      <h2 class="m-b-5">{{name}}</h2>
					                      <div>Starting from Rs.<span>50 lakhs</span></div>
					                      <div>No. of Floors: <span>45</span></div>
					                    </div>
					                    <div class="clearfix"></div>
					                    <div class="unit-type-info">
					                      <ul>
					                        <li>
					                          2BHK: <span>30</span>
					                        </li>
					                        <li>
					                          3BHK: <span>40</span>
					                        </li>
					                        <li>
					                          4BHK: <span>50</span>
					                        </li>
					                      </ul>
					                    </div>
					                  </li>')

	events:
		'mouseover' :(e)->
			id = @model.get 'id'
			response = building.getUnitTypes(id)
			
			types = []
			$.each response,(ind,val)->
				unitTypeModel = unitTypeCollection.findWhere
									'id' : val
				variants = apartmentVariantCollection.where
								'unit_type_id' : val
				units = []
				$.each variants,(index,value)->
					unitsColl = unitCollection.where
									'unit_variant_id' : value.get 'id'

					$.merge units, unitsColl
				types.push 
					'name' : unitTypeModel.get 'name'
					'units' : units.length
			console.log types


	
		











class CenterBuildingListView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-12 us-right-content">
			<div class="list-view-container">
			<!--<div class="controls">
			  <div >
			   <a href="#/List-view/bunglows"> Map View</a> |<a href="#/list-view/bunglows">List View</a>
			  </div>
			  <div class="clearfix"></div>
			</div>-->
			<div class="bldg-list">
			  <ul class="units">
				
				
			  </ul>
			  <div class="clearfix"></div>
			</div>
			</div>
		  </div>')

	childView : CenterItemView

	childViewContainer : '.units'


class CommonFloor.CenterBuildingListCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBuildingListView
			collection : buildingCollection