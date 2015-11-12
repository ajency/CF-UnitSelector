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

        // this.updateStateData(dataToSet);

        var delay=100000; //1 seconds

        setTimeout(this.updateStateData([dataToSet]), delay);
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

    showFilterModal: function(){
        $(ReactDOM.findDOMNode(this.refs.modal)).modal();
    },             

    render: function(){
        
        var data, domToDisplay, cardListFor, cardListForId, buildings, isFilterApplied, projectTitle, projectLogo, unitCount, applied_filters, unitIndexToHighlight;
        var imageType, buildingToHighlight;

        data = this.state.data;

        // Get card list data
        projectTitle = data.projectTitle;
        projectLogo = data.projectLogo;
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

        if(window.isMobile){

            domToDisplay = (
                <div id="site-wrapper">
                    <NavBar 
                        projectTitle = {projectTitle} 
                        projectLogo = {projectLogo} 
                        unitCount = {unitCount}
                        showFilterModal = {this.showFilterModal}
                        buildings = {buildings}
                        isFilterApplied = {isFilterApplied}
                        applied_filters = {applied_filters}
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
                        destroyTooltip = {this.destroyTooltip}
                        showTooltip = {this.showTooltip}
                        updateUnitIndexToHighlight = {this.updateUnitIndexToHighlight} 
                        updateChosenBreakPoint = {this.updateChosenBreakPoint}
                        updateRotateShadow = {this.updateRotateShadow}                    
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
                            destroyTooltip = {this.destroyTooltip}
                            showTooltip = {this.showTooltip}
                            updateUnitIndexToHighlight = {this.updateUnitIndexToHighlight} 
                            updateChosenBreakPoint = {this.updateChosenBreakPoint}
                            updateRotateShadow = {this.updateRotateShadow}                        
                        />
                        

                    </div>
       
                </div>
            ); 
        }



        return domToDisplay;
    }
});

module.exports = StepOne;
