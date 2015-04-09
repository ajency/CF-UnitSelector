#Unit model and Unit collection Definition
class Unit extends Backbone.Model






	
class UnitCollection extends Backbone.Collection
	model : Unit
	#url to fetch the units
	url : ->
		"http://commonfloor.local/methods/functions.php?action=load_units"


	#set the attributes of a unit model
	# if blank,fetch it from the server with the url mentioned above.
	setUnitAttributes:(project_id)->
		# @set unitData
		if @length == 0 
			unitCollection.fetch(
				async: false
				data : 
					project_id : project_id
				success:(collection, response)=>
					if response == 0
						@reset()

			)

window.unitCollection  = new UnitCollection;	