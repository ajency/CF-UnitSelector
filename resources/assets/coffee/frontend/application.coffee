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
	CommonFloor.state 'bunglowMaster',
			url : '/master-view/bunglows'
			sections:
				'top' : 
					ctrl : 'TopBunglowMasterCtrl'
				'left' :
					ctrl : 'LeftBunglowMasterCtrl'
				'center' :
					ctrl : 'CenterBunglowMasterCtrl'
	CommonFloor.state 'bunglowUnit',
			url : '/bunglows/unit-view/:id'
			sections:
				'top' : 
					ctrl : 'TopBunglowUnitCtrl'
				'left' :
					ctrl : 'LeftBunglowUnitCtrl'
				'center' :
					ctrl : 'CenterBunglowUnitCtrl'
	CommonFloor.state 'bunglowList',
			url : '/list-view/bunglows'
			sections:
				'top' : 
					ctrl : 'TopBunglowListCtrl'
				'left' :
					ctrl : 'LeftBunglowListCtrl'
				'center' :
					ctrl : 'CenterBunglowListCtrl'
	


	CommonFloor.addInitializer ->
		Backbone.history.start()
		


	CommonFloor.start()