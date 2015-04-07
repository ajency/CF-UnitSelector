# Handlebars Localisation Helper
# Source: https://gist.github.com/tracend/3261055
Handlebars.registerHelper 'l10n', (keyword)->


	appStates :
		'project':
			url : '/project'
			sections : 
				'top' : 
					ctrl : 'TopCtrl'
				'left' : 
					ctrl : 'LeftCtrl'
				'center' : 
					ctrl : 'CenterCtrl'
			

	lang = if (navigator.language) then navigator.language else navigator.userLanguage 
 
	# pick the right dictionary (if only one available assume it's the right one...)
	locale = window.locale[lang] or window.locale['en-US'] or window.locale or false
	
	# exit now if there's no data
	if not locale then return keyword
	
	# loop through all the key hierarchy (if any)
	target = locale
	key = keyword.split(".")
	for i in key
		target = target[key[i]]


	# fallback to the original string if nothing found
	target = target || keyword	
	#output
	target
