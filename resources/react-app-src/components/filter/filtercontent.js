var React = require('react');
var FilterType = require('../filter/filtertype');

var FilterContent = React.createClass({

    render: function () {

        filterTypes = this.props.filterTypes;

        console.log(filterTypes);

        search_filters= this.props.search_filters

        filterTypeNodes = filterTypes.map(function(filterType,i){
                            
                            if(_.isEmpty(search_filters))
                                searchedFilter = [];
                            else
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
                        <button className="col-xs-12 button" data-dismiss="modal" onClick = {this.props.applyFilters}>
                            Apply
                        </button>
                    </div>
                </div>
                
            </div>    
        )
    }
});

module.exports = FilterContent;
