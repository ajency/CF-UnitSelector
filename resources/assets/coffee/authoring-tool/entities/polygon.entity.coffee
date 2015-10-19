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
        console.log item.other_details.class
        @pointList = []
        @createPolgyon()
        @points(item.points)
        @attribute('class',item.other_details.class)
        @attribute('id',item.object_id)
        @attribute('type',item.object_type)
        @node

    generatePolygonTag:(item)->
        pointList = @getPointList(item.points)
        pointList = pointList.join(' ')
        
        polygon = draw.polygon(pointList)

        # add polygon class
        polygon.attr
            'class': item.other_details.class
            'id': item.object_id
            'type': item.object_type
            svgid:  item.id 

        # add additional class to identify shape
        polygon.addClass('polygon-type')
        polygon.addClass(item.object_type+item.object_id)

        # set data attrib for primary breakpoint, if set
        if item.primary_breakpoint isnt null
            polygon.data('primary-breakpoint', item.primary_breakpoint)

        #set data attributes for title and description if object type is amenity
        if item.object_type is "amenity"
            polygon.data('amenity-title', item.other_details.title)
            polygon.data('amenity-desc', item.other_details.description)            
        
        

        
    getPointList:(pointsArr)->
        pointList = []

        i= 0
        l = pointsArr.length
        while i < l
            pointList.push([parseInt(pointsArr[i]),parseInt(pointsArr[i+1])])
            i+=2
        
        formattedPoints = []
        k= 0
        len = pointList.length
        
        while k< len
            formattedPoints.push(pointList[k].join())
            k++

        return formattedPoints


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

    
