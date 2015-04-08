jQuery(document).ready ($)->

	CommonFloor.state 'project',
			url : '/project'
			sections:
				'top' : 
					ctrl : 'TopCtrl'
				'left' :
					ctrl : 'LeftCtrl'
				'center' :
					ctrl : 'CenterCtrl'


	CommonFloor.addInitializer ->
		Backbone.history.start()
		CommonFloor.navigate '/project' , true


	CommonFloor.start()