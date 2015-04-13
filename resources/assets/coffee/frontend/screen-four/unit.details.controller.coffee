class CommonFloor.UnitLayoutView extends Marionette.LayoutView

	template : '#unit-view-template'



class CommonFloor.UnitDetailViewCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID)
			CommonFloor.loadJSONData()
		
		@show new CommonFloor.UnitLayoutView

class TopUnitView extends Marionette.ItemView

	template : Handlebars.compile('')

	

class CommonFloor.TopUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new TopUnitView


class LeftUnitView extends Marionette.ItemView

	template : Handlebars.compile('')

	

class CommonFloor.LeftUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftUnitView
			

class CenterUnitView extends Marionette.ItemView

	template : Handlebars.compile('')

	

class CommonFloor.CenterUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterUnitView
			
			

