#View for the Main Controller
class CommonFloor.UnitView extends Marionette.LayoutView

	template : '#unit-view-template'


#starting point : Controller 
class CommonFloor.UnitCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID)
			CommonFloor.loadJSONData()
		console.log project.toJSON()
		if jQuery.isEmptyObject(project.toJSON())
			@show new CommonFloor.NothingFoundView
		else
			@show new CommonFloor.UnitView

#Top View for unit
class TopUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="row">
				<div class="col-md-12 col-xs-12 col-sm-12">
						<div class="row breadcrumb-bar">
							<div class="col-xs-12 col-md-12">
								<div class="bread-crumb-list">
									<ul class="brdcrmb-wrp clearfix">
										<li class="">
											<span class="bread-crumb-current">
												<span class=".icon-arrow-right2"></span><a class="unit_back" href="#">
													Back to Project Overview</a>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>



						<div class="search-header-wrap">
							<h1 class="pull-left proj-name">{{project_title}}</h1> 
							  <div class="proj-type-count">
							  	<h1 class="text-primary pull-left">{{unit_name}}</h1>
							  	<div class="clearfix"></div>
							  </div>
							  <div class="pull-right m-t-25">
				                <button class="btn btn-primary cf-btn-white">Get Price List</button>
				                <button class="btn btn-primary cf-btn-primary">Book Now</button>
				              </div>
						  	<div class="clearfix"></div>
						</div>
					</div>
				</div>')

	ui  :
		unitBack : '.unit_back'

	serializeData:->
		data = super()
		data.project_title = project.get 'project_title'
		data

	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			previousRoute = CommonFloor.router.previous()
			CommonFloor.navigate '/'+previousRoute , true

	onShow:->
		if CommonFloor.router.history.length == 1
			@ui.unitBack.hide()

#Top Controller for unit
class CommonFloor.TopUnitCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		unit = unitCollection.findWhere
			id  : unitid
		response = window.unit.getUnitDetails(unitid)
		unit.set 'type' , s.capitalize response[2]
		@show new TopUnitView
				model : unit

			
