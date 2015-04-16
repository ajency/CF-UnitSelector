#Apartment Variant model and Apartment Variant collection Definition
class ApartmentVariant extends Backbone.Model

	#calculate unit price of a model 
	findUnitPrice:(unit_model)->
		if unit_model not instanceof Backbone.Model || unit_model == ""
			return 
		unitVarinatModel = apartmentVariantCollection.findWhere({
			'variant_id':parseInt(unit_model.get('unit_variant'))})
		floorRise = settings.get('floor_rise')[unit_model.get('floor')]
		basic_cost = ( parseFloat(unitVarinatModel.get('per_sq_ft_price')) + parseFloat(floorRise )) *
						parseFloat(unitVarinatModel.get('sellable_area'))
		basic_cost.toFixed(2)

	



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

window.apartmentVariantCollection  = new ApartmentVariantCollection;