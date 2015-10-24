var React = require('react');

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
		    <div role="tabpanel" className="tab-pane" id="profile">
		        <div className="col-xs-12 details">
		            <div className="flatDetails">
		                <h4 className="text-uppercase">2D Floor Plan</h4>
		                <div className="dimensionalViewBtn">
		                    <a id="twoD" href="#">2D</a>
		                    <a id="threeD" href="#">3D</a>
		                </div>
		            </div>
		            <div className="twodView">
		                <img src="img/Pointe-Brodie-Creek_Harmony_2br_2ba0000.png" className="img-responsive fit" id="imageid" />
		            </div>
		        </div>
		    </div>
		    <div role="tabpanel" className="tab-pane" id="messages">
		        <div className="col-xs-12 details">
		            <div className="flatDetails">
		                <h4>Floor Plans</h4>
		            </div>
		            <div className="twodView">
		                <img src="img/bldg-3d.png" />
		                <a href="#"><i className="fa fa-2x fa-arrows-alt"></i></a>
		            </div>
		        </div>

		    </div>
		    <div role="tabpanel" className="tab-pane" id="settings">
		        <div className="col-xs-12 gallery details">
		            <div className="flatDetails">
		                <h4>Outside view</h4>
		            </div>
		            <br/>
		            <img className="myImg" src="img/bldg-3d.png" />
		            <a className="clickBtn" onclick="requestFullScreen()" href="#"><i className="fa fa-2x fa-arrows-alt"></i></a>
		        </div>
		        <div id="Fullscreen">
		            <img src="" alt="" />
		        </div>
		    </div>
		</div>
    )
  }
});

module.exports = TabPanes;