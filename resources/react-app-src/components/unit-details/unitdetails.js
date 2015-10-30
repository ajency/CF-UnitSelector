var React = require('react');
var AppStore = require('../../stores/app-store.js');
var TabHeader = require('../tabs/tabheader');
var TabPanes = require('../tabs/tabpanes');
var TabFooter = require('../tabs/tabfooter');
var SimilarUnits = require('../tabs/similarunits');

function getUnitStateData(unitId){
    return AppStore.getUnitStateData(unitId);
}



var UnitDetails = React.createClass({

	getInitialState: function() {
		
		var unitId;
		unitId = this.props.unitId;
		

        return getUnitStateData(unitId);
    },

    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
    },  
     
    _onChange:function(){
    	var unitId;
		unitId = this.props.unitId;
      	this.setState(getUnitStateData(unitId));
    },  

    ordinalSuffixof:function (i) {
	    var j = i % 10,
	        k = i % 100;
	    if (j == 1 && k != 11) {
	        return i + "st";
	    }
	    if (j == 2 && k != 12) {
	        return i + "nd";
	    }
	    if (j == 3 && k != 13) {
	        return i + "rd";
	    }
	    return i + "th";
	}, 

	getFormattedUnitData: function(unformattedData){
		var unitData = {};
		var basicData = {};
		var roomData = [];

		// initialise data
		basicData.name="";
		basicData.direction="";
		basicData.sellingAmount="";
		basicData.propertyTypeName="";
		basicData.status="";
		basicData.floor="";
		basicData.superBuiltUpArea="";
		basicData.builtUpArea="";
		basicData.buildingName="";
		basicData.url2dlayout="";
		basicData.url3dlayout="";

		basicData.variantAttributes = "";
		basicData.views = "";
		basicData.allAmenities = "";
		unitData.similarUnits = "";

		unitData.basic = basicData;
		unitData.rooms = roomData;

		unit = unformattedData;

		if(!_.isEmpty(unit)){

			unitData.basic.name = unit.unit_name;
			unitData.basic.cfProjectId = unit.cfProjectId;
			unitData.basic.direction = unit.direction;
			unitData.basic.sellingAmount= unit.selling_amount;
			unitData.basic.propertyTypeName= unit.propertyTypeName;
			unitData.basic.status = unit.availability;
			unitData.basic.floor= this.ordinalSuffixof(unit.floor);
			unitData.basic.superBuiltUpArea= unit.variantData.super_built_up_area;
			unitData.basic.builtUpArea = unit.variantData.built_up_area;
			unitData.basic.buildingName = unit.buildingData.building_name;
			unitData.basic.unitTypeName = unit.variantData.unitTypeName;

			unitData.basic.variantAttributes = unit.variantData.variant_attributes;
			unitData.basic.views = unit.views;
			unitData.basic.allAmenities = unit.allAmenities;
			unitData.similarUnits = unit.similarUnits;

			floorData = unit.variantData.floor
			groundfloorData = floorData[0];

			unitData.basic.url2dlayout = groundfloorData.url2dlayout_image;
			unitData.basic.url3dlayout = groundfloorData.url3dlayout_image;

			unitData.rooms = groundfloorData.rooms_data;
		}

		return unitData;


	},  

	
	render: function() {

		var domToDisplay;

		var unitId = this.props.unitId;
		var projectId ;

		unitData = this.getFormattedUnitData(this.state);
		projectId = unitData.basic.cfProjectId;
		status = unitData.basic.status;

		buildingName = unitData.basic.buildingName;
		propertyTypeName = unitData.basic.propertyTypeName;
		unitTypeName = unitData.basic.unitTypeName;


		if(window.isMobile){
		domToDisplay = (
			<div>
				<TabHeader
					buildingName={buildingName}
					unitTypeName={unitTypeName}
					propertyTypeName={propertyTypeName}
				/>
				<TabPanes
					unitData = {unitData}
				/>
				<TabFooter
					unitId = {unitId}
					projectId = {projectId}
					unitStatus = {status}
				/>
			</div>
		)
		}else{
			domToDisplay = (
			<div className="container-fluid step4Desk">
				<TabHeader
					buildingName={buildingName}
					unitTypeName={unitTypeName}
					propertyTypeName={propertyTypeName}					
					unitData = {unitData}
				/>
				<TabPanes
					unitData = {unitData}
				/>
				<SimilarUnits />
			</div>
		)
		}
		return domToDisplay;
	}
});

module.exports = UnitDetails;