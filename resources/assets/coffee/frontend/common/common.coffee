#No Found Controller and veiw
class CommonFloor.NothingFoundView extends Marionette.ItemView
	
	template : '#noFound-template'

class CommonFloor.NothingFoundCtrl extends Marionette.RegionController

	initialize:->
		@show new CommonFloor.NothingFoundView

#api required to load second step
CommonFloor.loadJSONData = ()->

	$.ajax
		type : 'GET',
		url  : BASERESTURL+'/project/'+	PROJECTID+'/step-two'
		async : false
		success :(response)->
			#parsing the integer fields 
			response = window.convertToInt(response)
			response = response.data
			response.buildings = 
						[
							{
								"id": 1,
								"building_name": "Buckminster Carney",
								"phase_id": 7,
								"no_of_floors": 3,
								"floor_data": [{"floor_no" :1,"floor_layout_id" : 1}],
								"milestone": 9
								
							},
							{
								"id": 2,
								"building_name": "Drake Silva",
								"phase_id": 10,
								"no_of_floors": 9,
								"floor_data": [{"floor_no" :1,"floor_layout_id" : 1}],
								"milestone": 8
								
							},
							{
								"id": 3,
								"building_name": "Colton Hays",
								"phase_id": 6,
								"no_of_floors": 8,
								"floor_data": [{"floor_no" :1,"floor_layout_id" : 1}],
								"milestone": 3
							}
						]

			response.units = 
					[
						{
							"unit_id": 1,
							"unit_name": "Cullen Rowland",
							"building_id": 1,
							"unit_type": 1,
							"unit_variant_id": 2,
							"facing": 1,
							"views": 5,
							"position": 7,
							"status": 3,
							"floor": 6
						},
						{
							"unit_id": 2,
							"unit_name": "Colby Walters",
							"building_id": 3,
							"unit_type": 1,
							"unit_variant_id": 2,
							"facing": 2,
							"views": 4,
							"position": 2,
							"status": 2,
							"floor": 7
						},
						{
							"unit_id": 3,
							"unit_name": "Merritt Garner",
							"building_id": 3,
							"unit_type": 1,
							"unit_variant_id": 2,
							"facing": 1,
							"views": 9,
							"position": 3,
							"status": 1,
							"floor": 7
						},
						{
							"unit_id": 4,
							"unit_name": "Quentin Whitney",
							"building_id": 3,
							"unit_type": 2,
							"unit_variant_id": 1,
							"facing": 8,
							"views": 3,
							"position": 3,
							"status": 2,
							"floor": 2
						},
						{
							"unit_id": 5,
							"unit_name": "Kevin Jimenez",
							"building_id": 2,
							"unit_type": 2,
							"unit_variant_id": 1,
							"facing": 8,
							"views": 9,
							"position": 2,
							"status": 3,
							"floor": 3
						},
						{
							"unit_id": 6,
							"unit_name": "Brody Jacobs",
							"building_id": 3,
							"unit_type": 1,
							"unit_variant_id": 1,
							"facing": 1,
							"views": 10,
							"position": 3,
							"status": 3,
							"floor": 7
						},
						{
							"unit_id": 7,
							"unit_name": "Nehru Jennings",
							"building_id": 1,
							"unit_type": 2,
							"unit_variant_id": 2,
							"facing": 5,
							"views": 8,
							"position": 3,
							"status": 1,
							"floor": 6
						},
						{
							"unit_id": 8,
							"unit_name": "George Bowen",
							"building_id": 3,
							"unit_type": 2,
							"unit_variant_id": 2,
							"facing": 3,
							"views": 8,
							"position": 6,
							"status": 3,
							"floor": 3
						}

					]

			response.apartment_variants   = 
				[
					{ 
						"id":1,
						"unit_type_id" : 2
						"name":"1009",
						"types" : ["1BHK","2BHK"],
						"carpet_area":"689",
						"sellable_area":"1009",
						"terrace_area":"87",
						"per_sq_ft_price" : 122,
						"url2dlayout_image":"http://lorempixel.com/640/480",
						"url3dlayout_image":"http://lorempixel.com/640/480",
						"floor":[
								{"room_type":"Living\/Dining","room_size":"215","room_type_id":68},
								{"room_type":"Terrace","room_size":"88","room_type_id":70},
								{"room_type":"Master Bedroom","room_size":"147","room_type_id":83},
								{"room_type":"Master Bath","room_size":"36","room_type_id":84},
								{"room_type":"Bedroom 02","room_size":"124","room_type_id":81},
								{"room_type":"Bathroom 02","room_size":"41","room_type_id":85},
								{"room_type":"Kitchen","room_size":"74","room_type_id":75}],
						"terrace_options":98
					},
					{ 	
						"id":2,
						"unit_type_id" : 1
						"name":"1009",
						"types" : ["1BHK","2BHK"],
						"carpet_area":"689",
						"sellable_area":"1009",
						"terrace_area":"87",
						"per_sq_ft_price" : 122,
						"url2dlayout_image":"http://lorempixel.com/640/480",
						"url3dlayout_image":"http://lorempixel.com/640/480",
						"floor":[
								{"room_type":"Living\/Dining","room_size":"215","room_type_id":68},
								{"room_type":"Terrace","room_size":"88","room_type_id":70},
								{"room_type":"Master Bedroom","room_size":"147","room_type_id":83},
								{"room_type":"Master Bath","room_size":"36","room_type_id":84},
								{"room_type":"Bedroom 02","room_size":"124","room_type_id":81},
								{"room_type":"Bathroom 02","room_size":"41","room_type_id":85},
								{"room_type":"Kitchen","room_size":"74","room_type_id":75}],
						"terrace_options":98
					}
				]
			bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants)
			settings.setSettingsAttributes(response.settings)
			unitCollection.setUnitAttributes(response.units)
			unitTypeCollection.setUnitTypeAttributes(response.unit_types)
			buildingCollection.setBuildingAttributes(response.buildings)
			apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants)
			floorLayoutCollection.setFloorLayoutAttributes(response.floor_layout)
			
		error :(response)->
			console.log "aaaaaaaaaaassdff"

#find the property type with maximum number of units
CommonFloor.propertyMaxUnits = ()->
	Router = []
	Router.push 
		'type'  : 'bunglows'
		'count' :bunglowVariantCollection.getBunglowUnits()
	Router.push 
		'type'  : 'building'
		'count' :apartmentVariantCollection.getApartmentUnits()
	console.log Router
	controller = _.max Router , (item)->
		return parseInt item.count.length

	controller	

	
#function to load the default controller
CommonFloor.checkPropertyType = ()->
	CommonFloor.loadJSONData()
	controller = CommonFloor.propertyMaxUnits()
	if project.get('project_master').front  == ""
		CommonFloor.navigate '#/list-view' , true
	else
		CommonFloor.navigate '#/master-view' , true

#function to load the default controller
CommonFloor.checkListView = ()->
	controller = CommonFloor.propertyMaxUnits()
	#CommonFloor.navigate '#/list-view/'+controller.type , true


#funtion to convert string into integers
window.convertToInt = (response)->
	$.each response ,(index,value)->
		$.map(value,(item)->

			$.each item ,(ind,val)->
				return parseInt val



		)





