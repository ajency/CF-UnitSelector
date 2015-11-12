var APP = require('./components/app');
var React = require('react');
var ReactDOM = require('react-dom');
var Api = require('./utils/projectDataAPI');


var PROJECT_ID = window.projectId;

SpriteSpin._originalStopAnimation = SpriteSpin.stopAnimation;
 
SpriteSpin.stopAnimation = function(data){
    SpriteSpin._originalStopAnimation(data);
    data.target.trigger('onAnimationStop');
};
  
// Make API Call
Api.getProjectData(PROJECT_ID);


ReactDOM.render(
  <APP />,
  document.getElementById('main'));