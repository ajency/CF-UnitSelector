var React = require('react');

var Details = require('../tabs/details');
var FloorPlan = require('../tabs/floorplan');
var LiveTour = require('../tabs/tour');
var OutsideView = require('../tabs/outerview');

var TabPanes = React.createClass({
  render: function () {
    return (
		<div className="tab-content">		    
		    <Details />
		    <FloorPlan />
		    <LiveTour />
		    <OutsideView />	   
		</div>
    )
  }
});

module.exports = TabPanes;