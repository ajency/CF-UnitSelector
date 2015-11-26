var React = require('react');

var Details = require('../tabs/details');
var FloorPlan = require('../tabs/floorplan');
var LiveTour = require('../tabs/tour');
var OutsideView = require('../tabs/outerview');
var SocietyAmenities = require('../tabs/amenities');

var PROJECTID = window.projectId;
var BASEURL = window.baseUrl;

var TabPanes = React.createClass({

  render: function () {
  	var unitData = this.props.unitData;
  	var domToDisplay ;
  	var step1ImgUrl , step1SvgUrl, stepImgUrl, step2SvgUrl, step3ImgUrl, step3SvgUrl;

  	buildingPrimaryBreakPoint = unitData.basic.buildingPrimaryBreakPoint;
  	projectMasterImgs = unitData.basic.projectMasterImgs;

  	unitPrimaryBreakPoint = unitData.basic.primaryBreakPoint;
  	buildingMasterImgs = unitData.basic.buildingMasterImgs;
  	buildingId = unitData.basic.buildingId;

  	step1ImgUrl = projectMasterImgs[buildingPrimaryBreakPoint];
  	step1SvgUrl = BASEURL+'/projects/'+PROJECTID+'/master/master-'+buildingPrimaryBreakPoint+'.svg';


  	step3SvgUrl = BASEURL+'/projects/'+PROJECTID+'/buildings/'+buildingId+'/step-three-'+unitPrimaryBreakPoint+'.svg';
  	step3ImgUrl = buildingMasterImgs[unitPrimaryBreakPoint];

    if(_.isEmpty(unitData.basic.url2dlayout) && _.isEmpty(unitData.basic.url3dlayout)){
      floorplancontent = "";
    }else{
      floorplancontent = (
        <FloorPlan
		    	url2dlayout = {unitData.basic.url2dlayout}
		    	url3dlayout = {unitData.basic.url3dlayout}
		    />
      );
    }

    if(_.isEmpty(unitData.basic.live_tour)){
      livetourcontent = "";
    }else{
      livetourcontent = (
        <LiveTour />
      );
    }

	if(window.isMobile){

		domToDisplay = (
			<div className="tab-content">

		    <Details
		    	basicDetails = {unitData.basic}
		    	roomData = {unitData.rooms}
		    />

      {floorplancontent}
      {livetourcontent}

		    <OutsideView
		    	step1ImgUrl = {step1ImgUrl}
		    	step1SvgUrl = {step1SvgUrl}
		    	step3ImgUrl = {step3ImgUrl}
		    	step3SvgUrl = {step3SvgUrl}
		    	buildingId = {unitData.basic.buildingId}
		    	unitId = {unitData.basic.id}
		    />
		</div>
			);
	}else{

		domToDisplay = (
			<div className="contentOuter col-xs-12 pNone">
		    	<Details
		    	basicDetails = {unitData.basic}
		    	roomData = {unitData.rooms}
		    />

		    {floorplancontent}

		    {livetourcontent}

		    <OutsideView
		    	step1ImgUrl = {step1ImgUrl}
		    	step1SvgUrl = {step1SvgUrl}
		    	step3ImgUrl = {step3ImgUrl}
		    	step3SvgUrl = {step3SvgUrl}
		    	buildingId = {unitData.basic.buildingId}
		    	unitId = {unitData.basic.id}
		    />
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
