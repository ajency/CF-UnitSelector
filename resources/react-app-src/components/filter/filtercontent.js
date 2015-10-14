var React = require('react');
var FilterType = require('../filter/filtertype');

var FilterContent = React.createClass({

    render: function () {

        filterTypes = this.props.filterTypes;

        search_filters= this.props.search_filters


        filterTypeNodes = filterTypes.map(function(filterType,i){
                            searchedFilter = search_filters[filterType.type];
                            return(
                                <div key={i}>
                                <FilterType  
                                    filterType={filterType}
                                    selectFilter={this.props.selectFilter}
                                    searchedFilter = {searchedFilter}
                                /> 
                                </div>
                            ); 
                                 
                        }.bind(this));

        return (
            <div className="filter-content">
                {filterTypeNodes}
                <div className="filterfooter">
                    <div className="row">
                        <button className="col-xs-12 button">
                            Apply
                        </button>
                    </div>
                </div>
                
            </div>    
        )
    }
});

module.exports = FilterContent;