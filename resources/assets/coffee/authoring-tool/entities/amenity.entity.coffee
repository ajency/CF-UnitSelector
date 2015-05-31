#View and Controller for a plot
#Function to show the details of a plot if marked
#event handler functions

class AuthoringTool.AmenityView extends Marionette.ItemView

	template : '<form id="add-form">
					<div class="form-group">
                            <label for="markerTitle">Title</label>
                            <input type="text" class="form-control" id="amenity-title">
                    </div>
                    <div class="form-group">
                        <label for="Description">Description</label>
                        <textarea class="form-control" rows="3" id="amenity-description"></textarea>
                    </div>
                        <div>
                           <label for="Image">Image</label>
                          <div class="input-group">
                              <input type="text" class="form-control">
                              <span class="input-group-btn">
                              <button class="btn btn-default btn-orange" type="button">Upload</button>
                               </span>
                    		</div>
                        </div>
                </form>'


	ui :
		units : '.units'

	serializeData:->
		data = super()
		options = []
		units = Marionette.getOption(@,'units')
		$.each units, (ind,val)->
			options.push 
				'id' : val.get 'id'
				'name' : val.get 'unit_name'
		data.options = options
		console.log data
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

class AuthoringTool.AmenityCtrl extends Marionette.RegionController

	initialize :->
		units = plotVariantCollection.getPlotUnits()
		@show new AuthoringTool.AmenityView
				units : units