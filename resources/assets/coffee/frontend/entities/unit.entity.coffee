#Unit model and Unit collection Definition
class Unit extends Backbone.Model

	getUnitDetails:(unit_id)->
		id  = parseInt unit_id
		unit = unitCollection.findWhere 
			id :  id 
		unitVariant = 0
		type = ''
		price = 0
		attributes = []
		if bunglowVariantCollection.get(unit.get('unit_variant_id')) != undefined
			unitVariant = bunglowVariantCollection.findWhere
								'id' : unit.get('unit_variant_id')
			type = 'villa'
			price = window.bunglowVariant.findUnitPrice(unit)
			attributes = unitVariant.get('variant_attributes')
		else if apartmentVariantCollection.get(unit.get('unit_variant_id')) != undefined
			unitVariant = apartmentVariantCollection.findWhere
								'id' : unit.get('unit_variant_id')
			type = 'apartment'
			price = window.apartmentVariant.findUnitPrice(unit)
			attributes = unitVariant.get('variant_attributes')
		unitType = unitTypeCollection.findWhere
							'id' :  unitVariant.get('unit_type_id')
		[unitVariant,unitType,type,price,attributes]






	
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