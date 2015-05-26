jQuery(document).ready ($)->
	#defined routers
	AuthoringTool.state 'svgAuthoring',
			url : '/authoring-tool'
			sections:
				'top' : 
					ctrl : 'TopCtrl'
				'left' :
					ctrl : 'LeftCtrl'
				'right' :
					ctrl : 'RightCtrl'
				


	AuthoringTool.addInitializer ->
		Backbone.history.start()
		
		


	AuthoringTool.start()