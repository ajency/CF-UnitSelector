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

    updateStateData: function(dataToSet){
        oldState = getStateData();
        
        newState = oldState;


        if(dataToSet.property === "showShadow"){
            
            newState = immutabilityHelpers( oldState, { data: 
                                                        {showShadow: {$set: dataToSet.value} 
                                                        }
                                                      });
        }


        this.setState(newState);

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
            <Rotate/>
            <ImageContainerTemplate 
                showShadow={data.showShadow}
            />
            <CardList buildings={buildings}/>
            </div>

        );
    }
});

module.exports = ProjectMaster;