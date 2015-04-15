class CommonFloor.BunglowListView extends Marionette.LayoutView

	template : '#project-view-template'

#starting point for List view for bunglows
class CommonFloor.BunglowListCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.BunglowListView 

#view for the top setion
class TopBunglowListView extends Marionette.ItemView

	template : Handlebars.Compile('<div></div>')

#controller for the top region
class CommonFloor.TopBunglowListCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBunglowListView 


#view for the Left setion
class LeftBunglowListView extends Marionette.ItemView

	template : Handlebars.Compile('<div></div>')

#controller for the Left region
class CommonFloor.LeftBunglowListCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftBunglowListView 

#view for the Center setion
class CenterBunglowListView extends Marionette.ItemView

	template : Handlebars.Compile('<div></div>')


#Composite view for the Center setion
class CenterCompositeView extends Marionette.CompositeView

	template : Handlebars.Compile('<div></div>')

	childView : CenterBunglowListView

#controller for the Center region
class CommonFloor.CenterBunglowListCtrl extends Marionette.RegionController

	initialize:->
		newUnits = CommonFloor.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@show new CenterCompositeView
			collection : unitsCollection
		

