var React = require('react');
var SvgView = require('../tabs/svgview');


var OutsideView = React.createClass({


	render : function(){

		return (
			<div className="outSideView">
			<h6>Out Side View</h6>
                              <SvgView
                                  key="dfsd"
                                  svgUrl="http://test.cfunitselectortest.com/projects/7/master/master-28.jpg"
                                  imgUrl="http://test.cfunitselectortest.com/projects/7/master/master-28.jpg"
                                  svgElementToSelect = "building"
                                  svgElementId = "21"
                              />

			</div>
		);
	}


});


module.exports = OutsideView;
