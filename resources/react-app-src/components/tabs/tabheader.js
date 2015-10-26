var React = require('react');

var TabHeader = React.createClass({
  render: function () {

  	var domToDisplay ;

  	if(window.isMobile){
  	domToDisplay = (
  		<div className="tabHeader">
  			<div className="title">
  				<a href="#"><i className="fa fa-times"></i></a>
  				<h3>Tower 1 : 2BHK : Apartment</h3>
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
          <h4 className="text-uppercase">Fl - 1301</h4>
          <span className="available text-uppercase">Available</span>          
        </div>
        <div className="col-xs-6 text-right rightSide">          
          <button className="btn btn-default btn-sm btn-primary text-uppercase">Book now <i className="fa fa-inr"></i> 60lacs</button>
          <button className="btn btn-default btn-sm btn-primary text-uppercase">
            <i className="fa fa-phone"></i>
            <span className="enquiryText">Contact Us</span>
          </button>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="flatDetails text-uppercase col-xs-12">
        <span className="units">2 BHK</span><ul><li></li></ul> <span className="units">1024 SQFT </span><ul><li></li></ul> <span className="units">Floor 6 </span><ul><li></li></ul> <span className="units">Tower 1 </span><ul><li></li></ul> <span className="units">East facing from balcony SQFT. </span>
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
           <button className="btn btn-default btn-sm btn-primary text-uppercase">Book now <i className="fa fa-inr"></i> 60lacs</button>
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