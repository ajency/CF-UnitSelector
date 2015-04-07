class HeaderView extends Marionette.ItemView

	template : '#header-template'


	

class CommonFloor.HeaderCtrl extends Marionette.RegionController

	initialize:(options)->
		console.log "aaaaaaaaa"
		@show new HeaderView()
		
		



