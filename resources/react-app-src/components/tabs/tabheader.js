var React = require('react');
var PriceFormat = require('../tabs/priceformat');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Router = require('react-router-component');
var BackButton = require('../common/backbutton');

var TabHeader = React.createClass({

	mixins: [Router.NavigatableMixin],

	_redirect: function(url){
		window.location.href = url;
	},

	previousStep: function(){
		return this.navigate('/buildings/'+this.props.buildingId+'/group/'+this.props.groupId);
	},

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
		var bookingAmount = unitData.basic.bookingAmount;

		var url2dlayout = unitData.basic.url2dlayout;
		var url3dlayout = unitData.basic.url3dlayout;


        cardListFor = this.props.cardListFor;



		if(unitData.basic.status === 'sold'){
		  var statusClass = 'sold';
		}
		else if(unitData.basic.status === 'available'){
		  var statusClass = 'available';
		}
		else{
		  var statusClass = '';
		}

		var domToDisplay, floorplanheader, livetourheader ;

		if(window.isMobile){

			if(_.isEmpty(url2dlayout) && _.isEmpty(url3dlayout)){
				floorplanheader = "";
			}else{
				floorplanheader = (
					<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Floor plan</a></li>
				);
			}

			if(_.isEmpty(unitData.basic.tour_url)){
				livetourheader = "";
			}else{
				livetourheader = (
					<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Live in tour</a></li>
				);
			}


			domToDisplay = (
				<div className="tabHeader">
					<div className="title">
						<BackButton
							backStyleType = "dark"
                            navigationType = "unit"
                            navigationId = {this.props.buildingId}
                            entityId = {this.props.groupId}
						/>
						<h3>{this.props.buildingName} : {this.props.unitTypeName} : {this.props.propertyTypeName}</h3>
					</div>
					<ul className="nav nav-tabs" role="tablist">
						<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Details</a></li>
						{floorplanheader}
						{livetourheader}
						<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Outside view</a></li>
					</ul>
				</div>
				);
		}
		else{

			if(unitData.basic.status === 'available'){
				var bookNowButton = (
					<button
						className="btn btn-default btn-primary text-uppercase"
						onClick={this.redirectToBooking}
					>
						Book now <i className="fa fa-inr"></i> <PriceFormat numPrice={bookingAmount} />
					</button>
				);
			}
			else{
				var bookNowButton = "";
			}


			if(_.isEmpty(url2dlayout) && _.isEmpty(url3dlayout)){
				floorplanheader = "";
			}else{
				floorplanheader = (
					<li><a href="#" id="floorPlan" className="click">Floor plan</a></li>
				);
			}

			if(_.isEmpty(unitData.basic.tour_url)){
				livetourheader = "";
			}else{
				livetourheader = (
					<li className="liveInTourLi"><a href="#" id="liveTour" className="click"><span className="rotateIcon"></span><span className="liveInTourText">Live in tour</span></a></li>
				);
			}



			domToDisplay = (
				<div>
					<div className="row">
						<div className="col-xs-12">
							<div className="col-xs-6">
								<BackButton
									backStyleType = "withLabel"
		                            navigationType = "unit"
		                            navigationId = {this.props.buildingId}
		                            entityId = {this.props.groupId}
								/>
								<h4 className="text-uppercase">{unitName}</h4>
								<span className={ 'unitStatus text-uppercase '+statusClass}>{unitStatus}</span>
							</div>

							<div className="col-xs-6 text-right rightSide">
								<span className="totalUnitPrice">
										<span className="totalPriceText">Total</span> <i className="fa fa-inr"></i> <PriceFormat numPrice={sellingAmount} />
								</span>
								{bookNowButton}
								<button
									className="btn btn-default btn-primary text-uppercase"
									data-toggle="modal" data-target="#contactModal"
									onClick={this.props.showContactModal}
								>
									<i className="fa fa-phone"></i>
									<span className="enquiryText">Contact Us</span>
								</button>
							</div>

						</div>

					</div>

					<div className="row">
						<div className="flatDetails text-uppercase col-xs-12">
							<span className="units">{unitTypeName}</span>
							<ul><li></li></ul>
							<span className="units">{builtupArea} SQFT </span>
							<ul><li></li></ul>
							<span className="units">{unitFloor} Floor </span>
							<ul><li></li></ul>
							<span className="units">{buildingName} </span>
							<ul><li></li></ul>
							<span className="units">{unitDirection} facing </span>
						</div>
					</div>

					<div id="sticky-anchor"></div>
					<div className="tabHeader" id="stickyHeader">
						<ul className="list-unstyled text-uppercase">
							<li className="active"><a href="#" id="details" className="click active">Details</a></li>
							{floorplanheader}
							{livetourheader}
							<li><a href="#" id="outsideView" className="click">Outside view</a></li>
							<li><a href="#" id="societyEmenities" className="click">Society amenities</a></li>
							<li className="pull-right stickyButtons">
								<span className="totalUnitPrice">
										<span className="totalPriceText">Total</span> <i className="fa fa-inr"></i> <PriceFormat numPrice={sellingAmount} />
								</span>
								{bookNowButton}
								<button className="btn btn-default btn-primary text-uppercase">
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
