jQuery(document).ready ($)->
	#defined routers
	# AuthoringTool.state 'svgAuthoring',
	# 		url : '/'
	# 		sections:
	# 			'top' : 
	# 				ctrl : 'TopCtrl'
	# 			'center' :
	# 				ctrl : 'CenterCtrl'
				


	AuthoringTool.addInitializer ->
		Backbone.history.start()
		
		


	AuthoringTool.start()


	
