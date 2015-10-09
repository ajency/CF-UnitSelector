var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var SunToggle = React.createClass({
    mixins: [PureRenderMixin],		

    render: function(){
            return (
                <div className="sun-toggle">
                    <i className="i-sun i-icon"></i>
                </div>
            );
        }
});

module.exports = SunToggle;