#Left View for unit
class LeftUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content unit-details">
							<div class="filters-wrapper">
								<div class="blck-wrap title-row">
									<!--<h3 class="pull-left"><strong>{{unit_name}}</strong></h3>
									 <span class="label label-success">For Sale</span> -->
									<div class="clearfix"></div>

									<div class="details">
										<div>
											<label>Price: </label> <span class="price"></span>
										</div>
										<div>
											<label>Unit Type:</label> {{type}}
										</div>
										<div>
											<label>Area:</label> {{area}} sqft
										</div>
									</div>

									<div class="room-attr m-t-10">
										<label class="property hidden">Property Attributes</label>
										{{#attributes}}
											<div class="m-b-5">
												<span>{{attribute}}</span>: {{value}} 
											</div>
										{{/attributes}}
									</div>

								</div>

								<div class="unit-list">
									
									{{#levels}}
									<div class="blck-wrap no-hover">
										<h4 class="m-b-10 m-t-10 text-primary">{{level_name}}</h4>

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
										<div class="room-attr">
											<div class="m-b-15">
												<h5 class="m-b-5">{{room_name}}</h5>  
												{{#attributes}}  
												<div class=""><span>{{attribute}}</span>: {{value}} </div>
												{{/attributes}}                    
												<!--<h6 class="">{{size}}sqft</h6>-->
											</div>
										</div>
										{{/rooms}}
										
									</div>
									{{/levels}}
									
								</div>

							</div>
							<div class="clearfix"></div>
						
							<div class="similar-section">
					            <label>Similar Villas based on your filters:</label><br>
					            <!--<p>Pool View, Garden, 3BHK</p>-->
					            <ul>
					              	{{#similarUnits}}
					            	<li class="">
					                	{{unit_name}}
					                </li>
					                {{/similarUnits}}
					            </ul>
				            </div>
						</div>
					</div>')

	serializeData:->
		data = super()
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		response = window.unit.getUnitDetails(unitid)
		unit = unitCollection.findWhere
			id  : unitid
		floor = response[0].get('floor')
		attributes = []
		if response[4] != null
			$.each response[4] , (index,value)->
				attributes.push 
						'attribute' : s.capitalize index
						'value'     : value

		similarUnits = @getSimilarUnits(unit)
		temp = []
		$.each similarUnits, (index,value)->
			temp.push 
				'unit_name' : value.get('unit_name')
		console.log temp
		data.area = response[0].get('super_built_up_area')
		data.type = response[1].get('name')
		data.unit_name = unit.get('unit_name')
		data.levels  = @generateLevels(floor,response)
		data.attributes  = attributes
		data.similarUnits = temp
		data

	getSimilarUnits:(unit)->
		units = []
		i = 0
		unitsArr = unitCollection.toArray()
		$.each unitsArr, (item,value)->
			if value.get('unit_variant_id') == unit.get('unit_variant_id') 
				units.push value
				i++
			if i == 3
				return false
			
		units


	generateLevels:(floor,response)->
		levels = []
		$.each floor,(index,value)->
			rooms = []
			level_name =  'Level  '+ index  
			if response[2]  is 'apartment'
				level_name = 'Floor ' + unit.get 'floor'
			$.each value.rooms_data,(ind,val)->
				attributes = []
				$.each val.atributes,(ind_att,val_att)->
					attributes.push
						'attribute' : s.capitalize val_att.attribute_key
						'value' : val_att.attribute_value
				rooms.push 
					'room_name' : val.room_name
					'attributes' : attributes
			
			levels.push 
				'level_name' : level_name
				'rooms'			 : rooms

		levels

	onShow:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		response = window.unit.getUnitDetails(unitid)
		window.convertRupees(response[3])
		$('.price').text $('#price').val()
		if response[4] != null
			$('.property').removeClass 'hidden'
	
#Left Controller for unit
class CommonFloor.LeftUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftUnitView
			
#Center Controller for unit
class CenterUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 us-right-content">
						<div class="svg-area">
							<div class="liquid-slider slider" id="slider-id">
								<div class="ls-wrapper ls-responsive">
									<div class="ls-nav">
										<ul>
											<li class="external ">
												<h4 class="title">External 3D</h4>
											</li>
											<li class="twoD">
												<h4 class="title">2D Layout</h4>
											</li>
											<li class="threeD">
												<h4 class="title">3D Layout</h4>
											</li>
											<li class="gallery">
												<h4 class="title">Gallery</h4>
											</li>
										</ul>
									</div>
									 <!--<div class="external">
											<h2 class="title">External 3D</h2>
											
									 </div>
									 <div class="twoD">
										<h2 class="title">2D Layout</h2>
										
									 </div>
									 <div class="threeD">
										<h2 class="title">3D Layout</h2>
									 </div>-->
								</div>

								<div class="liquid-slider slider">
									<div class="panel-wrapper">
										<div class="level ">
											<div class="images animated fadeIn text-center">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>')

	ui :
		imagesContainer : '.us-right-content'


	events:
		'click .threeD':(e)->
			response = @generateLevels()
			html = ''
			$.each response[1],(index,value)->
				html += '<div class="layouts animated fadeIn">
							<a class="fancybox" rel="3d" href="'+value+'" title="'+s.replaceAll(response[2][index], "_", " ")+'">
								<img class="img" src="'+value+'" />
								<div class="img-overlay"></div>
								<span>'+s.replaceAll(response[2][index], "_", " ")+'</span>
							</a>
						</div>'
			$('.images').html html
			$('.threeD').addClass('current')
			$('.external').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')

		'click .twoD':(e)->
			response = @generateLevels()
			html = ''
			$.each response[0],(index,value)->
				html += '<div class="layouts animated fadeIn">
							<a class="fancybox" rel="2d" href="'+value+'" title="'+s.replaceAll(response[2][index], "_", " ")+'">
								<img class="img" src="'+value+'" />
								<div class="img-overlay"></div>
								<span>'+s.replaceAll(response[2][index], "_", " ")+'</span>
							</a>
						</div>'
			$('.images').html html
			$('.twoD').addClass('current')
			$('.external').removeClass('current')
			$('.threeD').removeClass('current')
			$('.gallery').removeClass('current')

		'click .external':(e)->
			response = @generateLevels()
			html = ''
			html += '<div class="animated fadeIn">
						<img class="img" src="'+response[3].get('external3durl')+'" />
					</div>'
			$('.images').html html
			$('.external').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')

		'click .gallery':(e)->
			response = @generateLevels()
			html = ''
			$.each response[3].get('galleryurl'),(index,value)->
				html += '<div class="animated fadeIn gallery-img">
							<a class="fancybox" rel="gall" href="'+value+'">
								<img class="img" src="'+value+'" />
								<div class="img-overlay"></div>
							</a>
						</div>'
			
			$('.images').html html
			$('.gallery').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.external').removeClass('current')
		

	onShow:->
		
		response = @generateLevels()
		html = ''
		$.each response[0],(index,value)->
			html += '<img class="img" src="'+value+'" /><span>'+s.replaceAll(response[2][index], "_", " ")+'</span>'
		$('.twoD').addClass('current')
		$('.threeD').removeClass('current')
		$('.external').removeClass('current')
		$('.gallery').removeClass('current')
		if response[0].length == 0
			$.each response[1],(index,value)->
				html += '<img class="img" src="'+value+'" /><span>'+s.replaceAll(response[2][index], "_", " ")+'</span>'
			$('.threeD').addClass('current')
			$('.external').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')
		
		

		$('.images').html html
		$('.level').attr 'class' , 'level '+ _.last(response[2])
			
			

				
		if response[3].get('external3durl') != undefined
			html = '<img class="img" src="'+response[3].get('external3durl')+'" />'
			$('.images').html html
			$('.external').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')

		
		if response[0].length == 0
			$('.twoD').hide()
			

		if response[1].length == 0
			$('.threeD').hide()

		if response[3].get('external3durl') == undefined
			$('.external').hide()

		if response[3].get('galleryurl') == undefined 
			$('.gallery').hide()
			
		if response[0].length == 0 &&  response[1].length == 0 && response[3].get('external3durl') == undefined
			$('.gallery').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.external').removeClass('current')
			$.each response[3].get('galleryurl'),(index,value)->
				html += '<div class="animated fadeIn"><img class="img" src="'+value+'" /></div>'


		height =  @ui.imagesContainer.height()
		$('.search-left-content').css('height',height)
		$('.unit-list').css('height',height-162)
		$('.unit-list').mCustomScrollbar
			theme: 'inset'


		$('.images').html html
		# $('.img').bttrlazyloading(
		# 	animation: 'fadeIn',
		# 	placeholder : '<div class="cf-loader"></div>'

		# 	)
		$(".fancybox").fancybox()


	generateLevels:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		response = window.unit.getUnitDetails(unitid)
		twoD = []
		threeD = []
		level = []
		floor = response[0].get('floor')
		i = 0
		$.each floor,(index,value)->
			if value.url2dlayout_image != undefined &&  value.url2dlayout_image != ""
				twoD.push value.url2dlayout_image
			if value.url3dlayout_image != undefined &&  value.url3dlayout_image != ""
				threeD.push value.url3dlayout_image
			level_name =  'Level  '+ index  
			if response[2] != 'apartment'
				level.push s.replaceAll('Level '+i, " ", "_")
			
			i = i + 1	

		[twoD,threeD,level,response[0]]
#Center View for the unit
class CommonFloor.CenterUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterUnitView