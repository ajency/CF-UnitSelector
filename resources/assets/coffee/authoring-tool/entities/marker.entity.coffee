#functions of a marker
#1.create a marker using svgs
#2.Function to make polygon draggable
#event handler functions



class Marker extends Backbone.Model

	initialize:->
		@node = ""
		@pointList = []

	createMarkerGroup:->
		@node = document.createElementNS('http://www.w3.org/2000/svg','g')

	createMarkerTag:(item)->
		console.log item
		@createMarkerGroup()
		# get marker type
		markerType = item.other_details.marker_type

	
	
	
	


window.marker = new Marker