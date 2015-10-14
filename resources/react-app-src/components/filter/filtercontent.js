var React = require('react');
var FilterType = require('../filter/filtertype');

var FilterContent = React.createClass({

    render: function () {

        filterTypes = this.props.filterTypes;

        filterTypeNodes = filterTypes.map(function(filterType,i){
                            return(
                                <div key={i}>
                                <FilterType  filterType={filterType}/> 
                                </div>
                            ); 
                                 
                        });

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