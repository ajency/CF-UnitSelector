var React = require('react');

var LiveTour = React.createClass({
  render: function () {


var domToDisplay ;


if(window.isMobile){
    domToDisplay = (
        <div role="tabpanel" className="tab-pane" id="messages">
                <div className="col-xs-12 details">
                    <div className="flatDetails">
                        <h4>Live Tour</h4>
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
        <div className="col-xs-12 liveTour outerDivs pNone" id="liveTour_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Live Tour
            </span>
           <span className="contentText">
              Virtually discover project tower, floor and unit of your choice in a 3D and fully furnished state
            </span>
          </div>
        </div>
        <div className="col-xs-12 floorDetails">
          <div class="row">
            <iframe class="col-lg-12 col-md-12 col-sm-12" src={this.props.tourUrl}></iframe></div>
          </div>
        </div>
        );
}


    return domToDisplay;
  }
});

module.exports = LiveTour;
