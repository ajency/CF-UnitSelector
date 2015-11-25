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
        svgElemClassName = existingClasses+' in-selection .step2-svg';
        $(selector).attr("class", svgElemClassName);        
    },

    render: function () {

        svgUrl = this.props.svgUrl;
        buildingToHighlight = "sdf";
        imgUrl = this.props.imgUrl;

        windowHeight = $(window).innerHeight() ;

        var imageStyle = {
          "height": windowHeight
        };         

        return (

            <div ref= "svgView" className="step4-svg" style={imageStyle}>
                <div className="image-contain">
                    <div className="image" style={imageStyle}>
                        <div className="svg-area" style={imageStyle}>
                            <Isvg src={svgUrl} onLoad={this.svgLoaded.bind(this, buildingToHighlight)}>
                                  Here's some optional content for browsers that don't support XHR or inline
                                  SVGs. You can use other React components here too. Here, I'll show you.

                           </Isvg>                         
                        </div>
                        <img className="myImg" src={imgUrl}/> 
                    </div>
                </div>
            </div>          

        );

    }
});

module.exports = SvgView;