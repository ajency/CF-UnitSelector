var React = require('react');
var Router = require('react-router');

// Rename Router.Route for convenience
var Route = Router.Route;

// Create parent App component
var RouterApp = React.createClass({
	
	// just a method for making variables available in child components without passing them down via props
	contextTypes: {
		router: React.PropTypes.func
	},

	render: function() {
		return (
			<div>{this.context.router.getCurrentPath()}</div>
		);
	}
});

module.exports = RouterApp;

