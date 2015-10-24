var React = require('react');

var FloorPlan = require('../tabs/floorplan');
var LiveTour = require('../tabs/tour');
var OutsideView = require('../tabs/outerview');

var TabPanes = React.createClass({
  render: function () {
    return (
		<div className="tab-content">
		    <div role="tabpanel" className="tab-pane active" id="home">
		        <div className="col-xs-12 details">
		            <div className="flatDetails">
		                <h4 className="text-uppercase">FC-1101</h4>
		                <span className="text-muted">East Facing</span>

		                <div className="price text-muted"> <i className="fa fa-inr"></i> 50 Lacs
		                    <span className="availability">Available</span>
		                </div>
		            </div>
		            <div className="projectDetails">
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Project Type
		                    </div>
		                    <div className="col-xs-6 right">
		                        Apartment
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Floor
		                    </div>
		                    <div className="col-xs-6 right">
		                        8th floor
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Area
		                    </div>
		                    <div className="col-xs-6 right">
		                        1000 sqft.
		                    </div>
		                </div>
		            </div>
		        </div>

		        <div className="col-xs-12 details">
		            <div className="flatDetails">
		                <h5 className="text-uppercase">Apartment Attributes </h5>
		            </div>
		            <div className="projectDetails">
		                <div className="col-xs-12 roomHeading">
		                    <span><i className="fa fa-2x fa-bed"></i></span>
		                    <h4 className="text-uppercase">Bedroom</h4>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Size sqft.
		                    </div>
		                    <div className="col-xs-6 right">
		                        150
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Dimensions
		                    </div>
		                    <div className="col-xs-6 right">
		                        12' 10" * 10' 11"
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Flooring
		                    </div>
		                    <div className="col-xs-6 right">
		                        Wooden
		                    </div>
		                </div>

		            </div>
		        </div>
		        <div className="col-xs-12 details">
		            <div className="flatDetails">
		                <h5 className="text-uppercase">Apartment Attributes </h5>
		            </div>
		            <div className="projectDetails">
		                <div className="col-xs-12 roomHeading">
		                    <span><i className="fa fa-2x fa-bed"></i></span>
		                    <h4 className="text-uppercase">Bedroom</h4>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Size sqft.
		                    </div>
		                    <div className="col-xs-6 right">
		                        150
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Dimensions
		                    </div>
		                    <div className="col-xs-6 right">
		                        12' 10" * 10' 11"
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Flooring
		                    </div>
		                    <div className="col-xs-6 right">
		                        Wooden
		                    </div>
		                </div>

		            </div>
		        </div>
		        <div className="col-xs-12 details">
		            <div className="flatDetails">
		                <h5 className="text-uppercase">Apartment Attributes </h5>
		            </div>
		            <div className="projectDetails">
		                <div className="col-xs-12 roomHeading">
		                    <span><i className="fa fa-2x fa-bed"></i></span>
		                    <h4 className="text-uppercase">Bedroom</h4>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Size sqft.
		                    </div>
		                    <div className="col-xs-6 right">
		                        150
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Dimensions
		                    </div>
		                    <div className="col-xs-6 right">
		                        12' 10" * 10' 11"
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-6 left">
		                        Flooring
		                    </div>
		                    <div className="col-xs-6 right">
		                        Wooden
		                    </div>
		                </div>

		            </div>
		        </div>

		    </div>
		    
		    <FloorPlan />
		    <LiveTour />
		    <OutsideView />

		    
		   
		</div>
    )
  }
});

module.exports = TabPanes;