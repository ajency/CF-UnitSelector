var APP = require('./components/app');
var React = require('react');
var ReactDOM = require('react-dom');
var Api = require('./utils/projectDataAPI');


var PROJECT_ID = window.projectId;


// Make API Call
Api.getProjectData(PROJECT_ID);


ReactDOM.render(
  <APP />,
  document.getElementById('main'));