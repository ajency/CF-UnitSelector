class BuildingMasterView extends Marionette.LayoutView

	template : '#building-master'

class CommonFloor.BuildingMasterCtrl extends Marionette.RegionController

	initialize:->
		@show new BuildingMasterView