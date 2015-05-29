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
		supportedTypes = _.uniq supportedTypes
		$.each supportedTypes ,(index,value)->
			items = collection.where
						'object_type' : value
			units = window.actualUnits(value)
			marked = []
			$.each items,(ind,val)->
				if !_.isEmpty val.get('canvas_type')
					marked.push val

			type.push
				'name' : value
				'id'   : value
				'total' : units.length
				'marked' : marked.length
		# $.each type,(index,value)->
		# 	if value.total is 0
		# 		type = _.without(type, value)

		type

	window.actualUnits = (value)->
		units = []
		if value == 'villa'
			units = bunglowVariantCollection.getBunglowUnits()

		units


	window.showPendingObjects = (data)->
		html = ''
		total = []
		marked = []
		$.each data ,(index,value)->
			total.push value.total+' '+value.name+'(s)'
			marked.push value.marked+' '+value.name+'(s)'
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

	window.resetCollection = ()->
		$('.plot,.villa,.building').each (index,value)->
			unit = unitMasterCollection.findWhere
					'id' : parseInt value.id
			unitCollection.remove unit.get 'id'

		console.log unitCollection

		
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
				window.createSvg(window.svgData.data)
				window.generatePropTypes()
				types = window.getPendingObjects(window.svgData) 
				window.showPendingObjects(types)
				s = new XMLSerializer()
				str = s.serializeToString(rawSvg)
				draw.svg(str)
				# window.store = draw.svg(rawSvg)
				window.resetCollection()
				
				

				
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
				window.svgData['supported_types'] = JSON.parse supported_types
				window.loadJSONData()
				

				
			error :(response)->
				alert('Some problem occurred')
		

	
	window.loadOjectData()

	window.renderSVG = ()->
		window.createSvg(window.svgData.data)
		types = window.getPendingObjects(window.svgData) 
		window.showPendingObjects(types)
		s = new XMLSerializer()
		str = s.serializeToString(rawSvg)
		draw.svg str
		window.resetCollection()
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

	$('.save').on 'click', (e) ->
		e.preventDefault()
		window.canvas_type = "polygon"
		$('#aj-imp-builder-drag-drop canvas').show()
		$('#aj-imp-builder-drag-drop .svg-draw-clear').show()
		$('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
		$('.edit-box').removeClass 'hidden'
		$('.edit').addClass 'hidden'
		$('.delete').addClass 'hidden'
		$('.submit').removeClass 'hidden'
		$('.property_type').attr 'disabled' ,  false


	$('svg').on 'dblclick', '.villa,.plot' , (e) ->
			e.preventDefault()
			window.canvas_type = "polygon"
			$('#aj-imp-builder-drag-drop canvas').show()
			$('#aj-imp-builder-drag-drop .svg-draw-clear').show()
			$('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
			$('.edit-box').removeClass 'hidden'
			currentElem = e.currentTarget
			element = currentElem.id
			classElem = $(currentElem).attr('type')
			svgDataObjects = svgData.data
			_.each svgDataObjects, (svgDataObject, key) =>
				if parseInt(element) is parseInt svgDataObject.id
					points = svgDataObject.points
					$('.area').val points.join(',')
					collection = new Backbone.Collection window.svgData.data
					collection.remove element
					window.svgData.data =  collection.toArray()
					drawPoly(points)
					$('.submit').addClass 'hidden'
					$('.edit').removeClass 'hidden'
					$('.delete').removeClass 'hidden'
					window.loadForm(classElem)
					window.showDetails(currentElem)
					
					
		
	

	window.saveUnit = ()->
		myObject  = {}
		details = {}
		details['class'] = 'layer '+$('.property_type').val()
		myObject['image_id'] = IMAGEID
		myObject['object_id'] = $('.units').val()
		myObject['object_type'] =  $('.property_type').val()
		myObject['canvas_type'] =  window.canvas_type
		myObject['points'] =  $('.area').val().split(',')
		myObject['other_details'] =  details
		$.ajax
			type : 'POST',
			headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
			url  : BASEURL+'/admin/project/'+	PROJECTID+'/svg-tool'
			async : false
			data : $.param myObject 
			success :(response)->

				value =  $('.area').val().split(',')
				window.store.remove()
				# details = {}
				# details['class'] = 'layer '+$('.property_type').val()
				# childEle = {} 
				# childEle['id'] = $('.units').val()
				# childEle['name'] = $(".units option:selected").text()
				# childEle['object_type'] = $('.property_type').val()
				# childEle['points'] = value
				# childEle['other_details'] = details
				# childEle['canvas_type'] = window.canvas_type
				
				window.svgData.data.push myObject
				window.renderSVG()
				
				
				

				
			error :(response)->
				alert('Some problem occurred')

					
	
	$('.submit').on 'click', (e) ->

		if $('.property_type').val() == ""
			$('.alert').text 'Unit not assigned'
			window.hideAlert()
			return false
		
		if  $('.units').val() == ""
			$('.alert').text 'Unit not assigned'
			window.hideAlert()
			return false
		if  $('.area').val()  == ""
			$('.alert').text 'Coordinates not marked'
			window.hideAlert()
			return false
		if window.coord == 1
			$('.alert').text 'Already assigned'
			window.hideAlert()
			return false
		window.saveUnit()
		
	$('.edit').on 'click', (e) ->
		myObject  = {}
		details = {}
		details['class'] = 'layer '+$('.property_type').val()
		myObject['image_id'] = IMAGEID
		myObject['object_id'] = $('.units').val()
		myObject['object_type'] =  $('.property_type').val()
		myObject['canvas_type'] =  window.canvas_type
		myObject['points'] =  $('.area').val().split(',')
		myObject['other_details'] =  details
		$.ajax
			type : 'POST',
			headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
			url  : BASEURL+'/admin/project/'+	PROJECTID+'/svg-tool/'+myObject['object_id'] 
			async : false
			data : $.param myObject 
			success :(response)->

				value =  $('.area').val().split(',')
				window.store.remove()
				console.log myObject
				# details = {}
				# details['class'] = 'layer '+$('.property_type').val()
				# childEle = {} 
				# childEle['id'] = $('.units').val()
				# childEle['name'] = $(".units option:selected").text()
				# childEle['object_type'] = $('.property_type').val()
				# childEle['points'] = value
				# childEle['other_details'] = details
				# childEle['canvas_type'] = window.canvas_type
				collection = new Backbone.Collection window.svgData.data
				collection.remove parseInt $('.units').val()
				window.svgData.data = collection.toArray()
				window.svgData.data.push myObject
				window.renderSVG()
				
				

				
			error :(response)->
				alert('Some problem occurred')	
		

	$('.property_type').on 'change', (e) ->
		type = $(e.target).val()
		window.loadForm(type)

	window.loadForm = (type)->
		if type is 'Villas/Bungalows'
			@region =  new Marionette.Region el : '#dynamice-region'
			new AuthoringTool.VillaCtrl region : @region
		if type is 'plot'
			@region =  new Marionette.Region el : '#dynamice-region'
			new AuthoringTool.PlotCtrl region : @region

	window.showDetails = (elem)->
		unit = unitMasterCollection.findWhere
				'id' : parseInt elem.id
		$('.property_type').val $(elem).attr 'type'
		$('.property_type').attr 'disabled' ,  true
		select = $('.units')
		$('<option />', {value: elem.id, text: unit.get('unit_name')}).appendTo(select)
		$('.units').attr 'disabled' ,  true
		$('.units').val elem.id
		$('.units').show()
		
		

	window.hideAlert = ()->
		$('.alert').show()
		$('.alert-box').delay(1000).queue( (next)->
				$(this).hide('fade') 
				next() 
		)

	$('.clear').on 'click' , (e)->
		$('.area').val("")
		window.f = []
		canvas = document.getElementById("c")
		ctx= canvas.getContext("2d")
		ctx.clearRect( 0 , 0 , canvas.width, canvas.height )
		$("form").trigger("reset")
		$(".toggle").trigger 'click'
		$('#dynamice-region').empty()
		$('.edit-box').addClass 'hidden'

	$('.close').on 'click' , (e)->
		$('.area').val("")
		window.f = []
		canvas = document.getElementById("c")
		ctx= canvas.getContext("2d")
		ctx.clearRect( 0 , 0 , canvas.width, canvas.height )
		$("form").trigger("reset")
		$('#dynamice-region').empty()
		$(".toggle").trigger 'click'
		$('#aj-imp-builder-drag-drop canvas').hide()
		$('#aj-imp-builder-drag-drop svg').show()
		$('.edit-box').addClass 'hidden'

	$('.delete').on 'click' , (e)->
		myObject  = {}
		details = {}
		details['class'] = 'layer '+$('.property_type').val()
		myObject['image_id'] = IMAGEID
		myObject['object_id'] = $('.units').val()
		myObject['object_type'] =  $('.property_type').val()
		myObject['canvas_type'] =  window.canvas_type
		myObject['points'] =  $('.area').val().split(',')
		myObject['other_details'] =  details
		collection = new Backbone.Collection window.svgData.data
		collection.remove parseInt $('.units').val()
		window.svgData.data = collection.toArray()
		window.renderSVG()
		window.resetCollection()
				





	
		


			

	
  

	 





	
   
