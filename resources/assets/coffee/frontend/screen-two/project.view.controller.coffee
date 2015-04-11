class CommonFloor.BunglowLayoutView extends Marionette.LayoutView

	template : '#project-view-template'



class CommonFloor.BunglowMasterViewCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.checkProjectType()
		
		@show new CommonFloor.BunglowLayoutView


class TopBunglowView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
		  <div class="col-md-12 col-xs-12 col-sm-12">
			<div class="search-header-wrap">
			  <h1>We are now at Artha Zen\'s upcoming project having 50 villa\'s</h1>
			</div>
		  </div>
		</div>')


class CommonFloor.TopBunglowCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBunglowView

class LeftBunglowView extends Marionette.ItemView

	template : Handlebars.compile('
				
				
				<div class="blck-wrap">
				  <div class="row">
					<div class="col-sm-4">
					  <h6 class="available">V1002</h6>                      
					</div>
					<div class="col-sm-4">
					  <h6 class="">3BHK</h6>                      
					</div>
					<div class="col-sm-4">
					  <h6 class="">1460sqft</h6>                      
					</div>
				  </div>
				</div>
				')

class LeftBunglowCompositeView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
			<div class="filters-wrapper ">
				<div class="advncd-filter-wrp units"></div>
				</div>
				</div>')

	childView : LeftBunglowView

	childViewContainer : '.units'



class CommonFloor.LeftBunglowCtrl extends Marionette.RegionController

	initialize:->
		units = []
		newUnits = []
		bunglowVariantCollection.each (model)->
			bunglowUnits = unitCollection.where
				unit_variant_id : parseInt model.get('id')
			units.push  bunglowUnits
		newUnits = $.merge( newUnits, units )
		console.log unitsCollection = new Backbone.Collection newUnits 		
		@show new LeftBunglowCompositeView
			collection : unitsCollection


class CenterBunglowView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
			<div class="svg-area">
			  
			</div>
		  </div>')


	onShow:->
		path = project.get('project_master').front.svg
		$('<div></div>').load(path).appendTo('.svg-area')
	


class CommonFloor.CenterBunglowCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBunglowView
