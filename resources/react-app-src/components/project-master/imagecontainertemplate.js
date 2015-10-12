var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var SvgContainer = require('../project-master/svgcontainer');

var spin;
var api;
var detailIndex = 0;
var details = [0, 30, 50]


var ImageContainerTemplate = React.createClass({
    mixins: [PureRenderMixin],	

    componentDidMount: function(){
        var $imageContainerDom = $(this.refs.imageContainer);

        var panZoomSettings = {
             contain: 'invert',
             minScale: 1,
             disablePan: false,
             disableZoom: false
        };
        
        $imageContainerDom.panzoom(panZoomSettings);

        $imageContainerDom.panzoom("setMatrix", [1.1, 0, 0, 1.1, -285, 9]);

        var frames = SpriteSpin.sourceArray('../html/cf-mobile/img/mantri/ProjectView_{frame}.jpg', {
         frame: [1, 60],
         digits: 4
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

        console.log("apiii");

        spin.bind("onLoad", function() {
         var data = api.data;
           data.stage.prepend($(".details .detail")); // add current details
           data.stage.find(".detail").hide(); // hide current details
         }).bind("onFrame", function() {
           var data = api.data;
           data.stage.find(".detail:visible").stop(false).fadeOut();
           data.stage.find(".detail.detail-" + data.frame).stop(false).fadeIn();
         });            
    },

    componentDidUpdate: function(){

    },

    incrementIndex: function(){
      detailIndex = detailIndex+1;
    },

    resetIndex: function(){
      detailIndex = detailIndex-1;
    }



    setDetailIndex: function() {
       this.incrementIndex();

       if (detailIndex < 0) {
         detailIndex = details.length - 1;
       }
       if (detailIndex >= details.length) {
         this.resetIndex();
       }

       api.playTo(details[detailIndex]);
    },    

    render: function(){


        // @todo pass winfow height and width as part of state
        var windowHeight = window.innerHeight ;
        
        showShadow = this.props.showShadow;

        var BASEURL= window.baseUrl;
        var imgUrl= BASEURL+'/images/cf-mobile/Project-noshadow.jpg';
        var shadowImgUrl= BASEURL+'/images/cf-mobile/Project.jpg';

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
   

        return (

            <div className="us-right-content">
                <div className="image-contain">
                    
                    <div ref="imageContainer" className="image" style={imageContainerStyle}>
                        <SvgContainer/>

                        <div ref="spritespin" id="spritespin" className={shadowImageClasses}></div>
                        <img src={shadowImgUrl} className="img-responsive shadow fit"/>
                       
                    </div>
                </div>

                <div ref="next" className="rotate" onClick={this.setDetailIndex}>
                    
                </div>
            </div>            

        );
    }
});

module.exports = ImageContainerTemplate;