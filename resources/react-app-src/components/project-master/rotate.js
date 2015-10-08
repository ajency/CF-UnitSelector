var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var Rotate = React.createClass({
    mixins: [PureRenderMixin],	

    render: function(){
            return (
                <div className="rotate">
                    
                </div>
            );
        }
});

module.exports = Rotate;