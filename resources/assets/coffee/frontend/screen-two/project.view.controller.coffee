class CommonFloor.BunglowLayoutView extends Marionette.LayoutView

	template : '#project-view-template'



class CommonFloor.BunglowMasterViewCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID);
			CommonFloor.loadJSONData()
		
		@show new CommonFloor.BunglowLayoutView


class TopBunglowView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
		  <div class="col-md-12 col-xs-12 col-sm-12">
			<div class="search-header-wrap">
			  <h1>We are now at {{project_title}}\'s upcoming project having {{units}} bunglows</h1>
			</div>
		  </div>
		</div>')

	serializeData:->
		data = super()
		data.units = CommonFloor.getBunglowUnits().length
		data


class CommonFloor.TopBunglowCtrl extends Marionette.RegionController

	initialize:->
		@show new TopBunglowView
			model : project

class LeftBunglowView extends Marionette.ItemView

	template : Handlebars.compile('
				
				
				<div class="blck-wrap">
				  <div class="row">
					<div class="col-sm-4">
					  <h6 class="available">{{unit_name}}</h6>                      
					</div>
					<div class="col-sm-4">
					  <h6 class="">{{unit_type}}</h6>                      
					</div>
					<div class="col-sm-4">
					  <h6 class="">{{super_build_up_area}} sqft</h6>                      
					</div>
				  </div>
				</div>
				')

	serializeData:->
		data = super()
		console.log unitVariant = bunglowVariantCollection.findWhere
							'id' : @model.get('unit_variant_id')
		unitType = unitTypeCollection.findWhere
							'id' : unitVariant.get('id')
		data.unit_type = unitType.get('name')
		data.super_build_up_area = unitVariant.get('super_build_up_area')
		data

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
		newUnits = CommonFloor.getBunglowUnits()
		unitsCollection = new Backbone.Collection newUnits 		
		@show new LeftBunglowCompositeView
			collection : unitsCollection


class CenterBunglowView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
			<div class="svg-area">
			  
			</div>
			<div id="villa_info" class="svg-tooltip" role="tooltip">
		 <div class="svg-info">
		   
		 </div>
	  </div>
		  </div>')

	events :
		'mouseover .layer':(e)->
			id  = e.target.id
			unit = unitCollection.findWhere 
				id :  id
			unitVariant = bunglowVariantCollection.findWhere
								'id' :  unit.get('unit_variant_id')
			unitType = unitTypeCollection.findWhere
								'id' :  unit.get('id')
			html = ""
			html += '<h4 class="pull-left">'+unit.get('unit_name')+'</h4>
					<span class="label label-success">For Sale</span>
					<div class="clearfix"></div>
					<div class="details">
					<div>
						<label>Area</label> - '+unitVariant.get('super_build_up_area')+' Sq.ft
					</div> 
					<div>
						<label>Unit Type </label> - '+unitType.get('name')+'
					</div>  
					</div>'
					
			$('.svg-info').html html


	onShow:->
		path = project.get('project_master').front
		$('<div></div>').load(path,@iniTooltip).appendTo('.svg-area')


	iniTooltip:->
		$('.layer').tooltipster(
			theme: 'tooltipster-shadow',
			contentAsHTML: true,
			# autoClose : false
			functionInit:-> 
				return $('#villa_info').html()
			
			functionReady:->
				$('#villa_info').attr('aria-hidden', false)
		   
			functionAfter:->
				$('#villa_info').attr('aria-hidden', true)
		   
		)
	


class CommonFloor.CenterBunglowCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBunglowView
