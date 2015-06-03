#View and Controller for a building
#Function to show the details of an building if marked
#event handler functions

class AuthoringTool.BuildingView extends Marionette.ItemView

	template : Handlebars.compile('<form id="add-form"><div class="form-group">
					 <label for="exampleInputPassword1">Units</label>
					<select class="form-control units">
						<option value="">Select</option>
					   {{#options}}
						 <option value="{{id}}">{{name}}</option>
						{{/options}}
					 </select>
				   </div></form>')


	ui :
		units : '.units'

	serializeData:->
		data = super()
		options = []
		units = Marionette.getOption(@,'units')
		$.each units, (ind,val)->
			options.push 
				'id' : val.get 'id'
				'name' : val.get 'building_name'
		data.options = options
		data

	events:
		'change @ui.units':(e)->
			window.coord = 0
			$('.plot').each (index,value)->
				if value.id is $(e.target).val()
					$('.alert').text 'Already assigned'
					window.hideAlert()
					window.coord = 1
					return 

class AuthoringTool.BuildingCtrl extends Marionette.RegionController

	initialize :->
		units = buildingCollection.toArray()
		@show new AuthoringTool.BuildingView
				units : units