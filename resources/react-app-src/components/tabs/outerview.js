var React = require('react');

var OutsideView = React.createClass({
  render: function () {


var domToDisplay ;


if(window.isMobile){
    domToDisplay = (
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
        );
}else{
    domToDisplay = (
    <div className="col-xs-12 outsideView pNone" id="outsideView_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Outside view
            </span>
            
          </div>
        </div>
        <div className="col-xs-12 floorDetails">
          <div className="row">
            <div className="col-xs-7">
              <div className="plan col-xs-12 text-uppercase pNone">Tower overview</div>
              <img src="img/bldg-3d.png"/>
              
            </div>
            <div className="col-xs-5">
              <div className="plan col-xs-12 text-uppercase pNone">Unit view</div>
              <img src="img/bldg-3d.png"/>
              
            </div>                                                                          
          </div> 
        </div>
    </div>
    );
}


    return domToDisplay;
  }
});

module.exports = OutsideView;