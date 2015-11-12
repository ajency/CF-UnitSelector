var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');



var SteptwoImage = React.createClass({

    componentDidMount: function() {
        var frames =["http://commonfloorlocal.com/projects/25/buildings/3/master-00.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-01.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-02.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-03.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-04.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-05.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-06.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-07.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-08.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-09.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-10.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-11.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-12.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-13.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-14.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-15.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-16.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-17.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-18.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-19.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-20.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-21.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-22.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-23.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-24.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-25.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-26.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-27.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-28.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-29.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-30.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-31.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-32.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-33.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-34.jpg", "http://commonfloorlocal.com/projects/25/buildings/3/master-35.jpg"];

        var spin = $('#spritespin2');
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

                        <div ref="spritespin" id='spritespin2' className={shadowImageClasses}></div>
                         
                        <img  src="http://commonfloorlocal.com/projects/25/shadow/shadow-00.jpg" className="img-responsive shadow fit" />

                    </div>
                </div>
            </div>        

        );  

        return domToDisplay;
    }
});

module.exports = SteptwoImage;
