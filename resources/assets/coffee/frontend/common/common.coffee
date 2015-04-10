class CommonFloor.NothingFoundView extends Marionette.ItemView
	
	template : '#noFound-template'

class CommonFloor.NothingFoundCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NothingFoundView

CommonFloor.loadJSONData = ()->

	$.ajax
		type : 'GET',
		url  : BASERESTURL+'/project/'+	PROJECTID+'/step_one'
		sucess :(response)->
			bunglowVariantCollection.setBunglowVariantAttributes(response.bungloe_variants);
			settings.setSettingsAttributes(response.settings);
			unitCollection.setUnitAttributes(response.units);
			unitTypeCollection.setUnitTypeAttributes(response.unit_types);
		error :(response)->
			console.log "aaaaaaaaaaassdff"