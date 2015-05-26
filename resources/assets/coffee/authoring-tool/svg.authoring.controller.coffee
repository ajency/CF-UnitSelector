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
	$('.area').canvasAreaDraw()
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
									'points'  : ["359", "332", "418", "365", "345", "359"]
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
									'points'  : ["425", "485", "459", "501", "457", "547", "408", "550"]
								},
								{
									'id' : 4,
									'type' : 'villa',
									'name' : 'Villa 4',
									'canvas_type' : 'polygon',
									'details' : {'class':'marked'},
									'points'  : ["629", "490", "667", "476", "704", "474", "709", "499", "706", "536", "635", "539"]
								},
								{
									'id' : 5,
									'type' : 'villa',
									'name' : 'Villa 5',
									'canvas_type' : '',
									'details' : '',
									'points'  : []
								},
								{
									'id' :6,
									'type' : 'building',
									'name' : 'Building 1',
									'canvas_type' : '',
									'details' : '',
									'points'  : []
								}


							]
					'supported_types' : ['villa','building']
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
		# rawSvg.setAttributeNS(null,'viewBox','0 0 1600 1095')
		# rawSvg.setAttributeNS(null,'enable-background','new 0 0 1600 1095')
		rawSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")

		window.createImageTag()
		$.each svgData,(index,value)->

			if value.canvas_type is 'polygon'
				tag = window.polygon.createPolgyonTag(value)
				if !_.isEmpty tag 
					window.makeDraggable()
					rawSvg.appendChild tag
			if value.type is 'marker'
				window.marker.createMarkerTag(value)
		
		



	#function to create image tag
	window.createImageTag =()->	
		svgimg = document.createElementNS('http://www.w3.org/2000/svg','image')
		svgimg.setAttributeNS(null,'height','100%')
		svgimg.setAttributeNS(null,'width','100%')
		svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', svgImg)
		svgimg.setAttributeNS(null,'x','0')
		svgimg.setAttributeNS(null,'y','0')
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
		collection = new Backbone.Collection svgData.data
		# uniqTypes = _.pluck svgData , 'type'
		# uniqTypes = _.uniq uniqTypes
		# supportedTypes = svgData.supported_types.map (item)->
		# 	return s.capitalize item
		supportedTypes = svgData.supported_types
		supportedTypes = _.uniq supportedTypes
		$.each supportedTypes ,(index,value)->
			items = collection.where
						'type' : value
			marked = []
			$.each items,(ind,val)->
				if !_.isEmpty val.get('canvas_type')
					marked.push val

			type.push
				'name' : value
				'id'   : value
				'total' : items.length
				'marked' : marked.length
		$.each type,(index,value)->
			if value.total is 0
				type = _.without(type, value)

		type

	window.showPendingObjects = (data)->
		html = ''
		$.each data ,(index,value)->
			html += '<input type="checkbox" name="'+value.id+'" id="'+value.id+'" value="">'+value.name+
					'<strong>Display marked units</strong>'+
					'<strong class="pull-right" style="line-height:70px;margin-right: 20px;  color: #FF7E00;">'+
					'Marked: '+value.marked+' '+value.name+'(s) | Total : '+value.total+' '+value.name+'(s)</strong>'
		$('.pending').html html

	window.createSvg(window.svgData.data)
	window.createPanel(window.svgData.supported_types)		
	types = window.getPendingObjects(window.svgData) 
	window.showPendingObjects(types)
	s = new XMLSerializer()
	str = s.serializeToString(rawSvg)
	draw.svg str

	$('.marked').on 'dblclick', (e) ->
		$('#aj-imp-builder-drag-drop canvas').show()
		$('#aj-imp-builder-drag-drop .svg-draw-clear').show()
		$('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
		currentElem = e.currentTarget
		svgDataObjects = svgData.data
		_.each svgDataObjects, (svgDataObject, key) =>
			elemTypeId = $(currentElem).attr("type-id")
			if parseInt(elemTypeId) is svgDataObject.id
				points = svgDataObject.points
				drawPoly(points)
				$("input[name=svg-element-id]").val(svgDataObject.id)

			
		

		# points1 =  [425, 485, 459, 501, 457, 547, 408, 550]
		# points2 = [629, 490, 667, 476, 704, 474, 709, 499, 706, 536, 635, 539]
		# drawPoly(points1)
		# drawPoly(points2)
		


	$('#aj-imp-builder-drag-drop canvas').ready ->
		$('#aj-imp-builder-drag-drop canvas').hide()
		$('#aj-imp-builder-drag-drop .svg-draw-clear').hide()

	$('#save-svg-elem').on 'click', (e) ->
		console.log "click save-svg-elem"
		newCoordinates = $('.area').val()
		newPoints = newCoordinates.split(',').map((point) ->
		  parseInt point, 10
		)

		editedElemTypeId = $("input[name=svg-element-id]").val()
		newSvgData = svgData
		_.each svgData.data, (svgDataObject, key) =>
			if svgDataObject.id is parseInt(editedElemTypeId)
				# change global svg data with new points
				newSvgData['data'][key]['points'] = newPoints
				window.svgData = newSvgData

				# regenerate newly modified svg element


		$('#aj-imp-builder-drag-drop canvas').hide()
		$('#aj-imp-builder-drag-drop svg').first().css("position","relative")
		$("input[name=svg-element-id]").val("")	
		$(".area").val("")	
			

			

	
  

	 





	
   
