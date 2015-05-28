#View and Controller for a villa
#Function to show the details of a villa if marked
#event handler functions

class AuthoringTool.VillaView extends Marionette.ItemView

	template :  Handlebars.compile('<form id="add-form"><div class="form-group">
					 <label for="exampleInputPassword1">Units</label>
					<select class="form-control units">
						<option value="">Select</option>
						{{#options}}
						 <option value="{{id}}">{{name}}</option>
						{{/options}}
					  
					 </select>
				   </div><form>')


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
		data


	events:
		'change @ui.units':(e)->
			$('.villa').each (index,value)->
				if value.id is $(e.target).val()
					$('.alert').text 'Already assigned'
					window.hideAlert()
					return 

class AuthoringTool.VillaCtrl extends Marionette.RegionController

	initialize :->
		units = bunglowVariantCollection.getBunglowUnits()
		@show new AuthoringTool.VillaView
				units : units