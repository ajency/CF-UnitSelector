#View for the Main Controller
class CommonFloor.UnitView extends Marionette.LayoutView

	template : '#unit-view-template'


#starting point : Controller 
class CommonFloor.UnitCtrl extends Marionette.RegionController

	initialize:->
		if jQuery.isEmptyObject(project.toJSON())
			project.setProjectAttributes(PROJECTID)
			CommonFloor.loadJSONData()
		
		if bunglowVariantMasterCollection.length == 0 && apartmentVariantMasterCollection.length == 0 && plotVariantMasterCollection.length == 0  
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

												<div class="pull-right">
													<form action="{{bookingPortalUrl}}" method="POST">
														<input type="hidden" value = "{{id}}">
														<button type="submit" class="btn btn-primary cf-btn-primary">Book Now - &#8377; {{unitBookingAmount}}</button>
													</form>
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
		data.unitBookingAmount = Marionette.getOption(@,'unitBookingAmount')
		data.bookingPortalUrl = window.bookingPortalUrl
		data

	events:->
		'click @ui.unitBack':(e)->
			e.preventDefault()
			previousRoute = CommonFloor.router.previous()
			url = Backbone.history.fragment
			unitid = parseInt url.split('/')[1]
			unit = unitCollection.findWhere
				id  : unitid
			unitType = unitTypeMasterCollection.findWhere
							'id' :  unit.get('unit_type_id')
			property = window.propertyTypes[unitType.get('property_type_id')]
			
			if s.decapitalize(property) == 'penthouse' || s.decapitalize(property) == 'apartments'
				buildingModel = buildingCollection.findWhere
							'id' : unit.get 'building_id'
				building_id = buildingModel.get 'id'
				if Object.keys(buildingModel.get('building_master')).length == 0
					CommonFloor.navigate '/building/'+building_id+'/apartments' , true
				else
					CommonFloor.navigate '/building/'+building_id+'/master-view' , true
			else
				if Object.keys(project.get('project_master')).length == 0
					CommonFloor.navigate '/list-view' , true	
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
		
		# get booking amount from cd api
		bookingAmtOptions =
			method:"GET"
			url: "#{BASERESTURL}/get-booking-amount" 
			data:
				unit_id : unitid

		$.ajax(bookingAmtOptions).done (resp, textStatus ,xhr)=>
			unitBookingAmount = resp.data


			@show new TopUnitView
					model : unit
					unitBookingAmount : unitBookingAmount

			
