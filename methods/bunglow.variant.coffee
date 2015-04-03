#Bunglow Variant model and Bunglow Variant collection Definition
class BunglowVariant extends Backbone.Model

	



class BunglowVariantCollection extends Backbone.Collection
	model : BunglowVariant
	#url to fetch Bunglow Variants
	url : ->
		"http://commonfloor.local/methods/functions.php?action=load_bunglow_variants"


	#set attributes of a Bunglow Variant model
	# if blank,fetch it from the server with the url mentioned above.
	setBunglowVariantAttributes:(unitVariantData = {},project_id)->

		# @set BunglowData
		if @length == 0 
			bunglowVariantCollection.fetch(
				async: false
				data : 
					project_id : project_id
				success:(collection, response)=>
					if response == 0
						@reset()

			)

		@