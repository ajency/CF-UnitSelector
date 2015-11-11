var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('../modal/modal');
var SteponeImage = require('../imagecontainer/steponeimage');
var Link = require('react-router-component').Link; 



var StepOne = React.createClass({

    render: function(){
        
            domToDisplay = (
                <div id="wrapper">

                    <div id="page-content-wrapper">

                        <SteponeImage
                            ref= "imageContainerone"                      
                        />
                        

                    </div>

       
                </div>
            ); 

        return domToDisplay;
    }
});

module.exports = StepOne;
