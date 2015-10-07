var AppActions = require('../actions/app-actions.js');
var request = require('superagent');
var API_URL = '/api/v1/';
var BASE_URL = 'http://commonfloorlocal.com';

function makeUrl(part) {
    return BASE_URL + API_URL + part;
}

var Api = {

  // Load project data from server via actions
  getProjectData: function(projectId) {

  	var url = makeUrl('project/' + projectId + '/project-data');
  	// var url = BASE_URL+"/project-data.json";


    var data = request
				.get(url)
				.end(function(err, res){
					if (res.ok) {
						AppActions.receiveProjectData(res.body);
					} else {
						var data = {};
						AppActions.receiveProjectData(data);
					}
				    
				});
    
  }
}

module.exports = Api;