#Functions of a polygon object
#1.Draw a polygon using svgjs
#2.Function to make polygon draggable
#event handler functions
#3.Function to duplicate a polygon

#model for Polygon
class Polygon extends Backbone.Model

	initialize:->
		@node = ""
		@pointList = []

	createPolgyon:->
		@node = document.createElementNS('http://www.w3.org/2000/svg','polygon')

	createPolgyonTag:(item)->
		console.log item.details.class
		@pointList = []
		@createPolgyon()
		@points(item.points)
		@attribute('class',item.details.class)
		@attribute('id',item.id)
		@attribute('type',item.type)
		@node
		
	
	attribute:(key,val)->
		if val == undefined
			return false
		@node.setAttribute(key,val)

	build:(arg)->
		res = []
		i= 0
		l = arg.length
		while i< l
			res.push(arg[i].join(','))
			i++
		res.join(' ')

	points:(args)->
		i= 0
		l = args.length
		while i < l
			@pointList.push([args[i],args[i+1]])
			i+=2
		@attribute('points',@build(@pointList))
		@node

	
	
	
	


window.polygon = new Polygon

	
