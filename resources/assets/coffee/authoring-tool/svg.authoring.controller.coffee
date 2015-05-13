#Primary File
#using svg.js
#Function to render objects based upon the object type(*) - useful when we want to display a specific object type
# In ths case only those objects will be highlighted
#Function to render all objects which internally calls (*) for each object type
#Function to show a specific object based on the object id
#Function to show the left hand side depending upon the supported object types
#Function to switch to edit mode
#Function to show the options depending on whether object is marked or not
#Function to count the number of pending objects

jQuery(document).ready ($)->
	
	# $('.area').canvasAreaDraw()
	window.draw = SVG('aj-imp-builder-drag-drop')
	
	window.svgData = {
					'image':''
					'data' : [
								{
									'id' : 1,
									'type' : 'villa',
									'name' : 'Villa 1',
									'canvas_type' : 'polygon',
									'details' : {'class':'marked'},
									'points'  : ["197.333","566.667 199.333","495.333 206.667","490 207.333","479.333 218","472.667 218","456 230.667","448.667 267.333","454 267.333","474.667 283.333","477.333 281.333","517.333 275.333","519.333 275.333","587"]
								},
								{
									'id' : 2,
									'type' : 'villa',
									'name' : 'Villa 2',
									'canvas_type' : '',
									'details' : '',
									'points'  : []
								},
								{
									'id' : 3,
									'type' : 'villa',
									'name' : 'Villa 3',
									'canvas_type' : 'polygon',
									'details' : {'class':'marked'},
									'points'  : ["307.333","459.333 293.333","468 294","482.667 284","490 281.333","517.333 275.333","519.333 275.333","587 341.333","602.667 342.667","580 356.667","570.667 358","489.333 343.333","488 342.667","463.333"]
								},
								{
									'id' : 4,
									'type' : 'villa',
									'name' : 'Villa 4',
									'canvas_type' : '',
									'details' : '',
									'points'  : []
								},
								{
									'id' : 5,
									'type' : 'villa',
									'name' : 'Villa 5',
									'canvas_type' : 'polygon',
									'details' : {'class':'marked'},
									'points'  : ["382.665","469.999 369.332","479.999 370.665","495.332 361.998","501.999 356.667","570.667 342.667","580 341.333","602.667 421.332","615.999 419.998","590.666 435.998","582.666 435.998","514.666 449.332","505.332 450.665","489.332 419.665","485.332 420.665","474.666"]
								}


							]
					'supported_types' : ['polygon']
				}
	#function to create the svg
	window.createSvg = (svgData)->
		window.rawSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		rawSvg.setAttribute('id', 'Layer_1')
		rawSvg.setAttribute('style', 'border: 1px solid black')
		rawSvg.setAttribute('width', '100%')
		rawSvg.setAttribute('height', '100%')
		rawSvg.setAttributeNS(null,'x','0')
		rawSvg.setAttributeNS(null,'y','0')
		rawSvg.setAttributeNS(null,'viewBox','0 0 1600 1095')
		rawSvg.setAttributeNS(null,'enable-background','new 0 0 1600 1095')
		rawSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")

		window.createImageTag()
		$.each svgData,(index,value)->

			if value.canvas_type == 'polygon'
				tag = window.polygon.createPolgyonTag(value)
				if tag != ""
					window.makeDraggable()
					rawSvg.appendChild tag
			if value.type == 'marker'
				window.marker.createMarkerTag(value)
		
		



	#function to create image tag
	window.createImageTag =()->	
		svgimg = document.createElementNS('http://www.w3.org/2000/svg','image')
		svgimg.setAttributeNS(null,'height','100%')
		svgimg.setAttributeNS(null,'width','100%')
		svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', svgImg)
		svgimg.setAttributeNS(null,'x','10')
		svgimg.setAttributeNS(null,'y','10')
		svgimg.setAttributeNS(null, 'visibility', 'visible')
		rawSvg.appendChild(svgimg)

	#function to create left side panel
	window.createPanel =(data)->
		$.each data,(index,value)->
			$('.'+value).removeClass 'hidden'

	#function to create left side panel
	window.makeDraggable =(data)->	
		element = draw.polygon(data)
		element.draggable()
	

	window.createPanel(window.svgData.supported_types)
	window.createSvg(window.svgData.data)
	s = new XMLSerializer()
	str = s.serializeToString(rawSvg)
	draw.svg str


	
  

	 





	
   
