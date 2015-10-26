var React = require('react');

var LiveTour = React.createClass({
  render: function () {
    return (

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
    )
  }
});

module.exports = LiveTour;