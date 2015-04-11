class CommonFloor.NothingFoundView extends Marionette.ItemView
	
	template : '#noFound-template'

class CommonFloor.NothingFoundCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NothingFoundView

CommonFloor.loadJSONData = ()->

	$.ajax
		type : 'GET',
		url  : BASERESTURL+'/project/'+	PROJECTID+'/step-two'
		async : false
		success :(response)->
			console.log response = response.data
			bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants);
			settings.setSettingsAttributes(response.settings);
			unitCollection.setUnitAttributes(response.units);
			unitTypeCollection.setUnitTypeAttributes(response.unit_types);
			CommonFloor.checkProjectType()
		error :(response)->
			console.log "aaaaaaaaaaassdff"


CommonFloor.checkProjectType = ()->
	Router = []
	Router.push 
		'type'  : 'bunglows'
		'count' :CommonFloor.getBunglowUnits()
	console.log Router
	controller = _.max Router , (item)->
		return parseInt item.count.length


	CommonFloor.navigate '#/master-view/'+PROJECTID+'/'+controller.type , true


CommonFloor.getBunglowUnits = ()->
	units = []
	newUnits = []
	bunglowVariantCollection.each (model)->
		bunglowUnits = unitCollection.where
			unit_variant_id : parseInt model.get('id')
		units.push  bunglowUnits
	$.each units,(index,value)->
		newUnits = $.merge(newUnits , value)

	newUnits



