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

    updateRotateShadow: function(showShadowStatus){
        dataToSet = {
            property: "showShadow",
            value: showShadowStatus
        };

        // this.updateStateData(dataToSet);

        var delay=100000; //1 seconds

        setTimeout(this.updateStateData(dataToSet), delay);
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


        this.setState(newState);
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

    render: function(){
        var data = this.state.data;
        
        var projectTitle = data.projectTitle;
        var unitCount = data.totalCount;
        var buildings = data.buildings;
        var breakpoints = data.breakpoints;

        return (
            <div>
            <NavBar 
                projectTitle = {projectTitle} 
                unitCount = {unitCount}
                showFilterModal = {this.showFilterModal}

            />
            <Modal ref="modal" />
            <SunToggle 
                toggelSunView = {this.toggelSunView} 
                showShadow={data.showShadow}
            />
            <ImageContainerTemplate 
                showShadow={data.showShadow}
                breakpoints = {data.breakpoints}
                chosenBreakpoint = {data.chosenBreakpoint}
                updateChosenBreakPoint = {this.updateChosenBreakPoint}
                updateRotateShadow = {this.updateRotateShadow}
            />
            <CardList buildings={buildings}/>
            </div>

        );
    }
});

module.exports = ProjectMaster;