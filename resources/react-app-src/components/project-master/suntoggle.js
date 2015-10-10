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
    	
        return (
            <div className={toggleSunClasses} onClick={this.props.toggelSunView}>
                <i className="i-sun i-icon"></i>
            </div>
        );
    }
});

module.exports = SunToggle;