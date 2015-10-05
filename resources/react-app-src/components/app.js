var React = require('react');
var AppStore = require('../stores/app-store.js');
var NavBar = require('./project-master/navbar');
var SunToggle = require('./project-master/suntoggle');
var Rotate = require('./project-master/rotate');
var ProjectImage = require('./project-master/projectimage');
var CardList = require('./project-master/cardlist');
var CardView = require('./project-master/cardview');


function getProjectMasterData(){
    return {data: AppStore.getProjectMasterData()}
}


var APP = React.createClass({

    getInitialState: function() {
        return getProjectMasterData();
    },


    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange)
    },  

    _onChange:function(){
      this.setState(getProjectMasterData());
    },    

    render: function(){
        // var data = this.state.data;
        
        // var projectTitle = data.projectTitle;
        // var unitCount = data.unitCount;

        var projectTitle = "data.projectTitle";
        var unitCount = "data.unitCount";

        return (
            <div onClick = {this.handleClick}>
            <NavBar projectTitle = {projectTitle} unitCount = {unitCount}/>
            <SunToggle/>
            <Rotate/>
            <ProjectImage/>
            <CardList>
                <CardView/>
                <CardView/>
                <CardView/>
            </CardList>
            </div>

        );
    }
});

module.exports = APP;