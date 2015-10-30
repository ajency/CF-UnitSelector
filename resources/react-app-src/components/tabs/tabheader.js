var React = require('react');

var TabHeader = React.createClass({

  redirectToBooking: function(){
    unitId = this.props.unitId;
    projectId = this.props.projectId;
    baseBookingUrl = "http://booking.cfunitselectortest.com/public/booknow.php?"
    redirectUrl = baseBookingUrl+"unitId="+unitId+"&projectId="+projectId;

    this._redirect(redirectUrl);
    
  },

  render: function () {

  	var buildingName = this.props.buildingName;
  	var unitTypeName = this.props.unitTypeName;
  	var propertyTypeName = this.props.propertyTypeName;
  	var unitName = unitData.basic.name;
  	var unitDirection = unitData.basic.direction;
  	var unitFloor = unitData.basic.floor;
  	var builtupArea = unitData.basic.superBuiltUpArea;
  	var unitStatus = s.humanize(unitData.basic.status);
  	var sellingAmount = unitData.basic.sellingAmount;


    
    if(unitData.basic.status === 'sold'){
      var statusClass = 'sold';
    }else if(unitData.basic.status === 'available'){
      var statusClass = 'available';
    }else{
      var statusClass = '';
    }

  	var domToDisplay ;

  	if(window.isMobile){
  	domToDisplay = (
  		<div className="tabHeader">
		    <div className="title">
		        <a href="#"><i className="fa fa-times"></i></a>
		        <h3>{this.props.buildingName} : {this.props.unitTypeName} : {this.props.propertyTypeName}</h3>
		    </div>
		    <ul className="nav nav-tabs" role="tablist">
		        <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Details</a></li>
		        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Floor plan</a></li>
		        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Live in tour</a></li>
		        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Outside view</a></li>
		    </ul>
		</div>
  		);
  }else{

    if(unitData.basic.status === 'available'){
      var bookNowButton = (
        <button className="btn btn-default btn-sm btn-primary text-uppercase" onClick={this.redirectToBooking}>Book now <i className="fa fa-inr"></i> {sellingAmount}</button>
        );
    }else{
      var bookNowButton = "";
    }

  	domToDisplay = (
  		<div>

  			<div className="row">
      <div className="col-xs-12">
        <div className="col-xs-6">
            <div className="col-xs-12 backOuter">
              <i className="i-icon i-dark-arrow"></i> 
              <span className="back text-uppercase">
                back
              </span>
            </div>  
          <h4 className="text-uppercase">{unitName}</h4>
          <span className={'unitStatus text-uppercase '+statusClass}>{unitStatus}</span>          
        </div>
        <div className="col-xs-6 text-right rightSide">          
          {bookNowButton}
          <button className="btn btn-default btn-sm btn-primary text-uppercase">
            <i className="fa fa-phone"></i>
            <span className="enquiryText">Contact Us</span>
          </button>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="flatDetails text-uppercase col-xs-12">
        <span className="units">{unitTypeName}</span><ul><li></li></ul> <span className="units">{builtupArea} SQFT </span><ul><li></li></ul> <span className="units">{unitFloor} Floor </span><ul><li></li></ul> <span className="units">{buildingName} </span><ul><li></li></ul> <span className="units">{unitDirection} facing </span>
      </div>
    </div>
    <div id="sticky-anchor"></div>
    <div className="tabHeader" id="stickyHeader">      
      <ul className="list-unstyled text-uppercase">
        <li className="active"><a href="#" id="details" className="click">Details</a></li>
        <li><a href="#" id="floorPlan" className="click">Floor plan</a></li>
        <li><a href="#" id="liveTour" className="click">Live in tour</a></li>
        <li><a href="#" id="outsideView" className="click">Outside view</a></li>
        <li><a href="#" id="societyEmenities" className="click">Society amenities</a></li>
        <li className="pull-right stickyButtons">
           {bookNowButton}
          <button className="btn btn-default btn-sm btn-primary text-uppercase">
            <i className="fa fa-phone"></i>
            <span className="enquiryText">Contact Us</span>
          </button>   
        </li>
      </ul> 

    </div>


  		</div>
  		);
  }


    return domToDisplay;

  }
});

module.exports = TabHeader;