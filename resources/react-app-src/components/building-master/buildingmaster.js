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

        stateData =  this.getBuildingState();

        return stateData;
    },

    getMinUnitPrice: function(floorGrpUnits){
        unitPrices = [];
        unitPrices = _.pluck(floorGrpUnits, "selling_amount");
        if(unitPrices.length>0)
            minStartPrice = _.min(unitPrices);
        else{
            minStartPrice = "N/A";
        }


        return minStartPrice;
    },

    formatStateData: function(stateDataToformat){
        var newState = stateDataToformat;

        buildings = stateDataToformat.data.buildings;
        
        if(buildings.length>0){
            newStateData = newState.data;

            floorGroups = [];

            building = buildings[0];

            // building specific data for units
            unitData = building.unitData;
            availableUnitData = building.availableUnitData;
            filteredUnitData = building.filteredUnitData;
            supportedUnitTypes = building.supportedUnitTypes;


            // building floor groups
            floor_groups = building.floor_group;

            _.each(floor_groups, function(floor_group){
                floorGrpId = floor_group.id;
                floorGroup = {};

                floorGroup.id = floor_group.id;
                floorGroup.building_name = floor_group.name;
                floorGroup.no_of_floors = floor_group.floors.length;
                floorGroup.primary_breakpoint = floor_group.primary_breakpoint;

                floorGroupUnitData =[];
                floorGroupAvailableUnitData =[];
                floorGroupFilteredUnitData =[];

                // pick only those units from unit data which have the current floor id
                _.each(unitData, function(unit){ 
                    unitFloorGrpId = parseInt(unit.floor_group_id); 

                    if(floorGrpId===unitFloorGrpId){
                        floorGroupUnitData.push(unit) ;
                    } 

                });

                // pick only those units from unit data which have the current floor id
                _.each(availableUnitData, function(unit){ 
                    unitFloorGrpId = parseInt(unit.floor_group_id); 

                    if(floorGrpId===unitFloorGrpId){
                        floorGroupAvailableUnitData.push(unit) ;
                    } 

                });  
                
                // pick only those units from unit data which have the current floor id
                _.each(filteredUnitData, function(unit){ 
                    unitFloorGrpId = parseInt(unit.floor_group_id); 

                    if(floorGrpId===unitFloorGrpId){
                        floorGroupFilteredUnitData.push(unit);
                    } 

                }); 

                floorGroup.unitData = floorGroupUnitData;
                floorGroup.availableUnitData = floorGroupAvailableUnitData;
                floorGroup.filteredUnitData = floorGroupFilteredUnitData;
                floorGroup.unitData = floorGroupUnitData;

                minPrice = 0;

                minStartPrice = this.getMinUnitPrice(floorGroupUnitData);
                floorGroup.minStartPrice = minStartPrice;

                floorGroups.push(floorGroup) ;                             

            }.bind(this));

            
            // modify new state data as per building selected
            newStateData.projectTitle = building.building_name;
            newStateData.breakpoints = building.breakpoints;
            newStateData.buildings = floorGroups;
            newStateData.shadowImages = building.shadow_images;

            newState.data = newStateData;


        }

        return newState;
    },

    getBuildingState: function(){
        var buildingId;
        buildingId = this.props.buildingId;

        stateData =  getBuildingStateData(buildingId);

        return this.formatStateData(stateData);
    },

    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
    },     

    _onChange:function(){
        var buildingId;
        buildingId = this.props.buildingId;
        newState = this.getBuildingState();
        this.setState(newState);
    },  

    projectDataUpdateCallBack: function(){
        spinDom = $(ReactDOM.findDOMNode(this.refs.imageContainer)).find("#spritespin");
        spinApi = spinDom.spritespin("api");

        chosenBreakPoint = this.state.data.chosenBreakpoint
        spinApi.playTo(chosenBreakPoint);

        slideToGotTo = this.state.data.unitIndexToHighlight;

        if(window.isMobile){
            mySwiper = $(ReactDOM.findDOMNode(this.refs.cardList)).find(".swiper-container")[0].swiper;
            mySwiper.slideTo(slideToGotTo);
        }


        buildings = this.state.data.buildings;
        buildingToHighlight = buildings[slideToGotTo];
        buildingName = buildingToHighlight.building_name;
        this.showTooltip(buildingName);
    },

    updateChosenBreakPoint: function(chosenBreakPoint){
        dataToSet = {
            property: "chosenBreakpoint",
            value: chosenBreakPoint
        }

        this.updateStateData([dataToSet]);
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

    updateSearchFilters: function(filterType, filterValue, filterStyle){
        dataToSet = {
            property: "search_filters",
            filterType: filterType,
            filterStyle: filterStyle,
            value: filterValue
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
        }else{
           filterValue = $(evt.target).val();
           this.updateSearchFilters(filterType, filterValue); 
       }        

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

    updateRotateShadow: function(showShadowStatus){
        dataToSet = {
            property: "showShadow",
            value: showShadowStatus
        };

        // this.updateStateData(dataToSet);

        var delay=100000; //1 seconds

        setTimeout(this.updateStateData([dataToSet]), delay);
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


    updateProjectMasterData: function(){
        oldState = this.state;

        newProjectData = AppStore.getFilteredProjectMasterData();

        dataToSet = {
            property: "data",
            value: newProjectData
        };

        this.updateStateData([dataToSet]);

    },

    updateStateData: function(data){
        oldState = this.state;
        
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
        AppStore.updateGlobalState(newState,"buildingFloorGroups");

    },

    componentDidMount: function() {
        $(".animsition").animsition({
         inClass: 'fade-in',
         outClass: 'fade-out',
         inDuration: 1500,
         outDuration: 1200,
         linkElement: '.animsition-link',
         loading: true,
         loadingParentElement: 'body', 
         loadingClass: 'animsition-loading',
         unSupportCss: ['animation-duration',
             '-webkit-animation-duration',
             '-o-animation-duration'
         ],

         overlay: false,

         overlayClass: 'animsition-overlay-slide',
         overlayParentElement: 'body'
        });
    },

    showFilterModal: function(){
        $(ReactDOM.findDOMNode(this.refs.modal)).modal();
    },

    showContactModal: function(){
        $(ReactDOM.findDOMNode(this.refs.contactModal)).modal();
    },    

    destroyTooltip: function(){
        var classname = ".show-qtooltip";
        var isqtipInitialised = false;
        var qtipApi;

        // check of qtip is already initialised or not
        if('object' === typeof $(".show-qtooltip").data('qtip'))
          isqtipInitialised = true;

        if(isqtipInitialised){
          // destroy qtip
          qtipApi = $(classname).qtip('api');
          qtipApi.destroy();
        }
    },    

    showTooltip: function(text){

 
        var classname = ".show-qtooltip";
   
        // initialise qtip

        qtipSettings['content'] = text;

        $(classname).qtip(qtipSettings);
    },  

    rotateImage: function(unitData){
      

        rotateToBreakpoint = unitData.primary_breakpoint;
        unitId = unitData.id;
        
        // hide svg area

        allbuildings = this.state.data.buildings;
        allbuildingIds = _.pluck(allbuildings,"id");

        unitIndexToHighlight = _.indexOf(allbuildingIds,unitId)


        // update chosen breakpoint to primary breakpoint of tower of current slide
        // update unit index to higlight
        this.updateStateData([{property:"chosenBreakpoint",value:rotateToBreakpoint},{property:"unitIndexToHighlight", value:unitIndexToHighlight }]);


        // // move sprite spin to the chosen breakpoint
        // spinDom = $(ReactDOM.findDOMNode(this.refs.imageContainer)).find("#spritespin");
        // spinApi = spinDom.spritespin("api");

        // chosenBreakPoint = this.state.data.chosenBreakpoint
        // spinApi.playTo(chosenBreakPoint);



    },

    render: function(){
        var data = this.state.data;

        console.log(this.state);
        
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

        buildingId = this.props.buildingId;

        // display dom based on whether it is a mobile or a desktop view
        if(window.isMobile){
            domToDisplay = (
                <div className="site-wrapper animsition" data-animsition-in="fade-in" data-animsition-out="fade-out">
                    <NavBar 
                        projectTitle = {projectTitle} 
                        projectLogo = {projectLogo} 
                        unitCount = {unitCount}
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
                        shadowImages={data.shadowImages}
                    />
                    <ImageContainerTemplate 
                        ref= "imageContainer"
                        showShadow={data.showShadow}
                        shadowImages={data.shadowImages}
                        imageType="buildingFloorGrps"
                        breakpoints = {data.breakpoints}
                        chosenBreakpoint = {data.chosenBreakpoint}
                        updateChosenBreakPoint = {this.updateChosenBreakPoint}
                        updateRotateShadow = {this.updateRotateShadow}
                        buildings =  {buildings}
                        buildingId = {buildingId}
                        buildingToHighlight = {buildingToHighlight}
                        destroyTooltip = {this.destroyTooltip}
                        showTooltip = {this.showTooltip}
                        updateUnitIndexToHighlight = {this.updateUnitIndexToHighlight}
                    />
                    <CardList 
                        ref = "cardList"
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
                            shadowImages={data.shadowImages}
                            imageType="buildingFloorGrps"
                            breakpoints = {data.breakpoints}
                            chosenBreakpoint = {data.chosenBreakpoint}
                            updateChosenBreakPoint = {this.updateChosenBreakPoint}
                            updateRotateShadow = {this.updateRotateShadow}
                            buildings =  {buildings}
                            buildingId = {buildingId}
                            buildingToHighlight = {buildingToHighlight}
                            destroyTooltip = {this.destroyTooltip}
                            showTooltip = {this.showTooltip}  
                            updateUnitIndexToHighlight = {this.updateUnitIndexToHighlight}                      
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