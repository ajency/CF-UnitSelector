var React = require('react');
var RoomAttributeList = require('../tabs/roomattributelist');

var Details = React.createClass({
  render: function () {
    var basicDetails = this.props.basicDetails;
    var roomData = this.props.roomData;

var domToDisplay ;


if(window.isMobile){

    roomCardNodes = roomData.map(function(room,i){
                        return(
                            <div key={i} className="col-xs-12 details">
              
                                <div className="flatDetails">
                                    <h5 className="text-uppercase">Apartment Attributes </h5>
                                </div>
                                <div className="projectDetails">
                                    <div className="col-xs-12 roomHeading">
                                        <h4 className="text-uppercase">{room.room_name}</h4>
                                    </div>

                                    <RoomAttributeList
                                        attributes={room.atributes}
                                    />
                                </div>
               
                            </div>
                        ); 
                             
                    });


    domToDisplay = (
            <div role="tabpanel" className="tab-pane active" id="home">
                <div className="col-xs-12 details">
                    <div className="flatDetails">
                        <h4 className="text-uppercase">{basicDetails.name}</h4>
                        <span className="text-muted unitFacing">{basicDetails.direction} Facing</span>

                        <div className="price text-muted"> <i className="fa fa-inr"></i> {basicDetails.sellingAmount}
                            <span className="availability">{s.humanize(basicDetails.status)}</span>
                        </div>
                    </div>
                    <div className="projectDetails">
                        <div className="row">
                            <div className="col-xs-6 left">
                                Property Type
                            </div>
                            <div className="col-xs-6 right">
                                {basicDetails.propertyTypeName}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 left">
                                Floor
                            </div>
                            <div className="col-xs-6 right">
                                {basicDetails.floor} floor
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 left">
                                Area
                            </div>
                            <div className="col-xs-6 right">
                                {basicDetails.superBuiltUpArea} sqft.
                            </div>
                        </div>
                    </div>
                </div>
                {roomCardNodes}
            </div>
        );

}else{

    roomCardNodes = roomData.map(function(room,i){
                        return(
                            <div key={i} className="col-md-3 roomDetails text-uppercase">
                                <h5 className="text-uppercase">{room.room_name}</h5>
                                    <RoomAttributeList
                                        attributes={room.atributes}
                                    />
                            </div>
                        ); 
                             
                    });

    
   specificationNodes = _.map( basicDetails.variantAttributes , function(val, key){
        return(          
        <div className="textInner col-xs-12 pNone">
              <h5 className="text-uppercase col-xs-2">{key}:</h5>
              <div className="col-xs-10">{val}</div>          
            </div>
        ); 
    });



   domToDisplay = (
        <div className="col-xs-12 detailView outerDivs pNone" id="details_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Details
            </span>
            <span className="contentText">
              Simplicity of design and strong construction from the backbone of the Metro.
            </span>
          </div>
        </div>
        <div className="col-xs-12 unit">
          <div className="row">            
            {roomCardNodes}
          </div> 
          <div className="col-xs-12 specificationOuter pNone">
            <div className="row">
            <div className="contentHEader">
              <div className="row">
              <span className="contentTitle text-uppercase">
                Specification
              </span>
              </div>
            </div>
          </div>

            <div className="row">
                {specificationNodes}            
            </div>

          </div>

        </div>
      </div>
   ); 
}


    return domToDisplay;
  }
});

module.exports = Details;