#Bunglow Variant model and Bunglow Variant collection Definition
class BunglowVariant extends Backbone.Model

	



class BunglowVariantCollection extends Backbone.Collection
	model : BunglowVariant
	

	#set attributes of a Bunglow Variant model
	# if blank,fetch it from the server with the url mentioned above.
	setBunglowVariantAttributes:(data)->

		# @set BunglowData
		bunglowVariantCollection.reset data

	getBunglowUnits:()->
		units = []
		newUnits = []
		bunglowVariantCollection.each (model)->
			bunglowUnits = unitCollection.where
				unit_variant_id : model.get('id')
			units.push  bunglowUnits
		$.each units,(index,value)->
			newUnits = $.merge(newUnits , value)
		console.log newUnits
		newUnits

window.bunglowVariantCollection  = new BunglowVariantCollection;