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
			type = 'plot'
			price = window.plotVariant.findUnitPrice(unit)
			attributes = unitVariant.get('variant_attributes')
		unitType = unitTypeCollection.findWhere
							'id' :  unit.get('unit_type_id')
		[unitVariant,unitType,type,price,attributes]






	
class UnitCollection extends Backbone.Collection
	model : Unit
	

	#set the attributes of a unit model
	setUnitAttributes:(data)->
		# @set unitData
		
		response = @setUnitType(data)
		unitCollection.reset response
		unitMasterCollection.reset response
		window.unitTempCollection = unitCollection.clone()
		

	setUnitType:(data)->
		$.each data,(index,value)->
			
			unitVariant = ''
			if bunglowVariantCollection.get(value.unit_variant_id) != undefined
				unitVariant = bunglowVariantCollection.findWhere
								'id' : value.unit_variant_id
			if apartmentVariantCollection.get(value.unit_variant_id) != undefined
				unitVariant = apartmentVariantCollection.findWhere
								'id' : value.unit_variant_id
			if plotVariantCollection.get(value.unit_variant_id) != undefined
				unitVariant = plotVariantCollection.findWhere
								'id' : value.unit_variant_id
				unitVariant.set 'super_built_up_area' ,unitVariant.get('size')
			
			unitType = unitTypeCollection.findWhere
							'id' :  unitVariant.get('unit_type_id')
			value['unit_type_id'] = unitType.get('id')
			value['area'] = unitVariant.get('super_built_up_area')
			

		data

	


window.unitCollection  = new UnitCollection
window.unitMasterCollection  = new UnitCollection
window.unit  = new Unit
