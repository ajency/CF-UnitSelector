#Apartment Variant model and Apartment Variant collection Definition
class ApartmentVariant extends Backbone.Model

	#calculate unit price of a model 
	findUnitPrice:(unitModel)->
		basicCost = 0.00
		if unitModel not instanceof Backbone.Model || unitModel == ""
			return 
		unitVarinatModel = apartmentVariantMasterCollection.findWhere({
			'id':parseInt(unitModel.get('unit_variant_id'))})
		if ! _.isUndefined unitVarinatModel 
			floorRiseArray = settings.generateFloorRise(unitModel.get('building_id'))
			floorRise = floorRiseArray[unitModel.get('floor')]
			basic_cost = ( parseFloat(unitVarinatModel.get('per_sq_ft_price')) + parseFloat(floorRise )) *
							parseFloat(unitVarinatModel.get('super_built_up_area'))
			basicCost = basic_cost.toFixed(2)
		basicCost

	



class ApartmentVariantCollection extends Backbone.Collection
	model : ApartmentVariant
	#set attributes of a Apartment Variant model
	setApartmentVariantAttributes:(data)->

		# @set apartmentApartmentData
		apartmentVariantCollection.reset data
		apartmentVariantMasterCollection.reset data

	#set apartment units
	getApartmentUnits:->
		units = []
		newUnits = []
		apartmentVariantCollection.each (model)->
			apartmentUnits = unitCollection.where
				unit_variant_id : model.get('id')
			units.push  apartmentUnits
		$.each units,(index,value)->
			newUnits = $.merge(newUnits , value)

		newUnits


	#set penthouse units
	getPenthouseUnits:->
		units = []
		unitCollection.each (model)->
			unitType = unitTypeMasterCollection.findWhere
							'id' :  model.get('unit_type_id')
			property = window.propertyTypes[unitType.get('property_type_id')]
			if s.decapitalize(property) == 'penthouse'
				units.push model
		units

	#get apartment units
	getApartmentMasterUnits:->
		units = []
		newUnits = []
		apartmentVariantMasterCollection.each (model)->
			apartmentUnits = unitMasterCollection.where
				unit_variant_id : model.get('id')
			units.push  apartmentUnits
		$.each units,(index,value)->
			newUnits = $.merge(newUnits , value)

		newUnits

	getApartmentUnitTypes:->
		unit_types = []
		apartmentVariantMasterCollection.each (item)->
			unitTypeModel = unitTypeMasterCollection.findWhere
								'id' : item.get 'unit_type_id'
			if $.inArray(item.get('unit_type_id'),unit_types) == -1
				unit_types.push parseInt unitTypeModel.get 'id'
				
						

		unit_types

	getApartmentFlooringAttributes:->
		attributes = []
		types = []
		apartmentVariantMasterCollection.each (item)->
			unit_type = unitTypeMasterCollection.findWhere
									'id' : parseInt item.get('unit_type_id')
			type = 'A'
			if window.propertyTypes[unit_type.get('property_type_id')] == 'Penthouse'
				type = 'PH'
			if $.inArray(item.get('variant_attributes').flooring,attributes) == -1
				attributes.push item.get('variant_attributes').flooring
				types.push type
				
						
		[attributes,types]

	

window.apartmentVariantCollection  = new ApartmentVariantCollection
window.apartmentVariantMasterCollection  = new ApartmentVariantCollection
window.apartmentVariant  = new ApartmentVariant