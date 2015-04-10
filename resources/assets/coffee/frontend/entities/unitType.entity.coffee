#Unit Type model and Unit Type collection Definition
class UnitType extends Backbone.Model

	



class UnitTypeCollection extends Backbone.Collection
	model : UnitType
	
	#set attributes of a unit type model
	# if blank,fetch it from the server with the url mentioned above.
	setUnitTypeAttributes:(data)->

		# @set unitTypeData
		unitTypeCollection.reset data


window.unitTypeCollection  = new UnitTypeCollection;