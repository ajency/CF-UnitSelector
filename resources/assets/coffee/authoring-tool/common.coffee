jQuery(document).ready ($)->
	

		
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
				if tag != ""
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
			html += '<strong class="pull-right" style="line-height:70px;margin-right: 20px;  color: #FF7E00;">'+
					'Marked: '+value.marked+' '+value.name+'(s) | Total : '+value.total+' '+value.name+'(s)</strong>'
		$('.pending').html html