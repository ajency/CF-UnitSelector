var React = require('react');
var classNames = require('classnames');
var Router = require('react-router-component');

var BackButton = React.createClass({
    mixins: [Router.NavigatableMixin],        
    
    getPreviousStepUrl: function(navigationType, navigationId){

      var url = "";

      switch(navigationType){
        case "building":
          url = "/";
          break;
        case "group":
          url = "/buildings/";
          break;
        case "unit":
          url = "/buildings/"+navigationId+"/group/";
          break;
        case "group":
          url = "/units/";
          break;          
        default:
          url = "/buildings/";
      }

      return url;


    },

    getPreviousEntityId: function(){
        currentCardListFor = this.props.cardListFor;
    },    

    goToPreviousStep: function(e){
        e.preventDefault();

        navigationType = this.props.navigationType; 
        navigationId = this.props.navigationId; 
        entityId = this.props.entityId; 

        urlToNavigate = this.getPreviousStepUrl(navigationType,navigationId);        

        urlToNavigate =  urlToNavigate+entityId;
        
        alert(urlToNavigate);

        this.navigate(urlToNavigate);
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