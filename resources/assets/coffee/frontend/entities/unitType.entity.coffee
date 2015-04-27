#Unit Type model and Unit Type collection Definition
class UnitType extends Backbone.Model

	



class UnitTypeCollection extends Backbone.Collection
	model : UnitType
	
	#set attributes of a unit type model
	setUnitTypeAttributes:(data)->

		# @set unitTypeData
		unitTypeCollection.reset data
		unitTypeTempCollection.reset data


window.unitTypeCollection  = new UnitTypeCollection
window.unitTypeTempCollection  = new UnitTypeCollection