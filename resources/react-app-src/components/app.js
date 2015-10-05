var React = require('react');
var AppStore = require('../stores/app-store.js');
var NavBar = require('./project-master/navbar');
var SunToggle = require('./project-master/suntoggle');
var Rotate = require('./project-master/rotate');
var ProjectImage = require('./project-master/projectimage');
var CardList = require('./project-master/cardlist');



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
        var data = this.state.data;
        
        var projectTitle = data.projectTitle;
        var unitCount = data.totalCount;
        var buildings = data.buildings;

        return (
            <div>
            <NavBar projectTitle = {projectTitle} unitCount = {unitCount}/>
            <SunToggle/>
            <Rotate/>
            <ProjectImage/>
            <CardList buildings={buildings}/>
            </div>

        );
    }
});

module.exports = APP;