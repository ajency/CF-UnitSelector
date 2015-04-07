#Settings model Definition
class Settings extends Backbone.Model

	#url to fetch Settings data
	urlRoot :->
		"http://commonfloor.local/methods/functions.php?action=load_settings"



	# set attributes of a Settings model
	# if blank,fetch it from the server with the url mentioned above.
	setSettingsAttributes:(settingsData = {},project_id)->

		# @set settingsData
		if jQuery.isEmptyObject(@toJSON()) 
			settings.fetch(
				async: false
				data : 
					project_id : project_id
				success:(collection, response)=>
					if response == 0
						@reset()

			)

		@

		

		

	
		