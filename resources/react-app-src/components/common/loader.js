var React = require('react');
var classNames = require('classnames');

var Loader = React.createClass({
  
    render: function () {
        
        loaderClasses = classNames({
            "loaderOuter": true,
            "hide": this.props.hide
        });


        return (
            <div className={loaderClasses}>
                <div className="loader">
                  <div className="square" ></div>
                  <div className="square"></div>
                  <div className="square last"></div>
                  <div className="square clear"></div>
                  <div className="square"></div>
                  <div className="square last"></div>
                  <div className="square clear"></div>
                  <div className="square "></div>
                  <div className="square last"></div>                
                </div>
             </div>			
          );
    } 

});

module.exports = Loader;