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
		var windowHeight = window.innerHeight ;

		var sideContentBarHeight = 350; //default side content bar height
		var projectDetailsHeight = 100;
		var outsideViewHeight = 0; //height of outside view as seen in step2

		// calculate sideContentBarHeight
		sideContentBarHeight = windowHeight-200;
		sidebarHeightPx = sideContentBarHeight+"px";

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
		  height: sidebarHeightPx
		};	
		return (
	         <div ref="sidebarWrapper" id="sidebar-wrapper">
	            <NavBar 
                    projectTitle = {this.props.projectTitle} 
                    projectLogo = {this.props.projectLogo} 
                    unitCount = {this.props.unitCount}
                    showFilterModal = {this.props.showFilterModal}
                    buildings = {this.props.buildings}
                    isFilterApplied = {this.props.isFilterApplied}
                    applied_filters = {this.props.applied_filters}	            
	            />
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