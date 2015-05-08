jQuery(document).ready ($)->
	
	window.canvas = new fabric.Canvas('c')
	
	$('.area').canvasAreaDraw()
	context = canvas.getContext("2d")
	j = $("#c")
	k = j[0].getContext("2d")
	img = new Image();
	img.onload = ()->
		j.css({
			background: "url(" + svgImg + ")"
		})
		m()
		
	img.src = svgImg





	
   
