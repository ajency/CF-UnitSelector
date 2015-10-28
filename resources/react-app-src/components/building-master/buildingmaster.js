var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var AppStore = require('../../stores/app-store.js');
var NavBar = require('../project-master/navbar');
var SideBar = require('../project-master/sidebar');
var PageContent = require('../project-master/pagecontent');
var SunToggle = require('../project-master/suntoggle');
var Rotate = require('../project-master/rotate');
var ProjectImage = require('../project-master/projectimage');
var ImageContainerTemplate = require('../project-master/imagecontainertemplate');
var CardList = require('../project-master/cardlist');
var FilterPopover = require('../filter/filterpopover');
var immutabilityHelpers = require('react-addons-update');
var ReactDOM = require('react-dom');
var Modal = require('../modal/modal');



function getBuildingStateData(buildingId){
    return AppStore.getBuildingMasterStateData(buildingId);
}


var BuildingMaster = React.createClass({


    getInitialState: function() {
        var buildingId;
        buildingId = this.props.buildingId;

        return getBuildingStateData(buildingId);
    },

    render: function(){
        var data = this.state.data;
        
        var projectTitle = data.projectTitle;
        var projectLogo = data.projectLogo;
        var unitCount = data.totalCount;
        var buildings = data.buildings;
        var breakpoints = data.breakpoints;
        var applied_filters = data.applied_filters;
        var isFilterApplied = data.isFilterApplied;

        var filterTypes = data.filterTypes;

        var unitIndexToHighlight = data.unitIndexToHighlight;

        var buildingToHighlight = buildings[unitIndexToHighlight];

        var availableUnitData = buildings.availableUnitData;
        var filteredUnitData = buildings.filteredUnitData;

        var domToDisplay;
        var modalData = {};

        modalData.filterTypes = filterTypes;
        modalData.search_filters = data.search_filters;
        modalData.projectData = {title:projectTitle,projectLogo:projectLogo};

        // display dom based on whether it is a mobile or a desktop view
        if(window.isMobile){
            domToDisplay = (
                <div>
                	<h5>This is step 2</h5>
 
                </div>
            );
        }
        else{
            domToDisplay = (
                <div id="wrapper">
       
                </div>
            );            
        }


        return domToDisplay;
    }
});

module.exports = BuildingMaster;

