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

    var imgSrc, anchor2dStyle, anchor3dStyle;

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



    
  var domToDisplay ;


if(window.isMobile){
    domToDisplay = (
      <div role="tabpanel" className="tab-pane" id="profile">
            <div className="col-xs-12 details">
                <div className="flatDetails">
                    <h4 className="text-uppercase">2D Floor Plan</h4>
                    <div className="dimensionalViewBtn">
                        <a id="twoD"  onClick={this.setTwoD.bind(this,true)} style={anchor2dStyle}>2D</a>
                        <a id="threeD" onClick={this.setTwoD.bind(this,false)} style={anchor3dStyle}>3D</a>
                    </div>
                </div>
                <div className="twodView">
                    <img src={imgSrc} className="img-responsive fit" id="imageid" />
                </div>
            </div>
        </div>
    );
}else{
    domToDisplay = (
      <div className="col-xs-12 floorPlans pNone" id="floorPlan_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Floor plans
            </span>
            <span className="contentText">
              Simplicity of design and strong construction from the backbone of the Metro.
            </span>
          </div>
        </div>
        <div className="col-xs-12 floorDetails">
          <div className="row">
            <div className="col-xs-6">
              <img src={twoDImgSrc}/>
              <div className="plan col-xs-12 text-center text-uppercase">2D Floor plan</div>
            </div>
            <div className="col-xs-6">
              <img src={threeDImgSrc}/>
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