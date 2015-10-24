var React = require('react');

var FloorPlan = React.createClass({
  render: function () {
    return (

    	<div role="tabpanel" className="tab-pane active" id="profile">
            <div className="col-xs-12 details">
                <div className="flatDetails">
                    <h4 className="text-uppercase">Floor Plan</h4>
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
    )
  }
});

module.exports = FloorPlan;