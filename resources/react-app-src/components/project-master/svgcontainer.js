var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Isvg = require('react-inlinesvg');

var SvgContainer = React.createClass({
    mixins: [PureRenderMixin],		

    render: function(){
    	var BASEURL= "http://commonfloorlocal.com";
    	var svgUrl= BASEURL+'/images/cf-mobile/project.svg';
        
        return (

                  <div className="svg-area" >
                  <Isvg src={svgUrl}>
	                  Here's some optional content for browsers that don't support XHR or inline
	                  SVGs. You can use other React components here too. Here, I'll show you.

                  </Isvg>  
                  </div>
        );
    }
});

module.exports = SvgContainer;