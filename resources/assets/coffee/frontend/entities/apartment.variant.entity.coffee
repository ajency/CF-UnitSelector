#Apartment Variant model and Apartment Variant collection Definition
class ApartmentVariant extends Backbone.Model

	#calculate unit price of a model 
	findUnitPrice:(unit_model)->
		basicCost = ""
		if unit_model not instanceof Backbone.Model || unit_model == ""
			return 
		unitVarinatModel = apartmentVariantCollection.findWhere({
			'id':parseInt(unit_model.get('unit_variant_id'))})
		if unitVarinatModel != undefined
			# floorRise = settings.get('floor_rise')[unit_model.get('floor')]
			floorRise = 25
			basic_cost = ( parseFloat(unitVarinatModel.get('per_sq_ft_price')) + parseFloat(floorRise )) *
							parseFloat(unitVarinatModel.get('super_built_up_area'))
			basicCost = basic_cost.toFixed(2)
		basicCost

	



class ApartmentVariantCollection extends Backbone.Collection
	model : ApartmentVariant
	#url to fetch Apartment Variants
	url : ->
		"http://commonfloor.local/methods/functions.php?action=load_apartment_variants"


	


	#set attributes of a Apartment Variant model
	# if blank,fetch it from the server with the url mentioned above.
	setApartmentVariantAttributes:(data)->

		# @set apartmentApartmentData
		apartmentVariantCollection.reset data


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

window.apartmentVariantCollection  = new ApartmentVariantCollection
window.apartmentVariant  = new ApartmentVariant