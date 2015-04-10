#Settings model Definition
class Settings extends Backbone.Model

	

	# set attributes of a Settings model
	# if blank,fetch it from the server with the url mentioned above.
	setSettingsAttributes:(data)->

		# @set settingsData
		settings.set data

		

window.settings  = new Settings;		

		

	
		