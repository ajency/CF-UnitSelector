var React = require('react');

var ModalHeader = React.createClass({
  render: function () {
    return (
            <div className="modal-header">
                <div className="row">
                    <div className="col-xs-2"> <i className="i-back i-icon " data-dismiss="modal" aria-label="Close"></i></div>
                    <div className="col-xs-6">
                        <h4 className="modal-title normal" id="myModalLabel"> Filter By</h4></div>
                    <div className="col-xs-4 text-right">
                        <h5 className=" normal">RESET</h5></div>
                </div>

            </div>
    )
  }
});

module.exports = ModalHeader;