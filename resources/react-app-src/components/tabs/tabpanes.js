var React = require('react');

var Details = require('../tabs/details');
var FloorPlan = require('../tabs/floorplan');
var LiveTour = require('../tabs/tour');
var OutsideView = require('../tabs/outerview');

var TabPanes = React.createClass({
  render: function () {

  	var domToDisplay ;


		if(window.isMobile){
		domToDisplay = (
			<div className="tab-content">		    
		    	<Details />
		    	<FloorPlan />
		    	<LiveTour />
		    	<OutsideView />	   
			</div>
			);
	}else{
		domToDisplay = (
			<div className="contentOuter col-xs-12 pNone">		    
		    	<Details />
		    	<FloorPlan />
		    	<LiveTour />
		    	<OutsideView />	   
			</div>
			);
	}

    return domToDisplay;
  }
});

module.exports = TabPanes;