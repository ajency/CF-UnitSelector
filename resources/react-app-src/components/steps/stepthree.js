var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('../modal/modal');
var StepthreeImage = require('../imagecontainer/stepthreeimage');
var Link = require('react-router-component').Link; 



var StepThree = React.createClass({

    render: function(){
        style = {
            "position" : "absolute",
            "zIndex" : "99999",
        }

        url = "/units/162";

        domToDisplay = (
            <div id="wrapper">

                <div id="page-content-wrapper">

                    <StepthreeImage
                        ref= "imageContainerone"                      
                    />
                    

                </div>

                <div style={style}>
                    <Link href={url}><h1 className="margin-none">NEXT STEP 4<i className="fa fa-angle-right"></i></h1></Link>
                </div>


   
            </div>
        ); 

        return domToDisplay;
    }
});

module.exports = StepThree;
