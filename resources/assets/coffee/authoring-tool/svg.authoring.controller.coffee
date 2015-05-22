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
									'points'  : ["197.333","566.667","495.333","490","479.333","472.667","456","448.667","454","474.667","477.333","517.333","519.333","587"]
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
									'points'  : ["307.333","459.333","468","482.667","490","517.333","519.333","587","602.667","580","570.667","489.333","488","463.333"]
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
									'points'  : ["382.665","469.999","479.999","495.332","501.999","570.667","580","602.667","615.999","590.666","582.666","514.666","505.332","489.332","485.332","474.666"]
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
	
	window.getPendingObjects  = (svgData)->
		type = []
		collection = new Backbone.Collection svgData
		uniqTypes = _.pluck svgData , 'type'
		uniqTypes = _.uniq uniqTypes
		$.each uniqTypes ,(index,value)->
			items = collection.where
						'type' : value
			notMarked = []
			$.each items,(ind,val)->
				if val.get('canvas_type') == ""
					notMarked.push val

			type.push
				'name' : value
				'id'   : value
				'total' : items.length
				'unmarked' : notMarked.length

		type

	window.showPendingObjects = (data)->
		html = ''
		$.each data ,(index,value)->
			html += '<input type="checkbox" name="'+value.id+'" id="'+value.id+'" value="">'+value.name+
					'<strong>Display marked units</strong>'+
					'<strong class="pull-right" style="line-height:70px;margin-right: 20px;  color: #FF7E00;">'+
					'Pending: '+value.unmarked+' '+value.name+'(s) | Total : '+value.total+' '+value.name+'(s)</strong>'
		$('.pending').html html

	window.createSvg(window.svgData.data)
	window.createPanel(window.svgData.supported_types)		
	types = window.getPendingObjects(window.svgData.data) 
	window.showPendingObjects(types)
	s = new XMLSerializer()
	str = s.serializeToString(rawSvg)
	draw.svg str

	# polygon = draw.polygon('521,38,611,32,620,190,524,201').fill('red')
	# polygon = draw.polygon('0,0 100,50 50,100').fill('red')
	# polygon.draggable()

	polygon.dragend = (event) ->
	  # alert 'end of drag'
	  console.log event
	  # $('#Layer_1').addClass 'hidden'
	  $('.area').removeClass 'hidden'
	  # $('.area').canvasAreaDraw()



	
  

	 





	
   
