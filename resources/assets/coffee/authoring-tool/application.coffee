jQuery(document).ready ($)->
	#defined routers
	AuthoringTool.state 'svgAuthoring',
			url : '/'
			sections:
				'top' : 
					ctrl : 'TopCtrl'
				'left' :
					ctrl : 'LeftCtrl'
				'right' :
					ctrl : 'RightCtrl'
				'dynamic' :
					ctrl : 'DynamicCtrl'