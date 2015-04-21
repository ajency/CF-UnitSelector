#Plot Variant model and Plot Variant collection Definition
class PlotVariant extends Backbone.Model

	



class PlotVariantCollection extends Backbone.Collection
	model : PlotVariant
	#url to fetch Plot Variants
	url : ->
		"http://commonfloor.local/methods/functions.php?action=load_plot_variants"


	#set attributes of a Plot Variant model
	# if blank,fetch it from the server with the url mentioned above.
	setPlotVariantAttributes:(project_id)->

		# @set PlotVariantData
		if @length == 0 
			plotVariantCollection.fetch(
				async: false
				data : 
					project_id : project_id
				success:(collection, response)=>
					if response == 0
						@reset()

			)

window.plotVariantCollection  = new PlotVariantCollection;