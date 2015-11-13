var React = require('react');
var classNames = require('classnames');
var FilterContent = require('../filter/filtercontent');

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
                              <p className="text-muted text-center">Please fill in this short form and we will get back to you.</p>
                              <div className="row">
                                 <div className="col-xs-12 content">
                                    <div className="col-xs-6 text-center">
                                       <span className="modalLogo"></span>
                                       <div className="developers">{projectData.title}</div>
                                       <span className="help">Need Help? Contact us</span>
                                       <h5>Toll free: 1800 121 0000</h5>
                                    </div>
                                    <div className="col-xs-6 rightSide">
                                       <div className="p-0 col-lg-12 inputOuter">
                                          <input type="text" placeholder="Name" />                   
                                          <input type="email" placeholder="Email ID" />                   
                                          <input type="text" placeholder="Mobile" />                      
                                       </div>
                                       <div className="p-0 col-lg-12 proceedBtn text-center">
                                          <button className="btn btn-primary btn-default text-uppercase">Submit</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>                    
                          </div> 
                        );
        }
      else if(modalPurpose==="mobileContactModal"){
          modalBodyDom = ( 
                            <div> 
                                <h4 className="margin-none text-center">Have us call you</h4>
                                <p className="text-muted text-center">Please fill in this short form and we will get back to you.</p>
                                <div className="row">
                                   <div className="col-xs-12 content">                             
                                      <div className="col-xs-12 rightSide">
                                        <div className="developers">{projectData.title}</div>
                                         <div className="p-0 col-lg-12 inputOuter">
                                            <input type="text" placeholder="Name" />                   
                                            <input type="email" placeholder="Email ID" />                   
                                            <input type="text" placeholder="Mobile" />                      
                                         </div>
                                         <div className="p-0 col-lg-12 proceedBtn text-center">
                                            <button className="btn btn-primary btn-default text-uppercase">Submit</button>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                            </div>
                        );
        }        

        return (
                <div className="modal-body">
                  {modalBodyDom}
                </div>
        )
  }
});

module.exports = ModalBody;