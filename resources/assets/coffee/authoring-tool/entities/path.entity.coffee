#Functions of a polygon object
#1.Draw a polygon using svgjs
#2.Function to make polygon draggable
#event handler functions
#3.Function to duplicate a polygon

#model for Path
class Path extends Backbone.Model

    initialize:->
        @node = ""
        @pointList = []

    generatePathTag:(item)->
        points = item.points
        group = draw.group() 
        path = group.path(points)

        # add path class
        path.attr
            'class': item.other_details.class
            'id': item.object_id
            'type': item.object_type
            svgid:  item.id 

        # add additional class to identify shape
        path.addClass('path-type')
        path.addClass(item.object_type+item.object_id)

        # set data attrib for primary breakpoint, if set
        if item.primary_breakpoint isnt null
            path.data('primary-breakpoint', item.primary_breakpoint)

        #set data attributes for title and description if object type is amenity
        if item.object_type is "amenity"
            path.data('amenity-title', item.other_details.title)
            path.data('amenity-desc', item.other_details.description)            
        
        
window.path = new Path

    
