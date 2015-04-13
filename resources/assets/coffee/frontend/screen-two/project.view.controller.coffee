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
			  <h1>We are now at {{project_title}}\'s upcoming project having {{units}} villas</h1>
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

	template : Handlebars.compile('<div class="row">
					<div class="col-sm-4">
					  <h6 class="{{status}}">{{unit_name}}</h6>                      
					</div>
					<div class="col-sm-4">
					  <h6 class="">{{unit_type}}</h6>                      
					</div>
					<div class="col-sm-4">
					  <h6 class="">{{super_build_up_area}} sqft</h6>                      
					</div>
				  </div>
			
				')
	initialize:->
		@$el.prop("id", 'unit'+@model.get("id"))

	className : 'blck-wrap'

	serializeData:->
		data = super()
		console.log unitVariant = bunglowVariantCollection.findWhere
							'id' : @model.get('unit_variant_id')
		unitType = unitTypeCollection.findWhere
							'id' : unitVariant.get('unit_type_id')
		data.unit_type = unitType.get('name')
		data.super_build_up_area = unitVariant.get('super_build_up_area')
		availability = @model.get('availability')
		data.status = s.decapitalize(availability)
		@model.set 'status' , data.status
		data

	events:
		'mouseover .row' :(e)->
			id = @model.get('id')
			$('#'+id).attr('class' ,'layer '+@model.get('status'))
		'mouseout .row' :(e)->
			$('.layer').attr('class' ,'layer') 

class LeftBunglowCompositeView extends Marionette.CompositeView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
			<div class="filters-wrapper ">
				<div class="advncd-filter-wrp  unit-list">
					<div class="blck-wrap title-row">
                  <div class="row">
                    <div class="col-sm-4">
                      <h5 class="accord-head">Villa No</h5>                      
                    </div>
                    <div class="col-sm-4">
                      <h5 class="accord-head">Type</h5>                      
                    </div>
                    <div class="col-sm-4">
                      <h5 class="accord-head">Area</h5>                      
                    </div>
                  </div>
                </div>
                <div class="units">
                </div> 

					</div>
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
		  </div>')

	events :
		'mouseout':(e)->
			$('.layer').attr('class' ,'layer') 

		'mouseover .layer':(e)->
			id  = parseInt e.target.id
			html = ""
			unit = unitCollection.findWhere 
				id :  id 
			if unit == undefined
				html += '<div class="svg-info">
							<div class="details">
								Villa details not entered 
							</div>  
						</div>'
				$('.layer').tooltipster('content', html)
				return false
			unitVariant = bunglowVariantCollection.findWhere
								'id' : unit.get('unit_variant_id')
			
			unitType = unitTypeCollection.findWhere
								'id' :  unitVariant.get('unit_type_id')
			availability = unit.get('availability')
			availability = s.decapitalize(availability)
			html = ""
			html += '<div class="svg-info">
					<h4 class="pull-left">'+unit.get('unit_name')+'</h4>
					<!--<span class="label label-success"></span-->
					<div class="clearfix"></div>
					<div class="details">
					<div>
						<label>Area</label> - '+unitVariant.get('super_build_up_area')+' Sq.ft
					</div> 
					<div>
						<label>Unit Type </label> - '+unitType.get('name')+'
					</div>  
					</div>  
					</div>  
					</div>'
			
			$('#'+id).attr('class' ,'layer '+availability) 
			$('.layer').tooltipster('content', html)
			


	onShow:->
		path = project.get('project_master').front
		$('<div></div>').load(path,@iniTooltip).appendTo('.svg-area')


	iniTooltip:->
		$('.layer').tooltipster(
			theme: 'tooltipster-shadow',
			contentAsHTML: true
			onlyOne : true
			arrow : false
			offsetX : 50
			offsetY : -10
			# content : $('.svg-info')
			# autoClose : false
			# functionInit:-> 
			# 	return $('#villa_info').html()
			
			# functionReady:->
			# 	$('#villa_info').html()
		   
			# functionAfter:->
			# 	$('#villa_info').attr('aria-hidden', true)
		   
		)
	


class CommonFloor.CenterBunglowCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBunglowView
