var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

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