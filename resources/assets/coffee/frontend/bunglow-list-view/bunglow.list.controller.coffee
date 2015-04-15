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
class TopBunglowListView extends Marionette.ItemView

	template : Handlebars.Compile('<div></div>')

#controller for the Center region
class CommonFloor.CenterBunglowListCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBunglowListView 

