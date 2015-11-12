var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var SvgContainer = require('../project-master/svgcontainer');

var PROJECTID = window.projectId;
var BASEURL = window.baseUrl;

var panZoomSettings = {
     startTransform: 'scale(1.0)',
     contain: 'invert',
     minScale: 1,
     disablePan: false,
     disableZoom: false
};

var svgData = {
    svgClasses: {
      'svg-area': true,
       'hide': false
    }
};

var SteponeImage = React.createClass({

    applyPanzoom: function(){
        var $imageContainerDom = $(this.refs.imageContainer);
        $imageContainerDom.panzoom(panZoomSettings);

        if(window.isMobile){
          $imageContainerDom.panzoom("setMatrix", [1.1, 0, 0, 1.1, -285, 9]);
        }

        $imageContainerDom.on('panzoomend', function(e, panzoom, matrix, changed) {
          if (changed) {
            // deal with drags or touch moves
            alert("drag");
          } else {
            // deal with clicks or taps
            alert("click");
          }
        });        
    },

    applySpriteSpin: function(){
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

        var spin = $('#spritespin');
        
        spin.spritespin({
            source: frames,
            width: 1920,
            sense: -1,
            height: 1080,
            animate: false,
            onLoad: function(){
                
            },
            onFrame: function(e, data){
                console.log("On frame sprite spin");
                console.log(this.props.imageType);
            }.bind(this),
        }); 

    },

    componentDidMount: function() {

        this.applyPanzoom();

        this.applySpriteSpin();
       
    },

    getMasterImagePath: function(imageType){
        var imagePath="";
        var baseImagePath="";
        var masterImagePrefix = "master-";

        if(imageType==="master"){
          baseImagePath = BASEURL+'/projects/'+PROJECTID+'/'+imageType+'/';
          imagePath = baseImagePath+masterImagePrefix+'{frame}.jpg';
        }
        else{
          buildingId = this.props.buildingId;

          baseImagePath = BASEURL+'/projects/'+PROJECTID+'/buildings/'+buildingId+'/';

          imagePath = baseImagePath+masterImagePrefix+'{frame}.jpg';
          
        }

        return {"imagePath":imagePath,"baseImagePath":baseImagePath};
        
    },

    rotateSpriteSpin: function(){
        var breakpoints = [];
        var spin, nextbreakpoint;

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

    render: function(){

        var domToDisplay;
        var windowHeight = window.innerHeight ;


        var  parentContainerStyle ={
          "height" : windowHeight,
          "minWidth" : windowHeight * 1.78
        }; 

        var rotateClasses = classNames({
          'rotate': true,
          'hide': false
        }); 

        var imageContainerStyle = {
          "height": windowHeight,
          "minWidth": windowHeight * 1.78
        }; 


        var imageContainStyle = {
          "height": windowHeight
        }; 

        showShadow = false;
        var shadowImageClasses = classNames({
          'img-responsive': true,
          'fit': true,
          'no-shadow': true,
          'hide-shadow': showShadow 
        });  

        var shadowImgUrl = "#";
        var shadowImgUrl = "http://commonfloorlocal.com/projects/25/shadow/shadow-00.jpg";

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



        if(window.isMobile){
            domToDisplay = (

                <div className="us-right-content">
                    <div className="image-contain">
                        <div ref="imageContainer" className="image" style={imageContainerStyle}>

                            <SvgContainer 
                                ref="svgContainer"
                                key={this.props.chosenBreakpoint} 
                                svgData={svgData} 
                                chosenBreakpoint={this.props.chosenBreakpoint}
                                buildings={ buildings} 
                                buildingToHighlight={buildingToHighlight} 
                                imageType = {this.props.imageType}
                                svgBaseUrl = {svgBaseUrl}
                                showTooltip={ this.props.showTooltip} 
                                updateUnitIndexToHighlight= {this.props.updateUnitIndexToHighlight}
                            />                        
                            
                            <div ref="spritespin" id="spritespin" className={shadowImageClasses}></div>
                            <img src={shadowImgUrl} className="img-responsive shadow fit" />

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
                        <a href="#"> Commonfloor </a> | <a href="#">FAQ  </a> | <a href="#"> Mobile Apps  </a>
                        <br /> © 2015 Commonfloor Inc. |<a href="#"> Privacy Policy</a>
                     </div>

                    <div className={rotateClasses} onClick={this.rotateSpriteSpin}>
                        <i id="next" className="i-icon i-icon-rotate"></i> Press To Rotate
                    </div>

                    <div ref="imageContain" className="image-contain" style={imageContainStyle}>
                        <div ref="imageContainer" className="image" style={imageContainerStyle}>

                            <SvgContainer 
                                ref="svgContainer"
                                key={this.props.chosenBreakpoint} 
                                svgData={svgData} 
                                chosenBreakpoint={this.props.chosenBreakpoint}
                                buildings={ buildings} 
                                buildingToHighlight={buildingToHighlight} 
                                imageType = {this.props.imageType}
                                svgBaseUrl = {svgBaseUrl}
                                showTooltip={ this.props.showTooltip} 
                                updateUnitIndexToHighlight= {this.props.updateUnitIndexToHighlight}
                            />                          

                            <div ref="spritespin" id='spritespin' className={shadowImageClasses}></div>
                             
                            <img  src={shadowImgUrl} className="img-responsive shadow fit" />

                        </div>
                    </div>
                </div>        

            ); 
        }
 

        return domToDisplay;
    }
});

module.exports = SteponeImage;
