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
      
                    <SideBar
                        projectTitle = {projectTitle} 
                        projectLogo = {projectLogo}
                        unitCount = {unitCount}
                        buildings = {buildings}
                        isFilterApplied = {isFilterApplied}
                        applied_filters = {applied_filters}                    
                        ref = "sideBarList"
                        isFilterApplied = {isFilterApplied}
                        rotateImage = {this.rotateImage}
                        destroyTooltip = {this.destroyTooltip} 
                        unitIndexToHighlight = {unitIndexToHighlight}                   
                    />

                    <div id="page-content-wrapper">

                        <ImageContainerTemplate
                            ref= "imageContainer"
                            showShadow={data.showShadow}
                            breakpoints = {data.breakpoints}
                            chosenBreakpoint = {data.chosenBreakpoint}
                            updateChosenBreakPoint = {this.updateChosenBreakPoint}
                            updateRotateShadow = {this.updateRotateShadow}
                            buildings =  {buildings}
                            buildingToHighlight = {buildingToHighlight}
                            destroyTooltip = {this.destroyTooltip}
                            showTooltip = {this.showTooltip}                        
                        />
                        

                        <div className="container-fluid">

                            <div className="navbar-header">
                                <div className="row">
                                    
                                    <SunToggle 
                                        toggelSunView = {this.toggelSunView} 
                                        showShadow={data.showShadow}
                                    />                                    

                                    <div className="col-sm-3 col-sm-offset-3">
                                        <FilterPopover
                                            filterTypes={filterTypes}
                                            selectFilter={this.selectFilter}
                                            search_filters={data.search_filters}
                                            applyFilters = {this.applyFilters}
                                            unapplyFilters = {this.unapplyFilters}
                                            applied_filters = {applied_filters}                                       
                                        />
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="pull-right text-center text-uppercase">
                                            <button type="button" 
                                                className="btn btn-default btn-sm btn-primary" 
                                                data-toggle="modal" data-target="#contactModal" 
                                                onClick={this.showContactModal} 
                                            >
                                                <i className="fa fa-phone"></i>
                                                <span className="enquiryText text-uppercase">Contact Us</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        
                        </div>

                    <Modal 
                        ref="contactModal" 
                        modalData = {modalData}
                        modalPurpose = "contactModal"
                    />

                    </div>

       
                </div>
            );            
        }


        return domToDisplay;
    }
});

module.exports = BuildingMaster;

