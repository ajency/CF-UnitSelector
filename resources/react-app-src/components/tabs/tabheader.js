var React = require('react');

var TabHeader = React.createClass({
  render: function () {
    return (
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
    )
  }
});

module.exports = TabHeader;