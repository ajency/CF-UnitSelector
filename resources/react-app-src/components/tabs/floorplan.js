var React = require('react');

var FloorPlan = React.createClass({

      getInitialState: function() {
        return {
          is2d: true
        };
      },

  setTwoD: function(setTwoDBool){
    this.setState({is2d:setTwoDBool});
  },

  render: function () {

    var imgSrc, anchor2dStyle, anchor3dStyle, previewDom;

    twoDImgSrc = this.props.url2dlayout;
    threeDImgSrc = this.props.url3dlayout;



    if (this.state.is2d) {
      imgSrc = twoDImgSrc;

      anchor2dStyle = {
        background: "rgb(213, 213, 212)"
      };

      anchor3dStyle = {
        background: "rgb(255, 255, 255)"
      };
    }
    else{
      imgSrc = threeDImgSrc;

      anchor2dStyle = {
        background: "rgb(255, 255, 255)"
      };

      anchor3dStyle = {
        background: "rgb(213, 213, 212)"
      };
    }

    if(!_.isEmpty(imgSrc)){
        previewDom = (<img src={imgSrc} className="img-responsive fit" id="imageid" />);
    }
    else{
        previewDom = (<div className="nopreview">
                        <i className="fa fa-2x fa-picture-o"></i>
                        <h5>No preview available</h5>
                      </div>) ;
    }




  var domToDisplay ;


if(window.isMobile){
    var floorPlanTitle;
    if(this.state.is2d){
        floorPlanTitle = "2D Floor plan";
    }
    else{
        floorPlanTitle = "3D Floor plan";
    }

    domToDisplay = (
      <div role="tabpanel" className="tab-pane" id="profile">
            <div className="col-xs-12 details">
                <div className="flatDetails">
                    <h4 className="text-uppercase">{floorPlanTitle}</h4>
                    <div className="dimensionalViewBtn">
                        <a id="twoD"  onClick={this.setTwoD.bind(this,true)} style={anchor2dStyle}>2D</a>
                        <a id="threeD" onClick={this.setTwoD.bind(this,false)} style={anchor3dStyle}>3D</a>
                    </div>
                </div>
                <div className="twodView">
                    {previewDom}
                </div>
            </div>
        </div>
    );
}

else{
    domToDisplay = (
      <div className="col-xs-12 floorPlans outerDivs pNone" id="floorPlan_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Floor plans
            </span>
            <span className="contentText">
              Visualize a home even before it is built and evaluate how space works for you.
            </span>
          </div>
        </div>
        <div className="col-xs-12 floorDetails">
          <div className="row">
            <div className="col-xs-6 text-center">
              {previewDom}
              <div className="plan col-xs-12 text-center text-uppercase">2D Floor plan</div>
            </div>
            <div className="col-xs-6 text-center">
              {previewDom}
              <div className="plan col-xs-12 text-center text-uppercase">3D Floor plan</div>
            </div>
          </div>
        </div>
      </div>
    );
}


    return domToDisplay;
  }
});

module.exports = FloorPlan;