#Left View for unit
class LeftUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-4 col-lg-3 col-xs-12 col-sm-12 search-left-content animated fadeIn">
							<div class="unit-details">
								<div class="row detail-list">
									<div class="col-sm-6 col-xs-6 text-center">
										<span class="facts-icon icon-total-units"></span>
										<div class="unit-label m-t-10">
											<h3>{{unit_variant}}</h3>
											<h6 class="text-muted">Unit Variant</h6>      
										</div>
									</div>

									<div class="col-sm-6 col-xs-6 text-center">
										<span class="facts-icon icon-BHKtype"></span>
										<div class="unit-label m-t-10">
											<h3>{{type}}</h3>
											<h6 class="text-muted">Unit Type</h6>      
										</div>
									</div>
								</div>

								<div class="row detail-list">
									<div class="col-sm-6 col-xs-6 text-center">
										<span class="facts-icon icon-BHK-area-2"></span>
										<div class="unit-label m-t-10">
											<h3>{{area}} {{measurement_units}}</h3>
											<h6 class="text-muted">Area</h6>      
										</div>
									</div>

									<div class="col-sm-6 col-xs-6 text-center">
										<span class="facts-icon icon-rupee-icn"></span>
										<div class="unit-label m-t-10">
											<h3 class="price">{{price}}</h3>
											<h6 class="text-muted">Price</h6> 
										</div>
									</div>
								</div>

								<div class="advncd-filter-wrp">

									<div class="blck-wrap title-row">
										<h5 class="bold property {{classname}}">{{property_type}}</h5>
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
											   	<a class="accordion-toggle collapsed text-primary panel-title m-b-5 block" data-toggle="collapse" data-parent="#accordion" href="#{{id}}" aria-expanded="false" >
											  		<h4 class="inline-block">
												    	{{level_name}}
											  		</h4>
												</a>
											</div>

											<div id="{{id}}" class="panel-collapse collapse collapseLevel" role="tabpanel" aria-labelledby="headingTwo">
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
				              	<div class="m-b-15 clearfix">
				              	    <div class="sim-icon">
			              	            <div class="alert ">
			              	              <i class="{{type}}-ico"></i>
			              	            </div> 
				              	    </div>


				              	    <div class="sim-details">
		              	              	<h5><a href="'+BASEURL+'/project/'+PROJECTID+'/#unit-view/{{id}}">{{unit_name}}</a> </h5>
		              	             	{{unit_type}} ({{area}} {{units}})<br>
		              	              	{{variant}}<br>
		              	              	<span class="text-primary"><span class="icon-rupee-icn"></span>{{price}}</span>

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
		if response[2] is 'apartment' || response[2] is 'Penthouse'
			attributes.push
				'attribute' : 'Floor'
				'value'		: unit.get 'floor'
		if response[4] != null
			$.each response[4] , (index,value)->
				attributes.push 
						'attribute' : s.capitalize index
						'value'     : value

		similarUnits = @getSimilarUnits(unit)
		temp = []
		
		$.each similarUnits[0], (index,value)->
			res = window.unit.getUnitDetails(value.get('id'))
			temp.push 
				'unit_name' : value.get('unit_name')
				'unit_type' : res[1].get 'name'
				'price' : window.numDifferentiation(res[3])
				'area':res[0].get 'super_built_up_area'  
				'variant':res[0].get 'unit_variant_name'
				'id' : value.get('id')
				'type' : similarUnits[2]
				'units' : project.get('measurement_units')
		data.area = response[0].get('super_built_up_area')
		data.type = response[1].get('name')
		data.unit_variant = response[0].get('unit_variant_name')
		data.levels  = @generateLevels(floor,response,unit)
		data.attributes  = attributes
		data.similarUnits = temp
		data.similarUnitsText = similarUnits[1]
		data.measurement_units = project.get('measurement_units')
		data.property_type = s.capitalize response[2] + ' Attribute(s)'
		data.classname = 'hidden'


		data.unitSellingAmount  = Marionette.getOption(@,'unitSellingAmount')
		if attributes.length != 0
			data.classname =  ''
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
				level_name = 'Room details'
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

		unitSellingAmount  = Marionette.getOption(@,'unitSellingAmount')
		unitSellingAmount = parseInt unitSellingAmount
		# $('.price').text window.numDifferentiation(response[3])
		$('.price').text window.numDifferentiation(unitSellingAmount)
		
		if response[2] is 'apartment'
			$('.collapseLevel').collapse('show')
	
#Left Controller for unit
class CommonFloor.LeftUnitCtrl extends Marionette.RegionController

	initialize:->
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		
		# get selling value of a unit
		sellingAmtOptions =
			method:"GET"
			url: "#{BASERESTURL}/get-selling-amount" 
			data:
				unit_id : unitid

		$.ajax(sellingAmtOptions).done (resp, textStatus ,xhr)=>
			unitSellingAmount = resp.data		

			@show new LeftUnitView
						unitSellingAmount : unitSellingAmount

			
