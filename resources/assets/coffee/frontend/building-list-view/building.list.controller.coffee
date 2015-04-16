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