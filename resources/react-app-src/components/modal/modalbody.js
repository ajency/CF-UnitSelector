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


        var filterTypes = this.props.modalData;        

        var checkOuterDivClass = classNames({
          'col-xs-4': true,
          'checkboxInner': true,
          'selected': true
        }); 

        return (
                <div className="modal-body">
                    <FilterContent 
                      filterTypes = {filterTypes}
                      selectFilter={this.props.selectFilter}
                      search_filters={this.props.search_filters}
                      applyFilters = {this.props.applyFilters}
                    />
                </div>
        )
  }
});

module.exports = ModalBody;