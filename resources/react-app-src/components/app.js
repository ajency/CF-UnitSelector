var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var ProjectMaster = require('./project-master/projectmaster');
var BuildingMaster = require('./building-master/buildingmaster');
var ReactRouter = require('react-router')
var Template = require('./app-template');

// Rename Router.Route for convenience

var Router = ReactRouter.Router
var Route = ReactRouter.Route


var APP = React.createClass({

  render: function() {
  return (
      <Router>
        <Route path="/" component={ProjectMaster}>
            <Route path="building" component={BuildingMaster}/>
        </Route>
      </Router>
    );

  }
});


module.exports = APP;
