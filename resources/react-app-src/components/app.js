var React = require('react');
var NavBar = require('./project-master/navbar');
var SunToggle = require('./project-master/suntoggle');
var Rotate = require('./project-master/rotate');
var ProjectImage = require('./project-master/projectimage');
var CardList = require('./project-master/cardlist');
var CardView = require('./project-master/cardview');

var APP = React.createClass({

    getInitialState: function() {
        return {data: {projectTitle:"",unitCount:""}};
    },

    loadDataFromServer: function() {

        var baseUrl = this.props.baseUrl;
        var projectId = this.props.projectId;
        
        // var stepOneUrl = baseUrl+"/api/v1/project/"+this.props.projectId;
        var projectDataUrl  = baseUrl+"/project-data.json";

        $.ajax({
          url: projectDataUrl,
          dataType: 'json',
          cache: false,
          
          success: function(respData) {

            var stepOne = respData;

            var data = {};

            data.projectTitle = stepOne.data.project_title;
            data.unitCount = 0;



            this.setState({data:data});

          }.bind(this),

          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)



        });


    },

    componentWillMount: function() {
        this.loadDataFromServer();
    },    

    render: function(){
        var data = this.state.data;
        var projectTitle = data.projectTitle;
        var unitCount = data.unitCount;

        return (
            <div>
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