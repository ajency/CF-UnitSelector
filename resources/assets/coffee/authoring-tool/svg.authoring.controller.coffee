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

    # add svg-off class to disable keep image fixed in the div else it moves
    $('.svg-canvas').addClass('svg-off')
    $('.area').canvasAreaDraw()

    ########################### GLOBALS BEGIN ###########################
    window.draw = SVG('aj-imp-builder-drag-drop')
    
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
    window.ellipseWidth = 360
    window.ellipseHeight = 160
    window.markerPoints = [window.cx,window.cx] #default value
    window.locationMarkerPoints = [window.cx,window.cx] #default value
    window.dropLocationMarker = false

    window.windowWidth = 0
    window.EDITMODE = false
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
        rawSvg.setAttribute('preserveAspectRatio','"xMinYMin slice"')
        
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
        # draw.viewbox(0, 0, 1600, 800)
        # create svg background image, set exclude data attrib to true so it can be excluded while exporting the svg

        draw.image(svgImg).data('exclude', true)

        # for each svg data check canvas type and generate elements accordingly
        $.each svgData,(index,value)->
            if value.canvas_type is 'polygon'
                window.polygon.generatePolygonTag(value)

            if value.canvas_type is 'marker'
                window.marker.generateMarkerTag(value)   

        draw.attr('preserveAspectRatio', "xMinYMin slice")   


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
        if value == 'plot'
            units = plotVariantCollection.getPlotMasterUnits()
        if value == 'building'
            units = buildingMasterCollection.toArray()
         if value == 'apartment'
            units = apartmentVariantCollection.getApartmentMasterUnits()
            temp = new Backbone.Collection units
            newUnits = temp.where
                    'building_id' : parseInt building_id
            units = newUnits

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
            if svg_type is 'google_earth' && value is 'Project' 
                return
            valueText = value
            valuetemp = value
            console.log value
            if value is "Apartment/Penthouse"
                valueText = "apartment"
                valuetemp = 'apartment'
            
            $('<option />', {value: valuetemp.toLowerCase(), text: value.toUpperCase()}).appendTo(select)
        $('<option />', {value: 'unassign', text: ('Unassign').toUpperCase()}).appendTo(select)

    window.resetCollection = ()->
        $('.polygon-type,.marker-grp').each (index,value)->
            type =  $(value).attr 'type'
            if type is 'building'
                bldgId = parseInt value.id
                bldg = buildingCollection.findWhere
                        'id' : bldgId

                buildingCollection.remove bldg   

            else if type is 'unassign'       
                return      
            else 
                console.log unitID = parseInt value.id
                if unitID isnt 0
                    console.log unit = unitMasterCollection.findWhere
                            'id' : parseInt value.id

                    unitCollection.remove unit.get 'id'

    window.iniTooltip = ()->
        $('.amenity').tooltipster(
            theme: 'tooltipster-shadow'
            contentAsHTML: true
            onlyOne : true
            arrow : false
            offsetX : 50
            offsetY : -10
            interactive : true
            # animation : 'grow'
            trigger: 'hover'

        )


    #api required to load data
    window.loadJSONData = ()->

        $.ajax
            type : 'GET',
            url  : BASERESTURL+'/project/'+ PROJECTID+'/project-details'
            async : false
            success :(response)->

                #parsing the integer fields 
                response = response.data

                bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants)

                unitTypeCollection.setUnitTypeAttributes(response.unit_types)

                buildingCollection.setBuildingAttributes(response.buildings)

                apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants)

                window.propertyTypes = response.property_types

                plotVariantCollection.setPlotVariantAttributes(response.plot_variants)

                unitCollection.setUnitAttributes(response.units)

                # #### CODE TO GENERATE SVG THROUGH RAW SVG STRING COMMENTED #### #
                # window.createSvg(window.svgData.data)
                # s = new XMLSerializer()
                # str = s.serializeToString(rawSvg)
                # draw.svg(str)
                # #### CODE TO GENERATE SVG THROUGH RAW SVG STRING COMMENTED #### #

                window.generatePropTypes()

                types = window.getPendingObjects(window.svgData)

                window.showPendingObjects(types)
                window.iniTooltip()
                # ### MODIFIED GENERATION OF SVG ### #
                window.generateSvg(window.svgData.data)
                # ### MODIFIED GENERATION OF SVG ### #

                # window.store = draw.svg(rawSvg)

                window.resetCollection()
                
            error :(response)->
                alert('Some problem occurred')

    window.loadSVGData = () ->

        $.ajax
            type : 'GET',
            url  : BASEURL+'/admin/project/'+   PROJECTID+'/image/'+IMAGEID
            async : false
            success :(response)->

                window.svgData = {}
                window.svgData['image'] = svgImg
                window.svgData['data'] = response.data
                window.svgData['supported_types'] = JSON.parse supported_types
                window.svgData['breakpoint_position'] = breakpoint_position
                window.svgData['svg_type'] = svg_type
                window.svgData['building_id'] = building_id
                window.svgData['project_id'] = project_id

                types = window.getPendingObjects(window.svgData)

                window.showPendingObjects(types)
                window.generateSvg(window.svgData.data)
               
               
                
            error :(response)->
                alert('Some problem occurred')


    window.loadSvgPaths = ()->
        select = $('.svgPaths')
        $('<option />', {value: "", text: "Select Option"}).appendTo(select)
        svgs = jQuery.parseJSON(svg_paths)
        svgs = _.omit(svgs, image_id);
        $.each svgs,(index,value) ->
            if value == ""
                svgs = _.omit(svgs, index);
        svgCount = Object.keys(svgs).length
        if svgCount is 0 
            select.hide()
            $('.duplicate').hide()
            return 
        
        building_name = buildingMasterCollection.findWhere
                        'id' : parseInt building_id
        if parseInt(building_id) isnt 0 
            $.each svgs , (index,value)->
                svg_name_arr = value.split('/')
                svg_name = svg_name_arr[parseInt(svg_name_arr.length) - 1]
                $('<option />', {value: index, text: building_name.get('building_name')+'-'+svg_name}).appendTo(select)  
            return
        
        $.each svgs , (index,value)->
            svg_name_arr = value.split('/')
            svg_name = svg_name_arr[parseInt(svg_name_arr.length) - 1]
            $('<option />', {value: index, text: svg_name}).appendTo(select)

       


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
                window.svgData['breakpoint_position'] = breakpoint_position
                window.svgData['svg_type'] = svg_type
                window.svgData['building_id'] = building_id
                window.svgData['project_id'] = project_id
                window.loadJSONData()
                $('.duplicate').hide()
               
                if response.data.length is 0
                    $('.duplicate').show()
                    window.loadSvgPaths()
                

                
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

    window.resetTool =()->
        window.resetCollection()
        window.EDITMODE = false
        # $(".toggle").trigger 'click'        
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
        $('#aj-imp-builder-drag-drop svg').first().css("position","absolute")      
    
    window.saveUnit = ()->
        myObject  = {}
        details = {}

        objectType =  $('.property_type').val()
        
        myObject['image_id'] = IMAGEID
        myObject['object_type'] =  objectType
        myObject['canvas_type'] =  window.canvas_type
        myObject['breakpoint_position'] =  window.breakpoint_position

        # amenity v/s other unit types
        if objectType is "amenity"
            myObject['object_id'] = 0
        else if objectType is "project"
            myObject['object_id'] = project_id
            if window.dropLocationMarker is true
                locationPoints = window.locationMarkerPoints
                details['location_marker_x'] = locationPoints[0]
                details['location_marker_y'] = locationPoints[1]
                details['location_marker_class'] = 'marker'

            
        else
            myObject['object_id'] = $('.units').val()


        if myObject['object_type'] is "amenity"
            details['title'] = $('#amenity-title').val()
            details['description'] = $('#amenity-description').val()
            details['class'] = $('.property_type').val() #remove layer class for amenity
        else if  myObject['object_type'] is "project"
           details['class'] = 'step1-marker' 
        else 
            type = $('.property_type').val()  
            # if  $('.property_type').val() is 'apartment/penthouse'
            #     type = 'apartment'

            details['class'] = 'layer '+type        
        
        # canvas_type differences i.e markers vs polygons
        if window.canvas_type is "concentricMarker" 
            myObject['points'] =  window.markerPoints
            myObject['canvas_type'] =  'marker'
            details['cx'] = window.cx
            details['cy'] = window.cy
            details['innerRadius'] = window.innerRadius
            details['outerRadius'] = window.outerRadius
            details['marker_type'] = 'concentric'

        else if window.canvas_type is "solidMarker" 
            myObject['points'] =  window.markerPoints
            myObject['canvas_type'] = 'marker'
            details['cx'] = window.cx
            details['cy'] = window.cy
            details['innerRadius'] = window.innerRadius
            details['outerRadius'] = window.outerRadius
            details['marker_type'] = 'solid'
        else if window.canvas_type is "earthlocationMarker" 
            myObject['points'] =  window.markerPoints
            myObject['canvas_type'] = 'marker'
            details['cx'] = window.cx
            details['cy'] = window.cy
            details['ellipseWidth'] = window.ellipseWidth
            details['ellipseHeight'] = window.ellipseHeight
            details['marker_type'] = 'earthlocation'            

        else
            myObject['points'] =  $('.area').val().split(',')

        myObject['other_details'] =  details 

        if $('[name="check_primary"]').is(":checked") is true
            myObject['primary_breakpoint'] =  window.breakpoint_position
             

        $.ajax
            type : 'POST',
            headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
            url  : BASEURL+'/admin/project/'+   PROJECTID+'/svg-tool'
            async : false
            data : $.param myObject 
            success :(response)->
                myObject['id'] = response.data.id

                if response.data.primary_breakpoint isnt null
                    myObject['primary_breakpoint'] = response.data.primary_breakpoint

                if svg_type is "google_earth"
                    window.is_project_marked = true
                
                
                window.svgData.data.push myObject

                # clear svg 
                draw.clear()

                types = window.getPendingObjects(window.svgData)

                window.showPendingObjects(types)
                # re-generate svg with new svg element
                window.generateSvg(window.svgData.data)

                window.resetTool()   
                $('.toggle').bind('click')       
                
            error :(response)->
                alert('Some problem occurred')

    window.loadForm = (type)->
        propType = $('.property_type').val()
        if (propType is 'project') and (window.is_project_marked)
            $('.submit').attr 'disabled' ,  true
        else 
            $('.submit').attr 'disabled' ,  false

        @region =  new Marionette.Region el : '#dynamice-region'        
        
        if type is 'villa'
            new AuthoringTool.VillaCtrl region : @region

        if type is 'plot'
            new AuthoringTool.PlotCtrl region : @region

        if type is 'amenity'
            new AuthoringTool.AmenityCtrl region : @region

        if type is 'apartment'
            new AuthoringTool.ApartmentCtrl 
                'region' : @region

        if type is 'building'
            new AuthoringTool.BuildingCtrl 
                'region' : @region

        if type is 'project'
            new AuthoringTool.ProjectCtrl 
                'region' : @region
                'property' : project_data 

         if type is 'unassign'
           $('#dynamice-region').empty()



    window.showDetails = (elem)->
        type = $(elem).attr 'type'
        if type != 'unassign' && type != 'undetect'

            if type is 'building'
                unit = buildingMasterCollection.findWhere
                    'id' : parseInt elem.id
            else
                unit = unitMasterCollection.findWhere
                        'id' : parseInt elem.id
            $('.property_type').val $(elem).attr 'type'
            $('.property_type').attr 'disabled' ,  true
            select = $('.units')
            $('<option />', {value: elem.id, text: unit.get('unit_name')}).appendTo(select)
            $('.units').attr 'disabled' ,  true
            $('.units').val elem.id
            $('.units').show()

        else
            $("form").trigger("reset")
            $('.edit').removeClass 'hidden'
            $('.delete').removeClass 'hidden'
            $('.submit').addClass 'hidden'  
            $('.property_type').attr 'disabled' ,  false 
            $('.property_type').val('unassign') 

    window.loadProjectForm =->
        if window.canvas_type is "earthlocationMarker"
            select = $('.property_type')
            $('<option />', {value: 'project', text: s.capitalize('project')}).appendTo(select)
        $('.property_type').val 'project'
        $('.property_type').attr 'disabled' ,  true 

        propType = $('.property_type').val()

        if (propType is 'project') and (window.is_project_marked)
            $('.submit').attr 'disabled' ,  true
        else 
            $('.submit').attr 'disabled' ,  false

        region =  new Marionette.Region el : '#dynamice-region'
        new AuthoringTool.ProjectCtrl 
            'region' : region
            'property' : project_data 
 
    window.hideAlert = ()->
        $('.alert').show()
        $('.alert-box').delay(3000).queue( (next)->
                $(this).hide('fade') 
                next() 
        )

    window.hideLabel = ()->
        $('.alert2').show()
        $('.alert2').delay(3000).queue( (next)->
                $(this).hide('fade') 
                next() 
        )

    window.buildSvgObjectData =()->
        myObject  = {}
        details = {}

        objectType =  $('.property_type').val()
        
        myObject['image_id'] = IMAGEID
        myObject['object_type'] =  objectType
        myObject['canvas_type'] =  window.canvas_type
        myObject['breakpoint_position'] =  window.breakpoint_position

        # amenity v/s other unit types
        if objectType is "amenity"
            myObject['object_id'] = 0
        else if objectType is "project"
            myObject['object_id'] = project_id
            if window.dropLocationMarker is true
                locationPoints = window.locationMarkerPoints
                details['location_marker_x'] = locationPoints[0]
                details['location_marker_y'] = locationPoints[1]
                details['location_marker_class'] = 'marker'
        else
            myObject['object_id'] = $('.units').val()


        if myObject['object_type'] is "amenity"
            details['title'] = $('#amenity-title').val()
            details['description'] = $('#amenity-description').val()
            details['class'] = $('.property_type').val()
        else if  myObject['object_type'] is "project"
           details['class'] = 'step1-marker' 
        else  
           details['class'] = 'layer '+$('.property_type').val()         
        
        # canvas_type differences i.e markers vs polygons
        if window.canvas_type is "concentricMarker" 
            myObject['points'] =  window.markerPoints
            myObject['canvas_type'] =  'marker'
            details['cx'] = window.cx
            details['cy'] = window.cy
            details['innerRadius'] = window.innerRadius
            details['outerRadius'] = window.outerRadius
            details['marker_type'] = 'concentric'

        else if window.canvas_type is "solidMarker" 
            myObject['points'] =  window.markerPoints
            myObject['canvas_type'] = 'marker'
            details['cx'] = window.cx
            details['cy'] = window.cy
            details['innerRadius'] = window.innerRadius
            details['outerRadius'] = window.outerRadius
            details['marker_type'] = 'solid'
        
        else if window.canvas_type is "earthlocationMarker" 
            myObject['points'] =  window.markerPoints
            myObject['canvas_type'] = 'marker'
            details['cx'] = window.cx
            details['cy'] = window.cy
            details['ellipseWidth'] = window.ellipseWidth
            details['ellipseHeight'] = window.ellipseHeight
            details['marker_type'] = 'earthlocation'            

        else
            myObject['points'] =  $('.area').val().split(',')

        myObject['other_details'] =  details 

        if $('[name="check_primary"]').is(":checked") is true
            myObject['primary_breakpoint'] =  window.breakpoint_position 
            

        return myObject 

    window.drawDefaultMarker=(markerType)   ->
        drawMarkerElements = []
        window.markerPoints = [window.cx,window.cy]
        groupLocation = ""
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
                cx: window.cx
                cy: window.cy 

            drawMarkerElements.push circle

            break 

          when 'location'
            groupLocation = draw.group()
            groupLocation.attr
                class: 'location-marker-grp'

            groupLocation.addClass('marker')
            polygon = draw.polygon('776.906,408.457 821.094,407 798.01,459.243')
            polygon.attr
                fill: '#F7931E'

            groupLocation.add(polygon) 

            ellipse = draw.ellipse(40,40)

            ellipse.attr
                'fill': '#FFFFFF'
                'stroke': '#F7931E'
                'stroke-width': 6
                'stroke-miterlimit' : 10
                cx:798.696
                cy:401.52

            drawDefaultMarker.add(ellipse) 
            groupLocation.draggable()

            groupLocation.dragend =(delta, event) ->
                # cx,cy constants for circles
                newDelta = [delta.x,delta.y] 
                window.locationMarkerPoints = newDelta
                 
            window.dropLocationMarker =  true
        
            break;

          when 'earthlocation'
            window.canvas_type = "earthlocationMarker"
            groupMarker.attr
                class: 'earth-location-marker-grp' 

            groupMarker.addClass('step1-marker')
            
            ellipse = draw.ellipse(window.ellipseWidth, window.ellipseHeight)

            ellipse.attr
                'fill': '#FF6700'
                'stroke': '#FF7300'
                'stroke-width':3
                'fill-opacity':0.2
                'stroke-miterlimit':10
                cx: window.cx
                cy: window.cy
 
            
            drawMarkerElements.push ellipse 

            # load default form
            window.loadProjectForm() 
        if window.canvas_type isnt 'earthlocationMarker' && svg_type is 'google_earth'
            $(".property_type").find("option[value='project']").remove()
            $('#dynamice-region').empty() 
        _.each drawMarkerElements, (markerElement, key) =>
            groupMarker.add(markerElement)
        
        groupMarker.draggable()

        groupMarker.dragend =(delta, event) ->
            # cx,cy constants for circles
            markerPts = window.markerPoints
            oldX = markerPts[0]
            oldY =  markerPts[1]

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

        # window.windowWidth = $(window).innerWidth()
        window.windowWidth = 1300

        $('canvas').css 'width', window.windowWidth
        $('canvas').css 'height', window.windowWidth / 2

        $('.svg-canvas').css 'width', window.windowWidth
        $('.svg-canvas').css 'height', window.windowWidth / 2

        document.addEventListener 'keydown', keydownFunc, false

    keydownFunc = (e) ->
      if e.which is 13
        if f.length > 0 
            $('.alert').text 'POLYGON IS NOW DRAGGABLE'
            window.hideAlert()
        else
            return
        $('#aj-imp-builder-drag-drop canvas').hide()
        $('#aj-imp-builder-drag-drop svg').show()
        object  = window.EDITOBJECT
        id = $(object).attr('svgid')
        $('.layer[svgid="'+id+'"]').hide()
        pointList = window.polygon.getPointList(f)
        pointList = pointList.join(' ')
        @polygon = draw.polygon(pointList)
        @polygon.addClass('polygon-temp')
        @polygon.data('exclude', true)
        @polygon.attr('fill', '#CC0000')
        # @polygon.attr('fill-opacity', 0.1)
        @polygon.draggable()

        @polygon.dragend = (delta, event) =>

            tx = delta.x
            ty = delta.y

            canvasPointsLength = window.f.length
            oldPoints = window.f
            newPoints = []
            i=0
            while i < canvasPointsLength
                newX = parseInt(oldPoints[i]) + tx
                newY = parseInt(oldPoints[i+1]) + ty
                newPoints.push(newX,newY)
                i+=2
            
            window.f = newPoints
            $('.area').val newPoints.join(',')

            # clear drawing from canvas and redraw
            canvas = document.getElementById("c")
            ctx= canvas.getContext("2d")
            ctx.clearRect( 0 , 0 , canvas.width, canvas.height ) 

            @polygon.fixed()
            @polygon.remove()
            
            $('#aj-imp-builder-drag-drop canvas').show()
            $('#aj-imp-builder-drag-drop .svg-draw-clear').show()
            $('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
            drawPoly(window.f)            

    
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
                        <li title="Amenities"><div class="marker-elem marker1 concentric-marker"></div></li>
                        <li title="Units"><div class="marker-elem marker2 solid-marker"></div></li>
                        <li class="google-earth-li hidden" title="Project Location"><div class="marker-elem marker3 earth-location-marker"></div></li>
                    </ul>
                  </div>')
        .parent().on 'click', '#popOverBox .marker-elem',(evt) ->
            window.EDITMODE = true
            currentElem = evt.currentTarget
            
            if $(currentElem).hasClass('concentric-marker')
                markerType = "concentric"
            else if $(currentElem).hasClass('solid-marker')
                markerType = "solid"
            else if $(currentElem).hasClass('earth-location-marker')
                markerType = "earthlocation" 
            else if $(currentElem).hasClass('location-marker')
                markerType = "location" 

            
            $('#aj-imp-builder-drag-drop canvas').hide()
            $('#aj-imp-builder-drag-drop svg').first().css("position","relative")
            $('.edit-box').removeClass 'hidden'
            $('.edit').addClass 'hidden'
            $('.delete').addClass 'hidden'
            $('.submit').removeClass 'hidden'  
            $('.property_type').attr 'disabled' ,  false          

            # hide marker options
            $('[rel=\'popover\']').popover('hide')

            window.drawDefaultMarker(markerType) 
            

    $('[rel=\'popover\']').on 'click' , (e) ->
        if svg_type is "google_earth"
            google_earth_li = $('.google-earth-li').removeClass('hidden')
            $('.popover-content').css("width","163px")
    # on polygon selection
    $('.select-polygon').on 'click', (e) ->
        e.preventDefault()
        window.EDITMODE = true
        window.canvas_type = "polygon"
        if window.canvas_type isnt 'earthlocationMarker' && svg_type is 'google_earth'
            $(".property_type").find("option[value='project']").remove()
            $('#dynamice-region').empty()
        $('#aj-imp-builder-drag-drop canvas').show()
        $('#aj-imp-builder-drag-drop .svg-draw-clear').show()
        $('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
        $('.edit-box').removeClass 'hidden'
        $('.edit').addClass 'hidden'
        $('.delete').addClass 'hidden'
        $('.submit').removeClass 'hidden'
        $('.property_type').attr 'disabled' ,  false

     
    # on ellipse selection
    $('.select-ellipse').on 'click', (e) -> 
        e.preventDefault()
        window.EDITMODE = true
        window.canvas_type = "ellipse" 


    # on double click of existing marked polygon(villa or plot) open canvas mode
    $('svg').on 'dblclick', '.polygon-type' , (e) ->
            e.preventDefault()
            window.EDITOBJECT = e.target
            window.canvas_type = "polygon"
            window.EDITMODE = true
            elemId =  $(e.currentTarget).attr('svgid')
            window.currentSvgId = parseInt elemId            
            
            $('#aj-imp-builder-drag-drop canvas').show()
            $('#aj-imp-builder-drag-drop .svg-draw-clear').show()
            $('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
            $('.edit-box').removeClass 'hidden'
            currentElem = e.currentTarget
            element = currentElem.id
            object_type = $(currentElem).attr('type')
            tmp = new Backbone.Collection svgData.data
            window.newObject = tmp.clone()
            svgDataObjects = svgData.data
            # drawPoly(["405","194","456","205","440","261"])

            _.each svgDataObjects, (svgDataObject, key) =>
                if parseInt(elemId) is parseInt svgDataObject.id 
                    valpoints = svgDataObject.points
                    $('.area').val valpoints.join(',')
                    drawPoly(valpoints)
                    $('.submit').addClass 'hidden'
                    $('.edit').removeClass 'hidden'
                    $('.delete').removeClass 'hidden'
                    
                    if object_type is "project"
                        # load default form
                        window.loadProjectForm()
                    else 
                        window.loadForm(object_type)


                    # show primary breakpoint checked or not
                    
                    if ! _.isNull $(currentElem).data("primary-breakpoint") 
                        $('[name="check_primary"]').prop('checked', true)                    

                    if object_type is "amenity"
                        $('#amenity-title').val $(currentElem).data("amenity-title")                        
                        $('#amenity-description').val $(currentElem).data("amenity-desc")
                        $('.property_type').val $(currentElem).attr 'type'
                        $('.property_type').attr 'disabled' ,  true                        

                    else
                        window.showDetails(currentElem)
    

    $('.zoom-in').on 'click' ,(e) ->
         $('.svg-canvas').removeClass('svg-off')

    
    $('svg').on 'dblclick', '.marker-grp' , (e) ->
        window.EDITMODE = true
        draggableElem = ""
        elemId =  $(e.currentTarget).attr('svgid')
        window.currentSvgId = parseInt elemId
        currentSvgElem = $(e.currentTarget)
        
        draw.each ((i, children) ->
          childId = @attr('svgid')
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
        else if draggableElem.hasClass('earthlocation')
            window.canvas_type = 'earthlocationMarker'
        
        draggableElem.dragend = (delta, event) ->
            # cx,cy constants for circles
            markerPts = window.markerPoints
            oldX = markerPts[0]
            oldY =  markerPts[1]

            tx = delta.x
            ty = delta.y

            newX = oldX + tx
            newY = oldY + ty
            newpoints = [newX,newY] 
            window.markerPoints = newpoints 


        currentElem = e.currentTarget
            
        # show edit form
        $('.edit-box').removeClass 'hidden'
        object_type = $(currentElem).attr('type')
        $('.submit').addClass 'hidden'
        $('.edit').removeClass 'hidden'
        $('.delete').removeClass 'hidden'
        
        if object_type is "project"
            # load default form
            window.loadProjectForm()
        else 
            window.loadForm(object_type)  

        # show primary breakpoint checked or not
        if $(currentElem).data("primary-breakpoint") 
            $('[name="check_primary"]').prop('checked', true)
        
        # populate form
        if object_type is "amenity"
            $('#amenity-title').val $(currentElem).data("amenity-title")                        
            $('#amenity-description').val $(currentElem).data("amenity-desc")                        
            $('.property_type').val $(currentElem).attr 'type'
            $('.property_type').attr 'disabled' ,  true            

        else
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

        propType = $('.property_type').val()
        if (propType is "amenity") and ($('#amenity-title').val() is "")
            $('.alert').text 'Amenity title not entered'
            window.hideAlert()
            return false
        
        window.saveUnit()
    
    # edit svg eleement with unit data  
    $('.edit').on 'click', (e) ->

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
        
        propType = $('.property_type').val()
        if (propType is "amenity") and ($('#amenity-title').val() is "")
            $('.alert').text 'Amenity title not entered'
            window.hideAlert()
            return false            

        myObject = window.buildSvgObjectData()
          
        # myObject['other_details'] =  details    
        myObject['_method'] =  'PUT'

        svgElemId = window.currentSvgId
        
        $.ajax
            type : 'POST',
            headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
            url  : "#{BASEURL}/admin/project/#{PROJECTID}/svg-tool/#{svgElemId}" 
            async : false
            data : $.param myObject 
            success :(response)->
                indexToSplice = -1
                $.each window.svgData.data,(index,value)->
                    if parseInt(value.id) is svgElemId
                        indexToSplice = index
                        
                window.svgData.data.splice(indexToSplice,1)
                myObject['id'] =  svgElemId
                window.svgData.data.push myObject
                # clear svg 
                draw.clear()
                types = window.getPendingObjects(window.svgData)

                window.showPendingObjects(types)
                # re-generate svg with new svg element
                window.generateSvg(window.svgData.data)
                window.resetTool()  
                              
   
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
        # $("form").trigger("reset")
        # $(".toggle").trigger 'click'
        # $('#dynamice-region').empty()
        # $('.edit-box').addClass 'hidden'

    window.setToggle = ()->
        $(".toggle").click( ()->
            $(".toggle").toggleClass("expanded");
            $('.menu').toggleClass('open');
         
        )



    # on click of close form 
    $('.closeform').on 'click' , (e)->
        $('.area').val("")
        window.f = []
        canvas = document.getElementById("c")
        ctx= canvas.getContext("2d")
        ctx.clearRect( 0 , 0 , canvas.width, canvas.height )
        $("form").trigger("reset")
        $('#dynamice-region').empty()
        # $(".toggle").trigger 'click'
        $('#aj-imp-builder-drag-drop canvas').hide()
        $('#aj-imp-builder-drag-drop svg').show()
        $('.edit-box').addClass 'hidden'
        # search for all svg elemnts and keep them fixed
        draw.each ((i, children) ->
            @draggable()
            @fixed()
        ), true 

        # clear svg
        draw.clear()
        # regenerate svg
        
        window.EDITMODE = false 
        window.loadSVGData()                  

    # on click of delete svg element
    $('.delete').on 'click' , (e)->
        myObject  = {}
        myObject['_method'] =  'DELETE'
        id = $('.units').val()
        svgElemId = window.currentSvgId
        $.ajax
            type : 'POST',
            headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
            url  : "#{BASEURL}/admin/project/#{PROJECTID}/svg-tool/#{svgElemId}"
            async : false
            data : $.param myObject 
            success :(response)->
                indexToSplice = -1
                obj_id_deleted = 0
                obj_type = ""
                $.each window.svgData.data,(index,value)->
                    if parseInt(value.id) is svgElemId
                        indexToSplice = index
                        obj_id_deleted = parseInt value.object_id
                        obj_type = value.object_type
                        
                window.svgData.data.splice(indexToSplice,1)
                myObject['id'] =  svgElemId

                if obj_id_deleted>0
                    if obj_type is "building"
                        bldg =   buildingCollection.findWhere
                                    'id' : obj_id_deleted
                        buildingCollection.bldg

                    else if obj_type is "project"
                        window.is_project_marked = false 
                    else 
                        unit = unitMasterCollection.findWhere
                                'id' : obj_id_deleted
                        unitCollection.add unit                        

                # clear svg 
                draw.clear()
                
                # re-generate svg with new svg element
                window.generateSvg(window.svgData.data)
                types = window.getPendingObjects(window.svgData)

                window.showPendingObjects(types)
                window.resetTool()
                # $(".toggle").bind('click')

                
                

                
            error :(response)->
                alert('Some problem occurred')  


    # on click of publish
    $('.btn-publish-svg').on 'click' , (e)->
        e.preventDefault() 

        # check edit mode status
        if window.EDITMODE is true
            $('.alert').text 'Please save svg elements before publish'
            window.hideAlert()
            return false

        # get svg tools viewbox height and width
        viewboxDefault = draw.viewbox()

        # add viewbox of same width and height at the time of publish
        draw.viewbox(0, 0, viewboxDefault.width, viewboxDefault.height) 
        
        # temporarily remove absolute position before exporting
        $('#aj-imp-builder-drag-drop svg').first().css("position","")
        svgExport = draw.exportSvg(
          exclude: ->
            @data 'exclude'
          whitespace: true)

        # restore absolute position after export
        $('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
        
        data = {}
        data['data'] = btoa(svgExport)
        data['svg_type'] = window.svgData.svg_type
        data['breakpoint_position'] = window.breakpoint_position 
        data['building'] = building_id 
        data['imgID'] = IMAGEID 

        # restore original viewbox
        draw.viewbox(0, 0, viewboxDefault.width, viewboxDefault.height)

        postUrl = "#{BASEURL}/admin/project/#{PROJECTID}/image/#{IMAGEID}/downloadSvg"

        publishSvgOptions = 
          type: 'POST'
          url: postUrl
          headers: { 'x-csrf-token' : $("meta[name='csrf-token']").attr('content')}
          data : data
          async: false

        $.ajax(publishSvgOptions)
            .done (resp, textStatus ,xhr) =>
                $('.alert').text 'SVG Published'
                window.hideAlert()

            .fail (xhr, textStatus, errorThrown) =>
                $('.alert').text 'Failed to publish SVG'
                window.hideAlert()


    $('svg').on 'contextmenu', '.polygon-type' , (e) ->
        e.preventDefault()
        $('.alert').text 'Polygon duplicated, drag to position'
        window.hideAlert()
        currentElem = e.currentTarget
        if /(^|\s)marker-grp(\s|$)/.test($(currentElem).attr("class"))
            return false
        newPoints = window.addPoints($(e.target).attr('points'))
        
        

        window.canvas_type = "polygon"
        # window.EDITMODE = true
        # $('#aj-imp-builder-drag-drop canvas').show()
        # $('#aj-imp-builder-drag-drop .svg-draw-clear').show()
        # $('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
        # $('.edit-box').removeClass 'hidden'
        pointList = window.polygon.getPointList(f)
        pointList = pointList.join(' ')
        @polygon = draw.polygon(pointList)
        @polygon.addClass('polygon-temp')
        @polygon.data('exclude', true)
        @polygon.attr('fill', '#CC0000')
        # @polygon.attr('fill-opacity', 0.1)
        @polygon.draggable()
        @polygon.dragend = (delta, event) =>

            tx = delta.x
            ty = delta.y

            canvasPointsLength = window.f.length
            oldPoints = window.f
            newPoints = []
            i=0
            while i < canvasPointsLength
                newX = parseInt(oldPoints[i]) + tx
                newY = parseInt(oldPoints[i+1]) + ty
                newPoints.push(newX,newY)
                i+=2
            
            window.f = newPoints
            $('.area').val newPoints.join(',')

            # clear drawing from canvas and redraw
            canvas = document.getElementById("c")
            ctx= canvas.getContext("2d")
            ctx.clearRect( 0 , 0 , canvas.width, canvas.height ) 

            @polygon.fixed()
            @polygon.remove()
            
            $('#aj-imp-builder-drag-drop canvas').show()
            $('#aj-imp-builder-drag-drop .svg-draw-clear').show()
            $('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
            $('.edit-box').removeClass 'hidden'
            $("form").trigger("reset")
            $('.edit').addClass 'hidden'
            $('.delete').addClass 'hidden'
            $('.submit').removeClass 'hidden'  
            $('.property_type').attr 'disabled' ,  false  
            drawPoly(window.f)
        # drawPoly(newPoints)

    window.addPoints = (points)->
        points = points.replace(/\s/g, ',')
        window.f = points.split(',')
        newPoints = []
        $.each window.f , (index,value)->
            newPoints.push parseInt(value) + 5

        newPoints

    # $('svg').on 'contextmenu', '.marker-grp' , (evt) ->
    #     evt.preventDefault()
    #     markerType = ''
    #     currentElem = evt.currentTarget
    #     if /(^|\s)concentric(\s|$)/.test($(currentElem).attr("class"))
    #         markerType = "concentric"
    #         window.canvas_type = markerType+'Marker'
    #     else if /(^|\s)solid(\s|$)/.test($(currentElem).attr("class"))
    #         markerType = "solid"
    #         window.canvas_type = markerType+'Marker'
    #     else if $(currentElem).hasClass('earth-location-marker')
    #         markerType = "earthlocation" 
    #         window.canvas_type = markerType+'Marker'
    #     else if $(currentElem).hasClass('location-marker')
    #         markerType = "location" 
    #         window.canvas_type = markerType+'Marker'

    #     window.drawDefaultMarker(markerType) 
    #     window.EDITMODE = true
    #     $('.edit-box').removeClass 'hidden'


    $('.duplicate').on 'click' , (evt) ->
       $('#myModal').modal()
       
    # window.removeAttr = (data)-> 
    #     $.each data , (index,value)->
    #             console.log value['other_details']
    #             value['other_details']['class'] = 'layer unassign'
    #             value['object_type'] = "undetect"
    #             value['object_id'] = 0
    #             value['svgid'] = 0
    #             value['svg_id'] = 0
    #             console.log value['other_details']
    #             delete value['primary_breakpoint']
    #             data[index] = value
    #      $.each data , (index,value)->
    #             value['id'] = 0
    #             data[index] = value
                
    #     data           

    $('.process').on 'click' , (evt) ->
        imageid = $('.svgPaths').val()
        if imageid is ""
            $('.alert2').text 'Please select an SVG!'
            window.hideLabel()
            return
        $('.svg-canvas').hide()
        $('#myModal').modal('hide')
        $('#rotate_loader').removeClass 'hidden'

       
       
        $.ajax
            type : 'GET',
            url  : BASEURL+'/admin/project/'+   PROJECTID+'/image/'+image_id+'/duplicate_image_id/'+imageid
            async : false
            success :(response)->
               # response = jQuery.parseJSON response.data
                window.svgData['data'] = response.data
                draw.clear()
                window.generateSvg(window.svgData.data)
                $('#rotate_loader').addClass 'hidden'
                $('.svg-canvas').show()
                $('.duplicate').hide()

                
                

                
            error :(response)->
                alert('Some problem occurred') 

    #     svgExport = draw.exportSvg(
    #       exclude: ->
    #         @data 'exclude'
    #       whitespace: true)

    #     $('.duplicateSVG').html svgExport
    #     $('.duplicateSVG .layer').each (index,value)->
    #         $('#'+value.id).attr('class' ,'layer unassign')
    #         $('#'+value.id).removeAttr('data-primary-breakpoint')
    #         $('#'+value.id).attr('type' ,'')
    #         $('#'+value.id).attr('svgid' ,0)
           
    #     $('.duplicateSVG .layer').each (index,value)->
    #         value.id = 0

    #     content = $('.duplicateSVG').html()

    $('.amenity').on 'mouseover' , (e) ->
        window.iniTooltip()
        html = '<div class="row">
                    <div class="col-sm-12 b-r">
                        <h4 class="text-warning margin-none">'+$(e.currentTarget).attr('data-amenity-title')+'</h4>
                        <h6 class="text-muted">'+$(e.currentTarget).attr('data-amenity-desc')+'</h6>
                    </div>
                </div>'
        $('.amenity').tooltipster('content', html)

   

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
        
                





    
        


            

    
  

     





    
   
