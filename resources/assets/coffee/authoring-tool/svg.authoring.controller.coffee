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

    ########################### GLOBALS BEGIN ###########################
    window.draw = SVG('aj-imp-builder-drag-drop')
    draw.viewbox(0, 0, 1600, 800)
    
    window.svgData = {
                    'image':''
                    'data' : []
                    'supported_types' : ['villa','plot']
                }

    # Default Cx and Cy values
    window.cx = 630.101
    window.cy = 362.245
    window.innerRadius = 8.002
    window.outerRadius = 15.002
    window.markerPoints = []
    ########################### GLOBALS ENDS ###########################
    
    ########################### FUNCTIONS BEGIN ###########################         
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
                    window.makeDraggable()
                    rawSvg.appendChild tag
            if value.canvas_type is 'marker'
                tag = window.marker.createMarkerTag(value)

        
        



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

    #function to generate svg from svg data
    window.generateSvg = (svgData)->
        # create svg background image, set exclude data attrib to true so it can be excluded while exporting the svg
        draw.image(svgImg).data('exclude', true)

        # for each svg data check canvas type and generate elements accordingly
        $.each svgData,(index,value)->
            if value.canvas_type is 'polygon'
                window.polygon.generatePolygonTag(value)

            if value.canvas_type is 'marker'
                window.marker.generateMarkerTag(value)        


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
        #   return s.capitalize item
        supportedTypes = svgData.supported_types
        supportedTypes = _.uniq supportedTypes
        $.each supportedTypes ,(index,value)->
            items = collection.where
                        'object_type' : value.toLowerCase()
            units = window.actualUnits(value.toLowerCase())
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
        #   if value.total is 0
        #       type = _.without(type, value)

        type

    window.actualUnits = (value)->
        units = []
        if value == 'villa'
            units = bunglowVariantCollection.getBunglowMasterUnits()

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
        $('.pending').html html



    window.generatePropTypes = ()->
        types = window.svgData.supported_types
        select = $('.property_type')
        $('<option />', {value: "", text: 'Select option'}).appendTo(select)
        $.each types , (index,value)->
            $('<option />', {value: value.toLowerCase(), text: value.toUpperCase()}).appendTo(select)

    window.resetCollection = ()->
        console.log "test"
        $('.plot,.villa,.building,.marker-grp').each (index,value)->
            console.log value.id
            unit = unitMasterCollection.findWhere
                    'id' : parseInt value.id

            unitCollection.remove unit.get 'id'

        console.log unitCollection

        
    #api required to load second step
    window.loadJSONData = ()->

        $.ajax
            type : 'GET',
            url  : BASERESTURL+'/project/'+ PROJECTID+'/step-two'
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

                # #### CODE TO GENERATE SVG THROUGH RAW SVG STRING COMMENTED #### #
                # window.createSvg(window.svgData.data)

                window.generatePropTypes()

                types = window.getPendingObjects(window.svgData)

                window.showPendingObjects(types)

                # s = new XMLSerializer()
                # str = s.serializeToString(rawSvg)
                # draw.svg(str)
                # #### CODE TO GENERATE SVG THROUGH RAW SVG STRING COMMENTED #### #

                # ### MODIFIED GENERATION OF SVG ### #
                window.generateSvg(window.svgData.data)
                # ### MODIFIED GENERATION OF SVG ### #

                # window.store = draw.svg(rawSvg)
                window.resetCollection()
                
            error :(response)->
                @region =  new Marionette.Region el : '#noFound-template'
                new CommonFloor.ProjectCtrl region : @region

    #api required to load svg data based on image
    window.loadOjectData = ()->

        $.ajax
            type : 'GET',
            url  : BASEURL+'/admin/project/'+   PROJECTID+'/image/'+IMAGEID
            async : false
            success :(response)->

                window.svgData = {}
                window.svgData['image'] = svgImg
                window.svgData['data'] = response.data
                window.svgData['supported_types'] = JSON.parse supported_types
                window.loadJSONData()
                

                
            error :(response)->
                alert('Some problem occurred')
        
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
        $('#aj-imp-builder-drag-drop canvas').hide()
        $('#aj-imp-builder-drag-drop svg').show()
        $('.edit-box').addClass 'hidden'
        canvas = document.getElementById("c")
        ctx= canvas.getContext("2d")
        ctx.clearRect( 0 , 0 , canvas.width, canvas.height )
    
    
    window.saveUnit = ()->
        myObject  = {}
        details = {}

        if window.canvas_type is "concentricMarker" 
            myObject['points'] =  window.markerPoints
            details['cx'] = window.cx
            details['cy'] = window.cy
            details['innerRadius'] = window.innerRadius
            details['outerRadius'] = window.outerRadius
            details['marker_type'] = 'concentric'
            myObject['canvas_type'] =  'marker'

        else if window.canvas_type is "solidMarker" 
            myObject['points'] =  window.markerPoints
            details['cx'] = window.cx
            details['cy'] = window.cy
            details['innerRadius'] = window.innerRadius
            details['outerRadius'] = window.outerRadius
            details['marker_type'] = 'solid'
            myObject['canvas_type'] = 'marker'

        else
            myObject['points'] =  $('.area').val().split(',')
            details['class'] = 'layer '+$('.property_type').val()
            myObject['canvas_type'] =  window.canvas_type

                    
        myObject['image_id'] = IMAGEID
        myObject['object_id'] = $('.units').val()
        myObject['object_type'] =  $('.property_type').val()
        myObject['other_details'] =  details
        # myObject['id'] =  $('.units').val()

        console.log myObject
        $.ajax
            type : 'POST',
            headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
            url  : BASEURL+'/admin/project/'+   PROJECTID+'/svg-tool'
            async : false
            data : $.param myObject 
            success :(response)->

                value =  $('.area').val().split(',')
                $('#Layer_1').remove()
                # details = {}
                # details['class'] = 'layer '+$('.property_type').val()
                # childEle = {} 
                # childEle['id'] = $('.units').val()
                # childEle['name'] = $(".units option:selected").text()
                # childEle['object_type'] = $('.property_type').val()
                # childEle['points'] = value
                # childEle['other_details'] = details
                # childEle['canvas_type'] = window.canvas_type
                $(".toggle").trigger 'click'
        
                window.svgData.data.push myObject
                window.renderSVG()
                
            error :(response)->
                alert('Some problem occurred')


    window.loadForm = (type)->
        if type is 'villa'
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

    window.drawDefaultMarker=(markerType)   ->
        drawMarkerElements = []
        window.markerPoints = [window.cx,window.cy]
        # draw marker group
        groupMarker = draw.group() 

        switch markerType
          when 'concentric'
            window.canvas_type = "concentricMarker"
            groupMarker.attr
                class: 'concentric-marker-grp'            
            circle1 = draw.circle(window.innerRadius)
            circle1.attr
                fill: '#FF8500'
                cx: window.cx
                cy: window.cy

            circle2 = draw.circle(window.outerRadius)
            
            circle2.attr
                fill: 'none'
                cx: window.cx
                cy: window.cy
                stroke: "#FF7900"
                'stroke-width':4 
                'stroke-miterlimit':10

            drawMarkerElements.push circle1
            drawMarkerElements.push circle2

            break
                
          when 'solid'
            window.canvas_type = "solidMarker"
            groupMarker.attr
                class: 'solid-marker-grp'             
            circle = draw.circle(15.002)
            circle.attr
                fill: '#F7931E'
                cx: "630.101"
                cy: "362.245"

            drawMarkerElements.push circle

            break           

          when 'location'
            groupMarker.attr
                class: 'location-marker-grp'             
            path = draw.path('M1087.492,428.966c0,7.208-13.052,24.276-13.052,24.276s-13.052-17.067-13.052-24.276
            c0-7.208,5.844-13.051,13.052-13.051S1087.492,421.758,1087.492,428.966z')

            path.attr
                fill: '#F7931E'
            drawMarkerElements.push path     
            
            circle = draw.circle(15.002)
            circle.attr
                fill: '#FFFFFF'
                cx: "1074.44"
                cy: "427.187"

            drawMarkerElements.push circle

    
     
        _.each drawMarkerElements, (markerElement, key) =>
            groupMarker.add(markerElement)
        
        groupMarker.draggable()

        groupMarker.dragend =(delta, event) ->
            # cx,cy constants for circles
            oldX = window.cx
            oldY =  window.cy

            tx = delta.x
            ty = delta.y

            newX = oldX + tx
            newY = oldY + ty
            newpoints = [newX,newY] 
            window.markerPoints = newpoints 
   


    ########################### FUNCTIONS ENDS ###########################  
        
    window.loadOjectData()

    ########################### EVENTS BEGIN ###########################
    # on canvas creation hide canvas and show svg
    $('#aj-imp-builder-drag-drop canvas').ready ->
        $('#aj-imp-builder-drag-drop canvas').hide()
        $('#aj-imp-builder-drag-drop .svg-draw-clear').hide()
    
    # toggle toolbox menu
    $(".toggle").click( ()->
        $(this).toggleClass("expanded");
        $('.menu').toggleClass('open');
     
    )

    # show marker options
    $('[rel=\'popover\']').popover(
        html: 'true'
        content: '<div id="popOverBox">
                    <ul class="list-inline">
                        <li><div class="marker-elem marker1 concentric-marker"></div></li>
                        <li><div class="marker-elem marker2 solid-marker"></div></li>
                        <!--li><div class="marker-elem marker3 location-marker"></div></li-->
                    </ul>
                  </div>')
        .parent().on 'click', '#popOverBox .marker-elem',(evt) ->
            currentElem = evt.currentTarget
            if $(currentElem).hasClass('concentric-marker')
                markerType = "concentric"
            else if $(currentElem).hasClass('solid-marker')
                markerType = "solid"
            else if $(currentElem).hasClass('location-marker')
                markerType = "location" 


            $('#aj-imp-builder-drag-drop canvas').hide()
            $('#aj-imp-builder-drag-drop svg').first().css("position","relative")
            $('.edit-box').removeClass 'hidden'

            window.drawDefaultMarker(markerType)            
            


    # on polygon selection
    $('.select-polygon').on 'click', (e) ->
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


    # on double click of existing marked polygon(villa or plot) open canvas mode
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
                if parseInt(element) is parseInt svgDataObject.object_id
                    points = svgDataObject.points
                    $('.area').val points.join(',')
                    # collection = new Backbone.Collection window.svgData.data
                    # collection.remove element
                    # window.svgData.data =  collection.toArray()
                    drawPoly(points)
                    $('.submit').addClass 'hidden'
                    $('.edit').removeClass 'hidden'
                    $('.delete').removeClass 'hidden'
                    window.loadForm(classElem)
                    window.showDetails(currentElem)
                            
    
    $('svg').on 'dblclick', '.marker-grp' , (e) ->
        draggableElem = ""
        elemId =  $(e.currentTarget).attr('id')
        currentSvgElem = $(e.currentTarget)
        
        draw.each ((i, children) ->
          childId = @attr('id')
          if parseInt(childId) is parseInt(elemId)
              @draggable()
              draggableElem = @
              return
          
        ), true 

        # set new marker points
        draggableChildCircle = draggableElem.first()
        cx = draggableChildCircle.attr('cx')
        cy = draggableChildCircle.attr('cy')
        window.markerPoints = [cx,cy]

        # set canvas_type
        if draggableElem.hasClass('concentric')
            window.canvas_type = 'concentricMarker'
        else if draggableElem.hasClass('solid')
            window.canvas_type = 'solidMarker'
        
        draggableElem.dragend = (delta, event) ->
            # cx,cy constants for circles
            oldX = window.cx
            oldY =  window.cy

            tx = delta.x
            ty = delta.y

            newX = oldX + tx
            newY = oldY + ty
            newpoints = [newX,newY] 
            window.markerPoints = newpoints 


        currentElem = e.currentTarget
            
        # show edit form
        $('.edit-box').removeClass 'hidden'
        classElem = $(currentElem).attr('type')
        $('.submit').addClass 'hidden'
        $('.edit').removeClass 'hidden'
        $('.delete').removeClass 'hidden'
        window.loadForm(classElem)  
        
        # populate form
        window.showDetails(currentElem)         
        


    # save svg eleement with unit data
    $('.submit').on 'click', (e) ->

        if $('.property_type').val() == ""
            $('.alert').text 'Unit not assigned'
            window.hideAlert()
            return false
        
        if  $('.units').val() == ""
            $('.alert').text 'Unit not assigned'
            window.hideAlert()
            return false
        if  ($('.area').val()  == "") and (window.canvas_type is "polygon")
            $('.alert').text 'Coordinates not marked'
            window.hideAlert()
            return false
        if  (window.markerPoints.length<1) and (window.canvas_type isnt "polygon")
            $('.alert').text 'Coordinates not marked'
            window.hideAlert()
            return false        
        if window.coord == 1
            $('.alert').text 'Already assigned'
            window.hideAlert()
            return false
        window.saveUnit()
    
    # edit svg eleement with unit data  
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
        myObject['id'] =  $('.units').val()
        myObject['_method'] =  'PUT'
        $.ajax
            type : 'POST',
            headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
            url  : BASEURL+'/admin/project/'+   PROJECTID+'/svg-tool/'+myObject['object_id'] 
            async : false
            data : $.param myObject 
            success :(response)->

                value =  $('.area').val().split(',')
                $('#Layer_1').remove()
                $.each window.svgData.data,(index,value)->
                    if parseInt(value.object_id) == parseInt($('.units').val())
                        window.svgData.data.splice(index,1)
                        # delete window.svgData.data[index]
                console.log window.svgData.data
                window.svgData.data.push myObject
                console.log window.svgData.data
                window.renderSVG()
                
                

                
            error :(response)->
                alert('Some problem occurred')  
        

    $('.property_type').on 'change', (e) ->
        type = $(e.target).val()
        window.loadForm(type)


    # clear canvas button
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

    # on click of close form 
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

        # search for all svg elemnts and keep them fixed
        draw.each ((i, children) ->
            @draggable()
            @fixed()
        ), true         

    # on click of delete svg element
    $('.delete').on 'click' , (e)->
        myObject  = {}
        myObject['_method'] =  'DELETE'
        id = $('.units').val()
        $.ajax
            type : 'POST',
            headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
            url  : BASEURL+'/admin/project/'+   PROJECTID+'/svg-tool/'+id
            async : false
            data : $.param myObject 
            success :(response)->

                value =  $('.area').val().split(',')
                $('#Layer_1').remove()
                $.each window.svgData.data,(index,value)->
                    if parseInt(value.object_id) == parseInt($('.units').val())
                        console.log index
                        window.svgData.data.splice(index,1)
                        # delete window.svgData.data[index]
                console.log window.svgData.data
                window.renderSVG()
                unit = unitMasterCollection.findWhere
                        'id' : parseInt id
                unitCollection.add unit
                
                

                
            error :(response)->
                alert('Some problem occurred')  


    # on click of publish
    $('.btn-publish-svg').on 'click' , (e)->
        e.preventDefault()  
        svgExport = draw.exportSvg(
          exclude: ->
            @data 'exclude'
          whitespace: false)
        console.log svgExport
   
    # $('#save-svg-elem').on 'click', (e) ->
    #   console.log "click save-svg-elem"
    #   newCoordinates = $('.area').val()
    #   newPoints = newCoordinates.split(',').map((point) ->
    #     parseInt point, 10
    #   )

    #   editedElemTypeId = $("input[name=svg-element-id]").val()
    #   newSvgData = svgData
    #   _.each svgData.data, (svgDataObject, key) =>
    #       if svgDataObject.id is parseInt(editedElemTypeId)
    #           # change global svg data with new points
    #           newSvgData['data'][key]['points'] = newPoints
    #           window.svgData = newSvgData

    #           # regenerate newly modified svg element


    #   $('#aj-imp-builder-drag-drop canvas').hide()
    #   $('#aj-imp-builder-drag-drop svg').first().css("position","relative")
    #   $("input[name=svg-element-id]").val("") 
    #   $(".area").val("")                  
        
                





    
        


            

    
  

     





    
   
