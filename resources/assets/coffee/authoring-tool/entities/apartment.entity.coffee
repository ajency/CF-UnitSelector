#View and Controller for apartment/penthouse
#Function to show the details of an apartment if marked
#event handler functions

#NOTE: Frontend treats apartment and penthouse as the same thing

class AuthoringTool.ApartmentView extends Marionette.ItemView

	template :  Handlebars.compile('<form id="add-form"><div class="form-group">
					<label class="unit-label" for="exampleInputPassword1">Units</label>
					<select class="form-control units">
						<option value="">Select</option>
						{{#options}}
						 <option value="{{id}}">{{name}}</option>
						{{/options}}
					  
					 </select>
				   </div>
				   <div class="form-group">
					<label class="floor-group-label" for="exampleInputPassword1">Group</label>
					<select class="form-control floor-group">
						<option value="">Select</option>
						{{#floorgroupoptions}}
						 <option value="{{id}}">{{name}}</option>
						{{/floorgroupoptions}}
					  
					 </select>
				   </div>
				   <div class="checkbox"> <label> <input type="checkbox" name="check_primary"> Mark as primary unit </label> </div>
				   <form>')


	ui :
		units : '.units'
		unitLabel : '.unit-label'
		floorGroup : '.floor-group'
		unitLabel : '.floor-group-label'


	serializeData:->
		data = super()
		options = []
		floorgroupoptions = []
		units = Marionette.getOption(@,'units')
		$.each units, (ind,val)->
			options.push 
				'id' : val.get 'id'
				'name' : val.get 'unit_name'
		data.options = options

		floorGroup = Marionette.getOption(@,'floorGroup')
		$.each floorGroup, (ind,val)->
			floorgroupoptions.push 
				'id' : val['id']
				'name' : val['name']
		data.floorgroupoptions = floorgroupoptions
		
		data


	events:
		'change @ui.units':(e)->
			window.coord = 0
			$('.villa').each (index,value)->
				if value.id is $(e.target).val()
					$('.alert').text 'Already assigned'
					window.coord = 1
					window.hideAlert()
					return 

	onShow:->
		units = Marionette.getOption(@,'units')
		if units.length == 0 && EDITMODE is false
			@ui.units.hide()
			@ui.unitLabel.hide()
			$('.alert').text 'No apartments'
			window.hideAlert()

class AuthoringTool.ApartmentCtrl extends Marionette.RegionController

	initialize :->
		units = []
		floorGroup = []
		buildings = buildingCollection.toArray()
		building = _.where(buildings, {id: parseInt(building_id) })
		attributes = _.pluck(building, 'attributes')
		floor_group = _.pluck(attributes, 'floor_group')

		$.merge units , apartmentVariantCollection.getApartmentUnits()
		$.merge units , apartmentVariantCollection.getPenthouseUnits()
		temp = new Backbone.Collection units
		newUnits = temp.where
				'building_id' : parseInt building_id
		@show new AuthoringTool.ApartmentView
				units : newUnits
				floorGroup : floor_group[0]