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

    
    


    return (

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
    )
  }
});

module.exports = FloorPlan;