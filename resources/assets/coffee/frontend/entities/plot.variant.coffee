#Plot Variant model and Plot Variant collection Definition
class PlotVariant extends Backbone.Model

	



class PlotVariantCollection extends Backbone.Collection
	model : PlotVariant
	
	#set attributes of a Plot Variant model
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