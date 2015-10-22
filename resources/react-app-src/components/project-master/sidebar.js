var React = require('react');
var CardView = require('../project-master/cardview');
var NavBar = require('../project-master/navbar');

var customScrollBarSettings = {
         autoHideScrollbar:true,
         theme:"rounded"
       };

var SideBar = React.createClass({

	componentDidMount: function() {
		$(this.refs.sideContentBar).mCustomScrollbar(customScrollBarSettings);
	},

	render: function () {

		var buildings = this.props.buildings;
		var buildingNodes; 
		var isFilterApplied = this.props.isFilterApplied;

		buildingNodes = buildings.map(function(building,i){
	            return(
	                <div key={i}>
	                <CardView  
	                  building={building}
	                  isFilterApplied={isFilterApplied}
	                /> 
	                </div>
	            ); 
	                 
	        });

		var SideBarStyle = {
		  height: "350px"
		};	
		return (
	         <div id="sidebar-wrapper">
	            <NavBar />
	            <div ref="sideContentBar" className="content" style={SideBarStyle}>
	                <ul className="sidebar-nav">
	                	{buildingNodes}
	                </ul>
	            </div>

	        </div>
		);
	}
});

module.exports = SideBar;