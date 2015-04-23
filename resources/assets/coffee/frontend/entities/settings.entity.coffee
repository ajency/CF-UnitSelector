#Settings model Definition
class Settings extends Backbone.Model

	#generate floor rise object
	generateFloorRise:(building)->
		if building == ""
			return
		buildingModel = buildingCollection.findWhere
							'id' : building
		i = 0 
		floors = buildingModel.get 'floors'
		floors = Object.keys(floors).length
		floorrise = []
		cost = settings.get 'floor_rise'
		sum = 0 + cost
		while i < 1
			floorrise[i] = 0
			i++
		while i <= floors
			floorrise[i] = sum
			sum = sum + cost
			i++
		floorrise


	

	# set attributes of a Settings model
	setSettingsAttributes:(data)->

		# @set settingsData
		settings.set data

		

window.settings  = new Settings		

		

	
		