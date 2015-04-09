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
	CommonFloor.state 'projectView',
			url : '/master-view/:id'
			sections:
				'top' : 
					ctrl : 'TopMasterCtrl'
				'left' :
					ctrl : 'LeftMasterCtrl'
				'center' :
					ctrl : 'CenterMasterCtrl'




	CommonFloor.addInitializer ->
		Backbone.history.start()
		


	CommonFloor.start()