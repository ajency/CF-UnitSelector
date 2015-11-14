var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('../modal/modal');
var SteponeImage = require('../imagecontainer/steponeimage');
var Link = require('react-router-component').Link; 
var AppStore = require('../../stores/app-store.js');
var CardList = require('../project-master/cardlist');
var SideBar = require('../project-master/sidebar');
var NavBar = require('../project-master/navbar');
var immutabilityHelpers = require('react-addons-update');
var SunToggle = require('../project-master/suntoggle');
var Modal = require('../modal/modal');
var FilterPopover = require('../filter/filterpopover');
var MessageBox = require('../common/messagebox');


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

var prevShadow = false;

function getStateData(){
    return AppStore.getStateData();
}

var StepOne = React.createClass({

    getInitialState: function() {
        return getStateData();
    }, 

    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
    },  

    _onChange:function(){
      this.setState(getStateData());
    },

    componentWillUnmount: function() {
        // destroy tooltips if any
        this.destroyTooltip();
    },

    showTooltip: function(text, selector){

        // first destroy tooltip
        this.destroyTooltip();
 
        // initialise qtip
        $(selector).each(function(ind, item) { // Notice the .each() loop, discussed below
            $(item).qtip({ // Grab some elements to apply the tooltip to
                content: text,
                show: qtipSettings['show'],
                hide: qtipSettings['hide'],
                position:{
                           my: 'center',  // Position my top left...
                           at: 'center', // at the bottom right of...
                           viewport: $(window), 
                           target: $(item) // my target
                       },
                style:qtipSettings['style']
            });
        }); 
    },  

    destroyTooltip: function(){

        $('.qtip').each(function(){
          $(this).data('qtip').destroy();
        });

    },  
    rotateImage: function(unitData){

        // ALways rotate to primary breakpoint
        rotateToBreakpoint = unitData.primary_breakpoint;
        unitId = unitData.id;

        prevShowShadow = this.state.data.showShadow;
        
        // store previous shadow state, to later use it to update main shadow state
        window.prevShadowState = prevShowShadow;

        if( prevShowShadow ){
            this.updateRotateShadow(false);
        }          
        
        // hide svg area
        allbuildings = this.state.data.buildings;
        allbuildingIds = _.pluck(allbuildings,"id");

        unitIndexToHighlight = _.indexOf(allbuildingIds,unitId)


        // update chosen breakpoint to primary breakpoint of tower of current slide
        // update unit index to higlight
        this.updateStateData([{property:"chosenBreakpoint",value:rotateToBreakpoint},{property:"unitIndexToHighlight", value:unitIndexToHighlight }]);

    },

    updateUnitIndexToHighlight: function(unitId){
        unitId = parseInt(unitId);
        data  = this.state.data;
        buildings  = data.buildings;
        buildingIds  = _.pluck(buildings, 'id');

        indexTohighlight = _.indexOf(buildingIds,unitId);

        dataToSet ={
            property: "unitIndexToHighlight",
            value: indexTohighlight
        };

        this.updateStateData([dataToSet]);    

    },

    updateChosenBreakPoint: function(chosenBreakPoint){
        dataToSet = {
            property: "chosenBreakpoint",
            value: chosenBreakPoint
        }

        this.updateStateData([dataToSet]);
    },  
    
    updateRotateShadow: function(showShadowStatus){
        dataToSet = {
            property: "showShadow",
            value: showShadowStatus
        };

        this.updateStateData([dataToSet]);

        // var delay=100000; //1 seconds

        // setTimeout(this.updateStateData([dataToSet]), delay);
    }, 

    updatefiltersSvgCheck: function(status){
        dataToSet = {
            property: "applyFiltersSvgCheck",
            value: status
        };

        this.updateStateData([dataToSet]);

        // var delay=100000; //1 seconds

        // setTimeout(this.updateStateData([dataToSet]), delay);
    }, 
    
    updateStateData: function(data){
        oldState = getStateData();
        
        newState = oldState;

        _.each(data, function(dataToSet){

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
            if(dataToSet.property === "applyFiltersSvgCheck"){
                
                newState = immutabilityHelpers( oldState, { data: 
                                                            {applyFiltersSvgCheck: {$set: dataToSet.value} 
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

                filterStyle = dataToSet.filterStyle;

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

                //For range filter, reset the filter with new min max value
                if(filterStyle == 'range'){
                    oldataTochange = [];
                    _.each(valueToSet, function(rangeValue){
                        oldataTochange.push(rangeValue);
                    });
                    
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
            if(dataToSet.property === "unitIndexToHighlight"){
                newState = immutabilityHelpers( oldState, { data: 
                                                            {unitIndexToHighlight: {$set: dataToSet.value} 
                                                            }
                                                          });                
            }  

            oldState = newState;               

        })
    


        this.setState(newState, this.projectDataUpdateCallBack);
        AppStore.updateGlobalState(newState,"projectMaster");

        console.log(newState);

    },  

    projectDataUpdateCallBack: function(){
        spin = $(ReactDOM.findDOMNode(this.refs.imageContainerone)).find("#spritespin");
        api = spin.spritespin("api");

        chosenBreakPoint = this.state.data.chosenBreakpoint
        api.playTo(chosenBreakPoint);

        slideToGotTo = this.state.data.unitIndexToHighlight;

        if(window.isMobile){
            mySwiper = $(ReactDOM.findDOMNode(this.refs.cardList)).find(".swiper-container")[0].swiper;
            mySwiper.slideTo(slideToGotTo);
        }

        this.destroyTooltip();

        buildings = this.state.data.buildings;
        buildingToHighlight = buildings[slideToGotTo];
        buildingName = buildingToHighlight.building_name;

        this.showTooltip(buildingName,".building"+buildingToHighlight.id);
    },     

    showFilterModal: function(){
        $(ReactDOM.findDOMNode(this.refs.modal)).modal();
    }, 

    showContactModal: function(){
        $(ReactDOM.findDOMNode(this.refs.contactModal)).modal();
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

        this.updateStateData([dataToSet]);

    }, 

    selectFilter: function(evt){
        isChecked = evt.target.checked;

        filterType = $(evt.target).data("filtertype");
        filterStyle = $(evt.target).data("filterstyle");
        

        if(filterStyle && filterStyle === 'range'){
            filterValue = [evt.min,evt.max];
            this.updateSearchFilters(filterType, filterValue, filterStyle);            
        }
        else{
           filterValue = $(evt.target).val();
           this.updateSearchFilters(filterType, filterValue); 
       }        

    },

    applyFilters: function(evt){

        this.destroyTooltip();

        var totalFilterApplied = AppStore.getFilteredCount(this.state.data.search_filters);

        if(totalFilterApplied === 0){
            dataToSet ={
                property: "reset_filters",
                value: {}
            };
        }
        else{
            dataToSet = {
                property: "applied_filters",
                value: this.state.data.search_filters
            };
        }

        
        this.updateStateData([dataToSet]);

        this.updateProjectMasterData();


    },

    unapplyFilters: function(evt){

        console.log("Un Apply filters");
        this.destroyTooltip();

        dataToSet ={
            property: "reset_filters",
            value: {}
        };

        this.updateStateData([dataToSet]);

        this.updateProjectMasterData();


    },

    updateSearchFilters: function(filterType, filterValue, filterStyle){
        dataToSet = {
            property: "search_filters",
            filterType: filterType,
            filterStyle: filterStyle,
            value: filterValue
        }
       
        this.updateStateData([dataToSet]);
    },    

    updateProjectMasterData: function(){
        oldState = this.state;

        newProjectData = AppStore.getFilteredProjectMasterData('','');

        dataToSet = {
            property: "data",
            value: newProjectData
        };

        this.updateStateData([dataToSet]);

    },    

    render: function(){
        
        var data, domToDisplay, cardListFor, cardListForId, buildings, isFilterApplied, projectTitle, projectLogo, unitCount, applied_filters, unitIndexToHighlight;
        var imageType, buildingToHighlight, modalData, filterTypes;

        data = this.state.data;

        // Get card list data
        projectTitle = data.projectTitle;
        projectLogo = data.projectLogo;
        logoExist = data.logoExist;
        cardListFor = "project";
        cardListForId = window.projectId; 
        buildings = data.buildings;
        isFilterApplied = data.isFilterApplied;
        unitCount = data.totalCount;

        unitIndexToHighlight = data.unitIndexToHighlight;
        applied_filters = data.applied_filters;
        buildingToHighlight = buildings[unitIndexToHighlight];


        // Get image container data
        imageType = "master";

        // get data for modal
        modalData = {};
        filterTypes = data.filterTypes;
        modalData.filterTypes = filterTypes;
        modalData.search_filters = data.search_filters;
        modalData.projectData = {title:data.projectTitle};        

        if(window.isMobile){

            domToDisplay = (
                <div id="site-wrapper">
                    <NavBar 
                        projectTitle = {projectTitle} 
                        projectLogo = {projectLogo} 
                        logoExist = {logoExist} 
                        unitCount = {unitCount}
                        showFilterModal = {this.showFilterModal}
                        showContactModal = {this.showContactModal}
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
                    <Modal 
                        ref="contactModal" 
                        modalData = {modalData}
                        modalPurpose = "mobileContactModal"
                    />                     

                    <SunToggle 
                        shadowImages={data.shadowImages}
                        toggelSunView = {this.toggelSunView} 
                        showShadow={data.showShadow}
                    />

                    <MessageBox
                        message = "Click on tower to proceed"
                    />

                    <SteponeImage
                        ref= "imageContainerone"
                        imageType = {imageType}
                        showShadow={data.showShadow}
                        shadowImages={data.shadowImages}
                        breakpoints = {data.breakpoints}
                        chosenBreakpoint = {data.chosenBreakpoint}
                        buildings =  {buildings} 
                        buildingToHighlight = {buildingToHighlight}
                        applyFiltersSvgCheck = {data.applyFiltersSvgCheck} 
                        updatefiltersSvgCheck = {this.updatefiltersSvgCheck}
                        destroyTooltip = {this.destroyTooltip}
                        showTooltip = {this.showTooltip}
                        updateUnitIndexToHighlight = {this.updateUnitIndexToHighlight} 
                        updateChosenBreakPoint = {this.updateChosenBreakPoint}
                        updateRotateShadow = {this.updateRotateShadow}
                        cardListFor = {cardListFor}
                        cardListForId = {cardListForId}                  
                    />
                    
                    <CardList 
                        ref = "cardList"
                        cardListFor = {cardListFor}
                        cardListForId = {cardListForId}
                        buildings={buildings}
                        isFilterApplied = {isFilterApplied}
                        rotateImage = {this.rotateImage}
                        destroyTooltip = {this.destroyTooltip}
                    />                    
       
                </div>
            ); 
        }
        else{

            domToDisplay = (
                <div id="wrapper">

                    <SideBar                    
                        ref = "sideBarList"
                        cardListFor = {cardListFor}
                        cardListForId = {cardListForId}
                        buildings = {buildings}
                        isFilterApplied = {isFilterApplied}
                        rotateImage = {this.rotateImage}
                        destroyTooltip = {this.destroyTooltip}              
                        projectTitle = {projectTitle} 
                        projectLogo = {projectLogo}
                        logoExist = {logoExist}
                        unitCount = {unitCount} 
                        unitIndexToHighlight = {unitIndexToHighlight}
                        applied_filters = {applied_filters}     
                    />                

                    <div id="page-content-wrapper">

                        <SteponeImage
                            ref= "imageContainerone"
                            imageType = {imageType}
                            showShadow={data.showShadow}
                            shadowImages={data.shadowImages}
                            breakpoints = {data.breakpoints}
                            chosenBreakpoint = {data.chosenBreakpoint}
                            buildings =  {buildings}
                            buildingToHighlight = {buildingToHighlight}
                            applyFiltersSvgCheck = {data.applyFiltersSvgCheck} 
                            updatefiltersSvgCheck = {this.updatefiltersSvgCheck}
                            destroyTooltip = {this.destroyTooltip}
                            showTooltip = {this.showTooltip}
                            updateUnitIndexToHighlight = {this.updateUnitIndexToHighlight} 
                            updateChosenBreakPoint = {this.updateChosenBreakPoint}
                            updateRotateShadow = {this.updateRotateShadow}
                            cardListFor = {cardListFor}
                            cardListForId = {cardListForId}                        
                        />

                        <div className="container-fluid">

                            <div className="navbar-header">
                                <div className="row">
                                    
                                    <SunToggle 
                                        shadowImages={data.shadowImages}
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
                                                className="btn btn-default  btn-primary" 
                                                data-toggle="modal" data-target="#contactModal" 
                                                onClick={this.showContactModal} 
                                            >
                                                <i className="fa fa-phone"></i>
                                                <span className="enquiryText text-uppercase">Contact Us</span>
                                            </button>
                                        </div>
                                    </div>                                                                       

                                </div>
                                <div className="row text-center">
                                    <MessageBox message = "Click on tower to proceed" />
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

module.exports = StepOne;