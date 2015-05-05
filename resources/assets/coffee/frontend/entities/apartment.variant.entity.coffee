#Apartment Variant model and Apartment Variant collection Definition
class ApartmentVariant extends Backbone.Model

	#calculate unit price of a model 
	findUnitPrice:(unitModel)->
		basicCost = 0.00
		if unitModel not instanceof Backbone.Model || unitModel == ""
			return 
		unitVarinatModel = apartmentVariantCollection.findWhere({
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

	getApartmentUnitTypes:->
		unit_types = []
		apartmentVariantMasterCollection.each (item)->
			unitTypeModel = unitTypeMasterCollection.findWhere
								'id' : item.get 'unit_type_id'
			if $.inArray(item.get('unit_type_id'),unit_types) == -1
				unit_types.push parseInt unitTypeModel.get 'id'
				
						

		unit_types

window.apartmentVariantCollection  = new ApartmentVariantCollection
window.apartmentVariantMasterCollection  = new ApartmentVariantCollection
window.apartmentVariant  = new ApartmentVariant