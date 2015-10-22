var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var AppActions = require('../../actions/app-actions.js');



var SunToggle = React.createClass({
    mixins: [PureRenderMixin],	

    render: function(){

        var showShadow = this.props.showShadow;
   	
    	var toggleSunClasses = classNames({
    		'sun-toggle': true,
    		'sun-highlight': showShadow 
    	}); 

        if(window.isMobile){
            domToDisplay = (<div className={toggleSunClasses} onClick={this.props.toggelSunView}>
                <i className="i-sun i-icon"></i>
            </div>);            
        }
        else{
            domToDisplay = ( <div className="col-sm-3">
                    <a href="#" className="sun-toggle btn btn-default btn-sm">
                        <i className="fa fa-sun-o"></i>
                        <span className="sunText text-uppercase">Sun</span>
                    </a>
                  </div>
                );
        }
    	
        return domToDisplay;
    }
});

module.exports = SunToggle;