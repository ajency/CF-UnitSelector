#Unit model and Unit collection Definition
class Unit extends Backbone.Model

	getUnitDetails:(unit_id)->
		id  = parseInt unit_id
		unit = unitCollection.findWhere 
			id :  id 
		unitVariant = bunglowVariantCollection.findWhere
							'id' : unit.get('unit_variant_id')
		
		unitType = unitTypeCollection.findWhere
							'id' :  unitVariant.get('unit_type_id')
		[unitVariant,unitType]






	
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

window.unitCollection  = new UnitCollection
window.unit  = new Unit