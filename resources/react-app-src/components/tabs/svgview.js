var React = require('react');
var Isvg = require('react-inlinesvg');
var classNames = require('classnames');

var SvgView = React.createClass({
    svgLoaded: function(buildingToHighlight){
        console.log("svg loaded for outside view");
        svgElementToSelect = this.props.svgElementToSelect;
        svgElementId = this.props.svgElementId;

        selector = "."+svgElementToSelect+svgElementId;
        existingClasses = $(selector).attr("class"); 
        svgElemClassName = existingClasses+' in-selection';
        $(selector).attr("class", svgElemClassName);        
    },

    render: function () {

        svgUrl = this.props.svgUrl;
        buildingToHighlight = "sdf";
        imgUrl = this.props.imgUrl;

        return (

                  <div ref= "svgView" className="svg-top-area" >
                  <Isvg src={svgUrl} onLoad={this.svgLoaded.bind(this, buildingToHighlight)}>
                      Here's some optional content for browsers that don't support XHR or inline
                      SVGs. You can use other React components here too. Here, I'll show you.

                  </Isvg> 
                  <img className="myImg" src={imgUrl}/>   
                  </div>
        );

    }
});

module.exports = SvgView;