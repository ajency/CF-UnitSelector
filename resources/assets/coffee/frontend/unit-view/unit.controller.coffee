#View for the Main Controller
class CommonFloor.UnitView extends Marionette.LayoutView

	template : '#unit-view-template'


#starting point : Controller 
class CommonFloor.UnitCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID)
			CommonFloor.loadJSONData()
		if jQuery.isEmptyObject(project.toJSON())
			@show new CommonFloor.NothingFoundView
		else
			@show new CommonFloor.UnitView

#Top View for unit
class TopUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="container-fluid animated fadeIn">
										<div class="row">
											<div class="col-md-12 col-xs-12 col-sm-12">

												<div class="breadcrumb-bar">
													<a class="unit_back" href="#"></a>
												</div>

												<div class="header-info">
													<h2 class="pull-left proj-name">{{project_title}} - {{unit_name}}</h2>
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
			url = Backbone.history.fragment
			unitid = parseInt url.split('/')[1]
			console.log unit = unitCollection.findWhere
				id  : unitid
			unitType = unitTypeMasterCollection.findWhere
							'id' :  unit.get('unit_type_id')
			property = window.propertyTypes[unitType.get('property_type_id')]
			buildingModel = buildingCollection.findWhere
							'id' : unit.get 'building_id'
			building_id = buildingModel.get 'id'
			if s.decapitalize(property) == 'penthouse' || s.decapitalize(property) == 'apartments'
				if Object.keys(buildingModel.get('building_master')).length == 0
					CommonFloor.navigate '/building/'+building_id+'/apartments' , true
				else
					CommonFloor.navigate '/building/'+building_id+'/master-view' , true
			else
				CommonFloor.navigate '/master-view' , true	

	# onShow:->
	# 	# CommonFloor.router.storeRoute()
	# 	# if CommonFloor.router.history.length == 1
	# 	# 	@ui.unitBack.hide()

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

	template : Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content animated fadeIn">
							<div class="unit-details">
								<div class="row detail-list">
									<div class="col-sm-6 col-xs-6">
										<span class="facts-icon icon-total-units"></span>
										<div class="unit-label">
											<h3>{{unit_variant}}</h3>
											<h5 class="text-muted">Unit Variant</h5>      
										</div>
									</div>

									<div class="col-sm-6 col-xs-6">
										<span class="facts-icon icon-BHKtype"></span>
										<div class="unit-label">
											<h3>{{type}}</h3>
											<h5 class="text-muted">Unit Type</h5>      
										</div>
									</div>
								</div>

								<div class="row detail-list">
									<div class="col-sm-6 col-xs-6">
										<span class="facts-icon icon-BHK-area-2"></span>
										<div class="unit-label">
											<h3>{{area}} sq.ft</h3>
											<h5 class="text-muted">Area</h5>      
										</div>
									</div>

									<div class="col-sm-6 col-xs-6">
										<span class="facts-icon icon-rupee-icn"></span>
										<div class="unit-label">
											<h3 class="price">{{price}}</h3>
											<h5 class="text-muted">Price</h5>      
										</div>
									</div>
								</div>

								<div class="advncd-filter-wrp">

									<div class="blck-wrap title-row">
										<h5 class="bold property hidden">Property Attributes</h5>
									</div>
									{{#attributes}}
									<div class="row">
									  <div class="col-sm-12">
											<h6><span class="text-muted">{{attribute}}:</span> {{value}}</h6>
										</div>
									</div>
									{{/attributes}}
								</div>

								<div class=" title-row">
									<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
										{{#levels}}
										<div class="panel panel-default">

											<div class="panel-heading" role="tab" id="headingTwo">
											  	<h4 class="panel-title m-b-15 p-b-10">
											   		<a class="accordion-toggle collapsed text-primary " data-toggle="collapse" data-parent="#accordion" href="#{{id}}" aria-expanded="false" >
												    	{{level_name}}
													</a>
											  	</h4>
											</div>

											<div id="{{id}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
					                           	<div class="panel-body">
					                           		{{#rooms}}
					                          		<div class="room-attr"> 
					                            		<div class="m-b-15"> 
					                                		<h5 class="m-b-5">{{room_name}}</h5>
					                                			{{#attributes}} 
					                                			<div class=""><span>{{attribute}}</span>: {{value}}</div>
					                                			{{/attributes}}
					                            		</div> 
					                          		</div>
					                         		{{/rooms}}
					                          	</div>
					                        </div>

										</div>
										{{/levels}}
									</div>
								</div>

							</div>
							<div class="clearfix"></div>
						
							<div class="similar-section">
					           <h5 class="bold m-b-15">{{similarUnitsText}}</h5>
					          
					              	{{#similarUnits}}
					              	<div class="row m-b-15">
					              	    <div class="col-sm-4 hidden-xs">
				              	            <div class="alert ">
				              	              <i class="{{type}}-ico"></i>
				              	            </div> 
					              	    </div>

					              	    <div class="col-sm-8 col-xs-12">
			              	              	<h5><a href="'+BASEURL+'/project/'+PROJECTID+'/#unit-view/{{id}}">{{unit_name}}</a> <span class="text-primary pull-right"><span class="icon-rupee-icn"></span>{{price}}</span></h5>

			              	              	<span class="text-muted">Unit Variant: </span>{{variant}}<br>
			              	             	<span class="text-muted">Unit Type:</span> {{unit_type}}<br>
			              	             	<span class="text-muted"> Area:</span> {{area}} sqft     
					              	    </div>
					              	</div>

					                {{/similarUnits}}					            
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
		$.each similarUnits[0], (index,value)->
			temp.push 
				'unit_name' : value.get('unit_name')
				'unit_type' : response[1].get 'name'
				'price' : window.numDifferentiation(response[3])
				'area':response[0].get 'super_built_up_area'
				'variant':response[0].get 'unit_variant_name'
				'id' : value.get('id')
				'type' : similarUnits[2]
		data.area = response[0].get('super_built_up_area')
		data.type = response[1].get('name')
		data.unit_variant = response[0].get('unit_variant_name')
		data.levels  = @generateLevels(floor,response,unit)
		data.attributes  = attributes
		data.similarUnits = temp
		data.similarUnitsText = similarUnits[1]
		data

	getSimilarUnits:(unit)->
		units = []
		i = 0
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		unitModel = unitMasterCollection.findWhere
					'id' : unitid
		unitColl = CommonFloor.getUnitsProperty(unitModel)
		unitsArr = unitColl[0]
		text = unitColl[1]
		$.each unitsArr.toArray(), (index, value)->
			if value.id != unitid
				units.push value
				i++
			if i == 3
				return false
				
		if unitsArr.length == 1
			text = ''
		[units,text,unitColl[2]]


	generateLevels:(floor,response,unit)->
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
			level_id = s.replaceAll(level_name, " ", "_")
			levels.push 
				'level_name' : level_name
				'rooms'			 : rooms
				'id'    : level_id

		levels

	onShow:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		response = window.unit.getUnitDetails(unitid)
		$('.price').text window.numDifferentiation(response[3])
		if response[4] != null && response[4].length != 0
			$('.property').removeClass 'hidden'
	
#Left Controller for unit
class CommonFloor.LeftUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new LeftUnitView
			
#Center Controller for unit
class CenterUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-9 col-sm-12 col-xs-12 us-right-content unit-slides animated fadeIn">
						<div class="">
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
								<div class="single-bldg">
	              	
					                <div class="prev"></div>
					                <div class="next"></div>
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
								<img class="img" data-src="'+value+'" />
								<div class="img-overlay"></div>
								<span>'+s.replaceAll(response[2][index], "_", " ")+'</span>
							</a>
						</div>'
			$('.images').html html
			$('.img').lazyLoadXT()
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
								<img class="img" data-src="'+value+'" />
								<div class="img-overlay"></div>
								<span>'+s.replaceAll(response[2][index], "_", " ")+'</span>
							</a>
						</div>'
			$('.images').html html
			$('.img').lazyLoadXT()
			$('.twoD').addClass('current')
			$('.external').removeClass('current')
			$('.threeD').removeClass('current')
			$('.gallery').removeClass('current')

		'click .external':(e)->
			response = @generateLevels()
			html = ''
			html += '<div class="animated fadeIn">
						<img class="img img-responsive" data-src="'+response[3].get('external3durl')+'" />
					</div>'
			$('.images').html html
			$('.img').lazyLoadXT()
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
								<img class="img" data-src="'+value+'" />
							</a>
						</div>'
			
			$('.images').html html
			$('.img').lazyLoadXT()
			$('.gallery').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.external').removeClass('current')

		'mouseover .next,.prev':(e)->
			id = parseInt $(e.target).attr('data-id')
			unitModel = unitCollection.findWhere
								'id' : id
			response = window.unit.getUnitDetails(id)
			unitColl = CommonFloor.getUnitsProperty(unitModel)
			html = '<div class="svg-info">
						<i class="'+unitColl[2]+'-ico"></i>
						<h5 class=" m-t-0">'+unitModel.get('unit_name')+'</h5>
						<div class="details">
							<span>'+response[1].get('name')+'</span></br>
							Approx Rs.<span class="text-primary">'+window.numDifferentiation(response[3])+'</span>
							<!--<div>Area: <span>'+response[0].get('super_built_up_area')+'Sq.Ft</span></div>	
							<div>Variant: <span>'+response[0].get('unit_variant_name')+'</span></div>-->
							
						</div>
					</div>'
			
			$(e.target).tooltipster('content', html)

		'click .next,.prev':(e)->
			id = parseInt $(e.target).attr('data-id')
			unitModel = unitCollection.findWhere
								'id' : id
			CommonFloor.navigate '/unit-view/'+id , true
			CommonFloor.router.storeRoute()
			
		

	onShow:->
		@getNextPrevUnit()
		response = @generateLevels()
		html = ''
		$.each response[0],(index,value)->
			html += '<div class="layouts animated fadeIn">
						<a class="fancybox" href="'+value+'">
							<img class="img" data-src="'+value+'" />
							<div class="img-overlay"></div>
							<span>'+s.replaceAll(response[2][index], "_", " ")+'</span>
						</a>
					</div>'
		$('.twoD').addClass('current')
		$('.threeD').removeClass('current')
		$('.external').removeClass('current')
		$('.gallery').removeClass('current')
		if response[0].length == 0
			$.each response[1],(index,value)->
				html += '<img data-src="'+value+'" /><span>'+s.replaceAll(response[2][index], "_", " ")+'</span>'
			$('.threeD').addClass('current')
			$('.external').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')
		
		
		
		$('.images').html html
		$('.level').attr 'class' , 'level Level_0 '+ _.last(response[2])
			
			

				
		if ! _.isUndefined(response[3].get('external3durl'))
			html = '<img class="img lazy-hidden img-responsive external-img"  data-src="'+response[3].get('external3durl')+'" />'
			$('.images').html html
			$('.external').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')

		
		if response[0].length == 0
			$('.twoD').hide()
			

		if response[1].length == 0
			$('.threeD').hide()

		if _.isUndefined(response[3].get('external3durl')) 
			$('.external').hide()

		if _.isUndefined(response[3].get('galleryurl')) 
			$('.gallery').hide()
			
		if response[0].length == 0 &&  response[1].length == 0 && _.isUndefined(response[3].get('external3durl'))
			$('.gallery').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.external').removeClass('current')
			if ! _.isUndefined(response[3].get('galleryurl'))
				$.each response[3].get('galleryurl'),(index,value)->
					html += '<div class="animated fadeIn"><img class="img" data-src="'+value+'" /></div>'


		height =  @ui.imagesContainer.height()
		if $(window).width() > 991
			$('.search-left-content').css('height',height)
			$('.search-left-content').mCustomScrollbar
				theme: 'inset'


		$('.images').html html
		$(".fancybox").fancybox()
		$('.img').lazyLoadXT()
		@iniTooltip()

	iniTooltip:->
		$('.next,.prev').tooltipster(
				theme: 'tooltipster-shadow circle-tooltip'
				contentAsHTML: true
				onlyOne : true
				arrow : false
				offsetX : 50
				offsetY : -10
				interactive : true
				# animation : 'grow'
				trigger: 'hover'
				
		)

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
			if ! _.isUndefined(value.url2dlayout_image) &&  value.url2dlayout_image != ""
				twoD.push value.url2dlayout_image
			if ! _.isUndefined(value.url3dlayout_image) &&  value.url3dlayout_image != ""
				threeD.push value.url3dlayout_image
			level_name =  'Level  '+ index  
			level.push s.replaceAll('Level '+i, " ", "_")
			
			i = i + 1	
		[twoD,threeD,level,response[0]]


	getNextPrevUnit:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		unitModel = unitCollection.findWhere
					'id' : unitid
		CommonFloor.getUnitsProperty(unitModel)
		window.tempColl.setRecord(unitModel)
		next = tempColl.next()
		if _.isUndefined next
			$('.next').hide()
		else
			$('.next').attr('data-id',next.get('id'))
		prev = tempColl.prev()
		if _.isUndefined prev
			$('.prev').hide()
		else
			$('.prev').attr('data-id',prev.get('id'))

#Center View for the unit
class CommonFloor.CenterUnitCtrl extends Marionette.RegionController

	initialize:->
		@show new CenterUnitView