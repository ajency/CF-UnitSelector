var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Isvg = require('react-inlinesvg');
var classNames = require('classnames');

var SvgContainer = React.createClass({

    componentDidMount: function(){

      $(document).ready(function(){
      svgDom = $(".svg-area");

      $(svgDom).find("svg .building").attr("class", "in-selection");

      });
     
    },

    svgLoaded: function(){
      svgDom = $(".svg-area");
      $(svgDom).find("svg .building").attr("class", "in-selection");
    },

    render: function(){
      
      var chosenBreakpoint = this.props.chosenBreakpoint;

      var svgNamePrefix = "master-";

      console.log(this.props.svgData);

      var svgClasses = classNames(this.props.svgData.svgClasses);

    	var svgUrl= window.baseUrl+'/projects/'+(window.projectId)+'/master/'+svgNamePrefix+''+chosenBreakpoint+'.svg'; //will come based on breakpoint
        
        return (

                  <div ref= "svgComp" className={svgClasses} >
                  <Isvg src={svgUrl} onLoad={this.svgLoaded}>
	                  Here's some optional content for browsers that don't support XHR or inline
	                  SVGs. You can use other React components here too. Here, I'll show you.

                  </Isvg>  
                  </div>
        );
    }
});

module.exports = SvgContainer;