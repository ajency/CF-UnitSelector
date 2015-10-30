#View and Controller for a building
#Function to show the details of an building if marked
#event handler functions

class AuthoringTool.FloorGroupView extends Marionette.ItemView

	template : Handlebars.compile('<form id="add-form"><div class="form-group">
					 <label  class="unit-label" for="exampleInputPassword1">Group Name</label>
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
				'id' : val['id']
				'name' : val['name']
		data.options = options
		data

	onShow:->
		units = buildingCollection
		if units.length == 0 && EDITMODE is false
			@ui.units.hide()
			@ui.unitLabel.hide()
			$('.alert').text 'No Floor Groups'
			window.hideAlert()

class AuthoringTool.FloorGroupCtrl extends Marionette.RegionController

	initialize :->
		buildings = buildingCollection.toArray()
		building = _.where(buildings, {id: parseInt(building_id) })
		 
		attributes = _.pluck(building, 'attributes')
		units = _.pluck(attributes, 'floor_group')
	 
		@show new AuthoringTool.FloorGroupView
				units : units[0]