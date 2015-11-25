var React = require('react');
var CardView = require('../project-master/cardview');
var NavBar = require('../project-master/navbar');
var SvgView = require('../tabs/svgview');

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
		var windowHeight = window.outerHeight ;

		var sideContentBarHeight = 350; //default side content bar height
		var projectDetailsHeight = 100;
		var outsideViewHeight = 0; //height of outside view as seen in step2


		var cardListFor = this.props.cardListFor ;
        var cardListForId = this.props.cardListForId ;

        var outsideViewNode	;

		// calculate sideContentBarHeight
    	if(cardListFor === 'building'){
      		sideContentBarHeight = windowHeight-460;
      		// sideContentBarHeight = windowHeight-250;
    	}
    	else{
      		sideContentBarHeight = windowHeight-250;
    	}

  		sidebarHeightPx = sideContentBarHeight+"px";

		unitIndexToHighlight= this.props.unitIndexToHighlight;
		buildingToBeHighlighted = buildings[unitIndexToHighlight];
		destroyTooltip = this.props.destroyTooltip;
		rotateImage = this.props.rotateImage;

		buildingNodes = buildings.map(function(building,i){
	            return(
	                <div key={i}>
	                <CardView
	                  building={building}
	                  isFilterApplied={isFilterApplied}
                      destroyTooltip = {destroyTooltip}
                      rotateImage = {rotateImage}
	                  buildingToBeHighlighted= {buildingToBeHighlighted}
                      cardListFor = {cardListFor}
                      cardListForId = {cardListForId}
	                />
	                </div>
	            );

	        });

		var SideBarStyle = {
		  maxHeight: sidebarHeightPx
		};


	    if(cardListFor === 'building'){

  			// var step1ImgUrl , step1SvgUrl, stepImgUrl, step2SvgUrl, step3ImgUrl, step3SvgUrl;

		  	// buildingPrimaryBreakPoint = 0;
		  	// projectMasterImgs = this.props.project_master;

		  	// buildingId = this.props.buildingId;

		  	// if(projectMasterImgs.length > 0){
	  		// 	step1ImgUrl = projectMasterImgs[buildingPrimaryBreakPoint];
		  	// }else{
	  		// 	step1ImgUrl = "";		  		
		  	// }


  			// step1SvgUrl = window.baseUrl+'/projects/'+window.projectId+'/master/master-'+buildingPrimaryBreakPoint+'.svg';


	      	outsideViewNode = (
					<div className="outSideView">
						<h6>Out Side View</h6>
		                  	<SvgView
		                      	key="23"
		                      	svgUrl="http://test.cfunitselectortest.com/projects/7/master/master-28.svg"
		                      	imgUrl="http://test.cfunitselectortest.com/projects/7/master/master-28.jpg"
		                      	svgElementToSelect = "building"
		                      	svgElementId = "21"
		                   	/>

					</div>
				);
	    }
	    else{
	    	outsideViewNode = "";
	    }


		return (
		    <div ref="sidebarWrapper" id="sidebar-wrapper">
		        <NavBar
	                cardListFor = {cardListFor}
	                cardListForId = {cardListForId}
	                projectTitle = {this.props.projectTitle}
	                projectLogo = {this.props.projectLogo}
	                logoExist = {this.props.logoExist}
	                unitCount = {this.props.unitCount}
	                showFilterModal = {this.props.showFilterModal}
	                buildings = {this.props.buildings}
	                isFilterApplied = {this.props.isFilterApplied}
	                applied_filters = {this.props.applied_filters}
	                dropDownData = {this.props.dropDownData}
	                buildingId = {this.props.buildingId}
	                facing = {this.props.facing}
	                previousEntityId = {this.props.previousEntityId}
		        />
	            <div ref="sideContentBar" id="content-1" className="content cardOuter" style={SideBarStyle}>
		            <ul className="sidebar-nav">
		                {buildingNodes}
		            </ul>
		        </div>

	            {outsideViewNode}

		    </div>
		);
	}
});

module.exports = SideBar;
