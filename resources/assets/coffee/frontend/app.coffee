_.extend Marionette.Application::,

	appStates :
		'project':
			url : '/project'
			sections : 
				'top' : 
					ctrl : 'TopCtrl'
				'left' : 
					ctrl : 'LeftCtrl'
				'center' : 
					ctrl : 'CenterCtrl'
			

	getCurrentRoute : ->
		Backbone.history.getFragment()

	state : (name, def = {})->
		@appStates[name] = def
		@

	_registerStates : ->
		Marionette.RegionControllers.prototype.controllers = @
		_.extend Marionette.AppStates::, appStates : @appStates
		@router = new Marionette.AppStates app : CommonFloor

	start : (options = {})->
		@_detectRegions()
		@triggerMethod 'before:start', options
		@_registerStates()
		@_initCallbacks.run options, @
		@triggerMethod 'start', options