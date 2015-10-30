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

var qtipSettings = { // Grab some elements to apply the tooltip to
            content: "Dummy Text",
            show: {
                when: false, // Don't specify a show event
                ready: true // Show the tooltip when ready
            },
            hide: false,
            style: {
                classes: 'qtip-light',
                tip: {
                    corner: 'bottom center',
                    mimic: 'bottom left',
                    border: 1,
                    width: 88,
                    height: 66
                }
            } // Don't specify a hide event
        };



function getBuildingStateData(buildingId){
    return AppStore.getBuildingMasterStateData(buildingId);
}


var BuildingMaster = React.createClass({


    getInitialState: function() {
        var buildingId;
        buildingId = this.props.buildingId;

        return getBuildingStateData(buildingId);
    },

    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
    },     

    _onChange:function(){
        var buildingId;
        buildingId = this.props.buildingId;
        this.setState(getBuildingStateData(buildingId));
    },  

    showFilterModal: function(){
        $(ReactDOM.findDOMNode(this.refs.modal)).modal();
    },  

    toggelSunView: function(evt){
        $clickedDiv = $(evt.currentTarget);

        if($clickedDiv.hasClass('sun-highlight')){
            showShadow = false;
        }
        else{
            showShadow = true;    
        }

        // dataToSet = {
        //     property: "showShadow",
        //     value: showShadow
        // }

        // this.updateStateData([dataToSet]);

    },
    selectFilter: function(evt){
        isChecked = evt.target.checked;

        filterType = $(evt.target).data("filtertype");
        filterStyle = $(evt.target).data("filterstyle");
        

        if(filterStyle && filterStyle === 'range'){
        filterValue = [evt.min,evt.max];
        this.updateSearchFilters(filterType, filterValue, filterStyle);            
        }else{
           filterValue = $(evt.target).val();
           this.updateSearchFilters(filterType, filterValue); 
       }        

    },

    updateSearchFilters: function(filterType, filterValue, filterStyle){
        dataToSet = {
            property: "search_filters",
            filterType: filterType,
            filterStyle: filterStyle,
            value: filterValue
        }
       
        // this.updateStateData([dataToSet]);
    }, 

    applyFilters: function(evt){

        console.log("Apply filters");

        this.destroyTooltip();

        var totalFilterApplied = AppStore.getFilteredCount(this.state.data.search_filters);

        if(totalFilterApplied === 0){
            dataToSet ={
                property: "reset_filters",
                value: {}
            };
        }else{
            dataToSet = {
            property: "applied_filters",
            value: this.state.data.search_filters
        };
        }

        
        // this.updateStateData([dataToSet]);

        // this.updateProjectMasterData();


    },

    unapplyFilters: function(evt){

        console.log("Un Apply filters");
        this.destroyTooltip();

        dataToSet ={
            property: "reset_filters",
            value: {}
        };

        // this.updateStateData([dataToSet]);

        // this.updateProjectMasterData();


    }, 

    updateChosenBreakPoint: function(chosenBreakPoint){
        dataToSet = {
            property: "chosenBreakpoint",
            value: chosenBreakPoint
        }

        // this.updateStateData([dataToSet]);
    },  

    showTooltip: function(text){

 
        // var classname = ".show-qtooltip";
   
        // // initialise qtip

        // qtipSettings['content'] = text;

        // $(classname).qtip(qtipSettings);
    },         

    render: function(){
        var projectTitle,projectLogo,unitCount,buildings,isFilterApplied,applied_filters,availableUnitCount;
        data = this.state.data;
        if(data.buildings.length!=0){
            buildings = data.buildings;
            selectedBuilding = buildings[0];
            projectTitle = selectedBuilding.building_name;
            availableUnitCount = selectedBuilding.availableUnitData.length;
            filteredUnitCount = selectedBuilding.filteredUnitData.length;


            projectLogo = data.projectLogo;
            applied_filters = data.applied_filters;
            isFilterApplied = data.isFilterApplied;

        }

        var modalData = {};

        modalData.filterTypes = data.filterTypes;
        modalData.search_filters = data.search_filters;
        modalData.projectData = {title:projectTitle,projectLogo:projectLogo};

        buildingToHighlight = {};
        // display dom based on whether it is a mobile or a desktop view
        if(window.isMobile){
            domToDisplay = (
                <div className="site-wrapper animsition" data-animsition-in="fade-in" data-animsition-out="fade-out">
                    <NavBar 
                        projectTitle = {projectTitle} 
                        projectLogo = {projectLogo} 
                        unitCount = {availableUnitCount}
                        showFilterModal = {this.showFilterModal}
                        buildings = {buildings}
                        isFilterApplied = {isFilterApplied}
                        applied_filters = {applied_filters}
                    />  
                    <Modal 
                        ref="modal" 
                        modalPurpose = "filterModal"
                        modalData={modalData}
                        selectFilter={this.selectFilter}
                        applyFilters = {this.applyFilters}
                        unapplyFilters = {this.unapplyFilters}
                    />   
                    <SunToggle 
                        toggelSunView = {this.toggelSunView} 
                        showShadow={data.showShadow}
                    />
                    <ImageContainerTemplate 
                        ref= "imageContainer"
                        showShadow={data.showShadow}
                        imageType="buildings"
                        breakpoints = {data.breakpoints}
                        chosenBreakpoint = {data.chosenBreakpoint}
                        updateChosenBreakPoint = {this.updateChosenBreakPoint}
                        updateRotateShadow = {this.updateRotateShadow}
                        buildings =  {buildings}
                        buildingId = {this.props.buildingId}
                        buildingToHighlight = {buildingToHighlight}
                        destroyTooltip = {this.destroyTooltip}
                        showTooltip = {this.showTooltip}
                        updateUnitIndexToHighlight = {this.updateUnitIndexToHighlight}
                    />                    
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

