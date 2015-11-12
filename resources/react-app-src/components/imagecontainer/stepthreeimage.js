var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');



var StepthreeImage = React.createClass({

    componentDidMount: function() {
        var frames =["http://commonfloorlocal.com/projects/25/master/master-00.jpg", "http://commonfloorlocal.com/projects/25/master/master-01.jpg", "http://commonfloorlocal.com/projects/25/master/master-02.jpg", "http://commonfloorlocal.com/projects/25/master/master-03.jpg", "http://commonfloorlocal.com/projects/25/master/master-04.jpg", "http://commonfloorlocal.com/projects/25/master/master-05.jpg", "http://commonfloorlocal.com/projects/25/master/master-06.jpg", "http://commonfloorlocal.com/projects/25/master/master-07.jpg", "http://commonfloorlocal.com/projects/25/master/master-08.jpg", "http://commonfloorlocal.com/projects/25/master/master-09.jpg", "http://commonfloorlocal.com/projects/25/master/master-10.jpg", "http://commonfloorlocal.com/projects/25/master/master-11.jpg", "http://commonfloorlocal.com/projects/25/master/master-12.jpg", "http://commonfloorlocal.com/projects/25/master/master-13.jpg", "http://commonfloorlocal.com/projects/25/master/master-14.jpg", "http://commonfloorlocal.com/projects/25/master/master-15.jpg", "http://commonfloorlocal.com/projects/25/master/master-16.jpg", "http://commonfloorlocal.com/projects/25/master/master-17.jpg", "http://commonfloorlocal.com/projects/25/master/master-18.jpg", "http://commonfloorlocal.com/projects/25/master/master-19.jpg", "http://commonfloorlocal.com/projects/25/master/master-20.jpg", "http://commonfloorlocal.com/projects/25/master/master-21.jpg", "http://commonfloorlocal.com/projects/25/master/master-22.jpg", "http://commonfloorlocal.com/projects/25/master/master-23.jpg", "http://commonfloorlocal.com/projects/25/master/master-24.jpg", "http://commonfloorlocal.com/projects/25/master/master-25.jpg", "http://commonfloorlocal.com/projects/25/master/master-26.jpg", "http://commonfloorlocal.com/projects/25/master/master-27.jpg", "http://commonfloorlocal.com/projects/25/master/master-28.jpg", "http://commonfloorlocal.com/projects/25/master/master-29.jpg", "http://commonfloorlocal.com/projects/25/master/master-30.jpg", "http://commonfloorlocal.com/projects/25/master/master-31.jpg", "http://commonfloorlocal.com/projects/25/master/master-32.jpg", "http://commonfloorlocal.com/projects/25/master/master-33.jpg", "http://commonfloorlocal.com/projects/25/master/master-34.jpg", "http://commonfloorlocal.com/projects/25/master/master-35.jpg"];

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
                
            }
        });        
    },

    render: function(){

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



        domToDisplay = (

            <div className="us-right-content" style={parentContainerStyle}>
                <div className="footer">
                    <h2 className="primary-txt text-right m-b-5"> Call 1800 180 180 180</h2>
                    <a href="#"> Commonfloor </a> | <a href="#">FAQ  </a> | <a href="#"> Mobile Apps  </a>
                    <br /> © 2015 Commonfloor Inc. |<a href="#"> Privacy Policy</a>
                 </div>

                <div className={rotateClasses}>
                    <i id="next" className="i-icon i-icon-rotate"></i> Press To Rotate
                </div>

                <div ref="imageContain" className="image-contain" style={imageContainStyle}>
                    <div ref="imageContainer" className="image" style={imageContainerStyle}>

                        <div ref="spritespin" id='spritespin' className={shadowImageClasses}></div>
                         
                        <img  src="http://commonfloorlocal.com/projects/25/shadow/shadow-00.jpg" className="img-responsive shadow fit" />

                    </div>
                </div>
            </div>        

        );  

        return domToDisplay;
    }
});

module.exports = StepthreeImage;
