class CommonFloor.BunglowUnitView extends Marionette.LayoutView

	template : '#unit-view-template'



class CommonFloor.BunglowUnitCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID)
			CommonFloor.loadJSONData()
		console.log project.toJSON()
		if jQuery.isEmptyObject(project.toJSON())
			@show new CommonFloor.NothingFoundView
		else
			@show new CommonFloor.BunglowUnitView

class TopBunglowUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
				<div class="col-md-12 col-xs-12 col-sm-12">
						<!--<div class="row breadcrumb-bar">
							<div class="col-xs-12 col-md-12">
								<div class="bread-crumb-list">
									<ul class="brdcrmb-wrp clearfix">
										<li class="">
											<span class="bread-crumb-current">
												<span class=".icon-arrow-right2"></span><a href="#/master-view">
													Back to Poject Overview</a>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>-->

						<div class="search-header-wrap">
							<h1>You have selected {{unit_name}} {{type}}</h1>
						</div>
					</div>
				</div>')

	



	

class CommonFloor.TopBunglowUnitCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		unit = unitCollection.findWhere
			id  : unitid
		response = window.unit.getUnitDetails(unitid)
		unit.set 'type' , response[2]
		@show new TopBunglowUnitView
				model : unit
			

class LeftBunglowUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content">
						<div class="filters-wrapper">
							<div class="blck-wrap title-row">
								<h2 class="pull-left"><strong>{{unit_name}}</strong></h2>
								<!-- <span class="label label-success">For Sale</span> -->
								<div class="clearfix"></div>

								<div class="details">
									<div>
										<label>Price:</label><span class="price"></span>
									</div>
									<div>
										{{type}} ({{area}} sqft)
									</div>
								</div>
							</div>
							<div>{{#attributes}}
										<div><span>{{attribute}}</span>: {{value}} </div>
										{{/attributes}}
									</div>
							<div class="advncd-filter-wrp unit-list">
								
								{{#levels}}
								<h4 class="m-b-0 m-t-25 text-primary">{{level_name}}</h4>
								<!--<div class="blck-wrap title-row">
									<div class="row">
										<div class="col-sm-4">
											<h5 class="accord-head">Rooms</h5>                      
										</div>
										<div class="col-sm-4">
											<h5 class="accord-head">No</h5>                      
										</div>
										<div class="col-sm-4">
											<h5 class="accord-head">Area</h5>                      
										</div>
									</div>
								</div>-->
								{{#rooms}}
								<div class="blck-wrap no-hover room-attr">
									<div class="row p-b-5">
										<div class="col-sm-12">
											<h5 class="accord-head">{{room_name}}</h5>  
											{{#attributes}}  
											<div><span>{{attribute}}</span>: {{value}} </div>
											{{/attributes}}                    
										</div>
										<!--<div class="col-sm-4">
											<h6 class="">{{size}}sqft</h6>                      
										</div>-->
									</div>
								</div>
								{{/rooms}}
								{{/levels}}
								
							</div>
						</div>
					</div>')

	serializeData:->
		data = super()
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		console.log response = window.unit.getUnitDetails(unitid)
		levels = []
		floor = response[0].get('floor')

		$.each floor,(index,value)->
			rooms = []
			$.each value.rooms_data,(ind,val)->
				attributes = []
				$.each val.atributes,(ind_att,val_att)->
					console.log val_att
					attributes.push
						'attribute' : s.capitalize val_att.attribute_key
						'value' : val_att.attribute_value
				rooms.push 
					'room_name' : val.room_name
					'attributes' : attributes
			
			levels.push 
				'level_name' : 'Level  '+ index
				'rooms'			 : rooms
		
		unitType = unitTypeCollection.findWhere
								'id' :  response[0].get('unit_type_id')

		attributes = []
		if response[4] != null
			$.each response[4] , (index,value)->
				attributes.push 
						'attribute' : s.capitalize index
						'value'     : value
		data.area = response[0].get('super_built_up_area')
		data.type = response[1].get('name')
		data.unit_name = unit.get('unit_name')
		data.levels  = levels
		data.attributes  = attributes
		data

	onShow:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		response = window.unit.getUnitDetails(unitid)
		window.convertRupees(response[3])
		$('.price').text $('#price').val()
	

class CommonFloor.LeftBunglowUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftBunglowUnitView
			

class CenterBunglowUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
						<div class="svg-area">
							<div class="liquid-slider slider" id="slider-id">
									 <div class="external">
											<h2 class="title">External 3D</h2>
											
									 </div>
									 <div class="twoD">
										<h2 class="title">2D Layout</h2>
										
									 </div>
									 <div class="threeD">
										<h2 class="title">3D Layout</h2>
										
												
									 </div>
									 <div class="images">
									 </div>
							</div>
						</div>
					</div>')


	events:
		'click .threeD':(e)->
			url = Backbone.history.fragment
			unitid = parseInt url.split('/')[1]
			response = window.unit.getUnitDetails(unitid)
			twoD = []
			threeD = []
			level = []
			floor = response[0].get('floor')
			i = 0
			$.each floor,(index,value)->
				twoD.push value.url2dlayout_image
				threeD.push value.url3dlayout_image
				level.push s.replaceAll('Level '+i, " ", "_")
				i = i + 1
			html = ''
			$.each threeD,(index,value)->
				html += '<img src="'+value+'" /><span>'+level[index]+'</span>'
			$('.images').html html

		'click .twoD':(e)->
			url = Backbone.history.fragment
			unitid = parseInt url.split('/')[1]
			response = window.unit.getUnitDetails(unitid)
			twoD = []
			threeD = []
			level = []
			floor = response[0].get('floor')
			i = 0
			$.each floor,(index,value)->
				twoD.push value.url2dlayout_image
				threeD.push value.url3dlayout_image
				level.push s.replaceAll('Level '+i, " ", "_")
				i = i + 1
			html = ''
			$.each twoD,(index,value)->
				html += '<img src="'+value+'" /><span>'+level[index]+'</span>'
			$('.images').html html

		'click .external':(e)->
			url = Backbone.history.fragment
			unitid = parseInt url.split('/')[1]
			response = window.unit.getUnitDetails(unitid)
			twoD = []
			threeD = []
			level = []
			floor = response[0].get('floor')
			html = '<img src="'+response[0].get('external3durl')+'" />'
			$('.images').html html
		

	onShow:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		response = window.unit.getUnitDetails(unitid)
		twoD = []
		threeD = []
		level = []
		floor = response[0].get('floor')
		i = 0
		$.each floor,(index,value)->
			twoD.push value.url2dlayout_image
			threeD.push value.url3dlayout_image
			level.push s.replaceAll('Level '+i, " ", "_")
			i = i + 1
		html = ''
		$.each twoD,(index,value)->
			html += '<img src="'+value+'" /><span>'+level[index]+'</span>'
		$('.images').html html
			
			

				
		if response[0].get('external3durl') != undefined
			html = '<img src="'+response[0].get('external3durl')+'" />'
			$('.images').html html


		if twoD.length == 0
			$('.twoD').hide()

		if threeD.length == 0
			$('.threeD').hide()

		if response[0].get('external3durl') == undefined
			$('.external').hide()

		

class CommonFloor.CenterBunglowUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterBunglowUnitView
			
			

