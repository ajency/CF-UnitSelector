var AppActions = require('../actions/app-actions.js');
var request = require('superagent');
var no_cache = require('superagent-no-cache');
var API_URL = '/api/v1/';
var BASE_URL = window.baseUrl;

function makeUrl(apiUrl, part) {

    return BASE_URL + apiUrl + part;
}

var Api = {

  // Load project data from server via actions

  getProjectData: function(projectId) {


  	//var url = makeUrl(API_URL, 'project/' + projectId + '/project-data');
  	var url = BASE_URL+"/project-data.json";

    var data = request
				.get(url)
				.use(no_cache)
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