#Center Controller for unit
class CenterUnitView extends Marionette.ItemView

	template : Handlebars.compile('<div class="col-md-8 col-lg-9 col-sm-12 col-xs-12 us-right-content single-unit unit-slides animated fadeIn">
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
											<li class="master hidden">
												<h4 class="title">Position</h4>
											</li>
											<li class="booking">
												<h4 class="title">Payment Plan</h4>
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
											<img class="firstimage animated fadeIn img-responsive" src=""/>
											<div class="images animated fadeIn text-center">
											</div>
										</div>
									</div>
								</div>

								<div class="single-unit">
	              	
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
			$('.firstimage').hide()
			$('.images').empty()

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
			$('.img').lazyLoadXT(
				forceLoad : true
				updateEvent: 'load'
				oncomplete : ()->
					$('.img').removeClass "lazy-hidden"
					$('.img').addClass "lazy-loaded"
			)
			$('.threeD').addClass('current')
			$('.external').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')
			$('.master').removeClass('current')
			$('.booking').removeClass('current')

		'click .twoD':(e)->
			$('.firstimage').hide()
			$('.images').empty()

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
			$('.img').lazyLoadXT(
				forceLoad : true
				updateEvent: 'load'
				oncomplete : ()->
					$('.img').removeClass "lazy-hidden"
					$('.img').addClass "lazy-loaded"
			)
			$('.twoD').addClass('current')
			$('.external').removeClass('current')
			$('.threeD').removeClass('current')
			$('.gallery').removeClass('current')
			$('.master').removeClass('current')
			$('.booking').removeClass('current')

		'click .external':(e)->
			$('.firstimage').hide()
			$('.images').empty()
	
			response = @generateLevels()
			html = ''
			html += '<div class="external-wrapper">
						<div id="rotate_loader" class="img-loader">
							<div class="square" ></div>
							<div class="square"></div>
							<div class="square last"></div>
							<div class="square clear"></div>
							<div class="square"></div>
							<div class="square last"></div>
							<div class="square clear"></div>
							<div class="square "></div>
							<div class="square last"></div>
						</div>
						<div class="animated fadeIn hidden external-container">
							<img class="img-responsive external-img" src="'+response[3].get('external3durl')+'" />
						</div>
					</div>'
			$('.images').html html
			$('#rotate_loader').removeClass 'hidden'
			$('.external-img').load ()->
				$('#rotate_loader').addClass 'hidden'
				$('.external-container').removeClass 'hidden'
			$('.external').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')
			$('.master').removeClass('current')
			$('.booking').removeClass('current')

		'click .gallery':(e)->
			# $('#rotate_loader').removeClass 'hidden'
			$('.images').empty()
			$('.firstimage').hide()

			response = @generateLevels()
			html = ''
			$.each response[3].get('galleryurl'),(index,value)->
				html += '<div class="animated fadeIn gallery-img">
							<a class="fancybox" rel="gall" href="'+value+'">
								<img class="img" data-src="'+value+'" />
							</a>
						</div>'
			
			$('.images').html html
			$('.img').lazyLoadXT(
				forceLoad : true
				updateEvent: 'load'
				oncomplete : ()->
					$('.img').removeClass "lazy-hidden"
					$('.img').addClass "lazy-loaded"
			)

			$('.gallery').addClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.external').removeClass('current')
			$('.master').removeClass('current')
			$('.booking').removeClass('current')

		'click .master':(e)->
			$('.firstimage').show()
			$('.images').empty()
			@loadMaster()
			$('.master').addClass('current')
			$('.gallery').removeClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.external').removeClass('current')
			$('.booking').removeClass('current')

		'click .booking':(e)->
			unitPaymentPlan  = Marionette.getOption(@,'unitPaymentPlan')
			unitPlanMilestones  = unitPaymentPlan.milestones
			unitTotalSaleValue  = unitPaymentPlan.total_sale_value
			$('.images').empty()
			$('.firstimage').hide()
			html = ''
			html += '<div class="invoice-items animated fadeIn">
						<div class="row">
							<div class="col-sm-5 form-inline m-b-20">
								<!--h5 class="inline-block">Payment Plan: </h5-->
								<select class="form-control" id="paymentplans">
									<option value="3363">
										Payment Plan Breakdown
									</option>

									<option value="3364">
										Price Breakup
									</option>
								</select>
							</div>

							<div class="col-sm-7 text-right">
								<h5 class="inline-block">Total Sale Value: </h5>

								<h4 class="inline-block bold text-primary"><span class="rec" 
								data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> '+unitTotalSaleValue+'</span></h4>
							</div>
						</div>

						<ul id="paymentTable">'

			_.each unitPlanMilestones, (milestone, key) ->
				perc = window.calculatePerc(milestone.amount,unitTotalSaleValue )
				html += '<li style="list-style: none; display: inline">
				<div class="clearfix"></div><span class="msPercent" style="  font-size: 25px;">'+perc+'%</span></li>
						<li class="milestoneList">
								<div class="msName">
									'+milestone.milestone+'
								</div>

								<!--div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue0 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 3,43,343</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service0 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 10,609</span>
									</div>

									<div>
										Total: <span class="total0"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3</span>
									</div>
								</div-->

								<div class="msVal">
									<div>
										<span class="label">Cost Type:</span> <span class=
										"percentageValue10 label"  data-d-group=
										"2" data-m-dec=""> '+milestone.cost_type+'</span>
									</div>

									<div>
										<span class="label">Due Date:</span> <span class=
										"service10 label"  data-d-group="2"
										data-m-dec=""> '+milestone.milestone_date+'</span>
									</div>

									<div>
										Total Amount: <span class="total10" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> '+milestone.amount+'</span>
									</div>
								</div><span class="barBg" style="width:'+perc+'%"></span>
							</li>'	

			html += '</ul>
					</div>'
							
			$('.images').html html
			$('.booking').addClass('current')
			$('.master').removeClass('current')
			$('.gallery').removeClass('current')
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
							<div class="text-primary"><span class="text-primary facts-icon icon-rupee-icn"></span>'+window.numDifferentiation(response[3])+'</div>
							<!--<div>Area: <span>'+response[0].get('super_built_up_area')+' '+project.get('measurement_units')+'</span></div>	
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
		flag = 0
		@getNextPrevUnit()
		response = @generateLevels()

		html = ''
		$.each response[0],(index,value)->
			flag = 1
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
			flag = 1
			$.each response[1],(index,value)->
				html += '<img data-src="'+value+'" /><span>'+s.replaceAll(response[2][index], "_", " ")+'</span>'
			$('.threeD').addClass('current')
			$('.external').removeClass('current')
			$('.twoD').removeClass('current')
			$('.gallery').removeClass('current')
		
		
		
		$('.images').html html
		$('.level').attr 'class' , 'level Level_0 '+ _.last(response[2])
		
		if response[4]  is 'apartment'
			$('.level').attr 'class' , 'level Level_0 apartment_level'

			
			

				
		if ! _.isUndefined(response[3].get('external3durl'))
			flag = 1
			html = '<div class="external-wrapper">
						<div id="rotate_loader" class="img-loader">
							<div class="square" ></div>
							<div class="square"></div>
							<div class="square last"></div>
							<div class="square clear"></div>
							<div class="square"></div>
							<div class="square last"></div>
							<div class="square clear"></div>
							<div class="square "></div>
							<div class="square last"></div>
						</div>
						<div class="animated fadeIn hidden external-container">
							<img class=" img-responsive external-img"  src="'+response[3].get('external3durl')+'" />
						</div>
					</div>'
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
			flag = 1
			if ! _.isUndefined(response[3].get('galleryurl'))
				$.each response[3].get('galleryurl'),(index,value)->
					html += '<div class="animated fadeIn"><img class="img" data-src="'+value+'" /></div>'

		if response[0].length == 0 &&  response[1].length == 0 && _.isUndefined(response[3].get('external3durl')) && _.isUndefined(response[3].get('galleryurl'))
			@loadMaster()
			flag = 1
			$('.master').addClass('current')
			$('.gallery').removeClass('current')
			$('.threeD').removeClass('current')
			$('.twoD').removeClass('current')
			$('.external').removeClass('current')
		height =  @ui.imagesContainer.height()
		if $(window).width() > 991
			# $('.search-left-content').css('height',height)
			$('.unit-details').mCustomScrollbar
				theme: 'cf-scroll'


		$('.images').html html
		$('.external-img').load ()->
			$('#rotate_loader').addClass 'hidden'
			$('.external-container').removeClass 'hidden'
			
		if flag == 0
			console.log "add Booking markup"
			# $('.images').addClass 'no-image'
			html = '<div class="invoice-items animated fadeIn">
						<div class="row">
							<div class="col-sm-5 form-inline m-b-20">
								<h5 class="inline-block">Payment Plan: </h5><select class="form-control"
								id="paymentplans">
									<option value="3363">
										Payment Plan
									</option>

									<option value="3364">
										Price Breakdown
									</option>
								</select>
							</div>

							<div class="col-sm-7 text-right">
								<h5 class="inline-block">Booking Amount: </h5>

								<h4 class="inline-block bold text-primary"><span class="rec" 
								data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,53,952</span></h4>
							</div>
						</div>

						<ul id="paymentTable">
							<li style="list-style: none"><span class="msPercent">4.5%</span></li>

							<li class="milestoneList milestoneReached">
								<div class="msName">
									Application
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue0 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 3,43,343</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service0 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 10,609</span>
									</div>

									<div>
										Total: <span class="total0"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,53,952</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue10 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,43,343</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service10 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 10,609</span>
									</div>

									<div>
										Total: <span class="total10" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,53,952</span>
									</div>
								</div><span class="barBg" style="width:4.5%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">26%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									Plinth
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue1 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 19,83,761</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service1 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 61,298</span>
									</div>

									<div>
										Total: <span class="total1"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 20,45,059</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue11 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 19,83,761</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service11 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 61,298</span>
									</div>

									<div>
										Total: <span class="total11" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 20,45,059</span>
									</div>
								</div><span class="barBg" style="width:26%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">11%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									1st Slab
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue2 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service2 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span>
									</div>

									<div>
										Total: <span class="total2"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue12 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service12 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span>
									</div>

									<div>
										Total: <span class="total12" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span>
									</div>
								</div><span class="barBg" style="width:11%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">11%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									3rd Slab
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue3 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service3 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span>
									</div>

									<div>
										Total: <span class="total3"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue13 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service13 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span>
									</div>

									<div>
										Total: <span class="total13" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span>
									</div>
								</div><span class="barBg" style="width:11%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">11%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									5th Slab
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue4 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service4 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span>
									</div>

									<div>
										Total: <span class="total4"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue14 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service14 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span>
									</div>

									<div>
										Total: <span class="total14" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span>
									</div>
								</div><span class="barBg" style="width:11%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">11%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									7th Slab
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue5 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service5 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span>
									</div>

									<div>
										Total: <span class="total5"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue15 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service15 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span>
									</div>

									<div>
										Total: <span class="total15" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span>
									</div>
								</div><span class="barBg" style="width:11%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">10.5%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									9th Slab
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue6 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 8,01,134</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service6 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 24,755</span>
									</div>

									<div>
										Total: <span class="total6"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,25,889</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue16 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,01,134</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service16 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 24,755</span>
									</div>

									<div>
										Total: <span class="total16" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,25,889</span>
									</div>
								</div><span class="barBg" style="width:10.5%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">5%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									Brick Work
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue7 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service7 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span>
									</div>

									<div>
										Total: <span class="total7"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue17 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service17 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span>
									</div>

									<div>
										Total: <span class="total17" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span>
									</div>
								</div><span class="barBg" style="width:5%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">5%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									Flooring
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue8 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service8 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span>
									</div>

									<div>
										Total: <span class="total8"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue18 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service18 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span>
									</div>

									<div>
										Total: <span class="total18" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span>
									</div>
								</div><span class="barBg" style="width:5%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div><span class="msPercent">5%</span>
							</li>

							<li class="milestoneList">
								<div class="msName">
									Possession
								</div>

								<div class="msVal discCol">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue9 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service9 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span>
									</div>

									<div>
										Total: <span class="total9"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span>
									</div>
								</div>

								<div class="msVal">
									<div>
										<span class="label">Amount:</span> <span class=
										"percentageValue19 label"  data-d-group=
										"2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span>
									</div>

									<div>
										<span class="label">Service Tax:</span> <span class=
										"service19 label"  data-d-group="2"
										data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span>
									</div>

									<div>
										Total: <span class="total19" 
										data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span>
									</div>
								</div><span class="barBg" style="width:5%"></span>
							</li>

							<li style="list-style: none; display: inline">
								<div class="clearfix"></div>
							</li>
						</ul>
					</div>'

		$(".fancybox").fancybox()
		$('.img').lazyLoadXT(
			# forceLoad : true
			updateEvent: 'load'
			oncomplete : ()->
				$('.img').removeClass "lazy-hidden"
				$('.img').addClass "lazy-loaded"
		)
		@iniTooltip()
		

	loadMaster:->
		$('.master').removeClass 'hidden'
		url = Backbone.history.fragment
		id = url.split('/')[1]
		unit = unitCollection.findWhere
				'id' : parseInt id
		response = window.unit.getUnitDetails(id)
		building = buildingCollection.findWhere
					'id' : parseInt unit.get('building_id')
		if response[2] is 'apartment' || response[2] is 'Penthouse'
			transitionImages = []
			svgs = {}
			breakpoints = building.get 'breakpoints'
			$.each breakpoints,(index,value)->
				svgs[value] = BASEURL+'/projects/'+PROJECTID+'/buildings/'+unit.get('building_id')+'/master-'+value+'.svg'
			
			$.merge transitionImages ,  building.get('building_master')
			first = _.values svgs
			if building.get('building_master').length != 0  
				$('.firstimage').attr('src',transitionImages[breakpoints[0]])
				$('.firstimage').load ()->
					$('.images').load(first[0],()->
						$('.apartment,.amenity').each (ind,item)->
							itemid = parseInt item.id
							$('#'+itemid).attr('class', "no-fill")
						$('#'+id).attr('class' ,'layer svg_active'))
			if building.get('building_master').length == 0 
				$('.master').hide()
			return
		svgs = []
		breakpoints = project.get('breakpoints')
		$.each breakpoints,(index,value)->
			svgs[value] = BASEURL+'/projects/'+PROJECTID+'/master/master-'+value+'.svg'

		
		first = _.values svgs
		transitionImages = []
		$.merge transitionImages ,  project.get('project_master')
		if project.get('project_master').length != 0
			$('.firstimage').attr('src',transitionImages[breakpoints[0]])
			$('.firstimage').load ()->
				$('.images').load(first[0],()->
					$('.villa,.plot,.building,.amenity').each (ind,item)->
						itemid = parseInt item.id
						$('#'+itemid).attr('class', "no-fill")
					$('#'+id).attr('class' ,'layer svg_active'))
		if project.get('project_master').length == 0
			$('.master').hide()

	iniTooltip:->
		$('.next').tooltipster(
				theme: 'tooltipster-shadow circle-tooltip'
				contentAsHTML: true
				onlyOne : true
				arrow : false
				interactive : true
				# animation : 'grow'
				trigger: 'hover'
				position: 'left'
				delay: 50				
		)
		$('.prev').tooltipster(
				theme: 'tooltipster-shadow circle-tooltip'
				contentAsHTML: true
				onlyOne : true
				arrow : false
				interactive : true
				# animation : 'grow'
				trigger: 'hover'
				position: 'right'
				delay: 50				
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
		unitD = unitCollection.findWhere
			id  : unitid
		$.each floor,(index,value)->
			if ! _.isUndefined(value.url2dlayout_image) &&  value.url2dlayout_image != ""
				twoD.push value.url2dlayout_image
			if ! _.isUndefined(value.url3dlayout_image) &&  value.url3dlayout_image != ""
				threeD.push value.url3dlayout_image
			level_name =  'Level  '+ index  
			
			if response[2]  is 'apartment'
				level.push ""
			else
				level.push s.replaceAll('Level '+i, " ", "_")
				
			
			
			i = i + 1	
		[twoD,threeD,level,response[0],response[2]]


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
		url = Backbone.history.fragment
		unitid = parseInt url.split('/')[1]
		
		# get selling value of a unit
		unitPaymentPlan =
			method:"GET"
			url: "#{BASERESTURL}/get-unit-payment-plan" 
			data:
				unit_id : unitid	
					
		$.ajax(unitPaymentPlan).done (resp, textStatus ,xhr)=>
			unitPaymentPlan = resp.data		

			@show new CenterUnitView
						unitPaymentPlan : unitPaymentPlan