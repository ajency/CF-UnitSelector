#Unit model and Unit collection Definition
class Unit extends Backbone.Model

	#get the unit details 
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
		else if plotVariantCollection.get(unit.get('unit_variant_id')) != undefined
			unitVariant = plotVariantCollection.findWhere
								'id' : unit.get('unit_variant_id')
			unitVariant.set 'super_built_up_area' , unitVariant.get 'size'
			type = 'apartment'
			price = window.plotVariant.findUnitPrice(unit)
			attributes = unitVariant.get('variant_attributes')
		unitType = unitTypeCollection.findWhere
							'id' :  unitVariant.get('unit_type_id')
		[unitVariant,unitType,type,price,attributes]






	
class UnitCollection extends Backbone.Collection
	model : Unit
	

	#set the attributes of a unit model
	setUnitAttributes:(data)->
		# @set unitData
		unitCollection.reset data

window.unitCollection  = new UnitCollection
window.unit  = new Unit