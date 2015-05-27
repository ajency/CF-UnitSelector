#View and Controller for a villa
#Function to show the details of a villa if marked
#event handler functions

class AuthoringTool.VillaView extends Marionette.ItemView

	template : '<div class="form-group">
                     <label for="exampleInputPassword1">Units</label>
                    <select class="form-control units">
                       <option value="1">Villa 1</option>
                       <option value="2">Villa 2</option>
                       <option value="3">Villa 3</option>
                       <option value="4">Villa 4</option>
                       <option value="5">Villa 5</option>
                     </select>
                   </div>'

class AuthoringTool.VillaCtrl extends Marionette.RegionController

	initialize :->
		@show new AuthoringTool.VillaView