var React = require('react');
var SvgView = require('../tabs/svgview');

var OutsideView = React.createClass({

    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    render: function () {


        var domToDisplay ;

        var svgKey1 = this.getRandomArbitrary(0,50);
        var svgKey2 = this.getRandomArbitrary(0,50);
        
        var step1SvgUrl = this.props.step1SvgUrl;
        var step1ImgUrl = this.props.step1ImgUrl;
        var step3SvgUrl = this.props.step3SvgUrl;
        var step3ImgUrl = this.props.step3ImgUrl;


        if(window.isMobile){
            domToDisplay = (
                <div role="tabpanel" className="tab-pane" id="settings">
                        <div className="col-xs-12 gallery details">
                            <div className="flatDetails">
                                <h4>Outside view</h4>
                            </div>
                            <br/> 
                            <SvgView
                                key={svgKey1}
                                svgUrl={step1SvgUrl}
                                imgUrl={step1ImgUrl}
                                svgElementToSelect = "building"
                                svgElementId = {this.props.buildingId}
                            /> 
                            <br/>
                        </div>
                        <div id="Fullscreen">
                            <img src="" alt="" />
                        </div>
                    </div>
                );
        }else{
            domToDisplay = (
            <div className="col-xs-12 outsideView outerDivs pNone" id="outsideView_div">
                <div className="row">
                  <div className="contentHEader">
                    <span className="contentTitle text-uppercase">
                      Outside view
                    </span>
                    <span className="contentText">
                      Simplicity of design and strong construction from the backbone of the Metro.
                    </span>
                  </div>
                </div>
                <div className="col-xs-12 floorDetails">
                  <div className="row">
                    <div className="col-xs-7 text-center">
                        <div className="plan col-xs-12 text-uppercase pNone">Tower view</div>
                        <SvgView
                            key={svgKey1}
                            svgUrl={step1SvgUrl}
                            imgUrl={step1ImgUrl}
                            svgElementToSelect = "building"
                            svgElementId = {this.props.buildingId}
                        />
                    </div>
                    <div className="col-xs-5 text-center">
                        <div className="plan col-xs-12 text-uppercase pNone">Unit view</div>
                        <SvgView
                            key={svgKey2}
                            svgUrl={step3SvgUrl}
                            imgUrl={step3ImgUrl}
                            buildingId = {this.props.buildingId}
                            unitId = {this.props.unitId}
                            svgElementToSelect = "apartment"
                            svgElementId = {this.props.unitId}
                        />
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