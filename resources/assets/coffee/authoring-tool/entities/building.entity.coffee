#View and Controller for a building
#Function to show the details of an building if marked
#event handler functions

class AuthoringTool.BuildingView extends Marionette.ItemView

	template : Handlebars.compile('<form id="add-form"><div class="form-group">
					 <label  class="unit-label" for="exampleInputPassword1">Units</label>
					<select class="form-control units">
						<option value="">Select</option>
					   {{#options}}
						 <option value="{{id}}">{{name}}</option>
						{{/options}}
					 </select>
				   </div>
				   <div class="checkbox"> <label> <input type="checkbox" name="check_primary"> Mark as primary unit </label> </div>
				   </form>')


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
				'name' : val.get 'building_name'
		data.options = options
		data

	onShow:->
		units = buildingCollection
		if units.length == 0
			@ui.units.hide()
			@ui.unitLabel.hide()
			$('.alert').text 'All buildings marked'
			window.hideAlert()

class AuthoringTool.BuildingCtrl extends Marionette.RegionController

	initialize :->
		units = buildingCollection.toArray()
		@show new AuthoringTool.BuildingView
				units : units