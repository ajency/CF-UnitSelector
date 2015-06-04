#View and Controller for a villa
#Function to show the details of a villa if marked
#event handler functions

class AuthoringTool.ProjectView extends Marionette.ItemView

	template :  Handlebars.compile('<form id="add-form">
					<div class="form-group">
						<label class="unit-label" for="exampleInputPassword1">Name</label>
						<input type="text" class="form-control" id="" value="{{title}}" disabled>
				    </div>
                    <div class="form-group">
                        <label for="Address">Address</label>
                        <textarea class="form-control" rows="2" id="" disabled>{{address}}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="City">City</label>
                        <input type="text" class="form-control" id="" value="{{city}}" disabled>
                    </div>                    
				   <form>')


	ui :
		units : '.units'
		unitLabel : '.unit-label'


	serializeData:->
		data = super()
		project_data = Marionette.getOption(@,'project_data')
		data.title = project_data['title']
		data.address = project_data['project_address']
		data.city = project_data['city']
		data

class AuthoringTool.ProjectCtrl extends Marionette.RegionController

	initialize :(opts)->
		console.log opts
		@show new AuthoringTool.ProjectView
				project_data : project_data