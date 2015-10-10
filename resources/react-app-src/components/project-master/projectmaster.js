var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var AppStore = require('../../stores/app-store.js');
var NavBar = require('../project-master/navbar');
var SunToggle = require('../project-master/suntoggle');
var Rotate = require('../project-master/rotate');
var ProjectImage = require('../project-master/projectimage');
var ImageContainerTemplate = require('../project-master/imagecontainertemplate');
var CardList = require('../project-master/cardlist');



function getStateData(){
    console.log("getStateData");
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
        console.log(oldState);
        newState = oldState;


        if(dataToSet.property === "showShadow"){
            newState.data.showShadow = dataToSet.value;
        }

        console.log(newState);

        this.setState(newState);

    },


    componentWillMount:function(){
        console.log("componentWillMount");
        AppStore.addChangeListener(this._onChange)
    },  

    _onChange:function(){
        console.log("_onChange");
      this.setState(getStateData());
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
            />
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