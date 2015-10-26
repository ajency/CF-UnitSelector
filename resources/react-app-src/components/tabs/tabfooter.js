var React = require('react');

var TabFooter = React.createClass({
  render: function () {
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
		        <button className="col-xs-6 button">
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