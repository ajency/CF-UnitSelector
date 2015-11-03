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



function getGroupStateData(groupId){
    return AppStore.getGroupStateData(groupId);
}



var GroupMaster = React.createClass({


    getInitialState: function() {
        var groupId;
        groupId = this.props.groupId;

        stateData =  this.getGroupState();

        return stateData;
    },

    getGroupState: function() {
        var groupId;
        groupId = this.props.groupId;

        stateData =  getGroupStateData(groupId);

        return this.formatStateData(stateData);
    },

    formatStateData: function(stateDataToformat){
        var newState = stateDataToformat;

        floorGroups = stateDataToformat.data.buildings;
        apartments = [];
        
        if(floorGroups.length>0){
            newStateData = newState.data;

            // floor group
            floorGroup = floorGroups[0];

            // floorGroup specific data for units
            unitData = floorGroup.unitData;
            availableUnitData = floorGroup.availableUnitData;
            filteredUnitData = floorGroup.filteredUnitData;
            supportedUnitTypes = floorGroup.supportedUnitTypes;


            // all units in the floor group
            allUnits = building.unitData;

            _.each(allUnits, function(singleUnit){
                supportedUnitTypes = [];
                
                unitId = singleUnit.id;
                
                unit = {};

                unit.id = singleUnit.id;
                unit.building_name = singleUnit.unit_name;
                unit.primary_breakpoint = singleUnit.primary_breakpoint;
                unit.minStartPrice = singleUnit.selling_amount;

                apartmentUnitData =[];
                apartmentAvailableUnitData =[];
                apartmentFilteredUnitData =[];

                // will be the same unit
                apartmentUnitData = [singleUnit]; 

                // insert in apartmentAvailableUnitData if this unit's status is available 
                if(singleUnit.availability==="available"){
                    apartmentAvailableUnitData.push(singleUnit);
                }
 
                
                // if current unit is present in filteredUnitData then push in array
                if(_.contains(filteredUnitData,singleUnit)){
                    apartmentFilteredUnitData.push(singleUnit);
                } 

                unit.unitData = apartmentUnitData;
                unit.availableUnitData = apartmentAvailableUnitData;
                unit.filteredUnitData = apartmentFilteredUnitData;

                minStartPrice = singleUnit.selling_amount;
                unit.minStartPrice = minStartPrice;

                // supportedUnitTypesArr = AppStore.getApartmentUnitTypes(floorGrpId, "floorgroups");
                // supportedUnitTypes = _.pluck(supportedUnitTypesArr,"name");
                // floorGroup.supportedUnitTypes = supportedUnitTypes;

                apartments.push(unit) ;                             

            }.bind(this));

            
            // modify new state data as per building selected
            newStateData.projectTitle = floorGroup.building_name;
            newStateData.breakpoints = stateDataToformat.data.breakpoints;
            newStateData.buildings = apartments;
            newStateData.shadowImages = stateDataToformat.data.shadow_images;

            newState.data = newStateData;


        }

        return newState;
    },

    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
    },     

    _onChange:function(){
        var groupId;
        groupId = this.props.groupId;
        newState = this.getGroupState();
        this.setState(newState);
    },     

    render: function(){
        
        domToDisplay = (<div> Group master </div>);        
       

        return domToDisplay;
    }
});

module.exports = GroupMaster;