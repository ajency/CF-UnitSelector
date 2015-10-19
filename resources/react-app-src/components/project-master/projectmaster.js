var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var AppStore = require('../../stores/app-store.js');
var NavBar = require('../project-master/navbar');
var SunToggle = require('../project-master/suntoggle');
var Rotate = require('../project-master/rotate');
var ProjectImage = require('../project-master/projectimage');
var ImageContainerTemplate = require('../project-master/imagecontainertemplate');
var CardList = require('../project-master/cardlist');
var immutabilityHelpers = require('react-addons-update');
var ReactDOM = require('react-dom');
var Modal = require('../modal/modal');



function getStateData(){
    return AppStore.getStateData();
}


var ProjectMaster = React.createClass({


    getInitialState: function() {
        return getStateData();
    },

    projectDataUpdateCallBack: function(){
        console.log("project State Data  updated");
        spinDom = $(ReactDOM.findDOMNode(this.refs.imageContainer)).find("#spritespin");
        spinApi = spinDom.spritespin("api");

        chosenBreakPoint = this.state.data.chosenBreakpoint
        spinApi.playTo(chosenBreakPoint);

        slideToGotTo = this.state.data.unitIndexToHighlight;
        slickDom = $(ReactDOM.findDOMNode(this.refs.cardList)).find(".slider");
        slickDom.slick('slickGoTo',slideToGotTo);
    },

    updateChosenBreakPoint: function(chosenBreakPoint){
        dataToSet = {
            property: "chosenBreakpoint",
            value: chosenBreakPoint
        }

        this.updateStateData(dataToSet);
    },

    toggelSunView: function(evt){
        $clickedDiv = $(evt.currentTarget);

        if($clickedDiv.hasClass('sun-highlight')){
            showShadow = false;
        }
        else{
            showShadow = true;    
        }

        dataToSet = {
            property: "showShadow",
            value: showShadow
        }

        this.updateStateData(dataToSet);

    },

    updateSearchFilters: function(filterType, filterValue){
        dataToSet = {
            property: "search_filters",
            filterType: filterType,
            value: filterValue
        }

        this.updateStateData(dataToSet);
    },

    selectFilter: function(evt){
        isChecked = evt.target.checked;

        filterType = $(evt.target).data("filtertype");
        filterValue = $(evt.target).val();

        this.updateSearchFilters(filterType, filterValue);

    },

    updateRotateShadow: function(showShadowStatus){
        dataToSet = {
            property: "showShadow",
            value: showShadowStatus
        };

        // this.updateStateData(dataToSet);

        var delay=100000; //1 seconds

        setTimeout(this.updateStateData(dataToSet), delay);
    },

    applyFilters: function(evt){

        console.log("Apply filters");

        dataToSet = {
            property: "applied_filters",
            value: this.state.data.search_filters
        };

        this.updateStateData(dataToSet);

        this.updateProjectMasterData();


    },

    unapplyFilters: function(evt){

        console.log("Un Apply filters");

        dataToSet ={
            property: "reset_filters",
            value: {}
        };

        this.updateStateData(dataToSet);

        this.updateProjectMasterData();


    },


    updateProjectMasterData: function(){
        oldState = getStateData();

        newProjectData = AppStore.getFilteredProjectMasterData();

        dataToSet = {
            property: "data",
            value: newProjectData
        };

        this.updateStateData(dataToSet);

    },

    updateStateData: function(dataToSet){
        oldState = getStateData();
        
        newState = oldState;


        if(dataToSet.property === "showShadow"){
            
            newState = immutabilityHelpers( oldState, { data: 
                                                        {showShadow: {$set: dataToSet.value} 
                                                        }
                                                      });
        }
        if(dataToSet.property === "chosenBreakpoint"){
            
            newState = immutabilityHelpers( oldState, { data: 
                                                        {chosenBreakpoint: {$set: dataToSet.value} 
                                                        }
                                                      });
        }
        if(dataToSet.property === "reset_filters"){
            
            newState = immutabilityHelpers( oldState, { data: 
                                                        {
                                                            search_filters: {$set: dataToSet.value},
                                                            applied_filters: {$set: dataToSet.value}
                                                        }
                                                      });
        }
        if(dataToSet.property === "search_filters"){

            filterType = dataToSet.filterType;

            oldSearchFilters = oldState["data"]["search_filters"];
            
            oldSearchFilterKeys = _.keys(oldSearchFilters);

            if(_.contains(oldSearchFilterKeys,filterType)){
                oldataTochange = oldSearchFilters[filterType];
            }
            else{
                oldSearchFilters[filterType] = [];
                oldataTochange = oldSearchFilters[filterType];
            }
            

            

            valueToSet = dataToSet.value;

            // if valueToset is already present in array then remove it from array
            //  if valueToset is not present then add to the array
            indexOfELem = _.indexOf(oldataTochange,valueToSet);
            
            if (indexOfELem > -1) {
                
                oldataTochange.splice(indexOfELem, 1);

            }else{
                oldataTochange.push(valueToSet);
            }

            mutatedfilter =  {};
            mutatedfilter[filterType] = {$set: oldataTochange};
            
            newState = immutabilityHelpers( oldState, { data: 
                                                        {search_filters: mutatedfilter
                                                        }
                                                      });
        } 
        if(dataToSet.property === "applied_filters"){

            valueToSet = dataToSet.value;

            newState = immutabilityHelpers( oldState, { data: 
                                                        {applied_filters: 
                                                            {$set: valueToSet}
                                                        }
                                                      });
        }       


        this.setState(newState, this.projectDataUpdateCallBack);
        AppStore.updateGlobalState(newState);

    },


    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange)
    },  

    _onChange:function(){
      this.setState(getStateData());
    }, 

    showFilterModal: function(){
        $(ReactDOM.findDOMNode(this.refs.modal)).modal();
    },

    rotateImage: function(unitData){

        rotateToBreakpoint = unitData.primary_breakpoint;
        unitId = unitData.id;
        
        // hide svg area

        // update chosen breakpoint to primary breakpoint of tower of current slide
        this.updateChosenBreakPoint(rotateToBreakpoint);


        // move sprite spin to the chosen breakpoint
        spinDom = $(ReactDOM.findDOMNode(this.refs.imageContainer)).find("#spritespin");
        spinApi = spinDom.spritespin("api");

        chosenBreakPoint = this.state.data.chosenBreakpoint
        spinApi.playTo(chosenBreakPoint);

        // show tooltip for respective tower 

    },

    render: function(){
        console.log("project master re renders");
        var data = this.state.data;
        
        var projectTitle = data.projectTitle;
        var unitCount = data.totalCount;
        var buildings = data.buildings;
        var breakpoints = data.breakpoints;
        var applied_filters = data.applied_filters;
        var isFilterApplied = data.isFilterApplied;

        var filterTypes = data.filterTypes;

        return (
            <div>
            <NavBar 
                projectTitle = {projectTitle} 
                unitCount = {unitCount}
                showFilterModal = {this.showFilterModal}
            />
            <Modal 
                ref="modal" 
                modalData={filterTypes}
                selectFilter={this.selectFilter}
                search_filters={data.search_filters}
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
                breakpoints = {data.breakpoints}
                chosenBreakpoint = {data.chosenBreakpoint}
                updateChosenBreakPoint = {this.updateChosenBreakPoint}
                updateRotateShadow = {this.updateRotateShadow}
                buildings =  {buildings}
            />
            <CardList 
                ref = "cardList"
                buildings={buildings}
                isFilterApplied = {isFilterApplied}
                rotateImage = {this.rotateImage}
            />
            </div>

        );
    }
});

module.exports = ProjectMaster;