var React = require('react');
var classNames = require('classnames');

var Loader = React.createClass({
  
    render: function () {
        
        loaderClasses = classNames({
            "loaderOuter": true,
            "hide": this.props.hide
        });


        return (
			<div className={loaderClasses}><div className="loader">Loading...</div></div>
          );
    } 

});

module.exports = Loader;