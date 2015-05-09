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
	
	window.canvas = new fabric.Canvas('c')
	
	$('.area').canvasAreaDraw()
	console.log context = canvas.getContext("2d")
	j = $("#c")
	k = j[0].getContext("2d")
	img = new Image();
	img.onload = ()->
		j.css({
			background: "url(" + svgImg + ")"
		})
		m()
		
	img.src = svgImg

	window.canvas.on
		'touch:drag':()-> 
		    console.log "aaaaaaaaaa" 


	
  


	 





	
   
