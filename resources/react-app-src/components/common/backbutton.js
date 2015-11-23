var React = require('react');
var classNames = require('classnames');

var BackButton = React.createClass({
  
    render: function () {
        var domToDisplay, backbuttonType;

        backStyleType = this.props.backStyleType;

        if(window.isMobile){

            if(backStyleType === "light"){
                domToDisplay = (
                    <div className="col-xs-2 p-0">
                        <i className="i-back i-icon backIcon"></i>
                    </div>
                );                
            }
            else if(backStyleType === "dark"){
                domToDisplay = (    
                    <a href="#">
                        <i className="i-icon i-dark-arrow"></i>
                    </a>
                );                   
            }

        }
        else{

            if(backStyleType = "withoutLabel"){
                domToDisplay = (
                    <span className="bckArrow">
                        <i className="fa fa-arrow-left"></i>
                    </span>
                ); 
            }
            else if(backStyleType = "withLabel"){
                domToDisplay = (
                    <div className="col-xs-12 backOuter" style="cursor:pointer;">
                        <i className="i-icon i-dark-arrow"></i>
                        <span className="back text-uppercase" > back </span>
                    </div>
                );
            }
           
        }


        return domToDisplay;
    } 

});

module.exports = BackButton;