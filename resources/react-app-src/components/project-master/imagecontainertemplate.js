var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var SvgContainer = require('../project-master/svgcontainer');

var spin;
var api;
var detailIndex = 0;
var details = [0, 30, 50]
var PROJECTID = window.projectId;
var BASEURL = window.baseUrl;

var svgData = {
          svgClasses: {'svg-area': true,
                       'hide': false
                  }
        }

var ImageContainerTemplate = React.createClass({

    getInitialState: function() {
        return svgData;
    },


    componentDidMount: function(){

        console.log("componentDidMount for image")

        details = this.props.breakpoints;
        
        var $imageContainerDom = $(this.refs.imageContainer);

        var panZoomSettings = {
             contain: 'invert',
             minScale: 1,
             disablePan: false,
             disableZoom: false
        };
        
        $imageContainerDom.panzoom(panZoomSettings);

        $imageContainerDom.panzoom("setMatrix", [1.1, 0, 0, 1.1, -285, 9]);

        var masterImagePrefix = "master-";
        var digitsInName = 2; 

        var projectMasterImgUrl = BASEURL+'/projects/'+PROJECTID+'/master/'+masterImagePrefix+'{frame}.jpg'

        var frames = SpriteSpin.sourceArray(projectMasterImgUrl, {
         frame: [1, 60],
         digits: digitsInName
       });

        spin = $(this.refs.spritespin);
        
        spin.spritespin({
         source: frames,
         width: 1920,
         sense: -1,
         height: 1080,
         animate: false
        });

        // get the api object. This is used to trigger animation to play up to a specific frame
        api = spin.spritespin("api");

        spin.bind("onLoad", function() {
         var data = api.data;
           data.stage.prepend($(".details .detail")); // add current details
           data.stage.find(".detail").hide(); // hide current details
         })

        spin.bind("onFrame", function() {
           var data = api.data;
           data.stage.find(".detail:visible").stop(false).fadeOut();
           data.stage.find(".detail.detail-" + data.frame).stop(false).fadeIn();
         });    

        spin.bind("onAnimationStop", function(){

          svgData = {
              svgClasses: {'svg-area': true,
                       'hide': false
                  }
        }

        this.setState(svgData);
          

         }.bind(this))  ;       
    },

    componentDidUpdate: function(){

      details = this.props.breakpoints;
    },

    incrementIndex: function(){
      detailIndex = detailIndex+1;
    },

    resetIndex: function(){
      detailIndex = 0;
    },



    setDetailIndex: function() {

        svgData = {
          svgClasses: {'svg-area': true,
                       'hide': true
                  }
        }

        this.setState(svgData);

        // hide svg area
        $(this.refs.svgContainer).find("svg .svg-area").addClass("hide");

       // check if shadow image is present, if present then hide it
       prevShowShadow = this.props.showShadow;
       
       if( this.props.showShadow ){
          this.props.updateRotateShadow(false);
       }


       this.incrementIndex();
 
       if (detailIndex < 0) {
         detailIndex = details.length - 1;
       }
       if (detailIndex >= details.length) {
         this.resetIndex();
       }

       api.playTo(details[detailIndex]);


       this.props.updateChosenBreakPoint(details[detailIndex]);

    },    

    render: function(){


        // @todo pass winfow height and width as part of state
        var windowHeight = window.innerHeight ;
        
        showShadow = this.props.showShadow;

        var BASEURL= window.baseUrl;
        
        var shadowImagePrefix = "shadow-";

        var shadowImgUrl = BASEURL+'/projects/'+PROJECTID+'/shadow/'+shadowImagePrefix+''+this.props.chosenBreakpoint+'.jpg';

        var imageContainerStyle = {
          "height": windowHeight,
          "minWidth": windowHeight * 1.78
        }; 


        var shadowImageClasses = classNames({
          'img-responsive': true,
          'fit': true,
          'no-shadow': true,
          'hide-shadow': showShadow 
        }); 
   
        var buildings = this.props.buildings;

        return (

            <div className="us-right-content">
                <div className="image-contain">
                    
                    <div ref="imageContainer" className="image" style={imageContainerStyle}>
                        <SvgContainer 
                          ref="svgContainer"
                          svgData={svgData} 
                          chosenBreakpoint={this.props.chosenBreakpoint} 
                          key={this.props.chosenBreakpoint}
                          buildings = {buildings}
                        />

                        <div ref="spritespin" id="spritespin" className={shadowImageClasses}></div>
                        <img key={this.props.chosenBreakpoint+1} src={shadowImgUrl}  className="img-responsive shadow fit"/>
                       
                    </div>
                </div>

                <div ref="next" className="rotate" onClick={this.setDetailIndex}>
                    
                </div>
            </div>            

        );
    }
});

module.exports = ImageContainerTemplate;