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
        var domToDisplay;

        // for desktop view imagecheckbox doesnt exist, it would be normalcheckbox
        if((window.isMobile===false)&&(filterDisplayType==="imageCheckbox")){
            filterDisplayType = "normalCheckbox";
        }


        if(filterDisplayType==="imageCheckbox"){
            filterValueNodes = filterValues.map(function(filterValue,i){

                
                            var filterValueName = filterValue.name ;
                            var imgSrc = "../images/icon/"+filterValueName.toLowerCase()+".png";

                            var searchedFilter = this.props.searchedFilter; 
                            var filterUiDom;
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

                            filterUiDom = (
                                <div key={i} className={imgCheckboxClass}>
                                    <input ref="checkboxRef " type="checkbox" data-filtertype = {filterType.type} onClick={this.props.selectFilter} value={filterValue.id}/>
                                    <img src={imgSrc} />
                                    <span className="text-uppercase col-xs-12 text-center">{filterValue.name}</span>
                                </div>
                            );
                          

                            return filterUiDom; 
                                 
                        }.bind(this));            
        }
        else if(filterDisplayType==="normalCheckbox"){
            that = this;

            filterValueNodes = filterValues.map(function(filterValue,i){
                            
                                    var filterUiDom;

                                    if(window.isMobile){
                                        filterUiDom = (
                                            <div key={i} className="checkboxnormal">
                                                <h5 className="col-xs-9 normal">{filterValue.name}</h5>
                                                <span className="col-xs-3 text-center">

                                                        <input type="checkbox" data-filtertype = {filterType.type} onClick={this.props.selectFilter} value={filterValue.id} /><label></label>

                                                </span>
                                            </div>                              
                                        );
                                    }
                                    else{
                                        filterUiDom = (
                                            <div>
                                                <div key={i} className="col-xs-4">
                                                    <input type="checkbox" data-filtertype = {filterType.type} onClick={this.props.selectFilter} value={filterValue.id}/>
                                                    <label className="checkboxLabel"></label>
                                                    <label>{filterValue.name}</label>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return filterUiDom; 

                                         
                        }.bind(this));              
        }
        else if(filterDisplayType==="range"){
            
            filterValueNodes = ( <RangeComponent listItems={filterValues} listType={filterType.type} selectFilter={this.props.selectFilter} /> );
        }


        {/* filter display type can be - imageCheckbox / range / checkbox */}

        if(window.isMobile){
            domToDisplay = (
                    <div className="filter-type">

                        <h5 className=" text-center text-uppercase m-t-20">{filterType.filterName}</h5>

                        <div className={filterTypeClasses}>
                            {filterValueNodes}
                        </div>

                    </div>
            );
        }
        else{
            domToDisplay = (
                    <div>
                        <li>
                            <h6 className="text-uppercase">{filterType.filterName}</h6>
                        </li>

                        <li className="filterCheckbox">
                            {filterValueNodes}
                        </li>
                    </div>
            );
        }        

        return domToDisplay;
    }
});

module.exports = FilterType;
