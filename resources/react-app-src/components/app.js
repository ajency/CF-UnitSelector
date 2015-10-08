var React = require('react');
var ProjectMaster = require('./project-master/projectmaster');
var BuildingMaster = require('./building-master/buildingmaster');
var ReactRouter = require('react-router')
var Template = require('./app-template');

// Rename Router.Route for convenience

var Router = ReactRouter.Router
var Route = ReactRouter.Route


var  Building = React.createClass({
    
    render: function() {
        console.log(this.props.params);
        return (<div><h3>This is Apartment Selection for a building</h3></div>);
    }
});

var APP = React.createClass({

  render: function() {
  return (
      <Router>
        <Route path="/" component={ProjectMaster}>
            <Route path="building" component={Building}/>
        </Route>
      </Router>
    );

  }
});


module.exports = APP;
