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

	window.svgData = {
					'image':''
					'data' : [
								{
									'id' : 1,
									'type' : 'villa',
									'name' : 'Villa 1',
									'canvas_type' : 'polygon',
									'details' : {'class':'marked'},
									'points'  : [208,221,208,202,198,199,201,191,218,176,229,155,221,132,196,117,169,131,157,158,163,172,177,164,173,180,190,185,192,199,187,201,185,222]
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
									'points'  : [208,221,208,202,198,199,201,191,218,176,229,155,221,132,196,117,169,131,157,158,163,172,177,164,173,180,190,185,192,199,187,201,185,222]
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
									'points'  : [208,221,208,202,198,199,201,191,218,176,229,155,221,132,196,117,169,131,157,158,163,172,177,164,173,180,190,185,192,199,187,201,185,222]
								}


							]
					'supported_types' : ['polygon']
				}

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
					rawSvg.appendChild tag
			if value.type == 'marker'
				window.marker.createMarkerTag(value)
		
		




	window.createImageTag =()->	
		svgimg = document.createElementNS('http://www.w3.org/2000/svg','image')
		svgimg.setAttributeNS(null,'height','1600')
		svgimg.setAttributeNS(null,'width','1600')
		svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', svgImg)
		svgimg.setAttributeNS(null,'x','10')
		svgimg.setAttributeNS(null,'y','10')
		svgimg.setAttributeNS(null, 'visibility', 'visible')
		rawSvg.appendChild(svgimg)

	# window.createPanel(window.svgData.data.)
	window.createSvg(window.svgData.data)
	draw = SVG('aj-imp-builder-drag-drop')
	s = new XMLSerializer()
	str = s.serializeToString(rawSvg)
	draw.svg str


	
  

	 





	
   
