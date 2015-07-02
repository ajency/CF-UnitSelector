_.extend Marionette.Application::,

	appStates : {}

	getCurrentRoute : ->
		Backbone.history.getFragment()

	state : (name, def = {})->
		@appStates[name] = def
		@

	_registerStates : ->
		Marionette.RegionControllers.prototype.controllers = @
		_.extend Marionette.AppStates::, appStates : @appStates
		@router = new Marionette.AppStates app : @

	start : (options = {})->
		@_detectRegions()
		@triggerMethod 'before:start', options
		@_registerStates()
		@_initCallbacks.run options, @
		@triggerMethod 'start', options



# Handlebars Localisation Helper
# Source: https://gist.github.com/tracend/3261055
Handlebars.registerHelper 'i10n', (keyword)->

	lang = if (navigator.language) then navigator.language else navigator.userLanguage

	# pick the right dictionary (if only one available assume it's the right one...)
	locale = window.locale[lang] or window.locale['en-US'] or window.locale or false

	# exit now if there's no data
	if not locale then return keyword

	# loop through all the key hierarchy (if any)
	target = locale
	key = keyword.split(".")
	for i in key
		target = target[i]

	# fallback to the original string if nothing found
	target = target || keyword
	#output
	target
