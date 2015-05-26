class AuthoringTool.SvgLayoutView extends Marionette.LayoutView

	template : '#main-template'

	

#starting point:Controller is executed which contains the logic to get the details
class AuthoringTool.SvgAuthoringCtrl extends Marionette.RegionController

	initialize:->
		@show new AuthoringTool.SvgLayoutView
				


class AuthoringTool.TopView extends Marionette.ItemView

	template : '#topregion'

	onShow:->
		types = Marionette.getOption(@,'types')
		window.showPendingObjects(types)
		

class AuthoringTool.TopCtrl extends Marionette.RegionController
			
	initialize:->
		types = window.getPendingObjects(window.svgData) 
		@show new AuthoringTool.TopView
				'types' : types


class AuthoringTool.CenterView extends Marionette.ItemView

	template : '#centerregion'

	ui :
		marked : '.marked'

	events :
		'dblclick @ui.marked':(e)->
			$('#aj-imp-builder-drag-drop canvas').show()
			$('#aj-imp-builder-drag-drop .svg-draw-clear').show()
			$('#aj-imp-builder-drag-drop svg').first().css("position","absolute")
			currentElem = e.currentTarget
			svgDataObjects = svgData.data
			_.each svgDataObjects, (svgDataObject, key) =>
				elemTypeId = $(currentElem).attr("type-id")
				if parseInt(elemTypeId) is svgDataObject.id
					points = svgDataObject.points
					drawPoly(points)
					$("input[name=svg-element-id]").val(svgDataObject.id)



	onShow:->
		console.log $('.area')	
		$('.area').canvasAreaDraw()
		# window.draw = SVG('aj-imp-builder-drag-drop')
		# svgData = Marionette.getOption(@,'svgData')
		# draw.svg svgData
		# $('#aj-imp-builder-drag-drop canvas').ready ->
		# 	$('#aj-imp-builder-drag-drop canvas').hide()
		# 	$('#aj-imp-builder-drag-drop .svg-draw-clear').hide()
		# @loadZoom()

	loadZoom:->
		$('#aj-imp-builder-drag-drop').panzoom({
                contain: 'invert',
                minScale: 1,
                maxScale: 2.4,
                increment: 0.4,
                $zoomIn: $('.zoom-in'),
                $zoomOut: $('.zoom-out')

            })
		


class AuthoringTool.CenterCtrl extends Marionette.RegionController
			
	initialize:->
		window.createSvg(window.svgData.data)
		s = new XMLSerializer()
		str = s.serializeToString(rawSvg)
		@show new AuthoringTool.CenterView
				'svgData' : str
		
			

	
  

	 





	
   
