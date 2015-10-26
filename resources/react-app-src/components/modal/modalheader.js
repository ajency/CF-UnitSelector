var React = require('react');

var ModalHeader = React.createClass({
  render: function () {
    
    var modalBodyDom, modalPurpose;

    modalPurpose = this.props.modalPurpose;

    if(modalPurpose==="filterModal"){
      modalBodyDom = ( <div className="row">
                            <div className="col-xs-2"> <i className="i-back i-icon " data-dismiss="modal" aria-label="Close"></i></div>
                            <div className="col-xs-6">
                                <h4 className="modal-title normal" id="myModalLabel"> Filter By</h4></div>
                            <div className="col-xs-4 text-right" data-dismiss="modal" onClick={this.props.unapplyFilters}>
                                <h5 className=" normal">RESET</h5></div>
                        </div>
                     );
    }
    else if(modalPurpose==="contactModal"){
      modalBodyDom = (  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>);
    } 
    

    return (
            <div className="modal-header">
                {modalBodyDom}
            </div>
    )
  }
});

module.exports = ModalHeader;