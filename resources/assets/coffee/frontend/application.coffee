jQuery(document).ready ($)->
	#defined routers
	CommonFloor.state 'project',
			url : '/'
			sections:
				'top' : 
					ctrl : 'TopCtrl'
				'left' :
					ctrl : 'LeftCtrl'
				'center' :
					ctrl : 'CenterCtrl'
	CommonFloor.state 'projectMaster',
			url : '/master-view'
			sections:
				'top' : 
					ctrl : 'TopMasterCtrl'
				'left' :
					ctrl : 'LeftMasterCtrl'
				'center' :
					ctrl : 'CenterMasterCtrl'
				'filter' :
					ctrl : 'FilterMasterCtrl'
	CommonFloor.state 'unit',
			url : '/unit-view/:id'
			sections:
				'top' : 
					ctrl : 'TopUnitCtrl'
				'left' :
					ctrl : 'LeftUnitCtrl'
				'center' :
					ctrl : 'CenterUnitCtrl'
	CommonFloor.state 'projectList',
			url : '/list-view'
			sections:
				'top' : 
					ctrl : 'TopListCtrl'
				'left' :
					ctrl : 'LeftListCtrl'
				'center' :
					ctrl : 'CenterListCtrl'
	CommonFloor.state 'apartmentsList',
			url : '/building/:id/apartments'
			sections:
				'top' : 
					ctrl : 'TopApartmentCtrl'
				'left' :
					ctrl : 'LeftApartmentCtrl'
				'center' :
					ctrl : 'CenterApartmentCtrl'

	CommonFloor.state 'apartmentsMaster',
			url : '/building/:id/master-view'
			sections:
				'top' : 
					ctrl : 'TopApartmentMasterCtrl'
				'left' :
					ctrl : 'LeftApartmentMasterCtrl'
				'center' :
					ctrl : 'CenterApartmentMasterCtrl'
	


	CommonFloor.addInitializer ->
		Backbone.history.start()
		CommonFloor.router.storeRoute()
		


	CommonFloor.start()