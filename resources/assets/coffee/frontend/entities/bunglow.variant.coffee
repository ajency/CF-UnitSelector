#Bunglow Variant model and Bunglow Variant collection Definition
class BunglowVariant extends Backbone.Model

	#calculate unit price of a model 
	findUnitPrice:(unit_model)->
		basicCost = ""
		if unit_model not instanceof Backbone.Model || unit_model == ""
			return 
		unitVarinatModel = bunglowVariantCollection.findWhere({
			'id':parseInt(unit_model.get('unit_variant_id'))})
		if unitVarinatModel != undefined
			basic_cost = ( parseFloat(unitVarinatModel.get('per_sq_ft_price'))) *
							parseFloat(unitVarinatModel.get('super_built_up_area'))
			basicCost = basic_cost.toFixed(2)
		basicCost

	
	



class BunglowVariantCollection extends Backbone.Collection
	model : BunglowVariant
	

	#set attributes of a Bunglow Variant model
	setBunglowVariantAttributes:(data)->

		# @set BunglowData
		bunglowVariantCollection.reset data
		bunglowVariantTempCollection.reset data

	#get all the bungalow units
	getBunglowUnits:()->
		units = []
		newUnits = []
		bunglowVariantCollection.each (model)->
			bunglowUnits = unitCollection.where
				unit_variant_id : model.get('id')
			units.push  bunglowUnits
		$.each units,(index,value)->
			newUnits = $.merge(newUnits , value)
		newUnits

window.bunglowVariantCollection  = new BunglowVariantCollection
window.bunglowVariantTempCollection  = new BunglowVariantCollection
window.bunglowVariant  = new BunglowVariant