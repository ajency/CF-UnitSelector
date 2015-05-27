#View and Controller for a plot
#Function to show the details of a plot if marked
#event handler functions

class AuthoringTool.PlotView extends Marionette.ItemView

	template : '<form id="add-form"><div class="form-group">
					 <label for="exampleInputPassword1">Units</label>
					<select class="form-control units">
						<option value="">Select</option>
					   <option value="1">Plot 1</option>
					   <option value="2">Plot 2</option>
					   <option value="3">Plot 3</option>
					   <option value="4">Plot 4</option>
					   <option value="5">Plot 5</option>
					 </select>
				   </div></form>'


	ui :
		units : '.units'

	events:
		'change @ui.units':(e)->
			$('.plot').each (index,value)->
				if value.id is $(e.target).val()
					$('.alert').text 'Already assigned'
					return 

class AuthoringTool.PlotCtrl extends Marionette.RegionController

	initialize :->
		@show new AuthoringTool.PlotView