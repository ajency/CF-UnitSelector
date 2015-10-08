var React = require('react');

var  BuildingMaster = React.createClass({
	
	render: function() {
		console.log(this.props.params);
		return (<div><h3>This is Apartment Selection for a building</h3></div>);
	}
});

module.exports = BuildingMaster;