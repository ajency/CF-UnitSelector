#View and Controller for a plot
#Function to show the details of a plot if marked
#event handler functions

class AuthoringTool.PlotView extends Marionette.ItemView

	template : '<div class="form-group">
                     <label for="exampleInputPassword1">Units</label>
                    <select class="form-control units">
                       <option value="1">Plot 1</option>
                       <option value="2">Plot 2</option>
                       <option value="3">Plot 3</option>
                       <option value="4">Plot 4</option>
                       <option value="5">Plot 5</option>
                     </select>
                   </div>'

class AuthoringTool.PlotCtrl extends Marionette.RegionController

	initialize :->
		@show new AuthoringTool.PlotView