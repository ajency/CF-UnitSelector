var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Isvg = require('react-inlinesvg');

var SvgContainer = React.createClass({

    render: function(){
      var chosenBreakpoint = this.props.chosenBreakpoint;

      var svgNamePrefix = "ProjectView";

    	var svgUrl= window.baseUrl+'/projects/'+(window.projectId)+'/master/'+svgNamePrefix+'_'+chosenBreakpoint+'.svg'; //will come based on breakpoint
        
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