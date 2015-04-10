#Bunglow Variant model and Bunglow Variant collection Definition
class BunglowVariant extends Backbone.Model

	



class BunglowVariantCollection extends Backbone.Collection
	model : BunglowVariant
	

	#set attributes of a Bunglow Variant model
	# if blank,fetch it from the server with the url mentioned above.
	setBunglowVariantAttributes:(data)->

		# @set BunglowData
		bunglowVariantCollection.reset data

window.bunglowVariantCollection  = new BunglowVariantCollection;