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
					'data' : []
					'supported_types' : ['villa','plot']
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
		svgimg.setAttributeNS(null,'height','800')
		svgimg.setAttributeNS(null,'width','1600')
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
		console.log supportedTypes = _.uniq supportedTypes
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
		# $.each type,(index,value)->
		# 	if value.total is 0
		# 		type = _.without(type, value)

		type


	window.showPendingObjects = (data)->
		html = ''
		total = []
		marked = []
		$.each data ,(index,value)->
			total.push value.total+' '+value.name+'(s)'
			marked.push value.marked+' '+value.name+'(s)'
		console.log total
		console.log marked
		html = '<strong class="pull-right total-count">'+total.join(" | ")+'</strong>'+
				'<strong class="pull-right title-count"> Total:</strong>'+
				'<strong class="pull-right total-count">'+marked.join(" | ")+'</strong>'+
				'<strong class="pull-right title-count"> Marked:</strong>'
		console.log html
		$('.pending').html html



	window.generatePropTypes = ()->
		types = window.svgData.supported_types
		select = $('.property_type')
		$('<option />', {value: "", text: 'Select option'}).appendTo(select)
		$.each types , (index,value)->
			$('<option />', {value: value, text: value.toUpperCase()}).appendTo(select)

		
	#api required to load second step
	window.loadJSONData = ()->

		$.ajax
			type : 'GET',
			url  : BASERESTURL+'/project/'+	PROJECTID+'/step-two'
			async : false
			success :(response)->

				#parsing the integer fields 
				response = response.data
				bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants)
				settings.setSettingsAttributes(response.settings)
				unitTypeCollection.setUnitTypeAttributes(response.unit_types)
				buildingCollection.setBuildingAttributes(response.buildings)
				apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants)
				floorLayoutCollection.setFloorLayoutAttributes(response.floor_layout)
				window.propertyTypes = response.property_types
				plotVariantCollection.setPlotVariantAttributes(response.plot_variants)
				unitCollection.setUnitAttributes(response.units)
				

				
			error :(response)->
				@region =  new Marionette.Region el : '#noFound-template'
				new CommonFloor.ProjectCtrl region : @region

	#api required to load second step
	window.loadOjectData = ()->

		$.ajax
			type : 'GET',
			url  : BASEURL+'/admin/project/'+	PROJECTID+'/image/'+IMAGEID
			async : false
			success :(response)->

				window.svgData = {}
				window.svgData['image'] = svgImg
				window.svgData['data'] = response.data
				

				
			error :(response)->
				@region =  new Marionette.Region el : '#noFound-template'
				new CommonFloor.ProjectCtrl region : @region
		

	window.createSvg(window.svgData.data)
	window.generatePropTypes()
	types = window.getPendingObjects(window.svgData) 
	window.showPendingObjects(types)
	s = new XMLSerializer()
	str = s.serializeToString(rawSvg)
	console.log window.store = draw.svg(str)
	window.loadJSONData()
	window.loadOjectData()

	



			
		

		# points1 =  [425, 485, 459, 501, 457, 547, 408, 550]
		# points2 = [629, 490, 667, 476, 704, 474, 709, 499, 706, 536, 635, 539]
		# drawPoly(points1)
		# drawPoly(points2)
		


	$('#aj-imp-builder-drag-drop canvas').ready ->
		$('#aj-imp-builder-drag-drop canvas').hide()
		$('#aj-imp-builder-drag-drop .svg-draw-clear').hide()

	# $('#save-svg-elem').on 'click', (e) ->
	# 	console.log "click save-svg-elem"
	# 	newCoordinates = $('.area').val()
	# 	newPoints = newCoordinates.split(',').map((point) ->
	# 	  parseInt point, 10
	# 	)

	# 	editedElemTypeId = $("input[name=svg-element-id]").val()
	# 	newSvgData = svgData
	# 	_.each svgData.data, (svgDataObject, key) =>
	# 		if svgDataObject.id is parseInt(editedElemTypeId)
	# 			# change global svg data with new points
	# 			newSvgData['data'][key]['points'] = newPoints
	# 			window.svgData = newSvgData

	# 			# regenerate newly modified svg element


	# 	$('#aj-imp-builder-drag-drop canvas').hide()
	# 	$('#aj-imp-builder-drag-drop svg').first().css("position","relative")
	# 	$("input[name=svg-element-id]").val("")	
	# 	$(".area").val("")	
	$(".toggle").click( ()->
		$(this).toggleClass("expanded");
		$('.menu').toggleClass('open');
	 
	)

	$('.save').on 'dblclick', (e) ->
		e.preventDefault()
		window.canvas_type = "polygon"
		$('#aj-imp-builder-drag-drop canvas').show()
		$('#aj-imp-builder-drag-drop .svg-draw-clear').show()
		$('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
		$('.edit-box').removeClass 'hidden'
		
	window.bindevents = ()->
		$('.villa,.plot').on 'dblclick', (e) ->
			e.preventDefault()
			window.canvas_type = "polygon"
			$('#aj-imp-builder-drag-drop canvas').show()
			$('#aj-imp-builder-drag-drop .svg-draw-clear').show()
			$('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
			$('.edit-box').removeClass 'hidden'
			currentElem = e.currentTarget
			console.log element = currentElem.id
			console.log classElem = $(currentElem).attr('type')
			svgDataObjects = svgData.data
			_.each svgDataObjects, (svgDataObject, key) =>
				if parseInt(element) is parseInt svgDataObject.id
					points = svgDataObject.points
					$('.area').val points.join(',')
					collection = new Backbone.Collection window.svgData.data
					collection.remove element
					window.svgData.data =  collection.toArray()
					drawPoly(points)
					window.loadForm(classElem)
					window.showDetails(currentElem)

					
	
	$('.submit').on 'click', (e) ->
		if  _.isEmpty $('.units').val()
			$('.alert').text 'Unit not assigned'
			window.hideAlert()
			return false
		if  _.isEmpty $('.area').val() 
			$('.alert').text 'Coordinates not marked'
			window.hideAlert()
			return false
		value =  $('.area').val().split(',')
		window.store.remove()
		details = {}
		details['class'] = 'layer '+$('.property_type').val()
		childEle = {} 
		childEle['id'] = $('.units').val()
		childEle['name'] = $(".units option:selected").text()
		childEle['type'] = $('.property_type').val()
		childEle['points'] = value
		childEle['details'] = details
		childEle['canvas_type'] = window.canvas_type
		
		console.log window.svgData.data.push childEle
		
		window.createSvg(window.svgData.data)
		types = window.getPendingObjects(window.svgData) 
		window.showPendingObjects(types)
		s = new XMLSerializer()
		str = s.serializeToString(rawSvg)
		draw.svg str
		window.bindevents()
		$('.area').val("")
		window.f = []
		$("form").trigger("reset")
		$('#dynamice-region').empty()
		$(".toggle").trigger 'click'
		$('#aj-imp-builder-drag-drop canvas').hide()
		$('#aj-imp-builder-drag-drop svg').show()
		$('.edit-box').addClass 'hidden'
		canvas = document.getElementById("c")
		ctx= canvas.getContext("2d")
		ctx.clearRect( 0 , 0 , canvas.width, canvas.height )
		
		

	$('.property_type').on 'change', (e) ->
		type = $(e.target).val()
		window.loadForm(type)

	window.loadForm = (type)->
		if type is 'villa'
			@region =  new Marionette.Region el : '#dynamice-region'
			new AuthoringTool.VillaCtrl region : @region
		if type is 'plot'
			@region =  new Marionette.Region el : '#dynamice-region'
			new AuthoringTool.PlotCtrl region : @region

	window.showDetails = (elem)->
		$('.property_type').val $(elem).attr 'type'
		console.log elem.id
		$('.units').val elem.id
		$('#'+elem.id+'.layer').attr('id' , '')

	window.hideAlert = ()->
		$('.alert').show()
		$('.alert-box').delay(1000).queue( (next)->
				$(this).hide('fade') 
				next() 
		)


	
		


			

	
  

	 





	
   
