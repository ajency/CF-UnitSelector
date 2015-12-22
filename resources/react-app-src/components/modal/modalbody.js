var React = require('react');
var classNames = require('classnames');
var FilterContent = require('../filter/filtercontent');
var ContactUs = require('../common/contactus');

// var ReactMixin = {

//     checkboxCheck:function(evt){

//         $checkBox = $(evt.currentTarget);

//         if($checkBox.is(":checked")){
//             this.state.isFilterChecked = true;
//         }

//     }
// }

var ModalBody = React.createClass({

    // mixins:[ReactMixin],

    render: function () {

        var modalData = this.props.modalData;

        var filterType;
        var search_filters;
        var modalBodyDom;
        var projectData;

        //get keys in modal data
        modalDataKeys = _.keys(modalData);

        if(_.contains(modalDataKeys,"filterTypes")){
          filterTypes = modalData.filterTypes ;
        }

        if(_.contains(modalDataKeys,"search_filters")){
          search_filters = modalData.search_filters ;
        }

       if(_.contains(modalDataKeys,"projectData")){
          projectData = modalData.projectData ;
        }


        var checkOuterDivClass = classNames({
          'col-xs-4': true,
          'checkboxInner': true,
          'selected': true
        });

        modalPurpose = this.props.modalPurpose;

        callTel = "tel:"+window.builder_phone;

        if(modalPurpose==="filterModal"){
          modalBodyDom = (  <FilterContent
                              filterTypes = {filterTypes}
                              selectFilter={this.props.selectFilter}
                              search_filters={search_filters}
                              applyFilters = {this.props.applyFilters}
                            />
                         );
        }
        else if(modalPurpose==="contactModal"){

          modalBodyDom = ( <div>
                              <h2 className="margin-none text-center">Have us call you</h2>
                              <p className="text-muted text-center pleasefill">Please fill in this short form and we will get back to you.</p>
                              <div className="row">
                                 <div className="col-xs-12 content">
                                   <div className="contact-form-content">
                                    <div className="col-xs-6 text-center">
                                       <span className="modalLogo"></span>
                                       <div className="developers">{window.project_title}</div>
                                       <span className="help">Need Help? Contact us</span>
                                       <a href={callTel}><h5>Call for support {window.builder_phone}</h5></a>
                                    </div>
                                    <div className="col-xs-6 rightSide">
                                        <div ref="contactusform">
                                            <ContactUs projectId = {this.props.projectId} hideContactModal = {this.props.hideContactModal}/>
                                        </div>
                                    </div>
                                  </div>
                                    <div className="form-message text-center"></div>
                                 </div>
                              </div>
                          </div>
                        );

        }
      else if(modalPurpose==="mobileContactModal"){
          modalBodyDom = (
                            <div>
                                <h4 className="margin-none text-center">Have us call you</h4>
                                <p className="text-muted text-center pleasefill">Please fill in this short form and we will get back to you.</p>
                                <div className="row contact-form-content">
                                   <div className="col-xs-12 content">
                                      <div className="col-xs-12 rightSide">
                                        <div className="developers">{window.project_title}</div>
                                        <a className="text-center" href={callTel}><h5>Call for support {window.builder_phone}</h5></a>
                                        <div className="contactContent" ref="contactusform">
                                            <ContactUs projectId = {this.props.projectId} hideContactModal = {this.props.hideContactModal}/>
                                        </div>
                                      </div>
                                   </div>
                                </div>
                                <div className="form-message text-center"></div>
                            </div>
                        );
        }
        else if(modalPurpose==="imageModal"){
          modalBodyDom = (
                    <div>
                       <img src="../images/amenities.jpg"/>
                       <div className="imageContent">
                         <h4 className="text-uppercase">{window.amenity_title}</h4>
                         <p>
                            {window.amenity_desc}
                         </p>
                       </div>
                    </div>
          )
        }

        return (
                <div className="modal-body">
                  {modalBodyDom}
                </div>
        )
  }
});

module.exports = ModalBody;
