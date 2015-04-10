#Unit model and Unit collection Definition
class Unit extends Backbone.Model






	
class UnitCollection extends Backbone.Collection
	model : Unit
	#url to fetch the units
	url : ->
		"http://commonfloor.local/methods/functions.php?action=load_units"


	#set the attributes of a unit model
	# if blank,fetch it from the server with the url mentioned above.
	setUnitAttributes:(data)->
		# @set unitData
		unitCollection.reset data

window.unitCollection  = new UnitCollection;	