#FloorLayout model and FloorLayout collection Definition
class FloorLayout extends Backbone.Model


	




class FloorLayoutCollection extends Backbone.Collection

	model : FloorLayout
	
	#set the attributes of a FloorLayout model
	setFloorLayoutAttributes:(data)->

		floorLayoutCollection.reset data

window.floorLayoutCollection  = new FloorLayoutCollection
