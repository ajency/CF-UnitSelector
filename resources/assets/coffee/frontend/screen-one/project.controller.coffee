class ProjectLayoutView extends Marionette.LayoutView

	template : '#project-template'



class CommonFloor.ProjectCtrl extends Marionette.RegionController

	initialize:->
		console.log "aaaaaaaa"
		@show new ProjectLayoutView


class TopView extends Marionette.ItemView

	template : '<li>top</li>'




class CommonFloor.TopCtrl extends Marionette.RegionController

	initialize:->
		@show new TopView



class LeftView extends Marionette.ItemView

	template : '<li>left</li>'





class CommonFloor.LeftCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftView