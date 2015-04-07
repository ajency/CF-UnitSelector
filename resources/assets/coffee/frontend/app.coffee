_.extend Marionette.Application::,

	appStates :
		'header' : 
			url : '/'
		'project':
			url : '/project'
			parent : 'header'
			sections : 
				'top' : 
					ctrl : 'TopCtrl'
				'left' : 
					ctrl : 'LeftCtrl'
			

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