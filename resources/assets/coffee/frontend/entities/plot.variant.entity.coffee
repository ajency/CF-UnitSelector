#Plot Variant model and Plot Variant collection Definition
class PlotVariant extends Backbone.Model

	#calculate unit price of a model 
	findUnitPrice:(unit_model)->
		basicCost = ""
		if unit_model not instanceof Backbone.Model || unit_model == ""
			return 
		# unitVarinatModel = plotVariantMasterCollection.findWhere({
		# 	'id':parseInt(unit_model.get('unit_variant_id'))})
		# if unitVarinatModel != undefined
		# 	basic_cost = ( parseFloat(unitVarinatModel.get('per_sq_ft_price'))) *
		# 					parseFloat(unitVarinatModel.get('size'))
		# 	basicCost = basic_cost.toFixed(2)
		basicCost = unit_model.get 'selling_amount'
		basicCost

	



class PlotVariantCollection extends Backbone.Collection
	model : PlotVariant
	
	#set attributes of a Plot Variant model
	setPlotVariantAttributes:(data)->
		plotVariantCollection.reset data
		plotVariantMasterCollection.reset data

	#set plot units
	getPlotUnits:->
		units = []
		newUnits = []
		plotVariantCollection.each (model)->
			plotUnits = unitCollection.where
				unit_variant_id : model.get('id')
			units.push  plotUnits
		$.each units,(index,value)->
			newUnits = $.merge(newUnits , value)

		newUnits

	#set plot units
	getPlotMasterUnits:->
		units = []
		newUnits = []
		plotVariantMasterCollection.each (model)->
			plotUnits = unitMasterCollection.where
				unit_variant_id : model.get('id')
			units.push  plotUnits
		$.each units,(index,value)->
			newUnits = $.merge(newUnits , value)

		newUnits

	getPlotUnitTypes:->
		unit_types = []
		plotVariantMasterCollection.each (item)->
			unitTypeModel = unitTypeMasterCollection.findWhere
								'id' : item.get 'unit_type_id'
			if $.inArray(item.get('unit_type_id'),unit_types) == -1
				unit_types.push parseInt unitTypeModel.get 'id'
				
						

		unit_types

	getPlotAttributes:->
		attributes = []
		plotVariantMasterCollection.each (item)->
			$.each item.get('variant_attributes') , (index,value)->
				if _.isArray(value)
					$.each vale , (ind,val)->
						if $.inArray(val,attributes) == -1
							attributes.push value
				else
					if $.inArray(value,attributes) == -1
						attributes.push value
				
						

		attributes

	

window.plotVariantCollection  = new PlotVariantCollection
window.plotVariantMasterCollection  = new PlotVariantCollection
window.plotVariant = new PlotVariant