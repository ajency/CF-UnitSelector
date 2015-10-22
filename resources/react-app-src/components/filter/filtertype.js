var React = require('react');
var classNames = require('classnames');
var RangeComponent = require('../filter/rangecomponent');

var FilterType = React.createClass({

    render: function () {

        var filterType = this.props.filterType;

        {/* Based on type of filter to be displayed generate filterDisplayType */}
       
        var filterDisplayType = filterType.filterDisplayType;
        var filterValues = filterType.filterValues;


        var filterTypeClasses = classNames({
          'row': true,
          'imagecheckboxOuter': (filterDisplayType==="imageCheckbox"),
          'p-0': filterDisplayType==="range",
          'budgetOuter': filterDisplayType==="range", 
          'checkboxOuter': filterDisplayType==="normalCheckbox", 
        }); 


        var filterValueNodes ;
        var isSelected;

        if(filterDisplayType==="imageCheckbox"){
            filterValueNodes = filterValues.map(function(filterValue,i){

                
                            var filterValueName = filterValue.name ;
                            var imgSrc = "../images/icon/"+filterValueName.toLowerCase()+".png";

                            var searchedFilter = this.props.searchedFilter; 
                            var filtervalueId = (filterValue.id); 
                            filtervalueId = filtervalueId.toString();


                            if (searchedFilter === undefined || searchedFilter === null) {
                                isSelected = false;
                            }else{
                                if(searchedFilter.length == 0)
                                    isSelected = false;
                                else
                                    isSelected = (_.indexOf(searchedFilter,filtervalueId) > -1);
                            }

                            


                            var imgCheckboxClass = classNames({
                              'col-xs-4': true,
                              'checkboxInner': true,
                              'text-center': true,
                              'selected': isSelected
                            }); 

                            return(
                                <div key={i} className={imgCheckboxClass}>
                                    <input ref="checkboxRef " type="checkbox" data-filtertype = {filterType.type} onClick={this.props.selectFilter} value={filterValue.id}/>
                                    <img src={imgSrc} />
                                    <span className="text-uppercase col-xs-12 text-center">{filterValue.name}</span>
                                </div>
                            ); 
                                 
                        }.bind(this));            
        }
        else if(filterDisplayType==="normalCheckbox"){
            that = this;
            filterValueNodes = filterValues.map(function(filterValue,i){

                
                            return(
                                <div key={i} className="checkboxnormal">
                                    <h5 className="col-xs-9 normal">{filterValue.name}</h5>
                                    <span className="col-xs-3 text-center">

                                            <input type="checkbox" data-filtertype = {filterType.type} onClick={this.props.selectFilter} value={filterValue.id} /><label></label>

                                    </span>
                                </div>                              
                            ); 
                                 
                        }.bind(this));              
        }
        else if(filterDisplayType==="range"){
            
            filterValueNodes = ( <RangeComponent listItems={filterValues} listType={filterType.type} selectFilter={this.props.selectFilter} /> );
        }


        {/* filter display type can be - imageCheckbox / range / checkbox */}

        return (
                <div className="filter-type">

                    <h5 className=" text-center text-uppercase m-t-20">{filterType.filterName}</h5>

                    <div className={filterTypeClasses}>
                        {filterValueNodes}
                    </div>

                </div>
        )
    }
});

module.exports = FilterType;
