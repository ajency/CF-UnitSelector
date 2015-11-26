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

    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
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
      		sideContentBarHeight = windowHeight-500;
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

  			var step1ImgUrl , step1SvgUrl;

        	var svgKey1 = this.getRandomArbitrary(0,50);  			

		  	buildingPrimaryBreakPoint = this.props.primaryBreakPoint;
		  	projectMasterImages = this.props.projectMasterImages;

		  	buildingId = this.props.buildingId;

		  	if(projectMasterImages.length > 0){
	  			step1ImgUrl = projectMasterImages[buildingPrimaryBreakPoint];
		  	}else{
	  			step1ImgUrl = "";		  		
		  	}


  			step1SvgUrl = window.baseUrl+'/projects/'+window.projectId+'/master/master-'+buildingPrimaryBreakPoint+'.svg';


	      	outsideViewNode = (
					<div className="outSideView">
						<h6>Out Side View</h6>
		                  	<SvgView
		                      	key={svgKey1}
		                      	svgUrl={step1SvgUrl}
		                      	imgUrl={step1ImgUrl}
		                      	svgElementToSelect = "building"
		                      	svgElementId = {buildingId}
		                   	/>

					</div>
				);

	      	outsideViewNode = "";
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
