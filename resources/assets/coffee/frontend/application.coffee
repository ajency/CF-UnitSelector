jQuery(document).ready ($)->
CommonFloor.addInitializer ->
		Backbone.history.start()


CommonFloor.start()


CommonFloor.navigate '/project' , true