var APP = require('./components/app');
var React = require('react');
var Api = require('./utils/projectDataAPI');


var PROJECT_ID = window.projectId;


// Make API Call
Api.getProjectData(PROJECT_ID);


React.render(
  <APP />,
  document.getElementById('main'));