var React = require('react');
var classNames = require('classnames');

var MessageBox = React.createClass({

    getInitialState: function() {
        var stateData = {
            showBox: true
        }
        return stateData;
    },

    closeBox: function(){
        newstate = {
            showBox: false
        }

        this.setState(newstate);
    },
  
    render: function () {
        var msgButtonClasses, message;

        message = this.props.message;

        
        msgBoxClasses = classNames({
            "messageBox": window.isMobile,
            "messageBoxDesk": !window.isMobile,
            "hide": !this.state.showBox
        });

        msgClass = classNames({
            "message":!window.isMobile,
            "msg" : window.isMobile

        });


        return (
            
            <div className={msgBoxClasses}>
                <div className="tip">Tip</div>
                <div className={msgClass}>
                    {message}
                    <a className="msgBtn" href="#" onClick={this.closeBox}>X</a> 
                </div>
            </div>
          );
    } 

});

module.exports = MessageBox;