var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var SvgContainer = require('../project-master/svgcontainer');
var immutabilityHelpers = require('react-addons-update');

var PROJECTID = window.projectId;
var BASEURL = window.baseUrl;


var svgData = {
    svgClasses: {
      'svg-area': true,
       'hide': false
    },
    hideSoloImage: false
};

var svgKeyType = "breakpoint";

var SteponeImage = React.createClass({

    getInitialState: function() {
        return svgData;
    }, 

    getImageFrames: function(){
        var frames;
        var imageType = this.props.imageType;

        var digitsInName = 2; 

        path = this.getMasterImagePath(imageType);
        imagePath = path["imagePath"];

        var projectMasterImgUrl = imagePath;

        if(!_.isEmpty(imagePath)){
            frames = SpriteSpin.sourceArray(projectMasterImgUrl, {
             frame: [0, 35],
             digits: digitsInName
            });
        }

        return frames;
    },  

    panToZoomedGroup: function(){
        var $imageContainerDom = $(this.refs.imageContainer);
        
        // get rectangle to select
        cardListForId = this.props.cardListForId
        selectorClass = ".floor_group"+cardListForId;

        rect = $(selectorClass)[0].getBoundingClientRect();  

        panTo = 0-rect.top+90;      

        $imageContainerDom.panzoom("pan", 0, panTo, {
                      relative: true,
                      animate: true
                  });
    }, 

    applyPanzoom: function(){
        var $imageContainerDom = $(this.refs.imageContainer);
        var imageType = this.props.imageType;
        var panZoomSettings;
        var cardListFor = this.props.cardListFor;
        var cardListForId = this.props.cardListForId;
        var selectorClass, panTo;

        

        if(cardListFor!=="group"){

            panZoomSettings = {
                 startTransform: 'scale(1.0)',
                 contain: 'invert',
                 minScale: 1,
                 disablePan: false,
                 disableZoom: false
            };

            $imageContainerDom.panzoom(panZoomSettings);

            if(window.isMobile){
              $imageContainerDom.panzoom("setMatrix", [1.1, 0, 0, 1.1, -285, 9]);
            }

            $imageContainerDom.on('panzoomend', function(e, panzoom, matrix, changed) {
                if (changed) {
                    // deal with drags or touch moves

                    // show correct tooltip
                    this.displayHighlightedTooltip();

                } else {
                    // deal with clicks or taps
                    // show correct tooltip
                    this.displayHighlightedTooltip();
                }
            }.bind(this));             
        }
        else{

            if(window.isMobile){
                panZoomSettings = {
                     startTransform: 'scale(1.0)',
                     contain: 'invert',
                     minScale: 1,
                     disablePan: false,
                     disableZoom: false
                };

                $imageContainerDom.panzoom(panZoomSettings);                
                $imageContainerDom.panzoom("setMatrix", [1.1, 0, 0, 1.1, -350, 9]);
            }
            else{
                panZoomSettings = {
                        minScale : 0,
                        contain: "invert",
                        startTransform: 'scale(2.0)'
                        }

                $imageContainerDom.panzoom(panZoomSettings);                
            }

        }

       
    },

    applySpriteSpin: function(){

        frames = this.getImageFrames();

        var spin = $('#spritespin');
        
        spin.spritespin({
            source: frames,
            width: 1920,
            sense: -1,
            height: 1080,
            animate: false,
            onLoad: function(){
                // hide solo image
                oldState = this.state;
                newState = oldState;
                newState = immutabilityHelpers( oldState, {hideSoloImage: {$set: true} });

                if(this.isMounted()){
                    this.setState(newState);
                }

                // show spritespin
            }.bind(this),
            onFrame: function(e, data){
                // destroy existing tooltips;
                this.props.destroyTooltip();  

                if(data.frame !== data.stopFrame){

                    oldState = this.state;
                    newState = oldState;
                    newState = immutabilityHelpers( oldState, {svgClasses: 
                                                                {hide: {$set: true} 
                                                              }
                                });
                    
                    if(this.isMounted()){
                        this.setState(newState);
                    }
                }
            }.bind(this)
        });

        spin.bind("onAnimationStop", function(){
            console.log("stop animation");
            var that = this;
            
            oldState = this.state;
            newState = oldState;
            newState = immutabilityHelpers( oldState, {svgClasses: 
                                                        {hide: {$set: false} 
                                                      }
                        });

            if(that.isMounted()){
                that.setState(newState);
            }

            buildingToHighlight = this.props.buildingToHighlight;
            
            if(!_.isUndefined(buildingToHighlight)){
                this.displayHighlightedTooltip();
            }

            // check if shadow image was selected previously and set state accordingly
            if(window.prevShadowState){
                this.props.updateRotateShadow(window.prevShadowState);
                window.prevShadowState = false;
            }

        }.bind(this)); 

    },

    displayHighlightedTooltip: function(){
        var baseSelector , imageType;

        imageType = this.props.imageType;

        if(imageType === "master"){
          baseSelector = '.building';
        }
        else if(imageType === "buildingFloorGrps"){
          baseSelector = '.floor_group';  
        }
        else{
          baseSelector = '.apartment';
        }        
         
        buildingToHighlight = this.props.buildingToHighlight;
        
        highlightedBuildingSelector = baseSelector+buildingToHighlight.id; 
        highlightedBuildingName = buildingToHighlight.building_name;  

        this.props.showTooltip(highlightedBuildingName,highlightedBuildingSelector);
    },


    componentDidMount: function() {

        var breakpoints = this.props.breakpoints;
        var imageType = this.props.imageType;
        
        this.applyPanzoom();

        // decide whether or not to initialise spritespin, if breakpoints length is 1 the no need of spritespin
        if(breakpoints.length>1){
            this.applySpriteSpin();
        }
       
    },

    componentDidUpdate: function(prevProps, prevState) {
        spin = $("#spritespin");
        data = spin.spritespin("data");

        breakpoints = this.props.breakpoints;

        if(_.isUndefined(data)&&(breakpoints.length>1)){
            this.applySpriteSpin();
        }
    },

    getMasterImagePath: function(imageType){
        var imagePath="";
        var baseImagePath="";
        var masterImagePrefix = "master-";

        if(imageType==="master"){
          baseImagePath = BASEURL+'/projects/'+window.projectId+'/'+imageType+'/';
          imagePath = baseImagePath+masterImagePrefix+'{frame}.jpg';
        }
        else{
          buildingId = this.props.buildingId;

          baseImagePath = BASEURL+'/projects/'+window.projectId+'/buildings/'+buildingId+'/';

          imagePath = baseImagePath+masterImagePrefix+'{frame}.jpg';
          
        }

        return {"imagePath":imagePath,"baseImagePath":baseImagePath};
        
    },

    rotateSpriteSpin: function(){
        var breakpoints = [];
        var spin, nextbreakpoint;

        // destroy existing tooltips;
        this.props.destroyTooltip(); 

        prevShowShadow = this.props.showShadow;
        
        // store previous shadow state, to later use it to update main shadow state
        prevShadowState = prevShowShadow;

        if( this.props.showShadow ){
            this.props.updateRotateShadow(false);
        }       

        breakpoints = this.props.breakpoints;
        currentBreakpoint = parseInt(this.props.chosenBreakpoint);

        // find index of current breakpoint in the array of breakpoints and play sprite spin to the next breakpoint
        indexOfCurrent = _.indexOf(breakpoints, currentBreakpoint);

        if(indexOfCurrent === breakpoints.length-1){
            nextbreakpoint = breakpoints[0];
        }else{
            nextbreakpoint = breakpoints[indexOfCurrent+1];
        }
        
        spin = $('#spritespin');
        api = spin.spritespin("api");
        api.playTo(nextbreakpoint);

        // update chosen breakpoint in the state data
        this.props.updateChosenBreakPoint(nextbreakpoint);
    },

    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
    }, 

    componentWillReceiveProps: function(nextProps) {
        prevBreakPoint = this.props.chosenBreakpoint;
        newBreakPoint = nextProps.chosenBreakpoint;

        applyFiltersSvgCheck = nextProps.applyFiltersSvgCheck;

        if((prevBreakPoint===newBreakPoint)&&(applyFiltersSvgCheck)){
            svgKeyType = "random";
        }
        else{
            svgKeyType = "breakpoint" ;
        }
    },  

    render: function(){

        var domToDisplay;
        var windowHeight = window.innerHeight ;
        var svgKey;


        var  parentContainerStyle ={
          "height" : windowHeight,
          "minWidth" : windowHeight * 1.78
        }; 

        var rotateClasses = classNames({
          'rotate': true,
          'hide': !this.state.hideSoloImage
        }); 

        var imageContainerStyle = {
          "height": windowHeight,
          "minWidth": windowHeight * 1.78
        }; 


        var imageContainStyle = {
          "height": windowHeight
        }; 

        showShadow = this.props.showShadow;
        var shadowImageClasses = classNames({
          'img-responsive': true,
          'fit': true,
          'no-shadow': true,
          'hide-shadow': showShadow,
          'hide': !this.state.hideSoloImage
        }); 

        var soloImageClasses = classNames({
            'img-responsive': true,
            'fit': true,
            'no-shadow': true,
            'hide-shadow': showShadow,            
            'hide': this.state.hideSoloImage
        });

        var soloImgUrl = "#"; 
        var soloImgUrl = "#"; 

        var shadowImages = this.props.shadowImages;
        var shadowImgUrl = "#";
        shadowIndex = this.props.chosenBreakpoint;

        if(shadowImages.length>0){
            shadowImgUrl = shadowImages[shadowIndex];
        }

        var buildings = this.props.buildings;

        var buildingToHighlight = this.props.buildingToHighlight;
        if(_.isEmpty(buildingToHighlight)){
          if(buildings.length>0)
            buildingToHighlight = buildings[0];
          else
            buildingToHighlight = {}

        } 


        path = this.getMasterImagePath(this.props.imageType);
        svgBaseUrl = path["baseImagePath"];

        frames = this.getImageFrames();
        soloImageUrl = frames[0];

        
        if(svgKeyType==="random"){
            svgkey = parseInt(this.getRandomArbitrary(1,100));
        }
        else{
            svgkey = this.props.chosenBreakpoint;
        }

        cardListFor = this.props.cardListFor;
        cardListForId = this.props.cardListForId;

        if(window.isMobile){
            domToDisplay = (

                <div className="us-right-content">
                    <div className="image-contain">
                        <div ref="imageContainer" className="image" style={imageContainerStyle}>

                            <SvgContainer 
                                ref="svgContainer"
                                key={svgkey} 
                                svgData={this.state} 
                                chosenBreakpoint={this.props.chosenBreakpoint}
                                buildings={ buildings} 
                                buildingToHighlight={buildingToHighlight} 
                                imageType = {this.props.imageType}
                                svgBaseUrl = {svgBaseUrl}
                                showTooltip={ this.props.showTooltip} 
                                updateUnitIndexToHighlight= {this.props.updateUnitIndexToHighlight}
                                applyFiltersSvgCheck = {this.props.applyFiltersSvgCheck}
                                updatefiltersSvgCheck = {this.props.updatefiltersSvgCheck}
                                cardListFor = {cardListFor}
                                cardListForId = {cardListForId} 
                                panToZoomedGroup = {this.panToZoomedGroup}            
                            />                        
                            
                            <div ref="spritespin" id="spritespin" className={shadowImageClasses}></div>
                            <img 
                                key={svgkey+1} 
                                src={soloImageUrl} 
                                className={soloImageClasses} 
                            />
                            <img 
                                src={shadowImgUrl}
                                key={svgkey+2}  
                                className="img-responsive shadow fit" 
                            />

                        </div>
                    </div>

                    <div ref="next" className={rotateClasses} onClick={this.rotateSpriteSpin}>

                    </div>
                </div>         

            );  
        }
        else{
            domToDisplay = (

                <div className="us-right-content" style={parentContainerStyle}>
                    <div className="footer">
                          <h2 className="primary-txt text-right m-b-5"> Call 1800 180 180 180</h2>
                          <a href="https://www.commonfloor.com/" target="_blank"> Commonfloor </a> | <a href="#" target="_blank">FAQ  </a> | <a href="https://play.google.com/store/apps/details?id=com.commonfloor&hl=en" target="_blank"> Mobile Apps  </a>
                          <br /> © 2015 Commonfloor Inc. |<a href="https://www.commonfloor.com/privacy-policy" target="_blank"> Privacy Policy</a>
                    </div>

                    <div className={rotateClasses}>
                        <i id="next" className="i-icon i-icon-rotate" onClick={this.rotateSpriteSpin}></i> Press To Rotate
                    </div>

                    <div ref="imageContain" className="image-contain" style={imageContainStyle}>
                        <div ref="imageContainer" className="image" style={imageContainerStyle}>

                            <SvgContainer 
                                ref="svgContainer"
                                key={svgkey} 
                                svgData={this.state} 
                                chosenBreakpoint={this.props.chosenBreakpoint}
                                buildings={ buildings} 
                                buildingToHighlight={buildingToHighlight} 
                                imageType = {this.props.imageType}
                                svgBaseUrl = {svgBaseUrl}
                                showTooltip={ this.props.showTooltip} 
                                updateUnitIndexToHighlight= {this.props.updateUnitIndexToHighlight}
                                applyFiltersSvgCheck = {this.props.applyFiltersSvgCheck}
                                updatefiltersSvgCheck = {this.props.updatefiltersSvgCheck}
                                cardListFor = {cardListFor}
                                cardListForId = {cardListForId} 
                                panToZoomedGroup = {this.panToZoomedGroup}                
                            />                          

                            <div ref="spritespin" id='spritespin' className={shadowImageClasses}></div>
                            <img 
                                key={svgkey+1} 
                                src={soloImageUrl} 
                                className={soloImageClasses} 
                            />
                            <img 
                                src={shadowImgUrl}
                                key={svgkey+2}  
                                className="img-responsive shadow fit" 
                            />

                        </div>
                    </div>
                </div>        

            ); 
        }
 

        return domToDisplay;
    }
});

module.exports = SteponeImage;
