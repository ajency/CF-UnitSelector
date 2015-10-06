var APP = require('./components/app');
var React = require('react');
var Api = require('./utils/projectDataAPI');
var Router = require('react-router');

var PROJECT_ID = window.projectId;

// Rename Router.Route for convenience
var Route = Router.Route;
var Link = Router.Link;

// Make API Call
Api.getProjectData(PROJECT_ID);
var  Building = React.createClass({
  render: function() {
    return (<h3>This is Apartment Selection for a building</h3>);
  }
});


var RouteHandler = Router.RouteHandler;

var App = React.createClass({

  render: function() {
  return (
      <div>
        <RouteHandler/>
      </div>
    );

  }
});
var routes = (
  <Route handler={App}>
    <Route path="project" handler={APP}/>
    <Route path="building" handler={Building}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('main'));
});