var React = require('react');
var classNames = require('classnames');

var BackButton = React.createClass({
  
    render: function () {
        var domToDisplay;

        if(window.isMobile){
            domToDisplay = (
                            <div className="col-xs-2 p-0">
                                <i className="i-back i-icon backIcon"></i>
                            </div>
            );
        }
        else{
            domToDisplay = (
                        <span className="bckArrow">
                            <i className="fa fa-arrow-left"></i>
                        </span>
            );            
        }


        return domToDisplay;
    } 

});

module.exports = BackButton;