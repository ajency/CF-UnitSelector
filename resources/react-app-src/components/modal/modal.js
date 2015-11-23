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

    if((modalPurpose==="contactModal")||(modalPurpose==="mobileContactModal")){
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

    if((modalPurpose==="contactModal")||(modalPurpose==="mobileContactModal")){
      backdrop= true;
      isFilterModal = false;
    }

    var modalClasses = classNames({
      'modal': true,
      'fade': true,
      'modal-full-width': isFilterModal,
      'contactModal': !isFilterModal
    });

    var modalContent = classNames({
      'modal-content': true
    });

    if(modalPurpose==="mobileContactModal"){

        modalContent = classNames({
            'modal-content': true,
            'col-lg-12':true,
            'p-0':true
        });
    }

    return (
		<div className={modalClasses} ref="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
    		<div className="modal-dialog" role="document">
        		<div className={modalContent}>
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
