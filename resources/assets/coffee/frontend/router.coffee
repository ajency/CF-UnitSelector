_.extend Marionette.AppStates::,

	history : []

	storeRoute:->
		url = Backbone.history.fragment
		if $.inArray(url, @history ) == -1
			@history.push Backbone.history.fragment

	previous:->
		# window.history.back()
		if @history.length > 1
			return @history[@history.length - 1]
		if @history.length == 1
			return @history[0]
