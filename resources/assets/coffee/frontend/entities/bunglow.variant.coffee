#Bunglow Variant model and Bunglow Variant collection Definition
class BunglowVariant extends Backbone.Model

	#calculate unit price of a model 
	findUnitPrice:(unit_model)->
		basicCost = ""
		if unit_model not instanceof Backbone.Model || unit_model == ""
			return 
		# unitVarinatModel = bunglowVariantMasterCollection.findWhere({
		# 	'id':parseInt(unit_model.get('unit_variant_id'))})
		# if unitVarinatModel != undefined
		# 	basic_cost = ( parseFloat(unitVarinatModel.get('per_sq_ft_price'))) *
		# 					parseFloat(unitVarinatModel.get('super_built_up_area'))
		# 	basicCost = basic_cost.toFixed(2)
		basicCost = unit_model.get 'selling_amount'
		basicCost

	
	



class BunglowVariantCollection extends Backbone.Collection
	model : BunglowVariant
	

	#set attributes of a Bunglow Variant model
	setBunglowVariantAttributes:(data)->

		# @set BunglowData
		bunglowVariantCollection.reset data
		bunglowVariantMasterCollection.reset data

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


	#get all the bungalow units
	getBunglowMasterUnits:()->
		units = []
		newUnits = []
		bunglowVariantMasterCollection.each (model)->
			bunglowUnits = unitMasterCollection.where
				unit_variant_id : model.get('id')
			units.push  bunglowUnits
		$.each units,(index,value)->
			newUnits = $.merge(newUnits , value)
		newUnits


	getVillaUnitTypes:->
		unit_types = []
		bunglowVariantMasterCollection.each (item)->
			unitTypeModel = unitTypeMasterCollection.findWhere
								'id' : item.get 'unit_type_id'
			if $.inArray(item.get('unit_type_id'),unit_types) == -1
				unit_types.push parseInt unitTypeModel.get 'id'
				
						

		unit_types

	getVillaAttributes:->
		attributes = []
		bunglowVariantMasterCollection.each (item)->
			$.each item.get('variant_attributes') , (index,value)->
				if $.inArray(value,attributes) == -1
					attributes.push value
				
						

		attributes

	

window.bunglowVariantCollection  = new BunglowVariantCollection
window.bunglowVariantMasterCollection  = new BunglowVariantCollection
window.bunglowVariant  = new BunglowVariant