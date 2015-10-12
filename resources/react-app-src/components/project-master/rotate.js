var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Rotate = React.createClass({
    mixins: [PureRenderMixin],

    getDefaultProps: function(){

    	return {
    		detailIndex: 0,
        	details : [0, 30, 50] // 00 , 15, 45 , 60
		}
	}, 

    render: function(){
            return (
                <div ref="next" className="rotate" onClick={this.props.setDetailIndex.bind(this, this.props.detailIndex+1)}>
                    
                </div>
            );
        }
});

module.exports = Rotate;