#functions of a marker
#1.create a marker using svgs
#2.Function to make polygon draggable
#event handler functions



class Marker extends Backbone.Model

    generateMarkerTag:(item)->
        # get marker type
        markerType = item.other_details.marker_type
        cx = item.other_details.cx
        cy = item.other_details.cy
        innerRadius = item.other_details.innerRadius
        outerRadius = item.other_details.outerRadius
        points = item.points

        drawMarkerElements = []
        
        # draw marker group
        groupMarker = draw.group()
        groupMarker.attr
            class: 'marker-grp'
            type: item.object_type 
            id:  item.object_id           

        switch markerType
          when 'concentric'
            # add class based on marker type 
            groupMarker.addClass('concentric')

            circle1 = draw.circle(innerRadius)
            circle1.attr
                fill: '#FF8500'
                cx: points[0]
                cy: points[1]

            circle2 = draw.circle(outerRadius)
            
            circle2.attr
                fill: 'none'
                cx: points[0]
                cy: points[1]
                stroke: "#FF7900"
                'stroke-width':4 
                'stroke-miterlimit':10

            drawMarkerElements.push circle1
            drawMarkerElements.push circle2

            break
                
          when 'solid'
            window.canvas_type = "solidMarker"
 
            # add class based on marker type 
            groupMarker.addClass('solid')

            circle = draw.circle(outerRadius)
            circle.attr
                fill: '#F7931E'
                cx: points[0]
                cy: points[1]

            drawMarkerElements.push circle
            break

        _.each drawMarkerElements, (markerElement, key) =>
            groupMarker.add(markerElement)            

           

window.marker = new Marker