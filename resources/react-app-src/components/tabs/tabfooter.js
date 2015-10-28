var React = require('react');
var classNames = require('classnames');

var TabFooter = React.createClass({

	_redirect(url){
		window.location.href = url;
	},

	redirectToBooking: function(){
		unitId = this.props.unitId;
		projectId = this.props.projectId;
		baseBookingUrl = "http://booking.cfunitselectortest.com/public/booknow.php?"
		redirectUrl = baseBookingUrl+"unitId="+unitId+"&projectId="+projectId;

		this._redirect(redirectUrl);
		
	},

  	render: function () {
  		var status = this.props.unitStatus;

  		var buttonClasses;

  		var notAvailable= true;

  		if(status === "available"){
  			notAvailable = false;
  		}

  		buttonClasses = classNames({
  			"col-xs-6" : true,
  			"button": true,
  			"booked": notAvailable
  		})

	    return (
			<div className="tabfooter">
			    <div className="row">
			        <button className="col-xs-6 button">
			            <div>
			                <span>
			                    <i className="fa fa-envelope-o"></i>
			                  </span>
			            </div>
			            Express interest
			        </button>
			        <button  className={buttonClasses} onClick={this.redirectToBooking}>
			            <div>
			                <span>
			                    <i className="fa fa-check-square-o"></i>
			                  </span>
			            </div>
			            Book now
			        </button>
			    </div>
			</div>
	    )
	  }
});

module.exports = TabFooter;