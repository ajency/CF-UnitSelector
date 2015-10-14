var React = require('react');
var classNames = require('classnames');
var RangeComponent = require('../filter/rangecomponent');

var FilterType = React.createClass({

    getDefaultProps: function(){
        return {
            filterName: "Unit Type",
            filterDisplayType: "normalCheckbox",
            filterValues : [{id:2,name:"2BHK",isSelected: true},{id:3,name:"3BHK",isSelected: true},{id:3,name:"3BHK",isSelected: true},{id:3,name:"3BHK",isSelected: true},{id:3,name:"3BHK",isSelected: true}]
        }
    },   

    render: function () {

        {/* Based on type of filter to be displayed generate filterDisplayType */}
       
        var filterDisplayType = this.props.filterDisplayType;
        var filterValues = this.props.filterValues;


        var filterTypeClasses = classNames({
          'row': true,
          'imagecheckboxOuter': (this.props.filterDisplayType==="imageCheckbox"),
          'p-0': this.props.filterDisplayType==="range",
          'budgetOuter': this.props.filterDisplayType==="range", 
          'checkboxOuter': this.props.filterDisplayType==="normalCheckbox", 
        }); 


        var filterValueNodes ;

        if(filterDisplayType==="imageCheckbox"){
            filterValueNodes = filterValues.map(function(filterValue,i){
                            console.log("filterValues");
                            console.log(filterValue);
                            return(
                                <div key={i} className="col-xs-4 checkboxInner text-center ">
                                    <input ref="checkboxRef " type="checkBox" />
                                    <img src="../images/icon/1bhk.png" />
                                    <span className="text-uppercase col-xs-12 text-center">1bhk</span>
                                </div>
                            ); 
                                 
                        });            
        }
        else if(filterDisplayType==="normalCheckbox"){
            filterValueNodes = filterValues.map(function(filterValue,i){
                            return(
                                <div key={i} className="checkboxnormal">
                                    <h5 className="col-xs-9 normal">Swimming Pool</h5>
                                    <span className="col-xs-3 text-center">
                                            <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                                    </span>
                                </div>                              
                            ); 
                                 
                        });              
        }
        else if(filterDisplayType==="range"){
            filterValueNodes = ( <RangeComponent listItems={filterValues} /> );
        }

        console.log(filterValueNodes);


        {/* filter display type can be - imageCheckbox / range / checkbox */}

        return (
                <div className="filter-type">

                    <h5 className=" text-center text-uppercase m-t-20">{this.props.filterName}</h5>

                    <div className={filterTypeClasses}>
                        {filterValueNodes}
                    </div>

                </div>
        )
    }
});

module.exports = FilterType;