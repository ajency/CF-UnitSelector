var React = require('react');

var Details = React.createClass({
  render: function () {
    basicDetails = this.props.basicDetails;
    roomData = this.props.roomData;
    return (

            <div role="tabpanel" className="tab-pane active" id="home">
                <div className="col-xs-12 details">
                    <div className="flatDetails">
                        <h4 className="text-uppercase">{basicDetails.name}</h4>
                        <span className="text-muted">{basicDetails.direction} facing</span>

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



            </div>
    )
  }
});

module.exports = Details;