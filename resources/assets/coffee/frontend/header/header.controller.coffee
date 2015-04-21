class HeaderView extends Marionette.ItemView

	template : '#header-template'


	onShow:->
		console.log "aaaaaaaaa"


	

class CommonFloor.HeaderCtrl extends Marionette.RegionController

	initialize:(options)->
		@show new HeaderView()
		
		



