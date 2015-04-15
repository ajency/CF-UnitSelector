class BuildingMasterView extends Marionette.LayoutView

	template : '#building-master'

class CommonFloor.BuildingMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new BuildingMasterView


class TopBuildingMasterView extends Marionette.ItemView

	template : '#building-master'


class TopBuildingMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBuildingMasterView


class LeftBuildingMasterView extends Marionette.ItemView

	template : '#building-master'


class LeftBuildingMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftBuildingMasterView

class CenterItemView extends Marionette.ItemView

	template : ''

	events:
		'mouseover' :(e)->
			id = @model.get 'id'
			response = @getUnitTypes(id)
			
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


	getUnitTypes:(id)->
		units = unitCollection.where
						'building_id'  : @model.get 'id'

		variants = units.pluck "unit_variant_id" 
		unitTypes = []
		$.each variants,(index,value)->
			varinatModel = apartmentVariants.findWhere
									'id' : value
			unitTypes.push varinatModel.get 'unit_type_id'

		unitTypes = _.uniq unitTypes
		unitTypes











class CenterBuildingMasterView extends Marionette.CompositeView

	template : '#building-master'

	childView : CenterItemView

	childViewContainer : ''


class CenterBuildingMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBuildingMasterView
			collection : buildingCollection