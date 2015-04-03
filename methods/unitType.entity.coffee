#Unit Type model and Unit Type collection Definition
class UnitType extends Backbone.Model

	



class UnitTypeCollection extends Backbone.Collection
	model : UnitType
	#url to fetch unit types
	url : ->
		"http://commonfloor.local/methods/functions.php?action=load_unit_types"


	#set attributes of a unit type model
	# if blank,fetch it from the server with the url mentioned above.
	setUnitTypeAttributes:(unitTypeData = {},project_id)->

		# @set unitTypeData
		if @length == 0 
			unitTypeCollection.fetch(
				async: false
				data : 
					project_id : project_id
				success:(collection, response)=>
					if response == 0
						@reset()

			)
		@