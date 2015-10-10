var React = require('react');
var ModalHeader = require('../modal/modalheader');
var ModalBody = require('../modal/modalbody');

var Modal = React.createClass({
  render: function () {
    return (
		<div className="modal fade modal-full-width" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
    		<div className="modal-dialog" role="document">
        		<div className="modal-content">    	
            		<ModalHeader/>
            		<ModalBody/>
          		</div>
        	</div>
      </div>
      )
  }
});

module.exports = Modal;