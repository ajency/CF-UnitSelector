jQuery(document).ready ($)->

	CommonFloor.state 'project',
			url : '/'
			sections:
				'top' : 
					ctrl : 'TopCtrl'
				'left' :
					ctrl : 'LeftCtrl'
				'center' :
					ctrl : 'CenterCtrl'


	CommonFloor.addInitializer ->
		Backbone.history.start()
		


	CommonFloor.start()