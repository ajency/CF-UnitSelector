var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var SvgContainer = require('../project-master/svgcontainer');

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
    },

    render: function(){


        // @todo pass winfow height and width as part of state
        var windowHeight = window.innerHeight ;
        
        showShadow = this.props.showShadow;

        var BASEURL= "http://commonfloorlocal.com";
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
          'hide-shadow': showShadow === false
        }); 
   

        return (
            <div className="us-right-content">
              <div className="image-contain">

                
                <div ref="imageContainer" className="image" style={imageContainerStyle}>
                  <SvgContainer/>
                  <img src={shadowImgUrl} className={shadowImageClasses} />
                  <img src={imgUrl} className="img-responsive shadow fit"/>

                </div>
                
              </div>
            </div>
        );
    }
});

module.exports = ImageContainerTemplate;