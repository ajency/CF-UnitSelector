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
				   </div><form>')


	ui :
		units : '.units'
		unitLabel : '.unit-label'


	serializeData:->
		data = super()
		options = []
		units = Marionette.getOption(@,'units')
		$.each units, (ind,val)->
			options.push 
				'id' : val.get 'id'
				'name' : val.get 'unit_name'
		data.options = options
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
		units = apartmentVariantCollection.getApartmentUnits()
		if units.length == 0
			@ui.units.hide()
			@ui.unitLabel.hide()
			$('.alert').text 'All apartments marked'
			window.hideAlert()

class AuthoringTool.ApartmentCtrl extends Marionette.RegionController

	initialize :->
		units = apartmentVariantCollection.getApartmentUnits()
		@show new AuthoringTool.ApartmentView
				units : units