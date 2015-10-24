var React = require('react');

var Details = React.createClass({
  render: function () {
    var basicDetails = this.props.basicDetails;
    var roomData = this.props.roomData;

  
    roomCardNodes = roomData.map(function(room,i){
                        return(
                            <div key={i} className="col-xs-12 details">
              
                                <div className="flatDetails">
                                    <h5 className="text-uppercase">Apartment Attributes </h5>
                                </div>
                                <div className="projectDetails">
                                    <div className="col-xs-12 roomHeading">
                                        <span><i className="fa fa-2x fa-bed"></i></span>
                                        <h4 className="text-uppercase">{room.room_name}</h4>
                                    </div>


                                </div>
               
                            </div>
                        ); 
                             
                    });    
    return (

            <div role="tabpanel" className="tab-pane active" id="home">
                <div className="col-xs-12 details">
                    <div className="flatDetails">
                        <h4 className="text-uppercase">{basicDetails.name}</h4>
                        <span className="text-muted">{basicDetails.direction}Facing</span>

                        <div className="price text-muted"> <i className="fa fa-inr"></i> {basicDetails.sellingAmount}
                            <span className="availability">{basicDetails.status}</span>
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
    )
  }
});

module.exports = Details;