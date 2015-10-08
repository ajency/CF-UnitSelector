var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var ElementPan = require('react-element-pan');

var ImageContainerTemplate = React.createClass({
    mixins: [PureRenderMixin],	

    componentDidMount: function(){
        var $imageContainerDom = $(this.refs.imageContainer.getDOMNode());

        var windowHeight = $(window).innerHeight() ;
        // $('.image-contain img').css('height', windowHeight);

         $imageContainerDom.css('height', windowHeight);
         $imageContainerDom.css('min-width', windowHeight * 1.6);
      
      

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
        console.log("render ImageContainerTemplate");
        showShadow = this.props.showShadow;

        var BASEURL= "http://commonfloorlocal.com";
        var imgUrl= BASEURL+'/images/cf-mobile/Project-noshadow.jpg';
        var shadowImgUrl= BASEURL+'/images/cf-mobile/Project.jpg';

        var shadowImageClasses = React.addons.classSet({
          'img-responsive': true,
          'fit': true,
          'no-shadow': true,
          'hide-shadow': showShadow != 1
        })
          

        return (
            <div className="us-right-content">
              <div className="image-contain">

                
                <div ref="imageContainer" className="image">

                  <div className="svg-area" >
                    
                  </div>
                  <img src={shadowImgUrl} className={shadowImageClasses}/>
                  <img src={imgUrl} className="img-responsive shadow fit"/>

                </div>
                
              </div>
            </div>
        );
    }
});

module.exports = ImageContainerTemplate;