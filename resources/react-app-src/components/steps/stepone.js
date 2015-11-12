var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('../modal/modal');
var SteponeImage = require('../imagecontainer/steponeimage');
var Link = require('react-router-component').Link; 
var AppStore = require('../../stores/app-store.js');


function getStateData(){
    return AppStore.getStateData();
}

var StepOne = React.createClass({

    getInitialState: function() {
        return getStateData();
    }, 

    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
    },  

    _onChange:function(){
      this.setState(getStateData());
    },      

    render: function(){
        
        var domToDisplay;

        style = {
            "position" : "absolute",
            "zIndex" : "99999",
        }

        url = "/buildings/21";

        if(window.isMobile){

            domToDisplay = (
                <div id="site-wrapper">

                    <SteponeImage
                        ref= "imageContainerone"                      
                    />

                    <div style={style}>
                        <Link href={url}><h1 className="margin-none">NEXT STEP 2<i className="fa fa-angle-right"></i></h1></Link>
                    </div>
       
                </div>
            ); 
        }
        else{

            domToDisplay = (
                <div id="wrapper">

                    <div id="page-content-wrapper">

                        <SteponeImage
                            ref= "imageContainerone"                      
                        />
                        

                    </div>

                    <div style={style}>
                        <Link href={url}><h1 className="margin-none">NEXT STEP 2<i className="fa fa-angle-right"></i></h1></Link>
                    </div>


       
                </div>
            ); 
        }



        return domToDisplay;
    }
});

module.exports = StepOne;
