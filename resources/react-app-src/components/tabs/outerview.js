var React = require('react');

var OutsideView = React.createClass({
  render: function () {
    return (

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
    )
  }
});

module.exports = OutsideView;