var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var SvgContainer = React.createClass({
    mixins: [PureRenderMixin],		

    render: function(){
            return (

                  <div className="svg-area" >
                    
                  </div>
            );
        }
});

module.exports = SvgContainer;