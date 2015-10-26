var React = require('react');
var ModalHeader = require('../modal/modalheader');
var ModalBody = require('../modal/modalbody');
var classNames = require('classnames');

var Modal = React.createClass({

  componentDidMount : function(){
    var $modal = $(this.refs.myModal);

    var modalPurpose = this.props.modalPurpose;
    var backdrop = false;
    var isFilterModal = true;

    if(modalPurpose==="contactModal"){
      backdrop= true;
      isFilterModal = false;
    }

    var modalSettings = {
      backdrop: backdrop,
      show:false
    };

    $modal.modal(modalSettings);
  },

  render: function () {
    var modalData = this.props.modalData; 

    var modalPurpose = this.props.modalPurpose;
    var isFilterModal = true;

    if(modalPurpose==="contactModal"){
      backdrop= true;
      isFilterModal = false;
    }

    var modalClasses = classNames({
      'modal': true,
      'fade': true,
      'modal-full-width': isFilterModal,
      'contactModal': !isFilterModal 
    });  
       
    return (
		<div className={modalClasses} ref="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
    		<div className="modal-dialog" role="document">
        		<div className="modal-content">    	
            		<ModalHeader
                  modalPurpose = {this.props.modalPurpose}
                  unapplyFilters = {this.props.unapplyFilters}
                />
            		<ModalBody 
                  modalData = {modalData}
                  modalPurpose = {this.props.modalPurpose}
                  selectFilter={this.props.selectFilter}
                  applyFilters = {this.props.applyFilters}
                />
          		</div>
        	</div>
      </div>
      )
  }
});

module.exports = Modal;