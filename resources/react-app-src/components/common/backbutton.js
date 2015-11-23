var React = require('react');
var classNames = require('classnames');
var Router = require('react-router-component');

var BackButton = React.createClass({

    goToPreviousStep: function(e){
        alert("back click");
        e.preventDefault();
        // return this.navigate('/buildings/'+this.props.buildingId+'/group/'+this.props.groupId);
    },    
  
    render: function () {
        var domToDisplay, backbuttonType;

        backStyleType = this.props.backStyleType;

        if(window.isMobile){

            if(backStyleType === "light"){
                domToDisplay = (
                    <div className="col-xs-2 p-0" onClick={this.goToPreviousStep}>
                        <i className="i-back i-icon backIcon"></i>
                    </div>
                );                
            }
            else if(backStyleType === "dark"){
                domToDisplay = (    
                    <a href="#" onClick={this.goToPreviousStep}>
                        <i className="i-icon i-dark-arrow"></i>
                    </a>
                );                   
            }

        }
        else{

            if(backStyleType === "withoutLabel"){
                domToDisplay = (
                    <span className="bckArrow" onClick={this.goToPreviousStep}>
                        <i className="fa fa-arrow-left"></i>
                    </span>
                ); 
            }
            else if(backStyleType === "withLabel"){
                style = {cursor:"pointer"};
                domToDisplay = (
                    <div className="col-xs-12 backOuter" style={style} onClick={this.goToPreviousStep}>
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