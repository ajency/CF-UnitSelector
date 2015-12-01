var React = require('react');
var classNames = require('classnames');

var TabFooter = React.createClass({

	_redirect: function(url){
		window.location.href = url;
	},

	redirectToBooking: function(evt){

  		var status = this.props.unitStatus;
  		var notAvailable= true;

  		if(status === "available"){
  			notAvailable = false;
  		}

  		if(notAvailable){
  			currentTarget = evt.currentTarget;
  			$(currentTarget).prop('disabled', true);
  		}
  		else{
			unitId = this.props.unitId;
			projectId = this.props.projectId;
			bookingBaseUrl = window.booking_engine_url;
			baseBookingUrl = bookingBaseUrl+"public/booknow.php?"
			redirectUrl = baseBookingUrl+"unitId="+unitId+"&projectId="+projectId;

			this._redirect(redirectUrl);
  		}


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

  		faqUrl = window.baseUrl+"/html/TermsPrivacyFaq/faq.html";
  		privacyUrl = window.baseUrl+"/html/TermsPrivacyFaq/privacy.html";


  		var domToDisplay;

  		if(window.isMobile){
		domToDisplay = (
				<div className="tabfooter">
			    <div className="row">
			        <button
			        	className="col-xs-6 button"
                        data-toggle="modal"
                        onClick={this.props.showContactModal}
			        >
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
			);
	    }else{
	    	domToDisplay = (
	    		<div className="footerDesk container-fluid text-center">
		    		Call {this.props.projectContactNo}
		    		<div className="privacyOuter">
		    			<a href="https://www.commonfloor.com/" target="_blank">Commonfloor</a> | &nbsp;
		    			<a href={faqUrl} target="_blank">FAQ</a> | &nbsp;
		    			<a href="https://play.google.com/store/apps/details?id=com.commonfloor&hl=en" target="_blank">Mobile Apps</a> © commonfloor inc. | &nbsp;
		    			<a href={privacyUrl} target="_blank">Privacy Policy</a>
		    		</div>
	    		</div>
	    	);
	    }

	    return domToDisplay;
	  }
});

module.exports = TabFooter;
