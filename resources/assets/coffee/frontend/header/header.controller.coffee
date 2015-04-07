class HeaderView extends Marionette.ItemView

	template : '#header-template'


	onShow:->
		console.log 'view'


class CommonFloor.HeaderCtrl extends Marionette.RegionController

	initialize:(options)->
		console.log "aaaaaaaaa"
		@show new HeaderView()
		
		



