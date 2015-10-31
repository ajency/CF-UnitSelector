var React = require('react');

var Details = require('../tabs/details');
var FloorPlan = require('../tabs/floorplan');
var LiveTour = require('../tabs/tour');
var OutsideView = require('../tabs/outerview');
var SocietyAmenities = require('../tabs/amenities');

var TabPanes = React.createClass({
  render: function () {

  	var domToDisplay ;


		if(window.isMobile){
		domToDisplay = (
			<div className="tab-content">		    
		    
		    <Details 
		    	basicDetails = {unitData.basic}
		    	roomData = {unitData.rooms}
		    />

		    <FloorPlan 
		    	url2dlayout = {unitData.basic.url2dlayout}
		    	url3dlayout = {unitData.basic.url3dlayout}
		    />

		    <LiveTour />

		    <OutsideView />	   
		</div>
			);
	}else{

		domToDisplay = (
			<div className="contentOuter col-xs-12 pNone">		    
		    	<Details 
		    	basicDetails = {unitData.basic}
		    	roomData = {unitData.rooms}
		    />

		    <FloorPlan 
		    	url2dlayout = {unitData.basic.url2dlayout}
		    	url3dlayout = {unitData.basic.url3dlayout}
		    />

		    <LiveTour />

		    <OutsideView />
		    <SocietyAmenities
		    allAmenities = {unitData.basic.allAmenities}
		    unitAmenities = {unitData.basic.views}
		     />

			</div>
			);
	}

    return domToDisplay;

  }
});

module.exports = TabPanes;