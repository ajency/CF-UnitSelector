var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

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