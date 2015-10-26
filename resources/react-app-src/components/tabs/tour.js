var React = require('react');

var LiveTour = React.createClass({
  render: function () {


var domToDisplay ;


if(window.isMobile){
    domToDisplay = (
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
        );
}else{
   domToDisplay = (
        <div className="col-xs-12 liveTour pNone" id="liveTour_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Live Tour
            </span>
            <span className="contentText">
              Simplicity of design and strong construction from the backbone of the Metro.
            </span>
          </div>
        </div>
        <div className="col-xs-12 floorDetails">
          <div className="row">
          Sample Tour content
          </div>
          </div>
        </div>
        ); 
}


    return domToDisplay;
  }
});

module.exports = LiveTour;