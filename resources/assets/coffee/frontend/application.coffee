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
	CommonFloor.state 'bunglowMasterView',
			url : '/master-view/:id/bunglows'
			sections:
				'top' : 
					ctrl : 'TopBunglowCtrl'
				'left' :
					ctrl : 'LeftBunglowCtrl'
				'center' :
					ctrl : 'CenterBunglowCtrl'
	CommonFloor.state 'projectMasterView',
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