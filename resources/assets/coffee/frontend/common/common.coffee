class CommonFloor.NothingFoundView extends Marionette.ItemView
	
	template : '#noFound-template'

class CommonFloor.NothingFoundCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NothingFoundView

CommonFloor.loadJSONData = ()->

	$.ajax
		type : 'GET',
		url  : BASERESTURL+'/project/'+	PROJECTID+'/step_one'
		async : false
		sucess :(response)->
			bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants);
			settings.setSettingsAttributes(response.settings);
			unitCollection.setUnitAttributes(response.units);
			unitTypeCollection.setUnitTypeAttributes(response.unit_types);
			CommonFloor.checkProjectType()
		error :(response)->
			console.log "aaaaaaaaaaassdff"


CommonFloor.checkProjectType = ()->
	Router = []
	bunglowVariantCollection.each (model)->
		bunglowUnits = unitCollection.where
			unit_variant : model.get('id')
		Router.push
			'name'  : 'bunglows'
			'count' : bunglowUnits.length

	controller = _.max Router , (item)->
		return parseInt item.count


	console.log controller

	CommonFloor.navigate '#/master-view/'+@model.get('id')+'/bunglows' , true




